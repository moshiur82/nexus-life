import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();

  // ১. প্ল্যান সিলেকশন হ্যান্ডলার
  const handlePlanSelection = (planName) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/dashboard');
    } else {
      // সাইন-আপ পেজে প্ল্যান ডাটা পাঠানো হচ্ছে
      navigate('/signup', { state: { plan: planName } });
    }
  };

  // ২. প্ল্যান ডাটা (isYearly এর ওপর ভিত্তি করে দাম পরিবর্তন হবে)
  const plans = [
    {
      name: "Explorer",
      price: "0",
      desc: "Fundamental biological tracking",
      features: ["Core signals", "Basic twin", "AI insights", "1 Report/month"],
      button: "Start Free",
      popular: false
    },
    {
      name: "Intelligence",
      price: isYearly ? "15" : "19",
      desc: "Advanced neural optimization",
      features: ["Advanced AI", "Digital Twin", "Simulation Lab", "Genome insights", "Trajectory"],
      button: "Start 14-Day Trial",
      popular: true
    },
    {
      name: "Nexus",
      price: isYearly ? "39" : "49",
      desc: "Full biological governance",
      features: ["Full AI Access", "Advanced twin", "Simulations", "Deep genome", "Priority AI"],
      button: "Go Nexus",
      popular: false
    }
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-background text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-accent tracking-[0.3em] uppercase text-[10px] mb-4 font-bold"
          >
            Pricing Models
          </motion.h2>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-8">
            Intelligence for your biology.
          </h1>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-[10px] uppercase tracking-widest ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-12 h-6 rounded-full border border-white/20 p-1 flex items-center transition-all"
            >
              <motion.div 
                animate={{ x: isYearly ? 24 : 0 }}
                className="w-4 h-4 bg-accent rounded-full"
              />
            </button>
            <span className={`text-[10px] uppercase tracking-widest ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Yearly <span className="text-accent ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 border ${plan.popular ? 'border-accent/40 bg-accent/[0.02]' : 'border-white/5 bg-white/[0.01]'} hover:border-white/20 transition-all duration-500`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-black text-[8px] font-bold uppercase px-3 py-1 tracking-[0.2em]">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-extralight">${plan.price}</span>
                <span className="text-xs text-gray-600">/month</span>
              </div>
              <p className="text-xs text-gray-500 mb-8 font-light h-8">{plan.desc}</p>

              <div className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={12} strokeWidth={1} className="text-accent" />
                    <span className="text-[11px] text-gray-400 font-light tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>

              {/* অ্যাকশন বাটন */}
              <button 
                onClick={() => handlePlanSelection(plan.name)}
                className={`w-full py-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all flex items-center justify-center gap-2 group ${
                  plan.popular ? 'bg-accent text-black hover:bg-white' : 'border border-white/20 hover:border-white text-white'
                }`}
              >
                {plan.button}
                <ArrowRight size={14} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-10 border border-white/5 text-center bg-gradient-to-b from-transparent to-white/[0.01]"
        >
          <h3 className="text-[10px] uppercase tracking-[0.4em] text-accent mb-4">Nexus for Teams</h3>
          <p className="text-gray-400 font-light text-sm mb-6">Research teams and health organizations.</p>
          <button className="text-[10px] uppercase tracking-[0.2em] border-b border-accent pb-1 hover:text-accent transition-colors">
            Contact Sales
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default Pricing;