# Diseño Centrado - Burbuja de Bienvenida

## ✨ Nueva Estructura

La burbuja de bienvenida ahora tiene un diseño **vertical y centrado** que maximiza el impacto visual.

---

## 🎨 Estructura del Diseño

### Layout Vertical
```
┌─────────────────────────┐
│                         │
│      🌟 Logo Uni        │  ← Centrado arriba
│         (grande)        │
│                         │
├─────────────────────────┤
│                         │
│   ┌─────────────────┐   │
│   │ Hola, soy Uni   │   │  ← Burbuja centrada
│   │                 │   │
│   │ Tu secretario   │   │
│   │  virtual...     │   │
│   └─────────────────┘   │
│                         │
├─────────────────────────┤
│                         │
│   [Barra de escribir]   │  ← Input centrado
│                         │
└─────────────────────────┘
```

---

## 🔧 Implementación Técnica

### Logo Centrado Arriba
```tsx
<div className="mb-8 flex justify-center">
  <div className="size-16 md:size-20 flex items-center rounded-full justify-center bg-gradient-to-br from-primary to-accent shadow-lg">
    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {/* Icono de estrella */}
    </svg>
  </div>
</div>
```

**Características:**
- Tamaño: `64px` móvil, `80px` desktop (más grande)
- Icono: `32px` móvil, `40px` desktop
- Centrado con `flex justify-center`
- Margen inferior `mb-8` (32px)
- Gradiente azul → celeste
- Sombra `shadow-lg` para profundidad

---

### Burbuja de Texto Centrada
```tsx
<div className="w-full max-w-2xl mb-10">
  <div className="bg-card/80 backdrop-blur-md border-2 border-border/60 rounded-3xl px-8 py-6 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 tracking-tight">
      Hola, soy Uni
    </h2>
    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
      Tu nuevo secretario virtual. ¿Cómo puedo ayudarte hoy?
    </p>
  </div>
</div>
```

**Características:**
- Ancho máximo: `672px` (`max-w-2xl`) - alineado con el input
- Texto centrado: `text-center`
- Margen inferior `mb-10` (40px) antes del input
- Efectos premium: blur, borders, shadows

---

### Contenedor Principal
```tsx
<div className="flex-1 flex flex-col justify-center items-center px-4">
  {/* Logo */}
  {/* Burbuja */}
</div>
```

**Características:**
- `justify-center`: Centra verticalmente
- `items-center`: Centra horizontalmente
- `px-4`: Padding horizontal consistente

---

## 📐 Medidas y Espaciado

### Logo
| Elemento | Móvil | Desktop |
|----------|-------|---------|
| **Avatar** | 64px | 80px |
| **Icono** | 32px | 40px |
| **Margen inferior** | 32px | 32px |
| **Shadow** | lg | lg |

### Burbuja
| Elemento | Valor |
|----------|-------|
| **Max width** | 672px (2xl) |
| **Padding X** | 32px |
| **Padding Y** | 24px |
| **Border** | 2px |
| **Radius** | 24px (3xl) |
| **Margen inferior** | 40px |

### Tipografía
| Elemento | Móvil | Desktop |
|----------|-------|---------|
| **Título** | 24px | 30px |
| **Subtítulo** | 18px | 20px |
| **Weight título** | 600 | 600 |
| **Weight subtítulo** | 300 | 300 |

---

## 🎯 Ventajas del Diseño Centrado

### Jerarquía Visual Clara
1. **Logo arriba**: Primer punto de atención
2. **Mensaje**: Segundo punto focal
3. **Input**: Llamada a la acción

### Simetría Perfecta
✅ Logo centrado horizontalmente
✅ Burbuja centrada horizontalmente
✅ Input centrado (max-w-3xl)
✅ Todo alineado en el mismo eje vertical

### Impacto Visual
✅ Logo más grande (64-80px) vs antes (56-64px)
✅ Espacio generoso entre elementos
✅ Texto centrado para mejor lectura
✅ Diseño limpio y minimalista

### Experiencia de Usuario
✅ Flujo natural: Logo → Mensaje → Acción
✅ Fácil de escanear visualmente
✅ Invita a la interacción
✅ Profesional y acogedor

---

## 🎨 Comparación con Diseño Anterior

### Antes (Horizontal) ❌
```
┌────────────────────────────────┐
│ 🌟  Hola, soy Uni             │
│     Tu secretario virtual...   │
└────────────────────────────────┘
```
- Logo a la izquierda
- Texto alineado a la izquierda
- Desbalanceado visualmente

### Ahora (Vertical Centrado) ✅
```
        🌟

   Hola, soy Uni

Tu secretario virtual...
```
- Logo centrado arriba
- Texto centrado
- Balance perfecto

---

## 📱 Responsive Design

### Móvil (< 768px)
- Logo: 64px
- Icono: 32px
- Título: 24px (text-2xl)
- Subtítulo: 18px (text-lg)
- Padding: 32px horizontal

### Desktop (>= 768px)
- Logo: 80px
- Icono: 40px
- Título: 30px (text-3xl)
- Subtítulo: 20px (text-xl)
- Mantiene mismo padding

---

## ✨ Detalles Premium

### Logo
- Gradiente azul → celeste
- Sombra pronunciada (lg)
- Icono de estrella vectorial
- Animación hover implícita

### Burbuja
- Fondo semi-transparente (80%)
- Backdrop blur medium
- Border 2px visible
- Bordes muy suaves (3xl)
- Sombra interactiva (lg → xl)
- Transición suave (300ms)

### Tipografía
- Inter semibold en título
- Inter light en subtítulo
- Tracking tight en título
- Leading relaxed en subtítulo
- Contraste de pesos para jerarquía

---

## 🎯 Resultado Final

La burbuja de bienvenida ahora:
- ✅ **Logo centrado arriba** para máximo impacto
- ✅ **Texto centrado** para mejor legibilidad
- ✅ **Alineación con input** (max-w-2xl vs max-w-3xl)
- ✅ **Jerarquía visual clara** (Logo → Mensaje → Acción)
- ✅ **Diseño limpio y profesional**
- ✅ **Efectos premium sutiles**

El diseño transmite **profesionalismo, modernidad y calidez** desde el primer momento, invitando al usuario a iniciar la conversación con Uni.
