import Reveal from "@/components/Reveal";
import Contact from "@/components/Contact";
import { profile } from "@/lib/data";

export const metadata = { title: "Contact · Bayu Mukti Wibowo" };

export default function ContactPage() {
  return (
    <main>
      <Reveal className="mt-16">
        <h1 className="font-serif text-6xl leading-none">Contact</h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-muted">
          Have a project or an idea? Send a message and I&apos;ll get back to you.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12 border-t border-line pt-10">
        <div className="grid gap-8 md:grid-cols-[140px_1fr] md:gap-8">
          <h2 className="font-serif text-2xl leading-none md:pt-0.5">Email</h2>
          <div>
            <a href={`mailto:${profile.email}`} className="link text-lg">
              {profile.email}
            </a>
            <div className="mt-8">
              <Contact email={profile.email} />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 border-t border-line pt-10">
        <div className="grid gap-4 md:grid-cols-[140px_1fr] md:gap-8">
          <h2 className="font-serif text-2xl leading-none md:pt-0.5">Elsewhere</h2>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-muted">
            <a className="link" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="link" href={profile.x} target="_blank" rel="noreferrer">X</a>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
