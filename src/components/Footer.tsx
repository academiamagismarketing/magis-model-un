import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';

const Footer = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre a Academia Magis.', '_blank');
  };

  const quickLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Quem Somos', href: '#quem-somos' },
    { name: 'Eventos', href: '#eventos' },
    { name: 'Pins', href: '#pins' },
    { name: 'Contato', href: '#contato' }
  ];

  const services = [
    'Simulações da ONU',
    'Workshops de Diplomacia',
    'Preparação Vestibular',
    'Mentoria Individual',
    'Eventos Corporativos'
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <Logo variant="white" size="md" className="mb-4" />
                <p className="text-blue-100 leading-relaxed">
                  "Não queremos realizar sonhos, queremos permitir que as pessoas sonhem."
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-blue-100">
                  <Phone className="w-5 h-5 mr-3" />
                  (11) 99999-9999
                </div>
                <div className="flex items-center text-blue-100">
                  <Mail className="w-5 h-5 mr-3" />
                  contato@academiamagis.com.br
                </div>
                <div className="flex items-center text-blue-100">
                  <MapPin className="w-5 h-5 mr-3" />
                  São Paulo, SP - Brasil
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-montserrat text-lg font-semibold mb-6">Links Rápidos</h3>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-blue-100 hover:text-white transition-smooth"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-montserrat text-lg font-semibold mb-6">Nossos Serviços</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="text-blue-100">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact CTA */}
            <div>
              <h3 className="font-montserrat text-lg font-semibold mb-6">Fale Conosco</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Ready to start your diplomatic journey? Entre em contato conosco hoje mesmo!
              </p>
              <Button
                onClick={handleWhatsApp}
                variant="whatsapp"
                className="w-full font-semibold mb-6"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-blue-100 hover:text-white transition-smooth"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-400/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-100 text-sm">
              © 2024 Academia Magis. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-blue-100 hover:text-white transition-smooth">
                Política de Privacidade
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-smooth">
                Termos de Uso
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-smooth">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;