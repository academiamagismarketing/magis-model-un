import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Save, 
  Package, 
  DollarSign, 
  Tag, 
  Link,
  FileText
} from 'lucide-react';
import { productsApi, Product } from '@/lib/supabase';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUpload from '@/components/ImageUpload';

const ProdutoForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image_url: '',
    category: '',
    status: 'active' as Product['status'],
    buy_link: ''
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditing) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const product = await productsApi.getProductById(id!);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price.toString(),
          image_url: product.image_url || '',
          category: product.category,
          status: product.status,
          buy_link: product.buy_link
        });
      }
    } catch (error) {
      console.error('Erro ao carregar produto:', error);
      setError('Erro ao carregar dados do produto');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        image_url: formData.image_url.trim() || null,
        category: formData.category.trim(),
        status: formData.status,
        buy_link: formData.buy_link.trim()
      };

      // Validações
      if (!productData.name) {
        throw new Error('Nome do produto é obrigatório');
      }
      if (!productData.description) {
        throw new Error('Descrição do produto é obrigatória');
      }
      if (isNaN(productData.price) || productData.price <= 0) {
        throw new Error('Preço deve ser um valor válido maior que zero');
      }
      if (!productData.category) {
        throw new Error('Categoria é obrigatória');
      }
      if (!productData.buy_link) {
        throw new Error('Link de compra é obrigatório');
      }

      if (isEditing) {
        await productsApi.updateProduct(id!, productData);
      } else {
        await productsApi.createProduct(productData);
      }

      navigate('/admin/produtos');
    } catch (error: any) {
      console.error('Erro ao salvar produto:', error);
      setError(error.message || 'Erro ao salvar produto');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/admin/produtos')}
            variant="ghost"
            size="sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              {isEditing ? 'Editar Produto' : 'Novo Produto'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Edite as informações do produto' : 'Crie um novo produto para a Academia MAGIS'}
            </p>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Informações do Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome do Produto */}
              <div className="md:col-span-2">
                <Label htmlFor="name" className="text-foreground font-medium">
                  Nome do Produto *
                </Label>
                <div className="relative mt-2">
                  <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Ex: Manual de Simulação ONU"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Descrição */}
              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-foreground font-medium">
                  Descrição *
                </Label>
                <div className="relative mt-2">
                  <FileText className="absolute left-3 top-3 text-muted-foreground w-4 h-4" />
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Descreva o produto em detalhes..."
                    className="pl-10 min-h-[100px]"
                    required
                  />
                </div>
              </div>

              {/* Preço */}
              <div>
                <Label htmlFor="price" className="text-foreground font-medium">
                  Preço (R$) *
                </Label>
                <div className="relative mt-2">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="0,00"
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <Label htmlFor="category" className="text-foreground font-medium">
                  Categoria *
                </Label>
                <div className="relative mt-2">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Pins">Pins</option>
                    <option value="Kits">Kits</option>
                    <option value="Cursos">Cursos</option>
                    <option value="Decorativos">Decorativos</option>
                    <option value="Serviços">Serviços</option>
                  </select>
                </div>
              </div>

              {/* Status */}
              <div>
                <Label htmlFor="status" className="text-foreground font-medium">
                  Status
                </Label>
                <div className="relative mt-2">
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="active">Ativo</option>
                    <option value="inactive">Inativo</option>
                    <option value="out_of_stock">Sem Estoque</option>
                  </select>
                </div>
              </div>

              {/* Link de Compra */}
              <div className="md:col-span-2">
                <Label htmlFor="buy_link" className="text-foreground font-medium">
                  Link de Compra *
                </Label>
                <div className="relative mt-2">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="buy_link"
                    type="url"
                    value={formData.buy_link}
                    onChange={(e) => handleInputChange('buy_link', e.target.value)}
                    placeholder="https://wa.me/553191578389?text=Olá! Gostaria de comprar..."
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Link do WhatsApp ou outra plataforma de venda
                </p>
              </div>

              {/* Upload de Imagem */}
              <div className="md:col-span-2">
                <ImageUpload
                  currentImageUrl={formData.image_url}
                  onImageChange={(url) => handleInputChange('image_url', url)}
                  folder="products"
                  label="Imagem do Produto (opcional)"
                  showUrlInput={true}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Faça upload de uma imagem ou use uma URL externa
                </p>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="button"
                onClick={() => navigate('/admin/produtos')}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 btn-primary"
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Salvando...' : (isEditing ? 'Atualizar Produto' : 'Criar Produto')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProdutoForm;
