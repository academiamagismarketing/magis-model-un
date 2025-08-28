import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  LogOut, 
  Calendar, 
  Plus, 
  Settings, 
  Users,
  BarChart3,
  Menu,
  X,
  Package,
  ShoppingCart
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Debug log
  console.log('AdminLayout render - isChecking:', isChecking, 'user:', !!user);

  useEffect(() => {
    let isMounted = true;
    console.log('AdminLayout useEffect - checking user');

    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!isMounted) return;
        
        if (!user) {
          console.log('AdminLayout - no user, redirecting to login');
          navigate('/admin/login');
          return;
        }

        // Verificar se o email está na lista de administradores permitidos
        const allowedEmailsString = import.meta.env.VITE_ADMIN_EMAILS;
        const allowedEmails = allowedEmailsString 
          ? allowedEmailsString.split(',').map(email => email.trim())
          : [
              'academiamagismarketing@gmail.com',
              'riannm19@gmail.com',
              'institucional@academiamagis.com'
            ];

        if (!allowedEmails.includes(user.email || '')) {
          console.log('AdminLayout - user not allowed, redirecting to login');
          await supabase.auth.signOut();
          navigate('/admin/login');
          return;
        }

        if (isMounted) {
          console.log('AdminLayout - user authenticated:', user.email);
          setUser(user);
        }
      } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        if (isMounted) {
          navigate('/admin/login');
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    checkUser();

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMounted) return;
        
        console.log('AdminLayout - auth state change:', event);
        
        if (event === 'SIGNED_OUT') {
          navigate('/admin/login');
        } else if (session?.user) {
          setUser(session.user);
        }
      }
    );

    return () => {
      console.log('AdminLayout - cleanup');
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (!user) {
    return null; // Mostrar loading ou redirecionar
  }

  const navigationItems = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Eventos', href: '/admin/eventos', icon: Calendar },
    { name: 'Novo Evento', href: '/admin/eventos/novo', icon: Plus },
    { name: 'Produtos', href: '/admin/produtos', icon: Package },
    { name: 'Novo Produto', href: '/admin/produtos/novo', icon: ShoppingCart }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-primary-foreground transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex flex-col h-full">
          {/* Header da Sidebar */}
          <div className="flex items-center justify-between p-6 border-b border-primary-foreground/20">
            <div className="flex items-center space-x-3">
              <div className="text-xl font-display font-bold">
                ACADEMIA <span className="text-primary-foreground/80">MAGIS</span>
              </div>
            </div>
            <Button
              onClick={() => setSidebarOpen(false)}
              variant="ghost"
              size="sm"
              className="lg:hidden text-primary-foreground hover:bg-primary-foreground/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navegação */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const location = useLocation();
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary-foreground/20 text-primary-foreground' 
                      : 'text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer da Sidebar */}
          <div className="p-4 border-t border-primary-foreground/20">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-foreground truncate">
                  {user.email}
                </p>
                <p className="text-xs text-primary-foreground/60">
                  Administrador
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full text-primary-foreground hover:bg-primary-foreground/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header móvel */}
        <header className="lg:hidden bg-background border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => setSidebarOpen(true)}
              variant="ghost"
              size="sm"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div className="text-lg font-semibold">Admin</div>
            <div className="w-8"></div> {/* Espaçador */}
          </div>
        </header>

        {/* Conteúdo da página */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
