"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterGate() {
  const pathname = usePathname() || "";

  // ✅ Hide footer on auth-related pages
  const hideFooter =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/auth");

  if (hideFooter) return null;

  return <Footer />;
}
