"use client";
import { useState } from "react";

export default function ProjectIcon({
  name,
  url,
  logo,
  size = 24,
}: {
  name: string;
  url?: string;
  logo?: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const host = url ? new URL(url).hostname : null;
  const style = { width: size, height: size };

  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={logo} alt="" style={style} className="shrink-0 rounded-md object-contain" />;
  }
  if (!host || failed) {
    return (
      <span
        style={style}
        className="grid shrink-0 place-items-center rounded-md bg-line text-[11px] font-medium uppercase text-muted"
      >
        {name[0]}
      </span>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://www.google.com/s2/favicons?domain=${host}&sz=64`}
      alt=""
      style={style}
      className="shrink-0 rounded-md bg-line object-contain"
      onError={() => setFailed(true)}
    />
  );
}
