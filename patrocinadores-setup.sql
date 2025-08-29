-- Script para configurar tabela de patrocinadores
-- Execute este script no SQL Editor do Supabase

-- Criar tabela de patrocinadores
CREATE TABLE IF NOT EXISTS patrocinadores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nome_completo VARCHAR(500) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(100) NOT NULL,
    logo_url TEXT,
    link VARCHAR(500),
    ordem_exibicao INTEGER DEFAULT 0,
    ativo BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE patrocinadores ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Allow public select for patrocinadores" ON patrocinadores
    FOR SELECT USING (ativo = true);

-- Política para permitir CRUD para admins
CREATE POLICY "Allow admin CRUD for patrocinadores" ON patrocinadores
    FOR ALL USING (auth.role() = 'authenticated');

-- Criar índice para melhor performance
CREATE INDEX IF NOT EXISTS idx_patrocinadores_ordem ON patrocinadores(ordem_exibicao);
CREATE INDEX IF NOT EXISTS idx_patrocinadores_ativo ON patrocinadores(ativo);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_patrocinadores_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_patrocinadores_updated_at
    BEFORE UPDATE ON patrocinadores
    FOR EACH ROW
    EXECUTE FUNCTION update_patrocinadores_updated_at();

-- Inserir dados de exemplo
INSERT INTO patrocinadores (nome, nome_completo, descricao, categoria, logo_url, link, ordem_exibicao, ativo) VALUES
('MOCS', 'Model United Nations Conference System', 'Sistema de conferências Model United Nations', 'Sistema de Conferências', 'https://via.placeholder.com/200x100?text=MOCS', 'https://www.instagram.com/mocscefet/', 1, true),
('SIA', 'Sistema Internacional de Arbitragem', 'Sistema especializado em arbitragem internacional', 'Arbitragem Internacional', 'https://via.placeholder.com/200x100?text=SIA', 'https://www.instagram.com/siacsabh/', 2, true),
('SIS', 'Sistema Internacional de Simulações', 'Sistema focado em simulações acadêmicas', 'Simulações', 'https://via.placeholder.com/200x100?text=SIS', 'https://www.instagram.com/sis.sagrado/', 3, true),
('SIB', 'Sistema Internacional de Debates', 'Sistema especializado em debates internacionais', 'Debates', 'https://via.placeholder.com/200x100?text=SIB', 'https://www.instagram.com/sibernou/', 4, true),
('TEMAS', 'Temas e Debates Acadêmicos', 'Organização focada em debates acadêmicos', 'Debates Acadêmicos', 'https://via.placeholder.com/200x100?text=TEMAS', 'https://www.instagram.com/temasmg/', 5, true);

-- Comentários sobre a implementação
COMMENT ON TABLE patrocinadores IS 'Tabela para gerenciar patrocinadores e parceiros da Academia MAGIS';
COMMENT ON COLUMN patrocinadores.nome IS 'Nome abreviado do patrocinador (ex: SIB)';
COMMENT ON COLUMN patrocinadores.nome_completo IS 'Nome completo do patrocinador (ex: Sistema Internacional de Debates)';
COMMENT ON COLUMN patrocinadores.categoria IS 'Categoria do patrocinador (ex: Debates, Simulações, etc.)';
COMMENT ON COLUMN patrocinadores.ordem_exibicao IS 'Ordem de exibição dos patrocinadores';
COMMENT ON COLUMN patrocinadores.ativo IS 'Se o patrocinador está ativo e deve ser exibido';
