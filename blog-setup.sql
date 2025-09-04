-- ===== CONFIGURAÇÃO DO BLOG =====

-- Criar tabela para posts do blog
CREATE TABLE IF NOT EXISTS blog_posts (
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

-- ===== ATUALIZAR TABELA EXISTENTE =====
-- Se a tabela já existe, adicionar os novos campos
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS subtitle VARCHAR(500),
ADD COLUMN IF NOT EXISTS keywords TEXT,
ADD COLUMN IF NOT EXISTS references TEXT;

-- Atualizar campo keywords para NOT NULL com valor padrão se estiver NULL
UPDATE blog_posts SET keywords = 'Palavras-chave padrão' WHERE keywords IS NULL;
ALTER TABLE blog_posts ALTER COLUMN keywords SET NOT NULL;

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author);

-- Criar função para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Criar trigger para atualizar updated_at
CREATE TRIGGER trigger_update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_posts_updated_at();

-- Inserir alguns posts de exemplo
INSERT INTO blog_posts (title, excerpt, content, author, category, tags, status, published_at) VALUES
(
    'Introdução ao Modelo das Nações Unidas (MUN)',
    'Descubra o que é o MUN e como ele pode transformar sua compreensão sobre diplomacia e relações internacionais.',
    '<h2>O que é o MUN?</h2>
<p>O Modelo das Nações Unidas (MUN) é uma simulação educacional das Nações Unidas onde estudantes assumem o papel de delegados representando diferentes países em comitês da ONU.</p>

<h2>Benefícios do MUN</h2>
<ul>
<li><strong>Desenvolvimento de habilidades diplomáticas:</strong> Aprenda a negociar e construir consensos</li>
<li><strong>Conhecimento sobre relações internacionais:</strong> Entenda melhor a geopolítica mundial</li>
<li><strong>Melhoria na oratória:</strong> Desenvolva suas habilidades de comunicação pública</li>
<li><strong>Networking:</strong> Conecte-se com estudantes de todo o mundo</li>
</ul>

<h2>Como participar</h2>
<p>Para participar de uma conferência MUN, você precisa:</p>
<ol>
<li>Escolher uma conferência</li>
<li>Se inscrever e selecionar seus países/comitês preferidos</li>
<li>Pesquisar sobre o país e os tópicos</li>
<li>Preparar seus discursos e resoluções</li>
</ol>

<p>O MUN é uma experiência única que combina aprendizado acadêmico com desenvolvimento pessoal, preparando você para os desafios de um mundo globalizado.</p>',
    'Equipe MAGIS',
    'MUN',
    ARRAY['MUN', 'Diplomacia', 'Educação', 'Simulação'],
    'published',
    NOW()
),
(
    'A Importância da Diplomacia no Século XXI',
    'Em um mundo cada vez mais conectado, a diplomacia se torna fundamental para resolver conflitos e promover a cooperação internacional.',
    '<h2>Diplomacia na Era Digital</h2>
<p>A diplomacia tradicional evoluiu significativamente com o advento da tecnologia. Hoje, os diplomatas não apenas se reúnem em salas de conferência, mas também utilizam plataformas digitais para manter diálogos constantes.</p>

<h2>Novos Desafios</h2>
<p>O século XXI apresenta desafios únicos:</p>
<ul>
<li><strong>Mudanças climáticas:</strong> Requerem cooperação global sem precedentes</li>
<li><strong>Cibersegurança:</strong> Novas ameaças que transcendem fronteiras nacionais</li>
<li><strong>Pandemias:</strong> Demonstram a necessidade de coordenação internacional</li>
<li><strong>Migração:</strong> Questões humanitárias que demandam soluções multilaterais</li>
</ul>

<h2>O Papel da Academia MAGIS</h2>
<p>Nossa academia prepara jovens para enfrentar esses desafios através de:</p>
<ul>
<li>Simulações realistas de cenários diplomáticos</li>
<li>Mentoria de especialistas em relações internacionais</li>
<li>Oportunidades de networking com profissionais da área</li>
<li>Desenvolvimento de habilidades de negociação e mediação</li>
</ul>

<p>A diplomacia moderna requer não apenas conhecimento técnico, mas também empatia, criatividade e capacidade de adaptação. É nossa missão formar a próxima geração de líderes diplomáticos.</p>',
    'Dr. Maria Silva',
    'Diplomacia',
    ARRAY['Diplomacia', 'Século XXI', 'Tecnologia', 'Cooperação Internacional'],
    'published',
    NOW()
),
(
    'Cooperação Internacional: Construindo Pontes para o Futuro',
    'A cooperação internacional é essencial para enfrentar os desafios globais e criar um mundo mais justo e sustentável.',
    '<h2>O que é Cooperação Internacional?</h2>
<p>A cooperação internacional é o processo pelo qual países, organizações e indivíduos trabalham juntos para alcançar objetivos comuns que beneficiam a todos.</p>

<h2>Áreas de Cooperação</h2>
<h3>1. Desenvolvimento Sustentável</h3>
<p>A Agenda 2030 da ONU estabelece 17 Objetivos de Desenvolvimento Sustentável que só podem ser alcançados através da cooperação global.</p>

<h3>2. Paz e Segurança</h3>
<p>Organizações como a ONU, NATO e União Africana trabalham para manter a paz e resolver conflitos internacionalmente.</p>

<h3>3. Comércio e Economia</h3>
<p>Acordos comerciais e organizações como a OMC promovem o comércio justo e o desenvolvimento econômico.</p>

<h2>Desafios da Cooperação</h2>
<ul>
<li><strong>Interesses nacionais divergentes:</strong> Nem sempre alinhados com objetivos globais</li>
<li><strong>Assimetrias de poder:</strong> Países desenvolvidos vs. em desenvolvimento</li>
<li><strong>Culturais e linguísticos:</strong> Diferenças que podem dificultar a comunicação</li>
<li><strong>Recursos limitados:</strong> Necessidade de priorização de objetivos</li>
</ul>

<h2>Como Participar</h2>
<p>Jovens podem se envolver em cooperação internacional através de:</p>
<ul>
<li>Programas de intercâmbio estudantil</li>
<li>Voluntariado em organizações internacionais</li>
<li>Participação em conferências e simulações</li>
<li>Estudos em relações internacionais</li>
</ul>

<p>A cooperação internacional não é apenas uma opção, mas uma necessidade para o futuro da humanidade. Cada um de nós pode contribuir para construir um mundo mais cooperativo e sustentável.</p>',
    'Prof. Carlos Mendes',
    'Cooperação Internacional',
    ARRAY['Cooperação', 'Desenvolvimento Sustentável', 'Paz', 'ONU'],
    'published',
    NOW()
);

