import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
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
import * as THREE from 'three';

interface Project3DModalProps {
  project: {
    src: string;
    title: string;
    name: string;
    link: string;
  };
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

// 3D Project Detail Scene
const Project3DDetail: React.FC<{
  project: Project3DModalProps['project'];
}> = ({ project }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useTexture(project.src, (error) => {
    console.warn('Failed to load texture:', error);
  });
  const { shouldReduceMotion } = useAccessibility();

  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    // Complex rotation animation
    meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    
    // Hover effects
    if (hovered) {
      meshRef.current.scale.setScalar(1.05);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <group>
      {/* Main Project Display */}
      {shouldReduceMotion ? (
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <boxGeometry args={[4, 3, 0.3]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.2}
            metalness={0.3}
            transparent
            opacity={0.95}
          />
        </mesh>
      ) : (
        <Float
          speed={1}
          rotationIntensity={0.3}
          floatIntensity={0.2}
        >
          <mesh
            ref={meshRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
          >
            <boxGeometry args={[4, 3, 0.3]} />
            <meshStandardMaterial
              map={texture}
              roughness={0.2}
              metalness={0.3}
              transparent
              opacity={0.95}
            />
          </mesh>
        </Float>
      )}

      {/* Enhanced Glow Effect */}
      <mesh position={[0, 0, -0.5]}>
        <boxGeometry args={[4.2, 3.2, 0.1]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Technology Badges */}
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

      {/* Project Information */}
      <Html
        position={[0, -2.5, 0]}
        center
        distanceFactor={6}
        occlude
      >
        <div className="text-center bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white">
          <h2 className="text-2xl font-bold mb-2">{project.name}</h2>
          <p className="text-sm opacity-80 mb-3">{project.title}</p>
          <div className="flex gap-2 justify-center">
            <span className="px-2 py-1 bg-blue-500/50 rounded text-xs">React</span>
            <span className="px-2 py-1 bg-purple-500/50 rounded text-xs">TypeScript</span>
            <span className="px-2 py-1 bg-green-500/50 rounded text-xs">Tailwind</span>
          </div>
        </div>
      </Html>

      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.6}
        scale={8}
        blur={3}
        far={3}
        resolution={512}
        color="#000000"
      />
    </group>
  );
};

// 3D Modal Scene
const Modal3DScene: React.FC<{
  project: Project3DModalProps['project'];
}> = ({ project }) => {
  const { shouldReduceMotion } = useAccessibility();
  
  return (
    <>
      {/* Advanced Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#8b5cf6" />
      <spotLight
        position={[0, 15, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.7}
        castShadow
      />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Main Project */}
      <Project3DDetail project={project} />

      {/* Background Particles */}
      {Array.from({ length: 15 }).map((_, i) => {
        const mesh = (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 15,
              (Math.random() - 0.5) * 8,
              (Math.random() - 0.5) * 15
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'][i % 4]}
              transparent
              opacity={0.4}
            />
          </mesh>
        );
        
        return shouldReduceMotion ? mesh : (
          <Float
            key={i}
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

// Main Modal Component
const Project3DModal: React.FC<Project3DModalProps> = ({
  project,
  isOpen,
  onClose,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { shouldReduceMotion } = useAccessibility();
  const { triggerHaptic } = useHaptic();
  
  // Focus trap for accessibility
  useFocusTrap(isOpen);
  
  // Keyboard navigation
  useKeyboardNavigation({
    onEscape: onClose,
    onEnter: () => {
      window.open(project.link, '_blank');
      triggerHaptic('medium');
    }
  });

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

  const handleViewProject = () => {
    window.open(project.link, '_blank');
    triggerHaptic('medium');
  };

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
            className={`relative w-full max-w-6xl h-[80vh] bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden ${className}`}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{project.name}</h2>
                  <p className="text-white/80">{project.title}</p>
                </div>
                
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

            {/* 3D Canvas */}
            <Canvas
              shadows
              camera={{ position: [0, 0, 8], fov: 50 }}
              onCreated={() => setIsLoaded(true)}
              style={{ 
                background: 'transparent',
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              <Modal3DScene project={project} />
              
              {/* Camera Controls */}
              {!shouldReduceMotion && (
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  autoRotate={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 6}
                  maxDistance={15}
                  minDistance={4}
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

            {/* Footer Actions */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/50 to-transparent p-6">
              <div className="flex justify-between items-center">
                <div className="text-white/80 text-sm">
                  <p>🖱️ Click & drag to rotate • ⌨️ Press Enter to visit project</p>
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
