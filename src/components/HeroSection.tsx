import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, Globe } from 'lucide-react';
import Logo from './Logo';
import heroImage from '../assets/hero-diplomatic.jpg';

const HeroSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia Magis.', '_blank');
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Academia Magis - Diplomacia Internacional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Main Heading */}
          <div className="mb-8">
            <Logo variant="white" size="lg" className="justify-center mb-6" />
          </div>
          
          {/* Slogan */}
          <p className="text-xl md:text-2xl font-display italic mb-8 opacity-90 leading-relaxed">
            "Não queremos realizar sonhos,<br />
            queremos permitir que as pessoas sonhem."
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95">
            Preparamos jovens líderes para simulações da ONU, desenvolvendo habilidades de diplomacia, 
            negociação e liderança internacional. Junte-se à nossa academia e transforme seu futuro.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              onClick={handleWhatsApp}
              variant="outline"
              className="btn-white px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Fale Conosco
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/#eventos'}
              variant="default"
              className="btn-primary px-8 py-4 text-lg"
            >
              Conheça Nossos Eventos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
              <Users className="w-8 h-8 mx-auto mb-3 text-white/80" />
              <div className="text-3xl font-bold mb-1">500+</div>
              <div className="text-sm opacity-90">Estudantes Formados</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
              <Award className="w-8 h-8 mx-auto mb-3 text-white/80" />
              <div className="text-3xl font-bold mb-1">50+</div>
              <div className="text-sm opacity-90">Eventos Realizados</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
              <Globe className="w-8 h-8 mx-auto mb-3 text-white/80" />
              <div className="text-3xl font-bold mb-1">15+</div>
              <div className="text-sm opacity-90">Países Representados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;