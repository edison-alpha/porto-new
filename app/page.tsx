import Image from "next/image";
import ProjectPreview from "@/components/ProjectPreview";
import RailToc from "@/components/RailToc";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectIcon from "@/components/ProjectIcon";
import { profile, work, experience, more, also } from "@/lib/data";

const TOC = ["Work", "Experience", "Awards", "More", "Also"].map((l) => ({
  id: l.toLowerCase(),
  label: l,
}));

const LINE = "grid items-start gap-1 sm:grid-cols-[190px_1fr] sm:gap-6";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal
      as="section"
      id={label.toLowerCase()}
      className="scroll-mt-10 grid gap-5 border-t border-line py-10 md:grid-cols-[140px_1fr] md:gap-8"
    >
      <h2 className="font-serif text-2xl leading-none md:pt-0.5">{label}</h2>
      <div>{children}</div>
    </Reveal>
  );
}

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="link">
    {children}
  </a>
);

const Trophy = ({ label }: { label: string }) => (
  <span title={label} aria-label={label} role="img" className="ml-1 inline-flex text-[#e8b94a]">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" />
    </svg>
  </span>
);

const Dot = () => (
  <span className="ml-2 inline-block size-1.5 rounded-full bg-accent align-middle" />
);

export default function Home() {
  return (
    <main>
      <RailToc items={TOC} />
      <Reveal className="mt-16 flex items-start justify-between gap-6">
        <div>
          <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-5 max-w-sm text-lg leading-8 text-muted">
            {profile.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-muted">
            <Ext href={profile.github}>GitHub</Ext>
            <Ext href={profile.linkedin}>LinkedIn</Ext>
            <Ext href={profile.x}>X</Ext>
            <Link href="/contact" className="link">Email</Link>
            <span className="text-faint">·</span>
            <span>{profile.location}</span>
          </div>
        </div>
        <Image
          src="/me.png"
          alt={profile.name}
          width={72}
          height={72}
          priority
          className="mt-1 size-[72px] shrink-0 rounded-full bg-line object-cover object-top ring-1 ring-white/10"
        />
      </Reveal>

      <div className="mt-16">
        <Row label="Work">
          <ul className="space-y-5">
            {work.map((p) => (
              <ProjectPreview
                key={p.name}
                images={p.images}
                ratio={p.ratio}
                className={LINE}
              >
                <a
                  href={p.url ?? p.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-6 items-center gap-2.5 transition-opacity hover:opacity-70"
                >
                  {p.wordmark ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.logo} alt={p.name} className="h-[18px] w-auto" />
                  ) : (
                    <>
                      <ProjectIcon name={p.name} url={p.url} logo={p.logo} size={20} />
                      <span>{p.name}</span>
                    </>
                  )}
                  {p.award && <Trophy label={p.award} />}
                </a>
                <p className="text-muted">
                  {p.blurb}
                  {p.live && <Dot />}
                </p>
              </ProjectPreview>
            ))}
          </ul>
        </Row>

        <Row label="Experience">
          <ul className="space-y-5">
            {experience.map((x) => (
              <li key={x.company} className={LINE}>
                <span className="flex h-7 items-center gap-2.5">
                  <ProjectIcon name={x.company} logo={x.logo} size={28} />
                  {x.company}
                </span>
                <p className="text-muted">
                  {x.role} · {x.period}
                  {x.current && <Dot />}
                </p>
              </li>
            ))}
          </ul>
        </Row>

        <Row label="Awards">
          <div className={LINE}>
            <span>Indonesia Web3 Hackathon 2026</span>
            <p className="text-muted">
              2nd place, Finance &amp; Commerce track · SAMA
            </p>
          </div>
        </Row>

        <Row label="More">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {more.map((p) => (
              <li key={p.name}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-[15px] text-muted transition-colors hover:text-foreground"
                >
                  <ProjectIcon name={p.name} url={p.url} size={18} />
                  <span className="truncate">{p.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-muted">
            &amp; 50+ more on{" "}
            <Ext href={profile.github + "?tab=repositories"}>GitHub</Ext>
          </p>
        </Row>

        <Row label="Also">
          <dl className="space-y-5">
            {also.map((a) => (
              <div key={a.label} className={LINE}>
                <dt>{a.label}</dt>
                <dd className="text-muted">
                  {a.text && <span className="block text-foreground/90">{a.text}</span>}
                  {a.sub && <span className="block">{a.sub}</span>}
                  {a.links && (
                    <span className="flex flex-wrap gap-x-4 gap-y-1">
                      {a.links.map((l) => (
                        <Ext key={l.text} href={l.href}>
                          {l.text}
                        </Ext>
                      ))}
                    </span>
                  )}
                  {a.chips && (
                    <span className="flex flex-wrap gap-2">
                      {a.chips.map((c) => (
                        <span
                          key={c.name}
                          className="flex items-center gap-1.5 rounded-full border border-line py-0.5 pl-1.5 pr-3 text-sm text-foreground/80"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://icons.llamao.fi/icons/chains/rsz_${c.icon}.jpg`}
                            alt=""
                            width={16}
                            height={16}
                            className="size-4 rounded-full"
                          />
                          {c.name}
                        </span>
                      ))}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Row>
      </div>
    </main>
  );
}
