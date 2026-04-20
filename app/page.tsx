import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#003366] text-white p-6 font-sans">
      {/* Hero Section */}
      <div className="text-center mb-10">
        <h1 className="text-7xl font-black tracking-tighter text-[#FF8C00] drop-shadow-lg">
          Campus<span className="text-white">X</span>
        </h1>
        <p className="mt-3 text-lg font-bold tracking-wide opacity-95 text-center max-w-sm">
          Connecting Nigerian Students Across Every Faculty.
        </p>
      </div>

      {/* Login Card */}
      <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] w-full max-w-md border-b-8 border-[#FF8C00]">
        <h2 className="text-2xl font-black mb-2 text-center text-[#003366] uppercase tracking-tight">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8 text-sm font-semibold italic tracking-wide">Access your campus feed...</p>
        
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase text-gray-400 mb-1 ml-1 tracking-[0.15em]">University or Personal Email</label>
            <input 
              type="email" 
              placeholder="e.g. name@example.com" 
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-[#FF8C00] focus:bg-white outline-none transition-all text-lg font-medium"
            />
          </div>
          
          <button className="w-full bg-[#003366] text-white font-black py-4 rounded-2xl hover:bg-black transition-all shadow-lg text-lg uppercase tracking-widest active:scale-95">
            LOG INTO CAMPUS
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 font-bold">
            New to the network? <Link href="/register" className="text-[#FF8C00] cursor-pointer hover:underline">Create an Account</Link>
          </p>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.25em]">
            Developed by John Gabriel Ikechukwu
          </p>
        </div>
      </div>

      {/* Footer Vibe Tags */}
      <div className="mt-12 flex gap-4 opacity-40 text-[10px] font-black uppercase tracking-[0.3em]">
        <span>Full-Time</span>
        <span>•</span>
        <span>Part-Time</span>
      </div>
    </div>
  );
}