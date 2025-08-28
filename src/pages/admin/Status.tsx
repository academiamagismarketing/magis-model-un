import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  Clock,
  Save,
  RefreshCw
} from 'lucide-react';
import { statisticsApi, Statistic } from '@/lib/supabase';

const AdminStatus = () => {
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [timeOfOperation, setTimeOfOperation] = useState(0);

  useEffect(() => {
    loadStatistics();
    updateTimeOfOperation();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const data = await statisticsApi.getAllStatistics();
      setStatistics(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTimeOfOperation = () => {
    const months = statisticsApi.calculateTimeOfOperation();
    setTimeOfOperation(months);
  };

  const handleValueChange = (key: string, newValue: string) => {
    const numValue = parseFloat(newValue) || 0;
    setStatistics(prev => 
      prev.map(stat => 
        stat.key === key ? { ...stat, value: numValue } : stat
      )
    );
  };

  const handleSave = async (statistic: Statistic) => {
    try {
      setSaving(true);
      await statisticsApi.updateStatistic(statistic.key, {
        value: statistic.value,
        label: statistic.label,
        description: statistic.description
      });
      alert('Estatística atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar estatística:', error);
      alert('Erro ao salvar estatística');
    } finally {
      setSaving(false);
    }
  };

  const formatValue = (key: string, value: number) => {
    switch (key) {
      case 'valores_arrecadados':
        return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      case 'delegados':
      case 'eventos_realizados':
        return Math.floor(value).toLocaleString('pt-BR');
      default:
        return value.toString();
    }
  };

  const getIcon = (key: string) => {
    switch (key) {
      case 'delegados':
        return <Users className="w-8 h-8 text-primary" />;
      case 'eventos_realizados':
        return <Calendar className="w-8 h-8 text-primary" />;
      case 'valores_arrecadados':
        return <DollarSign className="w-8 h-8 text-primary" />;
      default:
        return <TrendingUp className="w-8 h-8 text-primary" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando estatísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Gerenciar Status</h1>
            <p className="text-muted-foreground">Gerencie as estatísticas exibidas na página Sobre</p>
          </div>
          <Button
            onClick={() => {
              loadStatistics();
              updateTimeOfOperation();
            }}
            variant="outline"
            className="btn-outline"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>

        {/* Estatísticas Editáveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statistics.map((statistic) => (
            <Card key={statistic.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getIcon(statistic.key)}
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {statistic.label}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {statistic.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor={`value-${statistic.key}`} className="text-foreground font-medium">
                      Valor Atual
                    </Label>
                    <div className="text-2xl font-bold text-primary mt-1">
                      {formatValue(statistic.key, statistic.value)}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor={`input-${statistic.key}`} className="text-foreground font-medium">
                      Novo Valor
                    </Label>
                    <Input
                      id={`input-${statistic.key}`}
                      type="number"
                      step={statistic.key === 'valores_arrecadados' ? '0.01' : '1'}
                      min="0"
                      value={statistic.value}
                      onChange={(e) => handleValueChange(statistic.key, e.target.value)}
                      className="mt-1"
                      placeholder="Digite o novo valor"
                    />
                  </div>

                  <Button
                    onClick={() => handleSave(statistic)}
                    disabled={saving}
                    className="w-full btn-primary"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tempo de Atuação (Automático) */}
        <Card className="border-2 border-dashed border-primary/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-primary" />
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Tempo de Atuação
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Calculado automaticamente desde novembro de 2024
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {timeOfOperation} meses
              </div>
              <p className="text-sm text-muted-foreground">
                Este valor é calculado automaticamente e se atualiza a cada mês
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Informações Importantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong>Delegados:</strong> Número total de delegados formados pela Academia MAGIS (número inteiro).
              </p>
              <p>
                <strong>Eventos Realizados:</strong> Total de eventos realizados pela Academia MAGIS (número inteiro).
              </p>
              <p>
                <strong>Valores Arrecadados:</strong> Valor total arrecadado em reais através dos eventos e produtos.
              </p>
              <p>
                <strong>Tempo de Atuação:</strong> Calculado automaticamente em meses desde novembro de 2024.
              </p>
              <p className="text-primary font-medium">
                As alterações são refletidas imediatamente na página Sobre do site.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminStatus;
