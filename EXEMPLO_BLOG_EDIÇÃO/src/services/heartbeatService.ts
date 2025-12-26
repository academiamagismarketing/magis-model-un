import { supabase } from '@/lib/supabaseClient';

export interface HeartbeatLog {
  id?: string;
  timestamp: string;
  status: 'success' | 'error';
  message?: string;
  user_agent?: string;
  ip_address?: string;
}

class HeartbeatService {
  private isRunning = false;
  private intervalId: NodeJS.Timeout | null = null;
  private readonly HEARTBEAT_INTERVAL = 24 * 60 * 60 * 1000; // 24 horas em millisegundos
  private readonly RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY = 5000; // 5 segundos

  /**
   * Inicia o serviço de heartbeat
   */
  public start(): void {
    if (this.isRunning) {
      console.log('[Heartbeat] Service already running');
      return;
    }

    console.log('[Heartbeat] Starting heartbeat service');
    this.isRunning = true;
    
    // Executa imediatamente na primeira vez
    this.executeHeartbeat();
    
    // Configura o intervalo para execução diária
    this.intervalId = setInterval(() => {
      this.executeHeartbeat();
    }, this.HEARTBEAT_INTERVAL);
  }

  /**
   * Para o serviço de heartbeat
   */
  public stop(): void {
    if (!this.isRunning) {
      return;
    }

    console.log('[Heartbeat] Stopping heartbeat service');
    this.isRunning = false;
    
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Executa o heartbeat com retry automático
   */
  private async executeHeartbeat(): Promise<void> {
    console.log('[Heartbeat] Executing heartbeat...');
    
    for (let attempt = 1; attempt <= this.RETRY_ATTEMPTS; attempt++) {
      try {
        await this.sendHeartbeat();
        console.log('[Heartbeat] Successfully sent heartbeat');
        return;
      } catch (error) {
        console.error(`[Heartbeat] Attempt ${attempt} failed:`, error);
        
        if (attempt < this.RETRY_ATTEMPTS) {
          console.log(`[Heartbeat] Retrying in ${this.RETRY_DELAY}ms...`);
          await this.delay(this.RETRY_DELAY);
        }
      }
    }
    
    console.error('[Heartbeat] All attempts failed');
  }

  /**
   * Envia o heartbeat para o Supabase
   */
  private async sendHeartbeat(): Promise<void> {
    const timestamp = new Date().toISOString();
    const userAgent = navigator.userAgent;
    
    // Tenta obter o IP através de uma API externa (opcional)
    let ipAddress: string | undefined;
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      ipAddress = data.ip;
    } catch (error) {
      console.warn('[Heartbeat] Could not fetch IP address:', error);
    }

    // Insere o log de heartbeat na tabela
    const { error } = await supabase
      .from('heartbeat_logs')
      .insert({
        timestamp,
        status: 'success',
        message: 'Heartbeat sent successfully',
        user_agent: userAgent,
        ip_address: ipAddress
      });

    if (error) {
      throw new Error(`Failed to insert heartbeat log: ${error.message}`);
    }

    // Chama a Edge Function para processar o heartbeat
    const { error: functionError } = await supabase.functions.invoke('heartbeat', {
      body: {
        timestamp,
        user_agent: userAgent,
        ip_address: ipAddress
      }
    });

    if (functionError) {
      throw new Error(`Heartbeat function failed: ${functionError.message}`);
    }
  }

  /**
   * Utilitário para delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Verifica se o serviço está rodando
   */
  public isServiceRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Obtém o status do último heartbeat
   */
  public async getLastHeartbeat(): Promise<HeartbeatLog | null> {
    try {
      const { data, error } = await supabase
        .from('heartbeat_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('[Heartbeat] Error fetching last heartbeat:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('[Heartbeat] Error fetching last heartbeat:', error);
      return null;
    }
  }

  /**
   * Obtém estatísticas dos heartbeats
   */
  public async getHeartbeatStats(): Promise<{
    total: number;
    successful: number;
    failed: number;
    last24h: number;
  }> {
    try {
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

      const { data, error } = await supabase
        .from('heartbeat_logs')
        .select('status, timestamp');

      if (error) {
        throw new Error(`Failed to fetch heartbeat stats: ${error.message}`);
      }

      const total = data.length;
      const successful = data.filter(log => log.status === 'success').length;
      const failed = total - successful;
      const last24h = data.filter(log => 
        new Date(log.timestamp) > yesterday
      ).length;

      return {
        total,
        successful,
        failed,
        last24h
      };
    } catch (error) {
      console.error('[Heartbeat] Error fetching stats:', error);
      return {
        total: 0,
        successful: 0,
        failed: 0,
        last24h: 0
      };
    }
  }
}

// Instância singleton do serviço
export const heartbeatService = new HeartbeatService();

// Auto-inicia o serviço quando o módulo é carregado
if (typeof window !== 'undefined') {
  // Só inicia no browser, não no servidor
  heartbeatService.start();
}
