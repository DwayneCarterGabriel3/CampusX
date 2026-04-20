import Link from 'next/link';

export default function Verify() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#003366] text-white p-6 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-black tracking-tighter text-[#FF8C00]">
          Campus<span className="text-white">X</span>
        </h1>
      </div>

      <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl w-full max-w-md border-t-8 border-[#FF8C00]">
        <h2 className="text-2xl font-black mb-2 text-[#003366] text-center uppercase">Verify Your Identity</h2>
        <p className="text-gray-500 text-center mb-8 text-sm font-medium">
          (Development Mode) Enter any 6 digits to continue.
        </p>
        
        <div className="flex justify-between gap-2 mb-8">
          {[1, 2, 3, 4, 5, 6].map((digit) => (
            <input 
              key={digit}
              type="text" 
              maxLength={1} 
              placeholder="0"
              className="w-12 h-14 bg-gray-100 border-2 border-transparent rounded-xl text-center text-2xl font-black focus:border-[#FF8C00] outline-none"
            />
          ))}
        </div>

        {/* This Link takes you to the next part of the app */}
        <Link href="/dashboard">
          <button className="w-full bg-[#003366] text-white font-black py-4 rounded-xl hover:bg-black transition-all shadow-lg text-lg uppercase tracking-widest active:scale-95">
            Complete Registration
          </button>
        </Link>

        <p className="mt-6 text-center text-xs text-gray-400 font-bold">
          Didn't receive code? <span className="text-[#FF8C00] cursor-pointer">Resend OTP</span>
        </p>
      </div>

      <p className="mt-10 text-[10px] text-gray-400 font-black uppercase tracking-[0.25em]">
        Developed by John Gabriel Ikechukwu
      </p>
    </div>
  );
}