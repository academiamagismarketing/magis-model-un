# Sistema de Heartbeat - Manter Supabase Ativo

## 📋 Visão Geral

Este sistema foi criado para manter o projeto Supabase ativo, evitando que ele seja desativado automaticamente após 1 semana de inatividade. O sistema funciona através de atualizações regulares na base de dados.

## 🚀 Como Implementar

### 1. Execute o Script SQL

Acesse o **SQL Editor** do seu projeto Supabase e execute o script `heartbeat-setup.sql`:

```sql
-- Execute este script no SQL Editor do Supabase
-- O script criará a tabela heartbeat e as funções necessárias
```

### 2. Verificar Implementação

Após executar o script, você deve ver:

- ✅ Tabela `heartbeat` criada
- ✅ Função `update_heartbeat()` criada
- ✅ Função `check_heartbeat()` criada
- ✅ Políticas RLS configuradas
- ✅ Registro inicial inserido

### 3. Testar o Sistema

O sistema já está integrado ao seu site e funcionará automaticamente. Para verificar se está funcionando:

1. Abra o **Console do Navegador** (F12)
2. Procure por mensagens como:
   - `✅ Heartbeat executado com sucesso`
   - `📊 Status do heartbeat`

## 🔧 Como Funciona

### Tabela Heartbeat

```sql
CREATE TABLE heartbeat (
    id SERIAL PRIMARY KEY,
    numero INTEGER NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Funções Automáticas

1. **update_heartbeat()**: Insere novo registro e limpa registros antigos
2. **check_heartbeat()**: Verifica se o sistema está ativo
3. **Componente React**: Executa automaticamente a cada 12 horas

### Intervalos de Execução

- **Heartbeat principal**: A cada 12 horas
- **Verificação de status**: A cada 6 horas
- **Execução imediata**: Quando a página carrega
- **Execução adicional**: Quando a página ganha foco

## 📊 Monitoramento

### Verificar Status Manualmente

```javascript
// No console do navegador
import { heartbeatApi } from '@/lib/supabase';

// Verificar status
const status = await heartbeatApi.checkHeartbeat();
console.log(status);

// Ver últimos registros
const records = await heartbeatApi.getRecentHeartbeats(5);
console.log(records);
```

### Logs no Console

O sistema gera logs automáticos:

- `✅ Heartbeat executado com sucesso` - Funcionando normalmente
- `⚠️ Falha na função RPC, tentando inserção manual...` - Fallback ativado
- `📊 Status do heartbeat` - Informações de status
- `🔄 Página ganhou foco, executando heartbeat...` - Execução adicional

## 🛠️ Solução de Problemas

### Problema: "Função não encontrada"

**Solução**: Execute novamente o script SQL no Supabase

### Problema: "Permissão negada"

**Solução**: Verifique se as políticas RLS estão configuradas corretamente

### Problema: "Tabela não existe"

**Solução**: Execute o script `heartbeat-setup.sql` completo

### Problema: "Erro de conexão"

**Solução**: Verifique se as variáveis de ambiente do Supabase estão configuradas

## 🔄 Manutenção

### Limpeza Automática

O sistema mantém apenas os últimos 30 registros automaticamente para não encher a tabela.

### Verificação Manual

Para verificar se está funcionando:

```sql
-- No SQL Editor do Supabase
SELECT * FROM heartbeat ORDER BY created_at DESC LIMIT 5;
```

### Reinicialização

Se necessário, você pode reinicializar o sistema:

```sql
-- Limpar todos os registros
DELETE FROM heartbeat;

-- Inserir registro inicial
INSERT INTO heartbeat (numero, status) VALUES (1, 'active');
```

## 📈 Benefícios

- ✅ **Supabase sempre ativo** - Não será desativado automaticamente
- ✅ **Execução automática** - Não requer intervenção manual
- ✅ **Fallback robusto** - Múltiplas formas de execução
- ✅ **Monitoramento** - Logs detalhados no console
- ✅ **Baixo impacto** - Mínimo uso de recursos
- ✅ **Limpeza automática** - Não acumula dados desnecessários

## 🎯 Resultado Esperado

Com este sistema implementado, seu projeto Supabase permanecerá ativo indefinidamente, evitando interrupções no seu site da Academia MAGIS.

---

**Nota**: Este sistema é especialmente importante para projetos em produção que dependem do Supabase para funcionar corretamente.
