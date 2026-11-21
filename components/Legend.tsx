import { COLORS, TARGET } from "@/lib/stats";

export default function Legend() {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
      <span className="flex items-center gap-1.5">
        Less
        {COLORS.map((c) => (
          <span key={c} className="size-2.5 rounded-[2px]" style={{ background: c }} />
        ))}
        More
      </span>
      <span className="flex items-center gap-1.5">
        <span className="size-[4px] rounded-full bg-[#7fc48f]" />
        Week on target ({TARGET}+ days)
      </span>
    </div>
  );
}
