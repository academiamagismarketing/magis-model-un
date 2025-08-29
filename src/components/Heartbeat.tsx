import React, { useEffect, useRef } from 'react';
import { heartbeatApi } from '@/lib/supabase';

const Heartbeat: React.FC = () => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const lastHeartbeatRef = useRef<Date | null>(null);

  // Função para executar o heartbeat
  const executeHeartbeat = async () => {
    try {
      // Tentar usar a função RPC primeiro
      await heartbeatApi.updateHeartbeat();
      lastHeartbeatRef.current = new Date();
      console.log('✅ Heartbeat executado com sucesso:', new Date().toISOString());
    } catch (error) {
      console.warn('⚠️ Falha na função RPC, tentando inserção manual...');
      try {
        // Fallback para inserção manual
        await heartbeatApi.insertHeartbeat();
        lastHeartbeatRef.current = new Date();
        console.log('✅ Heartbeat manual executado com sucesso:', new Date().toISOString());
      } catch (fallbackError) {
        console.error('❌ Falha total no heartbeat:', fallbackError);
      }
    }
  };

  // Função para verificar status
  const checkStatus = async () => {
    try {
      const status = await heartbeatApi.checkHeartbeat();
      console.log('📊 Status do heartbeat:', status);
      
      if (!status.is_active) {
        console.warn('⚠️ Sistema inativo detectado, executando heartbeat...');
        await executeHeartbeat();
      }
    } catch (error) {
      console.error('❌ Erro ao verificar status:', error);
    }
  };

  useEffect(() => {
    // Executar heartbeat imediatamente
    executeHeartbeat();

    // Configurar intervalo para executar a cada 12 horas (43200000 ms)
    // Isso garante que o Supabase permaneça ativo
    intervalRef.current = setInterval(() => {
      executeHeartbeat();
    }, 12 * 60 * 60 * 1000); // 12 horas

    // Configurar verificação de status a cada 6 horas
    const statusInterval = setInterval(() => {
      checkStatus();
    }, 6 * 60 * 60 * 1000); // 6 horas

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      clearInterval(statusInterval);
    };
  }, []);

  // Executar heartbeat quando a página ganha foco (usuário volta ao site)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && lastHeartbeatRef.current) {
        const timeSinceLastHeartbeat = Date.now() - lastHeartbeatRef.current.getTime();
        const hoursSinceLastHeartbeat = timeSinceLastHeartbeat / (1000 * 60 * 60);
        
        // Se passou mais de 6 horas desde o último heartbeat, executar novamente
        if (hoursSinceLastHeartbeat > 6) {
          console.log('🔄 Página ganhou foco, executando heartbeat...');
          executeHeartbeat();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Componente invisível - não renderiza nada
  return null;
};

export default Heartbeat;
