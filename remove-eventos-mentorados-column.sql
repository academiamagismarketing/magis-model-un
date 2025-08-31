-- Remove a coluna eventos_mentorados da tabela mentores
-- Execute este script no Supabase SQL Editor

ALTER TABLE mentores DROP COLUMN IF EXISTS eventos_mentorados;
