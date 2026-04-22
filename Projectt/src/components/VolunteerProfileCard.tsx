import { Mail, Phone, MapPin, Award, ChevronRight } from 'lucide-react';

interface VolunteerProfileCardProps {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  missions: number;
  avatar?: string;
}

export function VolunteerProfileCard({ name, role, location, email, phone, missions, avatar }: VolunteerProfileCardProps) {
  return (
    <div className="glass-panel rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group border border-slate-200/50 dark:border-slate-700/50 relative overflow-hidden hover:-translate-y-1">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="flex flex-col items-center text-center mb-6 relative z-10">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-gradient-accent rounded-full blur opacity-40 group-hover:opacity-70 transition-opacity duration-300 animate-pulse-glow"></div>
          <div className="w-24 h-24 rounded-full bg-gradient-accent flex items-center justify-center text-white text-3xl relative z-10 border-[3px] border-white dark:border-slate-800 shadow-xl group-hover:scale-105 transition-transform duration-300">
            {avatar || name.charAt(0)}
          </div>
          {missions > 40 && (
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-amber-400 border-2 border-white dark:border-slate-800 rounded-full flex items-center justify-center text-white shadow-lg z-20">
              <span className="text-xs">⭐</span>
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">{name}</h3>
        <p className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-cyan-500 mt-1">{role}</p>
      </div>

      <div className="space-y-3 mb-6 relative z-10 bg-slate-50/50 dark:bg-slate-800/50 p-4 rounded-xl">
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group/item">
          <div className="p-1.5 rounded-md bg-white dark:bg-slate-700 shadow-sm text-indigo-500 group-hover/item:bg-indigo-500 group-hover/item:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium">{location}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group/item">
          <div className="p-1.5 rounded-md bg-white dark:bg-slate-700 shadow-sm text-cyan-500 group-hover/item:bg-cyan-500 group-hover/item:text-white transition-colors">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium truncate">{email}</span>
        </div>
        <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group/item">
          <div className="p-1.5 rounded-md bg-white dark:bg-slate-700 shadow-sm text-violet-500 group-hover/item:bg-violet-500 group-hover/item:text-white transition-colors">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-medium">{phone}</span>
        </div>
      </div>

      <div className="pt-5 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            {missions} <span className="text-slate-500 dark:text-slate-500 font-medium">Missions</span>
          </span>
        </div>
        <button className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-gradient-accent hover:text-white transition-all group-hover:translate-x-1">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
