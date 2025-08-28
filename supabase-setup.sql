-- Configuração do Supabase para Academia MAGIS - Sistema de Eventos
-- Execute este script no SQL Editor do Supabase

-- Drop da tabela appointments se existir
DROP TABLE IF EXISTS appointments CASCADE;

-- Criação da tabela events
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    location VARCHAR(255),
    participants VARCHAR(100),
    image_url TEXT,
    status VARCHAR(50) CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')) DEFAULT 'upcoming',
    category VARCHAR(100),
    price DECIMAL(10,2),
    registration_deadline DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_category ON events(category);
CREATE INDEX idx_events_created_at ON events(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
-- Permitir leitura pública
CREATE POLICY "Allow public read access" ON events
    FOR SELECT USING (true);

-- Permitir inserção/atualização/exclusão apenas para usuários autenticados
CREATE POLICY "Allow authenticated insert/update/delete" ON events
    FOR ALL USING (auth.role() = 'authenticated');

-- Função para atualizar o timestamp updated_at
CREATE OR REPLACE FUNCTION update_events_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_events_updated_at 
    BEFORE UPDATE ON events 
    FOR EACH ROW 
    EXECUTE FUNCTION update_events_updated_at_column();

-- Inserir dados de exemplo
INSERT INTO events (title, description, date, location, participants, status, category, price, registration_deadline) VALUES
(
    'SIMONU São Paulo 2024',
    'Simulação completa da ONU com comitês especializados em questões de segurança internacional e desenvolvimento sustentável. Evento presencial com 200+ delegados.',
    '2024-03-15',
    'Centro de Convenções Rebouças, São Paulo',
    '200+ delegados',
    'completed',
    'Simulação ONU',
    150.00,
    '2024-03-10'
),
(
    'Workshop de Diplomacia',
    'Curso intensivo sobre técnicas de negociação, protocolo diplomático e elaboração de resoluções. Ideal para iniciantes.',
    '2024-04-08',
    'Academia MAGIS - Online',
    '50 estudantes',
    'completed',
    'Workshop',
    80.00,
    '2024-04-05'
),
(
    'MINIMUN Preparatório',
    'Evento preparatório para novos delegados com simulações práticas e mentoria especializada. Perfeito para quem está começando.',
    '2024-05-22',
    'Universidade de São Paulo',
    '150 participantes',
    'upcoming',
    'Preparatório',
    120.00,
    '2024-05-15'
),
(
    'Conferência de Relações Internacionais',
    'Conferência anual com palestrantes internacionais sobre temas atuais de diplomacia e política internacional.',
    '2024-06-10',
    'Auditório da Academia MAGIS',
    '300+ participantes',
    'upcoming',
    'Conferência',
    200.00,
    '2024-06-01'
),
(
    'SIMONU Rio de Janeiro 2023',
    'Simulação da ONU realizada no Rio de Janeiro com foco em mudanças climáticas e desenvolvimento sustentável.',
    '2023-11-20',
    'Centro de Convenções SulAmérica, Rio de Janeiro',
    '180 delegados',
    'completed',
    'Simulação ONU',
    180.00,
    '2023-11-15'
),
(
    'Workshop de Oratória e Debate',
    'Workshop especializado em técnicas de oratória, argumentação e debate para simulações da ONU.',
    '2024-07-15',
    'Academia MAGIS - Presencial',
    '80 estudantes',
    'upcoming',
    'Workshop',
    95.00,
    '2024-07-10'
);

-- ========================================
-- TABELA DE PRODUTOS
-- ========================================

-- Criação da tabela products
CREATE TABLE products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    status VARCHAR(50) CHECK (status IN ('active', 'inactive', 'out_of_stock')) DEFAULT 'active',
    buy_link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_at ON products(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
-- Permitir leitura pública
CREATE POLICY "Allow public read access" ON products
    FOR SELECT USING (true);

-- Permitir inserção/atualização/exclusão apenas para usuários autenticados
CREATE POLICY "Allow authenticated insert/update/delete" ON products
    FOR ALL USING (auth.role() = 'authenticated');

-- Função para atualizar o timestamp updated_at
CREATE OR REPLACE FUNCTION update_products_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products 
    FOR EACH ROW 
    EXECUTE FUNCTION update_products_updated_at_column();

-- Inserir dados de exemplo para produtos
INSERT INTO products (name, description, price, category, status, buy_link) VALUES
(
    'Manual de Simulação ONU',
    'Guia completo para participar de simulações da ONU. Inclui técnicas de debate, protocolo diplomático e elaboração de resoluções.',
    45.00,
    'Pins',
    'active',
    'https://wa.me/553191578389?text=Olá! Gostaria de comprar o Manual de Simulação ONU'
),
(
    'Kit Delegado Premium',
    'Kit completo para delegados com material de estudo, guias práticos e acesso a conteúdo exclusivo.',
    89.90,
    'Kits',
    'active',
    'https://wa.me/553191578389?text=Olá! Gostaria de comprar o Kit Delegado Premium'
),
(
    'Curso Online de Diplomacia',
    'Curso completo online com 20 horas de conteúdo sobre diplomacia, negociação e relações internacionais.',
    199.00,
    'Cursos',
    'active',
    'https://wa.me/553191578389?text=Olá! Gostaria de comprar o Curso Online de Diplomacia'
),
(
    'Camiseta Academia MAGIS',
    'Camiseta oficial da Academia MAGIS com design exclusivo. Disponível em várias cores.',
    35.00,
    'Kits',
    'active',
    'https://wa.me/553191578389?text=Olá! Gostaria de comprar a Camiseta Academia MAGIS'
),
(
    'E-book: Guia do Delegado',
    'E-book digital com dicas e estratégias para se destacar em simulações da ONU.',
    29.90,
    'Pins',
    'active',
    'https://wa.me/553191578389?text=Olá! Gostaria de comprar o E-book: Guia do Delegado'
),
(
    'Mentoria Individual',
    'Sessão individual de mentoria com especialistas em simulações da ONU. 1 hora de consultoria personalizada.',
    150.00,
    'Serviços',
    'active',
    'https://wa.me/553191578389?text=Olá! Gostaria de agendar uma Mentoria Individual'
);

-- ========================================
-- TABELA DE ESTATÍSTICAS
-- ========================================

-- Criação da tabela statistics
CREATE TABLE statistics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key VARCHAR(100) UNIQUE NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    label VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_statistics_key ON statistics(key);

-- Habilitar Row Level Security (RLS)
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
-- Permitir leitura pública
CREATE POLICY "Allow public read access" ON statistics
    FOR SELECT USING (true);

-- Permitir inserção/atualização/exclusão apenas para usuários autenticados
CREATE POLICY "Allow authenticated insert/update/delete" ON statistics
    FOR ALL USING (auth.role() = 'authenticated');

-- Função para atualizar o timestamp updated_at
CREATE OR REPLACE FUNCTION update_statistics_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_statistics_updated_at 
    BEFORE UPDATE ON statistics 
    FOR EACH ROW 
    EXECUTE FUNCTION update_statistics_updated_at_column();

-- Inserir dados iniciais das estatísticas
INSERT INTO statistics (key, value, label, description) VALUES
(
    'delegados',
    500,
    'Delegados',
    'Número total de delegados formados pela Academia MAGIS'
),
(
    'eventos_realizados',
    50,
    'Eventos Realizados',
    'Total de eventos realizados pela Academia MAGIS'
),
(
    'valores_arrecadados',
    150000.00,
    'Valores Arrecadados',
    'Valor total arrecadado em reais através dos eventos e produtos'
);
