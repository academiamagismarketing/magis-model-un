-- ===== CORREÇÃO COMPLETA TABELA BLOG_POSTS =====

-- 1. Dropar tabela se existir para garantir estrutura limpa
DROP TABLE IF EXISTS blog_posts CASCADE;

-- 2. Recriar tabela com estrutura correta e robusta
CREATE TABLE blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(500),
    keywords TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    references TEXT,
    author VARCHAR(255) NOT NULL,
    image_url TEXT,
    category VARCHAR(100) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Criar índices para performance
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX idx_blog_posts_author ON blog_posts(author);

-- 4. Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_posts_updated_at();

-- 5. Configurar Segurança (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- 6. Políticas de Segurança

-- Política 1: Leitura (SELECT)
-- Quem pode ler?
-- Posts publicados: Todo mundo (anon e authenticated)
-- Posts rascunho/arquivado: Apenas usuários autenticados (admins)

CREATE POLICY "Public posts are viewable by everyone" 
ON blog_posts FOR SELECT 
USING (status = 'published');

CREATE POLICY "Authenticated users can view all posts" 
ON blog_posts FOR SELECT 
TO authenticated 
USING (true);

-- Política 2: Escrita (INSERT, UPDATE, DELETE)
-- Quem pode escrever? Apenas usuários autenticados (admins)

CREATE POLICY "Authenticated users can insert posts" 
ON blog_posts FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts" 
ON blog_posts FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Authenticated users can delete posts" 
ON blog_posts FOR DELETE 
TO authenticated 
USING (true);

-- 7. Inserir dados de exemplo para teste
INSERT INTO blog_posts (title, subtitle, keywords, excerpt, content, references, author, category, tags, status, published_at) VALUES
(
    'Introdução ao Modelo das Nações Unidas (MUN)',
    'Descubra o que é o MUN e como ele pode transformar sua compreensão sobre diplomacia',
    'MUN, Diplomacia, Educação, Simulação, Nações Unidas',
    'Descubra o que é o MUN e como ele pode transformar sua compreensão sobre diplomacia e relações internacionais.',
    '<h2>O que é o MUN?</h2><p>O Modelo das Nações Unidas (MUN) é uma simulação educacional...</p>',
    'Referências: UN.org',
    'Equipe MAGIS',
    'MUN',
    ARRAY['MUN', 'Diplomacia', 'Educação'],
    'published',
    NOW()
),
(
    'A Importância da Diplomacia',
    'Como a diplomacia molda o mundo moderno',
    'Diplomacia, Relações Internacionais, Política',
    'A diplomacia é a arte de conduzir negociações...',
    '<h2>Diplomacia Moderna</h2><p>No mundo globalizado...</p>',
    'Referências: Modern Diplomacy',
    'Dr. Silva',
    'Diplomacia',
    ARRAY['Diplomacia', 'Política'],
    'draft', -- Post de rascunho para teste
    NULL
);

-- 8. Verificação final
SELECT 
    COUNT(*) as total_posts,
    COUNT(CASE WHEN status = 'published' THEN 1 END) as published_posts,
    COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_posts
FROM blog_posts;
