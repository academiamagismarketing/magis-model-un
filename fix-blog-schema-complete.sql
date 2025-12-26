-- ===== DIAGNÓSTICO E CORREÇÃO COMPLETA DO BLOG =====
-- Execute este script no SQL Editor do Supabase para diagnosticar e corrigir o problema

-- PASSO 1: VERIFICAR ESTRUTURA ATUAL
SELECT '=== ESTRUTURA ATUAL DA TABELA blog_posts ===' as info;
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'blog_posts'
ORDER BY ordinal_position;

-- PASSO 2: VERIFICAR SE A COLUNA 'references' EXISTE
SELECT '=== VERIFICANDO COLUNA references ===' as info;
SELECT 
    CASE 
        WHEN EXISTS (
            SELECT 1 
            FROM information_schema.columns 
            WHERE table_schema = 'public' 
            AND table_name = 'blog_posts' 
            AND column_name = 'references'
        )
        THEN 'Coluna "references" EXISTE'
        ELSE 'Coluna "references" NÃO EXISTE - SERÁ ADICIONADA'
    END as status_references;

-- PASSO 3: ADICIONAR COLUNA 'references' SE NÃO EXISTIR
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'blog_posts' 
        AND column_name = 'references'
    ) THEN
        ALTER TABLE blog_posts ADD COLUMN references TEXT;
        RAISE NOTICE 'Coluna "references" adicionada com sucesso!';
    ELSE
        RAISE NOTICE 'Coluna "references" já existe.';
    END IF;
END $$;

-- PASSO 4: VERIFICAR ESTRUTURA FINAL
SELECT '=== ESTRUTURA FINAL DA TABELA blog_posts ===' as info;
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'blog_posts'
ORDER BY ordinal_position;

-- PASSO 5: VERIFICAR POLÍTICAS RLS
SELECT '=== POLÍTICAS RLS ATIVAS ===' as info;
SELECT 
    policyname,
    permissive,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'blog_posts'
ORDER BY policyname;

-- PASSO 6: TESTE DE INSERÇÃO
SELECT '=== TESTE DE INSERÇÃO ===' as info;
DO $$
DECLARE
    test_id UUID;
BEGIN
    -- Tentar inserir um post de teste
    INSERT INTO blog_posts (
        title,
        keywords,
        excerpt,
        content,
        author,
        category,
        tags,
        status,
        references
    ) VALUES (
        'Teste de Criação - ' || NOW()::TEXT,
        'teste, debug',
        'Post de teste para verificar se a criação funciona',
        '<p>Conteúdo de teste</p>',
        'Sistema',
        'Outros',
        ARRAY['teste'],
        'draft',
        'Teste de referências'
    )
    RETURNING id INTO test_id;
    
    RAISE NOTICE 'Post de teste criado com sucesso! ID: %', test_id;
    
    -- Deletar o post de teste
    DELETE FROM blog_posts WHERE id = test_id;
    RAISE NOTICE 'Post de teste removido.';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'ERRO ao criar post de teste: %', SQLERRM;
END $$;

-- PASSO 7: MENSAGEM FINAL
SELECT '=== DIAGNÓSTICO CONCLUÍDO ===' as status;
SELECT 'Verifique os resultados acima. Se o teste de inserção foi bem-sucedido, o problema está resolvido!' as mensagem;
