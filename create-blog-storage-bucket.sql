-- ===== CRIAR BUCKET DE STORAGE PARA IMAGENS DO BLOG =====

-- 1. Verificar se o bucket 'blog' já existe
SELECT 
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE name = 'blog';

-- 2. Criar bucket 'blog' se não existir
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'blog',
    'blog',
    true,
    5242880, -- 5MB em bytes
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- 3. Configurar políticas RLS para o bucket 'blog'

-- Política para permitir upload de imagens para usuários autenticados
CREATE POLICY "Users can upload blog images" ON storage.objects
    FOR INSERT 
    WITH CHECK (
        bucket_id = 'blog' 
        AND auth.role() = 'authenticated'
    );

-- Política para permitir visualização pública das imagens
CREATE POLICY "Blog images are publicly accessible" ON storage.objects
    FOR SELECT 
    USING (bucket_id = 'blog');

-- Política para permitir atualização de imagens para usuários autenticados
CREATE POLICY "Users can update blog images" ON storage.objects
    FOR UPDATE 
    USING (
        bucket_id = 'blog' 
        AND auth.role() = 'authenticated'
    )
    WITH CHECK (
        bucket_id = 'blog' 
        AND auth.role() = 'authenticated'
    );

-- Política para permitir exclusão de imagens para usuários autenticados
CREATE POLICY "Users can delete blog images" ON storage.objects
    FOR DELETE 
    USING (
        bucket_id = 'blog' 
        AND auth.role() = 'authenticated'
    );

-- 4. Verificar configuração final
SELECT 
    'Bucket criado com sucesso!' as status,
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets 
WHERE name = 'blog';

-- 5. Verificar políticas criadas
SELECT 
    'Políticas criadas:' as info,
    policyname,
    permissive,
    cmd
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
AND policyname LIKE '%blog%'
ORDER BY policyname;
