# Nueva Paleta de Colores - Azul Profesional

## 🎨 Paleta Definitiva

### Modo Claro

```css
/* Fondo principal */
--background: 220 14% 97%           /* Gris claro suave */

/* Textos */
--foreground: 215 25% 27%           /* Azul oscuro (texto principal) */
--muted-foreground: 215 16% 47%     /* Gris medio (texto secundario) */

/* Colores de acción */
--primary: 211 100% 43%             /* Azul profesional */
--accent: 199 89% 48%               /* Celeste claro (botones CTAs) */

/* Fondos secundarios */
--muted: 210 17% 95%                /* Gris muy claro */
--card: 0 0% 100%                   /* Blanco puro (tarjetas) */

/* Bordes */
--border: 214 20% 88%               /* Gris claro con tono azul */

/* Header */
--header-background: 215 28% 17%    /* Azul oscuro (barra superior) */
```

### Modo Oscuro

```css
/* Fondo principal */
--background: 215 28% 17%           /* Azul oscuro */

/* Textos */
--foreground: 210 20% 98%           /* Blanco suave */
--muted-foreground: 217 10% 65%     /* Gris claro */

/* Colores de acción */
--primary: 211 100% 50%             /* Azul brillante */
--accent: 199 89% 48%               /* Celeste claro */

/* Fondos secundarios */
--muted: 215 25% 27%                /* Azul oscuro medio */
--card: 215 28% 17%                 /* Azul oscuro */

/* Bordes */
--border: 215 25% 27%               /* Azul oscuro medio */

/* Header */
--header-background: 215 28% 17%    /* Azul oscuro (barra superior) */
```

---

## 🎯 Uso de Colores

### Primary (Azul Profesional)
- **Uso**: Elementos de navegación, burbujas de mensajes, avatares
- **Valor claro**: `hsl(211, 100%, 43%)` - Azul corporativo
- **Valor oscuro**: `hsl(211, 100%, 50%)` - Azul brillante

### Accent (Celeste Claro)
- **Uso**: Botones de acción importantes (enviar, confirmar)
- **Valor**: `hsl(199, 89%, 48%)` - Celeste suave
- **Reemplaza**: El dorado chillón anterior

### Header Background (Azul Oscuro)
- **Uso**: Barra superior sticky
- **Valor**: `hsl(215, 28%, 17%)` - Azul marino oscuro
- **Características**: Profesional, transmite autoridad

### Background (Gris Claro)
- **Uso**: Fondo principal de la aplicación
- **Valor claro**: `hsl(220, 14%, 97%)` - Casi blanco con tono gris
- **Características**: Reduce fatiga visual, profesional

---

## 🎨 Gradientes de Avatar

### Avatar de Uni
```tsx
className="bg-gradient-to-br from-primary to-accent"
```
- **Inicio**: Azul profesional (`primary`)
- **Fin**: Celeste claro (`accent`)
- **Efecto**: Gradiente suave y moderno

---

## 📊 Comparación con Versión Anterior

| Elemento | Antes | Ahora |
|----------|-------|-------|
| **Fondo** | Gris neutro | Gris claro con tono azul |
| **Primary** | Gris oscuro | Azul profesional |
| **Accent** | Dorado chillón | Celeste claro suave |
| **Header** | Sin color dedicado | Azul oscuro específico |
| **Avatar** | Gris → Dorado | Azul → Celeste |

---

## ✨ Ventajas de la Nueva Paleta

✅ **Profesionalismo**: Azul transmite confianza y estabilidad
✅ **Balance**: No demasiado azul, no demasiado gris
✅ **Jerarquía visual clara**: Header oscuro → Fondo claro
✅ **CTAs efectivos**: Celeste destaca sin ser agresivo
✅ **Coherencia**: Todos los tonos azules armonizan entre sí

---

## 🔧 Implementación Técnica

### Archivos Modificados

1. **[app/globals.css](app/globals.css)** - Variables CSS principales
2. **[components/chat-header.tsx](components/chat-header.tsx)** - Header con fondo azul oscuro
3. **[components/signed-out-header.tsx](components/signed-out-header.tsx)** - Header para usuarios no autenticados
4. **[components/chat.tsx](components/chat.tsx)** - Avatar de Uni
5. **[components/message.tsx](components/message.tsx)** - Avatares en mensajes

### Headers con Fondo Azul Oscuro
```tsx
style={{backgroundColor: 'hsl(var(--header-background))'}}
```

### Botones de Acción
Los botones ahora usan `--accent` (celeste) en lugar de dorado:
```tsx
className="bg-accent hover:bg-accent/90"
```

---

## 🎨 Identidad Visual Final

La aplicación ahora proyecta:
- **Confianza**: A través del azul corporativo
- **Profesionalismo**: Con barra superior oscura tipo navbar corporativo
- **Modernidad**: Gradientes suaves azul → celeste
- **Legibilidad**: Fondo gris claro que reduce fatiga visual
- **Acción clara**: Botones celestes que invitan al click

Perfecta para **empresarios, profesionales y estudiantes** que buscan una herramienta seria, confiable y agradable visualmente.
