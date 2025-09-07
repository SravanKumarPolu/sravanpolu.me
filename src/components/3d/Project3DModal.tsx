import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows,
  Float,
  Html,
  useTexture
} from '@react-three/drei';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useHaptic } from '../../hooks/useHaptic';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { use3DAccessibility } from '../../hooks/use3DAccessibility';
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor';
import * as THREE from 'three';

// WebGL Renderer Configuration Component
const WebGLConfig: React.FC = () => {
  const { gl } = useThree();
  
  useEffect(() => {
    // Configure color space and tone mapping
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.0;
    
    // Configure device pixel ratio (cap at 2 for mobile performance)
    const dpr = Math.min(window.devicePixelRatio, 2);
    gl.setPixelRatio(dpr);
    
    // Enable proper shadow rendering
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    
    console.log('WebGL configured:', {
      colorSpace: gl.outputColorSpace,
      toneMapping: gl.toneMapping,
      pixelRatio: gl.getPixelRatio(),
      shadowMap: gl.shadowMap.enabled
    });
  }, [gl]);
  
  return null;
};

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

// Enhanced 3D Project Detail Scene
const Project3DDetail: React.FC<{
  project: Project3DModalProps['project'];
  enableAdvancedLighting?: boolean;
}> = ({ project, enableAdvancedLighting = true }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const { shouldReduceMotion } = useAccessibility();
  const { announce } = use3DAccessibility();

  // Enhanced texture loading with error handling
  const texture = useTexture(project.src, (texture) => {
    setTextureLoaded(true);
    texture.flipY = true; // Fix upside-down texture issue
    texture.generateMipmaps = true;
  });

  // Memoized technology colors
  const techColors = useMemo(() => [
    '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'
  ], []);

  // Enhanced animation frame updates
  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    // Enhanced rotation animation
    if (enableAdvancedLighting) {
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.3 + Math.cos(time * 0.15) * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.25) * 0.15;
      meshRef.current.rotation.z = Math.sin(time * 0.18) * 0.05;
    } else {
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
    
    // Enhanced hover effects
    if (hovered) {
      const hoverScale = enableAdvancedLighting ? 1.08 : 1.05;
      meshRef.current.scale.lerp(new THREE.Vector3(hoverScale, hoverScale, hoverScale), 0.15);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }

    // Glow effect animation
    if (glowRef.current && glowRef.current.material) {
      const material = glowRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.4 + Math.sin(time * 1.5) * 0.1;
    }
  });

  const handlePointerOver = useCallback(() => {
    setHovered(true);
    announce(`Hovering over ${project.name} project`);
  }, [project.name, announce]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
  }, []);

  return (
    <group>
      {/* Enhanced Main Project Display */}
      {shouldReduceMotion ? (
        <mesh
          ref={meshRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[4, 3, 0.3]} />
          <meshStandardMaterial
            map={textureLoaded ? texture : undefined}
            roughness={0.2}
            metalness={0.3}
            transparent
            opacity={textureLoaded ? 0.95 : 0.3}
            color={textureLoaded ? '#ffffff' : '#e5e7eb'}
          />
        </mesh>
      ) : (
        <Float
          speed={enableAdvancedLighting ? 0.8 : 1}
          rotationIntensity={enableAdvancedLighting ? 0.2 : 0.3}
          floatIntensity={enableAdvancedLighting ? 0.15 : 0.2}
        >
          <mesh
            ref={meshRef}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <boxGeometry args={[4, 3, 0.3]} />
            <meshStandardMaterial
              map={textureLoaded ? texture : undefined}
              roughness={0.2}
              metalness={0.3}
              transparent
              opacity={textureLoaded ? 0.95 : 0.3}
              color={textureLoaded ? '#ffffff' : '#e5e7eb'}
            />
          </mesh>
        </Float>
      )}

      {/* Enhanced Glow Effect */}
      <mesh ref={glowRef} position={[0, 0, -0.5]}>
        <boxGeometry args={[4.2, 3.2, 0.1]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Hover Glow Effect */}
      {hovered && (
        <mesh position={[0, 0, -0.4]}>
          <boxGeometry args={[4.1, 3.1, 0.05]} />
          <meshStandardMaterial
            color="#8b5cf6"
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Enhanced Technology Badges */}
      {project.technologies && project.technologies.length > 0 ? (
        <group position={[0, 2, 0.5]}>
          {project.technologies.slice(0, 4).map((tech, index) => {
            const angle = (index * Math.PI * 2) / Math.min(project.technologies!.length, 4);
            const radius = 1.2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const color = techColors[index % techColors.length];
            
            const techMesh = (
              <mesh key={tech} position={[x, 0, z]}>
                <sphereGeometry args={[0.15, 12, 12]} />
                <meshStandardMaterial color={color} />
              </mesh>
            );
            
            return !shouldReduceMotion ? (
              <Float key={tech} speed={1.5 + index * 0.2} rotationIntensity={0.3}>
                {techMesh}
              </Float>
            ) : techMesh;
          })}
        </group>
      ) : (
        // Default technology indicators
        <>
          <group position={[0, 2, 0.5]}>
            {!shouldReduceMotion ? (
              <Float speed={2} rotationIntensity={0.5}>
                <mesh>
                  <sphereGeometry args={[0.2, 16, 16]} />
                  <meshStandardMaterial color="#10b981" />
                </mesh>
              </Float>
            ) : (
              <mesh>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#10b981" />
              </mesh>
            )}
          </group>

          <group position={[-1, 1.5, 0.5]}>
            {!shouldReduceMotion ? (
              <Float speed={1.5} rotationIntensity={0.3}>
                <mesh>
                  <boxGeometry args={[0.3, 0.3, 0.3]} />
                  <meshStandardMaterial color="#8b5cf6" />
                </mesh>
              </Float>
            ) : (
              <mesh>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial color="#8b5cf6" />
              </mesh>
            )}
          </group>

          <group position={[1, 1.5, 0.5]}>
            {!shouldReduceMotion ? (
              <Float speed={2.5} rotationIntensity={0.4}>
                <mesh>
                  <sphereGeometry args={[0.15, 16, 16]} />
                  <meshStandardMaterial color="#f59e0b" />
                </mesh>
              </Float>
            ) : (
              <mesh>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#f59e0b" />
              </mesh>
            )}
          </group>
        </>
      )}

      {/* Enhanced Project Information */}
      <Html
        position={[0, -2.5, 0]}
        center
        distanceFactor={6}
        occlude
      >
        <div className="text-center bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
          {project.description && (
            <p className="text-sm opacity-90 mb-3 max-w-md">{project.description}</p>
          )}
          <p className="text-sm opacity-80 mb-3">{project.title}</p>
          {project.technologies && project.technologies.length > 0 ? (
            <div className="flex gap-2 justify-center flex-wrap">
              {project.technologies.slice(0, 5).map((tech, index) => (
                <span
                  key={tech}
                  className="px-2 py-1 rounded text-xs"
                  style={{
                    backgroundColor: `${techColors[index % techColors.length]}50`,
                    color: techColors[index % techColors.length]
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 5 && (
                <span className="px-2 py-1 bg-neutral-500/50 rounded text-xs">
                  +{project.technologies.length - 5}
                </span>
              )}
            </div>
          ) : (
            <div className="flex gap-2 justify-center">
              <span className="px-2 py-1 bg-blue-500/50 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-purple-500/50 rounded text-xs">TypeScript</span>
              <span className="px-2 py-1 bg-green-500/50 rounded text-xs">Tailwind</span>
            </div>
          )}
        </div>
      </Html>

      {/* Enhanced Contact Shadows */}
      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.7}
        scale={10}
        blur={4}
        far={4}
        resolution={1024}
        color="#000000"
      />
    </group>
  );
};

// Enhanced 3D Modal Scene
const Modal3DScene: React.FC<{
  project: Project3DModalProps['project'];
  enableAdvancedLighting?: boolean;
}> = ({ project, enableAdvancedLighting = true }) => {
  const { shouldReduceMotion } = useAccessibility();
  
  // Performance monitoring
  usePerformanceMonitor('Modal3DScene', {
    enableMemoryMonitoring: true,
    enableFPSMonitoring: true
  });
  
  return (
    <>
      {/* Enhanced Advanced Lighting */}
      <ambientLight intensity={enableAdvancedLighting ? 0.5 : 0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={enableAdvancedLighting ? 2.0 : 1.8}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />
      <directionalLight
        position={[-5, 8, 5]}
        intensity={enableAdvancedLighting ? 1.2 : 1.0}
        castShadow
      />
      <pointLight position={[0, 5, 5]} intensity={enableAdvancedLighting ? 1.2 : 1.0} color="#3b82f6" />
      <pointLight position={[0, -5, 5]} intensity={enableAdvancedLighting ? 0.8 : 0.6} color="#8b5cf6" />
      <pointLight position={[0, 0, 8]} intensity={enableAdvancedLighting ? 0.6 : 0.4} color="#10b981" />
      <spotLight
        position={[0, 12, 0]}
        angle={0.3}
        penumbra={1}
        intensity={enableAdvancedLighting ? 1.0 : 0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Main Project */}
      <Project3DDetail project={project} enableAdvancedLighting={enableAdvancedLighting} />

      {/* Enhanced Background Particles */}
      {Array.from({ length: shouldReduceMotion ? 8 : 15 }).map((_, i) => {
        const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
        const mesh = (
          <mesh
            key={`modal-particle-${i}`}
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 15
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={colors[i % colors.length]}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
        
        return shouldReduceMotion ? mesh : (
          <Float
            key={`modal-particle-float-${i}`}
            speed={0.5 + Math.random() * 1}
            rotationIntensity={0.2}
            floatIntensity={0.3}
          >
            {mesh}
          </Float>
        );
      })}
    </>
  );
};

// Main Enhanced Modal Component
const Project3DModal: React.FC<Project3DModalProps> = ({
  project,
  isOpen,
  onClose,
  className = '',
  enableAdvancedLighting = true,
  showProjectDetails = true,
  enableFullscreen = true
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { shouldReduceMotion } = useAccessibility();
  const { triggerHaptic } = useHaptic();
  const { announce } = use3DAccessibility();
  
  // Focus trap for accessibility
  useFocusTrap(isOpen);
  
  // Enhanced keyboard navigation
  useKeyboardNavigation({
    onEscape: onClose,
    onEnter: () => {
      window.open(project.link, '_blank');
      triggerHaptic('medium');
      announce(`Opening ${project.name} project in new tab`);
    },
    onKeyF: () => {
      if (enableFullscreen) {
        toggleFullscreen();
      }
    }
  });

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen);
    triggerHaptic('light');
    announce(isFullscreen ? 'Exited fullscreen mode' : 'Entered fullscreen mode');
  }, [isFullscreen, triggerHaptic, announce]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleViewProject = useCallback(() => {
    window.open(project.link, '_blank');
    triggerHaptic('medium');
    announce(`Opening ${project.name} project in new tab`);
  }, [project.link, project.name, triggerHaptic, announce]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`relative w-full ${isFullscreen ? 'h-screen max-w-none' : 'max-w-6xl h-[80vh]'} bg-white dark:bg-neutral-900 ${isFullscreen ? 'rounded-none' : 'rounded-2xl'} shadow-2xl overflow-hidden ${className}`}
          >
            {/* Enhanced Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/60 to-transparent p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{project.name}</h2>
                  {project.description && showProjectDetails && (
                    <p className="text-white/90 text-sm mb-1 max-w-md">{project.description}</p>
                  )}
                  <p className="text-white/80">{project.title}</p>
                </div>
                
                <div className="flex gap-2">
                  {enableFullscreen && (
                    <button
                      onClick={toggleFullscreen}
                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                      aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isFullscreen ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15v4.5M9 15H4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        )}
                      </svg>
                    </button>
                  )}
                  
                  <button
                    onClick={onClose}
                    className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced 3D Canvas */}
            <Canvas
              shadows
              camera={{ position: [0, 0, 10], fov: 45, up: [0, 1, 0] }}
              onCreated={() => setIsLoaded(true)}
              gl={{ 
                antialias: true, 
                alpha: true,
                powerPreference: 'high-performance',
                outputColorSpace: THREE.SRGBColorSpace,
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 1.0
              }}
              dpr={[1, 2]}
              style={{ 
                background: 'transparent',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              <WebGLConfig />
              <Modal3DScene project={project} enableAdvancedLighting={enableAdvancedLighting} />
              
              {/* Enhanced Camera Controls */}
              {!shouldReduceMotion && (
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  autoRotate={false}
                  maxPolarAngle={Math.PI * 0.75}
                  minPolarAngle={Math.PI * 0.25}
                  maxDistance={20}
                  minDistance={4}
                  dampingFactor={0.05}
                  enableDamping={true}
                />
              )}
            </Canvas>

            {/* Loading State */}
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
                  <p className="text-neutral-600 dark:text-neutral-400">Loading 3D Experience...</p>
                </div>
              </div>
            )}

            {/* Enhanced Footer Actions */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/60 to-transparent p-6">
              <div className="flex justify-between items-center">
                <div className="text-white/80 text-sm">
                  <p>🖱️ Click & drag to rotate • ⌨️ Press Enter to visit project</p>
                  {enableFullscreen && <p>⌨️ Press F for fullscreen</p>}
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleViewProject}
                    className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    View Project
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Project3DModal;
