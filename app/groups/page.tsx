"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Users, Hash, Plus } from "lucide-react";

export default function GroupsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050a14] text-white p-8 font-sans">
      <button 
        onClick={() => router.push('/dashboard')}
        className="flex items-center gap-2 text-orange-500 mb-8 hover:opacity-80 transition-all font-bold"
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO FEED
      </button>

      <div className="max-w-[1100px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-5xl font-black italic uppercase tracking-tighter">GROUPS</h1>
            <p className="text-gray-500 font-bold uppercase text-xs tracking-[0.2em] mt-2">Find your tribe on campus</p>
          </div>
          <button className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-all">
            <Plus className="w-6 h-6 text-orange-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {["Department", "Hostel", "Sports"].map((group) => (
            <div key={group} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-orange-500/50 transition-all cursor-pointer group">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500 transition-all">
                <Hash className="w-6 h-6 text-orange-500 group-hover:text-white" />
              </div>
              <h3 className="font-black italic text-lg uppercase">{group} Gists</h3>
              <p className="text-xs text-gray-500 mt-1 uppercase font-bold tracking-widest">Active Members: 0</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}