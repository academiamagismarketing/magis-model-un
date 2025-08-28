import React from 'react';
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

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Importar logos dos parceiros
import logoMocs from '../assets/parceiros/LOGO - MOCS.png';
import logoSia from '../assets/parceiros/LOGO - SIA.png';
import logoSis from '../assets/parceiros/LOGO - SIS.png';
import logoSib from '../assets/parceiros/LOGO - SIB.png';
import logoTemas from '../assets/parceiros/LOGO - TEMAS.png';

const PartnersSection = () => {
  const partners = [
    {
      name: 'MOCS',
      logo: logoMocs,
      description: 'Model United Nations Conference System',
      category: 'Sistema de Conferências',
      featured: true,
      link: 'https://www.instagram.com/mocscefet/'
    },
    {
      name: 'SIA',
      logo: logoSia,
      description: 'Sistema Internacional de Arbitragem',
      category: 'Arbitragem Internacional',
      featured: true,
      link: 'https://www.instagram.com/siacsabh/'
    },
    {
      name: 'SIS',
      logo: logoSis,
      description: 'Sistema Internacional de Simulações',
      category: 'Simulações',
      featured: true,
      link: 'https://www.instagram.com/sis.sagrado/'
    },
    {
      name: 'SIB',
      logo: logoSib,
      description: 'Sistema Internacional de Debates',
      category: 'Debates',
      featured: true,
      link: 'https://www.instagram.com/sibernou/'
    },
    {
      name: 'TEMAS',
      logo: logoTemas,
      description: 'Temas e Debates Acadêmicos',
      category: 'Debates Acadêmicos',
      featured: false,
      link: 'https://www.instagram.com/temasmg/'
    }
  ];

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
            {partners.map((partner) => (
              <SwiperSlide key={partner.name}>
                <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 h-full">
                  <CardContent className="p-6 text-center">
                    <a href={partner.link} target="_blank" rel="noopener noreferrer" className="block h-full flex flex-col justify-between">
                      <div>
                        <div className="mb-4">
                          <img 
                            src={partner.logo} 
                            alt={`Logo ${partner.name}`}
                            className="h-16 w-auto mx-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2 text-center">
                          {partner.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3 text-center">
                          {partner.description}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs mt-2 mx-auto">
                        {partner.category}
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
