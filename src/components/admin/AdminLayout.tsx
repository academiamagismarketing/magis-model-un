import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { X, Package, ShoppingCart, TrendingUp, Users, Award, Star, ChevronDown, ChevronRight, Home, Calendar, Plus, Menu, Handshake, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [isEquipeExpanded, setIsEquipeExpanded] = useState(false);

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Eventos', href: '/admin/eventos', icon: Calendar },
    { name: 'Novo Evento', href: '/admin/eventos/novo', icon: Plus },
    { name: 'Produtos', href: '/admin/produtos', icon: Package },
    { name: 'Novo Produto', href: '/admin/produtos/novo', icon: ShoppingCart },
    { name: 'Publicações', href: '/admin/publicacoes', icon: MessageSquare },
    { name: 'Nova Publicação', href: '/admin/publicacoes/novo', icon: Plus },
    { name: 'Status', href: '/admin/status', icon: TrendingUp },
    { name: 'Patrocinadores', href: '/admin/patrocinadores', icon: Handshake }
  ];

  const equipeItems = [
    { name: 'Diretoria', href: '/admin/diretoria', icon: Users },
    { name: 'Voluntários', href: '/admin/voluntarios', icon: Award },
    { name: 'Mentores', href: '/admin/mentores', icon: Star }
  ];

  useEffect(() => {
    setIsMounted(true);
    console.log('AdminLayout useEffect executado');
    
    const checkAuth = async () => {
      try {
        setIsChecking(true);
        console.log('Verificando autenticação...');
        
        const { data: { user } } = await supabase.auth.getUser();
        console.log('Usuário atual:', user);
        
        if (!user) {
          console.log('Usuário não autenticado, redirecionando para login');
          navigate('/admin/login');
          return;
        }

        // Verificar se o email está na lista de admins permitidos
        const allowedEmails = import.meta.env.VITE_ADMIN_EMAILS?.split(',').map(email => email.trim()) || [];
        console.log('Emails permitidos:', allowedEmails);
        console.log('Email do usuário:', user.email);
        
        if (!allowedEmails.includes(user.email || '')) {
          console.log('Email não autorizado, redirecionando para login');
          navigate('/admin/login');
          return;
        }

        console.log('Usuário autorizado');
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        navigate('/admin/login');
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (!isMounted || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando autorização...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-6 border-b">
          <h1 className="text-xl font-bold text-foreground">Admin MAGIS</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <item.icon className="w-4 h-4 mr-3" />
              {item.name}
            </Link>
          ))}

          {/* Seção Equipe */}
          <div className="pt-4">
            <button
              onClick={() => setIsEquipeExpanded(!isEquipeExpanded)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-3" />
                Equipe
              </div>
              {isEquipeExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            
            {isEquipeExpanded && (
              <div className="ml-4 mt-2 space-y-1">
                {equipeItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Links externos */}
          <div className="pt-4 border-t">
            <Link
              to="/"
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <Home className="w-4 h-4 mr-3" />
              Página Inicial
            </Link>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
          >
            Sair
          </Button>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card border-b p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Painel Administrativo</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
