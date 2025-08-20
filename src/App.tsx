import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import Sobre from '@/pages/Sobre';
import Contato from '@/pages/Contato';
import Pins from '@/pages/Pins';
import Eventos from '@/pages/Eventos';
import NotFound from '@/pages/NotFound';

// Admin pages
import AdminLogin from '@/pages/admin/Login';
import AdminEventos from '@/pages/admin/Eventos';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/pins" element={<Pins />} />
        <Route path="/eventos" element={<Eventos />} />
        
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/eventos" element={<AdminEventos />} />
        
        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
