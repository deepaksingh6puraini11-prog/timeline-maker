"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Error: " + error.message);
      setLoading(false);
    } else {
      router.push("/editor"); // Login success, go to Editor
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome Back</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1 text-sm">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-gray-400 mb-1 text-sm">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="Enter password"
            />
          </div>

          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            {loading ? "Checking..." : "Log In"}
          </button>
        </div>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account? No worries, <Link href="/" className="text-purple-400 hover:underline">Go Home</Link>
        </p>
      </div>
    </div>
  );
}