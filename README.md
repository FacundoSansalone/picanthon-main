# 📧 Gmail & Calendar AI Assistant

Asistente de IA que automatiza **Gmail** y **Google Calendar** usando lenguaje natural.

---

##  Qué Puedes Hacer

### 📧 Gmail
- Enviar emails → *"Envía un email a juan@example.com con el reporte"*
- Leer emails → *"¿Tengo emails sin leer de María?"*(Solo funciona en la web app, no por wpp)
- Buscar emails → *"Busca emails sobre el Asunto X"*(Solo funciona en la web app, no por wpp)
- Responder emails → *"Responde al último email de soporte"*(Solo funciona en la web app, no por wpp)

### 📅 Google Calendar
- Crear eventos → *"Agenda reunión mañana a las 3pm"*
- Ver agenda → *"¿Qué tengo el viernes?"*(Solo por web)


---

## 🚀 Cómo Levantar la App

### 1. Requisitos
- **Node.js 18+** → [Descargar](https://nodejs.org/)
- **pnpm** → Instalar: `npm install -g pnpm`

### 2. Instalación

```bash
# Clonar el repositorio
git clone <tu-repo>
cd picanthon-main

# Instalar dependencias
pnpm install
```

### 3. Configurar `.env`

Crea un archivo `.env` en la raíz:
##Copiar el .env.example


### 4. Iniciar

```bash
pnpm run dev
```

Abre: **http://localhost:3000**

---

## 🔗 Conectar Gmail/Calendar

1. Envía un mensaje: *"Envía un email a test@example.com"*
2. Click en **"Connect account"**
3. Autoriza con Google
4. ¡Listo! Ya puedes usar Gmail y Calendar

Ver cuentas conectadas: **http://localhost:3000/accounts**

---

## 📝 Ejemplos

```
Usuario: Envía un email a manuel@test.com diciendo "Confirmo la reunión"
IA: ✅ Email enviado correctamente

Usuario: ¿Qué tengo mañana?
IA: Mañana tienes:
    - 9:00 AM - Reunión semanal
    - 2:00 PM - Presentación del proyecto

Usuario: Agenda una call con el equipo el jueves a las 4pm
IA: ✅ Evento creado: "Call con el equipo"
    📅 Jueves, 20 de octubre, 16:00 - 17:00
```

---

## 🛠️ Solución de Problemas

**Puerto ocupado:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <número> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

**No conecta con Gmail:**
- Verifica las credenciales de Pipedream en `.env`
- Reconecta la cuenta en `/accounts`

**Reinstalar dependencias:**
```bash
rm -rf node_modules .next
pnpm install
```

