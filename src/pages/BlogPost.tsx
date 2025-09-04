import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Tag, 
  Share2, 
  BookOpen,
  Clock,
  Eye,
  Facebook,
  Twitter,
  Linkedin,
  Copy
} from 'lucide-react';
import { blogApi, type BlogPost as BlogPostType } from '@/lib/supabase';
import blogHeroImage from '@/assets/imagens/14-MENTORIA.jpg';
import { useToast } from '@/hooks/use-toast';
import SeoHead from '@/components/SeoHead';
import { PublicationBreadcrumbs } from '@/components/Breadcrumbs';
import RelatedPosts from '@/components/RelatedPosts';
import RichContent from '@/components/RichContent';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      setLoading(true);
      const data = await blogApi.getBlogPostById(postId);
      if (data) {
        setPost(data);
        // Carregar posts relacionados
        loadRelatedPosts(data.category, postId);
      } else {
        navigate('/publicacoes');
      }
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      navigate('/publicacoes');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedPosts = async (category: string, currentPostId: string) => {
    try {
      const posts = await blogApi.getBlogPostsByCategory(category);
      const filtered = posts.filter(p => p.id !== currentPostId).slice(0, 3);
      setRelatedPosts(filtered);
    } catch (error) {
      console.error('Erro ao carregar posts relacionados:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async (platform: string) => {
    if (!post) return;

    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          toast({
            title: "Link copiado!",
            description: "O link do artigo foi copiado para a área de transferência.",
          });
        } catch (error) {
          toast({
            title: "Erro ao copiar",
            description: "Não foi possível copiar o link automaticamente.",
            variant: "destructive",
          });
        }
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Carregando artigo...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <>
      {/* SEO Head */}
      <SeoHead
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords}
        author={post.author}
        publishedAt={post.published_at || post.created_at}
        imageUrl={post.image_url}
        url={window.location.href}
        type="article"
        category={post.category}
      />
      
      <div className="min-h-screen bg-background">
              {/* Header do Post */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-4 md:mb-6">
              <PublicationBreadcrumbs 
                category={post.category} 
                title={post.title} 
                isArticle={true} 
              />
            </div>

            {/* Categoria */}
            <div className="mb-3 md:mb-4">
              <Badge variant="secondary" className="text-xs md:text-sm">
                {post.category}
              </Badge>
            </div>

            {/* Título */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta informações */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Por {post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>5 min de leitura</span>
              </div>
            </div>

            {/* Resumo */}
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 md:mb-8">
              {post.excerpt}
            </p>

            {/* Botões de compartilhamento */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="text-sm text-muted-foreground">Compartilhar:</span>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare('facebook')}
                  className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                >
                  <Facebook className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare('twitter')}
                  className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                >
                  <Twitter className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare('linkedin')}
                  className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                >
                  <Linkedin className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare('copy')}
                  className="w-8 h-8 sm:w-9 sm:h-9 p-0"
                >
                  <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Imagem principal */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src={post.image_url || blogHeroImage}
              alt={post.title}
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Conteúdo do Post */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Conteúdo rico com formatação otimizada */}
            <RichContent 
              content={post.content} 
              className="mb-8"
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Relacionados */}
      {relatedPosts.length > 0 && (
        <RelatedPosts 
          posts={relatedPosts}
          currentPostId={post.id}
          category={post.category}
        />
      )}

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Gostou do artigo?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 md:mb-8 max-w-2xl mx-auto">
            Compartilhe com seus amigos e continue acompanhando nosso blog 
            para mais conteúdo sobre diplomacia e relações internacionais!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/publicacoes')}>
              Ver mais artigos
            </Button>
            <Button size="lg" variant="outline">
              Inscrever-se no blog
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </>
  );
};

export default BlogPost;
