import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Phone, 
  MessageSquare,
  ChevronDown,
  Users,
  Award,
  Star
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

import MobileMenu from '@/components/MobileMenu';
import { scrollToTopSmooth } from './ScrollToTop';
import logoPreta from '../../logo_preta_correta_mobile_sidebar.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Fechar menu mobile quando mudar de página
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia MAGIS.', '_blank');
  };

  const navigation = [
    { name: 'Início', href: '/#inicio' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Doações', href: 'https://www.vakinha.com.br/vaquinha/nos-ajude-a-conceder-bolsas-de-estudo-para-jovens', external: true },
    { name: 'Contato', href: '/contato' },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isSobreActive = location.pathname === '/sobre' || 
                       location.pathname.startsWith('/equipe/');

  return (
    <>
      {/* Navbar Principal */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-diplomatic">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Brand */}
            <div className="flex-shrink-0">
              <img 
                src={logoPreta} 
                alt="Academia MAGIS" 
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Início */}
              <Link
                to="/#inicio"
                onClick={scrollToTopSmooth}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/#inicio' 
                    ? 'text-primary' 
                    : 'text-foreground/80'
                }`}
              >
                Início
              </Link>

              {/* Eventos */}
              <Link
                to="/eventos"
                onClick={scrollToTopSmooth}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/eventos' 
                    ? 'text-primary' 
                    : 'text-foreground/80'
                }`}
              >
                Eventos
              </Link>

              {/* Sobre Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`text-sm font-medium transition-colors hover:text-primary flex items-center space-x-1 ${
                      isSobreActive ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    <span>Sobre</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/sobre" onClick={scrollToTopSmooth} className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Sobre Nós</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/equipe/diretoria" onClick={scrollToTopSmooth} className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Diretores</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/equipe/mentores" onClick={scrollToTopSmooth} className="flex items-center space-x-2">
                      <Star className="w-4 h-4" />
                      <span>Mentores</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/equipe/voluntarios" onClick={scrollToTopSmooth} className="flex items-center space-x-2">
                      <Award className="w-4 h-4" />
                      <span>Voluntários</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Produtos */}
              <Link
                to="/produtos"
                onClick={scrollToTopSmooth}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/produtos' 
                    ? 'text-primary' 
                    : 'text-foreground/80'
                }`}
              >
                Produtos
              </Link>

              {/* Doações */}
              <a
                href="https://www.vakinha.com.br/vaquinha/nos-ajude-a-conceder-bolsas-de-estudo-para-jovens"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-primary text-foreground/80"
              >
                Doações
              </a>

              {/* Contato */}
              <Link
                to="/contato"
                onClick={scrollToTopSmooth}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === '/contato' 
                    ? 'text-primary' 
                    : 'text-foreground/80'
                }`}
              >
                Contato
              </Link>
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                onClick={handleWhatsApp}
                size="sm"
                variant="outline"
                className="btn-outline"
              >
                <Phone className="w-4 h-4 mr-2" />
                Fale Conosco
              </Button>
              <Button
                onClick={handleWhatsApp}
                size="sm"
                variant="default"
                className="btn-primary"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                onClick={() => setIsMobileMenuOpen(true)}
                variant="ghost"
                size="sm"
                className="text-foreground hover:bg-muted"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        currentPath={location.pathname}
      />

      {/* Floating WhatsApp Button - Mobile Only */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <Button
          onClick={handleWhatsApp}
          size="lg"
          className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
};

export default Navbar;