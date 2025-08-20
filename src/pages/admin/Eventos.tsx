import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Clock,
  Mail,
  Phone,
  User,
  MessageSquare
} from 'lucide-react';
import { appointmentsApi, Appointment } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

const AdminEventos = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');

  useEffect(() => {
    loadAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchTerm, statusFilter, eventTypeFilter]);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const data = await appointmentsApi.getAllAppointments();
      setAppointments(data);
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.event_type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.event_type === eventTypeFilter);
    }

    setFilteredAppointments(filtered);
  };

  const handleDeleteAppointment = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este agendamento?')) {
      try {
        await appointmentsApi.deleteAppointment(id);
        await loadAppointments();
      } catch (error) {
        console.error('Erro ao excluir agendamento:', error);
        alert('Erro ao excluir agendamento');
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: Appointment['status']) => {
    try {
      await appointmentsApi.updateAppointment(id, { status: newStatus });
      await loadAppointments();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmado</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelado</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Concluído</Badge>;
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

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5); // Remove segundos
  };

  const eventTypes = ['Simulação ONU', 'Workshop de Diplomacia', 'Mentoria Individual', 'Preparatório Vestibular', 'Conferência'];
  const statuses = ['pending', 'confirmed', 'cancelled', 'completed'];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando agendamentos...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Gerenciar Agendamentos
            </h1>
            <p className="text-muted-foreground mt-2">
              Visualize e gerencie todos os agendamentos da Academia Magis
            </p>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Buscar agendamentos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todos os Status</option>
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="cancelled">Cancelado</option>
                <option value="completed">Concluído</option>
              </select>

              <select
                value={eventTypeFilter}
                onChange={(e) => setEventTypeFilter(e.target.value)}
                className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Todos os Tipos</option>
                {eventTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <Button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                  setEventTypeFilter('all');
                }}
                variant="outline"
                className="btn-outline"
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Agendamentos */}
        <Card>
          <CardHeader>
            <CardTitle>
              Agendamentos ({filteredAppointments.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Nenhum agendamento encontrado com os filtros aplicados.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex flex-col lg:flex-row lg:items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {appointment.name}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {appointment.email}
                            </span>
                            <span className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {appointment.phone}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {getStatusBadge(appointment.status)}
                          <Badge className="bg-primary/10 text-primary">
                            {appointment.event_type}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(appointment.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {formatTime(appointment.time)}
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {appointment.message ? 'Com mensagem' : 'Sem mensagem'}
                        </div>
                      </div>

                      {appointment.message && (
                        <div className="bg-muted/50 p-3 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Mensagem:</strong> {appointment.message}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-4">
                      <select
                        value={appointment.status}
                        onChange={(e) => handleStatusChange(appointment.id, e.target.value as Appointment['status'])}
                        className="px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="pending">Pendente</option>
                        <option value="confirmed">Confirmado</option>
                        <option value="cancelled">Cancelado</option>
                        <option value="completed">Concluído</option>
                      </select>
                      
                      <Button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminEventos;
