import { Flame, Droplets, Wind, TrendingUp, AlertTriangle } from 'lucide-react';

interface DisasterAlertCardProps {
  type: 'flood' | 'earthquake' | 'wildfire' | 'storm' | 'other';
  title: string;
  location: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  time: string;
  description: string;
}

export function DisasterAlertCard({ type, title, location, severity, time, description }: DisasterAlertCardProps) {
  const getIcon = () => {
    switch (type) {
      case 'flood':
        return <Droplets className="w-6 h-6" />;
      case 'wildfire':
        return <Flame className="w-6 h-6" />;
      case 'storm':
        return <Wind className="w-6 h-6" />;
      case 'earthquake':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <AlertTriangle className="w-6 h-6" />;
    }
  };

  const getCardClasses = () => {
    const base = "glass-panel rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden group";
    switch (severity) {
      case 'critical':
        return `${base} border-red-500/30 hover:border-red-500/50 shadow-red-500/5 hover:shadow-red-500/20`;
      case 'high':
        return `${base} border-orange-500/30 hover:border-orange-500/50 shadow-orange-500/5 hover:shadow-orange-500/20`;
      case 'medium':
        return `${base} border-yellow-500/30 hover:border-yellow-500/50 shadow-yellow-500/5 hover:shadow-yellow-500/20`;
      default:
        return `${base} border-blue-500/30 hover:border-blue-500/50 shadow-blue-500/5 hover:shadow-blue-500/20`;
    }
  };

  const getIconContainerClasses = () => {
    const base = "w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110";
    switch (severity) {
      case 'critical':
        return `${base} bg-gradient-to-br from-red-500 to-rose-600 shadow-red-500/30`;
      case 'high':
        return `${base} bg-gradient-to-br from-orange-400 to-amber-600 shadow-orange-500/30`;
      case 'medium':
        return `${base} bg-gradient-to-br from-yellow-400 to-amber-500 shadow-yellow-500/30`;
      default:
        return `${base} bg-gradient-to-br from-blue-400 to-indigo-600 shadow-blue-500/30`;
    }
  };

  const getSeverityBadge = () => {
    const baseClasses = 'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest relative overflow-hidden shadow-sm';
    switch (severity) {
      case 'critical':
        return (
          <span className={`${baseClasses} bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800`}>
            <span className="absolute inset-0 bg-red-400/20 animate-pulse"></span>
            <span className="relative z-10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              {severity}
            </span>
          </span>
        );
      case 'high':
        return <span className={`${baseClasses} bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800`}>{severity}</span>;
      case 'medium':
        return <span className={`${baseClasses} bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800`}>{severity}</span>;
      default:
        return <span className={`${baseClasses} bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800`}>{severity}</span>;
    }
  };

  return (
    <div className={getCardClasses()}>
      {/* Background glow effect based on severity */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-40 ${
        severity === 'critical' ? 'bg-red-500' :
        severity === 'high' ? 'bg-orange-500' :
        severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
      }`}></div>

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className={getIconContainerClasses()}>
            {getIcon()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight font-['Outfit']">{title}</h3>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-0.5">{location}</p>
          </div>
        </div>
        {getSeverityBadge()}
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed relative z-10">{description}</p>
      
      <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center justify-between relative z-10">
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{time}</span>
        <button className={`text-xs font-bold uppercase tracking-wider transition-colors ${
          severity === 'critical' ? 'text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300' :
          severity === 'high' ? 'text-orange-600 hover:text-orange-500 dark:text-orange-400 dark:hover:text-orange-300' :
          severity === 'medium' ? 'text-yellow-600 hover:text-yellow-500 dark:text-yellow-400 dark:hover:text-yellow-300' :
          'text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300'
        }`}>
          View Details &rarr;
        </button>
      </div>
    </div>
  );
}
