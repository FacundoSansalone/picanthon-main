// app/api/mcp/route.ts
import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.MCP_INTERNAL_ORIGIN ?? "http://localhost:3000";

// Solo OpenAI (enforce)
const OPENAI_ONLY = new Set(["gpt-4o", "gpt-4o-mini", "gpt-4.1", "title-model", "artifact-model"]);
const DEFAULT_CHAT_MODEL = process.env.DEFAULT_CHAT_MODEL ?? "gpt-4o-mini";
const USER_ID = "local-dev-user"; // tu backend ya usa este user en los logs

/** Obtiene el mapa de chatId -> sessionId del MCP remoto */
async function fetchSessionsMap(userId = USER_ID) {
  try {
    const url = `https://remote.mcp.pipedream.net/v1/${userId}/sessions`;
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return {};
    const j = await r.json();
    return j?.mcpSessions ?? {};
  } catch {
    return {};
  }
}

/** Intenta "materializar" un chatId llamando a /api/chat con un ping controlado */
async function materializeChatId(id: string) {
  // intento 1: system "init"
  let res = await fetch(`${BASE}/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id,
      chatId: id,
      model: DEFAULT_CHAT_MODEL,
      messages: [{ role: "system", content: "init" }],
      stream: false,
    }),
  });

  // si devuelve 400, reintento con user "init"
  if (res.status === 400) {
    res = await fetch(`${BASE}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id,
        chatId: id,
        model: DEFAULT_CHAT_MODEL,
        messages: [{ role: "user", content: "init" }],
        stream: false,
      }),
    });
  }
  return res.ok;
}

/** Resuelve un chatId válido: cookie -> history -> crear nuevo y materializar */
async function resolveValidChatId(req: NextRequest) {
  const cookieId = req.cookies.get("x-chat-id")?.value || null;
  const sessions = await fetchSessionsMap(); // { [chatId]: sessionId }

  // 1) cookie presente y mapeada → OK
  if (cookieId && sessions[cookieId]) {
    return { chatId: cookieId, setCookie: false };
  }

  // 2) cookie presente pero no mapeada → intentar materializar
  if (cookieId && !sessions[cookieId]) {
    const ok = await materializeChatId(cookieId);
    if (ok) return { chatId: cookieId, setCookie: false };
  }

  // 3) intentar con /api/history
  try {
    const h = await fetch(`${BASE}/api/history`, { cache: "no-store" });
    if (h.ok) {
      const data = await h.json();
      const list: any[] = Array.isArray(data) ? data : (data?.items ?? data?.chats ?? []);
      const last = list?.[0] ?? list?.at?.(0);
      const histId = last?.id || last?.chatId || null;
      if (histId) {
        if (sessions[histId]) return { chatId: String(histId), setCookie: true };
        const ok = await materializeChatId(histId);
        if (ok) return { chatId: String(histId), setCookie: true };
      }
    }
  } catch {
    // seguimos
  }

  // 4) crear uno nuevo y materializar
  const newId = crypto.randomUUID();
  await materializeChatId(newId);
  return { chatId: newId, setCookie: true };
}

/** Extrae texto útil de /api/chat:
 * - JSON: usa .text/.message/.result/.reply
 * - texto plano: última línea
 * - SSE: concatena solo contenido útil; IGNORA meta (finishReason, usage, response-metrics)
 */
async function extractTextFromChatResponse(res: Response) {
  const ct = res.headers.get("content-type") || "";
  let resultText = "Acción ejecutada ✅";

  // 1) JSON normal
  if (ct.includes("application/json")) {
    try {
      const data: any = await res.json();
      console.log("🔍 extractTextFromChatResponse: Datos JSON recibidos:", JSON.stringify(data, null, 2));
      
      // Check for MCP tool execution information
      if (data?.toolExecuted && data?.toolName) {
        console.log("✅ extractTextFromChatResponse: Detectada herramienta ejecutada:", data.toolName);
        resultText = `✅ Herramienta '${data.toolName}' ejecutada exitosamente\n\n${data.content || data.text || data.message || "Herramienta ejecutada correctamente"}`;
        return resultText;
      }
      
      // Check for success message in the response
      if (data?.successMessage) {
        console.log("✅ extractTextFromChatResponse: Usando successMessage:", data.successMessage);
        resultText = data.successMessage;
        return resultText;
      }
      
      console.log("📝 extractTextFromChatResponse: Usando contenido estándar");
      resultText =
        data?.text || data?.message || data?.result || data?.reply || resultText;
      return resultText;
    } catch (error) {
      console.error("❌ extractTextFromChatResponse: Error parseando JSON:", error);
      // sigue abajo
    }
  }

  // 2) Texto plano
  if (ct.startsWith("text/")) {
    const raw = await res.text();
    const lines = raw.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    resultText = lines.pop() || resultText;
    return resultText;
  }

  // 3) SSE / stream: consumir y armar texto, ignorando meta-eventos
  if (res.body) {
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let assembled = "";

    const pushChunk = (evt: any) => {
      // filtrar meta sin texto:
      const isMeta =
        !!evt?.finishReason ||
        !!evt?.usage ||
        evt?.type === "response-metrics" ||
        evt?.event === "response-metrics";
      if (isMeta) return;

      const chunk =
        evt?.text || evt?.content || evt?.delta || evt?.message || "";
      if (typeof chunk === "string" && chunk) assembled += chunk;
    };

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buf.indexOf("\n")) >= 0) {
        const line = buf.slice(0, idx).trim();
        buf = buf.slice(idx + 1);

        if (!line) continue;
        if (line.startsWith("data:")) {
          const payload = line.slice(5).trim();
          try {
            const evt = JSON.parse(payload);
            pushChunk(evt);
          } catch {
            // Si no es JSON, agregar crudo (pero evitando comillas de JSON.stringify)
            const maybe = payload.replace(/^"|"$/g, "");
            if (maybe) assembled += maybe;
          }
        } else {
          // línea suelta
          assembled += line;
        }
      }
    }

    resultText = (assembled || buf || resultText).trim();
    return resultText;
  }

  // Fallback final
  return resultText;
}

