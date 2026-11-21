import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import MobileDock from "@/components/MobileDock";
import ServiceWorker from "@/components/ServiceWorker";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Bayu Mukti Wibowo",
  description:
    "Informatics engineer from Indonesia building web3 and full-stack products.",
  applicationName: "Bayu Mukti Wibowo",
  appleWebApp: { capable: true, title: "Bayu", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#141413",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${serif.variable}`}>
      <body className="min-h-screen antialiased">
        <div className="mx-auto w-full max-w-[760px] px-6 pb-32 pt-10 sm:pt-14">
          <Nav />
          {children}
        </div>
        <MobileDock />
        <ServiceWorker />
      </body>
    </html>
  );
}
