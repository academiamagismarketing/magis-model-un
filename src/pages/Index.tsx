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
        <title>Academia MAGIS - Simulações Acadêmicas, Mentorias e MUN | Formando Líderes</title>
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
        
        {/* Schema.org - Microdata Estruturado */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "name": "Academia MAGIS",
            "alternateName": "MAGIS Academy",
            "description": "Academia especializada em simulações acadêmicas, mentorias educacionais e atividades MUN (Modelo das Nações Unidas)",
            "url": "https://academiamagis.com.br",
            "logo": "https://academiamagis.com.br/logo_magis.svg",
            "image": "https://academiamagis.com.br/og-image.jpg",
            "foundingDate": "2023",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Belo Horizonte",
              "addressRegion": "MG",
              "addressCountry": "BR"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+55-31-9157-8389",
              "contactType": "customer service",
              "email": "institucional@academiamagis.com"
            },
            "sameAs": [
              "https://www.instagram.com/academiamagis",
              "https://www.linkedin.com/company/academiamagis"
            ],
            "offers": [
              {
                "@type": "Offer",
                "name": "Simulações Acadêmicas MUN",
                "description": "Simulações da ONU e atividades diplomáticas",
                "price": "0",
                "priceCurrency": "BRL"
              },
              {
                "@type": "Offer",
                "name": "Mentorias Educacionais",
                "description": "Programas de mentoria gratuitos para estudantes",
                "price": "0",
                "priceCurrency": "BRL"
              },
              {
                "@type": "Offer",
                "name": "Workshops de Liderança",
                "description": "Desenvolvimento de habilidades de liderança acadêmica",
                "price": "0",
                "priceCurrency": "BRL"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Programas Educacionais",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Simulações MUN",
                    "description": "Modelo das Nações Unidas"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Mentorias",
                    "description": "Acompanhamento educacional"
                  }
                }
              ]
            },
            "areaServed": {
              "@type": "Country",
              "name": "Brasil"
            },
            "audience": {
              "@type": "Audience",
              "audienceType": "Estudantes do ensino médio e superior"
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

      {/* Seção de Palavras-chave para SEO */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-6 text-foreground">
              Especialistas em Simulações Acadêmicas e MUN
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-3 text-primary">Academia MAGIS</h4>
                <p className="text-sm text-muted-foreground">
                  Líder nacional em simulações acadêmicas e desenvolvimento de liderança entre jovens estudantes.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-3 text-primary">Simulações Acadêmicas</h4>
                <p className="text-sm text-muted-foreground">
                  Programas práticos de simulação da ONU, workshops de diplomacia e atividades MUN.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold mb-3 text-primary">Mentorias Educacionais</h4>
                <p className="text-sm text-muted-foreground">
                  Acompanhamento personalizado para desenvolvimento acadêmico e profissional.
                </p>
              </div>
            </div>
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