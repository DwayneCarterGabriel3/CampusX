"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { User, Camera, ArrowLeft, Save, Loader2, BadgeCheck } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    bio: "",
    avatar_url: ""
  });

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      setProfile({
        full_name: user.user_metadata?.full_name || "",
        bio: user.user_metadata?.bio || "",
        avatar_url: user.user_metadata?.avatar_url || ""
      });
      setLoading(false);
    };
    getProfile();
  }, [router]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setSaving(true);
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('campus-media').upload(filePath, file);
    if (uploadError) { alert("Error uploading image"); setSaving(false); return; }

    const { data } = supabase.storage.from('campus-media').getPublicUrl(filePath);
    setProfile({ ...profile, avatar_url: data.publicUrl });
    setSaving(false);
  };

  const updateProfile = async () => {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: profile.full_name, bio: profile.bio, avatar_url: profile.avatar_url }
    });
    if (error) alert(error.message);
    else alert("Profile Updated Successfully!");
    setSaving(false);
  };

  if (loading) return <div className="min-h-screen bg-[#00101d] flex items-center justify-center"><Loader2 className="animate-spin text-[#FF8C00]" /></div>;

  return (
    <div className="min-h-screen bg-[#00101d] text-white p-6 font-sans">
      <div className="max-w-2xl mx-auto pt-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-[#FF8C00] mb-12 transition-colors">
          <ArrowLeft size={18} /> <span className="text-xs font-black uppercase tracking-[0.3em]">Back to Feed</span>
        </Link>

        {/* Professional Header Section */}
        <div className="flex items-center gap-8 mb-16 pb-12 border-b border-white/10">
          <div className="relative group cursor-pointer flex-shrink-0" onClick={() => fileInputRef.current?.click()}>
            <div className="w-36 h-36 rounded-full bg-slate-800 border-4 border-white/5 overflow-hidden flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300">
              {profile.avatar_url ? (
                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
              ) : <User size={56} className="text-slate-600" />}
            </div>
            <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={28} />
            </div>
            <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleAvatarUpload} />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black italic tracking-tighter text-white">Edit Profile</h1>
              <BadgeCheck className="text-[#FF8C00]" size={28} />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#FF8C00]">CampusX Founder Account</p>
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-10 bg-white/[0.02] p-10 rounded-[40px] border border-white/5 shadow-inner">
          <div>
            <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 block mb-3">Full Name</label>
            <input type="text" value={profile.full_name} onChange={(e) => setProfile({...profile, full_name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-base focus:border-[#FF8C00]/50 outline-none transition-colors" />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 block mb-3">About You (Bio)</label>
            <textarea value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} placeholder="Describe yourself (e.g., Computer Science Student at UNILAG, Founder of CampusX)..." className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-base h-40 focus:border-[#FF8C00]/50 outline-none transition-colors resize-none leading-relaxed" />
          </div>

          <button onClick={updateProfile} disabled={saving} className="w-full bg-[#FF8C00] text-[#001529] py-5 rounded-full font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-[#FF8C00]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70">
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={20} />}
            {saving ? "Saving Changes..." : "Save Professional Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}