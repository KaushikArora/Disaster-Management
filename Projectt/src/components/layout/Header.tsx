import { Menu, X, LogOut, User, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;

  isAuthenticated: boolean;
  onLogout: () => void;
  userRole?: 'admin' | 'user' | null;
}

export function Header({ currentPage, onNavigate, isAuthenticated, onLogout, userRole }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = isAuthenticated ? [
    { id: 'home', label: 'Home' },
    { id: 'reports', label: 'Reports' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'volunteers', label: 'Volunteers' },
    { id: 'contact', label: 'Contact' },
    ...(userRole === 'admin' ? [{ id: 'admin', label: 'Admin' }] : []),
  ] : [
    { id: 'login', label: 'Sign In' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled
        ? 'bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800 shadow-lg shadow-indigo-500/5 py-2'
        : 'bg-transparent border-b border-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigate(isAuthenticated ? 'home' : 'login')}>
            <div className="w-11 h-11 bg-gradient-accent rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
              <span className="text-white text-xl animate-pulse-glow">🛡️</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 dark:text-white leading-tight font-['Outfit'] tracking-tight">
                Disaster<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">OS</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
                Response Unit
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center p-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-slate-700/50 shadow-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 overflow-hidden ${
                  currentPage === item.id
                    ? 'text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {currentPage === item.id && (
                  <span className="absolute inset-0 bg-gradient-accent rounded-full -z-10 animate-in fade-in zoom-in duration-300"></span>
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.id === 'admin' && <Shield className="w-3.5 h-3.5" />}
                  {item.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-4 pl-4 border-l border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-[2px]">
                      <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                  </div>
                  {userRole === 'admin' && (
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-md border border-indigo-500/30">Admin</span>
                  )}
                </div>
                <button
                  onClick={onLogout}
                  className="p-2.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/20 transition-all hover:scale-110"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}

            <button
              className="md:hidden p-2.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-slate-700/50 text-slate-600 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden grid transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-2 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/40 dark:border-slate-700/50 shadow-xl mb-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMobileMenuOpen(false); }}
                  className={`px-5 py-3 rounded-xl text-left font-semibold transition-all flex items-center gap-2 ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-500/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {item.id === 'admin' && <Shield className="w-4 h-4" />}
                  {item.label}
                </button>
              ))}
              {isAuthenticated && (
                <button
                  onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                  className="px-5 py-3 rounded-xl text-left font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors mt-2 border border-transparent hover:border-red-200 dark:hover:border-red-500/20"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
