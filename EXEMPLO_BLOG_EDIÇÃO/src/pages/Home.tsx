import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '@/contexts/BlogContext';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Leaf } from 'lucide-react';

export default function Home() {
  const { posts, categories, getCategoryById } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || post.categoryId === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [posts, searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <Leaf className="h-8 sm:h-10 w-8 sm:w-10 text-primary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-primary text-center">Campanha Ambiental IFMGSJE</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-16">
        <section className="mb-8 sm:mb-12 text-center">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            Preservando o Futuro
          </h2>
          <p className="mx-auto max-w-3xl text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-10">
            Juntos por um ambiente mais sustentável. Explore nossas iniciativas e aprenda como
            fazer a diferença.
          </p>
        </section>

        <div className="mb-12 flex flex-col gap-6 items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar postagens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg w-full"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <Badge
              variant={selectedCategory === null ? 'default' : 'outline'}
              className="cursor-pointer py-2 px-3 sm:px-4 text-base sm:text-lg hover:scale-105 transition-transform"
              onClick={() => setSelectedCategory(null)}
            >
              Todas
            </Badge>
            {categories.map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="cursor-pointer py-2 px-3 sm:px-4 text-base sm:text-lg hover:scale-105 transition-transform"
                style={{
                  backgroundColor: selectedCategory === category.id ? category.color : undefined,
                  borderColor: category.color,
                  color: selectedCategory === category.id ? '#fff' : category.color,
                }}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => {
            const category = getCategoryById(post.categoryId);
            return (
              <Card
                key={post.id}
                className="group overflow-hidden transition-all hover:shadow-xl hover:-translate-y-2 flex flex-col h-full"
              >
                {post.imageUrl && (
                  <div className="aspect-video w-full overflow-hidden sm:aspect-video">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader className="pb-4">
                  {category && (
                    <Badge
                      className="mb-2 w-fit py-1.5 px-2 text-sm"
                      style={{ backgroundColor: category.color, color: '#fff' }}
                    >
                      {category.name}
                    </Badge>
                  )}
                  <CardTitle className="line-clamp-2 text-lg">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-3 line-clamp-3 text-muted-foreground text-base">{post.excerpt}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-2">
                    <span className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString('pt-BR')}
                    </span>
                    <Link
                      to={`/post/${post.id}`}
                      className="text-sm font-medium text-primary hover:underline text-center px-4 py-2 bg-muted rounded-md"
                    >
                      Ler mais →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-12 sm:py-16 text-center text-lg sm:text-xl text-muted-foreground">
            Nenhuma postagem encontrada.
          </div>
        )}
      </main>

      <footer className="border-t bg-muted/30 py-8 sm:py-12 mt-12 sm:mt-16">
        <div className="container mx-auto px-4 text-center text-sm sm:text-base text-muted-foreground">
          <p>© 2025 Campanha Ambiental IFMGSJE - Preservando o futuro juntos</p>
        </div>
      </footer>
    </div>
  );
}
