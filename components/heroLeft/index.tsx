"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroLeft() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="md:w-1/2 flex flex-col justify-center items-start px-10 space-y-6 sticky top-20 self-start h-fit"
    >
      <h1 className="text-5xl font-bold text-[#4E635E] leading-tight">
        Belum punya kos? <br />
        <span className="text-[#A6B4AE]">Temukan pilihan terbaikmu!</span>
      </h1>
      <p className="text-[#4E635E] text-lg max-w-md">
        Jelajahi kos yang nyaman, aman, dan sesuai kebutuhanmu hanya di{" "}
        <strong>KosHunter</strong>.
      </p>
      <button className="bg-[#4E635E] text-white px-6 py-3 rounded-full hover:bg-[#3b504b] transition">
        Temukan Sekarang
      </button>
    </motion.div>
  );
}
