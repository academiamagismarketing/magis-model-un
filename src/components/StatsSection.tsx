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
      description: 'Simulações Termáticas e outros eventos'
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre a Academia MAGIS e nossos resultados.', '_blank');
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
            Nossos Resultados
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça alguns dos nossos principais indicadores e conquistas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-card text-center p-8 hover:shadow-lg transition-shadow">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold text-foreground">{stat.value}</h3>
                <h4 className="text-xl font-semibold text-foreground">{stat.label}</h4>
                <p className="text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button onClick={handleWhatsApp} size="lg" className="btn-primary">
            <MessageSquare className="w-4 h-4 mr-2" />
            Saiba Mais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;