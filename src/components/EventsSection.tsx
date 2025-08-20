import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight,
  Star,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EventsSection = () => {
  const navigate = useNavigate();

  const upcomingEvents = [
    {
      id: 1,
      title: 'SIMONU São Paulo 2024',
      date: '15-17 de Novembro',
      location: 'Centro de Convenções Rebouças',
      participants: '200+ delegados',
      category: 'Simulação ONU',
      status: 'Inscrições Abertas',
      featured: true
    },
    {
      id: 2,
      title: 'Workshop de Diplomacia',
      date: '25 de Outubro',
      location: 'Auditório Principal',
      participants: '50 participantes',
      category: 'Workshop',
      status: 'Em Breve',
      featured: false
    },
    {
      id: 3,
      title: 'Conferência Internacional',
      date: '10-12 de Dezembro',
      location: 'Hotel Internacional',
      participants: '150+ participantes',
      category: 'Conferência',
      status: 'Pré-inscrições',
      featured: false
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre os eventos da Academia Magis.', '_blank');
  };

  return (
    <section id="eventos" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-8 h-8 text-primary mr-3" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Próximos Eventos
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Participe dos nossos eventos exclusivos e desenvolva habilidades 
            de liderança, diplomacia e debate.
          </p>
        </div>

        {/* Eventos em Destaque */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <Star className="w-5 h-5 text-primary mr-2" />
            <h3 className="text-xl font-semibold text-foreground">
              Evento em Destaque
            </h3>
          </div>
          
          {upcomingEvents.filter(e => e.featured).map((event) => (
            <Card key={event.id} className="max-w-4xl mx-auto border-2 border-primary/20 hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center mb-2">
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    {event.status}
                  </Badge>
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary mr-2" />
                    <span className="text-foreground font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    <span className="text-foreground font-medium">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary mr-2" />
                    <span className="text-foreground font-medium">{event.participants}</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleWhatsApp} variant="default" className="btn-primary">
                    <Clock className="w-4 h-4 mr-2" />
                    Garanta Sua Vaga
                  </Button>
                  <Button onClick={() => navigate('/eventos')} variant="outline" className="btn-outline">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Ver Todos os Eventos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Outros Eventos */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-foreground text-center mb-8">
            Outros Eventos
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {upcomingEvents.filter(e => !e.featured).map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {event.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {event.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="w-4 h-4 mr-2" />
                      {event.participants}
                    </div>
                    <div className="mt-3">
                      <Badge variant="outline" className="text-xs">
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button onClick={() => navigate('/eventos')} variant="default" className="btn-primary">
            Ver Todos os Eventos
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;