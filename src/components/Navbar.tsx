import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  MessageSquare
} from 'lucide-react';

import MobileMenu from '@/components/MobileMenu';
import { scrollToTopSmooth } from './ScrollToTop';

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
    { name: 'Sobre', href: '/sobre' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Doações', href: 'https://www.vakinha.com.br/vaquinha/nos-ajude-a-conceder-bolsas-de-estudo-para-jovens', external: true },
    { name: 'Contato', href: '/contato' },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar Principal */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-diplomatic">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Brand */}
            <div className="flex-shrink-0">
              <div className="text-2xl font-display font-bold text-foreground">
                ACADEMIA <span className="text-primary">MAGIS</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors hover:text-primary text-foreground/80"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={scrollToTopSmooth}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === item.href 
                        ? 'text-primary' 
                        : 'text-foreground/80'
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              ))}
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