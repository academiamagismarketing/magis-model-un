# Sistema de Status Dinâmico para Eventos

## 📋 Resumo das Modificações

Este documento descreve a implementação do sistema de status dinâmico para eventos, onde o status "Em Andamento" é calculado automaticamente baseado nas datas de início e término dos eventos.

## 🎯 Problema Resolvido

**Antes:** O status dos eventos era estático, baseado apenas no campo `status` do banco de dados, não respeitando as datas reais dos eventos.

**Agora:** O status é calculado dinamicamente baseado nas datas, garantindo que eventos em andamento sejam exibidos corretamente.

## 🔧 Lógica Implementada

### **Função `getEventStatus()`**

```typescript
const getEventStatus = (event: Event): 'upcoming' | 'ongoing' | 'completed' => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zerar horas para comparação apenas de data
  
  // Se tem start_date e end_date, usar essas datas
  if (event.start_date && event.end_date) {
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999); // Final do dia
    
    if (today < startDate) {
      return 'upcoming';
    } else if (today >= startDate && today <= endDate) {
      return 'ongoing';
    } else {
      return 'completed';
    }
  }
  
  // Fallback para data única (compatibilidade com eventos antigos)
  const eventDate = new Date(event.date);
  eventDate.setHours(0, 0, 0, 0);
  
  if (today < eventDate) {
    return 'upcoming';
  } else if (today.getTime() === eventDate.getTime()) {
    return 'ongoing';
  } else {
    return 'completed';
  }
};
```

### **Regras de Status**

1. **Em Breve (upcoming):** Data atual < data de início
2. **Em Andamento (ongoing):** Data atual >= data de início E <= data de término
3. **Concluído (completed):** Data atual > data de término

## 📱 Implementação nas Páginas

### ✅ **Página de Eventos (`/eventos`)**

**Alterações:**
- Status calculado dinamicamente em tempo real
- Filtros baseados no status calculado
- Exibição de datas início-fim na mesma linha
- Compatibilidade com eventos antigos (data única)

**Exibição de Datas:**
```jsx
{event.start_date && event.end_date ? (
  <span className="text-sm">
    {formatDate(event.start_date)} a {formatDate(event.end_date)}
  </span>
) : (
  <span className="text-sm">{formatDate(event.date)}</span>
)}
```

### ✅ **Página Admin (`/admin/eventos`)**

**Alterações:**
- Mesma lógica de status dinâmico
- Status "Cancelado" preservado (não calculado)
- Filtros atualizados para usar status calculado
- Exibição de datas início-fim nos cards

**Tratamento de Cancelados:**
```typescript
// Se o evento foi cancelado manualmente, manter como cancelado
if (event.status === 'cancelled') {
  return 'cancelled';
}
```

## 🎨 Melhorias Visuais

### **Exibição de Datas Compacta**

**Antes:**
- Data única ou período em linhas separadas
- Ocupava muito espaço vertical

**Agora:**
- Período na mesma linha: "03/02/2026 a 07/02/2026"
- Formato compacto e legível
- Fallback para data única quando necessário

### **Status Badges**

- **Em Breve:** Verde (`bg-green-100 text-green-800`)
- **Em Andamento:** Azul (`bg-blue-100 text-blue-800`)
- **Concluído:** Cinza (`bg-gray-100 text-gray-800`)
- **Cancelado:** Vermelho (`bg-red-100 text-red-800`)

## 🔍 Exemplos Práticos

### **Cenário 1: Evento de 3 dias**
- **Data início:** 03/02/2026
- **Data término:** 07/02/2026
- **Hoje:** 05/02/2026
- **Status:** "Em Andamento" ✅

### **Cenário 2: Evento de 1 dia**
- **Data:** 15/02/2026
- **Hoje:** 15/02/2026
- **Status:** "Em Andamento" ✅

### **Cenário 3: Evento futuro**
- **Data início:** 20/02/2026
- **Data término:** 25/02/2026
- **Hoje:** 10/02/2026
- **Status:** "Em Breve" ✅

### **Cenário 4: Evento passado**
- **Data início:** 01/01/2026
- **Data término:** 05/01/2026
- **Hoje:** 15/01/2026
- **Status:** "Concluído" ✅

## 🚀 Benefícios Implementados

### **Para Usuários**
- **Status preciso** em tempo real
- **Informações claras** sobre eventos em andamento
- **Datas organizadas** de forma compacta
- **Filtros funcionais** baseados no status real

### **Para Administradores**
- **Status automático** sem necessidade de atualização manual
- **Visão clara** do status real dos eventos
- **Compatibilidade** com eventos antigos
- **Controle manual** para eventos cancelados

### **Para o Sistema**
- **Lógica centralizada** e reutilizável
- **Performance otimizada** (cálculo em tempo real)
- **Compatibilidade** com dados existentes
- **Manutenibilidade** melhorada

## 🔧 Compatibilidade

### **Eventos Antigos**
- Funcionam com data única (`date`)
- Status calculado baseado na data única
- Transição suave para novo sistema

### **Eventos Novos**
- Usam `start_date` e `end_date`
- Status calculado baseado no período
- Maior precisão na determinação do status

## 📊 Estrutura de Dados

```typescript
interface Event {
  // ... outros campos
  date: string;                    // Data única (compatibilidade)
  start_date?: string;             // Data de início (novo)
  end_date?: string;               // Data de término (novo)
  status: string;                  // Status manual (para cancelados)
  // ... outros campos
}
```

## 🎯 Próximos Passos

1. **Execute o script SQL** para adicionar os novos campos
2. **Teste a criação** de eventos com período
3. **Verifique o status** em diferentes datas
4. **Monitore a performance** do cálculo dinâmico

---

**Status:** ✅ **CONCLUÍDO** - Sistema de status dinâmico implementado com sucesso!

## 🎉 Resultado Final

O sistema agora:
- **Calcula status automaticamente** baseado nas datas
- **Respeita o período** de início e término
- **Exibe "Em Andamento"** corretamente
- **Mantém compatibilidade** com eventos antigos
- **Otimiza a exibição** de datas nos cards
- **Funciona em tempo real** sem necessidade de atualização manual
