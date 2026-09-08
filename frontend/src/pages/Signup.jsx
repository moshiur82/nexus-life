import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Fingerprint, Loader2 } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Pricing page থেকে আসা প্ল্যান ডাটা রিসিভ করা
  const selectedPlan = location.state?.plan || "Explorer";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/register/', {
        username: formData.email, // ইমেইলকে ইউজারনেম হিসেবে ব্যবহার করছি
        email: formData.email,
        password: formData.password,
        first_name: formData.full_name
      });

      if (response.status === 201) {
        alert("Enrolled Successfully! Please authorize session.");
        navigate('/login');
      }
    } catch (err) {
      const backendErrors = err.response?.data;
      if (backendErrors) {
        const errorMsg = Object.values(backendErrors).flat().join(" ");
        setError(errorMsg);
      } else {
        setError("Network error or server is down.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background pt-20">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-accent/30 mb-6 rotate-45">
            <Fingerprint size={20} strokeWidth={1} className="text-accent -rotate-45" />
          </div>
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-2">Biological Enrollment</h2>
          <h1 className="text-3xl font-light tracking-tight text-white">Create Nexus ID</h1>
          
          {/* সিলেক্ট করা প্ল্যান এখানে দেখা যাবে */}
          <div className="mt-4 inline-block border border-accent/20 bg-accent/5 px-4 py-1">
            <span className="text-[8px] uppercase tracking-[0.2em] text-accent font-mono">
              Target Protocol: {selectedPlan}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 py-3 px-4 mb-4">
              <p className="text-red-500 text-[10px] uppercase tracking-widest text-center">{error}</p>
            </div>
          )}
          
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-accent transition-colors" size={16} strokeWidth={1} />
            <input 
              required
              type="text" 
              placeholder="Full Name" 
              className="w-full bg-white/[0.02] border border-white/10 py-4 pl-12 pr-4 text-xs tracking-widest text-white outline-none focus:border-accent/50 focus:bg-accent/[0.01] transition-all"
              onChange={(e) => setFormData({...formData, full_name: e.target.value})}
            />
          </div>

          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-accent transition-colors" size={16} strokeWidth={1} />
            <input 
              required
              type="email" 
              placeholder="Biological Email" 
              className="w-full bg-white/[0.02] border border-white/10 py-4 pl-12 pr-4 text-xs tracking-widest text-white outline-none focus:border-accent/50 focus:bg-accent/[0.01] transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-accent transition-colors" size={16} strokeWidth={1} />
            <input 
              required
              type="password" 
              placeholder="Create Access Key" 
              className="w-full bg-white/[0.02] border border-white/10 py-4 pl-12 pr-4 text-xs tracking-widest text-white outline-none focus:border-accent/50 focus:bg-accent/[0.01] transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-white text-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all duration-500 flex items-center justify-center gap-2 group mt-6 disabled:opacity-50"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Begin Onboarding"}
            {!loading && <ArrowRight size={14} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-gray-600 text-white/50">
          Already Enrolled? <Link to="/login" className="text-white hover:text-accent transition-colors">Authorize Session</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;