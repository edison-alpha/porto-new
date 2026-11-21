"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";

const noise = `url("data:image/svg+xml;utf8,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>",
)}")`;

const dots =
  "radial-gradient(circle at center, rgba(0,0,0,.9) 28%, transparent 30%)";

export default function ProfilePhoto({ src, alt }: { src: string; alt: string }) {
  const [textured, setTextured] = useState(false);

  return (
    <div className="mt-1 flex shrink-0 flex-col items-center gap-2.5">
    <motion.button
      type="button"
      onClick={() => setTextured((t) => !t)}
      aria-label="Toggle photo texture"
      aria-pressed={textured}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="relative size-[72px] shrink-0 cursor-pointer overflow-hidden rounded-full bg-line ring-1 ring-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
    >
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{
          filter: textured
            ? "grayscale(1) contrast(1.45) brightness(1.08)"
            : "grayscale(0) contrast(1) brightness(1)",
          scale: textured ? 1.06 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Image
          src={src}
          alt={alt}
          width={72}
          height={72}
          priority
          className="size-full object-cover object-top"
        />
      </motion.div>

      {/* halftone dots */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        initial={false}
        animate={{ opacity: textured ? 0.4 : 0 }}
        transition={{ duration: 0.5 }}
        style={{ backgroundImage: dots, backgroundSize: "3px 3px" }}
      />

      {/* animated film grain */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -inset-4 mix-blend-overlay"
        initial={false}
        animate={
          textured
            ? {
                opacity: 0.95,
                x: [0, -9, 6, -4, 9, -7, 3, 0],
                y: [0, 6, -8, 5, -3, 8, -5, 0],
              }
            : { opacity: 0, x: 0, y: 0 }
        }
        transition={
          textured
            ? {
                opacity: { duration: 0.4 },
                x: { duration: 0.6, repeat: Infinity, ease: "linear" },
                y: { duration: 0.6, repeat: Infinity, ease: "linear" },
              }
            : { duration: 0.3 }
        }
        style={{ backgroundImage: noise, backgroundSize: "70px 70px" }}
      />
    </motion.button>

      <button
        type="button"
        role="switch"
        aria-checked={textured}
        aria-label="Texture"
        onClick={() => setTextured((t) => !t)}
        className="group flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-wider text-faint transition-colors hover:text-muted"
      >
        <span
          className={`relative h-[18px] w-8 cursor-pointer rounded-full border transition-colors duration-300 ${
            textured ? "border-foreground bg-foreground" : "border-line bg-transparent"
          }`}
        >
          <motion.span
            className={`absolute top-[2px] size-3 rounded-full ${textured ? "bg-background" : "bg-muted"}`}
            initial={false}
            animate={{ x: textured ? 15 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
          />
        </span>
        <span className="cursor-pointer">{textured ? "On" : "Off"}</span>
      </button>
    </div>
  );
}
