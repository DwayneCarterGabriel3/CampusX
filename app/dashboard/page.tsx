"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; 
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, 
  Search, ShoppingBag, Plus, Home, Users, Store, 
  Bell, Menu, CheckCircle2, Flame, Megaphone, UserPlus,
  BookOpen, MapPin, Clock
} from "lucide-react";

export default function CampusXDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Safety navigation: Checks if a feature is ready or just a demo
  const navigateTo = (path: string) => {
    // If the folder doesn't exist in your project, we show an alert instead of a 404
    if (path === "/marketplace" || path === "/groups") {
      alert(`${path.replace("/", "")} feature is being prepared for campus launch!`);
    } else {
      router.push(path);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#1c1e21] pb-20">
      
      {/* --- TOP NAV --- */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-4 flex justify-between items-center h-[60px]">
        <div className="flex items-center gap-2">
          <div className="bg-[#001f3f] text-white w-10 h-10 rounded-full flex items-center justify-center font-black italic shadow-md">X</div>
          <div className="flex items-center bg-[#f0f2f5] px-3 py-2 rounded-full gap-2 focus-within:ring-2 ring-orange-500/20 transition-all">
            <Search className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search CampusX..." 
              className="bg-transparent outline-none text-sm w-32 sm:w-56" 
            />
          </div>
        </div>

        <div className="hidden md:flex gap-12 items-center h-full">
          <Home className="w-7 h-7 text-[#1877f2] border-b-4 border-[#1877f2] py-1 cursor-pointer" />
          <Store onClick={() => navigateTo("/marketplace")} className="w-7 h-7 text-gray-400 hover:text-[#1877f2] transition-all cursor-pointer" />
          <Users onClick={() => navigateTo("/groups")} className="w-7 h-7 text-gray-400 hover:text-[#1877f2] transition-all cursor-pointer" />
        </div>

        <div className="flex gap-2 items-center">
          <div className="bg-gray-200 p-2.5 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"><Bell className="w-5 h-5" /></div>
          <div className="bg-gray-200 p-2.5 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"><Menu className="w-5 h-5" /></div>
          <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white shadow-sm cursor-pointer" />
        </div>
      </nav>

      <main className="max-w-[720px] mx-auto pt-6 px-3 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* --- LEFT SIDE: LECTURES & STATUS --- */}
        <div className="hidden md:block space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-[11px] font-black uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-500" /> Today's Lectures
            </h3>
            <div className="space-y-3">
              <div className="border-l-4 border-orange-500 pl-3 py-1">
                <p className="text-[13px] font-bold">CSC 401: AI</p>
                <p className="text-[11px] text-gray-500">LT 1 • 10:00 AM</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-3 py-1">
                <p className="text-[13px] font-bold">GST 221</p>
                <p className="text-[11px] text-gray-500">Main Aud • 02:00 PM</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-[11px] font-black uppercase text-gray-400 mb-4 tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-500" /> Who's in School?
            </h3>
            <div className="flex -space-x-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 shadow-sm" />
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold">+120</div>
            </div>
            <p className="text-[11px] text-gray-500 mt-3 font-medium">124 friends are currently on campus.</p>
          </div>
        </div>

        {/* --- MIDDLE: THE MAIN FEED --- */}
        <div className="md:col-span-2 space-y-4">
          
          {/* AMEBO BUTTONS */}
          <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
             <div className="min-w-[130px] bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 cursor-pointer hover:border-orange-500 hover:shadow-md transition-all active:scale-95 group">
                <Flame className="w-8 h-8 text-orange-500 group-hover:animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Hot Amebo</span>
             </div>
             <div className="min-w-[130px] bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 cursor-pointer hover:border-blue-500 transition-all active:scale-95 group">
                <Megaphone className="w-8 h-8 text-blue-500 group-hover:rotate-6 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Daily Gist</span>
             </div>
             <div className="min-w-[130px] bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 cursor-pointer hover:border-[#1877f2] transition-all active:scale-95 group">
                <UserPlus className="w-8 h-8 text-[#1877f2]" />
                <span className="text-[10px] font-black uppercase tracking-tighter">New Tribe</span>
             </div>
          </div>

          {/* DYNAMIC AMEBO POST */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex gap-3 items-center">
                <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white shadow-sm" />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-[14px]">
                    Campus Amebo <CheckCircle2 className="w-3.5 h-3.5 text-[#1877f2] fill-[#1877f2] text-white" />
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium">Just Now • Trending 🔥</p>
                </div>
              </div>
              <MoreHorizontal className="text-gray-400 cursor-pointer" />
            </div>

            <div className="px-4 pb-4 text-[15px] leading-relaxed font-medium">
              Omo! Who else saw what happened at the Science Lecture Theater today? The gist is already everywhere! 🍿☕️
            </div>

            <div className="px-4 py-3 flex justify-between items-center text-gray-500 text-[12px] border-t border-gray-50 mx-4">
               <div className="flex items-center gap-1">
                 <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                 <span className="font-bold">2.4k others liked this gist</span>
               </div>
               <span className="font-bold hover:underline cursor-pointer">89 comments</span>
            </div>

            <div className="px-2 py-1 flex justify-around font-bold text-gray-500 text-[13px] border-t border-gray-100">
               <button className="flex-grow py-3 hover:bg-gray-50 rounded-xl flex items-center justify-center gap-2 transition-all"><Heart className="w-5 h-5" /> Like</button>
               <button className="flex-grow py-3 hover:bg-gray-50 rounded-xl flex items-center justify-center gap-2 transition-all text-[#1877f2]"><MessageCircle className="w-5 h-5" /> Gist</button>
               <button className="flex-grow py-3 hover:bg-gray-50 rounded-xl flex items-center justify-center gap-2 transition-all"><Share2 className="w-5 h-5" /> Share</button>
            </div>
          </div>

        </div>
      </main>

      {/* MOBILE NAV (FIXED) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 px-8 py-4 flex justify-between items-center z-50">
        <Home className="w-6 h-6 text-[#1877f2]" />
        <Store onClick={() => navigateTo("/marketplace")} className="w-6 h-6 text-gray-400" />
        <div onClick={() => router.push("/post-item")} className="bg-orange-500 p-3.5 rounded-2xl -mt-12 shadow-xl shadow-orange-500/30 text-white active:scale-90 transition-all">
          <Plus className="w-7 h-7" />
        </div>
        <Users onClick={() => navigateTo("/groups")} className="w-6 h-6 text-gray-400" />
        <div className="w-8 h-8 rounded-full bg-gray-300" />
      </div>
    </div>
  );
}