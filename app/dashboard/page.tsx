"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; // Correct path: lib is inside app
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, Search, ShoppingBag, 
  Plus, Home, Users, Store, Bell, Menu, CheckCircle2, Flame, 
  Megaphone, UserPlus, Image as ImageIcon, Send, Clock, MapPin
} from "lucide-react";

export default function CampusXLive() {
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. REAL-TIME DATA FETCHING: No more demo posts
  useEffect(() => {
    fetchLiveFeed();
    
    // Subscribe to real-time updates so new posts appear instantly
    const channel = supabase.channel('realtime-posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, 
      (payload) => {
        setPosts((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  async function fetchLiveFeed() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setPosts(data || []);
    setLoading(false);
  }

  // 2. LIVE POSTING ENGINE: Just like Facebook
  async function handlePublish() {
    if (!newPost.trim()) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase.from('posts').insert([
      { 
        content: newPost, 
        user_id: user?.id, 
        user_name: "John Gabriel Ikechukwu", // In prod, pull from profile
        type: 'amebo' 
      }
    ]);

    if (!error) {
      setNewPost("");
      fetchLiveFeed();
    }
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white pb-20 font-sans">
      
      {/* --- ELITE NAV BAR --- */}
      <nav className="sticky top-0 z-50 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-white/5 px-4 flex justify-between items-center h-[65px]">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 w-10 h-10 rounded-xl flex items-center justify-center font-black italic shadow-lg shadow-orange-500/20">X</div>
          <div className="flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-full gap-2 focus-within:border-orange-500 transition-all">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search campus..." className="bg-transparent outline-none text-sm w-32 md:w-64 text-white" />
          </div>
        </div>

        <div className="hidden md:flex gap-12 items-center h-full">
          <Home className="w-6 h-6 text-orange-500 cursor-pointer" />
          <Store onClick={() => router.push('/marketplace')} className="w-6 h-6 text-gray-500 hover:text-white transition-all cursor-pointer" />
          <Users onClick={() => router.push('/groups')} className="w-6 h-6 text-gray-500 hover:text-white transition-all cursor-pointer" />
        </div>

        <div className="flex gap-3 items-center">
          <div className="bg-white/5 p-2.5 rounded-full hover:bg-white/10 cursor-pointer relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-[#0a0f1d]"></span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-orange-500 p-0.5">
            <div className="w-full h-full rounded-full bg-gray-600 overflow-hidden">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="avatar" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-[1100px] mx-auto pt-6 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: CAMPUS STATS */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <Clock className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-bold">CSC 401: AI</p>
                  <p className="text-[11px] text-gray-500 uppercase">10:00 AM • Hall B</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-4">Live on Campus</h3>
            <div className="flex -space-x-2 mb-3">
              {[1,2,3,4].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050a14] bg-gray-700" />)}
            </div>
            <p className="text-xs text-gray-400 font-medium">84 students active now at LASU.</p>
          </div>
        </div>

        {/* MIDDLE: THE ENGINE */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* THE "POST LIKE FACEBOOK" SECTION */}
          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] shadow-xl">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                <Plus className="w-6 h-6 text-orange-500" />
              </div>
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's the gist on campus today?"
                className="bg-transparent flex-grow outline-none resize-none py-2 text-[15px]"
                rows={1}
              />
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
              <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors">
                <ImageIcon className="w-4 h-4 text-green-500" /> Add Photo
              </button>
              <button 
                onClick={handlePublish}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
              >
                Publish Post
              </button>
            </div>
          </div>

          {/* DYNAMIC VIBE FEED */}
          {loading ? (
            <div className="text-center py-20 opacity-20">Loading Campus Vibes...</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all">
                <div className="p-5 flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <div>
                      <p className="font-bold text-[14px] flex items-center gap-1">
                        {post.user_name} <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400 text-[#050a14]" />
                      </p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Just Now • {post.type}</p>
                    </div>
                  </div>
                  <MoreHorizontal className="text-gray-600" />
                </div>
                <div className="px-6 pb-6 text-[15px] leading-relaxed text-gray-200">
                  {post.content}
                </div>
                <div className="px-6 py-4 flex justify-around border-t border-white/5 bg-white/[0.02]">
                   <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-orange-500 transition-colors"><Heart className="w-4 h-4" /> Like</button>
                   <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-blue-400 transition-colors"><MessageCircle className="w-4 h-4" /> Gist</button>
                   <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-green-400 transition-colors"><Share2 className="w-4 h-4" /> Share</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT: TRENDING AMEBO */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
           <div className="bg-orange-500 p-6 rounded-[2.5rem] shadow-2xl shadow-orange-500/20">
              <Flame className="w-8 h-8 text-white mb-4 animate-bounce" />
              <h2 className="text-xl font-black italic leading-tight">HOTTEST<br/>AMEBO</h2>
              <p className="text-xs font-bold mt-2 opacity-80 uppercase tracking-widest">Trending in UNILAG</p>
           </div>
        </div>
      </main>

      {/* MOBILE NAV: DOCK STYLE */}
      <div className="md:hidden fixed bottom-6 inset-x-6 h-16 bg-[#0a0f1d]/80 backdrop-blur-xl border border-white/10 rounded-3xl flex justify-around items-center px-4 shadow-2xl z-50">
        <Home className="w-6 h-6 text-orange-500" />
        <Store onClick={() => router.push('/marketplace')} className="w-6 h-6 text-gray-500" />
        <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center -mt-10 shadow-lg shadow-orange-500/40">
           <Plus className="w-6 h-6 text-white" />
        </div>
        <Users onClick={() => router.push('/groups')} className="w-6 h-6 text-gray-500" />
        <div className="w-7 h-7 rounded-full bg-gray-700 border border-white/20" />
      </div>

    </div>
  );
}