"use client";
import { useState, useEffect } from 'react';
import { Search, Clock, Grid, MessageSquare, User, PlusCircle, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function MessagesPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const chats = [
    { id: 1, name: "Blessing Okon", message: "Oga, did you see the CS assignment?", time: "2m ago", unread: true },
    { id: 2, name: "CampusX Admin", message: "Welcome to the community!", time: "1h ago", unread: false },
    { id: 3, name: "Tunde (300L)", message: "The link is not working sef.", time: "4h ago", unread: false },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24 text-black">
      <div className="p-6 bg-[#001f3f] text-white sticky top-0 z-50">
        <h1 className="text-2xl font-black italic mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            placeholder="Search chats..."
            className="w-full bg-white/10 py-3 pl-10 pr-4 rounded-xl focus:outline-none text-sm border border-white/10"
          />
        </div>
      </div>

      <main className="max-w-[500px] mx-auto p-2">
        <div className="space-y-1">
          {chats.map((chat) => (
            <div key={chat.id} className="bg-white p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-none">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FF8C00]/20 flex items-center justify-center font-black text-[#FF8C00]">
                  {chat.name[0]}
                </div>
                <div>
                  <h4 className="font-bold text-sm">{chat.name}</h4>
                  <p className={`text-xs truncate w-48 ${chat.unread ? 'text-black font-black' : 'text-gray-400'}`}>
                    {chat.message}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-400 font-bold mb-1">{chat.time}</p>
                {chat.unread && <div className="w-2 h-2 bg-[#FF8C00] rounded-full ml-auto" />}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Persistent Nav */}
      <div className="fixed bottom-6 inset-x-4 max-w-[420px] mx-auto bg-[#001f3f] p-3 rounded-full flex justify-around items-center z-50 shadow-2xl">
        <Link href="/dashboard"><Clock className="text-gray-400 w-5 h-5" /></Link>
        <Link href="/search"><Grid className="text-gray-400 w-5 h-5" /></Link>
        <div className="w-11 h-11 bg-[#FF8C00] rounded-full flex items-center justify-center text-white"><PlusCircle className="w-6 h-6" /></div>
        <Link href="/messages"><MessageSquare className="text-[#FF8C00] w-5 h-5" /></Link>
        <Link href="/profile"><User className="text-gray-400 w-5 h-5" /></Link>
      </div>
    </div>
  );
}