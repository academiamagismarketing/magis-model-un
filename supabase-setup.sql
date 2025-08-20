-- Configuração do Supabase para Academia Magis - Sistema de Eventos
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
    'Academia Magis - Online',
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
    'Auditório da Academia Magis',
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
    'Academia Magis - Presencial',
    '80 estudantes',
    'upcoming',
    'Workshop',
    95.00,
    '2024-07-10'
);
