import React, { useState } from 'react';
import { CustomButton as Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Modal } from '../ui/Modal';
import { Dropdown } from '../ui/Dropdown';
import { useMagnetic } from '../../hooks/useMagnetic';
import { designTokens } from '../../design-tokens';

const ComponentShowcase: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref: magneticRef, handleMouseMove, handleMouseLeave } = useMagnetic({ strength: 0.1 });

  const dropdownItems = [
    {
      label: 'Profile',
      onClick: () => console.log('Profile clicked'),
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
    },
    {
      label: 'Settings',
      onClick: () => console.log('Settings clicked'),
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
    },
    {
      label: 'Sign out',
      onClick: () => console.log('Sign out clicked'),
      danger: true,
      icon: <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
    }
  ];

  return (
    <div className="p-8 space-y-8 bg-neutral-50 dark:bg-neutral-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-neutral-900 dark:text-white">
          Component Showcase
        </h1>

        {/* Button Variants */}
        <Card variant="elevated" size="lg" className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200">
            Button Variants
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button variant="primary" size="sm">Primary</Button>
            <Button variant="secondary" size="sm">Secondary</Button>
            <Button variant="accent" size="sm">Accent</Button>
            <Button variant="outline" size="sm">Outline</Button>
            <Button variant="ghost" size="sm">Ghost</Button>
            <Button variant="danger" size="sm">Danger</Button>
          </div>
        </Card>

        {/* Button Sizes */}
        <Card variant="elevated" size="lg" className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200">
            Button Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="xs">Extra Small</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" size="xl">Extra Large</Button>
          </div>
        </Card>

        {/* Magnetic Effects */}
        <Card 
          variant="glass" 
          size="lg" 
          className="mb-8"
          ref={magneticRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <h2 className="text-2xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200">
            Magnetic Effects
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">
            Hover over this card to see the magnetic effect in action!
          </p>
          <Button variant="primary" magnetic={true}>
            Magnetic Button
          </Button>
        </Card>

        {/* Container Queries Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card 
            variant="default" 
            size="md" 
            containerQuery={true}
            className="@container"
          >
            <h3 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
              Container Query Card
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 @[20rem]:text-base @[32rem]:text-lg">
              This text scales based on container size using container queries.
            </p>
          </Card>
          
          <Card 
            variant="gradient" 
            size="md" 
            containerQuery={true}
            className="@container"
          >
            <h3 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
              Gradient Card
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 @[20rem]:text-base @[32rem]:text-lg">
              Beautiful gradient background with container-responsive text.
            </p>
          </Card>
          
          <Card 
            variant="glass" 
            size="md" 
            containerQuery={true}
            className="@container"
          >
            <h3 className="text-lg font-semibold mb-2 text-neutral-800 dark:text-neutral-200">
              Glass Card
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 @[20rem]:text-base @[32rem]:text-lg">
              Glassmorphism effect with backdrop blur.
            </p>
          </Card>
        </div>

        {/* Interactive Components */}
        <Card variant="elevated" size="lg" className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200">
            Interactive Components
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(true)}
            >
              Open Modal
            </Button>
            
            <Dropdown
              trigger={
                <Button variant="outline">
                  Dropdown Menu
                </Button>
              }
              items={dropdownItems}
              position="right"
            />
            
            <Button 
              variant="accent" 
              loading={true}
            >
              Loading Button
            </Button>
          </div>
        </Card>

        {/* Design Tokens Demo */}
        <Card variant="elevated" size="lg">
          <h2 className="text-2xl font-semibold mb-6 text-neutral-800 dark:text-neutral-200">
            Design Tokens
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3 text-neutral-700 dark:text-neutral-300">
                Color Palette
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-500"></div>
                  <span className="text-sm">Primary: {designTokens.colors.primary[500]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary-500"></div>
                  <span className="text-sm">Secondary: {designTokens.colors.secondary[500]}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent-500"></div>
                  <span className="text-sm">Accent: {designTokens.colors.accent[500]}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3 text-neutral-700 dark:text-neutral-300">
                Animation Timing
              </h3>
              <div className="space-y-2 text-sm">
                <div>Fast: {designTokens.animation.duration.fast}</div>
                <div>Normal: {designTokens.animation.duration.normal}</div>
                <div>Slow: {designTokens.animation.duration.slow}</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-neutral-600 dark:text-neutral-400">
            This is an example modal built with Headless UI for better accessibility.
          </p>
          <div className="flex justify-end gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setIsModalOpen(false)}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ComponentShowcase;
