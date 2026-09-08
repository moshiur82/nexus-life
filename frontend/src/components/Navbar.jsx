import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, User, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedName = localStorage.getItem('user_name');
    if (token) {
      setIsLoggedIn(true);
      setUserName(storedName || 'Agent');
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // সব ডাটা মুছে ফেলুন
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-background/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-6 h-6 border border-accent rotate-45 flex items-center justify-center">
            <div className="w-1 h-1 bg-accent"></div>
          </div>
          <span className="text-lg font-light tracking-[0.2em] uppercase text-white">Nexus</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">
          <Link href="/" className="hover:text-white transition-colors">Intelligence</Link>
          <Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link>
          <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        </div>

        {/* Auth Actions */}
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <div className="flex items-center gap-6">
              {/* User Identity */}
              <div className="flex items-center gap-3 border-r border-white/10 pr-6">
                <div className="w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center">
                  <User size={12} strokeWidth={1} className="text-accent" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white font-light">
                  {userName}
                </span>
              </div>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-400 transition-colors flex items-center gap-2 group"
              >
                <span className="text-[9px] uppercase tracking-[0.2em] hidden md:block">Terminate</span>
                <LogOut size={16} strokeWidth={1} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-[10px] uppercase tracking-[0.2em] font-medium hover:text-accent transition-colors text-white">
                Login
              </Link>
              <Link to="/signup" className="h-10 px-6 border border-white text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 flex items-center text-white">
                Get Started
              </Link>
            </div>
          )}
          <Menu size={20} strokeWidth={1} className="md:hidden text-white" />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;