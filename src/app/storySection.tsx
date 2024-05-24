import Image from "next/image";
import React from "react";
import VerticalLinearStepper from "./verticalStepper";

export default function StorySection() {
  return (
    <div className="bg-[#260120] p-1 flex flex-col lg:flex-row">
      {/* image section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:w-[45%]">
        <Image src="1.svg" alt="bot1" width="200" height="200" />
        <Image src="2.svg" alt="bot1" width="200" height="200" />
        <Image src="3.svg" alt="bot1" width="200" height="200" />
        <Image src="4.svg" alt="bot1" width="200" height="200" />
        <Image src="5.svg" alt="bot1" width="200" height="200" />
        <Image src="6.svg" alt="bot1" width="200" height="200" />
        <Image src="2 1.svg" alt="bot1" width="200" height="200" />
        <Image src="3 1.svg" alt="bot1" width="200" height="200" />
        <Image src="4 1.svg" alt="bot1" width="200" height="200" />
        <Image src="5 1.svg" alt="bot1" width="200" height="200" />
        <Image src="6 1.svg" alt="bot1" width="200" height="200" />
        <Image src="7 1.svg" alt="bot1" width="200" height="200" />
      </div>
      {/* storyline section */}
      <div className="flex flex-col">
        <p className="mx-4 md:mx-8 text-[24px] md:text-[48px] font-made-outer-sans font-bold text-[#EAFFFE] uppercase">
          Here’s The story behind primobots.
        </p>
        <VerticalLinearStepper />
      </div>
    </div>
  );
}
