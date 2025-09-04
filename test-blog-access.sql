-- ===== TESTAR ACESSO À TABELA BLOG_POSTS =====

-- 1. Verificar se a tabela existe e tem dados
SELECT 'Verificando tabela...' as status;
SELECT COUNT(*) as total_posts FROM blog_posts;

-- 2. Verificar posts publicados
SELECT 'Verificando posts publicados...' as status;
SELECT COUNT(*) as published_posts FROM blog_posts WHERE status = 'published';

-- 3. Listar todos os posts (deve funcionar para admins)
SELECT 'Listando todos os posts...' as status;
SELECT id, title, status, created_at FROM blog_posts ORDER BY created_at DESC;

-- 4. Listar apenas posts publicados (deve funcionar para todos)
SELECT 'Listando posts publicados...' as status;
SELECT id, title, author, category, published_at FROM blog_posts WHERE status = 'published' ORDER BY published_at DESC;

-- 5. Verificar políticas RLS
SELECT 'Verificando políticas RLS...' as status;
SELECT 
    policyname,
    permissive,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'blog_posts';

-- 6. Testar inserção de um post de teste
SELECT 'Inserindo post de teste...' as status;
INSERT INTO blog_posts (title, subtitle, keywords, excerpt, content, author, category, tags, status, published_at) VALUES
(
    'Post de Teste - Verificar Funcionamento',
    'Teste para verificar se a tabela está funcionando',
    'teste, verificação, funcionamento',
    'Este é um post de teste para verificar se a tabela blog_posts está funcionando corretamente.',
    '<p>Este é um post de teste para verificar se a tabela blog_posts está funcionando corretamente.</p><p>Se você conseguir ver este post, significa que a tabela está funcionando.</p>',
    'Sistema de Teste',
    'Teste',
    ARRAY['teste', 'verificação'],
    'published',
    NOW()
);

-- 7. Verificar se o post foi inserido
SELECT 'Verificando inserção...' as status;
SELECT COUNT(*) as total_after_insert FROM blog_posts;
SELECT COUNT(*) as published_after_insert FROM blog_posts WHERE status = 'published';

-- 8. Limpar post de teste
SELECT 'Limpando post de teste...' as status;
DELETE FROM blog_posts WHERE title = 'Post de Teste - Verificar Funcionamento';

-- 9. Status final
SELECT 'Teste concluído' as status;
SELECT 
    'Resumo final:' as info,
    COUNT(*) as total_posts,
    COUNT(CASE WHEN status = 'published' THEN 1 END) as published_posts,
    COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_posts
FROM blog_posts;
