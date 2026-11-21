"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { homeIcon, goalsIcon, mailIcon } from "@/lib/dock-icons";

const items = [
  {
    href: "/",
    label: "Home",
    icon: homeIcon,
  },
  {
    href: "/goals",
    label: "Goals",
    icon: goalsIcon,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: mailIcon,
  },
];

const STEP = 68; // item width 64px + 4px gap

export default function MobileDock() {
  const path = usePathname();
  const index = items.findIndex((i) => i.href === path);
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-5 z-50 flex justify-center md:hidden"
    >
      <ul className="relative flex items-center gap-1 rounded-full border border-white/10 bg-[#141413]/80 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl">
        {index >= 0 && (
          <motion.span
            aria-hidden
            className="absolute left-1.5 top-1.5 h-12 w-16 rounded-full bg-white/10"
            initial={false}
            animate={{ x: index * STEP }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          />
        )}
        {items.map((i) => {
          const active = i.href === path;
          return (
            <li key={i.href}>
              <Link
                href={i.href}
                aria-label={i.label}
                aria-current={active ? "page" : undefined}
                className={`relative grid h-12 w-16 place-items-center rounded-full transition-colors ${
                  active ? "text-foreground" : "text-muted active:text-foreground"
                }`}
              >
                <motion.span
                  className="relative"
                  whileTap={{ scale: 0.88 }}
                >
                  <Icon icon={i.icon} width={24} height={24} />
                </motion.span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
