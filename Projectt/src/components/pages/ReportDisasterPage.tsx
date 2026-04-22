import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle, MapPin, FileText, Loader2 } from 'lucide-react';

export function ReportDisasterPage() {
  const [formData, setFormData] = useState({ name: '', location: '', disasterType: '', description: '' });
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const disasterTypes = ['Flood','Earthquake','Wildfire','Hurricane/Storm','Landslide','Tornado','Tsunami','Drought','Other'];

  const validateName = (v: string) => /^[a-zA-Z\s]{2,}$/.test(v);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (fieldErrors[e.target.name]) setFieldErrors(f => ({ ...f, [e.target.name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.pdf') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) {
        setFieldErrors(f => ({ ...f, file: 'Document files like PDF or DOC are not allowed. Please upload images or videos only.' }));
        e.target.value = ''; setFileName(''); return;
      }
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        setFieldErrors(f => ({ ...f, file: 'Only Image and Video files are allowed.' }));
        e.target.value = ''; setFileName(''); return;
      }
      setFieldErrors(f => ({ ...f, file: '' }));
      setFileName(file.name);
    }
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) { setFieldErrors(f => ({ ...f, location: 'Geolocation not supported by your browser.' })); return; }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          setFormData(prev => ({ ...prev, location: data.display_name || `${latitude}, ${longitude}` }));
        } catch { setFormData(prev => ({ ...prev, location: `${latitude}, ${longitude}` })); }
        finally { setLocationLoading(false); }
      },
      () => { setFieldErrors(f => ({ ...f, location: 'Unable to retrieve your location.' })); setLocationLoading(false); }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required.";
    else if (!validateName(formData.name)) errs.name = "Name must contain only letters and spaces.";
    if (!formData.location.trim()) errs.location = "Location is required.";
    if (!formData.disasterType) errs.disasterType = "Please select a disaster type.";
    if (!formData.description.trim()) errs.description = "Description is required.";
    else if (formData.description.trim().length < 20) errs.description = "Description must be at least 20 characters.";
    setFieldErrors(errs);
    if (Object.values(errs).some(v => v)) return;
    setSubmitted(true);
    setTimeout(() => { setFormData({ name: '', location: '', disasterType: '', description: '' }); setFileName(''); setSubmitted(false); }, 5000);
  };

  const inputCls = (field: string) => `w-full px-5 py-4 bg-white/50 dark:bg-slate-900/50 border rounded-xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all shadow-sm ${fieldErrors[field] ? 'border-red-500/60 ring-1 ring-red-500/30' : 'border-slate-200 dark:border-slate-700/50'}`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-300"><AlertCircle className="w-10 h-10 text-white" /></div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Report a Disaster</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">Help us respond quickly by providing accurate information about the emergency situation</p>
        </div>
        {submitted && (
          <div className="mb-8 bg-green-500/10 border border-green-500/30 rounded-2xl p-6 flex items-start gap-4 animate-in zoom-in-95 duration-300 shadow-lg shadow-green-500/5">
            <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
            <div><h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Report Submitted Successfully!</h3><p className="text-green-600 dark:text-green-300 leading-relaxed">Thank you for your report. Our emergency response team has been notified.</p></div>
          </div>
        )}
        <div className="glass-card rounded-3xl p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name *</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className={inputCls('name')} placeholder="Enter your full name" />
              {fieldErrors.name && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.name}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Location *</label>
              <div className="relative flex gap-3">
                <div className="relative flex-1">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} required className={`${inputCls('location')} pl-12`} placeholder="Enter the disaster location" />
                </div>
                <button type="button" onClick={handleLocationClick} disabled={locationLoading} className="px-6 py-4 bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap font-medium border border-slate-300 dark:border-slate-600/50">
                  {locationLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}<span className="hidden sm:inline">Use My Location</span>
                </button>
              </div>
              {fieldErrors.location && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.location}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="disasterType" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Disaster Type *</label>
              <select id="disasterType" name="disasterType" value={formData.disasterType} onChange={handleInputChange} required className={`${inputCls('disasterType')} appearance-none cursor-pointer`}>
                <option value="">Select disaster type</option>
                {disasterTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              {fieldErrors.disasterType && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.disasterType}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Description * <span className="text-slate-400 text-xs font-normal">(min 20 characters)</span></label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required rows={5} className={`${inputCls('description')} pl-12 resize-none`} placeholder="Provide detailed information about the disaster" />
              </div>
              {fieldErrors.description && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.description}</p>}
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Upload Images/Videos (Optional)</label>
              <div className="relative group">
                <input type="file" id="file-upload" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
                <label htmlFor="file-upload" className="flex flex-col items-center justify-center gap-3 w-full px-4 py-8 bg-slate-50/50 dark:bg-slate-900/30 border-2 border-dashed border-indigo-200 dark:border-indigo-500/30 rounded-2xl cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-400 dark:hover:border-indigo-400 transition-all">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center group-hover:scale-110 transition-transform"><Upload className="w-6 h-6 text-indigo-500" /></div>
                  <div className="text-center"><span className="text-slate-700 dark:text-slate-300 font-medium block">{fileName || 'Click or drag files to upload'}</span><span className="text-xs text-slate-500 mt-1 block">Images and Videos only. DOC/PDF not allowed.</span></div>
                </label>
              </div>
              {fieldErrors.file && <p className="text-red-400 text-xs font-medium mt-1 ml-1">{fieldErrors.file}</p>}
            </div>
            <div className="pt-6">
              <button type="submit" className="w-full px-6 py-5 bg-gradient-accent text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 text-lg"><AlertCircle className="w-6 h-6" /> Submit Disaster Report</button>
            </div>
          </form>
          <div className="mt-8 bg-red-500/10 border border-red-500/20 rounded-xl p-5 flex items-start gap-4">
            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 animate-pulse"></div>
            <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed"><strong>Emergency?</strong> If this is a life-threatening situation, please call <strong>911</strong> immediately.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
