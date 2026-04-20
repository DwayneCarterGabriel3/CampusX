"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { LogOut, PlusCircle, MessageSquare, Heart, Share2, User, Image as ImageIcon, X, Loader2, SendHorizontal } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string;
  created_at: string;
  content: string;
  image_url: string | null;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  likes: { user_id: string }[];
  comments: any[];
}

export default function Dashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [postText, setPostText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [commentInput, setCommentInput] = useState<{ [postId: string]: string }>({});
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({});

  useEffect(() => {
    fetchInitialData();
  }, [router]);

  const fetchInitialData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setUser(user);
    await fetchPosts(user.id);
    setLoading(false);
  };

  const fetchPosts = async (currentUserId: string) => {
    // Advanced Query: Fetches posts AND likes AND comments in one go
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        likes (user_id),
        comments (id, content, created_at, user_name, user_avatar)
      `)
      .order('created_at', { ascending: false });
    
    if (!error && data) setPosts(data);
  };

  const handlePublish = async () => {
    if (!postText && !imageFile) return;
    setUploading(true);

    try {
      let imageUrl = null;
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage.from('campus-media').upload(`posts/${fileName}`, imageFile);
        if (uploadError) throw uploadError;
        const { data } = supabase.storage.from('campus-media').getPublicUrl(`posts/${fileName}`);
        imageUrl = data.publicUrl;
      }

      // We pull your real-time metadata (name and avatar) when you post
      const { error: dbError } = await supabase.from('posts').insert([
        {
          content: postText,
          image_url: imageUrl,
          user_id: user.id,
          user_name: user.user_metadata?.full_name || "CampusX Student",
          user_avatar: user.user_metadata?.avatar_url || null
        }
      ]);

      if (dbError) throw dbError;

      setPostText("");
      setImageFile(null);
      setImagePreview(null);
      await fetchPosts(user.id);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  // LIKE FUNCTION (Facebook style)
  const handleLike = async (post: Post) => {
    if (!user) return;
    const isLiked = post.likes.some(like => like.user_id === user.id);

    if (isLiked) {
      // Unlike
      await supabase.from('likes').delete().match({ post_id: post.id, user_id: user.id });
    } else {
      // Like
      await supabase.from('likes').insert({ post_id: post.id, user_id: user.id });
    }
    await fetchPosts(user.id); // Refresh count
  };

  // COMMENT FUNCTION
  const handleAddComment = async (postId: string) => {
    const commentContent = commentInput[postId];
    if (!commentContent || !user) return;

    await supabase.from('comments').insert({
      post_id: postId,
      user_id: user.id,
      user_name: user.user_metadata?.full_name,
      user_avatar: user.user_metadata?.avatar_url,
      content: commentContent
    });

    setCommentInput({ ...commentInput, [postId]: "" });
    await fetchPosts(user.id);
  };

  // SHARE FUNCTION
  const handleShare = (postId: string) => {
    navigator.clipboard.writeText(`http://localhost:3000/post/${postId}`);
    alert("Post link copied! (Share implementation coming soon)");
  };

  if (loading) return <div className="min-h-screen bg-[#00101d] flex items-center justify-center"><Loader2 className="animate-spin text-[#FF8C00]" size={32} /></div>;

  return (
    <div className="min-h-screen bg-[#00101d] text-white font-sans">
      <nav className="border-b border-white/10 bg-[#001529]/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-[#FF8C00] text-[#001529] font-black px-3.5 py-1.5 rounded-2xl italic text-xl">X</div>
            <span className="font-black tracking-tighter text-2xl">CampusX</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Real Avatar displayed in navigation */}
            <Link href="/profile" className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-[#FF8C00] hover:scale-105 transition-transform overflow-hidden border-2 border-white/5 shadow-xl">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" />
              ) : <User size={24} />}
            </Link>
            <button onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} className="text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto p-6 pt-10">
        <div className="mb-12">
          <p className="text-[#FF8C00] text-xs font-black uppercase tracking-[0.4em] mb-1.5">Authenticated Member</p>
          <h2 className="text-4xl font-black italic tracking-tighter leading-tight">
            Welcome back, <br/>
            <span className="text-[#FF8C00] not-italic text-5xl">{user?.user_metadata?.full_name}</span>
          </h2>
        </div>

        {/* Post Creator Section */}
        <div className="bg-white/5 border border-white/10 p-7 rounded-[32px] mb-12 shadow-2xl backdrop-blur-sm">
          <div className="flex gap-4 mb-4">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-[#FF8C00] overflow-hidden flex-shrink-0">
              {user?.user_metadata?.avatar_url ? <img src={user.user_metadata.avatar_url} className="w-full h-full object-cover" /> : <User size={20}/>}
            </div>
            <textarea 
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's happening on campus?" 
              className="w-full bg-transparent border-none outline-none resize-none text-base h-28 placeholder:text-slate-600 mt-2"
            />
          </div>
          
          {imagePreview && (
            <div className="relative mb-4 rounded-2xl overflow-hidden border border-white/10 ml-16">
              <img src={imagePreview} alt="Preview" className="w-full h-auto max-h-80 object-cover" />
              <button onClick={() => {setImagePreview(null); setImageFile(null);}} className="absolute top-3 right-3 bg-black/50 p-1.5 rounded-full hover:bg-black">
                <X size={18} />
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mt-4 pt-5 border-t border-white/5 ml-16">
            <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={(e) => { if (e.target.files?.[0]) { setImageFile(e.target.files[0]); setImagePreview(URL.createObjectURL(e.target.files[0])); } }} />
            <button onClick={() => fileInputRef.current?.click()} className="text-slate-500 hover:text-[#FF8C00] transition-colors flex items-center gap-2 font-bold text-sm">
              <ImageIcon size={22}/> Photo
            </button>
            <button 
              onClick={handlePublish}
              disabled={uploading || (!postText && !imageFile)}
              className="bg-[#FF8C00] text-[#001529] px-10 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-[#FF8C00]/20 active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? <Loader2 className="animate-spin" size={16} /> : "Publish Post"}
            </button>
          </div>
        </div>

        {/* Dynamic Campus Feed */}
        <div className="space-y-8">
          {posts.map((post) => {
            const isLiked = post.likes?.some(like => like.user_id === user?.id);
            const commentsForPost = post.comments || [];

            return (
              <div key={post.id} className="bg-white/[0.02] border border-white/10 p-7 rounded-[32px] hover:border-white/20 transition-all duration-300 shadow-xl">
                {/* Post Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-[#FF8C00] overflow-hidden border border-white/5 flex-shrink-0">
                    {post.user_avatar ? <img src={post.user_avatar} className="w-full h-full object-cover" /> : <User size={22}/>}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{post.user_name}</h4>
                    <p className="text-xs text-slate-500 uppercase font-black tracking-wider">
                      {new Date(post.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                
                {post.content && <p className="text-base text-slate-100 leading-relaxed mb-5 ml-16">{post.content}</p>}
                
                {post.image_url && (
                  <div className="mb-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl ml-16">
                    <img src={post.image_url} className="w-full h-auto" alt="Campus Post" />
                  </div>
                )}

                {/* Facebook style action buttons */}
                <div className="flex gap-10 text-slate-500 pt-3 border-t border-white/5 ml-16">
                  <button onClick={() => handleLike(post)} className={`flex items-center gap-2.5 transition-all font-bold ${isLiked ? 'text-[#FF8C00] scale-105' : 'hover:text-[#FF8C00]'}`}>
                    <Heart size={20} fill={isLiked ? "#FF8C00" : "none"} strokeWidth={isLiked ? 1 : 2} /> <span className="text-sm">{post.likes?.length || 0}</span>
                  </button>
                  <button onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))} className="flex items-center gap-2.5 hover:text-[#FF8C00] transition-all font-bold">
                    <MessageSquare size={20}/> <span className="text-sm">{commentsForPost.length}</span>
                  </button>
                  <button onClick={() => handleShare(post.id)} className="flex items-center gap-2.5 hover:text-blue-500 transition-all font-bold ml-auto">
                    <Share2 size={20}/> <span className="text-sm">Share</span>
                  </button>
                </div>

                {/* Expanding Comment Section */}
                {expandedComments[post.id] && (
                  <div className="ml-16 mt-6 pt-6 border-t border-white/5 space-y-5">
                    {commentsForPost.map((comment) => (
                      <div key={comment.id} className="flex gap-3">
                        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-[#FF8C00] overflow-hidden flex-shrink-0 mt-1">
                          {comment.user_avatar ? <img src={comment.user_avatar} className="w-full h-full object-cover" /> : <User size={14}/>}
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none">
                          <p className="text-xs font-bold text-white mb-0.5">{comment.user_name}</p>
                          <p className="text-sm text-slate-300">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Comment Input */}
                    <div className="flex gap-3 pt-2">
                      <input 
                        value={commentInput[post.id] || ""}
                        onChange={(e) => setCommentInput({ ...commentInput, [post.id]: e.target.value })}
                        placeholder="Add a comment..." 
                        className="w-full bg-white/5 border border-white/10 p-3.5 px-5 rounded-full text-sm placeholder:text-slate-600 focus:border-[#FF8C00]/50 outline-none transition-colors"
                      />
                      <button onClick={() => handleAddComment(post.id)} className="text-slate-500 hover:text-[#FF8C00] flex-shrink-0 transition-colors">
                        <SendHorizontal size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}