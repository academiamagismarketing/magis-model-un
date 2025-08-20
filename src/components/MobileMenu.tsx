import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  X, 
  Phone, 
  MessageSquare,
  Home,
  Users,
  Calendar,
  ShoppingBag,
  Mail,
  MapPin,
  ChevronRight
} from 'lucide-react';
import Logo from './Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, currentPath }) => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia Magis.', '_blank');
    onClose();
  };

  const navigation = [
    { name: 'Início', href: '/#inicio', icon: Home },
    { name: 'Sobre', href: '/sobre', icon: Users },
    { name: 'Eventos', href: '/eventos', icon: Calendar },
    { name: 'Pins', href: '/pins', icon: ShoppingBag },
    { name: 'Contato', href: '/contato', icon: Mail },
  ];

  const handleNavigation = (href: string) => {
    onClose();
    // Se for um link interno, navegar suavemente
    if (href.startsWith('/#')) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-2xl transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <Logo />
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-foreground hover:bg-muted"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-6 py-8 overflow-y-auto">
            <div className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    currentPath === item.href
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-foreground/80 hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Informações de Contato
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+55 31 9157-8389</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>contato@academiamagis.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Belo Horizonte, MG</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-4">
                Ações Rápidas
              </h3>
              <div className="space-y-2">
                <Button
                  onClick={() => handleNavigation('/eventos')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Ver Eventos
                </Button>
                <Button
                  onClick={() => handleNavigation('/pins')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Comprar Pins
                </Button>
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border space-y-3">
            <Button
              onClick={handleWhatsApp}
              className="w-full btn-primary"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Falar no WhatsApp
            </Button>
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              className="w-full btn-outline"
            >
              <Phone className="w-4 h-4 mr-2" />
              Ligar Agora
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
