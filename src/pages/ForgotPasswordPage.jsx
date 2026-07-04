import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_35%),linear-gradient(135deg,_#031427_0%,_#061b2c_55%,_#020812_100%)] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur">
        <h1 className="text-3xl font-semibold text-white">Reset password</h1>
        <p className="mt-2 text-sm text-slate-400">We will send recovery instructions to your inbox.</p>

        <form className="mt-6 space-y-4">
          <label className="block text-sm text-slate-300">
            <span>Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-white outline-none" placeholder="you@company.com" required />
          </label>
          <button type="submit" className="w-full rounded-full bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400">
            Send reset link
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Back to <Link to="/login" className="text-emerald-300">login</Link>
        </p>
      </div>
    </div>
  );
}
