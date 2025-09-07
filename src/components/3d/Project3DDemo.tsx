import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Project3DPreview, Project3DShowcase, Project3DModal, Lazy3DWrapper } from './index';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useHaptic } from '../../hooks/useHaptic';

// Sample project data for demonstration
const sampleProjects = [
  {
    src: '/src/assets/images/boostlly.png',
    title: 'E-commerce Platform',
    name: 'Boostlly',
    link: 'https://boostlly.com',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    description: 'A modern e-commerce platform with advanced features and beautiful UI'
  },
  {
    src: '/src/assets/images/NetFlixDemo.png',
    title: 'Streaming Service Clone',
    name: 'Netflix Demo',
    link: 'https://netflix-demo.com',
    technologies: ['React', 'Redux', 'Firebase', 'Material-UI'],
    description: 'A Netflix-inspired streaming platform with user authentication and content management'
  },
  {
    src: '/src/assets/images/NikeDemo.png',
    title: 'E-commerce Store',
    name: 'Nike Demo',
    link: 'https://nike-demo.com',
    technologies: ['Next.js', 'Stripe', 'Sanity CMS', 'Vercel'],
    description: 'A premium shoe store with advanced filtering and payment integration'
  },
  {
    src: '/src/assets/images/stripeDemo.png',
    title: 'Payment Integration',
    name: 'Stripe Demo',
    link: 'https://stripe-demo.com',
    technologies: ['React', 'Stripe', 'Express.js', 'PostgreSQL'],
    description: 'A comprehensive payment processing system with subscription management'
  },
  {
    src: '/src/assets/images/vanlife.png',
    title: 'Travel Platform',
    name: 'VanLife',
    link: 'https://vanlife.com',
    technologies: ['React', 'Mapbox', 'Node.js', 'MongoDB'],
    description: 'A community-driven platform for van life enthusiasts'
  }
];

interface Project3DDemoProps {
  className?: string;
}

const Project3DDemo: React.FC<Project3DDemoProps> = ({ className = '' }) => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<typeof sampleProjects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demoMode, setDemoMode] = useState<'preview' | 'showcase' | 'modal'>('showcase');
  const { shouldReduceMotion } = useAccessibility();
  const { triggerHaptic } = useHaptic();

  const handleProjectChange = useCallback((index: number) => {
    setCurrentProjectIndex(index);
    triggerHaptic('light');
  }, [triggerHaptic]);

  const handleProjectClick = useCallback((project: typeof sampleProjects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    triggerHaptic('medium');
  }, [triggerHaptic]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProject(null);
    triggerHaptic('light');
  }, [triggerHaptic]);

  const handlePreviewClick = useCallback(() => {
    setDemoMode('preview');
    triggerHaptic('light');
  }, [triggerHaptic]);

  const handleShowcaseClick = useCallback(() => {
    setDemoMode('showcase');
    triggerHaptic('light');
  }, [triggerHaptic]);

  const handleModalClick = useCallback(() => {
    setDemoMode('modal');
    setSelectedProject(sampleProjects[currentProjectIndex]);
    setIsModalOpen(true);
    triggerHaptic('medium');
  }, [currentProjectIndex, triggerHaptic]);

  return (
    <div className={`w-full max-w-7xl mx-auto p-6 ${className}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
          3D Interactive Components Demo
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
          Experience the power of our enhanced 3D components with smooth animations, 
          accessibility features, and performance optimizations.
        </p>
        
        {/* Demo Mode Selector */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handlePreviewClick}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              demoMode === 'preview'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }`}
          >
            Individual Preview
          </button>
          <button
            onClick={handleShowcaseClick}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              demoMode === 'showcase'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }`}
          >
            Carousel Showcase
          </button>
          <button
            onClick={handleModalClick}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              demoMode === 'modal'
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
            }`}
          >
            Full-Screen Modal
          </button>
        </div>
      </motion.div>

      {/* Demo Content */}
      <motion.div
        key={demoMode}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8"
      >
        {demoMode === 'preview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProjects.slice(0, 3).map((project, index) => (
              <Lazy3DWrapper
                key={project.name}
                className="h-96"
                enablePerformanceMonitoring={true}
                enableMemoryOptimization={true}
                showLoadingProgress={true}
                preloadDelay={200}
                unloadDelay={3000}
              >
                <Project3DPreview
                  project={project}
                  isActive={index === 0}
                  onProjectClick={() => handleProjectClick(project)}
                  enableAdvancedAnimations={!shouldReduceMotion}
                  showTechBadges={true}
                />
              </Lazy3DWrapper>
            ))}
          </div>
        )}

        {demoMode === 'showcase' && (
          <Lazy3DWrapper
            className="h-[400px] sm:h-[500px] md:h-[600px]"
            enablePerformanceMonitoring={true}
            enableMemoryOptimization={true}
            showLoadingProgress={true}
            preloadDelay={100}
            unloadDelay={5000}
          >
            <Project3DShowcase
              projects={sampleProjects}
              currentIndex={currentProjectIndex}
              onProjectChange={handleProjectChange}
              onProjectClick={handleProjectClick}
              enableAutoRotate={false}
              enableSmoothTransitions={!shouldReduceMotion}
              showProjectInfo={true}
            />
          </Lazy3DWrapper>
        )}

        {demoMode === 'modal' && selectedProject && (
          <div className="text-center">
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-8 mb-6">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                Click the button below to open the full-screen 3D modal
              </h3>
              <button
                onClick={handleModalClick}
                className="px-8 py-4 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-lg"
              >
                Open 3D Modal
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Features Showcase */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Performance Optimized
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Lazy loading, memory optimization, and performance monitoring for smooth 3D experiences.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Accessibility First
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Screen reader support, keyboard navigation, and reduced motion preferences.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Interactive Controls
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Orbital controls, haptic feedback, and smooth transitions for engaging interactions.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-6 shadow-lg">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
            Advanced Lighting
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Dynamic lighting, shadows, and environmental effects for realistic 3D rendering.
          </p>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg p-6"
      >
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
          🎮 How to Interact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-neutral-600 dark:text-neutral-400">
          <div>
            <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-2">Mouse Controls:</h4>
            <ul className="space-y-1">
              <li>• Click & drag to rotate the 3D scene</li>
              <li>• Scroll to zoom in/out</li>
              <li>• Click on project cards to interact</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-2">Keyboard Controls:</h4>
            <ul className="space-y-1">
              <li>• Arrow keys to navigate carousel</li>
              <li>• Enter to open project details</li>
              <li>• F key for fullscreen (in modal)</li>
              <li>• Escape to close modal</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {selectedProject && (
        <Project3DModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          enableAdvancedLighting={!shouldReduceMotion}
          showProjectDetails={true}
          enableFullscreen={true}
        />
      )}
    </div>
  );
};

export default Project3DDemo;
