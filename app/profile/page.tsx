import Link from "next/link";
import { ArrowLeft, User } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center font-sans p-4">
      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
         <User size={32} className="text-blue-500" />
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
      <p className="text-gray-400 mb-8 text-center">
        Manage your account settings and preferences here.
      </p>

      <Link href="/dashboard" className="px-6 py-3 bg-white text-black rounded-xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors">
        <ArrowLeft size={18}/> Back to Dashboard
      </Link>
    </div>
  );
}