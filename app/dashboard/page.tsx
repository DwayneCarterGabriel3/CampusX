"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// CORRECTED PATH: Since 'lib' is inside 'app', we only go up one level
import { supabase } from "../lib/supabase"; 
// COMPLETE ICON IMPORTS: To fix "Cannot find name" errors
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, 
  Search, ShoppingBag, Plus, Home, Users, Store, Bell, Menu, CheckCircle2
} from "lucide-react";

export default function CampusXDashboard() {
  const router = useRouter();

  const [posts] = useState([
    { 
      id: 1, 
      user: "John Gabriel Ikechukwu", 
      verified: true,
      university: "Lagos State University",
      time: "2h",
      content: "Selling my iPhone 13 Pro. 128GB, very clean, and factory unlocked. Ready for immediate pickup on campus.",
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
      content: "Final year clearance! Brand new Engineering lab coat and safety goggles for sale. DM if interested.",
      price: "₦15,000", 
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
      likes: 342,
      comments: 12
    }
  ]);

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#1c1e21] font-sans pb-12">
      
      {/* --- ELITE TOP NAVIGATION --- */}
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200 px-4 flex justify-between items-center h-[60px]">
        <div className="flex items-center gap-2">
          <div className="bg-[#001f3f] text-white w-10 h-10 rounded-full flex items-center justify-center font-black italic shadow-sm">X</div>
          <div className="hidden sm:flex items-center bg-[#f0f2f5] px-3 py-2 rounded-full gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search CampusX" className="bg-transparent outline-none text-sm w-44" />
          </div>
        </div>

        <div className="flex gap-12 items-center h-full">
          <Home className="w-7 h-7 text-[#1877f2] border-b-4 border-[#1877f2] py-1 cursor-pointer" />
          <Store className="w-7 h-7 text-gray-500 hover:text-[#1877f2] cursor-pointer" />
          <Users className="w-7 h-7 text-gray-500 hover:text-[#1877f2] cursor-pointer" />
        </div>

        <div className="flex gap-2 items-center">
          <div className="bg-gray-200 p-2.5 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"><Bell className="w-5 h-5" /></div>
          <div className="bg-gray-200 p-2.5 rounded-full cursor-pointer hover:bg-gray-300 transition-colors"><Menu className="w-5 h-5" /></div>
          <div className="w-10 h-10 rounded-full bg-orange-500 border-2 border-white shadow-sm" />
        </div>
      </nav>

      <main className="max-w-[680px] mx-auto pt-6 px-3">
        
        {/* --- STORIES SECTION --- */}
        <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar">
          <div className="min-w-[110px] h-[190px] bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden relative cursor-pointer">
            <div className="h-[130px] bg-orange-500" />
            <div className="absolute top-[115px] left-1/2 -translate-x-1/2 bg-[#1877f2] p-1.5 rounded-full border-4 border-white">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div className="mt-6 text-center text-[12px] font-bold">Add Story</div>
          </div>
          {["UNILAG", "LASU", "UNIBEN", "ABU"].map((campus, i) => (
            <div key={i} className="min-w-[110px] h-[190px] bg-gray-300 rounded-xl overflow-hidden relative cursor-pointer shadow-sm group">
               <img src={`https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=100${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-3 left-3 w-10 h-10 rounded-full border-4 border-[#1877f2] bg-gray-800" />
               <span className="absolute bottom-3 left-3 text-white text-[12px] font-bold drop-shadow-md">{campus}</span>
            </div>
          ))}
        </div>

        {/* --- POST BOX --- */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-5 border border-gray-200">
           <div className="flex gap-3 items-center border-b border-gray-100 pb-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-orange-500" />
              <div 
                onClick={() => router.push('/post-item')}
                className="bg-[#f0f2f5] hover:bg-gray-200 flex-grow py-2.5 px-5 rounded-full text-gray-500 cursor-pointer text-[15px] transition-colors"
              >
                List a new item on campus...
              </div>
           </div>
           <div className="flex justify-around text-gray-600 font-bold text-[14px] pt-1">
              <div className="hover:bg-gray-100 flex-grow py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <Plus className="text-red-500 w-5 h-5" /> List Item
              </div>
              <div className="hover:bg-gray-100 flex-grow py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors">
                <ShoppingBag className="text-green-500 w-5 h-5" /> Marketplace
              </div>
           </div>
        </div>

        {/* --- SOCIAL FEED --- */}
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-[15px] hover:underline cursor-pointer">
                      {post.user} {post.verified && <CheckCircle2 className="w-4 h-4 text-[#1877f2] fill-[#1877f2] text-white" />}
                    </div>
                    <p className="text-[12px] text-gray-500 font-medium mt-0.5">{post.time} • {post.university}</p>
                  </div>
                </div>
                <MoreHorizontal className="text-gray-400 cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 p-1" />
              </div>

              {/* Content */}
              <div className="px-4 pb-3 text-[15px] leading-relaxed text-[#050505]">
                {post.content}
              </div>

              {/* Image Section */}
              <div className="relative bg-[#f0f2f5] w-full flex justify-center border-y border-gray-100">
                <img src={post.image} className="w-full h-auto max-h-[500px] object-cover" />
                <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-2xl shadow-xl border border-gray-100">
                  <span className="text-[#1877f2] font-black text-xl tracking-tighter">{post.price}</span>
                </div>
              </div>

              {/* Interaction Bar */}
              <div className="px-4 py-3 flex justify-between items-center text-gray-500 text-[14px] border-b border-gray-100 mx-4">
                 <div className="flex items-center gap-1.5">
                   <div className="bg-[#1877f2] p-1 rounded-full shadow-sm"><Heart className="w-3 h-3 text-white fill-white" /></div>
                   <span className="font-medium">{post.likes}</span>
                 </div>
                 <div className="hover:underline cursor-pointer font-medium">{post.comments} comments</div>
              </div>

              {/* Buttons */}
              <div className="px-2 py-1 flex justify-around font-bold text-gray-600 text-[14px]">
                 <button className="flex-grow py-2.5 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2 transition-colors">
                   <Heart className="w-5 h-5" /> Like
                 </button>
                 <button className="flex-grow py-2.5 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2 transition-colors text-[#1877f2]">
                   <MessageCircle className="w-5 h-5" /> Message
                 </button>
                 <button className="flex-grow py-2.5 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-2 transition-colors">
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