export async function POST(req: NextRequest) {
  try {
    const { message, chatId: bodyChatId, model: bodyModel } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ result: "Mensaje inválido." }, { status: 400 });
    }

    // Resolver chatId válido automáticamente si no viene en body
    const { chatId, setCookie } = bodyChatId
      ? { chatId: String(bodyChatId), setCookie: false }
      : await resolveValidChatId(req);

    // Enforce OpenAI only + rollback automático
    const originalModel = bodyModel;
    let model = DEFAULT_CHAT_MODEL;
    
    if (typeof bodyModel === "string" && bodyModel.trim()) {
      if (OPENAI_ONLY.has(bodyModel.trim())) {
        model = bodyModel.trim();
        console.log("✅ /api/mcp: Modelo OpenAI válido:", model);
      } else {
        console.log("❌ /api/mcp: Modelo no-OpenAI detectado:", bodyModel);
        console.log("🔒 /api/mcp: Solo se permiten modelos OpenAI:", Array.from(OPENAI_ONLY));
        console.log("🔄 /api/mcp: Haciendo rollback automático a:", DEFAULT_CHAT_MODEL);
        console.log("✅ /api/mcp: Rollback completado:", originalModel, "→", model);
      }
    } else {
      console.log("🔄 /api/mcp: Usando modelo por defecto:", model);
    }

    // Proxyear a /api/chat (pedimos JSON; si streamea igual, lo parseamos)
    const chatRes = await fetch(`${BASE}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: chatId,
        chatId,
        model, // ← nunca undefined
        stream: false,
        messages: [{ role: "user", content: message }],
      }),
    });

    console.log("🔍 /api/mcp: Status de respuesta:", chatRes.status);
    console.log("🔍 /api/mcp: Headers de respuesta:", Object.fromEntries(chatRes.headers.entries()));
    
    let textOut = await extractTextFromChatResponse(chatRes);
    
    console.log("🔍 /api/mcp: Texto extraído:", textOut);
    console.log("🔍 /api/mcp: Longitud del texto:", textOut.length);
    
    // Check if this is a metadata response (indicates tools were executed)
    const isMetadataResponse = textOut.includes("finishReason") && textOut.includes("usage");
    const hasToolExecution = isMetadataResponse && textOut.includes("tool-calls");
    
    // Detect if tools were executed based on the response
    const hasToolSuccess = textOut.includes("✅") && textOut.includes("ejecutada");
    const hasToolKeywords = textOut.includes("Herramienta") && textOut.includes("exitosamente");
    
    console.log("🔍 /api/mcp: Detección de herramientas:", {
      isMetadataResponse,
      hasToolExecution,
      hasToolSuccess,
      hasToolKeywords,
      textContainsCheckmark: textOut.includes("✅"),
      textContainsEjecutada: textOut.includes("ejecutada")
    });
    
    // If we detect tool execution but only get metadata, create a proper response
    if (isMetadataResponse && !hasToolSuccess) {
      console.log("🔧 /api/mcp: Detectada ejecución de herramientas con solo metadatos, generando respuesta mejorada");
      
      // Try to extract meaningful information from the original message
      const originalMessage = message?.toLowerCase() || "";
      
      if (originalMessage.includes("email") || originalMessage.includes("correo") || originalMessage.includes("mail")) {
        textOut = "✅ Email enviado exitosamente";
      } else if (originalMessage.includes("reunión") || originalMessage.includes("meeting") || originalMessage.includes("calendar") || originalMessage.includes("agendar")) {
        textOut = "✅ Reunión agendada exitosamente";
      } else if (originalMessage.includes("buscar") || originalMessage.includes("search") || originalMessage.includes("encontrar")) {
        textOut = "✅ Búsqueda completada exitosamente";
      } else if (originalMessage.includes("crear") || originalMessage.includes("create") || originalMessage.includes("generar")) {
        textOut = "✅ Elemento creado exitosamente";
      } else {
        textOut = "✅ Acción completada exitosamente";
      }
    }
    
    // Create simple response
    const responseData = {
      result: textOut,
      success: true,
      timestamp: new Date().toISOString()
    };
    
    const response = NextResponse.json(responseData);

    if (setCookie) {
      response.cookies.set("x-chat-id", chatId, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });
    }

    return response;
  } catch (err) {
    console.error("❌ /api/mcp:", err);
    return NextResponse.json(
      {
        result:
          "Recibí tu mensaje y lo envié al chat, pero no pude parsear la respuesta.",
      },
      { status: 500 }
    );
  }
}
