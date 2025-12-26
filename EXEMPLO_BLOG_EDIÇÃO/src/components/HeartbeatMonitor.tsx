import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useHeartbeat } from "@/hooks/useHeartbeat";
import { Heart, Activity, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const HeartbeatMonitor = () => {
  const {
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
  } = useHeartbeat();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Heartbeat Monitor
          </CardTitle>
          <CardDescription>
            Monitora o status do sistema de heartbeat para manter o Supabase ativo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status do Serviço */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="font-medium">Status do Serviço:</span>
            </div>
            <Badge variant={isRunning ? "default" : "secondary"}>
              {isRunning ? "Ativo" : "Inativo"}
            </Badge>
          </div>

          {/* Controles */}
          <div className="flex gap-2">
            <Button
              onClick={startService}
              disabled={isRunning || loading}
              size="sm"
            >
              Iniciar
            </Button>
            <Button
              onClick={stopService}
              disabled={!isRunning || loading}
              variant="outline"
              size="sm"
            >
              Parar
            </Button>
            <Button
              onClick={executeHeartbeat}
              disabled={loading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Executar Agora
            </Button>
          </div>

          {/* Último Heartbeat */}
          {lastHeartbeat && (
            <div className="space-y-2">
              <h4 className="font-medium">Último Heartbeat:</h4>
              <div className="flex items-center gap-2">
                {getStatusIcon(lastHeartbeat.status)}
                <span className="text-sm">
                  {formatDistanceToNow(new Date(lastHeartbeat.timestamp), {
                    addSuffix: true,
                    locale: ptBR
                  })}
                </span>
                <Badge variant="outline" className="text-xs">
                  {lastHeartbeat.status}
                </Badge>
              </div>
              {lastHeartbeat.message && (
                <p className="text-sm text-muted-foreground">
                  {lastHeartbeat.message}
                </p>
              )}
            </div>
          )}

          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.successful}
              </div>
              <div className="text-sm text-muted-foreground">Sucessos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {stats.failed}
              </div>
              <div className="text-sm text-muted-foreground">Falhas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.total}
              </div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.last24h}
              </div>
              <div className="text-sm text-muted-foreground">Últimas 24h</div>
            </div>
          </div>

          {/* Erro */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Carregando...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
