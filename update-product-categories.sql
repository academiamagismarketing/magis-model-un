-- Script para atualizar categorias de produtos
-- Execute este script no SQL Editor do Supabase

-- Atualizar produtos existentes para novas categorias
UPDATE products 
SET category = 'Pins' 
WHERE category = 'Livros';

UPDATE products 
SET category = 'Kits' 
WHERE category = 'Vestuário';

-- Adicionar novas categorias (opcional - para futuros produtos)
-- As categorias serão: Pins, Kits, Cursos, Decorativos, Serviços

-- Verificar produtos atualizados
SELECT id, name, category, status FROM products ORDER BY category, name;
