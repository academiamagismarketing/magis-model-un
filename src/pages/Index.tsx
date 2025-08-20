import React from 'react';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import EventsSection from '@/components/EventsSection';
import StatsSection from '@/components/StatsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <EventsSection />
      <PartnersSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default Index;