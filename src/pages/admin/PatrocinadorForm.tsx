import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Upload, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { patrocinadoresApi, Patrocinador } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';

const PatrocinadorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    nome: '',
    nome_completo: '',
    descricao: '',
    categoria: '',
    logo_url: '',
    link: '',
    ordem_exibicao: 0,
    ativo: true
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (isEditing) {
      loadPatrocinador();
    }
  }, [id]);

  const loadPatrocinador = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const patrocinador = await patrocinadoresApi.getPatrocinadorById(id);
      if (patrocinador) {
        setFormData({
          nome: patrocinador.nome,
          nome_completo: patrocinador.nome_completo,
          descricao: patrocinador.descricao || '',
          categoria: patrocinador.categoria,
          logo_url: patrocinador.logo_url || '',
          link: patrocinador.link || '',
          ordem_exibicao: patrocinador.ordem_exibicao,
          ativo: patrocinador.ativo
        });
        setPreviewUrl(patrocinador.logo_url || '');
      }
    } catch (error) {
      console.error('Erro ao carregar patrocinador:', error);
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Verificar se é uma imagem
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Verificar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `patrocinadores/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, logo_url: publicUrl }));
      setPreviewUrl(publicUrl);
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.nome_completo || !formData.categoria) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setSaving(true);
      
      if (isEditing) {
        await patrocinadoresApi.updatePatrocinador(id, formData);
      } else {
        await patrocinadoresApi.createPatrocinador(formData);
      }
      
      navigate('/admin/patrocinadores');
    } catch (error) {
      console.error('Erro ao salvar patrocinador:', error);
      alert('Erro ao salvar patrocinador. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando patrocinador...</p>
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
            onClick={() => navigate('/admin/patrocinadores')}
            className="btn-outline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {isEditing ? 'Editar Patrocinador' : 'Novo Patrocinador'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Edite as informações do patrocinador' : 'Adicione um novo patrocinador'}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome Abreviado *</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  placeholder="Ex: SIB"
                  required
                />
              </div>

              <div>
                <Label htmlFor="nome_completo">Nome Completo *</Label>
                <Input
                  id="nome_completo"
                  value={formData.nome_completo}
                  onChange={(e) => handleInputChange('nome_completo', e.target.value)}
                  placeholder="Ex: Sistema Internacional de Debates"
                  required
                />
              </div>

              <div>
                <Label htmlFor="categoria">Categoria *</Label>
                <Input
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => handleInputChange('categoria', e.target.value)}
                  placeholder="Ex: Debates, Simulações, etc."
                  required
                />
              </div>

              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => handleInputChange('descricao', e.target.value)}
                  placeholder="Breve descrição do patrocinador..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="link">Link do Site</Label>
                <Input
                  id="link"
                  type="url"
                  value={formData.link}
                  onChange={(e) => handleInputChange('link', e.target.value)}
                  placeholder="https://exemplo.com"
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
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="ativo"
                  checked={formData.ativo}
                  onCheckedChange={(checked) => handleInputChange('ativo', checked)}
                />
                <Label htmlFor="ativo">Patrocinador Ativo</Label>
              </div>
            </CardContent>
          </Card>

          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle>Logo do Patrocinador</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preview */}
              <div className="flex items-center justify-center h-40 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/25">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview do logo"
                    className="max-h-32 max-w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                    <p className="text-sm">Nenhuma imagem selecionada</p>
                  </div>
                )}
              </div>

              {/* Upload */}
              <div className="space-y-2">
                <Label htmlFor="logo-upload">Upload de Imagem</Label>
                <div className="flex gap-2">
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploading}
                    className="shrink-0"
                  >
                    {uploading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Formatos aceitos: JPG, PNG, GIF. Máximo 5MB.
                </p>
              </div>

              {/* URL Manual */}
              <div>
                <Label htmlFor="logo_url">Ou insira URL da imagem</Label>
                <Input
                  id="logo_url"
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => {
                    handleInputChange('logo_url', e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  placeholder="https://exemplo.com/logo.png"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/patrocinadores')}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={saving}
            className="btn-primary"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {isEditing ? 'Atualizar' : 'Criar'} Patrocinador
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatrocinadorForm;
