"use client";
import { useState, useEffect } from 'react';
import { ChevronLeft, User, Bell, Lock, Shield, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = () => {
    // Basic logout logic: Clear local storage or session
    localStorage.removeItem("campusx_posts");
    router.push('/login'); 
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-black">
      <div className="p-6 flex items-center gap-4 bg-white border-b sticky top-0 z-50">
        <Link href="/profile" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-black italic">Settings</h1>
      </div>

      <div className="max-w-[500px] mx-auto p-4 space-y-6">
        <section className="bg-white rounded-3xl overflow-hidden shadow-sm border">
          <div className="p-4 border-b bg-gray-50/50">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Account</p>
          </div>
          {[
            { icon: <User size={20}/>, label: "Edit Profile" },
            { icon: <Bell size={20}/>, label: "Notifications" },
            { icon: <Lock size={20}/>, label: "Privacy & Security" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-5 hover:bg-gray-50 cursor-pointer border-b last:border-none">
              <div className="flex items-center gap-4">
                <div className="text-[#001f3f]">{item.icon}</div>
                <span className="font-bold text-sm">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          ))}
        </section>

        <button 
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 p-5 rounded-3xl flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest hover:bg-red-100 transition-colors"
        >
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );
}