import { NextResponse } from "next/server";

const BASE = process.env.MCP_INTERNAL_ORIGIN ?? "http://localhost:3000";
// Usá el chatId que quieras “enganchar” (el de tu UI que ya funciona).
const DEFAULT_CHAT_ID =
  process.env.DEFAULT_CHAT_ID ??
  "e3ce85f6-c409-43f5-9b3b-e081e2fd94a9"; // 👈 poné acá el tuyo (o el 2b0b3492-... si querés usar ese)

export async function POST(req: Request) {
  try {
    const { message, chatId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { result: "Mensaje vacío o inválido." },
        { status: 400 }
      );
    }

    // 1) Proxy al endpoint real que dispara el motor MCP del chat
    // La mayoría de setups con App Router esperan body con { id, messages }
    const body = {
      id: chatId || DEFAULT_CHAT_ID,
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      selectedChatModel: "gpt-4o", // ← AGREGADO: modelo por defecto
      // si tu /api/chat soporta "stream: false", activalo para no recibir SSE
      stream: false,
    };

    const res = await fetch(`${BASE}/api/chat`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    // 2) Si /api/chat devuelve stream, quizá necesites otra vía. Muchos setups devuelven JSON.
    // Probamos parsear como JSON.
    let data: any = null;
    try {
      data = await res.json();
    } catch (e) {
      // Fallback: si no es JSON, devolvemos un texto genérico.
      return NextResponse.json({
        result:
          "Recibí tu mensaje y lo envié al chat, pero no pude parsear la respuesta.",
      });
    }

    // 3) Normalizamos una respuesta de texto para WhatsApp
    const text =
      data?.text ??
      data?.message ??
      data?.result ??
      data?.reply ??
      "Acción ejecutada ✅";

    return NextResponse.json({ result: text });
  } catch (error: any) {
    console.error("❌ Error en /api/mcp proxy:", error);
    return NextResponse.json(
      { result: "Error procesando el mensaje en MCP." },
      { status: 500 }
    );
  }
}
