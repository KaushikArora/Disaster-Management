import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) setFieldErrors(f => ({ ...f, [e.target.name]: '' }));
  };

  const validateName = (v: string) => /^[a-zA-Z\s]{2,}$/.test(v);
  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    else if (!validateName(formData.name)) errs.name = "Name must contain only letters and spaces.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!validateEmail(formData.email)) errs.email = "Please enter a valid email address.";
    if (!formData.subject) errs.subject = "Please select a subject.";
    if (!formData.message.trim()) errs.message = "Message is required.";
    else if (formData.message.trim().length < 10) errs.message = "Message must be at least 10 characters.";
    setFieldErrors(errs);
    if (Object.values(errs).some(v => v)) return;
    setSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSuccess(false), 4000);
  };

  const inputCls = (field: string) => `w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm ${fieldErrors[field] ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-slate-200 dark:border-slate-700'}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="relative overflow-hidden bg-slate-900 text-white py-24 lg:py-32 border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-indigo-600/40 via-purple-600/20 to-transparent rounded-bl-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-600/30 via-blue-600/20 to-transparent rounded-tr-full blur-3xl animate-float"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight font-['Outfit']">Get In Touch</h1>
          <p className="text-xl text-indigo-100/80 max-w-2xl mx-auto font-medium leading-relaxed">Have questions, feedback, or need emergency assistance? Our dedicated support team is available 24/7.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="glass-card bg-white/90 dark:bg-slate-900/90 rounded-3xl p-8 md:p-10 border border-slate-200/50 dark:border-slate-700/50 animate-in slide-in-from-left-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20"><MessageCircle className="w-7 h-7 text-white" /></div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-['Outfit']">Send a Message</h2>
              </div>
              {success && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium text-center animate-in fade-in zoom-in-95">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Full Name *</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={inputCls('name')} placeholder="Enter your name" />
                    {fieldErrors.name && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Email Address *</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputCls('email')} placeholder="your.email@example.com" />
                    {fieldErrors.email && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.email}</p>}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Subject *</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className={`${inputCls('subject')} appearance-none cursor-pointer`}>
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="volunteer">Volunteer Information</option>
                    <option value="partnership">Partnership Opportunities</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  {fieldErrors.subject && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.subject}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className={`${inputCls('message')} resize-none`} placeholder="How can we help you?" />
                  {fieldErrors.message && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.message}</p>}
                </div>
                {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-medium animate-in fade-in zoom-in-95">{error}</div>}
                <button type="submit" className="w-full px-6 py-4 bg-gradient-accent text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg">
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-red-500/10 dark:bg-red-500/5 border border-red-200 dark:border-red-900/50 rounded-3xl p-8 relative overflow-hidden group animate-in slide-in-from-right-8 delay-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-500"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10"><div className="w-3 h-3 rounded-full bg-red-500 animate-ping"></div><h3 className="text-xl font-bold text-red-600 dark:text-red-400 font-['Outfit']">Emergency Helplines</h3></div>
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-4 rounded-2xl border border-red-100 dark:border-red-900/30"><div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-xl"><Phone className="w-6 h-6 text-red-600 dark:text-red-400" /></div><div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Emergency Services</div><div className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">911</div></div></div>
                <div className="flex items-center gap-4 bg-white/60 dark:bg-slate-900/60 p-4 rounded-2xl border border-red-100 dark:border-red-900/30"><div className="p-3 bg-red-100 dark:bg-red-900/50 rounded-xl"><Phone className="w-6 h-6 text-red-600 dark:text-red-400" /></div><div><div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">24/7 Disaster Helpline</div><div className="text-xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">1-800-DISASTER</div></div></div>
              </div>
            </div>
            <div className="glass-card bg-white/90 dark:bg-slate-900/90 rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 animate-in slide-in-from-right-8 delay-200">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 font-['Outfit']">Headquarters</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 group"><div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500 transition-colors"><Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors" /></div><div><h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Email</h4><p className="text-slate-600 dark:text-slate-400 font-medium">help@disastermgmt.org</p><p className="text-slate-600 dark:text-slate-400 font-medium">support@disastermgmt.org</p></div></div>
                <div className="flex items-start gap-4 group"><div className="w-12 h-12 bg-cyan-50 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500 transition-colors"><Phone className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:text-white transition-colors" /></div><div><h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Phone</h4><p className="text-slate-600 dark:text-slate-400 font-medium">+1 (555) 123-4567</p></div></div>
                <div className="flex items-start gap-4 group"><div className="w-12 h-12 bg-violet-50 dark:bg-violet-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500 transition-colors"><MapPin className="w-5 h-5 text-violet-600 dark:text-violet-400 group-hover:text-white transition-colors" /></div><div><h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Address</h4><p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">123 Emergency Response Ave<br />Tech City, TC 12345</p></div></div>
                <div className="flex items-start gap-4 group"><div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500 transition-colors"><Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors" /></div><div><h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Office Hours</h4><p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Mon-Fri: 8:00 AM - 6:00 PM<br /><span className="text-red-500">Sunday: Emergency calls only</span></p></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
