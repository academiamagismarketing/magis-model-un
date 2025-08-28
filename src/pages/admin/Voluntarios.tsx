import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Award, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { voluntariosApi, Voluntario } from '@/lib/supabase';

const AdminVoluntarios = () => {
  const navigate = useNavigate();
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [filteredVoluntarios, setFilteredVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    loadVoluntarios();
  }, []);

  useEffect(() => {
    filterVoluntarios();
  }, [voluntarios, searchTerm, showInactive]);

  const loadVoluntarios = async () => {
    try {
      setLoading(true);
      const data = await voluntariosApi.getAllVoluntarios();
      setVoluntarios(data);
    } catch (error) {
      console.error('Erro ao carregar voluntários:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVoluntarios = () => {
    let filtered = voluntarios;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(voluntario =>
        voluntario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voluntario.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
        voluntario.formacao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por status ativo/inativo
    if (!showInactive) {
      filtered = filtered.filter(voluntario => voluntario.ativo);
    }

    setFilteredVoluntarios(filtered);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este voluntário?')) {
      try {
        await voluntariosApi.deleteVoluntario(id);
        await loadVoluntarios();
      } catch (error) {
        console.error('Erro ao excluir voluntário:', error);
      }
    }
  };

  const handleToggleStatus = async (voluntario: Voluntario) => {
    try {
      await voluntariosApi.updateVoluntario(voluntario.id, { ativo: !voluntario.ativo });
      await loadVoluntarios();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando voluntários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Voluntários</h1>
          <p className="text-muted-foreground">Gerencie os voluntários da equipe</p>
        </div>
        <Button onClick={() => navigate('/admin/voluntarios/novo')}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Voluntário
        </Button>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Buscar por nome, área ou formação..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => setShowInactive(!showInactive)}
                className="flex items-center gap-2"
              >
                {showInactive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showInactive ? 'Ocultar Inativos' : 'Mostrar Inativos'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Voluntários */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVoluntarios.map((voluntario) => (
          <Card key={voluntario.id} className="group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{voluntario.nome}</CardTitle>
                  <p className="text-sm text-primary font-medium">{voluntario.area}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={voluntario.ativo ? "default" : "secondary"}>
                    {voluntario.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {voluntario.foto_url && (
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={voluntario.foto_url}
                    alt={voluntario.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Formação</Label>
                  <p className="text-sm">{voluntario.formacao}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Tempo como Voluntário</Label>
                  <p className="text-sm">{voluntario.tempo_voluntario}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Biografia</Label>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {voluntario.bio}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/admin/voluntarios/${voluntario.id}/editar`)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleStatus(voluntario)}
                >
                  {voluntario.ativo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(voluntario.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVoluntarios.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum voluntário encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Comece adicionando um novo voluntário.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => navigate('/admin/voluntarios/novo')}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Voluntário
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminVoluntarios;
