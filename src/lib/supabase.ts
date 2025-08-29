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
  max_participants?: number;
  current_participants?: number;
  created_at: string;
  updated_at: string;
}

// Interface para produtos
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
  status: 'active' | 'inactive' | 'out_of_stock';
  buy_link: string;
  created_at: string;
  updated_at: string;
}

// Interface para estatísticas
export interface Statistic {
  id: string;
  key: string;
  value: number;
  label: string;
  description?: string;
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

// API para produtos
export const productsApi = {
  // Buscar todos os produtos
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Buscar produto por ID
  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Criar novo produto
  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Atualizar produto
  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Deletar produto
  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Buscar produtos por status
  async getProductsByStatus(status: Product['status']): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Buscar produtos por categoria
  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Buscar produtos ativos (para exibição pública)
  async getActiveProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  }
};

// API para estatísticas
export const statisticsApi = {
  // Buscar todas as estatísticas
  async getAllStatistics(): Promise<Statistic[]> {
    const { data, error } = await supabase
      .from('statistics')
      .select('*')
      .order('key', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Buscar estatística por chave
  async getStatisticByKey(key: string): Promise<Statistic | null> {
    const { data, error } = await supabase
      .from('statistics')
      .select('*')
      .eq('key', key)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Atualizar estatística
  async updateStatistic(key: string, updates: Partial<Statistic>): Promise<Statistic> {
    const { data, error } = await supabase
      .from('statistics')
      .update(updates)
      .eq('key', key)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Buscar estatísticas públicas (para exibição no site)
  async getPublicStatistics(): Promise<Statistic[]> {
    const { data, error } = await supabase
      .from('statistics')
      .select('*')
      .order('key', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  // Calcular tempo de atuação em meses (desde novembro de 2024)
  calculateTimeOfOperation(): number {
    const startDate = new Date('2024-11-01');
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Média de dias por mês
    return diffMonths;
  }
};

export interface Diretor {
  id: string;
  nome: string;
  cargo: string;
  foto_url?: string;
  bio: string;
  formacao: string;
  experiencia: string;
  ordem_exibicao: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Voluntario {
  id: string;
  nome: string;
  area: string;
  foto_url?: string;
  bio: string;
  formacao: string;
  tempo_voluntario: string;
  ordem_exibicao: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Mentor {
  id: string;
  nome: string;
  especialidade: string;
  foto_url?: string;
  bio: string;
  formacao: string;
  experiencia: string;
  eventos_mentorados: string;
  ordem_exibicao: number;
  ativo: boolean;
  created_at: string;
  updated_at: string;
}

export const diretoriaApi = {
  async getAllDiretores(): Promise<Diretor[]> {
    const { data, error } = await supabase
      .from('diretoria')
      .select('*')
      .order('ordem_exibicao', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getDiretorById(id: string): Promise<Diretor | null> {
    const { data, error } = await supabase
      .from('diretoria')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createDiretor(diretor: Omit<Diretor, 'id' | 'created_at' | 'updated_at'>): Promise<Diretor> {
    const { data, error } = await supabase
      .from('diretoria')
      .insert([diretor])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateDiretor(id: string, updates: Partial<Diretor>): Promise<Diretor> {
    const { data, error } = await supabase
      .from('diretoria')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteDiretor(id: string): Promise<void> {
    const { error } = await supabase
      .from('diretoria')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getPublicDiretores(): Promise<Diretor[]> {
    const { data, error } = await supabase
      .from('diretoria')
      .select('*')
      .eq('ativo', true)
      .order('ordem_exibicao', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }
};

export const voluntariosApi = {
  async getAllVoluntarios(): Promise<Voluntario[]> {
    const { data, error } = await supabase
      .from('voluntarios')
      .select('*')
      .order('ordem_exibicao', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getVoluntarioById(id: string): Promise<Voluntario | null> {
    const { data, error } = await supabase
      .from('voluntarios')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createVoluntario(voluntario: Omit<Voluntario, 'id' | 'created_at' | 'updated_at'>): Promise<Voluntario> {
    const { data, error } = await supabase
      .from('voluntarios')
      .insert([voluntario])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateVoluntario(id: string, updates: Partial<Voluntario>): Promise<Voluntario> {
    const { data, error } = await supabase
      .from('voluntarios')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteVoluntario(id: string): Promise<void> {
    const { error } = await supabase
      .from('voluntarios')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getPublicVoluntarios(): Promise<Voluntario[]> {
    const { data, error } = await supabase
      .from('voluntarios')
      .select('*')
      .eq('ativo', true)
      .order('ordem_exibicao', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }
};

export const mentoresApi = {
  async getAllMentores(): Promise<Mentor[]> {
    const { data, error } = await supabase
      .from('mentores')
      .select('*')
      .order('ordem_exibicao', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async getMentorById(id: string): Promise<Mentor | null> {
    const { data, error } = await supabase
      .from('mentores')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async createMentor(mentor: Omit<Mentor, 'id' | 'created_at' | 'updated_at'>): Promise<Mentor> {
    const { data, error } = await supabase
      .from('mentores')
      .insert([mentor])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateMentor(id: string, updates: Partial<Mentor>): Promise<Mentor> {
    const { data, error } = await supabase
      .from('mentores')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async deleteMentor(id: string): Promise<void> {
    const { error } = await supabase
      .from('mentores')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  async getPublicMentores(): Promise<Mentor[]> {
    const { data, error } = await supabase
      .from('mentores')
      .select('*')
      .eq('ativo', true)
      .order('ordem_exibicao', { ascending: true });
    
    if (error) throw error;
    return data || [];
  }
};

// ===== HEARTBEAT API - Manter Supabase Ativo =====

export interface Heartbeat {
  id: number;
  numero: number;
  timestamp: string;
  status: string;
  created_at: string;
}

export interface HeartbeatStatus {
  is_active: boolean;
  last_update: string;
  total_records: number;
}

export const heartbeatApi = {
  // Função para inserir novo registro de heartbeat
  async updateHeartbeat(): Promise<void> {
    try {
      const { error } = await supabase.rpc('update_heartbeat');
      if (error) {
        console.error('Erro ao atualizar heartbeat:', error);
        throw error;
      }
      console.log('Heartbeat atualizado com sucesso:', new Date().toISOString());
    } catch (error) {
      console.error('Falha ao atualizar heartbeat:', error);
      throw error;
    }
  },

  // Função para verificar status do heartbeat
  async checkHeartbeat(): Promise<HeartbeatStatus> {
    try {
      const { data, error } = await supabase.rpc('check_heartbeat');
      if (error) {
        console.error('Erro ao verificar heartbeat:', error);
        throw error;
      }
      return data[0] || { is_active: false, last_update: '', total_records: 0 };
    } catch (error) {
      console.error('Falha ao verificar heartbeat:', error);
      throw error;
    }
  },

  // Função para inserir registro manual (fallback)
  async insertHeartbeat(): Promise<Heartbeat> {
    try {
      const { data, error } = await supabase
        .from('heartbeat')
        .insert([{ 
          numero: Math.floor(Math.random() * 1000) + 1,
          status: 'active' 
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Erro ao inserir heartbeat:', error);
        throw error;
      }
      
      console.log('Heartbeat inserido manualmente:', data);
      return data;
    } catch (error) {
      console.error('Falha ao inserir heartbeat:', error);
      throw error;
    }
  },

  // Função para obter últimos registros
  async getRecentHeartbeats(limit: number = 10): Promise<Heartbeat[]> {
    try {
      const { data, error } = await supabase
        .from('heartbeat')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error('Erro ao buscar heartbeats:', error);
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Falha ao buscar heartbeats:', error);
      throw error;
    }
  }
};
