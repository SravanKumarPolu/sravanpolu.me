import React, { useRef, useState, Suspense, useEffect, useMemo } from 'react';
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
import { use3DAccessibility } from '../../hooks/use3DAccessibility';
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

// Enhanced 3D Project Card Component
const Project3DCard: React.FC<{
  project: Project3DPreviewProps['project'];
  isActive: boolean;
  onProjectClick: () => void;
  enableAdvancedAnimations?: boolean;
  showTechBadges?: boolean;
}> = ({ project, isActive, onProjectClick, enableAdvancedAnimations = true, showTechBadges = true }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const { shouldReduceMotion } = useAccessibility();
  const { triggerHaptic } = useHaptic();
  const { announce } = use3DAccessibility();

  // Load project texture with error handling and loading state
  const texture = useTexture(project.src, (texture) => {
    setTextureLoaded(true);
    texture.flipY = true; // Fix upside-down texture issue
    texture.generateMipmaps = true;
  });

  // Memoized technology colors for consistent rendering
  const techColors = useMemo(() => [
    '#3b82f6', // Blue
    '#8b5cf6', // Purple
    '#10b981', // Green
    '#f59e0b', // Orange
    '#ef4444', // Red
    '#06b6d4', // Cyan
  ], []);

  // Enhanced animation frame updates
  useFrame((state) => {
    if (!meshRef.current || shouldReduceMotion) return;
    
    const time = state.clock.getElapsedTime();
    
    // Enhanced rotation animation with easing
    if (enableAdvancedAnimations) {
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.15 + Math.cos(time * 0.2) * 0.05;
      meshRef.current.rotation.z = Math.sin(time * 0.4) * 0.05;
    } else {
      meshRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
    }
    
    // Enhanced hover animation
    if (hovered) {
      const hoverScale = enableAdvancedAnimations ? 1.15 : 1.1;
      meshRef.current.scale.lerp(new THREE.Vector3(hoverScale, hoverScale, hoverScale), 0.15);
      if (enableAdvancedAnimations) {
        meshRef.current.rotation.x = Math.sin(time * 3) * 0.08;
        meshRef.current.rotation.z = Math.sin(time * 2.5) * 0.05;
      } else {
        meshRef.current.rotation.x = Math.sin(time * 2) * 0.05;
      }
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      meshRef.current.rotation.x = 0;
      meshRef.current.rotation.z = 0;
    }

    // Enhanced active state animation
    if (isActive) {
      const floatIntensity = enableAdvancedAnimations ? 0.15 : 0.1;
      meshRef.current.position.y = Math.sin(time * 1.5) * floatIntensity + Math.cos(time * 0.8) * 0.05;
    } else {
      meshRef.current.position.y = 0;
    }

    // Glow effect animation
    if (glowRef.current && isActive && glowRef.current.material) {
      const material = glowRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.3 + Math.sin(time * 2) * 0.1;
    }
  });

  const handleClick = () => {
    setClicked(true);
    triggerHaptic('medium');
    announce(`Opening ${project.name} project`);
    onProjectClick();
    
    // Reset clicked state after animation
    setTimeout(() => setClicked(false), 300);
  };

  const handlePointerOver = () => {
    setHovered(true);
    announce(`Hovering over ${project.name} project`);
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  return (
    <group>
      {/* Main Project Card */}
      {shouldReduceMotion ? (
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          scale={clicked ? 0.95 : 1}
        >
          <boxGeometry args={[3, 2, 0.2]} />
          <meshStandardMaterial
            map={textureLoaded ? texture : undefined}
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={textureLoaded ? 0.9 : 0.3}
            color={textureLoaded ? '#ffffff' : '#e5e7eb'}
          />
        </mesh>
      ) : (
        <Float
          speed={enableAdvancedAnimations ? 1.5 : 2}
          rotationIntensity={enableAdvancedAnimations ? 0.3 : 0.5}
          floatIntensity={enableAdvancedAnimations ? 0.3 : 0.5}
        >
          <mesh
            ref={meshRef}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            scale={clicked ? 0.95 : 1}
          >
            <boxGeometry args={[3, 2, 0.2]} />
            <meshStandardMaterial
              map={textureLoaded ? texture : undefined}
              roughness={0.3}
              metalness={0.1}
              transparent
              opacity={textureLoaded ? 0.9 : 0.3}
              color={textureLoaded ? '#ffffff' : '#e5e7eb'}
            />
          </mesh>
        </Float>
      )}

      {/* Enhanced Glow Effect */}
      {isActive && (
        <mesh ref={glowRef} position={[0, 0, -0.3]}>
          <boxGeometry args={[3.2, 2.2, 0.1]} />
          <meshStandardMaterial
            color="#3b82f6"
            transparent
            opacity={0.3}
          />
        </mesh>
      )}

      {/* Hover Glow Effect */}
      {hovered && !isActive && (
        <mesh position={[0, 0, -0.25]}>
          <boxGeometry args={[3.1, 2.1, 0.05]} />
          <meshStandardMaterial
            color="#8b5cf6"
            transparent
            opacity={0.2}
          />
        </mesh>
      )}

      {/* Enhanced Project Title */}
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
          <h3 className="text-lg font-semibold text-white bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm shadow-lg">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-xs text-white/80 bg-black/40 px-2 py-1 rounded mt-1 backdrop-blur-sm">
              {project.description}
            </p>
          )}
        </motion.div>
      </Html>

      {/* Technology Badges */}
      {showTechBadges && project.technologies && project.technologies.length > 0 && (
        <group position={[0, 1.2, 0.2]}>
          {project.technologies.slice(0, 3).map((tech, index) => {
            const angle = (index * Math.PI * 2) / Math.min(project.technologies!.length, 3);
            const radius = 0.8;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const color = techColors[index % techColors.length];
            
            const techMesh = (
              <mesh key={tech} position={[x, 0, z]}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial color={color} />
              </mesh>
            );
            
            return !shouldReduceMotion ? (
              <Float key={tech} speed={1 + index * 0.2} rotationIntensity={0.2}>
                {techMesh}
              </Float>
            ) : techMesh;
          })}
        </group>
      )}

      {/* Default Technology Indicator */}
      {showTechBadges && (!project.technologies || project.technologies.length === 0) && (
        <group position={[0, 1.2, 0.2]}>
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
      )}

      {/* Enhanced Contact Shadows */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.5}
        scale={4.5}
        blur={2.5}
        far={2.5}
        resolution={512}
        color="#000000"
      />
    </group>
  );
};

