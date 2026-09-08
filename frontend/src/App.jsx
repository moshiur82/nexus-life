import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="bg-background min-h-screen selection:bg-accent selection:text-black flex flex-col">
      {/* Navigation Bar */}
      <Navbar />
      
      {/* Main Content Area - flex-grow ensures footer stays at bottom */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Dashboard Route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Default 404 Route (Optional) */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default App;