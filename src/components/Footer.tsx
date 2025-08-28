import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  Instagram
} from 'lucide-react';
import { scrollToTopSmooth } from './ScrollToTop';
import logoBranca from '../logo_branca_magis_academia.jpg';

const Footer = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia MAGIS.', '_blank');
  };

  const quickLinks = [
    { name: 'Início', href: '/#inicio' },
    { name: 'Sobre', href: '/sobre' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Parceiros', href: '/#parceiros' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Contato', href: '/contato' }
  ];

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: Instagram }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="mb-6">
              <img 
                src={logoBranca} 
                alt="Academia MAGIS" 
                className="h-16 md:h-20 mx-auto lg:mx-0 object-contain"
              />
            </div>
            
            {/* Social Links */}
            <div className="mt-6 flex justify-center lg:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/#') ? (
                    <a href={link.href} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.href} 
                      onClick={scrollToTopSmooth}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Phone className="w-5 h-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">+55 31 9157-8389</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <Mail className="w-5 h-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">institucional@academiamagis.com</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-foreground/60" />
                <span className="text-primary-foreground/80">Belo Horizonte, BH - Brasil</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center lg:text-left">
            <h3 className="text-lg font-semibold mb-4">Fale Conosco</h3>
            <p className="text-primary-foreground/80 mb-4">
              Entre em contato conosco e descubra como podemos transformar seu futuro.
            </p>
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              className="btn-white w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm text-center">
              © 2025 Academia MAGIS. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;