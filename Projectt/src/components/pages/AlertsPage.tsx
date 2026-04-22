import { useState } from 'react';
import { DisasterAlertCard } from '../DisasterAlertCard';
import { Filter, Search } from 'lucide-react';

export function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const allAlerts = [
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
    {
      type: 'storm' as const,
      title: 'Severe Thunderstorm',
      location: 'Coastal District',
      severity: 'high' as const,
      time: '4 hours ago',
      description: 'Severe thunderstorm with heavy winds and hail. Power outages reported.',
    },
    {
      type: 'flood' as const,
      title: 'Flash Flood Warning',
      location: 'Downtown Area',
      severity: 'medium' as const,
      time: '5 hours ago',
      description: 'Flash flood warning issued for downtown area. Residents advised to stay alert.',
    },
    {
      type: 'wildfire' as const,
      title: 'Brush Fire',
      location: 'Hill Country',
      severity: 'low' as const,
      time: '6 hours ago',
      description: 'Small brush fire contained. Monitoring ongoing for potential flare-ups.',
    },
    {
      type: 'earthquake' as const,
      title: 'Aftershock Detected',
      location: 'Central Region',
      severity: 'low' as const,
      time: '7 hours ago',
      description: 'Magnitude 3.1 aftershock detected. No additional damage reported.',
    },
    {
      type: 'storm' as const,
      title: 'Hurricane Watch',
      location: 'Southern Coastline',
      severity: 'critical' as const,
      time: '8 hours ago',
      description: 'Hurricane approaching. Mandatory evacuations ordered for coastal areas.',
    },
    {
      type: 'other' as const,
      title: 'Landslide Risk',
      location: 'Mountain Pass',
      severity: 'medium' as const,
      time: '10 hours ago',
      description: 'Heavy rain increasing landslide risk. Road closures in effect.',
    },
  ];

  const filteredAlerts = allAlerts.filter((alert) => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === 'all' || alert.severity === filterSeverity;
    const matchesType = filterType === 'all' || alert.type === filterType;
    
    return matchesSearch && matchesSeverity && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 font-['Outfit'] tracking-tight">All Disaster Alerts</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
            Real-time monitoring of active disasters and emergency situations
          </p>
        </div>

        {/* Search and Filters - Glassmorphism */}
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-10 border border-slate-200/60 dark:border-slate-800/60">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="md:col-span-1 space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Search Incidents</label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by location or type..."
                  className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Severity Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">
                <Filter className="inline w-3.5 h-3.5 mr-1 mb-0.5" />
                Filter by Severity
              </label>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all shadow-sm appearance-none cursor-pointer"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical Only</option>
                <option value="high">High & Above</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Type Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">
                <Filter className="inline w-3.5 h-3.5 mr-1 mb-0.5" />
                Disaster Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all shadow-sm appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="flood">Flood</option>
                <option value="wildfire">Wildfire</option>
                <option value="earthquake">Earthquake</option>
                <option value="storm">Storm</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 pt-5 border-t border-slate-200/50 dark:border-slate-700/50">
            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Showing <span className="font-bold text-indigo-600 dark:text-indigo-400">{filteredAlerts.length}</span> of {allAlerts.length} active alerts
            </p>
          </div>
        </div>

        {/* Alerts Grid */}
        {filteredAlerts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredAlerts.map((alert, index) => (
              <div key={index} className="animate-in zoom-in-95 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
                <DisasterAlertCard {...alert} />
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-16 text-center border border-slate-200/50 dark:border-slate-800/50 animate-in fade-in">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 font-['Outfit']">No alerts found</h3>
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              Try adjusting your search or filter criteria to see results.
            </p>
            <button 
              onClick={() => { setSearchTerm(''); setFilterSeverity('all'); setFilterType('all'); }}
              className="mt-6 px-6 py-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-xl font-bold hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
