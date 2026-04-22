import { ArrowRight, AlertCircle, Users, FileText, TrendingUp, Shield, Map, Activity } from 'lucide-react';
import { DisasterAlertCard } from '../DisasterAlertCard';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const liveAlerts = [
    {
      type: 'flood' as const,
      title: 'Severe Flooding',
      location: 'River Valley District',
      severity: 'critical' as const,
      time: '15 minutes ago',
      description: 'Heavy rainfall causing flash floods. Evacuation in progress for low-lying areas.',
    },
    {
      type: 'wildfire' as const,
      title: 'Forest Fire',
      location: 'Mountain Ridge Area',
      severity: 'high' as const,
      time: '1 hour ago',
      description: 'Wildfire spreading rapidly due to strong winds. Firefighting teams deployed.',
    },
    {
      type: 'earthquake' as const,
      title: 'Earthquake Activity',
      location: 'Central Region',
      severity: 'medium' as const,
      time: '3 hours ago',
      description: 'Magnitude 5.2 earthquake detected. Minor structural damage reported.',
    },
  ];

  const stats = [
    { icon: AlertCircle, label: 'Active Alerts', value: '12', color: 'text-red-500', bg: 'bg-red-500/10' },
    { icon: FileText, label: 'Reports Today', value: '47', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { icon: Users, label: 'Active Volunteers', value: '234', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { icon: TrendingUp, label: 'Resolved Cases', value: '1,456', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  ];

  return (
    <div className="animate-in fade-in duration-500 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-slate-950 text-white overflow-hidden pb-20 pt-24 lg:pt-32 border-b border-white/5">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-violet-600/20 blur-[120px] animate-pulse-glow"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-indigo-600/20 blur-[150px] animate-float"></div>
          <div className="absolute top-[20%] left-[40%] w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[100px] animate-float-delayed"></div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl animate-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-indigo-500/30 text-indigo-300 text-sm font-bold mb-8 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
                Active Response System Online
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight font-['Outfit']">
                Rapid Response. <br />
                <span className="text-gradient drop-shadow-sm">Total Safety.</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-medium">
                Advanced disaster management platform coordinating real-time emergency response, volunteer deployment, and community safety through intelligent mapping and alerts.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('reports')}
                  className="px-8 py-4 bg-gradient-accent text-white rounded-2xl transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] font-bold flex items-center gap-2 transform hover:-translate-y-1 active:translate-y-0"
                >
                  <Shield className="w-5 h-5" />
                  Report Incident
                </button>
                <button
                  onClick={() => onNavigate('volunteers')}
                  className="px-8 py-4 glass-panel hover:bg-white/10 text-white rounded-2xl transition-all font-bold flex items-center gap-2 transform hover:-translate-y-1 border border-white/20 hover:border-white/40"
                >
                  Join Corps
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Hero Visual - Premium Animated Display */}
            <div className="hidden lg:block relative animate-in zoom-in duration-1000 delay-200">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full"></div>
              <div className="relative glass-card rounded-[2rem] p-6 shadow-2xl skew-y-3 transform hover:rotate-1 hover:skew-y-1 transition-all duration-700 border border-white/10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-2xl rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/20 blur-2xl rounded-full"></div>
                
                <div className="grid grid-cols-2 gap-5 relative z-10">
                  <div className="space-y-5">
                    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl h-36 w-full animate-pulse border border-slate-700/50 relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 w-1/3 bg-slate-700 rounded-full"></div>
                        <div className="h-8 w-1/2 bg-slate-700 rounded-md"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-900/80 to-slate-900 backdrop-blur-md rounded-2xl h-48 w-full border border-indigo-500/20 p-4 flex flex-col justify-between">
                      <div className="h-4 w-1/4 bg-indigo-800/50 rounded-full"></div>
                      <div className="flex justify-between items-end">
                        <div className="space-y-2">
                          <div className="h-10 w-10 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-cyan-400" />
                          </div>
                        </div>
                        <div className="h-16 w-24 bg-gradient-to-t from-cyan-500/20 to-transparent rounded-t-lg border-b-2 border-cyan-500"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5 pt-8">
                    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl h-48 w-full border border-slate-700/50 p-4">
                       <div className="h-4 w-1/3 bg-slate-700 rounded-full mb-4"></div>
                       <div className="space-y-2">
                         <div className="h-3 w-full bg-slate-700 rounded-full"></div>
                         <div className="h-3 w-5/6 bg-slate-700 rounded-full"></div>
                         <div className="h-3 w-4/6 bg-slate-700 rounded-full"></div>
                       </div>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl h-36 w-full animate-pulse border border-slate-700/50 delay-150"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Glass Cards */}
      <section className="-mt-12 relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 md:p-8 text-center hover:-translate-y-2 transition-all duration-300 hover:shadow-indigo-500/10 group animate-in slide-in-from-bottom-8" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="flex justify-center mb-4">
                <div className={`w-16 h-16 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-1 ring-black/5 dark:ring-white/5`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-1 font-['Outfit'] tracking-tight">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Live Alerts Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-2 text-red-500 font-bold mb-3 tracking-widest uppercase text-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span>Live Monitoring</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white font-['Outfit'] tracking-tight">Active Emergencies</h2>
            </div>
            <button
              onClick={() => onNavigate('alerts')}
              className="px-6 py-3 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-xl transition-all font-bold border border-indigo-200 dark:border-indigo-800/50 hover:shadow-lg self-start sm:self-auto"
            >
              View All Alerts
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveAlerts.map((alert, index) => (
              <div key={index} className="animate-in fade-in slide-in-from-bottom-8" style={{ animationDelay: `${index * 150}ms` }}>
                <DisasterAlertCard {...alert} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/50 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 font-['Outfit'] tracking-tight">Geospatial Intelligence</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
              Real-time tracking of disaster zones, resource allocation, and evacuation routes on our interactive global map.
            </p>
          </div>

          <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden aspect-[21/9] min-h-[400px] shadow-2xl border border-slate-800 group group-hover:shadow-cyan-500/20 transition-shadow duration-500">
            {/* Animated Decorative Map Grid */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900 opacity-80"></div>
            
            {/* Radar scan animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '4s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/30 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-6 z-10 p-10 glass-panel rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md transform group-hover:scale-105 transition-transform duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(6,182,212,0.5)] animate-pulse-glow">
                  <Map className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white font-['Outfit']">Interactive Operations Map</h3>
                  <p className="text-cyan-200 mt-2 font-medium">Connecting to satellite feeds<span className="animate-pulse">...</span></p>
                </div>
                <button className="px-8 py-3 bg-white text-slate-900 rounded-xl font-bold hover:bg-cyan-50 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform">
                  Launch Full Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
