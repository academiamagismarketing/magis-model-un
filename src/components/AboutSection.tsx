import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import aboutImage from '../assets/imagens/1.jpg';

const AboutSection = () => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/sobre');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={aboutImage} 
          alt="Academia Magis - Sobre Nós"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
            Sobre Nós
          </h2>
          
          {/* Description */}
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-95">
            Nossa conferência busca simular as complexidades das relações internacionais, 
            oferecendo aos participantes uma experiência educacional transformadora que 
            os prepara para se tornarem futuros líderes. Clique aqui para conhecer mais 
            sobre nossa história e missão!
          </p>
          
          {/* CTA Button */}
          <Button 
            size="lg" 
            onClick={handleLearnMore}
            variant="outline"
            className="btn-white px-8 py-4 text-lg font-semibold transition-all duration-300"
          >
            Saiba Mais
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
