import { useState, useEffect, useCallback } from 'react';
import { heartbeatService, HeartbeatLog } from '@/services/heartbeatService';

export interface HeartbeatStats {
  total: number;
  successful: number;
  failed: number;
  last24h: number;
}

export const useHeartbeat = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [lastHeartbeat, setLastHeartbeat] = useState<HeartbeatLog | null>(null);
  const [stats, setStats] = useState<HeartbeatStats>({
    total: 0,
    successful: 0,
    failed: 0,
    last24h: 0
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Verifica o status do serviço
  useEffect(() => {
    setIsRunning(heartbeatService.isServiceRunning());
  }, []);

  // Carrega o último heartbeat
  const loadLastHeartbeat = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const heartbeat = await heartbeatService.getLastHeartbeat();
      setLastHeartbeat(heartbeat);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load last heartbeat');
    } finally {
      setLoading(false);
    }
  }, []);

  // Carrega as estatísticas
  const loadStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const heartbeatStats = await heartbeatService.getHeartbeatStats();
      setStats(heartbeatStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  }, []);

  // Inicia o serviço
  const startService = useCallback(() => {
    heartbeatService.start();
    setIsRunning(true);
  }, []);

  // Para o serviço
  const stopService = useCallback(() => {
    heartbeatService.stop();
    setIsRunning(false);
  }, []);

  // Executa heartbeat manual
  const executeHeartbeat = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Força uma execução manual
      await heartbeatService['executeHeartbeat']();
      await loadLastHeartbeat();
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute heartbeat');
    } finally {
      setLoading(false);
    }
  }, [loadLastHeartbeat, loadStats]);

  // Carrega dados iniciais
  useEffect(() => {
    loadLastHeartbeat();
    loadStats();
  }, [loadLastHeartbeat, loadStats]);

  return {
    isRunning,
    lastHeartbeat,
    stats,
    loading,
    error,
    startService,
    stopService,
    executeHeartbeat,
    loadLastHeartbeat,
    loadStats
  };
};
