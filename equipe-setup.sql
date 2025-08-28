-- Tabela para membros da diretoria
CREATE TABLE IF NOT EXISTS diretoria (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cargo VARCHAR(255) NOT NULL,
    foto_url TEXT,
    bio TEXT NOT NULL,
    formacao VARCHAR(255) NOT NULL,
    experiencia VARCHAR(255) NOT NULL,
    ordem_exibicao INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para voluntários
CREATE TABLE IF NOT EXISTS voluntarios (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    area VARCHAR(255) NOT NULL,
    foto_url TEXT,
    bio TEXT NOT NULL,
    formacao VARCHAR(255) NOT NULL,
    tempo_voluntario VARCHAR(255) NOT NULL,
    ordem_exibicao INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para mentores
CREATE TABLE IF NOT EXISTS mentores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    especialidade VARCHAR(255) NOT NULL,
    foto_url TEXT,
    bio TEXT NOT NULL,
    formacao VARCHAR(255) NOT NULL,
    experiencia VARCHAR(255) NOT NULL,
    eventos_mentorados VARCHAR(255) NOT NULL,
    ordem_exibicao INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE diretoria ENABLE ROW LEVEL SECURITY;
ALTER TABLE voluntarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentores ENABLE ROW LEVEL SECURITY;

-- Políticas para diretoria
CREATE POLICY "Permitir leitura pública da diretoria" ON diretoria
    FOR SELECT USING (ativo = true);

CREATE POLICY "Permitir CRUD completo para admins na diretoria" ON diretoria
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para voluntários
CREATE POLICY "Permitir leitura pública dos voluntários" ON voluntarios
    FOR SELECT USING (ativo = true);

CREATE POLICY "Permitir CRUD completo para admins nos voluntários" ON voluntarios
    FOR ALL USING (auth.role() = 'authenticated');

-- Políticas para mentores
CREATE POLICY "Permitir leitura pública dos mentores" ON mentores
    FOR SELECT USING (ativo = true);

CREATE POLICY "Permitir CRUD completo para admins nos mentores" ON mentores
    FOR ALL USING (auth.role() = 'authenticated');

-- Triggers para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_diretoria_updated_at BEFORE UPDATE ON diretoria
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_voluntarios_updated_at BEFORE UPDATE ON voluntarios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mentores_updated_at BEFORE UPDATE ON mentores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Dados de exemplo para diretoria
INSERT INTO diretoria (nome, cargo, bio, formacao, experiencia, ordem_exibicao) VALUES
(
    'Nome do Diretor 1',
    'Diretor Executivo',
    'Formado em Relações Internacionais pela Universidade de São Paulo, com especialização em Diplomacia e Negociações Internacionais. Possui mais de 5 anos de experiência em simulações da ONU e coordenação de eventos acadêmicos.',
    'Relações Internacionais - USP',
    '5+ anos em simulações da ONU',
    1
),
(
    'Nome da Diretora 2',
    'Diretora de Projetos',
    'Mestra em Ciência Política com foco em Política Internacional. Coordenou mais de 20 eventos acadêmicos e desenvolveu metodologias inovadoras para formação de jovens líderes.',
    'Mestrado em Ciência Política - UNB',
    '20+ eventos coordenados',
    2
),
(
    'Nome do Diretor 3',
    'Diretor de Comunicação',
    'Especialista em Comunicação Internacional e Marketing Digital. Responsável pela estratégia de comunicação da Academia MAGIS e pela expansão da nossa presença digital.',
    'Comunicação Social - PUC',
    'Especialista em Marketing Digital',
    3
);

-- Dados de exemplo para voluntários
INSERT INTO voluntarios (nome, area, bio, formacao, tempo_voluntario, ordem_exibicao) VALUES
(
    'Nome do Voluntário 1',
    'Logística e Eventos',
    'Estudante de Administração apaixonado por organização de eventos. Responsável pela coordenação logística dos nossos eventos e pela experiência dos participantes.',
    'Administração - UFMG',
    '2 anos',
    1
),
(
    'Nome da Voluntária 2',
    'Comunicação e Marketing',
    'Comunicóloga especializada em redes sociais. Gerencia nossa presença digital e cria conteúdo que conecta jovens com oportunidades acadêmicas.',
    'Comunicação Social - PUC',
    '1.5 anos',
    2
),
(
    'Nome do Voluntário 3',
    'Pedagogia e Treinamento',
    'Pedagogo com experiência em educação não-formal. Desenvolve metodologias de treinamento para nossos delegados e coordena workshops educativos.',
    'Pedagogia - UFOP',
    '3 anos',
    3
),
(
    'Nome da Voluntária 4',
    'Relações Internacionais',
    'Graduanda em Relações Internacionais e ex-delegada da Academia MAGIS. Apoia na organização de simulações e mentoria de novos participantes.',
    'Relações Internacionais - UFMG',
    '1 ano',
    4
);

-- Dados de exemplo para mentores
INSERT INTO mentores (nome, especialidade, bio, formacao, experiencia, eventos_mentorados, ordem_exibicao) VALUES
(
    'Nome do Mentor 1',
    'Diplomacia e Negociações',
    'Diplomata de carreira com mais de 15 anos de experiência em negociações internacionais. Especialista em resolução de conflitos e protocolo diplomático.',
    'Relações Internacionais - USP',
    '15+ anos como diplomata',
    '50+ simulações',
    1
),
(
    'Nome da Mentora 2',
    'Oratória e Debate',
    'Professora universitária especializada em comunicação e oratória. Treina nossos delegados em técnicas de argumentação e apresentação em público.',
    'Doutorado em Comunicação - UFMG',
    '10+ anos como professora',
    '30+ workshops',
    2
),
(
    'Nome do Mentor 3',
    'Política Internacional',
    'Pesquisador em Política Internacional com foco em Organizações Internacionais. Especialista em estrutura da ONU e processos de tomada de decisão.',
    'Mestrado em Ciência Política - UNB',
    '8+ anos de pesquisa',
    '25+ simulações',
    3
),
(
    'Nome da Mentora 4',
    'Direito Internacional',
    'Advogada especializada em Direito Internacional Público. Mestra em Direito Internacional e especialista em tribunais internacionais e resolução de disputas.',
    'Mestrado em Direito Internacional - UFMG',
    '12+ anos como advogada',
    '40+ simulações',
    4
);
