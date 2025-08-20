-- Configuração da tabela de agendamentos para Academia Magis
-- Execute este SQL no SQL Editor do Supabase

-- Criar tabela de agendamentos
CREATE TABLE IF NOT EXISTS appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    message TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);
CREATE INDEX IF NOT EXISTS idx_appointments_email ON appointments(email);
CREATE INDEX IF NOT EXISTS idx_appointments_created_at ON appointments(created_at);

-- Habilitar Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública (formulário de contato)
CREATE POLICY "Allow public insert" ON appointments
    FOR INSERT WITH CHECK (true);

-- Política para permitir leitura apenas para usuários autenticados
CREATE POLICY "Allow authenticated read" ON appointments
    FOR SELECT USING (auth.role() = 'authenticated');

-- Política para permitir atualização apenas para usuários autenticados
CREATE POLICY "Allow authenticated update" ON appointments
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para permitir exclusão apenas para usuários autenticados
CREATE POLICY "Allow authenticated delete" ON appointments
    FOR DELETE USING (auth.role() = 'authenticated');

-- Função para atualizar automaticamente o campo updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_appointments_updated_at 
    BEFORE UPDATE ON appointments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Inserir dados de exemplo
INSERT INTO appointments (name, email, phone, event_type, date, time, message, status) VALUES
(
    'João Silva',
    'joao.silva@email.com',
    '(11) 99999-9999',
    'Simulação ONU',
    '2024-03-15',
    '14:00:00',
    'Gostaria de agendar uma simulação da ONU para minha turma do ensino médio.',
    'pending'
),
(
    'Maria Santos',
    'maria.santos@email.com',
    '(11) 88888-8888',
    'Workshop de Diplomacia',
    '2024-03-20',
    '10:00:00',
    'Interessada em um workshop sobre diplomacia para estudantes universitários.',
    'confirmed'
),
(
    'Pedro Costa',
    'pedro.costa@email.com',
    '(11) 77777-7777',
    'Mentoria Individual',
    '2024-03-25',
    '16:00:00',
    'Preciso de mentoria para preparação de vestibular em relações internacionais.',
    'pending'
);

-- Comentários sobre a estrutura da tabela
COMMENT ON TABLE appointments IS 'Tabela para armazenar agendamentos da Academia Magis';
COMMENT ON COLUMN appointments.id IS 'ID único do agendamento (UUID)';
COMMENT ON COLUMN appointments.name IS 'Nome completo do solicitante';
COMMENT ON COLUMN appointments.email IS 'Email do solicitante';
COMMENT ON COLUMN appointments.phone IS 'Telefone do solicitante';
COMMENT ON COLUMN appointments.event_type IS 'Tipo de evento/serviço solicitado';
COMMENT ON COLUMN appointments.date IS 'Data solicitada para o agendamento';
COMMENT ON COLUMN appointments.time IS 'Horário solicitado para o agendamento';
COMMENT ON COLUMN appointments.message IS 'Mensagem adicional do solicitante';
COMMENT ON COLUMN appointments.status IS 'Status do agendamento: pending, confirmed, cancelled, completed';
COMMENT ON COLUMN appointments.created_at IS 'Data de criação do registro';
COMMENT ON COLUMN appointments.updated_at IS 'Data da última atualização';
