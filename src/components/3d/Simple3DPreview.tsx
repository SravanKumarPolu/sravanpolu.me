import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface Simple3DPreviewProps {
  project: {
    src: string;
    title: string;
    name: string;
    link: string;
  };
  onProjectClick: () => void;
}

const Simple3DProject: React.FC<{ project: Simple3DPreviewProps['project']; onProjectClick: () => void }> = ({ project, onProjectClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  
  const texture = useTexture(project.src, (texture) => {
    setTextureLoaded(true);
    texture.flipY = true; // Fix upside-down texture issue
    texture.generateMipmaps = false; // Disable mipmaps for maximum sharpness
    texture.minFilter = THREE.NearestFilter; // Nearest filter for pixel-perfect sharpness
    texture.magFilter = THREE.NearestFilter; // Nearest filter for maximum clarity
    texture.anisotropy = 16; // Maximum texture clarity
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
  });
  
  useFrame((state) => {
    if (meshRef.current) {
      // Smooth rotation
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      // Hover and click scaling
      const targetScale = clicked ? 0.95 : (hovered ? 1.15 : 1);
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
    
    // Glow effect
    if (glowRef.current && hovered) {
      glowRef.current.rotation.y += 0.01;
      const material = glowRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group>
      {/* Main project mesh */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setClicked(true);
          onProjectClick();
          // Reset clicked state after animation
          setTimeout(() => setClicked(false), 200);
        }}
        position={[0, 0, 0]}
      >
        <boxGeometry args={[2.5, 1.8, 0.1, 32, 32, 4]} />
        <meshStandardMaterial 
          map={textureLoaded ? texture : null} 
          color={textureLoaded ? "#ffffff" : "#f3f4f6"}
          metalness={0.0}
          roughness={0.0}
          envMapIntensity={0.0}
          emissive="#000000"
          emissiveIntensity={0.0}
          transparent={false}
          opacity={1.0}
        />
      </mesh>
      
      {/* Glow effect */}
      {hovered && (
        <mesh ref={glowRef} position={[0, 0, -0.05]}>
          <planeGeometry args={[3, 2.2]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            transparent 
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  );
};

// Floating particles component
const FloatingParticles: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
};

// WebGL Renderer Configuration Component
const WebGLConfig: React.FC = () => {
  const { gl } = useThree();
  
  useEffect(() => {
    // Configure for CRYSTAL-CLEAR sharpness - NO HAZE
    gl.outputColorSpace = THREE.SRGBColorSpace;
    gl.toneMapping = THREE.NoToneMapping; // Disable tone mapping for maximum contrast
    gl.toneMappingExposure = 1.0;
    
    // Configure device pixel ratio (cap at 2 for mobile performance)
    const dpr = Math.min(window.devicePixelRatio, 2);
    gl.setPixelRatio(dpr);
    
    // Enable ultra-high quality shadow rendering
    gl.shadowMap.enabled = true;
    gl.shadowMap.type = THREE.PCFSoftShadowMap;
    gl.shadowMap.autoUpdate = true;
    
    // Configure renderer for maximum clarity and sharpness
    // Note: antialias, alpha, preserveDrawingBuffer, and powerPreference are configured in Canvas props
    
    // WebGL configured for optimal performance
  }, [gl]);
  
  return null;
};

const Simple3DPreview: React.FC<Simple3DPreviewProps> = ({ project, onProjectClick }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div 
        style={{ width: '100%', height: '300px' }}
        className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg"
      >
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-2">3D View Unavailable</p>
          <button 
            onClick={onProjectClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            View Project
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%' }} className="relative">
      <Canvas 
        onError={() => setHasError(true)}
        camera={{ position: [0, 0, 6], fov: 45, up: [0, 1, 0] }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.NoToneMapping,
          toneMappingExposure: 1.0,
          precision: 'highp',
          logarithmicDepthBuffer: true
        }}
        dpr={[1, 2]}
        style={{ background: '#ffffff' }}
      >
        <WebGLConfig />
        {/* CRYSTAL-CLEAR lighting - NO HAZE */}
        <ambientLight intensity={0.0} />
        <directionalLight 
          position={[10, 15, 8]} 
          intensity={5.0} 
          castShadow 
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
          shadow-camera-far={50}
          shadow-camera-left={-12}
          shadow-camera-right={12}
          shadow-camera-top={12}
          shadow-camera-bottom={-12}
          shadow-bias={-0.0001}
        />
        <directionalLight position={[-8, 12, 6]} intensity={3.0} castShadow />
        <pointLight position={[0, 10, 8]} intensity={4.0} color="#ffffff" />
        <pointLight position={[0, -6, 8]} intensity={2.0} color="#ffffff" />
        <spotLight 
          position={[0, 20, 0]} 
          intensity={3.0} 
          angle={0.1} 
          penumbra={0.1}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
        />
        
        {/* Floating particles */}
        <FloatingParticles />
        
        {/* 3D Project */}
        <Simple3DProject project={project} onProjectClick={onProjectClick} />
        
        {/* NO ENVIRONMENT - CRYSTAL CLEAR */}
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.2}
          scale={10}
          blur={0.5}
          far={4.5}
          resolution={1024}
        />
        
        {/* Camera controls - Mobile optimized */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          maxPolarAngle={Math.PI * 0.75}
          minPolarAngle={Math.PI * 0.25}
          maxDistance={8}
          minDistance={4}
          touches={{
            ONE: 2, // Single finger for rotation
            TWO: 1  // Two fingers for zoom
          }}
          dampingFactor={0.05}
          enableDamping={true}
        />
      </Canvas>
      
      {/* Project info overlay - Mobile optimized with reduced blur */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-black/70 rounded-lg p-2 sm:p-3 text-white">
        <h3 className="text-sm sm:text-lg font-semibold">{project.title}</h3>
        <p className="text-xs sm:text-sm opacity-80">
          {project.link && project.link !== '#' ? 'Tap to open project' : 'No link available'}
        </p>
      </div>
    </div>
  );
};

export default Simple3DPreview;
