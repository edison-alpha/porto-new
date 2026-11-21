"use client";
import { motion } from "motion/react";
import type { Day } from "@/lib/github";
import { COLORS, TARGET } from "@/lib/stats";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MOBILE_WEEKS = 20; // small screens show a shorter, larger window

const utc = (s: string) => new Date(s + "T00:00:00Z");

export default function Heatmap({ days }: { days: Day[] }) {
  // pad the start so the first column begins on Sunday
  const first = utc(days[0].date).getUTCDay();
  const cells: (Day | null)[] = [...Array(first).fill(null), ...days];
  const weeks: (Day | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const today = days[days.length - 1].date;
  const total = weeks.length;
  const mobileFrom = Math.max(0, total - MOBILE_WEEKS);

  const monthOf = (w: (Day | null)[]) => {
    const d = w.find(Boolean);
    return d ? utc(d.date).getUTCMonth() : -1;
  };

  return (
    <div
      style={
        {
          "--cols-m": total - mobileFrom,
          "--cols-d": total,
        } as React.CSSProperties
      }
    >
      <div className="grid grid-cols-[repeat(var(--cols-m),minmax(0,1fr))] gap-[3px] md:grid-cols-[repeat(var(--cols-d),minmax(0,1fr))]">
        {weeks.map((w, wi) => {
          const m = monthOf(w);
          const prev = wi > 0 ? monthOf(weeks[wi - 1]) : -1;
          // skip labels in the last columns, they would overflow the edge
          const label = m !== prev && wi < total - 3 ? MONTHS[m] : "";
          const on = w.filter((d) => d && d.count > 0).length >= TARGET;
          return (
            <div
              key={wi}
              className={`${wi < mobileFrom ? "hidden md:grid" : "grid"} content-start gap-[3px]`}
            >
              <span className="h-4 whitespace-nowrap text-[10px] uppercase tracking-wider text-faint">
                {label}
              </span>
              {Array.from({ length: 7 }, (_, di) => {
                const d = w[di];
                if (!d) return <div key={di} className="aspect-square" />;
                return (
                  <motion.div
                    key={d.date}
                    title={`${d.count} contributions · ${d.date}`}
                    className="aspect-square rounded-[3px]"
                    style={{
                      background: COLORS[d.level],
                      outline: d.date === today ? "1px solid #f2f1ee" : "none",
                      outlineOffset: 1,
                    }}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: wi * 0.012 + di * 0.01,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
              <span className="mt-1 flex h-1 justify-center">
                {on && <span className="size-[4px] rounded-full bg-[#7fc48f]" />}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-faint md:hidden">
        Last {Math.min(MOBILE_WEEKS, total)} weeks · full year on larger screens
      </p>
    </div>
  );
}
