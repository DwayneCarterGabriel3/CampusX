"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Home, ShoppingBag, Users, Bell, Search, 
  Plus, Image as ImageIcon, Video, Flame, 
  MoreHorizontal, MessageSquare
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const router = useRouter();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const campusGists = [
    { title: "What's happening in your campus?", color: "bg-orange-500", detail: "Freshers fair starts tomorrow at the main bowl!" },
    { title: "What's happening in LASU?", color: "bg-blue-600", detail: "The Faculty of Science exam timetable is out." },
    { title: "What's happening in UNILAG?", color: "bg-red-600", detail: "Akoka gate is temporarily closed for repairs." },
    { title: "What's happening in LASUED?", color: "bg-green-600", detail: "New student union elections announced for Friday." }
  ];

  // Auto-slide logic: Changes every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % campusGists.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-[#050a14] text-white font-sans">
      {/* HEADER */}
      <nav className="flex items-center justify-between px-8 py-4 bg-[#050a14] border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="bg-orange-500 w-10 h-10 rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-xl italic">X</span>
          </div>
          <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2 w-72">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search campus..." className="bg-transparent border-none focus:ring-0 text-xs w-full ml-2" />
          </div>
        </div>
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-8 text-gray-400">
            <Home className="w-5 h-5 text-orange-500 cursor-pointer" />
            <ShoppingBag onClick={() => router.push('/marketplace')} className="w-5 h-5 hover:text-white cursor-pointer" />
            <Users onClick={() => router.push('/groups')} className="w-5 h-5 hover:text-white cursor-pointer" />
          </div>
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" className="w-10 h-10 rounded-full border-2 border-orange-500" alt="profile" />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-8">
          
          {/* THE CAMPUS SLIDER: This is what you requested */}
          <div className="relative h-[220px] w-full overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/50">
            {campusGists.map((gist, index) => (
              <div 
                key={index}
                className={`absolute inset-0 p-10 transition-all duration-1000 ease-in-out flex flex-col justify-center ${gist.color} ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
              >
                <Flame className="absolute -right-8 -bottom-8 w-48 h-48 text-white/10 rotate-12" />
                <p className="text-[10px] font-black uppercase text-white/60 tracking-[0.3em] mb-2 italic">Hottest Amebo</p>
                <h2 className="text-4xl font-black italic uppercase leading-[0.9] mb-4 tracking-tighter">{gist.title}</h2>
                <p className="text-sm font-bold opacity-90 max-w-md">{gist.detail}</p>
                
                {/* Dot Indicators */}
                <div className="flex gap-2 mt-6">
                  {campusGists.map((_, dotIndex) => (
                    <div key={dotIndex} className={`h-1.5 rounded-full transition-all duration-500 ${dotIndex === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* POST INPUT with Photo/Video Button */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-[3rem]">
            <div className="flex gap-4">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" className="w-12 h-12 rounded-2xl" alt="user" />
              <div className="flex-1">
                <textarea 
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's the gist on campus today?"
                  className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium resize-none h-20"
                />
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
                      <ImageIcon className="w-5 h-5 text-green-500" /> Add Photo
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
                      <Video className="w-5 h-5 text-blue-500" /> Add Video
                    </button>
                  </div>
                  <button 
                    onClick={handlePublish}
                    className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-2xl font-black italic uppercase text-xs shadow-lg shadow-orange-500/20"
                  >
                    Publish Post
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC FEED */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-[#0a101f] border border-white/5 p-8 rounded-[2.5rem] group">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user_name}`} className="w-11 h-11 rounded-2xl" alt="avatar" />
                    <div>
                      <h4 className="font-black italic uppercase text-sm group-hover:text-orange-500 transition-colors">{post.user_name}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">LASU • Just Now</p>
                    </div>
                  </div>
                  <MoreHorizontal className="text-gray-600 cursor-pointer" />
                </div>
                <p className="text-gray-300 leading-relaxed font-medium">{post.content}</p>
                <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/5">
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-orange-500 cursor-pointer transition-all">
                     <Flame className="w-4 h-4" /> 12 Fire
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-white cursor-pointer transition-all">
                     <MessageSquare className="w-4 h-4" /> 2 Comments
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SIDEBAR: Online Students */}
        <div className="col-span-4">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] sticky top-28">
            <h3 className="text-[10px] font-black uppercase text-orange-500 tracking-[0.2em] mb-6 italic">Who's Online</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(user => (
                <div key={user} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 rounded-2xl transition-all">
                  <div className="relative">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user}`} className="w-10 h-10 rounded-xl" alt="user" />
                    <div className="absolute -right-1 -bottom-1 w-3 h-3 bg-green-500 border-2 border-[#050a14] rounded-full" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-tight">Active Student {user}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}