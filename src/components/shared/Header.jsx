import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Contact', href: '/contact' },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      // style={{
      //   transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      //   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      // }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/80 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 border-b border-cyan-500/10'
          : 'bg-gradient-to-b from-slate-950/95 via-slate-900/90 to-transparent backdrop-blur-md'
      }`}
    >
      {/* Animated gradient line at top */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
      
      {/* Glow effect */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
      )}

      <nav className="container mx-auto px-4 py-2 md:py-2.5">
        <div className="flex items-center justify-between">
          {/* Logo with glow effect */}
          <Link to="/" className="group relative flex items-center gap-2 py-1">
            <div className="flex">
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-300 group-hover:via-blue-300 group-hover:to-purple-300 transition-all duration-300 font-devanagari">
                BIREENAअतिथि
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-2 md:flex">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className="group relative px-5 py-2.5 transition-all duration-300 font-devanagari"
                >
                  {/* Hover background */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : ''
                  }`} />
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                  )}
                  
                  <span className={`relative text-sm font-bold tracking-wide transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'
                      : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-xl bg-cyan-500/20 blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                </Link>
              );
            })}
          </div>

          {/* Auth Button */}
          <div className="hidden items-center gap-4 md:flex">
            <Link to="/login" className="group relative overflow-hidden rounded-xl px-6 py-2.5 font-bold text-sm transition-all duration-300 hover:scale-105 active:scale-95">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-90 group-hover:opacity-100 transition-opacity" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out" />
              
              {/* Glow */}
              <div className="absolute inset-0 rounded-xl bg-cyan-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              
              <span className="relative text-white flex items-center gap-2">
                Login
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="relative rounded-xl p-2 md:hidden group overflow-hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            {isOpen ? (
              <X className="relative h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors group-hover:rotate-90 duration-300" />
            ) : (
              <Menu className="relative h-6 w-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          style={{
            maxHeight: isOpen ? '500px' : '0',
            opacity: isOpen ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className="overflow-hidden md:hidden"
        >
          <div className="relative mt-4 rounded-2xl bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-cyan-500/20 p-6 shadow-2xl shadow-cyan-500/10">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent)] rounded-2xl" />
            
            <div className="relative flex flex-col gap-3">
              {navigation.map((item, index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                    onClick={() => setIsOpen(false)}
                    className={`group relative rounded-xl px-4 py-3 text-base font-semibold transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400'
                        : 'text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-r-full" />
                    )}
                    {item.name}
                  </Link>
                );
              })}

              <Link to="/login" onClick={() => setIsOpen(false)} className="mt-4 relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 font-bold text-white text-center shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-95">
                <div className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" />
                <span className="relative">Login</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};