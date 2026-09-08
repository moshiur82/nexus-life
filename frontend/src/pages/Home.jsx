import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Shield, Target } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-accent tracking-[0.4em] uppercase text-[10px] mb-6 font-semibold">
            Intelligence System
          </h2>
          <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter mb-8">
            NEXUS <span className="opacity-20 font-thin">//</span> LIFE
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto font-light leading-relaxed text-lg">
            An AI-powered biological intelligence platform for understanding, 
            simulating, and optimizing personal health trajectories.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { icon: Activity, label: "Signals", desc: "Real-time bio-data" },
            { icon: Zap, label: "Intelligence", desc: "Neural processing" },
            { icon: Shield, label: "Security", desc: "Encrypted genome" },
            { icon: Target, label: "Trajectory", desc: "Future simulation" }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="group p-10 border border-white/5 hover:border-accent/20 transition-all duration-700 bg-white/[0.01]"
            >
              <item.icon size={28} strokeWidth={1} className="text-white group-hover:text-accent transition-colors duration-500" />
              <h3 className="mt-6 text-[10px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-white transition-colors">
                {item.label}
              </h3>
              <p className="mt-2 text-xs text-gray-600 font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Home;