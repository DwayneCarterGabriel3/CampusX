"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, 
  Search, ShoppingBag, Plus, Home, Users, Store, Bell, Menu
} from "lucide-react";

const CAMPUS_POSTS = [
  { 
    id: 1, 
    user: "John Gabriel Ikechukwu", 
    verified: true,
    university: "Lagos State University",
    time: "2h",
    content: "Upgraded my setup, selling my iPhone 13 Pro. Very neat, factory unlocked. DM for a quick deal!",
    price: "₦450,000", 
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1000",
    likes: "1.2k",
    comments: 45
  },
  { 
    id: 2, 
    user: "Sarah Aminu", 
    verified: false,
    university: "University of Benin",
    time: "5h",
    content: "Final year clearing! Engineering lab coat and safety goggles available for next 100L students.",
    price: "₦15,000", 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
    likes: 342,
    comments: 12
  }
];

export default function FacebookStyleMarketplace() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#1c1e21] font-sans pb-10">
      
      {/* --- ELITE TOP NAV (FACEBOOK STYLE) --- */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-4 flex justify-between items-center h-[56px]">
        <div className="flex items-center gap-2">
          <div className="bg-[#001f3f] text-white w-10 h-10 rounded-full flex items-center justify-center font-black italic">X</div>
          <div className="hidden md:flex items-center bg-[#f0f2f5] px-3 py-2 rounded-full gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search CampusX" className="bg-transparent outline-none text-sm w-40" />
          </div>
        </div>

        <div className="flex gap-8 items-center h-full">
          <Home className="w-7 h-7 text-[#1877f2] border-b-4 border-[#1877f2] py-1 cursor-pointer" />
          <Store className="w-7 h-7 text-gray-500 hover:text-[#1877f2] cursor-pointer" />
          <Users className="w-7 h-7 text-gray-500 hover:text-[#1877f2] cursor-pointer" />
        </div>

        <div className="flex gap-2 items-center">
          <div className="bg-gray-200 p-2 rounded-full"><Bell className="w-5 h-5" /></div>
          <div className="bg-gray-200 p-2 rounded-full"><Menu className="w-5 h-5" /></div>
          <div className="w-10 h-10 rounded-full bg-orange-500 border border-gray-200" />
        </div>
      </nav>

      <main className="max-w-[700px] mx-auto pt-5">
        
        {/* --- STORIES BAR --- */}
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          <div className="min-w-[112px] h-[200px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative cursor-pointer group">
            <div className="h-[140px] bg-gray-300 overflow-hidden">
               <div className="w-full h-full bg-orange-500" />
            </div>
            <div className="absolute top-[125px] left-1/2 -translate-x-1/2 bg-[#1877f2] p-1 rounded-full border-4 border-white">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="mt-5 text-center text-[12px] font-bold">Create Story</div>
          </div>
          {["UNILAG", "LASU", "UNIBEN", "ABU"].map((campus, i) => (
            <div key={i} className="min-w-[112px] h-[200px] bg-gray-400 rounded-xl overflow-hidden relative cursor-pointer shadow-sm">
               <div className="absolute top-3 left-3 w-9 h-9 rounded-full border-4 border-[#1877f2] bg-gray-800" />
               <span className="absolute bottom-3 left-3 text-white text-[12px] font-bold shadow-black drop-shadow-md">{campus}</span>
            </div>
          ))}
        </div>

        {/* --- POST SOMETHING (WHAT'S ON YOUR MIND) --- */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200">
           <div className="flex gap-3 items-center border-b border-gray-100 pb-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-orange-500" />
              <div 
                onClick={() => router.push('/post-item')}
                className="bg-[#f0f2f5] hover:bg-gray-200 flex-grow py-2 px-4 rounded-full text-gray-500 cursor-pointer text-[15px]"
              >
                What are you selling today, John Gabriel?
              </div>
           </div>
           <div className="flex justify-around text-gray-500 font-bold text-[13px]">
              <div className="hover:bg-gray-100 p-2 rounded-lg flex items-center gap-2 cursor-pointer">
                <Plus className="text-red-500" /> List Item
              </div>
              <div className="hover:bg-gray-100 p-2 rounded-lg flex items-center gap-2 cursor-pointer">
                <ShoppingCart className="text-green-500" /> Marketplace
              </div>
           </div>
        </div>

        {/* --- NEWS FEED --- */}
        <div className="space-y-4">
          {CAMPUS_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200">
              {/* Post Header */}
              <div className="p-3 flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-300" />
                  <div>
                    <div className="flex items-center gap-1 font-bold text-[15px] hover:underline cursor-pointer">
                      {post.user} {post.verified && <span className="text-[#1877f2] text-xs">✔</span>}
                    </div>
                    <p className="text-[12px] text-gray-500 leading-none mt-0.5">{post.time} • {post.university}</p>
                  </div>
                </div>
                <MoreHorizontal className="text-gray-500 cursor-pointer" />
              </div>

              {/* Caption */}
              <div className="px-3 pb-3 text-[15px] leading-tight">
                {post.content}
              </div>

              {/* Product Image */}
              <div className="relative bg-black w-full border-y border-gray-100">
                <img src={post.image} className="w-full h-auto max-h-[600px] object-contain" />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-xl border border-gray-200">
                  <span className="text-[#1877f2] font-black text-lg">{post.price}</span>
                </div>
              </div>

              {/* Interaction Stats */}
              <div className="p-3 flex justify-between items-center text-gray-500 text-[14px]">
                 <div className="flex items-center gap-1">
                   <div className="bg-[#1877f2] p-1 rounded-full"><Heart className="w-3 h-3 text-white fill-white" /></div>
                   <span>{post.likes}</span>
                 </div>
                 <div className="hover:underline cursor-pointer">{post.comments} comments</div>
              </div>

              {/* Buttons */}
              <div className="mx-3 border-t border-gray-100 py-1 flex justify-around font-bold text-gray-600 text-[14px]">
                 <button className="flex-grow py-2 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <Heart className="w-5 h-5" /> Like
                 </button>
                 <button className="flex-grow py-2 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <MessageCircle className="w-5 h-5" /> Message
                 </button>
                 <button className="flex-grow py-2 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <Share2 className="w-5 h-5" /> Share
                 </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}