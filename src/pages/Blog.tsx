import React, { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight,
  BookOpen,
  Clock,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogApi, BlogPost } from '@/lib/supabase';
import blogHeroImage from '@/assets/imagens/14-MENTORIA.jpg';

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, categoryFilter, tagFilter]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await blogApi.getPublicBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoria
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    // Filtro por tag
    if (tagFilter !== 'all') {
      filtered = filtered.filter(post => post.tags.includes(tagFilter));
    }

    setFilteredPosts(filtered);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getUniqueCategories = () => {
    const categories = posts.map(post => post.category);
    return ['all', ...Array.from(new Set(categories))];
  };

  const getUniqueTags = () => {
    const allTags = posts.flatMap(post => post.tags);
    return ['all', ...Array.from(new Set(allTags))];
  };

  const handleReadMore = (postId: string) => {
    navigate(`/publicacoes/${postId}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-24 md:pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando publicações...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Publicações da Academia MAGIS
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
              Descubra insights, notícias e reflexões sobre diplomacia, 
              relações internacionais e o mundo MUN.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>{posts.length} artigos publicados</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Especialistas e mentores</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtros e Busca */}
      <section className="py-6 md:py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-4">
            {/* Busca */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Filtro por categoria */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
                >
                  {getUniqueCategories().map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Todas as categorias' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro por tag */}
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto"
                >
                  {getUniqueTags().map(tag => (
                    <option key={tag} value={tag}>
                      {tag === 'all' ? 'Todas as tags' : tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Posts */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 md:py-16">
              <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                Nenhum artigo encontrado
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                {searchTerm || categoryFilter !== 'all' || tagFilter !== 'all' 
                  ? 'Tente ajustar os filtros de busca.' 
                  : 'Ainda não há artigos publicados.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={post.image_url || blogHeroImage}
                        alt={post.title}
                        className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <Badge variant="secondary" className="bg-background/80 text-foreground text-xs sm:text-sm">
                          {post.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{formatDate(post.published_at || post.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg sm:text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    
                    <p className="text-sm sm:text-base text-muted-foreground mb-4 line-clamp-3">
                      {truncateText(post.excerpt, 120)}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <Button
                      onClick={() => handleReadMore(post.id)}
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      Ler mais
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Quer contribuir com o blog?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Se você tem experiência em diplomacia, relações internacionais ou MUN, 
            compartilhe seu conhecimento conosco!
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Entre em contato
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
