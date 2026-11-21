import type { Day } from "./github";

export const COLORS = ["#1f1f1e", "#2b4733", "#3d6a4b", "#5e9468", "#9fd0a0"];
export const TARGET = 3; // active days per week to count as on target

export function stats(days: Day[]) {
  const active = days.filter((d) => d.count > 0).length;
  let best = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    best = Math.max(best, run);
  }
  let current = 0;
  let i = days.length - 1;
  if (days[i].count === 0) i--; // today may not be logged yet
  for (; i >= 0 && days[i].count > 0; i--) current++;
  return { active, best, current };
}