-- Configurar políticas de segurança RLS (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública (apenas posts publicados)
CREATE POLICY "Public blog posts are viewable by everyone" ON blog_posts
    FOR SELECT USING (status = 'published');

-- Política para administradores (acesso total)
CREATE POLICY "Admins have full access to blog posts" ON blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM auth.users
            WHERE auth.users.id = auth.uid()
            AND auth.users.email IN (
                SELECT unnest(string_to_array(current_setting('app.admin_emails', true), ','))
            )
        )
    );

-- Comentário sobre a tabela
COMMENT ON TABLE blog_posts IS 'Tabela para armazenar posts do blog da Academia MAGIS';
COMMENT ON COLUMN blog_posts.title IS 'Título do post';
COMMENT ON COLUMN blog_posts.excerpt IS 'Resumo/descrição curta do post';
COMMENT ON COLUMN blog_posts.content IS 'Conteúdo completo do post (HTML suportado)';
COMMENT ON COLUMN blog_posts.author IS 'Nome do autor do post';
COMMENT ON COLUMN blog_posts.image_url IS 'URL da imagem principal do post';
COMMENT ON COLUMN blog_posts.category IS 'Categoria principal do post';
COMMENT ON COLUMN blog_posts.tags IS 'Array de tags para categorização';
COMMENT ON COLUMN blog_posts.status IS 'Status do post: draft, published, archived';
COMMENT ON COLUMN blog_posts.published_at IS 'Data/hora de publicação (quando status = published)';
COMMENT ON COLUMN blog_posts.created_at IS 'Data/hora de criação do post';
COMMENT ON COLUMN blog_posts.updated_at IS 'Data/hora da última atualização';

-- Verificar se a tabela foi criada corretamente
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;

-- Verificar os posts de exemplo
SELECT 
    title,
    author,
    category,
    status,
    created_at
FROM blog_posts
ORDER BY created_at DESC;
