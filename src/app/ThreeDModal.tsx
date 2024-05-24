import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import { motion } from "framer-motion-3d";
import StorySection from "./storySection";

interface ModelProps {
  progress: any; // Adjust this type as needed
}

function Model({ progress }: ModelProps) {
  const mesh = useRef<THREE.Mesh>(null!);
  const { scene } = useGLTF("/primobot.gltf");
  scene.scale.set(1.5, 1.5, 1.5);

  useFrame((state, delta) => {
    if (progress) {
      mesh.current.rotation.y = progress.get();
    }
  });

  return <motion.primitive object={scene} ref={mesh} />;
}

export default function ThreeDModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
  const [directionalLightIntensity, setDirectionalLightIntensity] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(2);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const progress = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const fov = useTransform(scrollYProgress, [0, 1], [60, 30]); // Adjusting the FOV based on scroll

  useEffect(() => {
    const handleResize = () => {
      setZoomLevel(window.innerHeight / 500);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleAmbientLight = () => {
    setAmbientLightIntensity((prev) => (prev === 0 ? 0.5 : 0));
  };

  const toggleDirectionalLight = () => {
    setDirectionalLightIntensity((prev) => (prev === 0 ? 1 : 0));
  };

  const resetCamera = () => {
    setZoomLevel(2);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="mx-auto  h-[250vh]"
      ref={containerRef}
      //   className=""
    >
      {/* <div className="flex justify-center space-x-4 mb-4">
        <button onClick={toggleAmbientLight}>
          {ambientLightIntensity === 0
            ? "Turn On Ambient Light"
            : "Turn Off Ambient Light"}
        </button>
        <button onClick={toggleDirectionalLight}>
          {directionalLightIntensity === 0
            ? "Turn On Directional Light"
            : "Turn Off Directional Light"}
        </button>
        <button onClick={resetCamera}>Reset Camera</button>
      </div> */}
      {/* canvas div */}
      <motion.div className="w-full lg:w-[500px] h-[150vh] mx-auto sticky top-[25vh]">
        <Canvas>
          <ambientLight intensity={ambientLightIntensity} />
          <directionalLight
            position={[0, 10, 5]}
            intensity={directionalLightIntensity}
          />
          <Model progress={progress} />
          <OrbitControls />
          <CameraUpdater fov={fov} zoomLevel={zoomLevel} />
        </Canvas>
      </motion.div>
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

        <p className="  border-[#260120] border-2 px-2 font-medium">+</p>
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

function CameraUpdater({ fov, zoomLevel }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.fov = fov.get();
    camera.updateProjectionMatrix();
    camera.position.set(0, 1, zoomLevel);
  });

  return null;
}
