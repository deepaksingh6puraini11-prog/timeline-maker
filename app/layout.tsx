import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import FooterGate from "./components/FooterGate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://aitimelinemaker.online"),
  title: {
    default: "AI Timeline Maker",
    template: "%s | AI Timeline Maker",
  },
  description: "Generate historical timelines in seconds",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
  },

  openGraph: {
    title: "AI Timeline Maker",
    description: "Generate historical timelines in seconds",
    url: "https://aitimelinemaker.online",
    siteName: "AI Timeline Maker",
    type: "website",
  },

  verification: {
    google: "EhOY7Gu11Sd4KQa0IEs-NmuwOzofWc7Eli8wUOYMUB4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>{children}</main>
        <FooterGate />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
