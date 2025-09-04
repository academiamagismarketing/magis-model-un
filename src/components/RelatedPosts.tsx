import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';
import { BlogPost } from '@/lib/supabase';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: string;
  category: string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts, currentPostId, category }) => {
  // Filtrar posts da mesma categoria, excluindo o post atual
  const relatedPosts = posts
    .filter(post => post.id !== currentPostId && post.status === 'published')
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Artigos Relacionados sobre {category}
        </h2>
        <p className="text-muted-foreground">
          Continue explorando conteúdo sobre simulações acadêmicas e mentorias educacionais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <article 
            key={post.id}
            className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            {/* Imagem */}
            {post.image_url && (
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image_url}
                  alt={`Imagem ilustrativa: ${post.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            )}

            {/* Conteúdo */}
            <div className="p-4">
              {/* Categoria */}
              <div className="mb-2">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Título */}
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                <Link 
                  to={`/publicacoes/${post.id}`}
                  className="hover:underline"
                  title={`Ler artigo: ${post.title}`}
                >
                  {post.title}
                </Link>
              </h3>

              {/* Subtítulo */}
              {post.subtitle && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {post.subtitle}
                </p>
              )}

              {/* Resumo */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta informações */}
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {post.author}
                  </span>
                  {post.published_at && (
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.published_at).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-3 flex items-center space-x-2">
                  <Tag className="w-3 h-3 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-muted px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-4">
                <Link
                  to={`/publicacoes/${post.id}`}
                  className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Ler artigo completo
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CTA para mais conteúdo */}
      <div className="mt-8 text-center">
        <Link
          to="/publicacoes"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          Ver todas as publicações
        </Link>
        <p className="text-sm text-muted-foreground mt-2">
          Descubra mais sobre simulações acadêmicas, mentorias e atividades MUN
        </p>
      </div>
    </section>
  );
};

export default RelatedPosts;
