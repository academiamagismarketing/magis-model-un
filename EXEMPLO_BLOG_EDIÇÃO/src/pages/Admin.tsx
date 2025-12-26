import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Plus, FileText, FolderTree, Leaf, Heart } from 'lucide-react';
import PostsManager from '@/components/admin/PostsManager';
import CategoriesManager from '@/components/admin/CategoriesManager';
import PostForm from '@/components/admin/PostForm';
import { HeartbeatMonitor } from '@/components/HeartbeatMonitor';

export default function Admin() {
  const { logout, user } = useAuth();
  const { posts, categories } = useBlog();
  const navigate = useNavigate();
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | undefined>();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNewPost = () => {
    setEditingPostId(undefined);
    setShowPostForm(true);
  };

  const handleEditPost = (id: string) => {
    setEditingPostId(id);
    setShowPostForm(true);
  };

  const handleCloseForm = () => {
    setShowPostForm(false);
    setEditingPostId(undefined);
  };

  if (showPostForm) {
    return <PostForm postId={editingPostId} onClose={handleCloseForm} />;
  }

  const postsByCategory = categories.map((category) => ({
    category: category.name,
    count: posts.filter((p) => p.categoryId === category.id).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-primary">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">Campanha Ambiental IFMGSJE</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Postagens</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categorias</CardTitle>
              <FolderTree className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{categories.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Última Postagem</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {posts[0]
                  ? new Date(posts[0].createdAt).toLocaleDateString('pt-BR')
                  : 'Nenhuma'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Postagens por Categoria</CardTitle>
            <CardDescription>Distribuição do conteúdo por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {postsByCategory.map(({ category, count }) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{category}</span>
                  <span className="text-sm text-muted-foreground">{count} postagens</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mb-4">
          <Button onClick={handleNewPost}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Postagem
          </Button>
        </div>

        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="posts">Postagens</TabsTrigger>
            <TabsTrigger value="categories">Categorias</TabsTrigger>
            <TabsTrigger value="heartbeat">
              <Heart className="mr-2 h-4 w-4" />
              Heartbeat
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-6">
            <PostsManager onEdit={handleEditPost} />
          </TabsContent>
          <TabsContent value="categories" className="mt-6">
            <CategoriesManager />
          </TabsContent>
          <TabsContent value="heartbeat" className="mt-6">
            <HeartbeatMonitor />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
