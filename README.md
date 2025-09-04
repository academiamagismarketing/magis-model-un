# Academia MAGIS - Site Oficial

Site oficial da Academia MAGIS - Preparando jovens para simulações.

## Como posso editar este código?

Existem várias maneiras de editar sua aplicação.

**Use Lovable**

Simplesmente visite o [Projeto Lovable](https://lovable.dev/projects/72369d8a-a9df-48e8-9a09-bd83daad95bb) e comece a fazer prompts.

As mudanças feitas via Lovable serão automaticamente commitadas para este repositório.

**Use sua IDE preferida**

Se você quiser trabalhar localmente usando sua própria IDE, pode clonar este repositório e fazer push das mudanças. As mudanças enviadas também serão refletidas no Lovable.

O único requisito é ter o Node.js & npm instalados - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto.
git clone <SUA_GIT_URL>

# Passo 2: Navegue até o diretório do projeto.
cd <NOME_DO_SEU_PROJETO>

# Passo 3: Instale as dependências necessárias.
npm i

# Passo 4: Inicie o servidor de desenvolvimento com auto-reload e preview instantâneo.
npm run dev
```

**Edite um arquivo diretamente no GitHub**

- Navegue até o arquivo desejado(s).
- Clique no botão "Editar" (ícone de lápis) no canto superior direito da visualização do arquivo.
- Faça suas alterações e commite as mudanças.

**Use GitHub Codespaces**

- Navegue até a página principal do seu repositório.
- Clique no botão "Código" (botão verde) próximo ao canto superior direito.
- Selecione a aba "Codespaces".
- Clique em "Novo codespace" para lançar um novo ambiente Codespace.
- Edite arquivos diretamente dentro do Codespace e commite e faça push das suas mudanças quando terminar.

## Quais tecnologias são usadas para este projeto?

Este projeto é construído com:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Como posso fazer deploy deste projeto?

### Deploy no Netlify

1. Crie uma conta no [Netlify](https://netlify.com)
2. Conecte seu repositório GitHub ao Netlify
3. Configure as seguintes opções de build:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Clique em "Deploy site"

O arquivo de configuração `netlify.toml` já está incluído no projeto para facilitar o deploy.

### Deploy usando Lovable

Simplesmente abra [Lovable](https://lovable.dev/projects/72369d8a-a9df-48e8-9a09-bd83daad95bb) e clique em Compartilhar -> Publicar.

## Posso conectar um domínio personalizado ao meu projeto Lovable?

Sim, você pode!

Para conectar um domínio, navegue até Projeto > Configurações > Domínios e clique em Conectar Domínio.

Leia mais aqui: [Configurando um domínio personalizado](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
