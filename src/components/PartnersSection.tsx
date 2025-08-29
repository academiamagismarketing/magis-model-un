import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Handshake, 
  Award, 
  Users, 
  Globe,
  Star
} from 'lucide-react';
import { patrocinadoresApi, Patrocinador } from '@/lib/supabase';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const PartnersSection = () => {
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPatrocinadores();
  }, []);

  const loadPatrocinadores = async () => {
    try {
      setLoading(true);
      const data = await patrocinadoresApi.getPublicPatrocinadores();
      setPatrocinadores(data);
    } catch (error) {
      console.error('Erro ao carregar patrocinadores:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="parceiros" className="py-16 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando parceiros...</p>
          </div>
        </div>
      </section>
    );
  }

  if (patrocinadores.length === 0) {
    return null; // Não exibe a seção se não há patrocinadores
  }

  return (
    <section id="parceiros" className="py-16 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Handshake className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Nossos Parceiros
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Trabalhamos com as principais organizações e sistemas de simulação 
            para oferecer experiências únicas e de alta qualidade.
          </p>
        </div>

        {/* Carousel de Parceiros */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Star className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-xl font-semibold text-foreground">
              Nossos Parceiros
            </h3>
          </div>
          
          {/* Swiper Carousel */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="partner-swiper"
          >
            {patrocinadores.map((patrocinador) => (
              <SwiperSlide key={patrocinador.id}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
                  <CardContent className="p-6 text-center">
                    <a 
                      href={patrocinador.link || '#'} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block h-full flex flex-col justify-between"
                      onClick={(e) => {
                        if (!patrocinador.link) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <div>
                        <div className="mb-4">
                          {patrocinador.logo_url ? (
                            <img 
                              src={patrocinador.logo_url} 
                              alt={`Logo ${patrocinador.nome}`}
                              className="h-16 w-auto mx-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          ) : (
                            <div className="h-16 w-auto mx-auto flex items-center justify-center">
                              <span className="text-2xl font-bold text-muted-foreground">
                                {patrocinador.nome}
                              </span>
                            </div>
                          )}
                        </div>
                        <h4 className="font-semibold text-foreground mb-2 text-center">
                          {patrocinador.nome}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3 text-center">
                          {patrocinador.descricao || patrocinador.nome_completo}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs mt-2 mx-auto">
                        {patrocinador.categoria}
                      </Badge>
                    </a>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
