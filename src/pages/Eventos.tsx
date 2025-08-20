import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Filter, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import studentsImage from '@/assets/students-mun.jpg';
import eventosImage from '@/assets/imagens/8.jpg';

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
      // Dados mock estáticos
      const mockEvents: Event[] = [
        {
          id: '1',
          title: "SIMONU São Paulo 2024",
          description: "Simulação completa da ONU com comitês especializados em questões de segurança internacional e desenvolvimento sustentável. Evento presencial com 200+ delegados.",
          date: "2024-03-15",
          location: "Centro de Convenções Rebouças, São Paulo",
          participants: "200+ delegados",
          image_url: studentsImage,
          status: "upcoming",
          category: "Simulação ONU",
          price: "R$ 150,00",
          registration_deadline: "2024-03-10",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: "Workshop de Diplomacia",
          description: "Curso intensivo sobre técnicas de negociação, protocolo diplomático e elaboração de resoluções. Ideal para iniciantes.",
          date: "2024-04-08",
          location: "Academia Magis - Online",
          participants: "50 estudantes",
          image_url: studentsImage,
          status: "upcoming",
          category: "Workshop",
          price: "R$ 80,00",
          registration_deadline: "2024-04-05",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          title: "MINIMUN Preparatório",
          description: "Evento preparatório para novos delegados com simulações práticas e mentoria especializada. Perfeito para quem está começando.",
          date: "2024-05-22",
          location: "Universidade de São Paulo",
          participants: "150 participantes",
          image_url: studentsImage,
          status: "upcoming",
          category: "Preparatório",
          price: "R$ 120,00",
          registration_deadline: "2024-05-15",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          title: "Conferência de Relações Internacionais",
          description: "Conferência anual com palestrantes internacionais sobre temas atuais de diplomacia e política internacional.",
          date: "2024-06-10",
          location: "Auditório da Academia Magis",
          participants: "300+ participantes",
          image_url: studentsImage,
          status: "upcoming",
          category: "Conferência",
          price: "R$ 200,00",
          registration_deadline: "2024-06-01",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      
      setEvents(mockEvents);
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
        <Navbar />
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
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={eventosImage} 
              alt="Eventos Academia Magis" 
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/70 to-primary/50"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Button
                onClick={() => navigate('/')}
                className="mb-8 btn-white"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Início
              </Button>
              
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Nossos Eventos
              </h1>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
                Descubra todos os eventos da Academia Magis e participe das melhores 
                simulações da ONU e workshops de diplomacia do Brasil.
              </p>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-muted border-b">
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
        <section className="py-20 bg-background">
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
                  {filteredEvents.map((event) => (
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
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
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
                            className="w-full btn-outline"
                          >
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
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
              Não Encontrou o Evento Ideal?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Entre em contato conosco e descubra sobre eventos personalizados, 
              workshops corporativos ou simulações específicas para sua instituição.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber sobre eventos personalizados da Academia Magis.', '_blank')}
                size="lg"
                className="btn-primary"
              >
                Falar no WhatsApp
              </Button>
              <Button
                onClick={() => navigate('/contato')}
                size="lg"
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
  );
};

export default Eventos;
