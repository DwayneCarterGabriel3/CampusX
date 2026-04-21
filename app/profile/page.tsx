"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, Settings, LogOut, Bell } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans">
      <nav className="flex items-center justify-between px-8 py-4 bg-[#050a14] border-b border-white/5">
        <div onClick={() => router.push('/dashboard')} className="bg-orange-500 p-2 rounded-xl cursor-pointer">
          <span className="text-white font-black text-xl">X</span>
        </div>
        <div className="flex items-center gap-6">
          <Bell className="w-6 h-6 text-gray-400" />
          <div className="w-10 h-10 rounded-full border-2 border-orange-500 p-0.5">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="avatar" className="rounded-full" />
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto p-8 text-center md:text-left">
        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-orange-500 mb-12 font-black italic uppercase tracking-tighter">
          <ArrowLeft className="w-5 h-5" /> BACK TO FEED
        </button>

        <div className="bg-[#0a101f] border border-white/10 p-12 rounded-[3rem] flex flex-col md:flex-row items-center gap-12 shadow-2xl">
          <div className="w-40 h-40 rounded-full border-4 border-orange-500 p-1">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="avatar" className="rounded-full" />
          </div>
          <div className="flex-1">
            <h1 className="text-5xl font-black italic uppercase tracking-tighter mb-4">John Gabriel Ikechukwu</h1>
            <p className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-500 px-4 py-2 rounded-full font-black italic text-sm border border-orange-500/20 uppercase">
              <MapPin className="w-4 h-4" /> Lagos State University (LASU)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
            <h3 className="font-black italic uppercase text-gray-400 mb-2">Account Settings</h3>
            <Settings className="w-6 h-6 text-gray-400" />
          </div>
          <div onClick={() => router.push('/login')} className="bg-red-500/5 p-8 rounded-[2rem] border border-red-500/10 hover:bg-red-500/10 transition-all cursor-pointer">
            <h3 className="font-black italic uppercase text-red-500 mb-2">Sign Out</h3>
            <LogOut className="w-6 h-6 text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
}