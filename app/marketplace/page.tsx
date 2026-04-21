"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Store, ShoppingBag, Tag } from "lucide-react";

export default function MarketplacePage() {
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
        <div className="bg-orange-500 p-8 rounded-[2.5rem] mb-12 flex flex-col items-start">
          <Store className="w-12 h-12 text-white mb-4" />
          <h1 className="text-4xl font-black italic uppercase leading-tight">CAMPUS<br/>MARKETPLACE</h1>
          <p className="text-sm font-bold mt-2 opacity-80 uppercase tracking-widest">Buy and sell within your campus</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center py-20">
            <ShoppingBag className="w-12 h-12 text-gray-700 mb-4" />
            <h2 className="text-xl font-bold">No Items Yet</h2>
            <p className="text-gray-500 text-sm mt-2">Be the first to list something for sale!</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center py-20">
            <Tag className="w-12 h-12 text-orange-500/20 mb-4" />
            <button className="bg-orange-500 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-xs">
              List an Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}