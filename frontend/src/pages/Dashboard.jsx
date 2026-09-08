import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  Activity, Heart, Brain, Wind, 
  Zap, Shield, Database 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const chartData = [
  { time: '00:00', level: 62 }, { time: '04:00', level: 58 },
  { time: '08:00', level: 85 }, { time: '12:00', level: 78 },
  { time: '16:00', level: 92 }, { time: '20:00', level: 70 },
  { time: '23:59', level: 65 },
];

const Dashboard = () => {
  // --- States ---
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('System standby. Awaiting biological query...');
  const [isTyping, setIsTyping] = useState(false);
  const [simValues, setSimValues] = useState({ sleep: 7.5, stress: 'low' });
  const [simResult, setSimResult] = useState(4.2);
  const [isSimulating, setIsSimulating] = useState(false);
  const [bioData, setBioData] = useState({
    biological_index: 0, resilience: 0, neural_flow: 0, cardiac_rhythm: 0, oxygen_saturation: 0
  });

  // --- Functions ---
  const fetchBioData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://127.0.0.1:8000/api/accounts/profile/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBioData(response.data);
    } catch (err) { console.error("Error fetching bio data", err); }
  };

  useEffect(() => { fetchBioData(); }, []);

  const handleAiQuery = async (e) => {
    if (e.key === 'Enter' && query) {
      setIsTyping(true);
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post('http://127.0.0.1:8000/api/intelligence/query/', 
          { query: query }, { headers: { Authorization: `Bearer ${token}` } }
        );
        setAiResponse(response.data.ai_response);
      } catch (err) { setAiResponse("Error connecting to neural link."); }
      finally { setIsTyping(false); setQuery(''); }
    }
  };

  const runSimulation = async () => {
    setIsSimulating(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post('http://127.0.0.1:8000/api/intelligence/simulate/', 
        { 
          sleep: simValues.sleep, 
          exercise: 4, 
          stress: simValues.stress === 'low' ? 2 : simValues.stress === 'moderate' ? 5 : 8, 
          nutrition: 85, genetics: 75 
        }, { headers: { Authorization: `Bearer ${token}` } }
      );
      setSimResult(response.data.projected_impact);
    } catch (err) { console.error("Simulation failed"); }
    finally { setIsSimulating(false); }
  };

  return (
    <div className="min-h-screen bg-background pt-24 px-6 pb-12 text-white selection:bg-accent selection:text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Twin & Usage */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Biological Twin Animation */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="border border-white/5 bg-white/[0.01] p-8 relative overflow-hidden">
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-8">Biological Twin // v1.0</h3>
            <div className="aspect-[3/4] flex items-center justify-center relative">
              {[1, 2, 3].map((ring) => (
                <motion.div key={ring} animate={{ opacity: [0.1, 0.3, 0], scale: [1, 1.5, 2] }} transition={{ duration: 3, repeat: Infinity, delay: ring }} className="absolute w-40 h-40 border border-accent/20 rounded-full" />
              ))}
              <motion.div animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 20px rgba(0,229,255,0.1)", "0 0 40px rgba(0,229,255,0.3)", "0 0 20px rgba(0,229,255,0.1)"] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-32 h-32 border border-accent/40 rounded-full flex items-center justify-center bg-accent/[0.02] z-10">
                <Activity size={40} strokeWidth={1} className="text-accent" />
              </motion.div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
               <div className="p-4 border border-white/5 bg-black/40">
                  <span className="block text-[8px] uppercase tracking-widest text-gray-500 mb-1">Index Score</span>
                  <span className="text-2xl font-light tracking-tight">{bioData.biological_index}</span>
               </div>
               <div className="p-4 border border-white/5 bg-black/40">
                  <span className="block text-[8px] uppercase tracking-widest text-gray-500 mb-1">Resilience</span>
                  <span className="text-2xl font-light tracking-tight">{bioData.resilience}%</span>
               </div>
            </div>
          </motion.div>

          {/* System Usage */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="border border-white/5 bg-white/[0.01] p-8">
            <h3 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-6">System Usage</h3>
            <div className="space-y-6">
              {[{ label: "AI Analysis", used: 36, total: 50 }, { label: "Simulations", used: 8, total: 20 }].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[9px] uppercase tracking-widest text-gray-600 mb-2">
                    <span>{item.label}</span>
                    <span>{item.used}/{item.total}</span>
                  </div>
                  <div className="h-[1px] w-full bg-white/5"><motion.div initial={{ width: 0 }} animate={{ width: `${(item.used/item.total)*100}%` }} className="h-full bg-accent shadow-[0_0_8px_#00e5ff]" /></div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Stats, Chart, Simulation & AI */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Neural Flow", value: `${bioData.neural_flow} ms`, icon: Brain },
              { label: "Cardiac Rhythm", value: `${bioData.cardiac_rhythm} bpm`, icon: Heart },
              { label: "Oxygen Sat.", value: `${bioData.oxygen_saturation}%`, icon: Wind },
            ].map((stat, i) => (
              <div key={i} className="p-6 border border-white/5 bg-white/[0.01]">
                <stat.icon size={20} strokeWidth={1} className="text-accent mb-4" />
                <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">{stat.label}</span>
                <span className="text-2xl font-extralight">{stat.value}</span>
              </div>
            ))}
          </div>

          <div className="p-8 border border-white/5 bg-white/[0.01] h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs><linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#00e5ff" stopOpacity={0.2}/><stop offset="95%" stopColor="#00e5ff" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                <XAxis dataKey="time" stroke="#444" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #1a1a1a' }} />
                <Area type="monotone" dataKey="level" stroke="#00e5ff" fill="url(#colorLevel)" strokeWidth={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Simulation Lab */}
          <div className="p-8 border border-white/5 bg-white/[0.01]">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-accent font-bold">Scenario Simulator</h3>
              <span className="text-[8px] uppercase tracking-widest text-gray-600">Model: NEXUS_NEURAL_V1</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="group">
                  <div className="flex justify-between text-[9px] uppercase tracking-widest mb-3"><span>Sleep Duration</span><span className="text-accent">{simValues.sleep}h</span></div>
                  <input type="range" min="4" max="12" step="0.5" value={simValues.sleep} onChange={(e) => setSimValues({...simValues, sleep: e.target.value})} className="w-full h-[1px] bg-white/10 appearance-none accent-accent outline-none cursor-pointer" />
                </div>
                <div className="flex gap-2">
                  {['low', 'moderate', 'high'].map(l => (
                    <button key={l} onClick={() => setSimValues({...simValues, stress: l})} className={`flex-1 py-2 text-[8px] uppercase tracking-widest border transition-all ${simValues.stress === l ? 'border-accent text-accent bg-accent/5' : 'border-white/5 text-gray-600'}`}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-6 border border-white/5 bg-black/40">
                <span className="text-[8px] uppercase tracking-widest text-gray-600 mb-4">Longevity Impact</span>
                <motion.span key={simResult} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-5xl font-extralight text-accent mb-6">{simResult > 0 ? `+${simResult}` : simResult}y</motion.span>
                <button onClick={runSimulation} disabled={isSimulating} className="w-full py-3 bg-white text-black text-[9px] uppercase tracking-[0.3em] font-bold hover:bg-accent transition-all disabled:opacity-50">{isSimulating ? "Processing..." : "Run Simulation"}</button>
              </div>
            </div>
          </div>

          {/* NOVA AI */}
          <div className="border border-white/5 bg-white/[0.01] p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-accent/50" />
            <h3 className="text-[10px] uppercase tracking-[0.4em] text-white font-bold mb-6">NOVA // Intelligence</h3>
            <div className="font-mono text-xs text-gray-400 bg-white/[0.02] p-4 border-l border-white/10 mb-6 min-h-[60px]">
              <span className="text-accent mr-2">{">"}</span> {isTyping ? "Neural processing..." : aiResponse}
            </div>
            <div className="relative">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleAiQuery} placeholder="Query neural link..." className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] uppercase tracking-[0.3em] outline-none focus:border-accent transition-colors" />
              <Zap size={14} className="absolute right-0 top-1/2 -translate-y-1/2 text-accent" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;