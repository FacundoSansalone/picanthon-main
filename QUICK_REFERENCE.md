# 🎨 Guía Rápida de Identidad Visual

## Paleta de Colores Profesional

### Colores Principales
```css
/* Azul Profesional - Confianza */
--primary: hsl(217, 91%, 60%)

/* Azul Oscuro - Textos */
--foreground: hsl(217, 33%, 17%)

/* Dorado - Acciones Premium */
--accent: hsl(45, 93%, 47%)

/* Gris Neutro - Fondos */
--muted: hsl(220, 14%, 96%)
```

### Modo Oscuro
```css
/* Azul Oscuro Profundo */
--background: hsl(222, 47%, 11%)

/* Azul Brillante */
--primary: hsl(217, 91%, 60%)

/* Dorado */
--accent: hsl(45, 93%, 47%)
```

---

## Tipografía

```css
Font Family: Inter
Weights: 300, 400, 500, 600, 700
Letter Spacing: -0.011em (body), -0.025em (headings)
```

---

## Sistema de Sombras

```css
/* Base */
shadow-sm

/* Hover */
shadow-md

/* Focus/Active */
shadow-lg
```

---

## Border Radius

```css
/* Elementos pequeños (botones, badges) */
rounded-full / rounded-xl

/* Contenedores, inputs */
rounded-2xl

/* Base global */
--radius: 0.75rem
```

---

## Espaciado Estándar

```css
/* Padding interno componentes */
px-4 py-3

/* Padding contenedores */
p-8

/* Gaps entre elementos */
gap-4, gap-6, gap-8
```

---

## Transiciones

```css
/* Estándar */
transition-all duration-200

/* Colores hover */
hover:bg-accent/90
hover:text-primary/80
```

---

## Componentes Clave

### Burbuja de Mensaje Usuario
```tsx
className="bg-primary text-primary-foreground px-4 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
```

### Avatar Asistente
```tsx
className="size-8 flex items-center rounded-full justify-center shrink-0 bg-gradient-to-br from-primary to-accent shadow-sm"
```

### Input Principal
```tsx
className="rounded-2xl bg-muted/50 backdrop-blur-sm border-2 border-border/50 focus:border-primary/30 focus:bg-background shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200"
```

### Botón Enviar (CTA)
```tsx
className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md hover:shadow-lg transition-all duration-200"
```

---

## Filosofía de Diseño

1. **Cada elemento debe tener propósito**
2. **Espaciado generoso = calma visual**
3. **Transiciones suaves = profesionalismo**
4. **Sombras sutiles = profundidad premium**
5. **Colores sobrios = confianza empresarial**

---

## Para Nuevos Componentes

✅ Usar primary para acciones principales
✅ Usar accent para CTAs importantes
✅ Padding generoso (min 3-4 unidades)
✅ Border radius 2xl o full
✅ Transiciones en hover
✅ Sistema de sombras progresivo

❌ Evitar colores saturados
❌ Evitar iconografía caricaturesca
❌ Evitar espaciado reducido
❌ Evitar bordes marcados/duros
