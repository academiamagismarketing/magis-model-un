import { useState, useEffect } from 'react';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadImage } from '@/lib/supabaseClient';

interface PostFormProps {
  postId?: string;
  onClose: () => void;
}

export default function PostForm({ postId, onClose }: PostFormProps) {
  const { categories, getPostById, addPost, updatePost } = useBlog();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (postId) {
      const post = getPostById(postId);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setCategoryId(post.categoryId);
        setImageUrl(post.imageUrl || '');
      }
    }
  }, [postId, getPostById]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const excerpt = content.substring(0, 150);

      let finalImageUrl = imageUrl || undefined;
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          finalImageUrl = uploadedUrl;
        } else {
          toast({ title: 'Falha no upload da imagem', variant: 'destructive' });
        }
      }

      if (postId) {
        await updatePost(postId, { title, content, excerpt, categoryId, imageUrl: finalImageUrl });
        toast({
          title: 'Postagem atualizada',
          description: 'As alterações foram salvas com sucesso.',
        });
      } else {
        await addPost({ title, content, excerpt, categoryId, imageUrl: finalImageUrl });
        toast({
          title: 'Postagem criada',
          description: 'A nova postagem foi publicada com sucesso.',
        });
      }

      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold text-primary">
              {postId ? 'Editar Postagem' : 'Nova Postagem'}
            </h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onClose} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>

        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle>{postId ? 'Editar Postagem' : 'Criar Nova Postagem'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite o título da postagem"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select value={categoryId} onValueChange={setCategoryId} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageFile">Imagem de Capa (upload)</Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                <Label htmlFor="imageUrl">ou URL da Imagem de Capa</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo *</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Digite o conteúdo da postagem..."
                  rows={15}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" disabled={isSaving}>
                  {isSaving ? 'Salvando...' : postId ? 'Atualizar' : 'Publicar'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
