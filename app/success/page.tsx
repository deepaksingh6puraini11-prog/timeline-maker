"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti"; // ✅ Fataake Import Kiye

export default function SuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // 🎆 Confetti Logic
  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Do jagah se fataake futenge (Left & Right)
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  useEffect(() => {
    // 1. Page load hote hi dhoom dhadaka
    triggerConfetti();

    // 2. Countdown Timer
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    // 3. Auto Redirect after 5 sec
    const redirect = setTimeout(() => {
      router.push("/dashboard");
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* 🎆 Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="relative z-10 bg-[#0f1014] border border-white/10 p-10 rounded-3xl text-center max-w-md w-full shadow-2xl shadow-green-900/20"
      >
        {/* ✅ Animated Check Icon */}
        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(34,197,94,0.4)]">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
          >
             <Check size={40} className="text-white" strokeWidth={4} />
          </motion.div>
        </div>

        <h1 className="text-3xl font-extrabold mb-2 text-white">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          Thank you! Your account has been upgraded.
        </p>

        {/* 👇 Receipt Details */}
        <div className="bg-white/5 rounded-xl p-4 mb-8 text-sm border border-white/5">
            <div className="flex justify-between mb-2">
                <span className="text-gray-500">Status</span>
                <span className="text-green-400 font-bold">Completed</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-500">Transaction</span>
                <span className="text-white">Secure 🔒</span>
            </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
            <button 
                onClick={() => router.push("/dashboard")}
                className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
                Go to Dashboard <ArrowRight size={18} />
            </button>
            
            <Link 
                href="/"
                className="block text-gray-500 hover:text-white text-sm font-medium transition-colors"
            >
                Back to Home
            </Link>
        </div>

        {/* Countdown */}
        <p className="text-xs text-gray-600 mt-6">
            Redirecting in {countdown}s...
        </p>

      </motion.div>
    </div>
  );
}