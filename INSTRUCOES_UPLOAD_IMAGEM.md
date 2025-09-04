# 📸 Configuração do Upload de Imagem para Publicações

## ✅ O que foi implementado

1. **Componente ImageUpload integrado** - Agora usa o mesmo sistema de upload das outras páginas
2. **Suporte ao folder 'blog'** - Configurado para armazenar imagens das publicações
3. **Interface padronizada** - Segue o mesmo padrão visual dos eventos e produtos

## 🔧 Configuração necessária no Supabase

### Passo 1: Executar script SQL para criar bucket de storage

Execute o arquivo `create-blog-storage-bucket.sql` no SQL Editor do Supabase:

```sql
-- Este script cria o bucket 'blog' e configura as políticas de acesso
-- Execute no SQL Editor do Supabase Dashboard
```

### Passo 2: Verificar se o bucket foi criado

No Supabase Dashboard:
1. Vá para **Storage** no menu lateral
2. Verifique se existe o bucket chamado **"blog"**
3. Confirme que está marcado como **"Public"**

## 🎯 Como funciona agora

### Para usuários:
- **Drag & Drop**: Arraste imagens diretamente para a área de upload
- **Clique para selecionar**: Clique no botão para escolher arquivo
- **URL manual**: Cole URLs de imagens externas se preferir
- **Preview**: Visualize a imagem antes de salvar
- **Validação**: Apenas arquivos JPEG, PNG e WebP até 5MB

### Para administradores:
- **Upload direto**: Envie imagens do computador
- **Gerenciamento**: Remova ou altere imagens facilmente
- **Organização**: Imagens ficam organizadas no bucket 'blog'

## 📁 Estrutura de arquivos

```
Supabase Storage
└── images/
    ├── events/          # Imagens de eventos
    ├── products/        # Imagens de produtos
    └── blog/            # Imagens das publicações ← NOVO!
```

## 🚀 Funcionalidades disponíveis

- ✅ Upload de imagens (drag & drop)
- ✅ Validação de tipo e tamanho
- ✅ Preview em tempo real
- ✅ URL manual para imagens externas
- ✅ Remoção de imagens
- ✅ Integração com o formulário
- ✅ Mesmo padrão visual das outras páginas

## 🔍 Testando a funcionalidade

1. Acesse `/admin/publicacoes/novo`
2. Na sidebar direita, clique em "Imagem da Publicação"
3. Arraste uma imagem ou clique para selecionar
4. A imagem deve aparecer no preview
5. Salve a publicação para confirmar

## 🐛 Solução de problemas

### Se as imagens não aparecerem:
1. Verifique se o bucket 'blog' foi criado no Supabase
2. Confirme que as políticas RLS estão ativas
3. Verifique o console do navegador para erros

### Se o upload falhar:
1. Verifique o tamanho da imagem (máximo 5MB)
2. Confirme o formato (JPEG, PNG, WebP)
3. Verifique se está logado como usuário autenticado

## 📝 Notas importantes

- **Tamanho máximo**: 5MB por imagem
- **Formatos suportados**: JPEG, JPG, PNG, WebP
- **Acesso público**: Imagens ficam visíveis para todos os visitantes
- **Organização**: Cada tipo de conteúdo tem seu próprio folder
- **Segurança**: Apenas usuários autenticados podem fazer upload

---

🎉 **Pronto!** Agora as publicações têm o mesmo sistema de upload de imagem que eventos e produtos!
