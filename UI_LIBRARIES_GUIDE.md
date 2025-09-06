# UI Libraries Integration Guide

This project now includes several popular UI component libraries. Here's how to use each one:

## 🎨 Installed Libraries

### 1. **HyperUI** 
- **Type**: Copy-paste component library
- **Usage**: Custom components inspired by HyperUI design patterns
- **Location**: `src/components/UIExamples.tsx` (HyperUI section)
- **Features**: Clean, minimal components with custom styling

### 2. **Tailblocks**
- **Type**: Copy-paste component library  
- **Usage**: Modern, clean components with Tailwind CSS
- **Location**: `src/components/UIExamples.tsx` (Tailblocks section)
- **Features**: Professional-looking components with great typography

### 3. **Flowbite**
- **Type**: React component library
- **Package**: `flowbite-react`
- **Usage**: Import components directly from the library
- **Features**: Built-in dark mode, accessibility, and TypeScript support

```tsx
import { Button, Card, Badge, Alert } from 'flowbite-react';

// Usage
<Button color="blue">Click me</Button>
<Card className="max-w-sm">
  <h5 className="text-2xl font-bold">Card Title</h5>
  <p>Card content</p>
</Card>
```

### 4. **Headless UI**
- **Type**: Unstyled, accessible components
- **Package**: `@headlessui/react`
- **Usage**: Provides behavior and accessibility, you style them
- **Features**: Focus management, keyboard navigation, screen reader support

```tsx
import { Dialog, Transition } from '@headlessui/react';

// Usage
<Dialog open={isOpen} onClose={setIsOpen}>
  <Dialog.Panel>
    <Dialog.Title>Modal Title</Dialog.Title>
    {/* Modal content */}
  </Dialog.Panel>
</Dialog>
```

### 5. **DaisyUI**
- **Type**: Tailwind CSS component library
- **Package**: `daisyui`
- **Usage**: Use semantic class names with Tailwind
- **Features**: Multiple themes, semantic naming, utility-first

```tsx
// Usage
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p>Card content</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```

## 🚀 How to Access Examples

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Click the "🎨 UI Examples" button** in the top-right corner of your portfolio

3. **Explore different sections**:
   - HyperUI Components
   - Tailblocks Components  
   - Flowbite Components
   - Headless UI Components
   - DaisyUI Components

## 📦 Package.json Dependencies

The following packages have been installed:

```json
{
  "dependencies": {
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "flowbite": "^2.2.1",
    "flowbite-react": "^1.6.0"
  },
  "devDependencies": {
    "@tailwindcss/forms": "^0.5.7",
    "@tailwindcss/typography": "^0.5.10",
    "daisyui": "^5.0.3",
    "tailwindcss": "^3.3.3"
  }
}
```

## ⚙️ Tailwind Configuration

The `tailwind.config.js` has been updated to include all necessary plugins:

```javascript
plugins: [
  require("daisyui"),
  require("@tailwindcss/forms"),
  require("@tailwindcss/typography"),
  require("flowbite/plugin")
],
```

## 🎯 Best Practices

### When to Use Each Library:

- **HyperUI/Tailblocks**: For custom, unique designs that need specific styling
- **Flowbite**: For rapid prototyping with pre-built, styled components
- **Headless UI**: For custom designs that need accessibility features
- **DaisyUI**: For consistent, themeable components with semantic naming

### Combining Libraries:

You can mix and match components from different libraries:

```tsx
import { Button } from 'flowbite-react';
import { Dialog } from '@headlessui/react';

// Flowbite button inside Headless UI modal
<Dialog.Panel>
  <Button color="blue">Flowbite Button</Button>
</Dialog.Panel>
```

## 🔧 Customization

### DaisyUI Themes:
Available themes in `tailwind.config.js`:
- `night` (default dark)
- `business` 
- `dark`
- `cmyk`

### Flowbite Customization:
- Use Tailwind classes to override default styles
- Customize colors using Flowbite's color system
- Extend components with additional props

### Headless UI Styling:
- Add your own Tailwind classes
- Use CSS modules or styled-components
- Leverage the unstyled nature for complete control

## 📚 Resources

- [HyperUI](https://www.hyperui.dev/) - Copy-paste components
- [Tailblocks](https://tailblocks.cc/) - Copy-paste components  
- [Flowbite](https://flowbite.com/) - React components
- [Headless UI](https://headlessui.com/) - Unstyled components
- [DaisyUI](https://daisyui.com/) - Tailwind components

## 🎨 Example Usage in Your Components

```tsx
// Mixing different libraries
import { Card } from 'flowbite-react';
import { Dialog } from '@headlessui/react';

const MyComponent = () => {
  return (
    <Card>
      <h5 className="text-2xl font-bold">My Card</h5>
      <p>This card uses Flowbite styling</p>
      <button className="btn btn-primary">DaisyUI Button</button>
    </Card>
  );
};
```

Happy coding! 🚀
