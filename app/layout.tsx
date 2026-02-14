import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import FooterGate from "./components/FooterGate";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Timeline Maker",
  description: "Generate historical timelines in seconds",
  icons: {
    icon: "/icon.png",
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
        <Toaster position="bottom-right" />
        <main>{children}</main>

        {/* ✅ Footer will auto-hide on /login, /auth/*, /signup */}
        <FooterGate />
      </body>
    </html>
  );
}
