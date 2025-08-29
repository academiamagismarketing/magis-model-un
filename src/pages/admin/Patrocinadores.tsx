import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { patrocinadoresApi, Patrocinador } from '@/lib/supabase';

const Patrocinadores = () => {
  const navigate = useNavigate();
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAtivo, setFilterAtivo] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    loadPatrocinadores();
  }, []);

  const loadPatrocinadores = async () => {
    try {
      setLoading(true);
      const data = await patrocinadoresApi.getAllPatrocinadores();
      setPatrocinadores(data);
    } catch (error) {
      console.error('Erro ao carregar patrocinadores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este patrocinador?')) {
      try {
        await patrocinadoresApi.deletePatrocinador(id);
        await loadPatrocinadores();
      } catch (error) {
        console.error('Erro ao excluir patrocinador:', error);
      }
    }
  };

  const handleToggleStatus = async (patrocinador: Patrocinador) => {
    try {
      await patrocinadoresApi.updatePatrocinador(patrocinador.id, {
        ativo: !patrocinador.ativo
      });
      await loadPatrocinadores();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  const filteredPatrocinadores = patrocinadores.filter(patrocinador => {
    const matchesSearch = patrocinador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patrocinador.nome_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patrocinador.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterAtivo === 'all' || 
                         (filterAtivo === 'active' && patrocinador.ativo) ||
                         (filterAtivo === 'inactive' && !patrocinador.ativo);
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando patrocinadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Patrocinadores</h1>
          <p className="text-muted-foreground">
            Gerencie os patrocinadores e parceiros da Academia MAGIS
          </p>
        </div>
        <Button onClick={() => navigate('/admin/patrocinadores/novo')} className="btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          Novo Patrocinador
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, nome completo ou categoria..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterAtivo === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterAtivo('all')}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filterAtivo === 'active' ? 'default' : 'outline'}
                onClick={() => setFilterAtivo('active')}
                size="sm"
              >
                <Eye className="w-4 h-4 mr-1" />
                Ativos
              </Button>
              <Button
                variant={filterAtivo === 'inactive' ? 'default' : 'outline'}
                onClick={() => setFilterAtivo('inactive')}
                size="sm"
              >
                <EyeOff className="w-4 h-4 mr-1" />
                Inativos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patrocinadores List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatrocinadores.map((patrocinador) => (
          <Card key={patrocinador.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    {patrocinador.nome}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {patrocinador.nome_completo}
                  </p>
                </div>
                <Badge variant={patrocinador.ativo ? 'default' : 'secondary'}>
                  {patrocinador.ativo ? 'Ativo' : 'Inativo'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Logo */}
              <div className="flex items-center justify-center h-20 bg-muted rounded-lg">
                {patrocinador.logo_url ? (
                  <img
                    src={patrocinador.logo_url}
                    alt={`Logo ${patrocinador.nome}`}
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-muted-foreground" />
                )}
              </div>

              {/* Info */}
              <div className="space-y-2">
                <div>
                  <Badge variant="outline" className="text-xs">
                    {patrocinador.categoria}
                  </Badge>
                </div>
                {patrocinador.descricao && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {patrocinador.descricao}
                  </p>
                )}
                {patrocinador.link && (
                  <a
                    href={patrocinador.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs text-primary hover:underline"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Ver site
                  </a>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/admin/patrocinadores/${patrocinador.id}/editar`)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(patrocinador)}
                  className="flex-1"
                >
                  {patrocinador.ativo ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-1" />
                      Desativar
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1" />
                      Ativar
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(patrocinador.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatrocinadores.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Nenhum patrocinador encontrado</h3>
              <p className="mb-4">
                {searchTerm || filterAtivo !== 'all' 
                  ? 'Tente ajustar os filtros de busca.'
                  : 'Comece adicionando seu primeiro patrocinador.'
                }
              </p>
              {!searchTerm && filterAtivo === 'all' && (
                <Button onClick={() => navigate('/admin/patrocinadores/novo')} className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Patrocinador
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Patrocinadores;
