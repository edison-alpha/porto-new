"use client";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

const W = 340;
const GAP = 24;

export default function ProjectPreview({
  images,
  ratio = 4 / 3,
  className,
  children,
}: {
  images?: string[];
  ratio?: number;
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [mounted, setMounted] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 380, damping: 36 });
  const y = useSpring(useMotionValue(0), { stiffness: 380, damping: 36 });

  useEffect(() => setMounted(true), []);

  // cycle through screenshots while hovering
  useEffect(() => {
    if (!open || !images || images.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 1400);
    return () => clearInterval(t);
  }, [open, images]);

  if (!images?.length) return <li className={className}>{children}</li>;

  const h = W / ratio;
  const move = (e: React.MouseEvent) => {
    const right = e.clientX + GAP + W > window.innerWidth;
    x.set(right ? e.clientX - GAP - W : e.clientX + GAP);
    y.set(
      Math.min(
        Math.max(12, e.clientY - h / 2),
        window.innerHeight - h - 12,
      ),
    );
  };

  return (
    <li
      className={className}
      onMouseEnter={(e) => {
        move(e);
        x.jump(x.get());
        y.jump(y.get());
        setIdx(0);
        setOpen(true);
      }}
      onMouseMove={move}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-50 overflow-hidden rounded-xl border border-white/10 bg-[#141413] shadow-2xl shadow-black/60"
                style={{ x, y, width: W, height: h }}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={images[idx]}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={images[idx]}
                      alt=""
                      fill
                      sizes="340px"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </li>
  );
}
