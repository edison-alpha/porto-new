export const profile = {
  name: "Bayu Mukti Wibowo",
  tagline: "Front-end developer and Web3 builder from Indonesia.",
  location: "Indonesia",
  email: "bayumuktywibowo02@gmail.com",
  github: "https://github.com/edison-alpha",
  githubUser: "edison-alpha",
  linkedin: "https://www.linkedin.com/in/baym/",
  x: "https://x.com/0xmukti_w",
  site: "https://itsmebayumukti.vercel.app",
};

export type Project = {
  name: string;
  blurb: string;
  url?: string;
  repo: string;
  live?: boolean;
  logo?: string;
  wordmark?: boolean;
  award?: string;
  images?: string[];
  ratio?: number;
};

const gh = (r: string) => `https://github.com/edison-alpha/${r}`;

const workItems: Project[] = [
  {
    name: "Operra",
    blurb: "One office for humans and agents, built on NEAR",
    url: "https://operrai.vercel.app",
    logo: "/logos/operra.png",
    images: ["/projects/operra-1.png"],
    ratio: 1.6,
    repo: gh("operra-landing-page"),
    live: true,
  },
  {
    name: "SAMA",
    award: "2nd place, Finance & Commerce track · Indonesia Web3 Hackathon 2026",
    blurb: "Wallet-to-wallet matching for tokenized stocks on BNB Chain",
    repo: "https://github.com/sama-fi/sama",
    logo: "/logos/sama.svg",
    wordmark: true,
    images: ["/projects/sama-1.png", "/projects/sama-2.png", "/projects/sama-3.png"],
    ratio: 1448 / 1086,
  },
  {
    name: "Radar",
    logo: "/logos/radar.png",
    images: ["/projects/radar-cover.png", "/projects/radar-1.png", "/projects/radar-2.png", "/projects/radar-3.png"],
    ratio: 1453 / 951,
    blurb: "Prices pre-token DeFi protocols from a sealed snapshot",
    url: "https://make.fun/bounty/token-radar-01",
    repo: gh("Radar"),
    live: true,
  },
  {
    name: "intic.id",
    logo: "/logos/intic-white.png",
    wordmark: true,
    blurb: "Blockchain NFT tickets you own, trade and collect",
    url: "https://intic-official.vercel.app",
    repo: gh("intic.id-Hackthon-Project-G.U.D"),
    live: true,
  },
  {
    name: "Hibeats",
    blurb: "Web3 music social platform",
    url: "https://hibeatsxyz-rho.vercel.app",
    logo: "/logos/hibeats-white.png",
    repo: gh("hibeats.xyz"),
    live: true,
  },
];

const workOrder = ["SAMA", "Hibeats", "Radar", "Operra", "intic.id"];
export const work: Project[] = workOrder.map(
  (n) => workItems.find((p) => p.name === n)!,
);

export const experience = [
  { role: "Frontend Developer", company: "PT. Data Integrasi Inovasi", logo: "/logos/nuha-bw.png", period: "Apr 2026 – Present", current: true },
  { role: "Frontend Developer", company: "Pelitha Tech", period: "Dec 2024 – May 2025", current: false },
];

export const more: Project[] = [
  ["bump", "https://bump-ten-beta.vercel.app"],
  ["beework", "https://beework-ten.vercel.app"],
  ["BackToROCK", "https://backtorock.vercel.app"],
  ["mom3", "https://mom3-orcin.vercel.app"],
  ["trackboard", "https://trackboard-sigma.vercel.app"],
  ["venta", "https://venta-kappa.vercel.app"],
].map(([name, url, repo]) => ({
  name,
  blurb: "",
  url,
  repo: gh(repo ?? name),
  live: true,
}));


export type Also = {
  label: string;
  text?: string;
  sub?: string;
  links?: { text: string; href: string }[];
  chips?: { name: string; icon: string }[];
};

export const also: Also[] = [
  {
    label: "Education",
    text: "Universitas Muhammadiyah Ponorogo",
    sub: "Teknik Informatika · 2020–2025",
  },
  {
    label: "Hackathons",
    links: [
      { text: "intic.id", href: "https://intic-official.vercel.app" },
      { text: "Hibeats", href: "https://hibeatsxyz-rho.vercel.app" },
      { text: "Radar bounty", href: "https://make.fun/bounty/token-radar-01" },
    ],
  },
  { label: "Chains", chips: [
      { name: "BNB Chain", icon: "binance" },
      { name: "Solana", icon: "solana" },
      { name: "Arbitrum", icon: "arbitrum" },
      { name: "EVM", icon: "ethereum" },
    ] },
];
