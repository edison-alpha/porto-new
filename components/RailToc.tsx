"use client";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export type TocItem = { id: string; label: string };

export default function RailToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <nav
      aria-label="On this page"
      className="fixed left-8 top-1/2 z-40 hidden -translate-y-1/2 xl:block 2xl:left-16"
    >
      <div className="relative py-1 pl-5">
        <span className="absolute inset-y-0 left-0 w-px bg-line" />
        <motion.span
          className="absolute inset-y-0 left-0 w-px origin-top bg-foreground"
          style={{ scaleY: progress }}
        />
        <ul className="space-y-3">
          {items.map((i) => {
            const on = i.id === active;
            return (
              <li key={i.id} className="relative">
                <motion.span
                  aria-hidden
                  className="absolute -left-5 top-1/2 h-px -translate-y-1/2 bg-foreground"
                  animate={{ width: on ? 14 : 6, opacity: on ? 1 : 0.35 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
                <button
                  type="button"
                  onClick={() => go(i.id)}
                  aria-current={on ? "true" : undefined}
                  className={`text-[13px] transition-colors ${
                    on ? "text-foreground" : "text-faint hover:text-muted"
                  }`}
                >
                  {i.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
