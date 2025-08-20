import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Award, 
  Globe, 
  Calendar,
  MessageSquare
} from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '500+',
      label: 'Delegados Formados',
      description: 'Estudantes que participaram de nossos eventos'
    },
    {
      icon: Award,
      value: '50+',
      label: 'Prêmios Conquistados',
      description: 'Reconhecimentos em competições nacionais'
    },
    {
      icon: Globe,
      value: '15+',
      label: 'Países Representados',
      description: 'Participação internacional em eventos'
    },
    {
      icon: Calendar,
      value: '25+',
      label: 'Eventos Realizados',
      description: 'Simulações e workshops organizados'
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia Magis e nossos resultados.', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
            Nossos <span className="text-primary">Números</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Resultados que comprovam nossa excelência e compromisso com a 
            formação de líderes em diplomacia e debate.
          </p>
        </div>

        {/* Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Faça parte do nosso sucesso!
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Junte-se à Academia Magis e desenvolva habilidades que vão 
              transformar sua carreira e sua vida.
            </p>
            <Button onClick={handleWhatsApp} variant="default" className="btn-primary">
              <MessageSquare className="w-4 h-4 mr-2" />
              Fale Conosco
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;