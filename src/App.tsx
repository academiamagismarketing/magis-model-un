import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Produtos from './pages/Produtos';
import Eventos from './pages/Eventos';
import Diretoria from './pages/equipe/Diretoria';
import Voluntarios from './pages/equipe/Voluntarios';
import Mentores from './pages/equipe/Mentores';
import AdminLogin from './pages/admin/Login';
import AdminEventos from './pages/admin/Eventos';
import EventoForm from './pages/admin/EventoForm';
import AdminProdutos from './pages/admin/Produtos';
import ProdutoForm from './pages/admin/ProdutoForm';
import AdminStatus from './pages/admin/Status';
import Dashboard from './pages/admin/Dashboard';
import AdminDiretoria from './pages/admin/Diretoria';
import DiretoriaForm from './pages/admin/DiretoriaForm';
import AdminVoluntarios from './pages/admin/Voluntarios';
import VoluntarioForm from './pages/admin/VoluntarioForm';
import AdminMentores from './pages/admin/Mentores';
import MentorForm from './pages/admin/MentorForm';
import AdminLayout from './components/admin/AdminLayout';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import Heartbeat from './components/Heartbeat';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Heartbeat />
      <div className="min-h-screen">
        <Routes>
          {/* Rotas públicas com Navbar */}
          <Route path="/" element={
            <div className="public-layout">
              <Navbar />
              <Index />
            </div>
          } />
          <Route path="/sobre" element={
            <div className="public-layout">
              <Navbar />
              <Sobre />
            </div>
          } />
          <Route path="/contato" element={
            <div className="public-layout">
              <Navbar />
              <Contato />
            </div>
          } />
          <Route path="/produtos" element={
            <div className="public-layout">
              <Navbar />
              <Produtos />
            </div>
          } />
          <Route path="/eventos" element={
            <div className="public-layout">
              <Navbar />
              <Eventos />
            </div>
          } />
          <Route path="/equipe/diretoria" element={
            <div className="public-layout">
              <Navbar />
              <Diretoria />
            </div>
          } />
          <Route path="/equipe/voluntarios" element={
            <div className="public-layout">
              <Navbar />
              <Voluntarios />
            </div>
          } />
          <Route path="/equipe/mentores" element={
            <div className="public-layout">
              <Navbar />
              <Mentores />
            </div>
          } />
          
          {/* Rotas administrativas sem Navbar */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          } />
          <Route path="/admin/eventos" element={
            <AdminLayout>
              <AdminEventos />
            </AdminLayout>
          } />
          <Route path="/admin/eventos/novo" element={
            <AdminLayout>
              <EventoForm />
            </AdminLayout>
          } />
          <Route path="/admin/eventos/:id/editar" element={
            <AdminLayout>
              <EventoForm />
            </AdminLayout>
          } />
          <Route path="/admin/produtos" element={
            <AdminLayout>
              <AdminProdutos />
            </AdminLayout>
          } />
          <Route path="/admin/produtos/novo" element={
            <AdminLayout>
              <ProdutoForm />
            </AdminLayout>
          } />
          <Route path="/admin/produtos/:id/editar" element={
            <AdminLayout>
              <ProdutoForm />
            </AdminLayout>
          } />
          <Route path="/admin/status" element={
            <AdminLayout>
              <AdminStatus />
            </AdminLayout>
          } />
          <Route path="/admin/diretoria" element={
            <AdminLayout>
              <AdminDiretoria />
            </AdminLayout>
          } />
          <Route path="/admin/diretoria/novo" element={
            <AdminLayout>
              <DiretoriaForm />
            </AdminLayout>
          } />
          <Route path="/admin/diretoria/:id/editar" element={
            <AdminLayout>
              <DiretoriaForm />
            </AdminLayout>
          } />
          <Route path="/admin/voluntarios" element={
            <AdminLayout>
              <AdminVoluntarios />
            </AdminLayout>
          } />
          <Route path="/admin/voluntarios/novo" element={
            <AdminLayout>
              <VoluntarioForm />
            </AdminLayout>
          } />
          <Route path="/admin/voluntarios/:id/editar" element={
            <AdminLayout>
              <VoluntarioForm />
            </AdminLayout>
          } />
          <Route path="/admin/mentores" element={
            <AdminLayout>
              <AdminMentores />
            </AdminLayout>
          } />
          <Route path="/admin/mentores/novo" element={
            <AdminLayout>
              <MentorForm />
            </AdminLayout>
          } />
          <Route path="/admin/mentores/:id/editar" element={
            <AdminLayout>
              <MentorForm />
            </AdminLayout>
          } />
          
          {/* Rota 404 com Navbar */}
          <Route path="*" element={
            <div className="public-layout">
              <Navbar />
              <NotFound />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
