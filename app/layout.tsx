import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Timeline Maker",
  description: "Generate historical timelines in seconds",
  // ✅ यहाँ आपका नया फेविकॉन जुड़ गया है
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
        <main>{children}</main>
        <Footer /> 
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}