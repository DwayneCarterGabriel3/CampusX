"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Home, ShoppingBag, Users, Search, Image as ImageIcon, Video, Flame, MoreHorizontal, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const router = useRouter();
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const campusGists = [
    { title: "WHAT'S HAPPENING IN LASUED?", color: "bg-green-600", detail: "New student union elections announced for Friday." },
    { title: "WHAT'S HAPPENING IN LASU?", color: "bg-orange-600", detail: "The Faculty of Science exam timetable is out." },
    { title: "WHAT'S HAPPENING IN UNILAG?", color: "bg-blue-700", detail: "Akoka gate is temporarily closed for repairs." }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % campusGists.length), 4000);
    fetchPosts();
    const channel = supabase.channel('realtime-posts').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, 
      (payload) => setPosts(prev => [payload.new, ...prev])).subscribe();
    return () => { clearInterval(timer); supabase.removeChannel(channel); };
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
  }

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setMediaFile(e.target.files[0]);
  };

  async function handlePublish() {
    if (!newPost.trim() && !mediaFile) return;
    let mediaUrl = "";
    if (mediaFile) {
      const fileName = `${Date.now()}-${mediaFile.name}`;
      const { data } = await supabase.storage.from('post-media').upload(fileName, mediaFile);
      if (data) {
        const { data: { publicUrl } } = supabase.storage.from('post-media').getPublicUrl(fileName);
        mediaUrl = publicUrl;
      }
    }
    const { error } = await supabase.from('posts').insert([{ 
      content: newPost, user_name: "John Gabriel Ikechukwu", image_url: mediaUrl, type: 'amebo' 
    }]);
    if (!error) { setNewPost(""); setMediaFile(null); }
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white">
      <nav className="flex items-center justify-between px-8 py-4 border-b border-white/5 sticky top-0 bg-[#050a14] z-50">
        <div className="flex items-center gap-6">
          <div className="bg-orange-500 w-10 h-10 rounded-xl flex items-center justify-center font-black italic">X</div>
          <div className="flex items-center bg-white/5 rounded-2xl px-4 py-2 border border-white/10"><Search className="w-4 h-4 text-gray-500" /><input type="text" placeholder="Search campus..." className="bg-transparent border-none focus:ring-0 text-xs ml-2" /></div>
        </div>
        <div className="flex items-center gap-10">
          <Home className="w-5 h-5 text-orange-500 cursor-pointer" /><ShoppingBag onClick={() => router.push('/marketplace')} className="w-5 h-5 cursor-pointer text-gray-400" /><Users onClick={() => router.push('/groups')} className="w-5 h-5 cursor-pointer text-gray-400" /><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" className="w-9 h-9 rounded-full border-2 border-orange-500" />
        </div>
      </nav>
      <main className="max-w-6xl mx-auto p-10 grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-10">
          <div className="h-[200px] rounded-[2.5rem] overflow-hidden relative shadow-2xl">
            {campusGists.map((gist, index) => (
              <div key={index} className={`absolute inset-0 p-10 transition-all duration-1000 ${gist.color} ${index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
                <h2 className="text-3xl font-black italic uppercase leading-none mb-2">{gist.title}</h2>
                <p className="text-sm font-bold opacity-80">{gist.detail}</p>
                <div className="flex gap-2 mt-6">{campusGists.map((_, i) => (<div key={i} className={`h-1.5 rounded-full transition-all ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/30'}`} />))}</div>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[3rem]">
            <div className="flex gap-4">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" className="w-12 h-12 rounded-2xl" />
              <div className="flex-1">
                <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} placeholder="What's the gist on campus today?" className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium h-20 resize-none" />
                <input type="file" ref={fileInputRef} className="hidden" onChange={onFileSelect} accept="image/*,video/*" />
                {mediaFile && <p className="text-xs text-orange-500 font-bold mb-4 italic">📎 {mediaFile.name} selected</p>}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex gap-6">
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-white"><ImageIcon className="w-4 h-4 text-green-500" /> Add Photo</button>
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-white"><Video className="w-4 h-4 text-blue-500" /> Add Video</button>
                  </div>
                  <button onClick={handlePublish} className="bg-orange-500 px-8 py-3 rounded-2xl font-black italic uppercase text-xs">Publish Post</button>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem]">
                <h4 className="font-black italic uppercase text-orange-500 text-sm mb-4">{post.user_name}</h4>
                <p className="text-gray-300 leading-relaxed mb-6">{post.content}</p>
                {post.image_url && (
                  <div className="rounded-[1.5rem] overflow-hidden border border-white/5">
                    {post.image_url.includes('.mp4') ? <video src={post.image_url} controls className="w-full" /> : <img src={post.image_url} className="w-full object-cover" />}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}