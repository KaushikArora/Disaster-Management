import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { ReportDisasterPage } from './components/pages/ReportDisasterPage';
import { AdminDashboard } from './components/pages/AdminDashboard';
import { VolunteerPage } from './components/pages/VolunteerPage';
import { ContactPage } from './components/pages/ContactPage';
import { AlertsPage } from './components/pages/AlertsPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignupPage } from './components/pages/SignupPage';

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('auth_token') === 'true';
  });

  // User Role State
  const [userRole, setUserRole] = useState<'admin' | 'user' | null>(() => {
    return localStorage.getItem('user_role') as 'admin' | 'user' | null;
  });

  // Toast notification for access denied
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (role: 'admin' | 'user' = 'user') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('auth_token', 'true');
    localStorage.setItem('user_role', role);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    setCurrentPage('login');
  };

  // initialize currentPage from the URL so /login works, fall back to 'home'
  const getInitialPage = () => {
    try {
      const p = window.location.pathname.replace(/^\/+|\/+$/g, ''); // trim slashes
      if (!p) return isAuthenticated ? 'home' : 'login';

      const allowed = ['home', 'reports', 'alerts', 'volunteers', 'contact', 'login', 'signup', 'admin'];
      const page = allowed.includes(p) ? p : (isAuthenticated ? 'home' : 'login');

      // Route Protection Logic
      if (!isAuthenticated && !['login', 'signup', 'contact'].includes(page)) {
        return 'login';
      }
      if (isAuthenticated && ['login', 'signup'].includes(page)) {
        return 'home';
      }
      // Admin route guard
      if (page === 'admin' && userRole !== 'admin') {
        return 'home';
      }
      return page;

    } catch (e) {
      return isAuthenticated ? 'home' : 'login';
    }
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Navigation with admin guard
  const handleNavigate = (page: string) => {
    if (page === 'admin' && userRole !== 'admin') {
      showToast('⛔ Access Denied — Admin credentials required');
      return;
    }
    setCurrentPage(page);
  };

  // keep URL synchronized when user navigates
  useEffect(() => {
    try {
      const path = currentPage === 'home' ? '/' : `/${currentPage}`;
      if (window.location.pathname !== path) {
        window.history.replaceState({}, '', path);
      }
    } catch (e) {
      // ignore
    }
  }, [currentPage]);

  // Auth Routing Check effect (in case state changes)
  useEffect(() => {
    if (!isAuthenticated && !['login', 'signup', 'contact'].includes(currentPage)) {
      setCurrentPage('login');
    }
    if (isAuthenticated && ['login', 'signup'].includes(currentPage)) {
      setCurrentPage('home'); // Redirect away from login if already auth
    }
    if (currentPage === 'admin' && userRole !== 'admin') {
      setCurrentPage('home');
    }
  }, [isAuthenticated, currentPage, userRole]);


  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode — default to dark
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');

    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      // Default to dark mode
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'reports':
        return <ReportDisasterPage />;
      case 'alerts':
        return <AlertsPage />;
      case 'volunteers':
        return <VolunteerPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'admin':
        return userRole === 'admin' ? <AdminDashboard /> : <HomePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans text-slate-900 dark:text-slate-100">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        userRole={userRole}
      />

      <main className="flex-1 animate-in fade-in duration-500 relative z-0">
        {renderPage()}
      </main>

      {/* Hide Footer on Admin/Login/Signup for cleaner UI */}
      {!['admin', 'login', 'signup'].includes(currentPage) && <Footer />}

      {/* Admin Access Button (Only show if admin role) */}
      {isAuthenticated && userRole === 'admin' && currentPage !== 'admin' && (
        <button
          onClick={() => handleNavigate('admin')}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-accent text-white rounded-full shadow-lg shadow-indigo-600/30 flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/40 z-40 group"
          title="Admin Dashboard"
        >
          <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 relative z-10"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="px-6 py-3.5 bg-red-500/90 backdrop-blur-xl text-white rounded-2xl shadow-2xl shadow-red-500/30 font-semibold text-sm border border-red-400/30 flex items-center gap-2">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
