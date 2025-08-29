-- Script para manter o Supabase ativo com heartbeat
-- Execute este script no SQL Editor do Supabase

-- Criar tabela de heartbeat
CREATE TABLE IF NOT EXISTS heartbeat (
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE heartbeat ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserções públicas (para o heartbeat funcionar)
CREATE POLICY "Allow public insert for heartbeat" ON heartbeat
    FOR INSERT WITH CHECK (true);

-- Política para permitir leitura pública
CREATE POLICY "Allow public select for heartbeat" ON heartbeat
    FOR SELECT USING (true);

-- Inserir registro inicial
INSERT INTO heartbeat (numero, status) VALUES (1, 'active');

-- Criar função para atualizar heartbeat
CREATE OR REPLACE FUNCTION update_heartbeat()
RETURNS void AS $$
BEGIN
    -- Inserir novo registro com timestamp atual
    INSERT INTO heartbeat (numero, status) 
    VALUES (
        COALESCE((SELECT MAX(numero) FROM heartbeat), 0) + 1,
        'active'
    );
    
    -- Manter apenas os últimos 30 registros para não encher a tabela
    DELETE FROM heartbeat 
    WHERE id NOT IN (
        SELECT id FROM heartbeat 
        ORDER BY created_at DESC 
        LIMIT 30
    );
END;
$$ LANGUAGE plpgsql;

-- Criar função para verificar se o sistema está ativo
CREATE OR REPLACE FUNCTION check_heartbeat()
RETURNS TABLE (
    is_active BOOLEAN,
    last_update TIMESTAMP WITH TIME ZONE,
    total_records INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        CASE 
            WHEN MAX(created_at) > NOW() - INTERVAL '2 days' THEN true
            ELSE false
        END as is_active,
        MAX(created_at) as last_update,
        COUNT(*) as total_records
    FROM heartbeat;
END;
$$ LANGUAGE plpgsql;

-- Comentários sobre a implementação
COMMENT ON TABLE heartbeat IS 'Tabela para manter o Supabase ativo com atualizações regulares';
COMMENT ON FUNCTION update_heartbeat() IS 'Função para inserir novo registro de heartbeat';
COMMENT ON FUNCTION check_heartbeat() IS 'Função para verificar se o sistema está ativo';
