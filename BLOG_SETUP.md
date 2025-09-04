# Configuração do Blog - Academia MAGIS

Este documento descreve como configurar e usar o sistema de blog da Academia MAGIS.

## 🚀 Funcionalidades

- **Página pública do blog** (`/blog`) com listagem de posts
- **Visualização individual de posts** (`/blog/:id`)
- **Sistema administrativo** para gerenciar posts
- **Upload de imagens** via Supabase Storage
- **Sistema de tags e categorias**
- **Filtros e busca** avançados
- **Status de posts** (rascunho, publicado, arquivado)

## 📋 Pré-requisitos

1. **Supabase configurado** com as variáveis de ambiente necessárias
2. **Tabela `blog_posts`** criada no banco de dados
3. **Bucket de storage** configurado para imagens

## 🗄️ Configuração do Banco de Dados

### 1. Executar o Script SQL

Execute o arquivo `blog-setup.sql` no seu projeto Supabase:

```sql
-- Acesse o SQL Editor no Supabase Dashboard
-- Cole e execute o conteúdo do arquivo blog-setup.sql
```

### 2. Verificar a Tabela

A tabela `blog_posts` deve conter as seguintes colunas:

- `id` - UUID único do post
- `title` - Título do post
- `excerpt` - Resumo/descrição curta
- `content` - Conteúdo completo (HTML suportado)
- `author` - Nome do autor
- `image_url` - URL da imagem principal
- `category` - Categoria principal
- `tags` - Array de tags
- `status` - Status (draft, published, archived)
- `published_at` - Data de publicação
- `created_at` - Data de criação
- `updated_at` - Data da última atualização

### 3. Configurar Storage

No Supabase Dashboard, crie um bucket chamado `images` com as seguintes políticas:

```sql
-- Política para upload de imagens (apenas usuários autenticados)
CREATE POLICY "Users can upload images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Política para visualização pública de imagens
CREATE POLICY "Images are publicly accessible" ON storage.objects
    FOR SELECT USING (bucket_id = 'images');
```

## 🔧 Configuração das Variáveis de Ambiente

Certifique-se de que as seguintes variáveis estão configuradas no seu arquivo `.env`:

```env
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
VITE_ADMIN_EMAILS=email1@exemplo.com,email2@exemplo.com
```

## 📱 Rotas Disponíveis

### Rotas Públicas
- `/blog` - Lista de posts publicados
- `/blog/:id` - Visualização individual de um post

### Rotas Administrativas
- `/admin/blog` - Gerenciar posts
- `/admin/blog/novo` - Criar novo post
- `/admin/blog/editar/:id` - Editar post existente

## 🎨 Personalização

### Categorias Disponíveis

As categorias padrão incluem:
- Diplomacia
- Relações Internacionais
- MUN
- Política Externa
- Cooperação Internacional
- Direito Internacional
- Economia Global
- Cultura e Sociedade
- Tecnologia e Inovação
- Sustentabilidade
- Outros

### Adicionar Novas Categorias

Para adicionar novas categorias, edite o arquivo `src/pages/admin/BlogForm.tsx`:

```typescript
const categories = [
  // ... categorias existentes
  'Nova Categoria',
];
```

## 📝 Uso do Sistema

### 1. Criar um Post

1. Acesse `/admin/blog/novo`
2. Preencha os campos obrigatórios:
   - Título
   - Resumo
   - Conteúdo (HTML suportado)
   - Autor
   - Categoria
3. Adicione tags relevantes
4. Faça upload de uma imagem (opcional)
5. Escolha o status (rascunho ou publicado)
6. Salve o post

### 2. Editar um Post

1. Acesse `/admin/blog`
2. Clique no menu de ações do post desejado
3. Selecione "Editar"
4. Faça as alterações necessárias
5. Salve as mudanças

### 3. Gerenciar Posts

Na página `/admin/blog` você pode:
- Visualizar todos os posts
- Filtrar por status e categoria
- Buscar posts específicos
- Deletar posts
- Alterar status dos posts

## 🔒 Segurança

- **RLS (Row Level Security)** está habilitado na tabela
- Apenas posts com status "published" são visíveis publicamente
- Administradores têm acesso total através de verificação de email
- Upload de imagens restrito a usuários autenticados

## 🚨 Solução de Problemas

### Erro ao Carregar Posts
- Verifique se a tabela `blog_posts` foi criada corretamente
- Confirme se as políticas RLS estão configuradas
- Verifique as variáveis de ambiente do Supabase

### Erro no Upload de Imagens
- Confirme se o bucket `images` foi criado
- Verifique as políticas de storage
- Certifique-se de que o usuário está autenticado

### Posts Não Aparecem Publicamente
- Verifique se o status está definido como "published"
- Confirme se a data de publicação está definida
- Verifique as políticas RLS para acesso público

## 📚 Recursos Adicionais

- **HTML no Conteúdo**: O sistema suporta HTML para formatação rica
- **Tags Dinâmicas**: Sistema flexível de tags para categorização
- **Preview em Tempo Real**: Visualize posts antes de publicar
- **Responsivo**: Interface adaptada para mobile e desktop
- **SEO Friendly**: URLs amigáveis e meta tags

## 🤝 Contribuição

Para contribuir com melhorias no sistema de blog:

1. Teste todas as funcionalidades
2. Documente mudanças
3. Mantenha a consistência com o design existente
4. Siga os padrões de código estabelecidos

## 📞 Suporte

Em caso de dúvidas ou problemas:
- Verifique os logs do console do navegador
- Consulte a documentação do Supabase
- Entre em contato com a equipe de desenvolvimento

---

**Academia MAGIS** - Formando a próxima geração de líderes diplomáticos.
