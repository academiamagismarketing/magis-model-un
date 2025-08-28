# Configuração do Supabase Storage

Este documento explica como configurar o Supabase Storage para upload de imagens na Academia MAGIS.

## Passos para Configuração

1. **Acesse o Supabase Dashboard**
   - Vá para o painel do seu projeto Supabase
   - Navegue até a seção "Storage"

2. **Crie o Bucket**
   - Clique em "New bucket"
   - Nome: `images`
   - Marque como "Public bucket" para permitir acesso público às imagens
   - Clique em "Save"

3. **Configure as Políticas RLS**
   - Vá para a seção "SQL Editor"
   - Execute o script `supabase-storage-setup.sql`

## Políticas Implementadas

### Leitura Pública
- Todas as imagens são acessíveis publicamente
- Necessário para exibir imagens no site

### Upload Autenticado
- Apenas usuários autenticados podem fazer upload
- Aplica-se aos administradores logados

### Gerenciamento
- Usuários autenticados podem atualizar/deletar imagens
- Controle total para administradores

## Estrutura de Pastas

O sistema organiza as imagens automaticamente:

```
images/
├── events/
│   ├── [uuid]_[timestamp].jpg
│   └── [uuid]_[timestamp].png
└── products/
    ├── [uuid]_[timestamp].jpg
    └── [uuid]_[timestamp].png
```

## Tipos de Arquivo Suportados

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- Tamanho máximo: 5MB

## Validações Implementadas

1. **Tipo de arquivo**: Apenas imagens permitidas
2. **Tamanho**: Máximo 5MB por arquivo
3. **Nomes únicos**: Cada arquivo recebe um nome único para evitar conflitos

## Funcionalidades

### Upload por Drag & Drop
- Arrastar e soltar arquivos na área de upload
- Feedback visual durante o processo

### Upload por Seleção
- Botão para selecionar arquivos do computador
- Filtro automático para tipos permitidos

### Preview de Imagem
- Visualização da imagem selecionada
- Link para visualizar em tamanho completo

### Compatibilidade com URLs
- Suporte para URLs externas (opcional)
- Migração suave do sistema anterior

## Integração

O sistema está integrado nos formulários:
- `/admin/eventos/novo` - Upload de imagens de eventos
- `/admin/produtos/novo` - Upload de imagens de produtos

## Vantagens da Solução

1. **Sustentável**: Armazenamento otimizado no Supabase Storage
2. **Escalável**: CDN global do Supabase para entrega rápida
3. **Seguro**: Políticas RLS controlam acesso
4. **Eficiente**: Compressão e otimização automática
5. **Backup**: Integrado ao backup do Supabase

## Monitoramento

Para monitorar o uso do storage:
1. Acesse Storage > Settings no Supabase Dashboard
2. Visualize estatísticas de uso
3. Configure alertas de limite se necessário

## Limpeza Automática

O sistema não possui limpeza automática implementada. Para implementar:
1. Criar Edge Function para limpeza periódica
2. Identificar imagens órfãs (não referenciadas)
3. Agendar execução mensal