import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bayu Mukti Wibowo",
    short_name: "Bayu",
    description:
      "Front-end developer and Web3 builder from Indonesia. Portfolio, goals and contact.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#141413",
    theme_color: "#141413",
    lang: "en",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Goals", url: "/goals" },
      { name: "Contact", url: "/contact" },
    ],
  };
}
