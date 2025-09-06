# 3D Interactive Components

A comprehensive suite of React Three Fiber components for creating immersive 3D experiences in your portfolio. These components are optimized for performance, accessibility, and user engagement.

## 🚀 Components Overview

### 1. Project3DPreview
Individual 3D project cards with animations and interactive elements.

### 2. Project3DShowcase
Carousel-style 3D display with orbital controls and smooth transitions.

### 3. Project3DModal
Full-screen immersive 3D viewer with advanced lighting and interactions.

### 4. Lazy3DWrapper
Performance-optimized lazy loading wrapper with memory management.

### 5. Project3DDemo
Comprehensive demo showcasing all components working together.

## 📦 Installation

```bash
npm install @react-three/fiber @react-three/drei three framer-motion
```

## 🎯 Quick Start

```tsx
import { Project3DPreview, Lazy3DWrapper } from './components/3d';

const MyComponent = () => {
  const project = {
    src: '/path/to/project-image.png',
    title: 'Project Title',
    name: 'Project Name',
    link: 'https://project-link.com',
    technologies: ['React', 'TypeScript', 'Three.js'],
    description: 'Project description'
  };

  return (
    <Lazy3DWrapper className="h-96">
      <Project3DPreview
        project={project}
        isActive={true}
        onProjectClick={() => console.log('Project clicked!')}
        enableAdvancedAnimations={true}
        showTechBadges={true}
      />
    </Lazy3DWrapper>
  );
};
```

## 🔧 Component APIs

### Project3DPreview

Individual 3D project cards with enhanced animations and accessibility.

```tsx
interface Project3DPreviewProps {
  project: {
    src: string;
    title: string;
    name: string;
    link: string;
    technologies?: string[];
    description?: string;
  };
  isActive: boolean;
  onProjectClick: () => void;
  className?: string;
  enableAdvancedAnimations?: boolean;
  showTechBadges?: boolean;
}
```

**Features:**
- ✅ Enhanced texture loading with error handling
- ✅ Dynamic technology badges
- ✅ Hover and active state animations
- ✅ Screen reader announcements
- ✅ Haptic feedback support
- ✅ Reduced motion preferences

### Project3DShowcase

Carousel-style 3D display with smooth transitions and orbital controls.

```tsx
interface Project3DShowcaseProps {
  projects: Array<{
    src: string;
    title: string;
    name: string;
    link: string;
    technologies?: string[];
    description?: string;
  }>;
  currentIndex: number;
  onProjectChange: (index: number) => void;
  onProjectClick: (project: any) => void;
  className?: string;
  enableAutoRotate?: boolean;
  enableSmoothTransitions?: boolean;
  showProjectInfo?: boolean;
}
```

**Features:**
- ✅ Smooth carousel transitions
- ✅ Enhanced orbital controls
- ✅ Project information overlay
- ✅ Keyboard navigation
- ✅ Performance monitoring
- ✅ Memory optimization

### Project3DModal

Full-screen immersive 3D viewer with advanced lighting and interactions.

```tsx
interface Project3DModalProps {
  project: {
    src: string;
    title: string;
    name: string;
    link: string;
    technologies?: string[];
    description?: string;
    features?: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  enableAdvancedLighting?: boolean;
  showProjectDetails?: boolean;
  enableFullscreen?: boolean;
}
```

**Features:**
- ✅ Full-screen immersive experience
- ✅ Advanced lighting system
- ✅ Fullscreen toggle (F key)
- ✅ Enhanced camera controls
- ✅ Project details overlay
- ✅ Focus trap for accessibility

### Lazy3DWrapper

Performance-optimized lazy loading wrapper with memory management.

```tsx
interface Lazy3DWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  enablePerformanceMonitoring?: boolean;
  enableMemoryOptimization?: boolean;
  preloadDelay?: number;
  unloadDelay?: number;
  showLoadingProgress?: boolean;
}
```

**Features:**
- ✅ Intersection Observer lazy loading
- ✅ Memory optimization with auto-unload
- ✅ Loading progress indicators
- ✅ Performance monitoring
- ✅ Configurable delays
- ✅ Accessibility announcements

## 🎮 Interaction Controls

### Mouse Controls
- **Click & Drag**: Rotate the 3D scene
- **Scroll**: Zoom in/out
- **Click**: Interact with project elements

### Keyboard Controls
- **Arrow Keys**: Navigate carousel (left/right)
- **Enter**: Open project details
- **F Key**: Toggle fullscreen (in modal)
- **Escape**: Close modal

## ♿ Accessibility Features

- **Screen Reader Support**: All interactions are announced
- **Keyboard Navigation**: Full keyboard accessibility
- **Reduced Motion**: Respects user preferences
- **Focus Management**: Proper focus trapping in modals
- **ARIA Labels**: Comprehensive labeling for assistive technologies

## ⚡ Performance Optimizations

- **Lazy Loading**: Components load only when visible
- **Memory Management**: Auto-unload when out of view
- **Texture Optimization**: Efficient texture loading and caching
- **Animation Optimization**: Reduced animations for better performance
- **Performance Monitoring**: Real-time FPS and memory tracking

## 🎨 Customization

### Styling
All components use Tailwind CSS classes and can be customized through the `className` prop.

### Colors
Technology badges use a predefined color palette that can be customized in each component.

### Animations
Animations can be disabled by setting `enableAdvancedAnimations={false}` or respecting `shouldReduceMotion`.

## 📱 Responsive Design

All components are fully responsive and adapt to different screen sizes:
- **Mobile**: Optimized touch interactions
- **Tablet**: Balanced experience
- **Desktop**: Full feature set

## 🔧 Advanced Usage

### Custom Fallback Component

```tsx
const CustomFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-pulse">Loading...</div>
  </div>
);

<Lazy3DWrapper fallback={<CustomFallback />}>
  <Project3DPreview {...props} />
</Lazy3DWrapper>
```

### Performance Monitoring

```tsx
<Lazy3DWrapper
  enablePerformanceMonitoring={true}
  enableMemoryOptimization={true}
  preloadDelay={200}
  unloadDelay={5000}
>
  <Project3DShowcase {...props} />
</Lazy3DWrapper>
```

### Custom Project Data

```tsx
const customProject = {
  src: '/path/to/image.png',
  title: 'Custom Project',
  name: 'My Project',
  link: 'https://myproject.com',
  technologies: ['React', 'TypeScript', 'Three.js', 'Framer Motion'],
  description: 'A detailed description of the project',
  features: ['Feature 1', 'Feature 2', 'Feature 3']
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Textures not loading**: Check image paths and CORS settings
2. **Performance issues**: Enable memory optimization and reduce particle count
3. **Accessibility issues**: Ensure proper ARIA labels and keyboard navigation

### Debug Mode

Enable performance monitoring to debug issues:

```tsx
<Lazy3DWrapper enablePerformanceMonitoring={true}>
  <Project3DPreview {...props} />
</Lazy3DWrapper>
```

## 📄 License

This component library is part of the sravanpolu.me portfolio project.

## 🤝 Contributing

Contributions are welcome! Please ensure all changes maintain accessibility standards and performance optimizations.

---

**Note**: These components require React 18+ and modern browser support for WebGL.