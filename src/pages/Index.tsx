import React from 'react';
import HeroSection from '@/components/HeroSection';
import EventsSection from '@/components/EventsSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection />

      {/* Sobre - Teaser compacto e consistente */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Sobre a Academia MAGIS
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A Academia MAGIS democratiza o acesso a oportunidades acadêmicas por meio de
              simulações da ONU, workshops e mentoria para formar as próximas gerações de líderes.
            </p>
            <Button onClick={() => navigate('/sobre')} className="btn-primary">
              Conheça Nossa História
            </Button>
          </div>
        </div>
      </section>

      <StatsSection />
      <EventsSection />
      <PartnersSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default Index;