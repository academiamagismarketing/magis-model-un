-- Script para adicionar campo de disponibilidade na tabela products
-- Execute este script no SQL Editor do Supabase

-- Adicionar campo de disponibilidade à tabela products
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS availability VARCHAR(50) DEFAULT 'pronta_entrega' 
CHECK (availability IN ('pronta_entrega', 'somente_encomenda'));

-- Criar índice para performance
CREATE INDEX IF NOT EXISTS idx_products_availability ON products(availability);

-- Atualizar produtos existentes para ter disponibilidade padrão
UPDATE products 
SET availability = 'pronta_entrega' 
WHERE availability IS NULL;

-- Comentário para documentar o campo
COMMENT ON COLUMN products.availability IS 'Disponibilidade do produto: pronta_entrega ou somente_encomenda';

-- Verificar a estrutura atualizada
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'products'
ORDER BY ordinal_position;
