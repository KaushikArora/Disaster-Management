import { useState } from 'react';
import { Users, AlertTriangle, Activity, Map, Settings, Bell, BarChart3, Menu, X, PieChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart as RPieChart, Pie, Cell } from 'recharts';

function Shield(props: any) {
  return (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>);
}

const chartData = [
  { name: 'Mon', incidents: 4, resolved: 3 },
  { name: 'Tue', incidents: 7, resolved: 5 },
  { name: 'Wed', incidents: 5, resolved: 6 },
  { name: 'Thu', incidents: 12, resolved: 8 },
  { name: 'Fri', incidents: 8, resolved: 10 },
  { name: 'Sat', incidents: 3, resolved: 5 },
  { name: 'Sun', incidents: 2, resolved: 4 },
];

const pieData = [
  { name: 'Flood', value: 35, color: '#3b82f6' },
  { name: 'Fire', value: 25, color: '#ef4444' },
  { name: 'Earthquake', value: 20, color: '#f59e0b' },
  { name: 'Storm', value: 15, color: '#8b5cf6' },
  { name: 'Other', value: 5, color: '#06b6d4' },
];

const incidents = [
  { id: 'INC-001', type: 'Flood', location: 'Downtown', severity: 'Critical', status: 'Active', time: '10m ago', team: 'Alpha' },
  { id: 'INC-002', type: 'Fire', location: 'North Hills', severity: 'High', status: 'Active', time: '2h ago', team: 'Bravo' },
  { id: 'INC-003', type: 'Accident', location: 'Highway 5', severity: 'Medium', status: 'Resolved', time: '5h ago', team: 'Charlie' },
  { id: 'INC-004', type: 'Power Outage', location: 'Westside', severity: 'Low', status: 'Pending', time: '1d ago', team: 'Delta' },
  { id: 'INC-005', type: 'Earthquake', location: 'Central', severity: 'Critical', status: 'Active', time: '30m ago', team: 'Alpha' },
  { id: 'INC-006', type: 'Landslide', location: 'Mountain Pass', severity: 'High', status: 'Pending', time: '3h ago', team: 'Echo' },
];

const volData = [
  { name: 'Dr. Sarah Johnson', role: 'Medical Lead', status: 'Deployed', location: 'Downtown', missions: 47 },
  { name: 'Mike Chen', role: 'Search & Rescue', status: 'Deployed', location: 'North Hills', missions: 52 },
  { name: 'Emily Rodriguez', role: 'Logistics', status: 'Available', location: 'Base', missions: 38 },
  { name: 'James Williams', role: 'Communications', status: 'Available', location: 'Base', missions: 41 },
  { name: 'Lisa Anderson', role: 'Outreach', status: 'Off-Duty', location: 'N/A', missions: 35 },
  { name: 'David Kumar', role: 'Equipment', status: 'Deployed', location: 'Central', missions: 29 },
];

