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
import LinkPage from './pages/Link';
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
import AdminPatrocinadores from './pages/admin/Patrocinadores';
import PatrocinadorForm from './pages/admin/PatrocinadorForm';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AdminBlog from './pages/admin/Blog';
import BlogForm from './pages/admin/BlogForm.tsx';
import AdminLayout from './components/admin/AdminLayout';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';
import Heartbeat from './components/Heartbeat';
// import usePerformance from './hooks/usePerformance';

function App() {
  console.log('🚀 App component iniciando...');
  
  try {
    console.log('✅ App render iniciado');
    
    return (
      <div style={{ margin: 0, padding: 0, minHeight: '100vh', backgroundColor: 'blue', color: 'white' }}>
        <h1 style={{ padding: '20px' }}>APP FUNCIONANDO - Teste de Renderização</h1>
        <Router>
          <ScrollToTop />
          <Heartbeat />
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={
                <div className="public-layout">
                  <p style={{ padding: '20px' }}>Rota "/" funcionando!</p>
                  <Index />
                </div>
              } />
              <Route path="*" element={
                <div style={{ padding: '20px' }}>
                  <h2>Página 404 - Rota não encontrada</h2>
                </div>
              } />
            </Routes>
          </div>
        </Router>
      </div>
    );
  } catch (error) {
    console.error('❌ Erro no App:', error);
    return (
      <div style={{ backgroundColor: 'red', color: 'white', padding: '20px', minHeight: '100vh' }}>
        <h1>ERRO CRÍTICO NO APP</h1>
        <p>Erro: {error?.toString()}</p>
        <pre>{error?.stack}</pre>
      </div>
    );
  }
}

export default App;
