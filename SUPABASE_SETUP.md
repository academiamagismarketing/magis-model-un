# Configuração do Supabase para Academia Magis - Sistema de Agendamentos

## 1. Configuração do Projeto Supabase

### 1.1 Criar Projeto
1. Acesse [supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Escolha sua organização
5. Digite o nome: `academia-magis`
6. Escolha uma senha forte para o banco de dados
7. Escolha a região mais próxima (São Paulo)
8. Clique em "Create new project"

### 1.2 Configurar Autenticação
1. No painel do Supabase, vá para **Authentication > Settings**
2. Em **Site URL**, adicione: `http://localhost:5173` (para desenvolvimento)
3. Em **Redirect URLs**, adicione:
   - `http://localhost:5173/admin/login`
   - `http://localhost:5173/admin/eventos`
   - `https://seudominio.com/admin/login` (para produção)
   - `https://seudominio.com/admin/eventos` (para produção)

### 1.3 Criar Usuários Administradores
1. Vá para **Authentication > Users**
2. Clique em **Add User**
3. Adicione os seguintes usuários:

**Usuário 1:**
- Email: `academiamagismarketing@gmail.com`
- Password: `[senha_segura]`

**Usuário 2:**
- Email: `riannm19@gmail.com`
- Password: `[senha_segura]`

## 2. Configurar Banco de Dados

### 2.1 Executar SQL
1. No painel do Supabase, vá para **SQL Editor**
2. Clique em **New Query**
3. Cole todo o conteúdo do arquivo `supabase-setup.sql`
4. Clique em **Run**

### 2.2 Verificar Tabela
1. Vá para **Table Editor**
2. Verifique se a tabela `appointments` foi criada
3. Confirme se os dados de exemplo foram inseridos

## 3. Configurar Variáveis de Ambiente

### 3.1 Criar arquivo .env.local
Na raiz do projeto, crie um arquivo `.env.local` com:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3.2 Obter Credenciais
1. No painel do Supabase, vá para **Settings > API**
2. Copie:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

## 4. Instalar Dependências

```bash
npm install @supabase/supabase-js
```

## 5. Testar Configuração

### 5.1 Iniciar o Projeto
```bash
npm run dev
```

### 5.2 Acessar Painel Admin
1. Acesse: `http://localhost:5173/admin/login`
2. Faça login com um dos emails configurados
3. Teste visualizar e gerenciar agendamentos

## 6. Estrutura da Tabela Appointments

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | UUID | ID único do agendamento |
| name | VARCHAR(255) | Nome completo do solicitante |
| email | VARCHAR(255) | Email do solicitante |
| phone | VARCHAR(50) | Telefone do solicitante |
| event_type | VARCHAR(100) | Tipo de evento/serviço solicitado |
| date | DATE | Data solicitada para o agendamento |
| time | TIME | Horário solicitado para o agendamento |
| message | TEXT | Mensagem adicional do solicitante (opcional) |
| status | VARCHAR(20) | Status: pending, confirmed, cancelled, completed |
| created_at | TIMESTAMP | Data de criação do registro |
| updated_at | TIMESTAMP | Data da última atualização |

## 7. Políticas de Segurança (RLS)

- **Inserção**: Pública (formulário de contato pode criar agendamentos)
- **Leitura**: Apenas usuários autenticados (administradores)
- **Atualização**: Apenas usuários autenticados
- **Exclusão**: Apenas usuários autenticados

## 8. URLs Importantes

- **Site Principal**: `http://localhost:5173`
- **Página de Eventos**: `http://localhost:5173/eventos`
- **Login Admin**: `http://localhost:5173/admin/login`
- **Painel Admin**: `http://localhost:5173/admin/eventos`

## 9. Funcionalidades Implementadas

### 9.1 Página Pública de Eventos
- ✅ Listagem de todos os eventos
- ✅ Filtros por status e categoria
- ✅ Busca por texto
- ✅ Cards com informações completas
- ✅ Botão de inscrição via WhatsApp

### 9.2 Painel Administrativo de Agendamentos
- ✅ Login seguro com Supabase Auth
- ✅ Restrição de acesso por email
- ✅ Listagem de agendamentos com filtros
- ✅ Visualização detalhada de cada agendamento
- ✅ Atualização de status (pendente, confirmado, cancelado, concluído)
- ✅ Exclusão de agendamentos
- ✅ Interface responsiva

### 9.3 Integração com Supabase
- ✅ API completa para CRUD de agendamentos
- ✅ Autenticação e autorização
- ✅ Row Level Security (RLS)
- ✅ Triggers automáticos para updated_at

## 10. Tipos de Eventos Disponíveis

- Simulação ONU
- Workshop de Diplomacia
- Mentoria Individual
- Preparatório Vestibular
- Conferência

## 11. Status dos Agendamentos

- **Pendente**: Aguardando confirmação
- **Confirmado**: Agendamento confirmado
- **Cancelado**: Agendamento cancelado
- **Concluído**: Agendamento realizado

## 12. Próximos Passos

1. **Configurar domínio de produção**
2. **Adicionar notificações por email**
3. **Implementar calendário integrado**
4. **Adicionar analytics**
5. **Criar backup automático**

## 13. Troubleshooting

### Problema: "Missing Supabase environment variables"
**Solução**: Verifique se o arquivo `.env.local` existe e tem as credenciais corretas

### Problema: "Access denied"
**Solução**: Verifique se o email está na lista de administradores permitidos

### Problema: "Table not found"
**Solução**: Execute novamente o SQL do arquivo `supabase-setup.sql`

### Problema: "Authentication failed"
**Solução**: Verifique se o usuário foi criado corretamente no Supabase Auth

## 14. Como Usar o Sistema

### 14.1 Para Administradores
1. Acesse `/admin/login`
2. Faça login com email autorizado
3. Visualize todos os agendamentos
4. Atualize status conforme necessário
5. Exclua agendamentos se necessário

### 14.2 Para Clientes
1. Acesse a página de contato
2. Preencha o formulário de agendamento
3. O agendamento será criado automaticamente
4. Aguarde confirmação dos administradores
