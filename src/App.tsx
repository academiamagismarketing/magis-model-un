import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Pins from './pages/Pins';
import Eventos from './pages/Eventos';
import AdminLogin from './pages/admin/Login';
import AdminEventos from './pages/admin/Eventos';
import EventoForm from './pages/admin/EventoForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/pins" element={<Pins />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/eventos" element={<AdminEventos />} />
            <Route path="/admin/eventos/novo" element={<EventoForm />} />
            <Route path="/admin/eventos/:id/editar" element={<EventoForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
