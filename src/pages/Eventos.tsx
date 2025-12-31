import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import SchemaMarkup from '@/components/SchemaMarkup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, DollarSign, ArrowLeft, Filter, Search, MessageSquare, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import studentsImage from '@/assets/students-mun.jpg';
import eventosImage from '@/assets/imagens/8.jpg';
import { eventsApi } from '@/lib/supabase';
import { generateEventPageSchemas } from '@/utils/schemaMarkup';

// Interface para eventos
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  start_date?: string;
  end_date?: string;
  location: string;
  participants: string;
  image_url?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  category: string;
  price?: string;
  registration_deadline?: string;
  registration_start_date?: string;
  is_partner_event?: boolean;
  event_link?: string;
  created_at: string;
  updated_at: string;
}

const Eventos = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [schemas, setSchemas] = useState<any[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, searchTerm, statusFilter, categoryFilter]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      
      // Buscar eventos do Supabase com ordenação inteligente
      const data = await eventsApi.getPublicEvents();

      // Mapear dados do Supabase para o formato esperado
      const eventsData: Event[] = (data || []).map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        date: event.date,
        start_date: event.start_date,
        end_date: event.end_date,
        location: event.location,
        participants: event.participants,
        image_url: event.image_url || studentsImage, // Usar imagem padrão se não houver
        status: event.status as 'upcoming' | 'ongoing' | 'completed',
        category: event.category,
        price: event.price ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito',
        registration_deadline: event.registration_deadline,
        registration_start_date: event.registration_start_date,
        is_partner_event: event.is_partner_event,
        event_link: event.event_link,
        created_at: event.created_at,
        updated_at: event.updated_at
      }));

      // Ordenar eventos por prioridade: upcoming > ongoing > completed
      const sortedEvents = eventsData.sort((a, b) => {
        const statusPriority = {
          'upcoming': 1,
          'ongoing': 2,
          'completed': 3
        };
        
        return statusPriority[getEventStatus(a)] - statusPriority[getEventStatus(b)];
      });

      setEvents(sortedEvents);
      
      // Gerar schemas para microdata
      const eventSchemas = generateEventPageSchemas(sortedEvents);
      setSchemas(eventSchemas);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(event => getEventStatus(event) === statusFilter);
    }

    // Filtrar por categoria
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    // Ordenar eventos filtrados por prioridade: upcoming > ongoing > completed
    const sortedFiltered = filtered.sort((a, b) => {
      const statusPriority = {
        'upcoming': 1,
        'ongoing': 2,
        'completed': 3
      };
      
      return statusPriority[getEventStatus(a)] - statusPriority[getEventStatus(b)];
    });

    setFilteredEvents(sortedFiltered);
  };

  const handleWhatsApp = (event: Event) => {
    const message = `Olá! Gostaria de me inscrever no evento "${event.title}" que acontece em ${event.date}. Pode me enviar mais informações?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
  };

  const handleGeneralWhatsApp = () => {
    const message = `Olá! Gostaria de saber mais sobre os eventos da Academia MAGIS. Pode me enviar informações sobre próximos eventos?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/553191578389?text=${encodedMessage}`, '_blank');
  };

  // Função para criar data local sem problemas de fuso horário
  const createLocalDate = (dateString: string): Date => {
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day); // month é 0-indexed
    }
    return new Date(dateString);
  };

  // Função para determinar o status baseado nas datas
  const getEventStatus = (event: Event): 'upcoming' | 'ongoing' | 'completed' => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zerar horas para comparação apenas de data
    
    // Se tem start_date e end_date, usar essas datas
    if (event.start_date && event.end_date) {
      const startDate = createLocalDate(event.start_date);
      const endDate = createLocalDate(event.end_date);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999); // Final do dia
      
      if (today < startDate) {
        return 'upcoming';
      } else if (today >= startDate && today <= endDate) {
        return 'ongoing';
      } else {
        return 'completed';
      }
    }
    
    // Fallback para data única (compatibilidade com eventos antigos)
    const eventDate = createLocalDate(event.date);
    eventDate.setHours(0, 0, 0, 0);
    
    if (today < eventDate) {
      return 'upcoming';
    } else if (today.getTime() === eventDate.getTime()) {
      return 'ongoing';
    } else {
      return 'completed';
    }
  };

  const getStatusBadge = (status: 'upcoming' | 'ongoing' | 'completed') => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-green-100 text-green-800">Em Breve</Badge>;
      case 'ongoing':
        return <Badge className="bg-blue-100 text-blue-800">Em Andamento</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Concluído</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Desconhecido</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    // Corrigir problema de fuso horário
    // Se a string está no formato YYYY-MM-DD, criar a data localmente
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day); // month é 0-indexed
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    
    // Fallback para outros formatos
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const categories = ['Simulações Temáticas', 'Workshop', 'Preparatório', 'Conferência', 'Congresso', 'Outros'];
  const statuses = ['upcoming', 'ongoing', 'completed'];

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando eventos...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* SEO Head */}
      <Helmet>
        <title>Eventos Academia MAGIS | Simulações Temáticas e Workshops</title>
        <meta name="description" content="Confira os próximos eventos que a Academia MAGIS irá participar!" />
        <meta name="keywords" content="eventos academia MAGIS, Simulações Temáticas, workshops diplomacia, conferências acadêmicas, eventos acadêmicos Brasil" />
        <meta name="author" content="Academia MAGIS" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Eventos Academia MAGIS | Simulações Temáticas e Workshops" />
        <meta property="og:description" content="Confira os próximos eventos que a Academia MAGIS irá participar!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://academiamagis.com.br/eventos" />
        <meta property="og:image" content="https://academiamagis.com.br/og-image.jpg" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eventos Academia MAGIS | Simulações Temáticas e Workshops" />
        <meta name="twitter:description" content="Confira os próximos eventos que a Academia MAGIS irá participar!" />
        
        
        {/* Canonical */}
        <link rel="canonical" href="https://academiamagis.com/eventos" />
      </Helmet>

      {/* Schema.org Microdata */}
      <SchemaMarkup schemas={schemas} />

      <div className="min-h-screen">
        <main>
          {/* Hero Section */}
          <section className="relative pt-40 pb-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={eventosImage} 
              alt="Eventos Academia MAGIS" 
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Eventos
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Confira os próximos eventos que a Academia MAGIS irá participar!
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-muted border-b section-decor">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Todos os Status</option>
                  <option value="upcoming">Em Breve</option>
                  <option value="ongoing">Em Andamento</option>
                  <option value="completed">Concluído</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">Todas as Categorias</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-20 bg-background section-decor">
          <div className="container mx-auto px-4">
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
                  Nenhum evento encontrado
                </h3>
                <p className="text-muted-foreground mb-8">
                  Tente ajustar os filtros ou entre em contato conosco para saber sobre próximos eventos.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setCategoryFilter('all');
                  }}
                  className="btn-primary"
                >
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-display font-bold mb-4 text-foreground">
                    Eventos Disponíveis
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event, index) => (
                    <Card key={event.id} className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-diplomatic border-0 bg-card">
                      <div className="relative overflow-hidden">
                        <img 
                          src={event.image_url || studentsImage} 
                          alt={event.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-diplomatic"
                        />
                        <div className="absolute top-4 left-4">
                          {getStatusBadge(getEventStatus(event))}
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-primary text-primary-foreground">
                            {event.category}
                          </Badge>
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
                          {/* Data do Evento */}
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                            {event.start_date && event.end_date ? (
                              <span className="text-sm">
                                {formatDate(event.start_date)} a {formatDate(event.end_date)}
                              </span>
                            ) : (
                              <span className="text-sm">{formatDate(event.date)}</span>
                            )}
                          </div>
                          
                          {/* Localização */}
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                          
                          {/* Participantes */}
                          <div className="flex items-center text-muted-foreground">
                            <Users className="w-4 h-4 mr-2" />
                            {event.participants}
                          </div>
                          
                          {/* Tipo de Participação */}
                          <div className={`flex items-center text-sm font-medium ${
                            event.is_partner_event 
                              ? 'text-blue-600' 
                              : 'text-gray-600'
                          }`}>
                            <div className={`w-3 h-3 rounded-full mr-2 ${
                              event.is_partner_event 
                                ? 'bg-blue-500' 
                                : 'bg-gray-500'
                            }`}></div>
                            {event.is_partner_event ? 'Evento Parceiro' : 'Presença Confirmada'}
                          </div>
                          
                          {/* Preço */}
                          {event.price && (
                            <div className="flex items-center text-primary font-semibold">
                              <DollarSign className="w-4 h-4 mr-2" />
                              {event.price}
                            </div>
                          )}
                          
                          {/* Início das Inscrições */}
                          {event.registration_start_date && (
                            <div className="flex items-center text-muted-foreground text-xs">
                              <Calendar className="w-3 h-3 mr-2" />
                              Inscrições a partir de {formatDate(event.registration_start_date)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {/* Botão principal baseado no tipo de evento */}
                          {event.event_link ? (
                            <Button 
                              onClick={() => window.open(event.event_link, '_blank')}
                              variant="default"
                              className="btn-primary"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Acessar Evento
                            </Button>
                          ) : (
                            <Button 
                              onClick={() => handleWhatsApp(event)}
                              variant="outline"
                              className="btn-outline"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Quero Participar
                            </Button>
                          )}
                          
                          {/* Botão secundário para WhatsApp se houver link */}
                          {event.event_link && (
                            <Button 
                              onClick={() => handleWhatsApp(event)}
                              variant="outline"
                              size="sm"
                              className="btn-outline"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Mais Informações
                            </Button>
                          )}
                          
                          {/* Data limite de inscrições */}
                          {event.registration_deadline && (
                            <p className="text-xs text-muted-foreground text-center">
                              Inscrições até {formatDate(event.registration_deadline)}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted section-decor">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Não encontrou o evento ideal?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Entre em contato conosco e descubra sobre eventos personalizados, workshops corporativos ou simulações específicas para sua instituição.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGeneralWhatsApp}
                size="lg"
                variant="default"
                className="btn-primary"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>
              <Button
                onClick={() => navigate('/contato')}
                size="lg"
                variant="outline"
                className="btn-outline"
              >
                Outras Formas de Contato
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
    </>
  );
};

export default Eventos;
