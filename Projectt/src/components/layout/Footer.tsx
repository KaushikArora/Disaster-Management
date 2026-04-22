import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 mt-auto relative overflow-hidden">
      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 bg-[length:200%_100%] animate-shimmer"></div>
      
      {/* Background decorations */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white text-xl">🛡️</span>
              </div>
              <span className="text-white font-bold text-xl font-['Outfit'] tracking-tight">DisasterOS</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Providing rapid response and coordinated disaster management services to protect communities and save lives through advanced technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 font-['Outfit'] text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span> About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span> Emergency Services</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span> Safety Guidelines</a></li>
              <li><a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors"></span> Resources</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 font-['Outfit'] text-lg">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-slate-900 group-hover:bg-red-500/20 transition-colors border border-slate-800">
                  <Phone className="w-4 h-4 text-red-400" />
                </div>
                <div className="pt-1">
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-0.5">Emergency</p>
                  <span className="text-slate-300 font-semibold text-base">911</span>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="p-2 rounded-lg bg-slate-900 group-hover:bg-cyan-500/20 transition-colors border border-slate-800">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="pt-1">
                  <p className="text-slate-500 text-xs uppercase tracking-wider font-bold mb-0.5">Helpline</p>
                  <span className="text-slate-300">1-800-DISASTER</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-slate-300 hover:text-white transition-colors cursor-pointer">help@disastermgmt.org</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-1" />
                <span className="text-slate-300">123 Emergency Ave, Tech City, TC 12345</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-white font-bold mb-6 font-['Outfit'] text-lg">Follow Us</h3>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-tr hover:from-indigo-600 hover:to-cyan-500 hover:border-transparent hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:-translate-y-1"
                  aria-label="Social Icon"
                >
                  <Icon className="w-4 h-4 text-slate-400 hover:text-white" />
                </a>
              ))}
            </div>
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20">
              <p className="text-sm text-indigo-200">
                <span className="inline-block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                System Status: <strong>Operational</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/60 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} DisasterOS Management System. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
