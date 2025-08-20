import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, Globe } from 'lucide-react';
import Logo from '@/components/Logo';
import heroImage from '@/assets/hero-diplomatic.jpg';

const HeroSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia Magis.', '_blank');
  };

  const stats = [
    { icon: Users, value: "500+", label: "Estudantes Formados" },
    { icon: Award, value: "50+", label: "Eventos Realizados" },
    { icon: Globe, value: "15+", label: "Países Representados" }
  ];

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
          <p className="text-xl md:text-2xl font-display italic mb-8 animate-fade-in opacity-90 leading-relaxed">
            "Não queremos realizar sonhos,<br />
            queremos permitir que as pessoas sonhem."
          </p>
          
          {/* Description */}
          <p className="text-lg md:text-xl mb-12 animate-fade-in max-w-3xl mx-auto leading-relaxed opacity-95">
            Preparamos jovens líderes para simulações da ONU, desenvolvendo habilidades de diplomacia, 
            negociação e liderança internacional. Junte-se à nossa academia e transforme seu futuro.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-in">
            <Button 
              size="lg" 
              onClick={handleWhatsApp}
              className="btn-outline px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Fale Conosco
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              className="btn-white px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Conheça Nossos Eventos
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
            {stats.map((stat, index) => (
              <div key={index} className="text-center backdrop-blur-sm bg-white/10 rounded-lg p-6 border border-white/20">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-white/80" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
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