"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle, Share2, MoreHorizontal, ShoppingCart, Search, PlusCircle } from "lucide-react";

// Professional Sample Data
const FEED_POSTS = [
  { 
    id: 1, 
    user: "John Gabriel Ikechukwu", 
    university: "Lagos State University",
    time: "Just now",
    title: "iPhone 13 Pro - Clean, 128GB, Midnight Blue", 
    price: "₦450,000", 
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=1000",
    likes: 42,
    comments: 8
  },
  { 
    id: 2, 
    user: "Sarah Aminu", 
    university: "University of Benin",
    time: "3h ago",
    title: "Brand New Engineering Lab Coat & Goggles", 
    price: "₦15,000", 
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000",
    likes: 15,
    comments: 3
  }
];

export default function SocialDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans pb-24">
      {/* --- PREMIUM HEADER --- */}
      <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-black italic tracking-tighter">
          CAMPUS<span className="text-orange-500 underline decoration-2 underline-offset-4">X</span>
        </h1>
        <div className="flex gap-5 items-center">
          <Search className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
          <div className="relative">
             <ShoppingCart className="w-6 h-6 text-gray-400" />
             <span className="absolute -top-1 -right-1 bg-orange-500 text-[8px] px-1 rounded-full font-bold">2</span>
          </div>
        </div>
      </nav>

      <main className="max-w-xl mx-auto py-6">
        {/* --- CAMPUS SELECTOR (STORY BAR) --- */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-6 no-scrollbar">
          {["All Schools", "UNILAG", "LASU", "UNIBEN", "ABU", "OAU"].map((school, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[75px]">
              <div className={`w-16 h-16 rounded-full p-[2px] ${i === 0 ? 'bg-orange-500' : 'bg-gradient-to-tr from-gray-700 to-gray-500'}`}>
                <div className="w-full h-full rounded-full bg-black border-2 border-[#020617]" />
              </div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{school}</span>
            </div>
          ))}
        </div>

        {/* --- THE FEED --- */}
        <div className="space-y-8 px-2 md:px-0">
          {FEED_POSTS.map((post) => (
            <div key={post.id} className="bg-white/5 rounded-[40px] border border-white/10 overflow-hidden shadow-2xl">
              {/* Profile Header */}
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/20" />
                  <div>
                    <h4 className="text-sm font-bold tracking-wide">{post.user}</h4>
                    <p className="text-[10px] text-gray-500 font-medium uppercase">{post.university} • {post.time}</p>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </div>

              {/* High-Resolution Media Section */}
              <div className="relative w-full aspect-[4/5] bg-neutral-900 group">
                <img src={post.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute bottom-6 left-6 flex flex-col gap-1">
                   <span className="bg-orange-500 text-white text-lg font-black px-4 py-1.5 rounded-2xl shadow-xl w-fit">
                    {post.price}
                  </span>
                  <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full w-fit border border-white/20 uppercase tracking-widest">
                    Available Now
                  </span>
                </div>
              </div>

              {/* Engagement Bar */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-5">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <Heart className="w-7 h-7 text-gray-400 group-hover:text-red-500 transition-colors" />
                      <span className="text-xs font-black text-gray-400">{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 group cursor-pointer">
                      <MessageCircle className="w-7 h-7 text-gray-400 group-hover:text-orange-500 transition-colors" />
                      <span className="text-xs font-black text-gray-400">{post.comments}</span>
                    </div>
                    <Share2 className="w-7 h-7 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                  </div>
                  <button className="bg-white text-black text-[11px] font-black px-6 py-2.5 rounded-full uppercase tracking-tighter hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-xl">
                    Message Seller
                  </button>
                </div>
                <p className="text-sm leading-relaxed">
                  <span className="font-black text-orange-500 mr-2">PRO LISTING</span>
                  {post.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- PROFESSIONAL BOTTOM NAV --- */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#020617]/80 backdrop-blur-2xl border-t border-white/5 px-8 py-5 flex justify-around items-center z-50">
        <div className="flex flex-col items-center gap-1">
           <Heart className="w-6 h-6 text-orange-500" />
           <div className="w-1 h-1 bg-orange-500 rounded-full" />
        </div>
        <ShoppingCart className="w-6 h-6 text-gray-500" />
        
        {/* Floating Action Button */}
        <div 
          onClick={() => router.push('/post-item')}
          className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center -mt-12 border-4 border-[#020617] shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <PlusCircle className="w-8 h-8 text-white" />
        </div>
        
        <MessageCircle className="w-6 h-6 text-gray-500" />
        <div className="w-7 h-7 rounded-full bg-gray-700 border border-white/20" />
      </div>
    </div>
  );
}