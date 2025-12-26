import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabaseClient';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl?: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogContextType {
  posts: Post[];
  categories: Category[];
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getPostById: (id: string) => Post | undefined;
  getCategoryById: (id: string) => Category | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Initial load from Supabase and seed categories if empty
    (async () => {
      const [{ data: cats }, { data: psts }] = await Promise.all([
        supabase.from('categories').select('*').order('name', { ascending: true }),
        supabase.from('posts').select('*').order('createdAt', { ascending: false }),
      ]);

      if (!cats || cats.length === 0) {
        const defaultCategories = [
          { name: 'Reciclagem', color: '#7cb342' },
          { name: 'Biodiversidade', color: '#1a5f3f' },
          { name: 'Energia Limpa', color: '#fdd835' },
          { name: 'Conservação da Água', color: '#42a5f5' },
          { name: 'Educação Ambiental', color: '#8e24aa' },
        ];
        await supabase.from('categories').insert(defaultCategories);
        const { data: recats } = await supabase
          .from('categories')
          .select('*')
          .order('name', { ascending: true });
        if (recats) {
          setCategories(recats.map((c: any) => ({ id: String(c.id), name: c.name, color: c.color })));
        }
      } else {
        setCategories(cats.map((c: any) => ({ id: String(c.id), name: c.name, color: c.color })));
      }

      if (psts) {
        setPosts(
          psts.map((p: any) => ({
            id: String(p.id),
            title: p.title,
            content: p.content,
            excerpt: p.excerpt,
            imageUrl: p.imageUrl ?? undefined,
            categoryId: String(p.categoryId),
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
          }))
        );
      }
    })();
  }, []);

  const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    (async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('posts')
        .insert([{ ...post, createdAt: now, updatedAt: now }])
        .select('*')
        .single();
      if (!error && data) {
        const newPost: Post = {
          id: String(data.id),
          title: data.title,
          content: data.content,
          excerpt: data.excerpt,
          imageUrl: data.imageUrl ?? undefined,
          categoryId: String(data.categoryId),
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        };
        setPosts((prev) => [newPost, ...prev]);
      }
    })();
  };

  const updatePost = (id: string, post: Partial<Post>) => {
    (async () => {
      const payload: any = { ...post, updatedAt: new Date().toISOString() };
      const { data, error } = await supabase
        .from('posts')
        .update(payload)
        .eq('id', id)
        .select('*')
        .single();
      if (!error && data) {
        setPosts((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  id: String(data.id),
                  title: data.title,
                  content: data.content,
                  excerpt: data.excerpt,
                  imageUrl: data.imageUrl ?? undefined,
                  categoryId: String(data.categoryId),
                  createdAt: data.createdAt,
                  updatedAt: data.updatedAt,
                }
              : p
          )
        );
      }
    })();
  };

  const deletePost = (id: string) => {
    (async () => {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (!error) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
      }
    })();
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    (async () => {
      const { data, error } = await supabase
        .from('categories')
        .insert([category])
        .select('*')
        .single();
      if (!error && data) {
        const newCategory: Category = { id: String(data.id), name: data.name, color: data.color };
        setCategories((prev) => [...prev, newCategory]);
      }
    })();
  };

  const updateCategory = (id: string, category: Partial<Category>) => {
    (async () => {
      const { data, error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', id)
        .select('*')
        .single();
      if (!error && data) {
        setCategories((prev) =>
          prev.map((c) => (c.id === id ? { id: String(data.id), name: data.name, color: data.color } : c))
        );
      }
    })();
  };

  const deleteCategory = (id: string) => {
    (async () => {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (!error) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      }
    })();
  };

  const getPostById = (id: string) => posts.find((p) => p.id === id);
  const getCategoryById = (id: string) => categories.find((c) => c.id === id);

  return (
    <BlogContext.Provider
      value={{
        posts,
        categories,
        addPost,
        updatePost,
        deletePost,
        addCategory,
        updateCategory,
        deleteCategory,
        getPostById,
        getCategoryById,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return context;
}
