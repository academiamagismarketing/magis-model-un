import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Index from './pages/Index';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import Produtos from './pages/Produtos';
import Eventos from './pages/Eventos';
import AdminLogin from './pages/admin/Login';
import AdminEventos from './pages/admin/Eventos';
import EventoForm from './pages/admin/EventoForm';
import AdminProdutos from './pages/admin/Produtos';
import ProdutoForm from './pages/admin/ProdutoForm';
import AdminStatus from './pages/admin/Status';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
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
