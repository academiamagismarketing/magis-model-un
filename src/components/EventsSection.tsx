import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import studentsImage from '@/assets/students-mun.jpg';

const EventsSection = () => {
  const events = [
    {
      id: 1,
      title: "SIMONU São Paulo 2024",
      date: "15-17 Março 2024",
      location: "Centro de Convenções Rebouças",
      participants: "200+ delegados",
      image: studentsImage,
      description: "Simulação completa da ONU com comitês especializados em questões de segurança internacional e desenvolvimento sustentável.",
      status: "upcoming"
    },
    {
      id: 2,
      title: "Workshop de Diplomacia",
      date: "8 Abril 2024",
      location: "Academia Magis - Online",
      participants: "50 estudantes",
      image: studentsImage,
      description: "Curso intensivo sobre técnicas de negociação, protocolo diplomático e elaboração de resoluções.",
      status: "upcoming"
    },
    {
      id: 3,
      title: "MINIMUN Preparatório",
      date: "22 Maio 2024",
      location: "Universidade de São Paulo",
      participants: "150 participantes",
      image: studentsImage,
      description: "Evento preparatório para novos delegados com simulações práticas e mentoria especializada.",
      status: "upcoming"
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os eventos da Academia Magis.', '_blank');
  };

  return (
    <section id="eventos" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Próximos <span className="text-gradient">Eventos</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Participe de simulações da ONU e workshops especializados que preparam você 
            para ser um líder em diplomacia internacional.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <Card key={event.id} className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-diplomatic border-0 bg-card">
              <div className="relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-diplomatic"
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {event.status === 'upcoming' ? 'Em Breve' : 'Passado'}
                  </span>
                </div>
              </div>
              
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-montserrat group-hover:text-primary transition-smooth">
                  {event.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {event.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {event.participants}
                  </div>
                </div>
                
                <Button 
                  onClick={handleWhatsApp}
                  variant="diplomatic"
                  className="w-full"
                >
                  Quero Participar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-2xl p-12 border border-primary/10">
          <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
            Não Perca Nossos Próximos Eventos
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Receba informações exclusivas sobre nossos eventos, workshops e simulações. 
            Entre em contato conosco e garante sua vaga.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={handleWhatsApp}
              variant="diplomatic"
            >
              <Clock className="w-4 h-4 mr-2" />
              Agenda uma Conversa
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-diplomatic font-semibold"
            >
              Ver Todos os Eventos
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;