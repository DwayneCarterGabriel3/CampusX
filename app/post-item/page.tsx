"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function PostItem() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Electronics");
  const [description, setDescription] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Get the current logged-in user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      alert("Please log in first!");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("marketplace_items").insert([
      {
        title,
        price: `₦${price}`,
        category,
        description,
        whatsapp_link: `https://wa.me/${whatsapp}`,
        user_id: user.id,
        campus: "Lagos State University", // We can make this dynamic later
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Item posted successfully!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#001f3f] text-white p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2">SELL ON CAMPUS</h1>
        <p className="text-gray-400 text-sm mb-8">Turn your used items into cash instantly.</p>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4">
            <div>
              <label className="text-[10px] font-bold text-orange-500 uppercase">Item Name</label>
              <input 
                type="text" placeholder="e.g. iPhone 12, Calculus Textbook"
                className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-orange-500"
                value={title} onChange={(e) => setTitle(e.target.value)} required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-orange-500 uppercase">Price (₦)</label>
                <input 
                  type="number" placeholder="5000"
                  className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-orange-500"
                  value={price} onChange={(e) => setPrice(e.target.value)} required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-orange-500 uppercase">Category</label>
                <select 
                  className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-orange-500"
                  value={category} onChange={(e) => setCategory(e.target.value)}
                >
                  <option className="text-black" value="Electronics">Electronics</option>
                  <option className="text-black" value="Books">Books</option>
                  <option className="text-black" value="Fashion">Fashion</option>
                  <option className="text-black" value="Housing">Housing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-orange-500 uppercase">WhatsApp Number</label>
              <input 
                type="text" placeholder="e.g. 08123456789"
                className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-orange-500"
                value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} required
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-orange-500 uppercase">Description</label>
              <textarea 
                placeholder="Tell us about the condition..."
                className="w-full bg-transparent border-b border-white/20 py-2 outline-none focus:border-orange-500 h-20 resize-none"
                value={description} onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-orange-500 py-4 rounded-2xl font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg"
          >
            {loading ? "PUBLISHING..." : "POST TO MARKETPLACE"}
          </button>
        </form>
      </div>
    </div>
  );
}