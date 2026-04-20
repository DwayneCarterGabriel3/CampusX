"use client";
import React, { useState } from 'react';
import { User, Mail, Lock, BookOpen, GraduationCap, Clock, ChevronDown, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase'; // Updated path to find your folder
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", department: "", 
    level: "100L", studyType: "Full-time"
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
          department: formData.department,
          level: formData.level,
          study_type: formData.studyType
        }
      }
    });

    if (error) {
      alert("Registration Error: " + error.message);
      setLoading(false);
    } else {
      alert("Success! Check your email for verification.");
      router.push('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#001529] flex flex-col items-center justify-center p-6 text-white font-sans">
      <div className="w-full max-w-[400px]">
        <div className="text-center mb-10">
          <div className="inline-flex flex-col items-center justify-center w-20 h-20 bg-[#FF8C00] rounded-[24px] shadow-lg mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#001529] mb-[-4px]">Campus</span>
            <span className="text-4xl font-black italic text-[#001529]">X</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-1">Join CampusX</h1>
          <p className="text-[#FF8C00] text-[10px] font-bold uppercase tracking-[0.2em]">Connect with Nigerian Students</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white/[0.02] border border-white/10 p-8 rounded-[32px] backdrop-blur-xl">
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input required placeholder="Full Name" className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:border-[#FF8C00]/50 outline-none text-sm transition-all text-white" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input required type="email" placeholder="University Email" className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:border-[#FF8C00]/50 outline-none text-sm transition-all text-white" 
              onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>

          <div className="relative group">
            <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input required placeholder="Department" className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:border-[#FF8C00]/50 outline-none text-sm transition-all text-white" 
              onChange={(e) => setFormData({...formData, department: e.target.value})} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative group">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <select className="w-full bg-white/[0.03] border border-white/10 py-4 pl-11 pr-4 rounded-2xl appearance-none text-sm outline-none focus:border-[#FF8C00]/50 text-white cursor-pointer" 
                onChange={(e) => setFormData({...formData, level: e.target.value})}>
                {["100L", "200L", "300L", "400L", "500L", "Postgraduate"].map(lvl => (
                  <option key={lvl} value={lvl} className="bg-[#001529]">{lvl}</option>
                ))}
              </select>
            </div>
            <div className="relative group">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <select className="w-full bg-white/[0.03] border border-white/10 py-4 pl-11 pr-4 rounded-2xl appearance-none text-sm outline-none focus:border-[#FF8C00]/50 text-white cursor-pointer" 
                onChange={(e) => setFormData({...formData, studyType: e.target.value})}>
                <option value="Full-time" className="bg-[#001529]">Full-time</option>
                <option value="Part-time" className="bg-[#001529]">Part-time</option>
              </select>
            </div>
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input required type="password" placeholder="Create Password" className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:border-[#FF8C00]/50 outline-none text-sm transition-all text-white" 
              onChange={(e) => setFormData({...formData, password: e.target.value})} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#FF8C00] text-[#001529] py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg mt-4 flex items-center justify-center gap-2">
            {loading ? "Securing..." : <><ShieldCheck size={16} /> Create Account</>}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
          Joined already? <Link href="/login" className="text-[#FF8C00] ml-1">Sign In</Link>
        </p>
      </div>
    </div>
  );
}