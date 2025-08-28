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

        {/* Todos os Parceiros em Linha Única */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Star className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-xl font-semibold text-foreground">
              Nossos Parceiros
            </h3>
          </div>
          
          {/* Container com scroll horizontal para mobile */}
          <div className="overflow-x-auto">
            <div className="flex gap-6 min-w-max px-4">
              {partners.map((partner) => (
                <Card key={partner.name} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 min-w-[200px] max-w-[250px] flex-shrink-0">
                  <CardContent className="p-6 text-center">
                    <a href={partner.link} target="_blank" rel="noopener noreferrer" className="block">
                      <div className="mb-4">
                        <img 
                          src={partner.logo} 
                          alt={`Logo ${partner.name}`}
                          className="h-16 w-auto mx-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {partner.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {partner.description}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {partner.category}
                      </Badge>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
