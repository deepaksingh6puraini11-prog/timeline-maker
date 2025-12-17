import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

// ✅ Yahan maine Title aur Logo update kiya hai
export const metadata: Metadata = {
  title: "Timeline Maker - Build Your Story",
  description: "Create beautiful timelines in seconds.",
  icons: {
    icon: "https://fav.farm/🚀", // 🚀 Ye trick se emoji aapka logo ban jayega!
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
        {/* Toast Notifications */}
        <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
        {children}
      </body>
    </html>
  );
}