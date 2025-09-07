-- Script para atualizar a tabela events com novos campos
-- Execute este script no SQL Editor do Supabase

-- Adicionar novos campos à tabela events
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS start_date DATE,
ADD COLUMN IF NOT EXISTS end_date DATE,
ADD COLUMN IF NOT EXISTS registration_start_date DATE,
ADD COLUMN IF NOT EXISTS is_partner_event BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS event_link TEXT;

-- Atualizar a constraint do status para incluir 'ongoing' se não existir
-- (A constraint já existe, mas vamos garantir que está correta)
ALTER TABLE events DROP CONSTRAINT IF EXISTS events_status_check;
ALTER TABLE events ADD CONSTRAINT events_status_check 
CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled'));

-- Atualizar registros existentes para migrar a data atual para start_date
UPDATE events 
SET start_date = date 
WHERE start_date IS NULL;

-- Criar índices para os novos campos
CREATE INDEX IF NOT EXISTS idx_events_start_date ON events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_end_date ON events(end_date);
CREATE INDEX IF NOT EXISTS idx_events_registration_start_date ON events(registration_start_date);
CREATE INDEX IF NOT EXISTS idx_events_is_partner_event ON events(is_partner_event);

-- Comentários para documentar os novos campos
COMMENT ON COLUMN events.start_date IS 'Data de início do evento';
COMMENT ON COLUMN events.end_date IS 'Data de término do evento';
COMMENT ON COLUMN events.registration_start_date IS 'Data de início das inscrições (opcional)';
COMMENT ON COLUMN events.is_partner_event IS 'Indica se é um evento parceiro ou presença confirmada';
COMMENT ON COLUMN events.event_link IS 'Link para WhatsApp ou página de inscrição';
