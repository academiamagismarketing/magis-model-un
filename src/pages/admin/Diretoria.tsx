import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Users, 
  Eye, 
  EyeOff,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { diretoriaApi, Diretor } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

const AdminDiretoria = () => {
  const navigate = useNavigate();
  const [diretores, setDiretores] = useState<Diretor[]>([]);
  const [filteredDiretores, setFilteredDiretores] = useState<Diretor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  useEffect(() => {
    loadDiretores();
  }, []);

  useEffect(() => {
    filterDiretores();
  }, [diretores, searchTerm, showInactive]);

  const loadDiretores = async () => {
    try {
      setLoading(true);
      const data = await diretoriaApi.getAllDiretores();
      setDiretores(data);
    } catch (error) {
      console.error('Erro ao carregar diretores:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDiretores = () => {
    let filtered = diretores;

    // Filtrar por termo de busca
    if (searchTerm) {
      filtered = filtered.filter(diretor =>
        diretor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        diretor.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        diretor.formacao.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por status ativo/inativo
    if (!showInactive) {
      filtered = filtered.filter(diretor => diretor.ativo);
    }

    setFilteredDiretores(filtered);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este diretor?')) {
      try {
        await diretoriaApi.deleteDiretor(id);
        await loadDiretores();
      } catch (error) {
        console.error('Erro ao excluir diretor:', error);
      }
    }
  };

  const handleToggleStatus = async (diretor: Diretor) => {
    try {
      await diretoriaApi.updateDiretor(diretor.id, { ativo: !diretor.ativo });
      await loadDiretores();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `equipe/diretoria/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando diretores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerenciar Diretoria</h1>
          <p className="text-muted-foreground">Gerencie os membros da diretoria executiva</p>
        </div>
        <Button onClick={() => navigate('/admin/diretoria/novo')}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Diretor
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
                  placeholder="Buscar por nome, cargo ou formação..."
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

      {/* Lista de Diretores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDiretores.map((diretor) => (
          <Card key={diretor.id} className="group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{diretor.nome}</CardTitle>
                  <p className="text-sm text-primary font-medium">{diretor.cargo}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={diretor.ativo ? "default" : "secondary"}>
                    {diretor.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {diretor.foto_url && (
                <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                  <img
                    src={diretor.foto_url}
                    alt={diretor.nome}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Formação</Label>
                  <p className="text-sm">{diretor.formacao}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Experiência</Label>
                  <p className="text-sm">{diretor.experiencia}</p>
                </div>
                <div>
                  <Label className="text-xs font-medium text-muted-foreground">Biografia</Label>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {diretor.bio}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigate(`/admin/diretoria/${diretor.id}/editar`)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleStatus(diretor)}
                >
                  {diretor.ativo ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(diretor.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiretores.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum diretor encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Comece adicionando um novo diretor.'}
            </p>
            {!searchTerm && (
              <Button onClick={() => navigate('/admin/diretoria/novo')}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Primeiro Diretor
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminDiretoria;
