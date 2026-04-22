import React, { useState } from "react";
import "./login.css";

interface SignupPageProps {
    onNavigate?: (page: string) => void;
    onLogin?: (role: 'admin' | 'user') => void;
}

export function SignupPage({ onNavigate, onLogin }: SignupPageProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const validateName = (v: string) => /^[a-zA-Z\s]{2,}$/.test(v);
    const validatePhone = (v: string) => /^[\d\s\+\-\(\)]{7,15}$/.test(v);

    const getPasswordStrength = (pw: string): { label: string; color: string; width: string } => {
        if (!pw) return { label: '', color: '', width: '0%' };
        let score = 0;
        if (pw.length >= 8) score++;
        if (pw.length >= 12) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        if (score <= 1) return { label: 'Weak', color: 'bg-red-500', width: '25%' };
        if (score <= 2) return { label: 'Fair', color: 'bg-orange-500', width: '50%' };
        if (score <= 3) return { label: 'Good', color: 'bg-yellow-500', width: '75%' };
        return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
    };

    const clearFieldError = (field: string) => setFieldErrors(f => ({ ...f, [field]: '' }));

    const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        setError("");
        const errs: Record<string, string> = {};

        if (!name.trim()) errs.name = "Name is required.";
        else if (!validateName(name)) errs.name = "Name must contain only letters and spaces.";

        if (!email.trim()) errs.email = "Email is required.";
        else if (!validateEmail(email)) errs.email = "Please enter a valid email address.";

        if (!phone.trim()) errs.phone = "Phone number is required.";
        else if (!validatePhone(phone)) errs.phone = "Please enter a valid phone number.";

        if (!password) errs.password = "Password is required.";
        else if (password.length < 8) errs.password = "Password must be at least 8 characters.";

        if (!confirmPassword) errs.confirmPassword = "Please confirm your password.";
        else if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match.";

        setFieldErrors(errs);
        if (Object.values(errs).some(v => v)) return;

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            if (onLogin) onLogin('user');
            else if (onNavigate) onNavigate("login");
        }, 1000);
    };

    const strength = getPasswordStrength(password);

    return (
        <div className="login-root bg-slate-950">
            <div className="orb orb-1" style={{ animationDelay: '-2s' }}></div>
            <div className="orb orb-2" style={{ animationDelay: '-7s' }}></div>
            <div className="orb orb-3" style={{ animationDelay: '-4s' }}></div>
            <div className="login-card">
                <div className="login-brand mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-accent mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/40 mb-4 animate-pulse-glow">
                        <span className="text-2xl text-white">📝</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-['Outfit']">Create Account</h2>
                    <p className="text-indigo-200/70 text-sm font-medium">Join the response team today</p>
                </div>
                <form className="login-form space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest ml-1">Full Name</label>
                        <input type="text" className={`w-full bg-slate-900/40 border rounded-xl px-4 py-3 text-white placeholder-slate-500 input-glow transition-all ${fieldErrors.name ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-white/10'}`} value={name} onChange={(e) => { setName(e.target.value); clearFieldError('name'); }} placeholder="John Doe" required />
                        {fieldErrors.name && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.name}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest ml-1">Email Address</label>
                        <input type="email" className={`w-full bg-slate-900/40 border rounded-xl px-4 py-3 text-white placeholder-slate-500 input-glow transition-all ${fieldErrors.email ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-white/10'}`} value={email} onChange={(e) => { setEmail(e.target.value); clearFieldError('email'); }} placeholder="you@example.com" required />
                        {fieldErrors.email && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.email}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest ml-1">Phone Number</label>
                        <input type="tel" className={`w-full bg-slate-900/40 border rounded-xl px-4 py-3 text-white placeholder-slate-500 input-glow transition-all ${fieldErrors.phone ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-white/10'}`} value={phone} onChange={(e) => { setPhone(e.target.value); clearFieldError('phone'); }} placeholder="+1 (555) 123-4567" required />
                        {fieldErrors.phone && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.phone}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest ml-1">Password</label>
                        <input type="password" className={`w-full bg-slate-900/40 border rounded-xl px-4 py-3 text-white placeholder-slate-500 input-glow transition-all ${fieldErrors.password ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-white/10'}`} value={password} onChange={(e) => { setPassword(e.target.value); clearFieldError('password'); }} placeholder="••••••••" required />
                        {password && (
                            <div className="mt-2 space-y-1">
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${strength.color} rounded-full transition-all duration-500`} style={{ width: strength.width }}></div>
                                </div>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</p>
                            </div>
                        )}
                        {fieldErrors.password && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.password}</p>}
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[11px] font-bold text-indigo-300/80 uppercase tracking-widest ml-1">Confirm Password</label>
                        <input type="password" className={`w-full bg-slate-900/40 border rounded-xl px-4 py-3 text-white placeholder-slate-500 input-glow transition-all ${fieldErrors.confirmPassword ? 'border-red-500/60 ring-1 ring-red-500/30' : confirmPassword && password === confirmPassword ? 'border-emerald-500/60 ring-1 ring-emerald-500/30' : 'border-white/10'}`} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value); clearFieldError('confirmPassword'); }} placeholder="••••••••" required />
                        {confirmPassword && password === confirmPassword && <p className="text-emerald-400 text-xs font-medium mt-1 ml-1">✓ Passwords match</p>}
                        {fieldErrors.confirmPassword && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.confirmPassword}</p>}
                    </div>
                    {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium text-center animate-in fade-in zoom-in-95">{error}</div>}
                    <button type="submit" className="w-full bg-gradient-accent text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all transform hover:scale-[1.02] active:scale-95 flex justify-center items-center mt-4 border border-white/10" disabled={loading}>
                        {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Get Started"}
                    </button>
                </form>
                <div className="mt-6 text-center border-t border-white/5 pt-5">
                    <p className="text-slate-400 text-sm">Already have an account?{" "}<button className="text-cyan-400 font-semibold hover:text-cyan-300 hover:underline transition-colors" onClick={() => onNavigate && onNavigate('login')}>Sign In</button></p>
                </div>
            </div>
        </div>
    );
}
