import Reveal from "@/components/Reveal";
import Heatmap from "@/components/Heatmap";
import Legend from "@/components/Legend";
import { stats } from "@/lib/stats";
import { getContributions } from "@/lib/github";
import { profile } from "@/lib/data";

export const metadata = { title: "Goals · Bayu Mukti Wibowo" };

export default async function Goals() {
  const data = await getContributions(profile.githubUser);
  const s = data ? stats(data.days) : null;

  return (
    <main>
      <Reveal className="mt-16">
        <h1 className="font-serif text-6xl leading-none">Goals</h1>
        <p className="mt-6 text-lg text-muted">
          What I&apos;m working toward, tracked every day.
        </p>
      </Reveal>

      <Reveal as="section" delay={0.1} className="mt-12 border-t border-line pt-10">
        <h2 className="font-serif text-3xl">Build</h2>
        <p className="mt-2 text-muted">GitHub contributions</p>
        <div className="mt-8">
          {data && s ? (
            <>
              <Heatmap days={data.days} />
              <Legend />
              <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-muted">
                <span>{s.active} active days</span>
                <span>·</span>
                {s.current > 0 && (
                  <>
                    <span>{s.current} in a row</span>
                    <span>·</span>
                  </>
                )}
                <span>best {s.best}</span>
                <span>·</span>
                <span className="rounded-full border border-line px-2.5 py-0.5 text-foreground">
                  {data.total.toLocaleString()} contributions in the last year
                </span>
              </p>
            </>
          ) : (
            <p className="text-sm text-muted">
              Contribution data is unavailable right now. Try again shortly.
            </p>
          )}
        </div>
      </Reveal>
    </main>
  );
}
