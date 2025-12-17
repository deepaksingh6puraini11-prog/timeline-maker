"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast"; // ✅ Toast add kiya

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // ✅ Ye naya switch hai (Login ya Signup)
  const [isSignUp, setIsSignUp] = useState(false); 

  // 1. Handle Login & Signup
  const handleAuth = async () => {
    setLoading(true);

    if (isSignUp) {
      // 👉 New Account banana
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Check email for confirmation.");
      }
    } else {
      // 👉 Purana Account Login karna
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Wrong email or password!");
      } else {
        toast.success("Welcome back! 🚀");
        router.push("/editor");
      }
    }
    setLoading(false);
  };

  // 2. Handle Forgot Password
  const handleResetPassword = async () => {
    if (!email) return toast.error("Please enter your email first!");
    
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("Reset link sent to your email! 📧");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-md">
        
        {/* Dynamic Heading */}
        <h1 className="text-2xl font-bold mb-2 text-center">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-gray-500 text-center mb-6 text-sm">
          {isSignUp ? "Join us to start building" : "Login to your dashboard"}
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1 text-sm">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-purple-500"
              placeholder="name@example.com"
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
            onClick={handleAuth}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            {loading ? "Processing..." : (isSignUp ? "Sign Up Free" : "Log In")}
          </button>
        </div>

        <div className="mt-6 text-center space-y-3">
          {/* Forgot Password Link (Only shows in Login mode) */}
          {!isSignUp && (
            <button onClick={handleResetPassword} className="text-xs text-gray-500 hover:text-white transition">
              Forgot your password?
            </button>
          )}

          {/* Toggle between Login and Signup */}
          <p className="text-sm text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
            <button 
                onClick={() => setIsSignUp(!isSignUp)} 
                className="text-purple-400 hover:underline font-bold"
            >
              {isSignUp ? "Log In" : "Sign Up"}
            </button>
          </p>

          <Link href="/" className="block text-xs text-gray-600 hover:text-gray-400 mt-4">
            ← Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}