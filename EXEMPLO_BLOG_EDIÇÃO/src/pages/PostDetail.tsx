import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Calendar, Leaf } from 'lucide-react';

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, getCategoryById, posts } = useBlog();

  const post = id ? getPostById(id) : undefined;
  const category = post ? getCategoryById(post.categoryId) : undefined;

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Postagem não encontrada</h1>
          <Button onClick={() => navigate('/')}>Voltar para a página inicial</Button>
        </div>
      </div>
    );
  }

  const relatedPosts = posts
    .filter((p) => p.categoryId === post.categoryId && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Campanha Ambiental IFMGSJE</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <article className="mx-auto max-w-4xl">
          {post.imageUrl && (
            <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="mb-6">
            {category && (
              <Badge
                className="mb-4"
                style={{ backgroundColor: category.color, color: '#fff' }}
              >
                {category.name}
              </Badge>
            )}
            <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>

          <div className="prose prose-green max-w-none">
            <p className="whitespace-pre-wrap text-lg leading-relaxed">{post.content}</p>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-6 text-2xl font-bold">Postagens Relacionadas</h2>
              <div className="grid gap-4 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => {
                  const relatedCategory = getCategoryById(relatedPost.categoryId);
                  return (
                    <Card
                      key={relatedPost.id}
                      className="group overflow-hidden transition-all hover:shadow-lg"
                    >
                      <Link to={`/post/${relatedPost.id}`} className="block p-4">
                        {relatedCategory && (
                          <Badge
                            className="mb-2"
                            style={{ backgroundColor: relatedCategory.color, color: '#fff' }}
                          >
                            {relatedCategory.name}
                          </Badge>
                        )}
                        <h3 className="line-clamp-2 font-semibold group-hover:text-primary">
                          {relatedPost.title}
                        </h3>
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
