"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, ShoppingBag, Users, Bell, Search, 
  Plus, Image as ImageIcon, Send, Clock, Flame 
} from 'lucide-react';

// EXACT IMPORT for your app/lib/supabase.ts file
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const router = useRouter();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    
    const channel = supabase
      .channel('realtime-posts')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'posts' }, 
        (payload: any) => {
          setPosts(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setPosts(data);
    setLoading(false);
  }

  async function handlePublish() {
    if (!newPost.trim()) return;

    try {
      // 1. Get current user if logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      // 2. Try the insert
      const { error } = await supabase.from('posts').insert([
        { 
          content: newPost, 
          user_name: "John Gabriel Ikechukwu",
          user_id: session?.user?.id || null, // Fallback if no session
          type: 'amebo' 
        }
      ]);

      if (error) {
        // This will tell us if it's an RLS issue or something else
        alert(`Supabase Error: ${error.message}`);
      } else {
        setNewPost("");
        console.log("Post published successfully!");
      }
    } catch (err) {
      alert("Check your internet connection or Supabase URL in lib/supabase.ts");
    }
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#050a14] sticky top-0 z-50 border-b border-white/5">
        <div className="flex items-center gap-8">
          <div className="bg-orange-500 p-2 rounded-xl">
            <span className="text-white font-black text-xl">X</span>
          </div>
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2 w-80">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search campus..." className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2" />
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="flex items-center gap-8 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
            <Home onClick={() => router.push('/dashboard')} className="w-5 h-5 text-orange-500 cursor-pointer" />
            <ShoppingBag onClick={() => router.push('/marketplace')} className="w-5 h-5 hover:text-white cursor-pointer transition-all" />
            <Users onClick={() => router.push('/groups')} className="w-5 h-5 hover:text-white cursor-pointer transition-all" />
          </div>
          <div className="flex items-center gap-6">
            <Bell className="w-5 h-5 text-gray-400" />
            <div onClick={() => router.push('/profile')} className="w-10 h-10 rounded-full border-2 border-orange-500 p-0.5 cursor-pointer">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="avatar" className="rounded-full bg-[#1a1f2e]" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-8 grid grid-cols-12 gap-8">
        {/* Post Creation Box */}
        <div className="col-span-12 md:col-span-8 space-y-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem]">
            <textarea 
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's the gist on campus today?"
              className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium resize-none h-24"
            />
            <div className="flex justify-end mt-4">
              <button 
                onClick={handlePublish}
                className="bg-orange-500 hover:bg-orange-600 px-10 py-3 rounded-2xl font-black italic uppercase text-sm transition-all"
              >
                Publish Post
              </button>
            </div>
          </div>

          {/* Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                <h4 className="font-black italic uppercase text-orange-500 mb-2">{post.user_name}</h4>
                <p className="text-gray-300 leading-relaxed">{post.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden md:block col-span-4">
          <div className="bg-orange-500 p-8 rounded-[2.5rem] relative overflow-hidden">
            <h3 className="text-4xl font-black italic uppercase leading-none mb-2">Hottest Amebo</h3>
            <p className="text-[10px] font-black uppercase opacity-70">Trending in LASU</p>
          </div>
        </div>
      </main>
    </div>
  );
}