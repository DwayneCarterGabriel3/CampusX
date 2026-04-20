"use client";
import { Search, TrendingUp, Clock, User, Bookmark, Grid, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] pb-24">
      <div className="p-6 bg-white border-b sticky top-0 z-50">
        <div className="relative max-w-[500px] mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            placeholder="Search for students or gists..."
            className="w-full bg-gray-100 py-4 pl-12 pr-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF8C00] font-medium"
          />
        </div>
      </div>

      <main className="max-w-[500px] mx-auto p-6 space-y-8">
        <div>
          <h2 className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 tracking-widest mb-4">
            <TrendingUp size={16} className="text-[#FF8C00]"/> Trending Gists
          </h2>
          <div className="space-y-3">
            {["#LASUExams", "#ComputerScience", "#CampusLife", "#TechTrends"].map((tag, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border flex justify-between items-center shadow-sm">
                <span className="font-black text-[#001f3f]">{tag}</span>
                <span className="text-[10px] font-bold text-gray-400">2.4k Gists</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Reusable Nav Component */}
      <div className="fixed bottom-6 inset-x-4 max-w-[400px] mx-auto bg-[#001f3f] p-3 rounded-full flex justify-around items-center z-50 shadow-2xl">
        <Link href="/dashboard"><Clock className="text-gray-400 w-5 h-5" /></Link>
        <Link href="/search"><Grid className="text-[#FF8C00] w-5 h-5" /></Link>
        <div className="w-11 h-11 bg-[#FF8C00] rounded-full flex items-center justify-center text-white"><Search className="w-5 h-5" /></div>
        <Link href="/messages"><MessageSquare className="text-gray-400 w-5 h-5" /></Link>
        <Link href="/profile"><User className="text-gray-400 w-5 h-5" /></Link>
      </div>
    </div>
  );
}