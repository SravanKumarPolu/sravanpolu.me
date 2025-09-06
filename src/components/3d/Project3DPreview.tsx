import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  useTexture,
  Html,
  ContactShadows,
  Float
} from '@react-three/drei';
import { motion } from 'framer-motion';
import { useAccessibility } from '../../hooks/useAccessibility';
import { useHaptic } from '../../hooks/useHaptic';
import * as THREE from 'three';

interface Project3DPreviewProps {
  project: {
    src: string;
    title: string;
    name: string;
    link: string;
  };
  isActive: boolean;
  onProjectClick: () => void;
  className?: string;
}

// 3D Project Card Component
const Project3DCard: React.FC<{
  project: Project3DPreviewProps['project'];
  isActive: boolean;
  onProjectClick: () => void;
}> = ({ project, isActive, onProjectClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { shouldReduceMotion } = useAccessibility();
  const { triggerHaptic } = useHaptic();

  // Load project texture with error handling
  const texture = useTexture(project.src, (error) => {
    console.warn('Failed to load texture:', error);
  });

  // Animation frame updates
  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    // Subtle rotation animation
    meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    
    // Hover animation
    if (hovered) {
      meshRef.current.scale.setScalar(1.1);
      meshRef.current.rotation.x = Math.sin(time * 2) * 0.05;
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      meshRef.current.rotation.x = 0;
    }

    // Active state animation
    if (isActive) {
      meshRef.current.position.y = Math.sin(time * 2) * 0.1;
    } else {
      meshRef.current.position.y = 0;
    }
  });

  const handleClick = () => {
    setClicked(true);
    triggerHaptic('medium');
    onProjectClick();
    
    // Reset clicked state after animation
    setTimeout(() => setClicked(false), 300);
  };

  return (
    <group>
      {/* Main Project Card */}
      {shouldReduceMotion ? (
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={clicked ? 0.95 : 1}
        >
          <boxGeometry args={[3, 2, 0.2]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      ) : (
        <Float
          speed={2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh
            ref={meshRef}
            onClick={handleClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={clicked ? 0.95 : 1}
          >
            <boxGeometry args={[3, 2, 0.2]} />
            <meshStandardMaterial
              map={texture}
              roughness={0.3}
              metalness={0.1}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      )}

      {/* Glow Effect */}
      {isActive && (
        <mesh position={[0, 0, -0.3]}>
          <boxGeometry args={[3.2, 2.2, 0.1]} />
          <meshStandardMaterial
            color="#3b82f6"
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Project Title */}
      <Html
        position={[0, -1.5, 0]}
        center
        distanceFactor={8}
        occlude
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-white bg-black/50 px-3 py-1 rounded-lg backdrop-blur-sm">
            {project.name}
          </h3>
        </motion.div>
      </Html>

      {/* Interactive Elements */}
      <group position={[0, 1.2, 0.2]}>
        {/* Technology Icons */}
        {!shouldReduceMotion ? (
          <Float speed={1.5} rotationIntensity={0.3}>
            <mesh>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#10b981" />
            </mesh>
          </Float>
        ) : (
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#10b981" />
          </mesh>
        )}
      </group>

      {/* Contact Shadows */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={4}
        blur={2}
        far={2}
        resolution={256}
        color="#000000"
      />
    </group>
  );
};

// 3D Scene Component
const Project3DScene: React.FC<{
  project: Project3DPreviewProps['project'];
  isActive: boolean;
  onProjectClick: () => void;
}> = ({ project, isActive, onProjectClick }) => {
  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Main Project Card */}
      <Project3DCard
        project={project}
        isActive={isActive}
        onProjectClick={onProjectClick}
      />

      {/* Background Elements */}
      <group position={[-4, 0, -2]}>
        {!shouldReduceMotion ? (
          <Float speed={1} rotationIntensity={0.2}>
            <mesh>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="#8b5cf6" transparent opacity={0.3} />
            </mesh>
          </Float>
        ) : (
          <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="#8b5cf6" transparent opacity={0.3} />
          </mesh>
        )}
      </group>

      <group position={[4, 1, -1]}>
        {!shouldReduceMotion ? (
          <Float speed={1.5} rotationIntensity={0.3}>
            <mesh>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#f59e0b" transparent opacity={0.4} />
            </mesh>
          </Float>
        ) : (
          <mesh>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#f59e0b" transparent opacity={0.4} />
          </mesh>
        )}
      </group>
    </>
  );
};

// Main 3D Preview Component
const Project3DPreview: React.FC<Project3DPreviewProps> = ({
  project,
  isActive,
  onProjectClick,
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { shouldReduceMotion } = useAccessibility();

  return (
    <div className={`relative w-full h-96 ${className}`}>
      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 50 }}
        onCreated={() => setIsLoaded(true)}
        style={{ 
          background: 'transparent',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        <Suspense fallback={null}>
          <Project3DScene
            project={project}
            isActive={isActive}
            onProjectClick={onProjectClick}
          />
          
          {/* Camera Controls */}
          {!shouldReduceMotion && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={isActive}
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Overlay Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            3D Preview
          </span>
        </div>
        
        <button
          onClick={onProjectClick}
          className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full hover:bg-primary-600 transition-colors"
          aria-label={`View ${project.name} project`}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

export default Project3DPreview;
