import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Save, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  FileText
} from 'lucide-react';
import { eventsApi, Event } from '@/lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUpload from '@/components/ImageUpload';

const EventoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    start_date: '',
    end_date: '',
    location: '',
    participants: '',
    image_url: '',
    status: 'upcoming' as Event['status'],
    category: '',
    price: '',
    registration_deadline: '',
    registration_start_date: '',
    is_partner_event: false,
    event_link: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadEvent();
    }
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const event = await eventsApi.getEventById(id!);
      if (event) {
        setFormData({
          title: event.title,
          description: event.description,
          date: event.date,
          start_date: event.start_date || event.date || '',
          end_date: event.end_date || '',
          location: event.location,
          participants: event.participants,
          image_url: event.image_url || '',
          status: event.status,
          category: event.category,
          price: event.price?.toString() || '',
          registration_deadline: event.registration_deadline || '',
          registration_start_date: event.registration_start_date || '',
          is_partner_event: event.is_partner_event || false,
          event_link: event.event_link || ''
        });
      }
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
      setError('Erro ao carregar evento');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Sincronizar start_date com date para compatibilidade
      if (name === 'start_date') {
        newData.date = value;
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      setError('');

      const eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        start_date: formData.start_date || null,
        end_date: formData.end_date || null,
        location: formData.location,
        participants: formData.participants,
        image_url: formData.image_url || null,
        status: formData.status,
        category: formData.category,
        price: formData.price ? parseFloat(formData.price) : null,
        registration_deadline: formData.registration_deadline || null,
        registration_start_date: formData.registration_start_date || null,
        is_partner_event: formData.is_partner_event,
        event_link: formData.event_link || null
      };

      if (isEditing) {
        await eventsApi.updateEvent(id!, eventData);
      } else {
        await eventsApi.createEvent(eventData);
      }

      navigate('/admin/eventos');
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
      setError('Erro ao salvar evento');
    } finally {
      setSaving(false);
    }
  };

  const categories = ['Simulações Temáticas', 'Workshop', 'Preparatório', 'Conferência', 'Congresso', 'Outros'];
  const statuses = [
    { value: 'upcoming', label: 'Em Breve' },
    { value: 'ongoing', label: 'Em Andamento' },
    { value: 'completed', label: 'Concluído' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando evento...</p>
        </div>
      </div>
    );
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                {isEditing ? 'Editar Evento' : 'Novo Evento'}
              </h1>
              <p className="text-muted-foreground">
                {isEditing ? 'Edite as informações do evento' : 'Crie um novo evento para a Academia MAGIS'}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Informações do Evento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Título */}
                <div className="md:col-span-2">
                  <Label htmlFor="title" className="text-foreground">Título do Evento *</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                    placeholder="Ex: SIMONU São Paulo 2024"
                  />
                </div>

                {/* Descrição */}
                <div className="md:col-span-2">
                  <Label htmlFor="description" className="text-foreground">Descrição *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="mt-2 min-h-32"
                    placeholder="Descreva o evento em detalhes..."
                  />
                </div>

                {/* Data de Início */}
                <div>
                  <Label htmlFor="start_date" className="text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data de Início *
                  </Label>
                  <Input
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                  />
                </div>

                {/* Data de Término */}
                <div>
                  <Label htmlFor="end_date" className="text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data de Término
                  </Label>
                  <Input
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                {/* Localização */}
                <div>
                  <Label htmlFor="location" className="text-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Localização *
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                    placeholder="Ex: Centro de Convenções Rebouças, São Paulo"
                  />
                </div>

                {/* Participantes */}
                <div>
                  <Label htmlFor="participants" className="text-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Participantes *
                  </Label>
                  <Input
                    id="participants"
                    name="participants"
                    type="text"
                    value={formData.participants}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                    placeholder="Ex: 200+ delegados"
                  />
                </div>

                {/* Preço */}
                <div>
                  <Label htmlFor="price" className="text-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Preço
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="0.00"
                  />
                </div>

                {/* Categoria */}
                <div>
                  <Label htmlFor="category" className="text-foreground">Categoria *</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Status */}
                <div>
                  <Label htmlFor="status" className="text-foreground">Status *</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {statuses.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>

                {/* Início das Inscrições */}
                <div>
                  <Label htmlFor="registration_start_date" className="text-foreground">Início das Inscrições</Label>
                  <Input
                    id="registration_start_date"
                    name="registration_start_date"
                    type="date"
                    value={formData.registration_start_date}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                {/* Data Limite de Inscrição */}
                <div>
                  <Label htmlFor="registration_deadline" className="text-foreground">Data Limite de Inscrição</Label>
                  <Input
                    id="registration_deadline"
                    name="registration_deadline"
                    type="date"
                    value={formData.registration_deadline}
                    onChange={handleInputChange}
                    className="mt-2"
                  />
                </div>

                {/* Evento Parceiro */}
                <div>
                  <Label htmlFor="is_partner_event" className="text-foreground">Tipo de Participação</Label>
                  <select
                    id="is_partner_event"
                    name="is_partner_event"
                    value={formData.is_partner_event ? 'true' : 'false'}
                    onChange={(e) => setFormData(prev => ({ ...prev, is_partner_event: e.target.value === 'true' }))}
                    className="w-full mt-2 px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="false">Presença Confirmada</option>
                    <option value="true">Evento Parceiro</option>
                  </select>
                </div>

                {/* Link do Evento */}
                <div>
                  <Label htmlFor="event_link" className="text-foreground">Link (WhatsApp/Inscrição)</Label>
                  <Input
                    id="event_link"
                    name="event_link"
                    type="url"
                    value={formData.event_link}
                    onChange={handleInputChange}
                    className="mt-2"
                    placeholder="https://wa.me/5511999999999?text=..."
                  />
                </div>

                {/* Upload de Imagem */}
                <div className="md:col-span-2">
                  <ImageUpload
                    currentImageUrl={formData.image_url}
                    onImageChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                    folder="events"
                    label="Imagem do Evento"
                    showUrlInput={true}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  onClick={() => navigate('/admin/eventos')}
                  variant="outline"
                  className="btn-outline"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Salvando...' : (isEditing ? 'Atualizar Evento' : 'Criar Evento')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
  );
};

export default EventoForm;
