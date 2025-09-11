import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Float
} from '@react-three/drei';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useHaptic } from '../../hooks/useHaptic';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { use3DAccessibility } from '../../hooks/use3DAccessibility';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';
import Project3DPreview from './Project3DPreview';
import * as THREE from 'three';

// WebGL Renderer Configuration Component
const WebGLConfig: React.FC = () => {
  const { gl } = useThree();
  
  useEffect(() => {
    // Configure color space and tone mapping for ultra-sharp clarity
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.5;
    
    // Configure device pixel ratio (cap at 3 for high-DPI sharpness)
    const dpr = Math.min(window.devicePixelRatio, 3);
    gl.setPixelRatio(dpr);
    
    // Enable proper shadow rendering with high quality
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.shadowMap.autoUpdate = true;
    
    // Configure renderer for maximum clarity
    gl.toneMappingExposure = 1.2;
    
    console.log('WebGL configured for sharp clarity:', {
      colorSpace: gl.outputColorSpace,
      toneMapping: gl.toneMapping,
      toneMappingExposure: gl.toneMappingExposure,
      pixelRatio: gl.getPixelRatio(),
      shadowMap: gl.shadowMap.enabled,
      shadowMapType: gl.shadowMap.type
    });
  }, [gl]);
  
  return null;
};

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

// Enhanced 3D Carousel Scene
const Project3DCarousel: React.FC<{
  projects: Project3DShowcaseProps['projects'];
  currentIndex: number;
  onProjectClick: (project: any) => void;
  enableSmoothTransitions?: boolean;
}> = ({ projects, currentIndex, onProjectClick, enableSmoothTransitions = true }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { shouldReduceMotion } = useAccessibility();
  const { announce } = use3DAccessibility();

  // Smooth rotation animation
  useFrame((state) => {
    if (!groupRef.current || shouldReduceMotion) return;
    
    const targetRotation = (currentIndex * -Math.PI * 2) / projects.length;
    
    if (enableSmoothTransitions) {
      // Smooth interpolation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.05
      );
    } else {
      // Instant rotation
      groupRef.current.rotation.y = targetRotation;
    }
  });

  // Announce project changes for accessibility
  useEffect(() => {
    if (projects[currentIndex]) {
      announce(`Now viewing ${projects[currentIndex].name} project`);
    }
  }, [currentIndex, projects, announce]);

  // Memoized project positions for better performance
  const projectPositions = useMemo(() => {
    return projects.map((_, index) => {
      const angle = (index * Math.PI * 2) / projects.length;
      const radius = 4;
      return {
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        rotation: -angle
      };
    });
  }, [projects]);

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        const position = projectPositions[index];
        const isActive = index === currentIndex;
        
        return (
          <group key={`${project.name}-${index}`} position={[position.x, 0, position.z]} rotation={[0, position.rotation, 0]}>
            {shouldReduceMotion ? (
              <Project3DPreview
                project={project}
                isActive={isActive}
                onProjectClick={() => onProjectClick(project)}
                enableAdvancedAnimations={false}
                showTechBadges={true}
              />
            ) : (
              <Float
                speed={1 + index * 0.1}
                rotationIntensity={0.2}
                floatIntensity={isActive ? 0.2 : 0.1}
              >
                <Project3DPreview
                  project={project}
                  isActive={isActive}
                  onProjectClick={() => onProjectClick(project)}
                  enableAdvancedAnimations={true}
                  showTechBadges={true}
                />
              </Float>
            )}
          </group>
        );
      })}
    </group>
  );
};

// Enhanced 3D Environment Scene
const Showcase3DScene: React.FC<{
  projects: Project3DShowcaseProps['projects'];
  currentIndex: number;
  onProjectClick: (project: any) => void;
  enableSmoothTransitions?: boolean;
  enableAutoRotate?: boolean;
}> = ({ projects, currentIndex, onProjectClick, enableSmoothTransitions = true, enableAutoRotate = false }) => {
  const { shouldReduceMotion } = useAccessibility();
  
  // Performance monitoring
  usePerformanceMonitor('Showcase3DScene', {
    enableMemoryMonitoring: true,
    enableFPSMonitoring: true
  });
  
  return (
    <>
      {/* Enhanced Advanced Lighting Setup for Sharp Clarity */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={2.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-bias={-0.0001}
      />
      <directionalLight
        position={[-6, 10, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 8, 6]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, -4, 6]} intensity={0.8} color="#ffffff" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.2}
        penumbra={0.5}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Environment with reduced intensity for clarity */}
      <Environment preset="studio" background={false} />

      {/* Main Carousel */}
      <Project3DCarousel
        projects={projects}
        currentIndex={currentIndex}
        onProjectClick={onProjectClick}
        enableSmoothTransitions={enableSmoothTransitions}
      />

      {/* Background Elements */}
      <group position={[0, -3, -8]}>
        <ContactShadows
          opacity={0.6}
          scale={20}
          blur={1}
          far={4}
          resolution={1024}
          color="#000000"
        />
      </group>

      {/* Enhanced Floating Particles */}
      {Array.from({ length: shouldReduceMotion ? 10 : 20 }).map((_, i) => {
        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
        const mesh = (
          <mesh
            key={`particle-${i}`}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 20
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial
              color={colors[i % colors.length]}
              transparent
              opacity={0.3}
            />
          </mesh>
        );
        
        return shouldReduceMotion ? mesh : (
          <Float
            key={`particle-float-${i}`}
            speed={0.5 + Math.random() * 1}
            rotationIntensity={0.1}
            floatIntensity={0.2}
          >
            {mesh}
          </Float>
        );
      })}
    </>
  );
};

