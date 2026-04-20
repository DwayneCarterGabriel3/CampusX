"use client";
import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase'; // Updated path
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3000/dashboard`,
      },
    });
    if (error) alert(error.message);
  };

  // Add this button to your JSX
  <button 
    onClick={handleGoogleLogin}
    className="w-full mt-4 bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-100 transition-all border border-slate-200"
  >
    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
    Continue with Google
  </button>

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login Error: " + error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
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
          <h1 className="text-3xl font-black tracking-tight mb-1">Welcome Back</h1>
          <p className="text-[#FF8C00] text-[10px] font-bold uppercase tracking-[0.2em]">Sign in to CampusX</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 bg-white/[0.02] border border-white/10 p-8 rounded-[32px] backdrop-blur-xl shadow-2xl">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input required type="email" placeholder="Email Address" className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:border-[#FF8C00]/50 outline-none text-sm transition-all text-white"
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
            <input required type="password" placeholder="Password" className="w-full bg-white/[0.03] border border-white/10 py-4 pl-12 pr-4 rounded-2xl focus:border-[#FF8C00]/50 outline-none text-sm transition-all text-white"
              onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#FF8C00] text-[#001529] py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg mt-2 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
            {loading ? "Verifying..." : <><ShieldCheck size={16} /> Sign In</>}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
          New here? <Link href="/register" className="text-[#FF8C00] ml-1">Create Account</Link>
        </p>
      </div>
    </div>
  );
}