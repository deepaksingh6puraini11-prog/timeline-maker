import { createBrowserClient } from "@supabase/ssr";

function getCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : undefined;
}

function setCookie(name: string, value: string, options: any = {}) {
  if (typeof document === "undefined") return;

  const opts = {
    path: "/",
    sameSite: "lax",
    ...options,
  };

  let cookieStr = `${name}=${encodeURIComponent(value)}`;

  if (opts.maxAge) cookieStr += `; Max-Age=${opts.maxAge}`;
  if (opts.expires) cookieStr += `; Expires=${new Date(opts.expires).toUTCString()}`;
  if (opts.path) cookieStr += `; Path=${opts.path}`;
  if (opts.domain) cookieStr += `; Domain=${opts.domain}`;
  if (opts.sameSite) cookieStr += `; SameSite=${opts.sameSite}`;
  // production https me secure aayega
  if (opts.secure) cookieStr += `; Secure`;

  document.cookie = cookieStr;
}

function removeCookie(name: string, options: any = {}) {
  setCookie(name, "", { ...options, maxAge: 0 });
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return getCookie(name);
        },
        set(name: string, value: string, options: any) {
          setCookie(name, value, options);
        },
        remove(name: string, options: any) {
          removeCookie(name, options);
        },
      },
    }
  );
}