// Main Enhanced Showcase Component
const Project3DShowcase: React.FC<Project3DShowcaseProps> = ({
  projects,
  currentIndex,
  onProjectChange,
  onProjectClick,
  className = '',
  enableAutoRotate = false,
  enableSmoothTransitions = true,
  showProjectInfo = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { shouldReduceMotion } = useAccessibility();
  const { triggerHaptic } = useHaptic();
  const { announce } = use3DAccessibility();

  // Enhanced keyboard navigation with transition handling
  useKeyboardNavigation({
    onArrowLeft: () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
      onProjectChange(prevIndex);
      triggerHaptic('light');
      announce(`Navigated to ${projects[prevIndex]?.name || 'previous project'}`);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    onArrowRight: () => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
      onProjectChange(nextIndex);
      triggerHaptic('light');
      announce(`Navigated to ${projects[nextIndex]?.name || 'next project'}`);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    onEnter: () => {
      onProjectClick(projects[currentIndex]);
      triggerHaptic('medium');
      announce(`Opening ${projects[currentIndex]?.name || 'project'}`);
    }
  });

  const handlePrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const prevIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    onProjectChange(prevIndex);
    triggerHaptic('light');
    announce(`Navigated to ${projects[prevIndex]?.name || 'previous project'}`);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, projects, onProjectChange, triggerHaptic, announce, isTransitioning]);

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    const nextIndex = currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    onProjectChange(nextIndex);
    triggerHaptic('light');
    announce(`Navigated to ${projects[nextIndex]?.name || 'next project'}`);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, projects, onProjectChange, triggerHaptic, announce, isTransitioning]);

  const handleProjectChange = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    onProjectChange(index);
    triggerHaptic('light');
    announce(`Navigated to ${projects[index]?.name || 'project'}`);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentIndex, projects, onProjectChange, triggerHaptic, announce, isTransitioning]);

  return (
    <div className={`relative w-full h-[400px] sm:h-[500px] md:h-[600px] ${className}`}>
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 rounded-xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400">Loading 3D Experience...</p>
          </div>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 1, 10], fov: 45, up: [0, 1, 0] }}
        onCreated={() => setIsLoaded(true)}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.5,
          precision: 'highp',
          logarithmicDepthBuffer: true
        }}
        dpr={[1, 3]}
        style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out'
        }}
      >
        <WebGLConfig />
        <Showcase3DScene
          projects={projects}
          currentIndex={currentIndex}
          onProjectClick={onProjectClick}
          enableSmoothTransitions={enableSmoothTransitions}
          enableAutoRotate={enableAutoRotate}
        />
        
        {/* Enhanced Camera Controls - Mobile optimized */}
        {!shouldReduceMotion && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={enableAutoRotate}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI * 0.75}
            minPolarAngle={Math.PI * 0.25}
            maxDistance={15}
            minDistance={6}
            touches={{
              ONE: 2, // Single finger for rotation
              TWO: 1  // Two fingers for zoom
            }}
            dampingFactor={0.05}
            enableDamping={true}
          />
        )}
      </Canvas>

      {/* Enhanced Navigation Controls - Mobile optimized */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 sm:gap-4">
        <button
          onClick={handlePrevious}
          disabled={isTransitioning}
          className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all ${
            isTransitioning 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-110 hover:shadow-xl'
          }`}
          aria-label="Previous project"
        >
          <svg className="w-6 h-6 text-neutral-700 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Enhanced Project Indicators */}
        <div className="flex gap-2">
          {projects.map((project, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => handleProjectChange(index)}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-primary-500 scale-125 shadow-lg"
                  : "bg-neutral-300 dark:bg-neutral-600 hover:bg-neutral-400 dark:hover:bg-neutral-500"
              } ${isTransitioning ? 'opacity-50' : ''}`}
              aria-label={`Go to ${project.name} project`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={isTransitioning}
          className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center transition-all ${
            isTransitioning 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:scale-110 hover:shadow-xl'
          }`}
          aria-label="Next project"
        >
          <svg className="w-6 h-6 text-neutral-700 dark:text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Enhanced Project Info Overlay */}
      {showProjectInfo && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            key={currentIndex}
            className="absolute top-6 left-6 right-6"
          >
            <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
              <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-2">
                {projects[currentIndex]?.name}
              </h3>
              {projects[currentIndex]?.description && (
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                  {projects[currentIndex].description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Project {currentIndex + 1} of {projects.length}
                </p>
                {(() => {
                  const currentProject = projects[currentIndex];
                  const technologies = currentProject?.technologies;
                  return technologies && technologies.length > 0 && (
                    <div className="flex gap-1">
                      {technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {technologies.length > 3 && (
                        <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 text-xs rounded-full">
                          +{technologies.length - 3}
                        </span>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Enhanced Instructions */}
      <div className="absolute top-6 right-6 text-right">
        <div className="bg-black/60 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm shadow-lg">
          <p>🖱️ Click & drag to rotate</p>
          <p>⌨️ Use arrow keys to navigate</p>
          <p>🖱️ Scroll to zoom</p>
          {enableAutoRotate && <p>🔄 Auto-rotate enabled</p>}
          {isTransitioning && <p>⏳ Transitioning...</p>}
        </div>
      </div>
    </div>
  );
};

export default Project3DShowcase;
