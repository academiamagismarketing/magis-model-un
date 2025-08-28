import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Interface para eventos
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  participants: string;
  image_url?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  category: string;
  price?: number;
  registration_deadline?: string;
  created_at: string;
  updated_at: string;
}

// API para eventos
export const eventsApi = {
  // Buscar todos os eventos
  async getAllEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Buscar evento por ID
  async getEventById(id: string): Promise<Event | null> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Criar novo evento
  async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .insert([event])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Atualizar evento
  async updateEvent(id: string, updates: Partial<Event>): Promise<Event> {
    const { data, error } = await supabase
      .from('events')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar evento
  async deleteEvent(id: string): Promise<void> {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Buscar eventos por status
  async getEventsByStatus(status: Event['status']): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('status', status)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Buscar eventos por categoria
  async getEventsByCategory(category: string): Promise<Event[]> {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('category', category)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Atualizar status dos eventos automaticamente baseado na data
  async updateEventStatuses(): Promise<void> {
    const today = new Date();
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(today.getMonth() - 2);

    // Atualizar eventos com data passada para 'completed'
    const { error: pastEventsError } = await supabase
      .from('events')
      .update({ status: 'completed' })
      .lt('date', today.toISOString().split('T')[0])
      .in('status', ['upcoming', 'ongoing']);

    if (pastEventsError) throw pastEventsError;

    // Atualizar eventos 'ongoing' com mais de 2 meses para 'completed'
    const { error: oldOngoingError } = await supabase
      .from('events')
      .update({ status: 'completed' })
      .lt('date', twoMonthsAgo.toISOString().split('T')[0])
      .eq('status', 'ongoing');

    if (oldOngoingError) throw oldOngoingError;
  },

  // Buscar eventos com ordenação inteligente (data como prioridade)
  async getEventsWithSmartOrdering(): Promise<Event[]> {
    // Primeiro atualizar status automaticamente
    await this.updateEventStatuses();

    // Buscar todos os eventos
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true }); // Ordem cronológica (mais próximos primeiro)
    
    if (error) throw error;
    return data || [];
  },

  // Buscar eventos públicos (apenas upcoming e ongoing)
  async getPublicEvents(): Promise<Event[]> {
    // Primeiro atualizar status automaticamente
    await this.updateEventStatuses();

    // Buscar eventos públicos
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .in('status', ['upcoming', 'ongoing'])
      .order('date', { ascending: true }); // Ordem cronológica
    
    if (error) throw error;
    return data || [];
  }
};
