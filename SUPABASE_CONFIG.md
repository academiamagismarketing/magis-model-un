# 🔧 Resolução do Erro "Failed to Fetch" no Login

## ❌ Problema Identificado

O erro "Failed to fetch" está ocorrendo porque as variáveis de ambiente do Supabase não estão configuradas no projeto.

## ✅ Solução Passo a Passo

### 1. Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta gratuita
3. Clique em "New Project"
4. Escolha sua organização
5. Nome do projeto: `academia-magis-events`
6. Escolha uma senha forte para o banco de dados
7. Região: **São Paulo** (recomendado)
8. Clique em "Create new project"

### 2. Configurar Autenticação

#### 2.1 Site URL
1. No painel do Supabase, vá para **Authentication** > **Settings**
2. Em **Site URL**, adicione:
   - `http://localhost:8081` (para desenvolvimento)
   - `https://seu-dominio.com` (para produção)

#### 2.2 Redirect URLs
1. Em **Redirect URLs**, adicione:
   - `http://localhost:8081/admin/login`
   - `https://seu-dominio.com/admin/login`

#### 2.3 Adicionar Usuários Administradores
1. Vá para **Authentication** > **Users**
2. Clique em **Add User**
3. Adicione os usuários:
   - Email: `academiamagismarketing@gmail.com`
   - Email: `riannm19@gmail.com`
4. Defina senhas temporárias
5. Envie as credenciais por email

### 3. Configurar Banco de Dados

1. No painel do Supabase, vá para **SQL Editor**
2. Clique em **New Query**
3. Copie e cole o conteúdo do arquivo `supabase-setup.sql`
4. Clique em **Run** para executar

### 4. Obter Credenciais da API

1. No painel do Supabase, vá para **Settings** > **API**
2. Copie:
   - **Project URL** (ex: `https://xyz.supabase.co`)
   - **anon public** key (começa com `eyJ...`)

### 5. Configurar Variáveis de Ambiente

#### 5.1 Criar arquivo .env.local
1. Na raiz do projeto, crie o arquivo `.env.local`
2. Adicione o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ IMPORTANTE:** Substitua pelos valores reais do seu projeto!

#### 5.2 Reiniciar o servidor
```bash
# Pare o servidor (Ctrl+C)
# Inicie novamente
npm run dev
```

### 6. Testar Login

1. Acesse `http://localhost:8081/admin/login`
2. Use uma das credenciais de administrador
3. O erro "Failed to fetch" deve desaparecer

## 🔍 Verificação

Para verificar se está funcionando:

1. Abra o DevTools do navegador (F12)
2. Vá na aba **Console**
3. Não deve haver erros relacionados ao Supabase
4. O login deve funcionar normalmente

## 📞 Suporte

Se ainda houver problemas:

1. Verifique se as variáveis de ambiente estão corretas
2. Confirme se o projeto Supabase está ativo
3. Verifique se os usuários foram criados corretamente
4. Teste a conexão no painel do Supabase

## 🚀 Próximos Passos

Após resolver o login:

1. Configure as políticas de segurança no Supabase
2. Teste o CRUD de eventos
3. Configure o deploy para produção
4. Configure as variáveis de ambiente no servidor de produção
