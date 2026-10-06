# 🎨 Design System Documentation

## 📋 **Overview**

This design system provides a comprehensive foundation for building consistent, accessible, and beautiful user interfaces. It includes color tokens, typography scales, spacing systems, animation presets, and component variants.

---

## 🎨 **Color System**

### **Primary Colors**
```css
primary: {
  50: '#eff6ff',   /* Lightest */
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',  /* Base */
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
  950: '#172554',  /* Darkest */
}
```

### **Secondary Colors**
```css
secondary: {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',  /* Base */
  600: '#9333ea',
  700: '#7c3aed',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764',
}
```

### **Accent Colors**
```css
accent: {
  50: '#ecfdf5',
  100: '#d1fae5',
  200: '#a7f3d0',
  300: '#6ee7b7',
  400: '#34d399',
  500: '#10b981',  /* Base */
  600: '#059669',
  700: '#047857',
  800: '#065f46',
  900: '#064e3b',
  950: '#022c22',
}
```

### **Semantic Colors**
```css
semantic: {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
}
```

---

## 📝 **Typography System**

### **Font Families**
```css
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
  display: ['Inter', 'system-ui', 'sans-serif'],
}
```

### **Fluid Typography Scale**
```css
fontSize: {
  'fluid-xs': 'clamp(0.75rem, 2vw, 0.875rem)',
  'fluid-sm': 'clamp(0.875rem, 2.5vw, 1rem)',
  'fluid-base': 'clamp(1rem, 3vw, 1.125rem)',
  'fluid-lg': 'clamp(1.125rem, 3.5vw, 1.25rem)',
  'fluid-xl': 'clamp(1.25rem, 4vw, 1.5rem)',
  'fluid-2xl': 'clamp(1.5rem, 5vw, 2rem)',
  'fluid-3xl': 'clamp(1.875rem, 6vw, 2.5rem)',
  'fluid-4xl': 'clamp(2.25rem, 7vw, 3rem)',
  'fluid-5xl': 'clamp(3rem, 8vw, 4rem)',
  'fluid-6xl': 'clamp(3.75rem, 10vw, 5rem)',
}
```

### **Font Weights**
```css
fontWeight: {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
}
```

---

## 📏 **Spacing System**

### **Standard Spacing**
```css
spacing: {
  'xs': '0.5rem',    /* 8px */
  'sm': '1rem',      /* 16px */
  'md': '1.5rem',    /* 24px */
  'lg': '2rem',      /* 32px */
  'xl': '3rem',      /* 48px */
  '2xl': '4rem',     /* 64px */
  '3xl': '6rem',     /* 96px */
  '4xl': '8rem',     /* 128px */
}
```

### **Golden Ratio Spacing**
```css
spacing: {
  'golden-xs': '0.618rem',    /* 10px */
  'golden-sm': '1rem',        /* 16px */
  'golden-md': '1.618rem',    /* 26px */
  'golden-lg': '2.618rem',    /* 42px */
  'golden-xl': '4.236rem',    /* 68px */
  'golden-2xl': '6.854rem',   /* 110px */
}
```

---

## 🎬 **Animation System**

### **Duration Tokens**
```css
duration: {
  fast: '150ms',
  normal: '300ms',
  slow: '500ms',
  slower: '700ms',
  slowest: '1000ms',
}
```

### **Easing Functions**
```css
easing: {
  linear: 'linear',
  ease: 'ease',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
}
```

### **Spring Presets**
```javascript
spring: {
  gentle: { type: "spring", stiffness: 300, damping: 30 },
  wobbly: { type: "spring", stiffness: 400, damping: 25 },
  stiff: { type: "spring", stiffness: 500, damping: 40 },
  bouncy: { type: "spring", stiffness: 600, damping: 20 },
}
```

### **Animation Presets**
```javascript
presets: {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: "easeOut" }
  },
  bounceIn: {
    initial: { opacity: 0, scale: 0.3 },
    animate: { opacity: 1, scale: 1 },
    transition: { type: "spring", stiffness: 400, damping: 25 }
  }
}
```

---

## 🧩 **Component Variants**

### **Button Component**
```tsx
<Button 
  variant="primary"     // primary | secondary | outline | ghost | accent
  size="md"            // sm | md | lg | xl
  loading={false}      // boolean
  disabled={false}     // boolean
  icon={<Icon />}      // React.ReactNode
  iconPosition="left"  // left | right
  onClick={handleClick}
>
  Button Text
</Button>
```

### **Card Component**
```tsx
<Card 
  variant="default"    // default | elevated | outlined | filled
  size="md"           // sm | md | lg
  hover={true}        // boolean
  magnetic={true}     // boolean
  magneticStrength={0.1} // number
  onClick={handleClick}
>
  Card Content
</Card>
```

---

## ♿ **Accessibility Features**

### **Skip Links**
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### **Live Regions**
```tsx
<div aria-live="polite" aria-atomic="true" className="sr-only">
  Dynamic content announcements
</div>
```

### **Focus Management**
```tsx
const focusTrapRef = useFocusTrap(isActive);
const { saveFocus, restoreFocus } = useFocusRestore();
```

### **Announcement System**
```tsx
const { announce } = useAnnouncement();
announce('Action completed successfully', 'polite');
```

---

## 🎯 **Usage Guidelines**

### **Color Usage**
- Use primary colors for main actions and branding
- Use secondary colors for accents and highlights
- Use accent colors for success states and positive actions
- Use semantic colors for status indicators

### **Typography Usage**
- Use fluid typography for responsive scaling
- Use display font for headings and large text
- Use sans font for body text and UI elements
- Use mono font for code and technical content

### **Spacing Usage**
- Use standard spacing for consistent layouts
- Use golden ratio spacing for visual harmony
- Maintain consistent spacing relationships

### **Animation Usage**
- Use fast animations for micro-interactions
- Use normal animations for standard transitions
- Use slow animations for major state changes
- Use spring animations for natural movement

---

## 🚀 **Performance Considerations**

### **GPU Acceleration**
```css
transform-gpu /* Enables hardware acceleration */
```

### **Passive Event Listeners**
```javascript
window.addEventListener('scroll', handleScroll, { passive: true });
```

### **Optimized Animations**
- Use transform and opacity for smooth animations
- Avoid animating layout properties
- Use will-change for elements that will animate

---

## 📱 **Responsive Design**

### **Breakpoints**
```css
screens: {
  xs: "400px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  wide: "2880px",
}
```

### **Grid Systems**
```css
/* Auto-fit grid */
grid-cols-[repeat(auto-fit,minmax(300px,1fr))]

/* Masonry layout */
columns-1 md:columns-2 lg:columns-3
```

---

## 🎨 **Design Principles**

1. **Consistency**: Use design tokens for all visual elements
2. **Accessibility**: Ensure WCAG AA compliance
3. **Performance**: Optimize for smooth interactions
4. **Responsiveness**: Design for all screen sizes
5. **Usability**: Prioritize user experience

---

## 🔧 **Implementation**

### **Installation**
```bash
npm install framer-motion react-intersection-observer react-swipeable
```

### **Setup**
```tsx
import { AnnouncementProvider } from './components/AnnouncementSystem';
import { Button } from './components/ui/Button';
import { Card } from './components/ui/Card';
```

### **Usage**
```tsx
<AnnouncementProvider>
  <Button variant="primary" size="lg">
    Click me
  </Button>
  <Card variant="elevated" hover>
    Card content
  </Card>
</AnnouncementProvider>
```

---

This design system provides a solid foundation for building modern, accessible, and performant user interfaces. All components and tokens are designed to work together seamlessly while maintaining flexibility for customization.
