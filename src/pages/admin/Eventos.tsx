import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Edit,
  Trash2,
  Eye,
  RefreshCw
} from 'lucide-react';
import { eventsApi, Event } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const AdminEventos = () => {
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
      const data = await eventsApi.getEventsWithSmartOrdering();
      setEvents(data);
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

    setFilteredEvents(filtered);
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este evento?')) {
      try {
        await eventsApi.deleteEvent(id);
        await loadEvents();
      } catch (error) {
        console.error('Erro ao excluir evento:', error);
      }
    }
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
  const getEventStatus = (event: Event): 'upcoming' | 'ongoing' | 'completed' | 'cancelled' => {
    // Se o evento foi cancelado manualmente, manter como cancelado
    if (event.status === 'cancelled') {
      return 'cancelled';
    }
    
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

  const getStatusBadge = (status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled') => {
    switch (status) {
      case 'upcoming':
        return <Badge className="bg-blue-100 text-blue-800">Em Breve</Badge>;
      case 'ongoing':
        return <Badge className="bg-green-100 text-green-800">Em Andamento</Badge>;
      case 'completed':
        return <Badge className="bg-gray-100 text-gray-800">Concluído</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
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

  const formatPrice = (price?: number) => {
    if (!price) return 'Gratuito';
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const categories = ['Simulações Termáticas', 'Workshop', 'Preparatório', 'Conferência', 'Congresso', 'Outros'];
  const statuses = ['upcoming', 'ongoing', 'completed', 'cancelled'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando eventos...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Gerenciar Eventos</h1>
            <p className="text-muted-foreground">Gerencie todos os eventos da Academia MAGIS</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={async () => {
                try {
                  await eventsApi.updateEventStatuses();
                  await loadEvents();
                } catch (error) {
                  console.error('Erro ao atualizar status:', error);
                }
              }}
              variant="outline"
              className="btn-outline"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Atualizar Status
            </Button>
            <Button
              onClick={() => navigate('/admin/eventos/novo')}
              className="btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Evento
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todos os Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'upcoming' ? 'Em Breve' : 
                     status === 'ongoing' ? 'Em Andamento' : 
                     status === 'completed' ? 'Concluído' : 'Cancelado'}
                  </option>
                ))}
              </select>

              {/* Category Filter */}
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

              {/* Clear Filters */}
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setCategoryFilter('all');
                }}
                variant="outline"
                className="btn-outline"
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-foreground">
              Eventos ({filteredEvents.length})
            </h2>
          </div>

          {filteredEvents.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">Nenhum evento encontrado</p>
                <Button
                  onClick={() => navigate('/admin/eventos/novo')}
                  className="btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Evento
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {event.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-2">
                          {getStatusBadge(getEventStatus(event))}
                          <Badge variant="outline">{event.category}</Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => navigate(`/admin/eventos/${event.id}/editar`)}
                          size="sm"
                          variant="outline"
                          className="btn-outline"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteEvent(event.id)}
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {event.start_date && event.end_date ? (
                          <span>
                            {formatDate(event.start_date)} a {formatDate(event.end_date)}
                          </span>
                        ) : (
                          <span>{formatDate(event.date)}</span>
                        )}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        {event.participants}
                      </div>
                      <div className="flex items-center text-primary font-semibold">
                        <Clock className="w-4 h-4 mr-2" />
                        {formatPrice(event.price)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
  );
};

export default AdminEventos;
