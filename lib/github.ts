export type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

export async function getContributions(
  user: string,
): Promise<{ days: Day[]; total: number } | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const json = await res.json();
    return {
      days: json.contributions as Day[],
      total: json.total?.lastYear ?? 0,
    };
  } catch {
    return null;
  }
}
