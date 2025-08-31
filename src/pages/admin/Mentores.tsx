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
  Star, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mentoresApi, Mentor } from '@/lib/supabase';

const AdminMentores = () => {
  const navigate = useNavigate();
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [filteredMentores, setFilteredMentores] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    loadMentores();
  }, []);

  useEffect(() => {
    filterMentores();
  }, [mentores, searchTerm, showInactive]);

  const loadMentores = async () => {
    try {
      setLoading(true);
      const data = await mentoresApi.getAllMentores();
      setMentores(data);
    } catch (error) {
      console.error('Erro ao carregar mentores:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterMentores = () => {
    let filtered = mentores;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(mentor =>
        mentor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mentor.formacao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por status ativo/inativo
    if (!showInactive) {
      filtered = filtered.filter(mentor => mentor.ativo);
    }

    setFilteredMentores(filtered);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este mentor?')) {
      try {
        await mentoresApi.deleteMentor(id);
        await loadMentores();
      } catch (error) {
        console.error('Erro ao excluir mentor:', error);
      }
    }
  };

  const handleToggleStatus = async (mentor: Mentor) => {
    try {
      await mentoresApi.updateMentor(mentor.id, { ativo: !mentor.ativo });
      await loadMentores();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando mentores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Mentores</h1>
          <p className="text-muted-foreground">Gerencie os mentores da equipe</p>
        </div>
        <Button onClick={() => navigate('/admin/mentores/novo')}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Mentor
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
                  placeholder="Buscar por nome, especialidade ou formação..."
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

      {/* Lista de Mentores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentores.map((mentor) => (
          <Card key={mentor.id} className="group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{mentor.nome}</CardTitle>
                  <p className="text-sm text-primary font-medium">{mentor.especialidade}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={mentor.ativo ? "default" : "secondary"}>
                    {mentor.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {mentor.foto_url && (
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={mentor.foto_url}
                    alt={mentor.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Formação</Label>
                  <p className="text-sm">{mentor.formacao}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Experiência</Label>
                  <p className="text-sm">{mentor.experiencia}</p>
                </div>

                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Biografia</Label>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {mentor.bio}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/admin/mentores/${mentor.id}/editar`)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleStatus(mentor)}
                >
                  {mentor.ativo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(mentor.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMentores.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum mentor encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Comece adicionando um novo mentor.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => navigate('/admin/mentores/novo')}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Mentor
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminMentores;
