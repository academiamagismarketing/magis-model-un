# Correção do Problema de Criação/Edição de Publicações no Admin

## Problema Identificado

O problema de não conseguir criar nem editar publicações na área `/admin` está relacionado às **políticas RLS (Row Level Security)** do Supabase que estão bloqueando as operações de INSERT e UPDATE na tabela `blog_posts`.

## Solução

### Passo 1: Executar Script SQL no Supabase

1. Acesse o **Supabase Dashboard** (https://app.supabase.com)
2. Vá em **SQL Editor**
3. Abra o arquivo `fix-blog-rls-admin.sql` que foi criado na raiz do projeto
4. Copie e cole todo o conteúdo do script no SQL Editor
5. Clique em **Run** para executar

Este script irá:
- Remover todas as políticas RLS antigas que podem estar causando problemas
- Criar novas políticas permissivas que permitem criação e edição de publicações
- Verificar se tudo foi configurado corretamente

### Passo 2: Verificar se Funcionou

Após executar o script:

1. Tente criar uma nova publicação em `/admin/publicacoes/novo`
2. Tente editar uma publicação existente em `/admin/publicacoes/editar/[id]`

Se ainda houver problemas, verifique:

1. **Console do navegador** (F12) para ver mensagens de erro detalhadas
2. **Logs do Supabase** para verificar se há erros de permissão
3. Se você está **autenticado** corretamente no admin

### Passo 3: Alternativa - Desabilitar RLS Temporariamente (NÃO RECOMENDADO PARA PRODUÇÃO)

Se o problema persistir, você pode temporariamente desabilitar o RLS para testar:

```sql
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
```

**⚠️ ATENÇÃO:** Isso remove toda a segurança da tabela. Use apenas para testes e reabilite o RLS depois.

## Melhorias Implementadas no Código

### 1. Tratamento de Erros Melhorado

O código agora mostra mensagens de erro mais detalhadas quando há problemas:
- Identifica erros de permissão RLS
- Mostra mensagens específicas do Supabase
- Fornece orientações sobre como resolver

### 2. Logs Melhorados

Os erros agora são logados no console com mais detalhes para facilitar o debug.

## Estrutura das Políticas RLS Criadas

O script cria as seguintes políticas:

1. **blog_posts_select_published**: Permite leitura de posts publicados (público)
2. **blog_posts_select_all**: Permite leitura de todos os posts (admin)
3. **blog_posts_insert**: Permite criação de novos posts
4. **blog_posts_update**: Permite edição de posts existentes
5. **blog_posts_delete**: Permite exclusão de posts

## Verificação de Funcionamento

Para verificar se as políticas estão funcionando:

```sql
-- Ver todas as políticas
SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'blog_posts';

-- Testar inserção
INSERT INTO blog_posts (
    title, keywords, excerpt, content, author, category, status
) VALUES (
    'Teste', 'teste', 'Teste', '<p>Teste</p>', 'Admin', 'Outros', 'draft'
);
```

## Próximos Passos

1. ✅ Execute o script SQL no Supabase
2. ✅ Teste criar uma nova publicação
3. ✅ Teste editar uma publicação existente
4. ✅ Se funcionar, você pode ajustar as políticas RLS para serem mais restritivas se necessário

## Suporte

Se o problema persistir após executar o script:

1. Verifique os logs do console do navegador
2. Verifique os logs do Supabase
3. Certifique-se de que está autenticado corretamente
4. Verifique se a tabela `blog_posts` existe e tem a estrutura correta

