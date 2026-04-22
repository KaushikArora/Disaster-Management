import React, { useState } from "react";
import "./login.css";

interface LoginPageProps {
  onNavigate?: (page: string) => void;
  onLogin?: (role: 'admin' | 'user') => void;
}

const ADMIN_EMAIL = "admin@disasteros.com";
const ADMIN_PASSWORD = "admin123";

export function LoginPage({ onNavigate, onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const validateFields = (): boolean => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) errs.email = "Email is required.";
    else if (!validateEmail(email)) errs.email = "Please enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setError("");
    if (!validateFields()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const isAdmin = email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
      if (onLogin) onLogin(isAdmin ? 'admin' : 'user');
      else if (onNavigate) onNavigate('home');
    }, 800);
  };

  const clearFieldError = (field: string) => setFieldErrors(f => ({ ...f, [field]: undefined }));

  return (
    <div className="login-root bg-slate-950">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="login-card">
        <div className="login-brand">
          <div className="w-14 h-14 rounded-2xl bg-gradient-accent mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/40 mb-5 animate-pulse-glow">
            <span className="text-3xl text-white">🛡️</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 font-['Outfit']">Welcome Back</h2>
          <p className="text-indigo-200/70 text-sm font-medium">Sign in to access the Command Center</p>
        </div>
        <form className="login-form space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-indigo-300/80 uppercase tracking-widest ml-1">Email Address</label>
            <input type="email" className={`w-full bg-slate-900/40 border rounded-xl px-4 py-3.5 text-white placeholder-slate-500 input-glow transition-all ${fieldErrors.email ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-white/10'}`} value={email} onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }} placeholder="you@example.com" required />
            {fieldErrors.email && <p className="text-red-400 text-xs font-medium mt-1 ml-1 animate-in fade-in duration-200">{fieldErrors.email}</p>}
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="block text-xs font-bold text-indigo-300/80 uppercase tracking-widest">Password</label>
              <button type="button" className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">Forgot Password?</button>
            </div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} className={`w-full bg-slate-900/40 border rounded-xl px-4 py-3.5 text-white placeholder-slate-500 input-glow transition-all pr-12 ${fieldErrors.password ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-white/10'}`} value={password} onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }} placeholder="••••••••" required />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors" onClick={() => setShowPassword(s => !s)}>{showPassword ? "🙈" : "👁️"}</button>
            </div>
            {fieldErrors.password && <p className="text-red-400 text-xs font-medium mt-1 ml-1 animate-in fade-in duration-200">{fieldErrors.password}</p>}
          </div>
          {error && <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium text-center animate-in fade-in zoom-in-95">{error}</div>}
          <button type="submit" className="w-full bg-gradient-accent text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center mt-2 border border-white/10" disabled={loading}>
            {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Sign In"}
          </button>
        </form>
        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <p className="text-slate-400 text-sm">Don't have an account?{" "}<button className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline transition-colors" onClick={() => onNavigate && onNavigate('signup')}>Create Account</button></p>
        </div>
        <div className="mt-5 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
          <p className="text-[11px] text-slate-500 font-medium tracking-wide text-center">Admin: <strong className="text-indigo-400">admin@disasteros.com</strong> / <strong className="text-indigo-400">admin123</strong></p>
        </div>
      </div>
    </div>
  );
}
