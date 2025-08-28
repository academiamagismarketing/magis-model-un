import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  LogOut, 
  Home
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';


interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
        return;
      }

      // Verificar se o email está na lista de administradores permitidos
      const allowedEmails = [
        'academiamagismarketing@gmail.com',
        'riannm19@gmail.com'
      ];

      if (!allowedEmails.includes(user.email || '')) {
        await supabase.auth.signOut();
        navigate('/admin/login');
        return;
      }

      setUser(user);
    };

    checkUser();

    // Escutar mudanças na autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate('/admin/login');
        } else if (session?.user) {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (!user) {
    return null; // Mostrar loading ou redirecionar
  }

  return (
    <div className="min-h-screen bg-background admin-layout">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[9999] bg-primary text-primary-foreground shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand e Título */}
            <div className="flex items-center space-x-3">
              <div className="text-xl font-display font-bold text-primary-foreground">
                ACADEMIA <span className="text-primary-foreground/80">MAGIS</span>
              </div>
              <h1 className="text-lg font-semibold">
                Eventos
              </h1>
            </div>

            {/* Navegação */}
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Home className="w-4 h-4 mr-2" />
                Página Inicial
              </Button>
              
              <div className="hidden sm:block text-sm text-primary-foreground/80">
                {user.email}
              </div>
              
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo da página */}
      <main className="pt-20 pb-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
