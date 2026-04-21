"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// CORRECTED PATH: Going up one level to find 'lib' inside 'app'
import { supabase } from "../lib/supabase"; 
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, 
  Search, ShoppingBag, Plus, Home, Users, Store, 
  Bell, Menu, CheckCircle2, Flame, Megaphone, UserPlus
} from "lucide-react";

export default function CampusXDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // FIX: Added 'React.ChangeEvent<HTMLInputElement>' to solve the 'any' type error
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const createGroup = () => alert("Group creation coming soon!");

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#1c1e21] pb-20">
      
      {/* --- TOP NAV --- */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-4 flex justify-between items-center h-[60px]">
        <div className="flex items-center gap-2">
          <div className="bg-[#001f3f] text-white w-10 h-10 rounded-full flex items-center justify-center font-black italic">X</div>
          <div className="flex items-center bg-[#f0f2f5] px-3 py-2 rounded-full gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search CampusX..." 
              value={searchQuery}
              onChange={handleSearch}
              className="bg-transparent outline-none text-sm w-32 sm:w-56" 
            />
          </div>
        </div>

        <div className="hidden md:flex gap-10 items-center">
          <Home className="w-7 h-7 text-[#1877f2] border-b-4 border-[#1877f2] py-1 cursor-pointer" />
          <Store onClick={() => router.push("/marketplace")} className="w-7 h-7 text-gray-500 hover:text-[#1877f2] transition-all cursor-pointer" />
          <Users onClick={() => router.push("/groups")} className="w-7 h-7 text-gray-500 hover:text-[#1877f2] transition-all cursor-pointer" />
        </div>

        <div className="flex gap-2 items-center">
          <div className="bg-gray-200 p-2.5 rounded-full cursor-pointer"><Bell className="w-5 h-5" /></div>
          <div className="bg-gray-200 p-2.5 rounded-full cursor-pointer"><Menu className="w-5 h-5" /></div>
          <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white shadow-md" />
        </div>
      </nav>

      <main className="max-w-[680px] mx-auto pt-6 px-3">
        
        {/* --- AMEBO & GIST SECTION --- */}
        <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
           <div onClick={createGroup} className="min-w-[140px] bg-[#1877f2] text-white p-4 rounded-2xl flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-all">
              <UserPlus className="w-8 h-8" />
              <span className="text-[11px] font-black uppercase">Create Group</span>
           </div>
           <div className="min-w-[140px] bg-white p-4 rounded-2xl border border-gray-200 flex flex-col items-center gap-2 cursor-pointer hover:border-orange-500 transition-all">
              <Flame className="w-8 h-8 text-orange-500" />
              <span className="text-[11px] font-black uppercase">Hot Amebo</span>
           </div>
           <div className="min-w-[140px] bg-white p-4 rounded-2xl border border-gray-200 flex flex-col items-center gap-2 cursor-pointer hover:border-blue-400 transition-all">
              <Megaphone className="w-8 h-8 text-blue-500" />
              <span className="text-[11px] font-black uppercase">Daily Gist</span>
           </div>
        </div>

        {/* --- FEED LOADER --- */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-5 border border-gray-200 text-center py-12">
           <Loader2 className="w-10 h-10 animate-spin mx-auto" />
           <p className="text-gray-500 font-bold uppercase text-[10px] mt-4 tracking-widest">
             Syncing latest Campus Gist...
           </p>
        </div>
      </main>

      {/* --- MOBILE NAV --- */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50">
        <Home className="w-6 h-6 text-[#1877f2]" />
        <Store onClick={() => router.push("/marketplace")} className="w-6 h-6 text-gray-400" />
        <div onClick={() => router.push("/post-item")} className="bg-orange-500 p-3 rounded-2xl -mt-10 shadow-lg text-white">
          <Plus className="w-7 h-7" />
        </div>
        <Users onClick={() => router.push("/groups")} className="w-6 h-6 text-gray-400" />
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}

// FIX: Added '{ className }: { className: string }' to solve the implicit 'any' error
function Loader2({ className }: { className: string }) {
  return <div className={`border-4 border-gray-200 border-t-orange-500 rounded-full ${className}`} />;
}