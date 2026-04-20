"use client";

import { useState } from "react";
// This path goes up two levels to find your lib folder
import { supabase } from "../../lib/supabase"; 
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
      } else {
        // Forces navigation to the dashboard
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      alert("Check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#001f3f] text-white p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg text-gray-900">
        <h1 className="text-2xl font-bold text-center mb-6">WELCOME BACK</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">UNIVERSITY EMAIL</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-1">PASSWORD</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#001f3f] text-white font-bold rounded-lg"
          >
            {loading ? "LOGGING IN..." : "LOG INTO CAMPUS"}
          </button>
        </form>
      </div>
      <p className="mt-8 text-[10px] opacity-50">DEVELOPED BY JOHN GABRIEL IKECHUKWU</p>
    </div>
  );
}