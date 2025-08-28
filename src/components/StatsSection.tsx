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
      value: '80+',
      label: 'Delegados',
      description: 'Estudantes que participaram de nossos eventos'
    },
    {
      icon: Award,
      value: '50+',
      label: 'Prêmios Conquistados',
      description: 'Reconhecimentos em competições nacionais'
    },
    {
      icon: Calendar,
      value: '10+',
      label: 'Eventos Participados',
      description: 'Simulações da ONU e outros eventos'
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia MAGIS e nossos resultados.', '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold text-foreground mb-4">
            Nossos Resultados
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Números que refletem nosso compromisso com a excelência em educação diplomática
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 border-primary/20">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                  <h4 className="text-xl font-semibold text-foreground mb-2">{stat.label}</h4>
                  <p className="text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleWhatsApp}
            size="lg"
            className="btn-primary text-lg px-8 py-3"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Conheça Nossos Resultados
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;