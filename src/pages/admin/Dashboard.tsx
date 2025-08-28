import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventsApi, productsApi } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calendar, 
  Package, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit,
  ExternalLink,
  DollarSign,
  ShoppingCart
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  status: string;
  max_participants: number;
  current_participants: number;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    ongoingEvents: 0,
    completedEvents: 0,
    cancelledEvents: 0,
    totalParticipants: 0,
    totalProducts: 0,
    activeProducts: 0,
    inactiveProducts: 0,
    outOfStockProducts: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [eventsData, productsData] = await Promise.all([
        eventsApi.getEventsWithSmartOrdering(),
        productsApi.getAllProducts()
      ]);

      setEvents(eventsData || []);
      setProducts(productsData || []);

      // Calcular estatísticas de eventos
      const totalEvents = eventsData?.length || 0;
      const upcomingEvents = eventsData?.filter(e => e.status === 'upcoming').length || 0;
      const ongoingEvents = eventsData?.filter(e => e.status === 'ongoing').length || 0;
      const completedEvents = eventsData?.filter(e => e.status === 'completed').length || 0;
      const cancelledEvents = eventsData?.filter(e => e.status === 'cancelled').length || 0;
      const totalParticipants = eventsData?.reduce((sum, e) => sum + (e.current_participants || 0), 0) || 0;

      // Calcular estatísticas de produtos
      const totalProducts = productsData?.length || 0;
      const activeProducts = productsData?.filter(p => p.status === 'active').length || 0;
      const inactiveProducts = productsData?.filter(p => p.status === 'inactive').length || 0;
      const outOfStockProducts = productsData?.filter(p => p.status === 'out_of_stock').length || 0;
      const totalRevenue = productsData?.reduce((sum, p) => sum + p.price, 0) || 0;

      setStats({
        totalEvents,
        upcomingEvents,
        ongoingEvents,
        completedEvents,
        cancelledEvents,
        totalParticipants,
        totalProducts,
        activeProducts,
        inactiveProducts,
        outOfStockProducts,
        totalRevenue
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-blue-600 bg-blue-100';
      case 'ongoing': return 'text-green-600 bg-green-100';
      case 'completed': return 'text-gray-600 bg-gray-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      case 'out_of_stock': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming': return 'Próximos';
      case 'ongoing': return 'Em Andamento';
      case 'completed': return 'Concluídos';
      case 'cancelled': return 'Cancelados';
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'out_of_stock': return 'Sem Estoque';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const recentEvents = events.slice(0, 3);
  const recentProducts = products.slice(0, 3);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da Academia MAGIS</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => navigate('/admin/eventos')}
            variant="outline"
            className="btn-outline"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Gerenciar Eventos
          </Button>
          <Button
            onClick={() => navigate('/admin/produtos')}
            variant="outline"
            className="btn-outline"
          >
            <Package className="w-4 h-4 mr-2" />
            Gerenciar Produtos
          </Button>
        </div>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total de Eventos */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Eventos</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalEvents}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Total de Produtos */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Produtos</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Total de Participantes */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Participantes</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalParticipants}</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        {/* Valor Total dos Produtos */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-foreground">{formatPrice(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Estatísticas Detalhadas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Estatísticas de Eventos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Status dos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Próximos</span>
                <span className="font-semibold text-blue-600">{stats.upcomingEvents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Em Andamento</span>
                <span className="font-semibold text-green-600">{stats.ongoingEvents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Concluídos</span>
                <span className="font-semibold text-gray-600">{stats.completedEvents}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cancelados</span>
                <span className="font-semibold text-red-600">{stats.cancelledEvents}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas de Produtos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Status dos Produtos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Ativos</span>
                <span className="font-semibold text-green-600">{stats.activeProducts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Inativos</span>
                <span className="font-semibold text-gray-600">{stats.inactiveProducts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Sem Estoque</span>
                <span className="font-semibold text-red-600">{stats.outOfStockProducts}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Eventos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Eventos Recentes
            </div>
            <Button
              onClick={() => navigate('/admin/eventos')}
              variant="ghost"
              size="sm"
            >
              Ver Todos
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum evento encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(event.date)} • {event.location}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(event.status)}`}>
                      {getStatusText(event.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => navigate(`/admin/eventos/${event.id}/editar`)}
                      variant="ghost"
                      size="sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => navigate('/admin/eventos')}
                      variant="ghost"
                      size="sm"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Produtos Recentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Produtos Recentes
            </div>
            <Button
              onClick={() => navigate('/admin/produtos')}
              variant="ghost"
              size="sm"
            >
              Ver Todos
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.category} • {formatPrice(product.price)}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(product.status)}`}>
                      {getStatusText(product.status)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => navigate(`/admin/produtos/${product.id}/editar`)}
                      variant="ghost"
                      size="sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => window.open(product.buy_link, '_blank')}
                      variant="ghost"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
