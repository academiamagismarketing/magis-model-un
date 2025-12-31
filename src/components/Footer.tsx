import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare,
  Instagram,
  Users,
  Award,
  Star,
  BookOpen,
  Heart
} from 'lucide-react';
import { scrollToTopSmooth } from './ScrollToTop';
import logoBranca from '../../logo_branca_correta_footer.png';

const Footer = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia MAGIS.', '_blank');
  };

  const navigationLinks = [
    { name: 'Início', href: '/#inicio' },
    { name: 'Eventos', href: '/eventos' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Publicações', href: '/publicacoes' },
    { name: 'Contato', href: '/contato' }
  ];

  const aboutLinks = [
    { name: 'Sobre Nós', href: '/sobre', icon: Users },
    { name: 'Diretores', href: '/equipe/diretoria', icon: Users },
    { name: 'Mentores', href: '/equipe/mentores', icon: Star },
    { name: 'Voluntários', href: '/equipe/voluntarios', icon: Award }
  ];

  const socialLinks = [
    { name: 'Instagram', href: 'https://instagram.com/academiamagis', icon: Instagram }
  ];

  const supportLinks = [
    { name: 'Doações', href: 'https://www.vakinha.com.br/vaquinha/nos-ajude-a-conceder-bolsas-de-estudo-para-jovens', external: true, icon: Heart },
    { name: 'Parceiros', href: '/#parceiros', icon: Award }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo e Descrição */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="mb-6">
              <img 
                src={logoBranca} 
                alt="Academia MAGIS" 
                className="h-16 md:h-20 mx-auto sm:mx-0 object-contain"
              />
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto sm:mx-0">
              Transformando jovens em líderes diplomáticos através de Simulações Temáticas e educação de excelência.
            </p>
            
            {/* Social Links */}
            <div className="flex justify-center sm:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navegação */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/#') ? (
                    <a 
                      href={link.href} 
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.href} 
                      onClick={scrollToTopSmooth}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Sobre */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Sobre</h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    onClick={scrollToTopSmooth}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm flex items-center justify-center sm:justify-start space-x-2"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato e CTA */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Phone className="w-4 h-4 text-primary-foreground/60 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">+55 31 9157-8389</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <Mail className="w-4 h-4 text-primary-foreground/60 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">institucional@academiamagis.com</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-foreground/60 flex-shrink-0" />
                <span className="text-primary-foreground/80 text-sm">Belo Horizonte, MG</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button
                onClick={handleWhatsApp}
                size="sm"
                variant="outline"
                className="btn-white w-full"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              
              {/* Links de Apoio */}
              <div className="space-y-2">
                {supportLinks.map((link) => (
                  <div key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm flex items-center justify-center sm:justify-start space-x-2"
                      >
                        <link.icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm flex items-center justify-center sm:justify-start space-x-2"
                      >
                        <link.icon className="w-4 h-4" />
                        <span>{link.name}</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
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