import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Zap } from 'lucide-react';

import heroImage from '../assets/hero-diplomatic.jpg';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia MAGIS.', '_blank');
  };

  const scrollToEvents = () => {
    const element = document.getElementById('eventos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Academia MAGIS - Diplomacia Internacional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Heading */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            Formando <span className="text-gradient-primary">Líderes</span><br />
            do <span className="text-gradient-primary">Amanhã</span>
          </h1>

          {/* Slogan */}
          <p className={`text-lg md:text-xl font-display italic mb-6 opacity-90 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            "Não queremos realizar sonhos,<br />
            <span className="text-primary font-semibold">queremos permitir que as pessoas sonhem.</span>"
          </p>

          {/* Description */}
          <p className={`text-base md:text-lg mb-8 max-w-2xl mx-auto leading-relaxed opacity-95 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            Acreditamos que o mundo acadêmico deve ser acessível para todos. 
            Lutamos para democratizar estes espaços e torná-los cada vez mais diversos.
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-6 max-w-2xl mx-auto transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <Button 
              size="lg" 
              onClick={handleWhatsApp}
              variant="default"
              className="btn-primary px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Zap className="mr-2 w-5 h-5" />
              Fale Conosco
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              onClick={scrollToEvents}
              variant="outline"
              className="btn-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <Play className="mr-2 w-5 h-5" />
              Ver Eventos
            </Button>
          </div>

          {/* Compact Stats with subtle background */}
          <div className={`mx-auto max-w-xl transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4">
              <div className="flex items-center justify-between text-center gap-4">
                <div className="flex-1">
                  <div className="text-2xl md:text-3xl font-bold text-white">500+</div>
                  <div className="text-xs md:text-sm text-white/80">Estudantes</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="flex-1">
                  <div className="text-2xl md:text-3xl font-bold text-white">50+</div>
                  <div className="text-xs md:text-sm text-white/80">Eventos</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="flex-1">
                  <div className="text-2xl md:text-3xl font-bold text-white">15+</div>
                  <div className="text-xs md:text-sm text-white/80">Países</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;