// Enhanced 3D Scene Component
const Project3DScene: React.FC<{
  project: Project3DPreviewProps['project'];
  isActive: boolean;
  onProjectClick: () => void;
  enableAdvancedAnimations?: boolean;
  showTechBadges?: boolean;
}> = ({ project, isActive, onProjectClick, enableAdvancedAnimations = true, showTechBadges = true }) => {
  const { shouldReduceMotion } = useAccessibility();
  return (
    <>
      {/* Enhanced Lighting Setup */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight
        position={[-5, 8, 5]}
        intensity={0.8}
        castShadow
      />
      <pointLight position={[0, 5, 5]} intensity={0.8} color="#3b82f6" />
      <pointLight position={[0, -5, 5]} intensity={0.4} color="#8b5cf6" />

      {/* Environment */}
      <Environment preset="studio" />

      {/* Main Project Card */}
      <Project3DCard
        project={project}
        isActive={isActive}
        onProjectClick={onProjectClick}
        enableAdvancedAnimations={enableAdvancedAnimations}
        showTechBadges={showTechBadges}
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

// Main Enhanced 3D Preview Component
const Project3DPreview: React.FC<Project3DPreviewProps> = ({
  project,
  isActive,
  onProjectClick,
  className = '',
  enableAdvancedAnimations = true,
  showTechBadges = true
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
        camera={{ position: [0, 0, 6], fov: 45, up: [0, 1, 0] }}
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
        <Suspense fallback={null}>
          <Project3DScene
            project={project}
            isActive={isActive}
            onProjectClick={onProjectClick}
            enableAdvancedAnimations={enableAdvancedAnimations}
            showTechBadges={showTechBadges}
          />
          
          {/* Enhanced Camera Controls */}
          {!shouldReduceMotion && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
              autoRotate={isActive && enableAdvancedAnimations}
              autoRotateSpeed={enableAdvancedAnimations ? 0.3 : 0.5}
              maxPolarAngle={Math.PI * 0.75}
              minPolarAngle={Math.PI * 0.25}
              dampingFactor={0.05}
              enableDamping={true}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Enhanced Overlay Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            isActive ? 'bg-primary-500' : 'bg-neutral-400'
          }`}></div>
          <span className="text-xs text-neutral-600 dark:text-neutral-400">
            {isActive ? 'Active 3D Preview' : '3D Preview'}
          </span>
          {project.technologies && project.technologies.length > 0 && (
            <span className="text-xs text-neutral-500 dark:text-neutral-500">
              • {project.technologies.length} tech{project.technologies.length > 1 ? 's' : ''}
            </span>
          )}
        </div>
        
        <button
          onClick={onProjectClick}
          className={`px-4 py-2 text-xs rounded-full transition-all ${
            isActive 
              ? 'bg-primary-500 text-white hover:bg-primary-600 shadow-lg' 
              : 'bg-white/80 dark:bg-neutral-800/80 text-neutral-700 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800'
          }`}
          aria-label={`View ${project.name} project`}
        >
          {isActive ? 'Explore' : 'View'}
        </button>
      </div>
    </div>
  );
};

export default Project3DPreview;
