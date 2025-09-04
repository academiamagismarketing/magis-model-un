import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/HeroSection';
import EventsSection from '@/components/EventsSection';
import PartnersSection from '@/components/PartnersSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Target, MessageSquare, GraduationCap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* SEO Head */}
      <Helmet>
        <title>Academia MAGIS - Simulações & Mentorias Acadêmicas | Líderes do Futuro</title>
        <meta name="description" content="Descubra como participar de simulações acadêmicas, mentorias educacionais e atividades MUN na Academia MAGIS. Formamos as próximas gerações de líderes diplomáticos e internacionais." />
        <meta name="keywords" content="simulações acadêmicas, mentorias educacionais, MUN, Modelo das Nações Unidas, diplomacia, relações internacionais, academia MAGIS, workshops, liderança acadêmica" />
        <meta name="author" content="Academia MAGIS" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Academia MAGIS - Simulações & Mentorias Acadêmicas" />
        <meta property="og:description" content="Descubra como participar de simulações acadêmicas, mentorias educacionais e atividades MUN na Academia MAGIS." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://academiamagis.com.br" />
        <meta property="og:image" content="https://academiamagis.com.br/og-image.jpg" />
        <meta property="og:site_name" content="Academia MAGIS" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Academia MAGIS - Simulações & Mentorias Acadêmicas" />
        <meta name="twitter:description" content="Descubra como participar de simulações acadêmicas, mentorias educacionais e atividades MUN na Academia MAGIS." />
        <meta name="twitter:image" content="https://academiamagis.com.br/og-image.jpg" />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Academia MAGIS",
            "description": "Academia especializada em simulações acadêmicas, mentorias educacionais e atividades MUN",
            "url": "https://academiamagis.com.br",
            "logo": "https://academiamagis.com.br/logo_magis.svg",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR"
            },
            "sameAs": [
              "https://www.instagram.com/academiamagis",
              "https://www.linkedin.com/company/academiamagis"
            ],
            "offers": {
              "@type": "Offer",
              "description": "Simulações acadêmicas, mentorias e workshops gratuitos"
            }
          })}
        </script>
        
        {/* Canonical */}
        <link rel="canonical" href="https://academiamagis.com.br" />
      </Helmet>

      <HeroSection />

      {/* Sobre - Teaser compacto e consistente */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-4 text-foreground">
              Sobre a Academia MAGIS
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A Academia MAGIS democratiza o acesso a oportunidades acadêmicas por meio de
              simulações da ONU, workshops e mentorias para formar as próximas gerações de líderes.
            </p>

            {/* Detalhes rápidos para o usuário */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
              <div className="bg-muted rounded-xl p-4 flex items-start gap-3">
                <Target className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold text-foreground">Simulações da ONU</div>
                  <div className="text-sm text-muted-foreground">Experiência prática e preparo real para conferências.</div>
                </div>
              </div>
              <div className="bg-muted rounded-xl p-4 flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold text-foreground">Mentorias Gratuitas</div>
                  <div className="text-sm text-muted-foreground">Apoio em grupo focado em desenvolvimento acadêmico.</div>
                </div>
              </div>
              <div className="bg-muted rounded-xl p-4 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-primary mt-1" />
                <div>
                  <div className="font-semibold text-foreground">Workshops</div>
                  <div className="text-sm text-muted-foreground">Habilidades em diplomacia, negociação e liderança.</div>
                </div>
              </div>
            </div>

            <Button onClick={() => navigate('/sobre')} className="btn-primary" title="Saiba mais sobre a Academia MAGIS" aria-label="Saiba mais sobre a Academia MAGIS">
              Conheça Nossa História
            </Button>
          </div>
        </div>
      </section>

      <EventsSection />
      <PartnersSection />
      <Footer />
    </>
  );
};

export default Index;