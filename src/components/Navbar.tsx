import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Menu, 
  Phone, 
  MessageSquare
} from 'lucide-react';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { useLocation } from 'react-router-dom';

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
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia Magis.', '_blank');
  };

  const navigation = [
    { name: 'Início', href: '/#inicio' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Pins', href: '/pins' },
    { name: 'Contato', href: '/contato' },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Navbar Principal */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-diplomatic' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo 
                logoType="logo-preta-png" 
                size="sm"
                className="h-10 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === item.href 
                      ? 'text-primary' 
                      : 'text-foreground/80'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                onClick={handleWhatsApp}
                size="sm"
                className="btn-outline"
              >
                <Phone className="w-4 h-4 mr-2" />
                Fale Conosco
              </Button>
              <Button
                onClick={handleWhatsApp}
                size="sm"
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
      <div className="fixed bottom-6 right-6 z-40 lg:hidden">
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