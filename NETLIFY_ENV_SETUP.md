# 🔧 Configuração da Variável de Ambiente no Netlify

## ❌ Problema Identificado

O email `institucional@academiamagis.com` não consegue fazer login porque a variável de ambiente `VITE_ADMIN_EMAILS` não está configurada no Netlify.

## ✅ Solução Passo a Passo

### 1. Acessar o Painel do Netlify

1. Acesse [https://app.netlify.com](https://app.netlify.com)
2. Faça login na sua conta
3. Selecione o projeto da Academia MAGIS

### 2. Configurar Variável de Ambiente

1. No painel do projeto, vá para **Site settings**
2. No menu lateral, clique em **Environment variables**
3. Clique em **Add a variable**

### 3. Adicionar a Variável

Configure a variável da seguinte forma:

- **Key**: `VITE_ADMIN_EMAILS`
- **Value**: `riannm19@gmail.com, academiamagismarketing@gmail.com, institucional@academiamagis.com`
- **Scopes**: Selecione todos os contextos (Production, Deploy previews, Branch deploys)

### 4. Salvar e Reimplantar

1. Clique em **Save**
2. Vá para **Deploys**
3. Clique em **Trigger deploy** > **Deploy site**
4. Aguarde a implantação ser concluída

## 🔍 Verificação

Após a configuração:

1. Acesse o site em produção
2. Vá para `/admin/login`
3. Tente fazer login com `institucional@academiamagis.com`
4. O login deve funcionar normalmente

## 📝 Notas Importantes

- As variáveis de ambiente que começam com `VITE_` são expostas ao código frontend
- A lista de emails é separada por vírgulas
- Não há espaços extras necessários, mas o código os remove automaticamente
- Se a variável não estiver configurada, o sistema usa uma lista padrão que inclui o email institucional

## 🚨 Troubleshooting

### Se o login ainda não funcionar:

1. Verifique se a variável foi salva corretamente
2. Confirme se o deploy foi concluído com sucesso
3. Limpe o cache do navegador
4. Verifique se o usuário existe no Supabase

### Para verificar se a variável está funcionando:

1. Abra o DevTools do navegador (F12)
2. Vá para a aba Console
3. Digite: `console.log(import.meta.env.VITE_ADMIN_EMAILS)`
4. Deve mostrar a lista de emails configurada

## 📞 Suporte

Para dúvidas ou problemas:
- Email: institucional@academiamagis.com
- WhatsApp: +55 31 9157-8389
