import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Award, Globe, Heart, ExternalLink } from 'lucide-react';

import heroImage from '../assets/hero-diplomatic.jpg';

const HeroSection = () => {
  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia MAGIS.', '_blank');
  };

  const handleVakinha = () => {
    window.open('https://www.vakinha.com.br/vaquinha/nos-ajude-a-conceder-bolsas-de-estudo-para-jovens', '_blank');
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Academia MAGIS - Diplomacia Internacional"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-primary/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="text-center text-white mb-16">
            {/* Brand */}
            <div className="mb-12">
              <div className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-8">
                ACADEMIA <span className="text-gradient-primary">MAGIS</span>
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-tight">
              Formando <span className="text-gradient-primary">Líderes</span><br />
              do <span className="text-gradient-primary">Amanhã</span>
            </h1>
            
            {/* Slogan */}
            <p className="text-xl md:text-2xl font-display italic mb-8 opacity-90 leading-relaxed max-w-4xl mx-auto">
              "Não queremos realizar sonhos,<br />
              queremos permitir que as pessoas sonhem."
            </p>
            
            {/* Description */}
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95">
              Acreditamos que o mundo acadêmico deve ser acessível para todos. 
              Lutamos para democratizar estes espaços e torná-los cada vez mais diversos.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 max-w-2xl mx-auto">
            <Button 
              size="lg" 
              onClick={handleWhatsApp}
              variant="default"
              className="btn-primary px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Fale Conosco
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/#eventos'}
              variant="outline"
              className="btn-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Conheça Nossos Eventos
            </Button>
          </div>

          {/* Donation CTA */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/30 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary mr-2" />
                <h3 className="text-xl font-semibold text-white">Ajude-nos a Transformar Vidas</h3>
              </div>
              <p className="text-white/90 mb-4">
                Sua doação ajuda jovens em vulnerabilidade socioeconômica a participarem de simulações da ONU
              </p>
              <Button 
                onClick={handleVakinha}
                variant="outline"
                className="btn-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Fazer Doação
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Users className="w-10 h-10 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold mb-2 text-white">500+</div>
              <div className="text-sm opacity-90 text-white">Estudantes Formados</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Award className="w-10 h-10 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold mb-2 text-white">50+</div>
              <div className="text-sm opacity-90 text-white">Eventos Realizados</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <Globe className="w-10 h-10 mx-auto mb-4 text-primary" />
              <div className="text-4xl font-bold mb-2 text-white">15+</div>
              <div className="text-sm opacity-90 text-white">Países Representados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;