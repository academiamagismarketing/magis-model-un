import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Star, 
  Award, 
  Heart,
  MessageSquare,
  CheckCircle,
  Package,
  Search,
  Filter,
  Users,
  Calendar,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productsApi, Product, statisticsApi, Statistic } from '@/lib/supabase';
import pinsImage from '@/assets/imagens/6.jpg';
import pinsCollectionImage from '@/assets/imagens/9.jpg';

const Produtos = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statistics, setStatistics] = useState<Statistic[]>([]);
  const [timeOfOperation, setTimeOfOperation] = useState(0);

  useEffect(() => {
    loadProducts();
    loadStatistics();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, categoryFilter]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productsApi.getActiveProducts();
      setProducts(data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const data = await statisticsApi.getPublicStatistics();
      setStatistics(data);
      
      // Calcular tempo de atuação
      const months = statisticsApi.calculateTimeOfOperation();
      setTimeOfOperation(months);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoria
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    setFilteredProducts(filtered);
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const handleBuy = (product: Product) => {
    window.open(product.buy_link, '_blank');
  };

  const benefits = [
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "Produtos fabricados com materiais de alta qualidade e acabamento profissional"
    },
    {
      icon: Heart,
      title: "Design Exclusivo",
      description: "Criados especialmente para a Academia MAGIS com designs únicos"
    },
    {
      icon: Package,
      title: "Entrega Segura",
      description: "Embalagem especial e entrega segura para todo o Brasil"
    },
    {
      icon: CheckCircle,
      title: "Garantia",
      description: "Garantia de qualidade e satisfação total com sua compra"
    }
  ];

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Estudante de RI",
      text: "Os produtos da Academia MAGIS são lindos! Qualidade excepcional e design único. Recomendo muito!"
    },
    {
      name: "João Santos",
      role: "Delegado",
      text: "Comprei a coleção diplomática e adorei! Os produtos são perfeitos para usar em eventos e simulações."
    },
    {
      name: "Ana Costa",
      role: "Professora",
      text: "Excelente qualidade e entrega rápida. Os produtos são um ótimo presente para estudantes de relações internacionais."
    }
  ];

  const categories = ['Pins', 'Kits', 'Cursos', 'Decorativos', 'Serviços'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  const getStatisticValue = (key: string) => {
    const stat = statistics.find(s => s.key === key);
    if (!stat) return 0;
    
    switch (key) {
      case 'valores_arrecadados':
        return stat.value;
      case 'delegados':
      case 'eventos_realizados':
        return Math.floor(stat.value);
      default:
        return stat.value;
    }
  };

  const formatStatisticValue = (key: string, value: number) => {
    switch (key) {
      case 'valores_arrecadados':
        return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
      case 'delegados':
      case 'eventos_realizados':
        return value.toLocaleString('pt-BR');
      default:
        return value.toString();
    }
  };



  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 md:pt-40 pb-20 md:pb-32 bg-gradient-to-br from-primary/80 to-primary/60 text-primary-foreground overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={pinsImage} 
              alt="Produtos Academia MAGIS" 
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/40"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 md:mb-6 px-4">
                Produtos Exclusivos
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto px-4">
              Compre nossos produtos e ajude a manter vivo o nosso projeto!
              </p>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-16 md:py-20 bg-background section-decor">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6 text-foreground">
                Nossos Produtos
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Descubra nossos produtos exclusivos, cada um com designs únicos 
                que representam a excelência da Academia MAGIS.
              </p>
            </div>

            {/* Filters */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {/* Busca */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Filtro por Categoria */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Todas as Categorias</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-muted-foreground">
                  {searchTerm || categoryFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Em breve teremos novos produtos disponíveis'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product.id} 
                    className="group overflow-hidden shadow-diplomatic hover:shadow-elegant transition-diplomatic border-0 bg-card"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={product.image_url || pinsCollectionImage} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-diplomatic"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-montserrat group-hover:text-primary transition-smooth">
                        {product.name}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl font-bold text-primary">
                          {formatPrice(product.price)}
                        </div>
                        <Button 
                          onClick={() => handleBuy(product)}
                          className="btn-outline"
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Comprar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-muted section-decor">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-6 text-foreground">
                Nossos Números
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Conheça alguns dos nossos principais indicadores e conquistas.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 hover-lift">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {formatStatisticValue('delegados', getStatisticValue('delegados'))}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">Delegados</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {formatStatisticValue('eventos_realizados', getStatisticValue('eventos_realizados'))}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">Eventos</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce">
                      <Star className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {formatStatisticValue('valores_arrecadados', getStatisticValue('valores_arrecadados'))}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">Arrecadados</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 icon-bounce">
                      <Clock className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {timeOfOperation}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">Meses de Atuação</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-20 bg-background section-decor">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6 text-foreground">
                O que Dizem Nossos Clientes
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
                Depoimentos de quem já adquiriu nossos produtos exclusivos.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-muted p-8 rounded-2xl"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-muted text-foreground section-decor">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 md:mb-6">
              Adquira Seus Produtos Exclusivos
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-3xl mx-auto px-4">
            Compre nossos produtos e ajude a manter vivo o nosso projeto!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Button
                onClick={() => window.open('https://wa.me/553191578389?text=Olá! Gostaria de saber mais sobre os produtos da Academia MAGIS', '_blank')}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>
              <Button
                onClick={() => navigate('/contato')}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto"
              >
                Outras Formas de Contato
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Produtos;
