"use client";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef } from "react";
import ThreeDModel from "./ThreeDModal";
import StorySection from "./storySection";

export default function Home() {
  return (
    <div>
      <header
        className="bg-[#260120] h-[105px] max-w-[1152px] mx-auto flex items-center justify-between"
        style={{ clipPath: "polygon(0 0, 100% 0, 97% 100%, 3% 100%)" }}
      >
        <div className="ml-2 md:ml-12 w-[35%] md:w-[100%]">
          <Image src="/chainlabLogo.svg" width="190" height="42" alt="logo" />
        </div>
        <div className="mr-2 md:mr-[6em]  flex gap-2 font-made-outer-sans font-medium text-[10px] md:text-[14px] uppercase text-[#EAFFFE]">
          <p>Story</p>
          <p>Utility</p>
          <p>RoadMap</p>
          <p>team</p>
          <p>faq</p>
          <div className="md:flex gap-2 hidden ">
            <Image
              src="Vectortwitter.svg"
              alt="twitter"
              width="16"
              height="16"
            />
            <Image src="Vectorboat.svg" alt="twitter" width="16" height="16" />
            <Image src="Vectorinsta.svg" alt="twitter" width="16" height="16" />
          </div>
        </div>
      </header>
      <ThreeDModel />
    </div>
  );
}
