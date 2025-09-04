-- ===== CORRIGIR POLÍTICAS RLS DA TABELA BLOG_POSTS =====

-- 1. Verificar políticas atuais
SELECT 'Políticas atuais:' as info;
SELECT 
    policyname,
    permissive,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'blog_posts';

-- 2. Remover políticas existentes que possam estar causando problemas
DROP POLICY IF EXISTS "Public blog posts are viewable by everyone" ON blog_posts;
DROP POLICY IF EXISTS "Admins have full access to blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for users based on email" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for users based on email" ON blog_posts;

-- 3. Criar políticas mais simples e funcionais

-- Política 1: Permitir leitura de posts publicados para todos
CREATE POLICY "blog_posts_select_published" ON blog_posts
    FOR SELECT 
    USING (status = 'published');

-- Política 2: Permitir leitura de todos os posts para usuários autenticados
CREATE POLICY "blog_posts_select_all" ON blog_posts
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Política 3: Permitir inserção para usuários autenticados
CREATE POLICY "blog_posts_insert" ON blog_posts
    FOR INSERT 
    WITH CHECK (auth.role() = 'authenticated');

-- Política 4: Permitir atualização para usuários autenticados
CREATE POLICY "blog_posts_update" ON blog_posts
    FOR UPDATE 
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- Política 5: Permitir exclusão para usuários autenticados
CREATE POLICY "blog_posts_delete" ON blog_posts
    FOR DELETE 
    USING (auth.role() = 'authenticated');

-- 4. Alternativa: Desabilitar RLS temporariamente para teste
-- ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- 5. Verificar políticas criadas
SELECT 'Políticas criadas:' as info;
SELECT 
    policyname,
    permissive,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'blog_posts'
ORDER BY policyname;

-- 6. Testar acesso com as novas políticas
SELECT 'Testando acesso...' as info;

-- Teste 1: Contar posts publicados (deve funcionar)
SELECT 'Posts publicados:' as teste, COUNT(*) as total FROM blog_posts WHERE status = 'published';

-- Teste 2: Contar todos os posts (deve funcionar para usuários autenticados)
SELECT 'Todos os posts:' as teste, COUNT(*) as total FROM blog_posts;

-- Teste 3: Listar alguns posts publicados
SELECT 'Lista de posts publicados:' as teste;
SELECT id, title, author, category, published_at 
FROM blog_posts 
WHERE status = 'published' 
ORDER BY published_at DESC 
LIMIT 3;

-- 7. Se ainda houver problemas, desabilitar RLS completamente
-- ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
-- SELECT 'RLS desabilitado para teste' as status;

-- 8. Verificar status final
SELECT 
    'Status final:' as info,
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'blog_posts';
