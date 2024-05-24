// @ts-nocheck

// Import necessary modules and components
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import { motion } from "framer-motion-3d";
import StorySection from "./storySection";

// Define the interface for the Model component props
interface ModelProps {
  progress: any; // Adjust this type as needed
}

// Define the Model component which loads and animates a 3D model
function Model({ progress }: ModelProps, ref: React.Ref<THREE.Mesh>) {
  const mesh = useRef<THREE.Mesh>(null!); // Reference to the mesh object

  // Load the GLTF model
  const { scene } = useGLTF("/primobot.gltf");
  scene.scale.set(1.5, 1.5, 1.5); // Scale the model

  // Update the rotation of the model based on the progress value
  useFrame((state, delta) => {
    if (progress) {
      mesh.current.rotation.y = progress.get();
    }
  });

  // Return the animated model
  return <motion.primitive object={scene} ref={mesh} />;
}

// Define the main component that renders the 3D model with animations
export default function ThreeDModel() {
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the container div
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5); // State for ambient light intensity
  const [directionalLightIntensity, setDirectionalLightIntensity] = useState(1); // State for directional light intensity
  const [zoomLevel, setZoomLevel] = useState(2); // State for camera zoom level

  // Get the scroll progress for animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Create transforms for animations based on scroll progress
  const progress = useTransform(scrollYProgress, [0, 1], [0, 10], {
    damping: 20,
  });
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const fov = useTransform(scrollYProgress, [0, 1], [60, 30]); // Adjusting the FOV based on scroll

  // Update zoom level on window resize
  useEffect(() => {
    const handleResize = () => {
      setZoomLevel(window.innerHeight / 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset camera zoom level
  const resetCamera = () => {
    setZoomLevel(2);
  };

  // Return the main JSX structure
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mx-auto h-[250vh]"
      ref={containerRef}
    >
      {/* Canvas div */}
      <motion.div className="w-[250px] lg:w-[500px] h-[142vh] mx-auto sticky top-[20px]">
        <Canvas>
          {/* Add lights to the scene */}
          <ambientLight intensity={ambientLightIntensity} />
          <directionalLight
            position={[0, 10, 5]}
            intensity={directionalLightIntensity}
          />
          {/* Add the 3D model to the scene */}
          <Model progress={progress} />
          {/* Add orbit controls for camera manipulation */}
          <OrbitControls />
          {/* Update the camera settings based on scroll */}
          <CameraUpdater fov={fov} zoomLevel={zoomLevel} />
        </Canvas>
      </motion.div>

      {/* Add other elements to the page */}
      <p className="font-made-outer-sans text-[32px] lg:text-[64px] text-center text-[#260120] font-bold uppercase leading-[48px] md:leading-[76px]">
        fully 3D-ReADY Primobots.
      </p>

      <p className="font-made-outer-sans relative text-[32px] lg:text-[64px] font-bold text-center uppercase leading-[48px] lg:leading-[76px] text-white">
        <span
          className=" inset-0 text-[32px] lg:text-[64px] font-bold text-center uppercase leading-[48px] lg:leading-[76px] text-[#eafffe]"
          style={{
            textShadow:
              "1px 1px 0 #260120, -1px -1px 0 #260120, 1px -1px 0 #260120, -1px 1px 0 #260120, 1px 0 0 #260120, -1px 0 0 #260120, 0 1px 0 #260120, 0 -1px 0 #260120",
          }}
        >
          a story driven web3 brand.
        </span>
      </p>
      <div className="flex gap-2 justify-center items-center font-made-outer-sans text-[12px] md:text-[16px]">
        <p className="font-regular">555/5555 MINTED</p>
        <p className="border-2 border-[#260120] px-2 font-medium">-</p>
        <p className="font-medium">1</p>

        <p className="border-[#260120] border-2 px-2 font-medium">+</p>
        <p className="bg-[#260120] text-[#eafffe] px-2 uppercase">Mint Now</p>
        <p className="font-regular">0.044 ETH</p>
      </div>
      <Image
        src="primobot-body.svg"
        width="1200"
        height="600"
        alt="body"
        className="mx-auto"
      />
      <StorySection />
    </motion.div>
  );
}

// Component to update the camera based on the provided fov and zoom level
function CameraUpdater({ fov, zoomLevel }) {
  const { camera } = useThree(); // Get the camera object

  // Update camera properties on each frame
  useFrame(() => {
    camera.fov = fov.get();
    camera.updateProjectionMatrix();
    camera.position.set(0, 1, zoomLevel);
  });

  return null; // This component does not render anything
}
