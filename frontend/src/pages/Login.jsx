import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
        username: formData.email,
        password: formData.password
      });

      // Login.jsx এর handleLogin ফাংশনের ভেতর আপডেট:
if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    
    // ইউজারের ইমেইল বা নাম সেভ করা (আপাতত ইমেইলটি ইউজারনেম হিসেবে নিচ্ছি)
    localStorage.setItem('user_name', formData.email.split('@')[0]); 
    
    navigate('/dashboard'); // সরাসরি ড্যাশবোর্ড এ পাঠিয়ে দিন
    window.location.reload(); // পেজ রিফ্রেশ করুন যাতে নেভবার আপডেট হয়
}
    } catch (err) {
      setError("Invalid credentials. Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-accent/30 mb-6 rotate-45">
            <ShieldCheck size={20} strokeWidth={1} className="text-accent -rotate-45" />
          </div>
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-2">Secure Access</h2>
          <h1 className="text-3xl font-light tracking-tight text-white">Identity Verification</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-[10px] uppercase tracking-widest text-center">{error}</p>}
          
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-accent" size={16} strokeWidth={1} />
            <input 
              required type="email" placeholder="Biological ID (Email)" 
              className="w-full bg-white/[0.02] border border-white/10 py-4 pl-12 pr-4 text-xs tracking-widest text-white outline-none focus:border-accent/50 transition-all"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-accent" size={16} strokeWidth={1} />
            <input 
              required type="password" placeholder="Access Key" 
              className="w-full bg-white/[0.02] border border-white/10 py-4 pl-12 pr-4 text-xs tracking-widest text-white outline-none focus:border-accent/50 transition-all"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button disabled={loading} className="w-full bg-white text-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all flex items-center justify-center gap-2 group mt-6">
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Initialize Access"}
            {!loading && <ArrowRight size={14} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;