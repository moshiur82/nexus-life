import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-white/5 py-12 px-6 bg-background mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo Part */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border border-accent rotate-45 flex items-center justify-center">
            <div className="w-0.5 h-0.5 bg-accent"></div>
          </div>
          <span className="text-xs font-light tracking-[0.3em] uppercase text-white">Nexus // Life</span>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 text-[9px] uppercase tracking-[0.2em] text-gray-600 font-medium">
          <a href="#" className="hover:text-white transition-colors duration-300">Security</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Protocols</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Neural Governance</a>
          <a href="#" className="hover:text-white transition-colors duration-300">System Status</a>
        </div>

        {/* Copyright */}
        <div className="text-[9px] uppercase tracking-[0.2em] text-gray-800">
          © 2026 NEXUS BIOLOGICAL INTELLIGENCE. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};

export default Footer;