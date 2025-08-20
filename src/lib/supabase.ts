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
  }
};
