"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase"; // Verified your path
import { useRouter } from "next/navigation";

// Dummy Data to make the market look busy immediately
const DUMMY_ITEMS = [
  { id: 1, title: "iPhone 13 Pro - Neat", price: "₦450,000", category: "Electronics", location: "UNILAG", image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=500&auto=format&fit=crop" },
  { id: 2, title: "Mechanical Engineering Textbook", price: "₦5,000", category: "Books", location: "UNIBEN", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=500&auto=format&fit=crop" },
  { id: 3, title: "Executive Hostel Bed Space", price: "₦120,000", category: "Housing", location: "UNN", image: "https://images.unsplash.com/photo-1555854817-5b2247a8175f?q=80&w=500&auto=format&fit=crop" },
  { id: 4, title: "HP Laptop Charger", price: "₦8,500", category: "Accessories", location: "LASU", image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=500&auto=format&fit=crop" },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* --- TOP NAVIGATION --- */}
      <nav className="bg-[#001f3f] text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black tracking-tighter italic">CAMPUS<span className="text-orange-500">X</span></h1>
          <button 
            onClick={() => router.push('/login')} 
            className="text-xs bg-white/10 px-3 py-1 rounded-full border border-white/20"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-4">
        {/* --- SEARCH & FILTERS --- */}
        <div className="mt-4 mb-8">
          <input 
            type="text" 
            placeholder="Search for books, laptops, hostels..."
            className="w-full p-4 rounded-2xl border-none shadow-sm focus:ring-2 focus:ring-orange-500 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
            {["All", "Electronics", "Books", "Housing", "Fashion"].map((cat) => (
              <button key={cat} className="bg-white px-4 py-2 rounded-full text-xs font-bold shadow-sm whitespace-nowrap hover:bg-orange-500 hover:text-white transition-colors">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- MARKETPLACE GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {DUMMY_ITEMS.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
              <div className="relative h-40 w-full bg-gray-200">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
                  {item.price}
                </span>
              </div>
              
              <div className="p-3 flex-grow">
                <p className="text-[10px] text-gray-400 font-bold uppercase">{item.category} • {item.location}</p>
                <h3 className="text-sm font-bold leading-tight mt-1 mb-3 line-clamp-2">{item.title}</h3>
                
                <button className="w-full py-2 bg-[#001f3f] text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-colors">
                  VIEW DETAILS
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- FLOATING ACTION BUTTON --- */}
      <button 
        className="fixed bottom-6 right-6 bg-orange-500 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-2xl font-bold hover:scale-110 transition-transform"
        onClick={() => alert("Post Item feature coming next!")}
      >
        +
      </button>
    </div>
  );
}