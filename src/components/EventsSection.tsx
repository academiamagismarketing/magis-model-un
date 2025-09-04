import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight,
  Star,
  Clock,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { eventsApi } from '@/lib/supabase';

const EventsSection = () => {
  const navigate = useNavigate();
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      
      // Buscar eventos do Supabase com ordenação inteligente
      const data = await eventsApi.getPublicEvents();

      // Mapear dados do Supabase para o formato esperado
      const eventsData = (data || []).map((event, index) => ({
        id: event.id,
        title: event.title,
        date: new Date(event.date).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }),
        location: event.location,
        participants: event.participants,
        category: event.category,
        status: event.status === 'upcoming' ? 'Em Breve' : 'Em Andamento',
        featured: index === 0 // Primeiro evento é destaque
      }));

      setUpcomingEvents(eventsData);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      // Definir eventos padrão em caso de erro
      setUpcomingEvents([
        {
          id: 'default-event',
          title: 'Simulação MUN 2024',
          date: '15/12/2024',
          location: 'Belo Horizonte, MG',
          participants: '50 participantes',
          category: 'Simulação ONU',
          status: 'Em Breve',
          featured: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre os eventos da Academia MAGIS.', '_blank');
  };

  if (loading) {
    return (
      <section id="eventos" className="py-16 bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando eventos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="eventos" className="py-16 bg-gradient-to-br from-background to-muted/20">
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
          
          {upcomingEvents.length === 0 ? (
            <Card className="max-w-4xl mx-auto border-2 border-primary/20">
              <CardContent className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Nenhum evento programado no momento</p>
                <Button onClick={handleWhatsApp} variant="outline" className="btn-outline">
                  Entre em Contato
                </Button>
              </CardContent>
            </Card>
          ) : (
            upcomingEvents.filter(e => e.featured).map((event) => (
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
          ))
          )}
        </div>

        {/* Outros Eventos */}
        {(() => {
          const otherEvents = upcomingEvents.filter(e => !e.featured);
          
          // Só mostra a seção se há mais de 1 evento total ou se há outros eventos além do destacado
          if (otherEvents.length === 0 || upcomingEvents.length <= 1) {
            return null; // Não mostra a seção se não há outros eventos ou se há apenas 1 evento total
          }
          
          return (
            <div className="mb-12">
              <h3 className="text-xl font-semibold text-foreground text-center mb-8">
                Outros Eventos
              </h3>
              
              <div className={`grid gap-6 max-w-4xl mx-auto ${
                otherEvents.length === 1 
                  ? 'grid-cols-1 md:grid-cols-1' // Centraliza quando há apenas 1 outro evento
                  : 'grid-cols-1 md:grid-cols-2' // Grid normal quando há 2 ou mais outros eventos
              }`}>
                {otherEvents.map((event) => (
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
          );
        })()}

        {/* CTA */}
        <div className="text-center">
          {upcomingEvents.length > 1 ? (
            <Button onClick={() => navigate('/eventos')} variant="default" className="btn-primary">
              Ver Todos os Eventos
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleWhatsApp} variant="default" className="btn-primary">
              <MessageSquare className="w-4 h-4 mr-2" />
              Entre em Contato
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;