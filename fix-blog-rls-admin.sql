-- ===== CORREÇÃO RLS PARA ADMIN - BLOG_POSTS =====
-- Execute este script no SQL Editor do Supabase para permitir criação e edição de publicações

-- 1. Verificar políticas atuais
SELECT '=== POLÍTICAS ATUAIS ===' as info;
SELECT 
    policyname,
    permissive,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'blog_posts'
ORDER BY policyname;

-- 2. Remover TODAS as políticas existentes
DROP POLICY IF EXISTS "Public blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Admins have full access to blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for users based on email" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_select_published" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_select_all" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_insert" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_update" ON blog_posts;
DROP POLICY IF EXISTS "blog_posts_delete" ON blog_posts;

-- 3. Criar políticas PERMISSIVAS para permitir todas as operações
-- IMPORTANTE: Estas políticas permitem acesso total. Ajuste conforme necessário para produção.

-- Política 1: Leitura de posts publicados (público)
CREATE POLICY "blog_posts_select_published" ON blog_posts
    FOR SELECT 
    USING (status = 'published');

-- Política 2: Leitura de todos os posts (para admin)
CREATE POLICY "blog_posts_select_all" ON blog_posts
    FOR SELECT 
    USING (true);

-- Política 3: Inserção (criação de posts) - PERMITIR TODOS
CREATE POLICY "blog_posts_insert" ON blog_posts
    FOR INSERT 
    WITH CHECK (true);

-- Política 4: Atualização (edição de posts) - PERMITIR TODOS
CREATE POLICY "blog_posts_update" ON blog_posts
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Política 5: Exclusão - PERMITIR TODOS
CREATE POLICY "blog_posts_delete" ON blog_posts
    FOR DELETE 
    USING (true);

-- 4. Verificar se RLS está habilitado
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 5. Verificar políticas criadas
SELECT '=== POLÍTICAS CRIADAS ===' as info;
SELECT 
    policyname,
    permissive,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'blog_posts'
ORDER BY policyname;

-- 6. Teste de inserção (opcional - descomente para testar)
/*
INSERT INTO blog_posts (
    title, 
    keywords, 
    excerpt, 
    content, 
    author, 
    category, 
    tags, 
    status
) VALUES (
    'Teste de Criação',
    'teste, admin',
    'Este é um teste de criação de post',
    '<p>Conteúdo de teste</p>',
    'Admin',
    'Outros',
    ARRAY['teste'],
    'draft'
);
*/

-- 7. Verificar status final
SELECT '=== STATUS FINAL ===' as info;
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE tablename = 'blog_posts';

SELECT '=== CORREÇÃO CONCLUÍDA ===' as status;
SELECT 'Agora você deve conseguir criar e editar publicações no /admin' as mensagem;

