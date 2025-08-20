import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para os agendamentos
export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  date: string;
  time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

// Funções para gerenciar agendamentos
export const appointmentsApi = {
  // Buscar todos os agendamentos
  async getAllAppointments(): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }

    return data || [];
  },

  // Buscar agendamento por ID
  async getAppointmentById(id: string): Promise<Appointment | null> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching appointment:', error);
      throw error;
    }

    return data;
  },

  // Criar novo agendamento
  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select()
      .single();

    if (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }

    return data;
  },

  // Atualizar agendamento
  async updateAppointment(id: string, appointmentData: Partial<Appointment>): Promise<Appointment> {
    const { data, error } = await supabase
      .from('appointments')
      .update({ ...appointmentData, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }

    return data;
  },

  // Deletar agendamento
  async deleteAppointment(id: string): Promise<void> {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  },

  // Buscar agendamentos por status
  async getAppointmentsByStatus(status: Appointment['status']): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching appointments by status:', error);
      throw error;
    }

    return data || [];
  },

  // Buscar agendamentos por tipo de evento
  async getAppointmentsByEventType(eventType: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('event_type', eventType)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching appointments by event type:', error);
      throw error;
    }

    return data || [];
  },

  // Buscar agendamentos por data
  async getAppointmentsByDate(date: string): Promise<Appointment[]> {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('date', date)
      .order('time', { ascending: true });

    if (error) {
      console.error('Error fetching appointments by date:', error);
      throw error;
    }

    return data || [];
  }
};
