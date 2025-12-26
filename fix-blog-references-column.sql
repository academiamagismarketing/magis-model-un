-- ===== ADICIONAR COLUNA 'references' À TABELA blog_posts =====
-- Execute este script no SQL Editor do Supabase

-- 1. Verificar estrutura atual da tabela
SELECT '=== ESTRUTURA ATUAL ===' as info;
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'blog_posts'
ORDER BY ordinal_position;

-- 2. Adicionar coluna 'references' se não existir
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

-- 3. Verificar estrutura final
SELECT '=== ESTRUTURA FINAL ===' as info;
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'blog_posts'
ORDER BY ordinal_position;

SELECT '=== CORREÇÃO CONCLUÍDA ===' as status;
SELECT 'A coluna "references" foi adicionada à tabela blog_posts' as mensagem;
