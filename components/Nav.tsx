"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const items = [
  { href: "/", label: "Home" },
  { href: "/goals", label: "Goals" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      {/* keeps the page layout steady while the header is fixed */}
      <div className="h-8" aria-hidden />
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 sm:top-6">
        <div className="mx-auto flex max-w-[760px] justify-center px-6 md:justify-start">
          <nav
            className={`pointer-events-auto flex items-center gap-6 rounded-full border px-4 py-2 text-[15px] transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 md:-ml-4 ${
              scrolled
                ? "border-white/10 bg-[#141413]/60 shadow-xl shadow-black/40 backdrop-blur-xl backdrop-saturate-150"
                : "border-transparent bg-transparent"
            }`}
          >
            <Link
              href="/"
              aria-label="Home"
              className="transition-opacity hover:opacity-70 md:mr-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/mark.png" alt="" className="h-6 w-auto md:h-5" />
            </Link>
            {items.map((i) => {
              const active = path === i.href;
              return (
                <Link
                  key={i.href}
                  href={i.href}
                  className={`relative hidden py-1 transition-colors md:block ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {i.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground/60"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
