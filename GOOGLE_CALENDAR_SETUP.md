# Configuración de Google Calendar

## Pasos para habilitar la integración con Google Calendar

### 1. Crear credenciales de Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a "APIs & Services" > "Credentials"
4. Haz clic en "Create Credentials" > "OAuth 2.0 Client ID"
5. Configura la pantalla de consentimiento OAuth si es necesario:
   - User Type: External
   - Scopes: Agrega los scopes necesarios (se configurarán automáticamente)

6. Crea el OAuth Client ID:
   - Application type: Web application
   - Name: "Uni Calendar Integration" (o el nombre que prefieras)
   - Authorized JavaScript origins:
     - `http://localhost:3000` (para desarrollo)
     - Tu dominio de producción cuando lo tengas
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (para desarrollo)
     - `https://tudominio.com/api/auth/callback/google` (para producción)

7. Copia el **Client ID** y **Client Secret**

### 2. Habilitar Google Calendar API

1. En Google Cloud Console, ve a "APIs & Services" > "Library"
2. Busca "Google Calendar API"
3. Haz clic en "Enable"

### 3. Configurar variables de entorno

Abre el archivo `.env` en la raíz del proyecto y descomenta/actualiza estas líneas:

```env
# Descomenta y reemplaza con tus credenciales
GOOGLE_CLIENT_ID=tu-client-id-aqui.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret-aqui
```

### 4. Deshabilitar modo sin autenticación (opcional)

Si quieres requerir autenticación, cambia en el archivo `.env`:

```env
DISABLE_AUTH=false
```

### 5. Reiniciar el servidor

Después de configurar las variables de entorno, reinicia el servidor de desarrollo:

```bash
# Detén el servidor actual (Ctrl+C)
# Luego reinicia
npm run dev
```

## Cómo funciona

1. **Primera vez**: Cuando un usuario hace clic en "Ver Agenda", se le pedirá que inicie sesión con Google
2. **Autorización**: Google pedirá permiso para acceder al calendario (solo lectura)
3. **Token de acceso**: Una vez autorizado, el token se guarda en la sesión
4. **Eventos**: La aplicación obtiene los próximos 50 eventos del calendario principal

## Características implementadas

- ✅ Autenticación OAuth con Google
- ✅ Solicitud de permisos de Calendar (solo lectura)
- ✅ API route para obtener eventos: `/api/calendar/events`
- ✅ Visualización de eventos con:
  - Título y descripción
  - Hora de inicio y fin
  - Ubicación
  - Links de videollamada (Google Meet, etc.)
- ✅ Botón de conexión funcional
- ✅ Manejo de errores y estados de carga
- ✅ Diseño profesional acorde al resto de la aplicación

## Troubleshooting

### Error: "No access token available"

Esto significa que no se ha completado el flujo de OAuth. Asegúrate de:
- Tener las credenciales configuradas en `.env`
- Haber reiniciado el servidor después de configurar las credenciales
- Hacer clic en "Conectar Google Calendar" para iniciar el flujo de OAuth

### Error 403 de Google Calendar API

Verifica que:
- La API de Google Calendar esté habilitada en Google Cloud Console
- Los scopes estén correctamente configurados
- El usuario haya dado permiso para acceder al calendario

### Redirect URI mismatch

Si ves este error, verifica que la URI de redirección en Google Cloud Console coincida exactamente con:
`http://localhost:3000/api/auth/callback/google`

## Seguridad

- Los tokens de acceso se almacenan en la sesión del usuario (encriptada)
- Solo se solicita acceso de lectura al calendario
- Las credenciales de Google nunca se exponen al cliente
- Cada usuario tiene su propio token de acceso aislado
