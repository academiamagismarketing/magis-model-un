import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus, 
  X
} from 'lucide-react';
import { blogApi, BlogPost } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    keywords: '',
    excerpt: '',
    content: '',
    references: '',
    author: '',
    category: '',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published' | 'archived',
    image_url: '',
    published_at: ''
  });

  const [newTag, setNewTag] = useState('');

  const categories = [
    'Diplomacia',
    'Relações Internacionais',
    'MUN',
    'Política Externa',
    'Cooperação Internacional',
    'Direito Internacional',
    'Economia Global',
    'Cultura e Sociedade',
    'Tecnologia e Inovação',
    'Sustentabilidade',
    'Outros'
  ];

  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const post = await blogApi.getBlogPostById(id!);
      if (post) {
        setFormData({
          title: post.title,
          subtitle: post.subtitle || '',
          keywords: post.keywords,
          excerpt: post.excerpt,
          content: post.content,
          references: post.references || '',
          author: post.author,
          category: post.category,
          tags: post.tags,
          status: post.status,
          image_url: post.image_url || '',
          published_at: post.published_at || ''
        });
      }
    } catch (error) {
      console.error('Erro ao carregar publicação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a publicação.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.keywords.trim() || !formData.excerpt.trim() || !formData.content.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSaving(true);
      
      const postData = {
        ...formData,
        published_at: formData.status === 'published' ? (formData.published_at || new Date().toISOString()) : null
      };

      if (isEditing) {
        await blogApi.updateBlogPost(id!, postData);
        toast({
          title: "Sucesso",
          description: "Publicação atualizada com sucesso!",
        });
      } else {
        await blogApi.createBlogPost(postData);
        toast({
          title: "Sucesso",
          description: "Publicação criada com sucesso!",
        });
      }
      
      navigate('/admin/publicacoes');
    } catch (error) {
      console.error('Erro ao salvar publicação:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a publicação.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Carregando publicação...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/publicacoes')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? 'Editar Publicação' : 'Nova Publicação'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Atualize as informações da publicação' : 'Crie uma nova publicação para o blog'}
            </p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          onClick={togglePreview}
          className="flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>{previewMode ? 'Editar' : 'Visualizar'}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Publicação</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Título (Obrigatório) */}
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Digite o título da publicação"
                    required
                  />
                </div>

                {/* Subtítulo (Opcional) */}
                <div>
                  <Label htmlFor="subtitle">Subtítulo</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => handleInputChange('subtitle', e.target.value)}
                    placeholder="Digite o subtítulo da publicação (opcional)"
                  />
                </div>

                {/* Palavras-chave (Obrigatório) */}
                <div>
                  <Label htmlFor="keywords">Palavras-chave *</Label>
                  <Textarea
                    id="keywords"
                    value={formData.keywords}
                    onChange={(e) => handleInputChange('keywords', e.target.value)}
                    placeholder="Digite as palavras-chave separadas por vírgula (ex: MUN, Diplomacia, Educação)"
                    rows={3}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Separe as palavras-chave por vírgula para melhor indexação
                  </p>
                </div>

                {/* Resumo (Obrigatório) */}
                <div>
                  <Label htmlFor="excerpt">Resumo *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Digite um resumo da publicação"
                    rows={4}
                    required
                  />
                </div>

                {/* Corpo de Texto (Obrigatório) */}
                <div>
                  <Label htmlFor="content">Corpo de Texto *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Digite o conteúdo completo da publicação (HTML suportado)"
                    rows={15}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Você pode usar HTML para formatação (h2, h3, p, ul, ol, strong, em, etc.)
                  </p>
                </div>

                {/* Referências (Opcional) */}
                <div>
                  <Label htmlFor="references">Referências</Label>
                  <Textarea
                    id="references"
                    value={formData.references}
                    onChange={(e) => handleInputChange('references', e.target.value)}
                    placeholder="Digite as referências bibliográficas (opcional)"
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Liste as fontes e referências utilizadas na publicação
                  </p>
                </div>

                {/* Autor */}
                <div>
                  <Label htmlFor="author">Autor</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    placeholder="Nome do autor"
                    required
                  />
                </div>

                {/* Categoria */}
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{tag}</span>
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => handleRemoveTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Adicionar tag"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                    <option value="archived">Arquivado</option>
                  </select>
                </div>

                {/* Data de Publicação */}
                {formData.status === 'published' && (
                  <div>
                    <Label htmlFor="published_at">Data de Publicação</Label>
                    <Input
                      id="published_at"
                      type="datetime-local"
                      value={formData.published_at}
                      onChange={(e) => handleInputChange('published_at', e.target.value)}
                    />
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="flex space-x-4">
                  <Button type="submit" disabled={saving} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Criar')}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/admin/publicacoes')}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upload de Imagem */}
          <Card>
            <CardHeader>
              <CardTitle>Imagem Principal</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUpload
                currentImageUrl={formData.image_url}
                onImageChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                folder="blog"
                label="Imagem da Publicação"
                showUrlInput={true}
              />
            </CardContent>
          </Card>

          {/* Preview */}
          {previewMode && (
            <Card>
              <CardHeader>
                <CardTitle>Pré-visualização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {formData.image_url && (
                    <img 
                      src={formData.image_url} 
                      alt={formData.title}
                      className="w-full h-48 object-cover rounded-md"
                    />
                  )}
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{formData.title}</h2>
                    {formData.subtitle && (
                      <h3 className="text-lg text-muted-foreground mb-4">{formData.subtitle}</h3>
                    )}
                    <p className="text-muted-foreground mb-4">{formData.excerpt}</p>
                    
                    {formData.keywords && (
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">Palavras-chave:</p>
                        <p className="text-sm text-muted-foreground">{formData.keywords}</p>
                      </div>
                    )}
                    
                    <div 
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: formData.content }}
                    />
                    
                    {formData.references && (
                      <div className="mt-6 pt-6 border-t">
                        <h4 className="font-semibold mb-2">Referências:</h4>
                        <div className="text-sm text-muted-foreground whitespace-pre-line">
                          {formData.references}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogForm;
