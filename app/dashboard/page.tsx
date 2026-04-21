"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, ShoppingBag, Users, Bell, Search, 
  Plus, Image as ImageIcon, Clock, Flame, MoreHorizontal
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const router = useRouter();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
    const channel = supabase.channel('realtime-posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, 
      (payload) => setPosts(prev => [payload.new, ...prev]))
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
  }

  async function handlePublish() {
    if (!newPost.trim()) return;
    const { error } = await supabase.from('posts').insert([{ 
      content: newPost, 
      user_name: "John Gabriel Ikechukwu", 
      type: 'amebo' 
    }]);
    if (!error) setNewPost("");
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans selection:bg-orange-500/30">
      {/* HEADER: Slim & Sharp */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#050a14]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="bg-orange-500 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <span className="text-white font-black text-xl italic">X</span>
          </div>
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-64 group focus-within:border-orange-500/40 transition-all">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search campus..." className="bg-transparent border-none focus:ring-0 text-xs w-full ml-2 placeholder:text-gray-600" />
          </div>
        </div>

        <div className="flex items-center gap-12">
          <div className="flex items-center gap-8 text-gray-400">
            <Home className="w-5 h-5 text-orange-500 cursor-pointer" />
            <ShoppingBag onClick={() => router.push('/marketplace')} className="w-5 h-5 hover:text-white cursor-pointer transition-all" />
            <Users onClick={() => router.push('/groups')} className="w-5 h-5 hover:text-white cursor-pointer transition-all" />
          </div>
          <div className="flex items-center gap-5 border-l border-white/10 pl-8">
            <Bell className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            <img 
              onClick={() => router.push('/profile')}
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" 
              className="w-9 h-9 rounded-full border-2 border-orange-500 cursor-pointer hover:scale-105 transition-all" 
              alt="profile"
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-10">
        {/* LEFT COLUMN: Schedule/Mini-Profile */}
        <div className="col-span-3 space-y-6">
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-sm">
            <h3 className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-6 italic">Current Session</h3>
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="bg-orange-500/10 p-3 rounded-2xl group-hover:bg-orange-500/20 transition-all">
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <p className="font-black italic text-sm uppercase tracking-tight">CSC 401: AI</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase">10:00 AM • Hall B</p>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE COLUMN: The Gist Feed */}
        <div className="col-span-6 space-y-8">
          {/* Post Box: Now with Avatar */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-[2.5rem] shadow-xl shadow-black/20">
            <div className="flex gap-4">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" className="w-12 h-12 rounded-2xl" alt="me" />
              <div className="flex-1">
                <textarea 
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's the gist on campus today?"
                  className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium placeholder:text-gray-700 resize-none h-24"
                />
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-white font-bold text-[10px] uppercase tracking-widest transition-all">
                    <ImageIcon className="w-4 h-4 text-green-500" /> Photo / Video
                  </button>
                  <button 
                    onClick={handlePublish}
                    className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-xl font-black italic uppercase text-xs tracking-tighter shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
                  >
                    Post Gist
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feed Items */}
          <div className="space-y-6">
            {posts.length > 0 ? posts.map((post) => (
              <div key={post.id} className="bg-[#0a101f] border border-white/5 p-8 rounded-[2.5rem] hover:border-orange-500/20 transition-all group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_name}`} className="w-11 h-11 rounded-2xl border border-white/10" alt="user" />
                    <div>
                      <h4 className="font-black italic uppercase text-sm tracking-tight group-hover:text-orange-500 transition-colors">{post.user_name}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">LASU • 2m ago</p>
                    </div>
                  </div>
                  <MoreHorizontal className="text-gray-600 w-5 h-5" />
                </div>
                <p className="text-gray-300 leading-relaxed font-medium text-[15px]">{post.content}</p>
                <div className="mt-6 flex items-center gap-6 border-t border-white/5 pt-6">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-orange-500 cursor-pointer transition-all">
                     <Flame className="w-4 h-4" /> 24 Fire
                   </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
                <p className="text-gray-600 font-black italic uppercase tracking-widest">No gists yet. Start the amebo!</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Trends */}
        <div className="col-span-3">
          <div className="bg-orange-500 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-orange-500/20">
            <Flame className="absolute -right-6 -bottom-6 w-32 h-32 text-white/10 rotate-12 group-hover:rotate-0 transition-all duration-700" />
            <h3 className="text-4xl font-black italic uppercase leading-[0.9] mb-3 tracking-tighter relative z-10">Hottest<br/>Amebo</h3>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 italic relative z-10">Trending in LASU</p>
            
            <div className="mt-8 space-y-4 relative z-10">
               <div className="bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                 <p className="text-[10px] font-black uppercase text-white/60">#1 Trending</p>
                 <p className="font-bold text-sm italic">Post-UTME results are out! 😱</p>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}