const sevCls = (s: string) => s === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : s === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : s === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
const statusCls = (s: string) => s === 'Active' ? 'text-red-500' : s === 'Resolved' ? 'text-emerald-500' : 'text-yellow-500';
const volStatusCls = (s: string) => s === 'Deployed' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : s === 'Available' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [incidentFilter, setIncidentFilter] = useState('all');

  const tabs = [
    { id: 'overview', icon: BarChart3, label: 'Overview' },
    { id: 'incidents', icon: AlertTriangle, label: 'Incidents' },
    { id: 'volunteers', icon: Users, label: 'Volunteers' },
    { id: 'map', icon: Map, label: 'Live Map' },
    { id: 'analytics', icon: PieChart, label: 'Analytics' },
  ];

  const stats = [
    { title: 'Active Incidents', value: '24', change: '+12%', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-500/10' },
    { title: 'Volunteers Deployed', value: '156', change: '+5%', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { title: 'Resources Dispatched', value: '89', change: '-2%', icon: Activity, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
    { title: 'Safe Zones', value: '12', change: '+1', icon: Map, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  const filteredIncidents = incidentFilter === 'all' ? incidents : incidents.filter(i => i.status === incidentFilter);

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div><p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{s.title}</p><h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 font-['Outfit']">{s.value}</h3></div>
              <div className={`p-3 rounded-xl ${s.bg}`}><s.icon className={`w-6 h-6 ${s.color}`} /></div>
            </div>
            <div className="mt-4 flex items-center text-sm"><span className={`font-medium ${s.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{s.change}</span><span className="text-slate-500 dark:text-slate-400 ml-2">from last week</span></div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50">
          <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit']">Incident Trends</h3></div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="cI" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/><stop offset="95%" stopColor="#ef4444" stopOpacity={0}/></linearGradient>
                  <linearGradient id="cR" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', borderRadius: '12px', border: 'none', color: '#fff' }} />
                <Area type="monotone" dataKey="incidents" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#cI)" />
                <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#cR)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-['Outfit']">Resource Distribution</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.slice(0,4)} layout="vertical"><XAxis type="number" hide /><YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} width={40} /><RechartsTooltip cursor={{fill:'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', borderRadius: '12px', border: 'none', color: '#fff' }} /><Bar dataKey="incidents" fill="#6366f1" radius={[0,4,4,0]} barSize={20} /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderIncidents = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">{['all','Active','Pending','Resolved'].map(f => (<button key={f} onClick={() => setIncidentFilter(f)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${incidentFilter === f ? 'bg-gradient-accent text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`}>{f === 'all' ? 'All' : f}</button>))}</div>
        <p className="text-sm text-slate-500">{filteredIncidents.length} incidents</p>
      </div>
      <div className="glass-card rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="border-b border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-500 uppercase tracking-widest"><th className="pb-4 px-4">ID</th><th className="pb-4 px-4">Type</th><th className="pb-4 px-4">Location</th><th className="pb-4 px-4">Severity</th><th className="pb-4 px-4">Status</th><th className="pb-4 px-4">Team</th><th className="pb-4 px-4">Time</th></tr></thead>
          <tbody className="text-sm">{filteredIncidents.map((r, i) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td className="py-4 px-4 font-medium text-slate-900 dark:text-white">{r.id}</td>
              <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{r.type}</td>
              <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{r.location}</td>
              <td className="py-4 px-4"><span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${sevCls(r.severity)}`}>{r.severity}</span></td>
              <td className="py-4 px-4"><div className="flex items-center gap-2"><Activity className={`w-4 h-4 ${statusCls(r.status)}`} /><span className="text-slate-700 dark:text-slate-300 font-medium">{r.status}</span></div></td>
              <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{r.team}</td>
              <td className="py-4 px-4 text-slate-500">{r.time}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );

  const renderVolunteers = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-3 gap-4">
        {[{ l: 'Total', v: volData.length, c: 'from-indigo-500 to-cyan-500' }, { l: 'Deployed', v: volData.filter(v => v.status === 'Deployed').length, c: 'from-red-500 to-orange-500' }, { l: 'Available', v: volData.filter(v => v.status === 'Available').length, c: 'from-emerald-500 to-teal-400' }].map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 text-center border border-slate-200/50 dark:border-slate-700/50">
            <div className={`text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${s.c} font-['Outfit']`}>{s.v}</div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="glass-card rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead><tr className="border-b border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-500 uppercase tracking-widest"><th className="pb-4 px-4">Name</th><th className="pb-4 px-4">Role</th><th className="pb-4 px-4">Status</th><th className="pb-4 px-4">Location</th><th className="pb-4 px-4">Missions</th></tr></thead>
          <tbody className="text-sm">{volData.map((v, i) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <td className="py-4 px-4 font-medium text-slate-900 dark:text-white">{v.name}</td>
              <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{v.role}</td>
              <td className="py-4 px-4"><span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase ${volStatusCls(v.status)}`}>{v.status}</span></td>
              <td className="py-4 px-4 text-slate-600 dark:text-slate-300">{v.location}</td>
              <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{v.missions}</td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 glass-card rounded-3xl overflow-hidden border border-slate-200/50 dark:border-slate-700/50" style={{ height: '600px' }}>
          <iframe title="Live Map" src="https://www.openstreetmap.org/export/embed.html?bbox=-74.1,40.6,-73.7,40.9&layer=mapnik" width="100%" height="100%" style={{ border: 0 }} />
        </div>
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-widest">Active Zones</h4>
            <div className="space-y-3">{incidents.filter(i => i.status === 'Active').map((inc, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div><p className="text-sm font-semibold text-slate-900 dark:text-white">{inc.location}</p><p className="text-xs text-slate-500">{inc.type} — {inc.severity}</p></div>
              </div>
            ))}</div>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-slate-200/50 dark:border-slate-700/50">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 uppercase tracking-widest">Legend</h4>
            <div className="space-y-2">{[{ c: 'bg-red-500', l: 'Critical' }, { c: 'bg-orange-500', l: 'High' }, { c: 'bg-yellow-500', l: 'Medium' }, { c: 'bg-blue-500', l: 'Low' }].map((x, i) => (
              <div key={i} className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${x.c}`}></div><span className="text-sm text-slate-600 dark:text-slate-400">{x.l}</span></div>
            ))}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-['Outfit']">Incidents by Type</h3>
          <div className="h-72"><ResponsiveContainer width="100%" height="100%"><RPieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" stroke="none">{pieData.map((e, i) => <Cell key={i} fill={e.color} />)}</Pie><RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', borderRadius: '12px', border: 'none', color: '#fff' }} /></RPieChart></ResponsiveContainer></div>
          <div className="flex flex-wrap gap-3 mt-4 justify-center">{pieData.map((d, i) => <div key={i} className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }}></div><span className="text-xs text-slate-500 font-medium">{d.name} ({d.value}%)</span></div>)}</div>
        </div>
        <div className="glass-card rounded-3xl p-6 border border-slate-200/50 dark:border-slate-700/50">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 font-['Outfit']">Weekly Response</h3>
          <div className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={chartData}><XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} /><YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} /><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} /><RechartsTooltip contentStyle={{ backgroundColor: 'rgba(15,23,42,0.9)', borderRadius: '12px', border: 'none', color: '#fff' }} /><Bar dataKey="incidents" fill="#ef4444" radius={[4,4,0,0]} barSize={16} /><Bar dataKey="resolved" fill="#10b981" radius={[4,4,0,0]} barSize={16} /></BarChart></ResponsiveContainer></div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ l: 'Avg Response', v: '12 min', c: 'text-cyan-500' }, { l: 'Resolution Rate', v: '87%', c: 'text-emerald-500' }, { l: 'Total This Month', v: '142', c: 'text-indigo-500' }, { l: 'Critical Active', v: '3', c: 'text-red-500' }].map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-6 text-center border border-slate-200/50 dark:border-slate-700/50"><div className={`text-2xl font-extrabold ${s.c} font-['Outfit']`}>{s.v}</div><div className="text-xs font-bold uppercase tracking-widest text-slate-500 mt-1">{s.l}</div></div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'incidents': return renderIncidents();
      case 'volunteers': return renderVolunteers();
      case 'map': return renderMap();
      case 'analytics': return renderAnalytics();
      default: return renderOverview();
    }
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className={`fixed inset-y-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out w-64 glass-panel border-r border-slate-200/50 dark:border-slate-800 flex flex-col`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-['Outfit'] tracking-tight flex items-center gap-2"><Shield className="w-5 h-5 text-indigo-500" /> Command Center</h2>
          <button className="md:hidden text-slate-500" onClick={() => setIsSidebarOpen(false)}><X className="w-5 h-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {tabs.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${activeTab === item.id ? 'bg-gradient-accent text-white shadow-lg shadow-indigo-500/20' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'}`}><item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : ''}`} />{item.label}</button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-800"><button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all font-medium"><Settings className="w-5 h-5" /> Settings</button></div>
      </div>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <header className="glass-panel border-b border-slate-200/50 dark:border-slate-800 p-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-500" onClick={() => setIsSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white capitalize font-['Outfit']">{activeTab}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors"><Bell className="w-6 h-6" /><span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span></button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[2px]"><div className="w-full h-full rounded-full border-2 border-white dark:border-slate-900 overflow-hidden bg-slate-200 dark:bg-slate-800 flex items-center justify-center"><span className="text-xs font-bold text-slate-700 dark:text-white">AD</span></div></div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50/50 dark:bg-slate-950/50 p-6 relative z-10 custom-scrollbar">{renderContent()}</main>
      </div>
    </div>
  );
}
