import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { voluntariosApi, Voluntario } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

const VoluntarioForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    area: '',
    foto_url: '',
    bio: '',
    formacao: '',
    tempo_voluntario: '',
    ordem_exibicao: 0,
    ativo: true
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [useUrl, setUseUrl] = useState(false);

  useEffect(() => {
    if (isEditing) {
      loadVoluntario();
    }
  }, [id]);

  const loadVoluntario = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const voluntario = await voluntariosApi.getVoluntarioById(id);
      if (voluntario) {
        setFormData({
          nome: voluntario.nome,
          area: voluntario.area,
          foto_url: voluntario.foto_url || '',
          bio: voluntario.bio,
          formacao: voluntario.formacao,
          tempo_voluntario: voluntario.tempo_voluntario,
          ordem_exibicao: voluntario.ordem_exibicao,
          ativo: voluntario.ativo
        });
        setUseUrl(!!voluntario.foto_url);
      }
    } catch (error) {
      console.error('Erro ao carregar voluntário:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `equipe/voluntarios/${fileName}`;

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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadImage(file);
      setFormData(prev => ({ ...prev, foto_url: url }));
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da imagem');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.area || !formData.bio || !formData.formacao || !formData.tempo_voluntario) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      setSaving(true);
      
      if (isEditing && id) {
        await voluntariosApi.updateVoluntario(id, formData);
      } else {
        await voluntariosApi.createVoluntario(formData);
      }
      
      navigate('/admin/voluntarios');
    } catch (error) {
      console.error('Erro ao salvar voluntário:', error);
      alert('Erro ao salvar voluntário');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/voluntarios')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? 'Editar Voluntário' : 'Novo Voluntário'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Edite as informações do voluntário' : 'Adicione um novo voluntário à equipe'}
            </p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome *</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => handleInputChange('nome', e.target.value)}
                      placeholder="Nome completo"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="area">Área de Atuação *</Label>
                    <Input
                      id="area"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      placeholder="Ex: Logística e Eventos"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="formacao">Formação *</Label>
                    <Input
                      id="formacao"
                      value={formData.formacao}
                      onChange={(e) => handleInputChange('formacao', e.target.value)}
                      placeholder="Ex: Administração - UFMG"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="tempo_voluntario">Tempo como Voluntário *</Label>
                    <Input
                      id="tempo_voluntario"
                      value={formData.tempo_voluntario}
                      onChange={(e) => handleInputChange('tempo_voluntario', e.target.value)}
                      placeholder="Ex: 2 anos"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Biografia *</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Descreva a experiência e contribuições do voluntário..."
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="ordem_exibicao">Ordem de Exibição</Label>
                  <Input
                    id="ordem_exibicao"
                    type="number"
                    value={formData.ordem_exibicao}
                    onChange={(e) => handleInputChange('ordem_exibicao', parseInt(e.target.value) || 0)}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Números menores aparecem primeiro
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna lateral */}
          <div className="space-y-6">
            {/* Foto */}
            <Card>
              <CardHeader>
                <CardTitle>Foto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="use-url"
                    checked={useUrl}
                    onCheckedChange={setUseUrl}
                  />
                  <Label htmlFor="use-url">Usar URL</Label>
                </div>

                {useUrl ? (
                  <div>
                    <Label htmlFor="foto_url">URL da Imagem</Label>
                    <Input
                      id="foto_url"
                      value={formData.foto_url}
                      onChange={(e) => handleInputChange('foto_url', e.target.value)}
                      placeholder="https://exemplo.com/foto.jpg"
                    />
                  </div>
                ) : (
                  <div>
                    <Label>Upload de Imagem</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {uploading ? 'Fazendo upload...' : 'Escolher arquivo'}
                      </label>
                    </div>
                  </div>
                )}

                {formData.foto_url && (
                  <div className="mt-4">
                    <Label>Preview</Label>
                    <div className="mt-2 aspect-square bg-muted rounded-lg overflow-hidden">
                      <img
                        src={formData.foto_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleInputChange('foto_url', '')}
                      className="mt-2"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Remover
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ativo"
                    checked={formData.ativo}
                    onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                  />
                  <Label htmlFor="ativo">Ativo</Label>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Voluntários inativos não aparecem na página pública
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/voluntarios')}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VoluntarioForm;
