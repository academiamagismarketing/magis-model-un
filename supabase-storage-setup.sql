-- Criação do bucket de imagens no Supabase Storage
-- Execute este script no Supabase SQL Editor

-- Criar bucket 'images' se não existir
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas para o bucket 'images'

-- Permitir que todos vejam as imagens (leitura pública)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Permitir que usuários autenticados façam upload
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Permitir que usuários autenticados atualizem suas próprias imagens
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE 
USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Permitir que usuários autenticados deletem suas próprias imagens
CREATE POLICY "Authenticated users can delete" ON storage.objects FOR DELETE 
USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Habilitar RLS no storage.objects se ainda não estiver habilitado
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;