import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Filter, Search, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import studentsImage from '@/assets/students-mun.jpg';
import eventosImage from '@/assets/imagens/8.jpg';
import { eventsApi } from '@/lib/supabase';

// Interface para eventos
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: string;
  image_url?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  category: string;
  price?: string;
  registration_deadline?: string;
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
        location: event.location,
        participants: event.participants,
        image_url: event.image_url || studentsImage, // Usar imagem padrão se não houver
        status: event.status as 'upcoming' | 'ongoing' | 'completed',
        category: event.category,
        price: event.price ? `R$ ${event.price.toFixed(2).replace('.', ',')}` : 'Gratuito',
        registration_deadline: event.registration_deadline,
        created_at: event.created_at,
        updated_at: event.updated_at
      }));

      setEvents(eventsData);
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
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    // Filtrar por categoria
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    setFilteredEvents(filtered);
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

  const getStatusBadge = (status: string) => {
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
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const categories = ['Simulação ONU', 'Workshop', 'Preparatório', 'Conferência'];
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
        <title>Eventos Academia MAGIS | Simulações MUN, Workshops e Conferências Acadêmicas</title>
        <meta name="description" content="Descubra os eventos parceiros da Academia MAGIS: simulações MUN, workshops de diplomacia, conferências acadêmicas e oportunidades únicas para estudantes." />
        <meta name="keywords" content="eventos academia MAGIS, simulações MUN, workshops diplomacia, conferências acadêmicas, eventos acadêmicos Brasil, MUN eventos" />
        <meta name="author" content="Academia MAGIS" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Eventos Academia MAGIS | Simulações MUN e Workshops" />
        <meta property="og:description" content="Descubra os eventos parceiros da Academia MAGIS: simulações MUN, workshops de diplomacia e conferências acadêmicas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://academiamagis.com.br/eventos" />
        <meta property="og:image" content="https://academiamagis.com.br/og-image.jpg" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eventos Academia MAGIS | Simulações MUN e Workshops" />
        <meta name="twitter:description" content="Descubra os eventos parceiros da Academia MAGIS: simulações MUN, workshops de diplomacia e conferências acadêmicas." />
        
        {/* Schema.org */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Eventos Academia MAGIS",
            "description": "Simulações MUN, workshops de diplomacia e conferências acadêmicas",
            "organizer": {
              "@type": "Organization",
              "name": "Academia MAGIS"
            },
            "url": "https://academiamagis.com.br/eventos"
          })}
        </script>
        
        {/* Canonical */}
        <link rel="canonical" href="https://academiamagis.com.br/eventos" />
      </Helmet>

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
                Nossos Eventos
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              Descubra os eventos parceiros da Academia MAGIS e participe das melhores oportunidades acadêmicas do Brasil!
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
                          {getStatusBadge(event.status)}
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
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-2" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Users className="w-4 h-4 mr-2" />
                            {event.participants}
                          </div>
                          {event.price && (
                            <div className="flex items-center text-primary font-semibold">
                              <Clock className="w-4 h-4 mr-2" />
                              {event.price}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button 
                            onClick={() => handleWhatsApp(event)}
                            variant="outline"
                            className="btn-outline"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Quero Participar
                          </Button>
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
