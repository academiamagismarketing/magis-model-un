# Configuração do Supabase para Academia Magis - Sistema de Eventos

Este documento contém as instruções completas para configurar o Supabase para o sistema de gerenciamento de eventos da Academia Magis.

## 📋 Pré-requisitos

- Conta no Supabase (gratuita)
- Acesso ao painel administrativo do Supabase

## 🚀 Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha sua organização
5. Digite um nome para o projeto (ex: "academia-magis-events")
6. Escolha uma senha forte para o banco de dados
7. Escolha a região mais próxima (recomendado: São Paulo)
8. Clique em "Create new project"

### 2. Configurar Autenticação

#### 2.1 Configurar Site URL
1. No painel do Supabase, vá para **Authentication** > **Settings**
2. Em **Site URL**, adicione:
   - `http://localhost:5173` (para desenvolvimento)
   - `https://seu-dominio.com` (para produção)

#### 2.2 Configurar Redirect URLs
1. Em **Redirect URLs**, adicione:
   - `http://localhost:5173/admin/login`
   - `https://seu-dominio.com/admin/login`

#### 2.3 Adicionar Usuários Administradores
1. Vá para **Authentication** > **Users**
2. Clique em **Add User**
3. Adicione os seguintes usuários:
   - Email: `academiamagismarketing@gmail.com`
   - Email: `riannm19@gmail.com`
4. Defina senhas temporárias para cada um
5. Envie as credenciais por email para os usuários

### 3. Configurar Banco de Dados

#### 3.1 Executar Script SQL
1. No painel do Supabase, vá para **SQL Editor**
2. Clique em **New Query**
3. Copie e cole o conteúdo do arquivo `supabase-setup.sql`
4. Clique em **Run** para executar o script

#### 3.2 Verificar Tabela Criada
1. Vá para **Table Editor**
2. Verifique se a tabela `events` foi criada
3. Confirme que os dados de exemplo foram inseridos

### 4. Configurar Variáveis de Ambiente

#### 4.1 Obter Credenciais
1. No painel do Supabase, vá para **Settings** > **API**
2. Copie:
   - **Project URL** (ex: `https://xyz.supabase.co`)
   - **anon public** key (começa com `eyJ...`)

#### 4.2 Criar Arquivo .env.local
1. Na raiz do projeto, crie o arquivo `.env.local`
2. Adicione as seguintes variáveis:

```env
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ IMPORTANTE:** Substitua pelos valores reais do seu projeto!

### 5. Instalar Dependências

Execute no terminal:

```bash
npm install @supabase/supabase-js
```

### 6. Testar Configuração

1. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse `http://localhost:5173/admin/login`
3. Faça login com uma das credenciais de administrador
4. Teste o acesso ao painel de eventos

## 📊 Estrutura da Tabela Events

A tabela `events` possui os seguintes campos:

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | UUID | Identificador único do evento |
| `title` | VARCHAR(255) | Título do evento |
| `description` | TEXT | Descrição detalhada |
| `date` | DATE | Data do evento |
| `location` | VARCHAR(255) | Local do evento |
| `participants` | VARCHAR(100) | Número/descrição de participantes |
| `image_url` | TEXT | URL da imagem do evento |
| `status` | VARCHAR(50) | Status: upcoming, ongoing, completed, cancelled |
| `category` | VARCHAR(100) | Categoria do evento |
| `price` | DECIMAL(10,2) | Preço do evento |
| `registration_deadline` | DATE | Data limite de inscrição |
| `created_at` | TIMESTAMP | Data de criação |
| `updated_at` | TIMESTAMP | Data da última atualização |

## 🔐 Políticas de Segurança (RLS)

### Políticas Implementadas:

1. **Leitura Pública**: Qualquer pessoa pode visualizar eventos
2. **Escrita Autenticada**: Apenas usuários logados podem criar/editar/deletar eventos

### Status dos Eventos:
- `upcoming`: Eventos futuros
- `ongoing`: Eventos em andamento
- `completed`: Eventos concluídos
- `cancelled`: Eventos cancelados

### Categorias Disponíveis:
- Simulação ONU
- Workshop
- Preparatório
- Conferência

## 🌐 URLs Importantes

- **Painel Admin**: `/admin/eventos`
- **Login Admin**: `/admin/login`
- **Criar Evento**: `/admin/eventos/novo`
- **Editar Evento**: `/admin/eventos/:id/editar`

## ⚙️ Funcionalidades Implementadas

### Para Administradores:
- ✅ Login seguro com email/senha
- ✅ Listagem de todos os eventos
- ✅ Criação de novos eventos
- ✅ Edição de eventos existentes
- ✅ Exclusão de eventos
- ✅ Filtros por status e categoria
- ✅ Busca por título, descrição e localização

### Para Visitantes:
- ✅ Visualização de eventos na página pública
- ✅ Filtros e busca de eventos
- ✅ Informações detalhadas de cada evento

## 🚀 Próximos Passos

1. **Configurar Produção**:
   - Atualizar URLs no Supabase para o domínio de produção
   - Configurar variáveis de ambiente no servidor

2. **Melhorias Futuras**:
   - Upload de imagens para o Supabase Storage
   - Sistema de inscrições em eventos
   - Notificações por email
   - Relatórios e analytics

3. **Segurança**:
   - Implementar rate limiting
   - Adicionar validação adicional
   - Configurar backup automático

## 🔧 Como Usar o Sistema

### Para Administradores:
1. Acesse `/admin/login`
2. Faça login com suas credenciais
3. Use o painel para gerenciar eventos
4. Crie, edite ou delete eventos conforme necessário

### Para Clientes:
1. Acesse a página `/eventos`
2. Visualize todos os eventos disponíveis
3. Use os filtros para encontrar eventos específicos
4. Entre em contato via WhatsApp para se inscrever

## 🆘 Solução de Problemas

### Erro de Conexão:
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo

### Erro de Autenticação:
- Verifique se o email está na lista de administradores permitidos
- Confirme se a senha está correta

### Eventos não aparecem:
- Verifique se a tabela `events` foi criada corretamente
- Confirme se os dados de exemplo foram inseridos

### Problemas de CORS:
- Verifique se as URLs estão configuradas corretamente no Supabase
- Confirme se o domínio está na lista de sites permitidos

## 📞 Suporte

Para dúvidas ou problemas:
- Email: contato@academiamagis.com
- WhatsApp: +55 31 9157-8389
