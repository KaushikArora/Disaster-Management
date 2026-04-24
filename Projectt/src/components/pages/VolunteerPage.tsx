import { useState, useEffect } from 'react';
import { VolunteerProfileCard } from '../VolunteerProfileCard';
import { UserPlus, X } from 'lucide-react';

export function VolunteerPage() {
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', location: '', experience: '' });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [volunteers, setVolunteers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/volunteers')
      .then(res => res.json())
      .then(data => {
        setVolunteers(data);
      })
      .catch(err => {
        console.error('Failed to fetch volunteers:', err);
      });
  }, []);

  const validateName = (v: string) => /^[a-zA-Z\s]{2,}$/.test(v);
  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v: string) => /^[\d\s\+\-\(\)]{7,15}$/.test(v);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) setFieldErrors(f => ({ ...f, [e.target.name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    else if (!validateName(formData.name)) errs.name = "Name must contain only letters and spaces.";
    if (!formData.email.trim()) errs.email = "Email is required.";
    else if (!validateEmail(formData.email)) errs.email = "Please enter a valid email address.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    else if (!validatePhone(formData.phone)) errs.phone = "Please enter a valid phone number.";
    if (!formData.location.trim()) errs.location = "Location is required.";
    if (!formData.experience) errs.experience = "Please select experience level.";
    setFieldErrors(errs);
    if (Object.values(errs).some(v => v)) return;
    alert('Thank you for your interest! Our team will contact you soon.');
    setFormData({ name: '', email: '', phone: '', location: '', experience: '' });
    setShowJoinForm(false);
  };

  const inputCls = (field: string) => `w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm ${fieldErrors[field] ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-slate-200 dark:border-slate-700/50'}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[-10%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-in fade-in slide-in-from-top-8 duration-700">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 font-['Outfit'] tracking-tight">Our Volunteers</h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">Meet the dedicated individuals who help save lives and support communities during disasters.</p>
          <button onClick={() => setShowJoinForm(true)} className="px-8 py-4 bg-gradient-accent text-white rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/50 transition-all inline-flex items-center gap-3 transform hover:-translate-y-1 font-bold text-lg"><UserPlus className="w-6 h-6" /> Join as Volunteer</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-8 text-center border border-indigo-200/50 dark:border-indigo-500/20 shadow-lg animate-in zoom-in-95 delay-100"><div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 mb-2 font-['Outfit']">234</div><div className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Active Volunteers</div></div>
          <div className="glass-card rounded-2xl p-8 text-center border border-indigo-200/50 dark:border-indigo-500/20 shadow-lg animate-in zoom-in-95 delay-200"><div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400 mb-2 font-['Outfit']">1,456</div><div className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Missions Completed</div></div>
          <div className="glass-card rounded-2xl p-8 text-center border border-indigo-200/50 dark:border-indigo-500/20 shadow-lg animate-in zoom-in-95 delay-300"><div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 mb-2 font-['Outfit']">12</div><div className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Active Deployments</div></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {volunteers.map((volunteer, index) => (
            <div key={index} className="animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${index * 100}ms` }}><VolunteerProfileCard {...volunteer} /></div>
          ))}
        </div>
        {showJoinForm && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 custom-scrollbar">
              <div className="sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between z-10">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white font-['Outfit']">Join as Volunteer</h2>
                <button onClick={() => setShowJoinForm(false)} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 transition-all hover:scale-110"><X className="w-6 h-6" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Full Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={inputCls('name')} placeholder="Enter your full name" />
                  {fieldErrors.name && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.name}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputCls('email')} placeholder="your.email@example.com" />
                  {fieldErrors.email && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.email}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required className={inputCls('phone')} placeholder="+1 (555) 123-4567" />
                  {fieldErrors.phone && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.phone}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="location" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Location *</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required className={inputCls('location')} placeholder="Your city or region" />
                  {fieldErrors.location && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.location}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="experience" className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-widest ml-1">Experience Level *</label>
                  <select id="experience" name="experience" value={formData.experience} onChange={handleInputChange} required className={`${inputCls('experience')} appearance-none cursor-pointer`}>
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner - No experience</option>
                    <option value="intermediate">Intermediate - Some training</option>
                    <option value="advanced">Advanced - Certified professional</option>
                    <option value="expert">Expert - Extensive field experience</option>
                  </select>
                  {fieldErrors.experience && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.experience}</p>}
                </div>
                <div className="pt-6"><button type="submit" className="w-full px-6 py-4 bg-gradient-accent text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/30 transform hover:-translate-y-1 text-lg">Submit Application</button></div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
