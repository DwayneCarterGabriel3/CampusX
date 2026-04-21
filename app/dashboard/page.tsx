"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase"; 
import { 
  Heart, MessageCircle, Share2, MoreHorizontal, Search, 
  Plus, Home, Users, Store, Bell, CheckCircle2, Flame, 
  Image as ImageIcon, Clock, X 
} from "lucide-react";

export default function CampusXLive() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null); 
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const locations = ["Your Campus", "LASU", "UNILAG", "LASUED"];
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % locations.length);
    }, 3000);

    fetchLiveFeed();
    
    const channel = supabase.channel('realtime-posts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'posts' }, 
      (payload) => {
        setPosts((prev) => [payload.new, ...prev]);
      })
      .subscribe();

    return () => { 
      clearInterval(sliderTimer);
      supabase.removeChannel(channel); 
    };
  }, []);

  async function fetchLiveFeed() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setPosts(data || []);
    setLoading(false);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setSelectedImage(URL.createObjectURL(file)); 
    }
  };

  async function uploadImage() {
    if (!imageFile) return null;
    setUploadingImage(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please log in.");

      const filename = `${user.id}/${Date.now()}-${imageFile.name}`;

      const { data, error } = await supabase.storage
        .from('post_images')
        .upload(filename, imageFile);

      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage
        .from('post_images')
        .getPublicUrl(data.path);

      return publicUrl;
    } catch (error: any) {
      console.error("Upload error:", error.message);
      return null;
    } finally {
      setUploadingImage(false);
    }
  }

  async function handlePublish() {
    if (!newPost.trim() && !imageFile) return;
    
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await uploadImage();
      if (!imageUrl) return; 
    }

    const { data: { user } } = await supabase.auth.getUser();
    
    const { error } = await supabase.from('posts').insert([
      { 
        content: newPost, 
        user_id: user?.id, 
        user_name: "John Gabriel Ikechukwu", 
        image_url: imageUrl,
        type: 'amebo' 
      }
    ]);

    if (!error) {
      setNewPost("");
      setSelectedImage(null);
      setImageFile(null);
      fetchLiveFeed();
    } else {
      alert("Failed to publish post.");
    }
  }

  return (
    <div className="min-h-screen bg-[#050a14] text-white pb-20 font-sans relative">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />

      <nav className="sticky top-0 z-50 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-white/5 px-4 flex justify-between items-center h-[65px]">
        <div className="flex items-center gap-3">
          <div onClick={() => router.push('/dashboard')} className="bg-gradient-to-br from-orange-500 to-red-600 w-10 h-10 rounded-xl flex items-center justify-center font-black italic cursor-pointer">X</div>
          <div className="flex items-center bg-white/5 border border-white/10 px-4 py-2 rounded-full gap-2">
            <Search className="w-4 h-4 text-gray-500" />
            <input type="text" placeholder="Search campus..." className="bg-transparent outline-none text-sm w-32 md:w-64 text-white" />
          </div>
        </div>
        <div className="hidden md:flex gap-12 items-center h-full">
          <Home onClick={() => router.push('/dashboard')} className="w-6 h-6 text-orange-500 cursor-pointer" />
          <Store onClick={() => router.push('/marketplace')} className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
          <Users onClick={() => router.push('/groups')} className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full border-2 border-orange-500 p-0.5">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="avatar" className="rounded-full" />
          </div>
        </div>
      </nav>

      <main className="max-w-[1100px] mx-auto pt-6 px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem]">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500 mb-4">Today's Schedule</h3>
            <div className="flex gap-3 items-start">
              <Clock className="w-4 h-4 text-gray-500 mt-1" />
              <div>
                <p className="text-sm font-bold">CSC 401: AI</p>
                <p className="text-[11px] text-gray-500 uppercase">10:00 AM • Hall B</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem]">
            <div className="flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                <Plus className="w-6 h-6 text-orange-500" />
              </div>
              <textarea 
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's the gist on campus today?"
                className="bg-transparent flex-grow outline-none resize-none py-2 text-[15px]"
                rows={2}
              />
            </div>

            {selectedImage && (
              <div className="mt-4 p-2 bg-white/5 border border-white/10 rounded-2xl relative">
                <img src={selectedImage} alt="Selected" className="w-full h-auto rounded-xl aspect-[16/9] object-cover" />
                <button onClick={() => {setSelectedImage(null); setImageFile(null);}} className="absolute top-4 right-4 bg-black/50 p-1.5 rounded-full">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            )}

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/5">
              <button 
                onClick={() => fileInputRef.current?.click()} 
                className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white"
              >
                <ImageIcon className="w-4 h-4 text-green-500" /> Add Photo
              </button>
              <button 
                onClick={handlePublish}
                disabled={uploadingImage}
                className={`bg-orange-500 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${uploadingImage ? 'opacity-50' : ''}`}
              >
                {uploadingImage ? 'Publishing...' : 'Publish Post'}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 opacity-20">Loading Campus Vibes...</div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden mb-6">
                <div className="p-5 flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <div>
                      <p className="font-bold text-[14px]">{post.user_name}</p>
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                        {new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {post.type}
                      </p>
                    </div>
                  </div>
                </div>
                
                {post.image_url && (
                  <div className="px-6 pb-4">
                    <img src={post.image_url} alt="Post image" className="w-full h-auto rounded-xl aspect-[16/9] object-cover" />
                  </div>
                )}

                <div className="px-6 pb-6 text-[15px] text-gray-200">
                  {post.content}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="hidden lg:block lg:col-span-3">
            <div className="bg-orange-500 p-6 rounded-[2.5rem]">
              <Flame className="w-8 h-8 text-white mb-4" />
              <h2 className="text-xl font-black italic uppercase leading-tight">HOTTEST<br/>AMEBO</h2>
              <p className="text-xs font-bold mt-2 opacity-80 uppercase tracking-widest">
                Trending in {locations[currentIndex]}
              </p>
            </div>
        </div>
      </main>
    </div>
  );
}