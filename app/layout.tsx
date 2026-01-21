import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // 👈 CSS Import zaroori hai
import { Toaster } from "react-hot-toast"; // Toasts ke liye

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Timeline Maker",
  description: "Generate historical timelines in seconds",
  // 👇 Google Search Console verification yahan add kiya hai
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
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}