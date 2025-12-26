import { useState } from 'react';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const colorOptions = [
  '#7cb342',
  '#1a5f3f',
  '#fdd835',
  '#43a047',
  '#00897b',
  '#e53935',
  '#1e88e5',
  '#fb8c00',
];

export default function CategoriesManager() {
  const { categories, posts, addCategory, updateCategory, deleteCategory } = useBlog();
  const [showDialog, setShowDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>();
  const [name, setName] = useState('');
  const [color, setColor] = useState(colorOptions[0]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCategory(editingId, { name, color });
      toast({
        title: 'Categoria atualizada',
        description: 'As alterações foram salvas com sucesso.',
      });
    } else {
      addCategory({ name, color });
      toast({
        title: 'Categoria criada',
        description: 'A nova categoria foi adicionada com sucesso.',
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setShowDialog(false);
    setEditingId(undefined);
    setName('');
    setColor(colorOptions[0]);
  };

  const handleEdit = (id: string) => {
    const category = categories.find((c) => c.id === id);
    if (category) {
      setEditingId(id);
      setName(category.name);
      setColor(category.color);
      setShowDialog(true);
    }
  };

  const handleDelete = () => {
    if (deleteId) {
      const postsInCategory = posts.filter((p) => p.categoryId === deleteId).length;
      if (postsInCategory > 0) {
        toast({
          title: 'Não é possível excluir',
          description: `Existem ${postsInCategory} postagens nesta categoria.`,
          variant: 'destructive',
        });
      } else {
        deleteCategory(deleteId);
        toast({
          title: 'Categoria excluída',
          description: 'A categoria foi removida com sucesso.',
        });
      }
      setDeleteId(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Categorias</CardTitle>
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {categories.map((category) => {
              const postCount = posts.filter((p) => p.categoryId === category.id).length;
              return (
                <div
                  key={category.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <Badge style={{ backgroundColor: category.color, color: '#fff' }}>
                      {category.name}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {postCount} {postCount === 1 ? 'postagem' : 'postagens'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(category.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteId(category.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Editar Categoria' : 'Nova Categoria'}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? 'Atualize as informações da categoria.'
                : 'Crie uma nova categoria para organizar suas postagens.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Categoria</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Reciclagem"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Cor</Label>
              <div className="flex gap-2">
                {colorOptions.map((colorOption) => (
                  <button
                    key={colorOption}
                    type="button"
                    className={`h-10 w-10 rounded-full border-2 transition-transform hover:scale-110 ${
                      color === colorOption ? 'border-foreground scale-110' : 'border-border'
                    }`}
                    style={{ backgroundColor: colorOption }}
                    onClick={() => setColor(colorOption)}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                {editingId ? 'Atualizar' : 'Criar'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta categoria? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
