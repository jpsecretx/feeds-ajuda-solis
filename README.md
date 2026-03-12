# Central de Ajuda — Feeds

Repositório da Central de Ajuda do Feeds. Projeto construído em Next.js (React), focado em ser rápido, responsivo e amigável para quem usar.

---

## Estrutura de arquivos

Abaixo está o mapa para você se encontrar facilmente no código:

```
feeds-ajuda/
│
├── data/
│   └── faq.json              ← ARQUIVO PRINCIPAL — edite aqui textos, vídeos e categorias
│
├── pages/
│   ├── _app.js               ← inicialização do app (não mexer, rs)
│   ├── index.js              ← página inicial (home) com slideshow e busca
│   ├── busca.js              ← página de resultados de busca
│   └── categoria/
│       └── [id].js           ← modelo da página de cada categoria individual
│
├── components/
│   └── Layout.js             ← header, rodapé, botão WhatsApp flutuante e toggle dark mode
│
├── styles/
│   └── globals.css           ← cores (light/dark), grids e fontes globais
│
├── public/
│   ├── logo.png              ← logotipo exibido no header
│   ├── whatsapp.png          ← ícone do botão flutuante
│   ├── claro.png             ← ícone do toggle (modo claro)
│   ├── escuro.png            ← ícone do toggle (modo escuro)
│   ├── cenario1-8.webp       ← fotos do slideshow na home
│   └── icones/               ← ícones das categorias (PNGs)
│
├── package.json              ← dependências do projeto
└── next.config.js            ← configuração do Next.js
```

---

## Como editar ou adicionar conteúdo

Todo o conteúdo de texto do site vive dentro do arquivo **`data/faq.json`**. Como é um arquivo JSON, lembre-se de usar **aspas duplas** em tudo e não esquecer das vírgulas separando os itens.

### Campos disponíveis para cada pergunta

Você pode usar os campos abaixo juntos ou separados — o site se adapta automaticamente ao que você preencher:

```json
{
  "id": "minha-nova-pergunta",
  "pergunta": "Como fazer X?",
  "resposta": "Texto introdutório da resposta.",
  "introLista": "Veja os itens abaixo:",
  "lista": ["Item 1", "Item 2"],
  "introPassos": "Siga o passo a passo:",
  "passos": ["Passo 1", "Passo 2"],
  "conclusao": "Texto final após os passos.",
  "importante": ["Aviso importante 1", "Aviso importante 2"],
  "dica": "Uma dica rápida para o usuário."
}
```

> Use `**ALGUMACOISA**` dentro de qualquer campo para deixar palavras em **negrito** automaticamente.

---

### Como adicionar uma nova pergunta

Encontre a categoria onde a pergunta se encaixa no `faq.json`, e adicione um novo bloco dentro da lista de `"perguntas"` da categoria correspondente. Lembre-se de achar um ícone legal. c:

---

### Como adicionar uma nova categoria

Adicione um novo bloco no array `"categorias"`:

```json
{
  "id": "nova-categoria",
  "emoji": "/icones/seu-icone.png",
  "titulo": "Nome da Categoria",
  "perguntas": []
}
```

A nova categoria vai aparecer automaticamente na tela inicial e a página dela será gerada sozinha.

---

### Como adicionar um vídeo na seção da home

Adicione um novo item no array `"videos"` do `faq.json`:

```json
{
  "id": "ID_DO_VIDEO_NO_YOUTUBE",
  "titulo": "Título do vídeo"
}
```

O `id` é a parte final da URL do YouTube (ex: para `youtube.com/watch?v=abc123`, o id é `abc123`). A thumbnail e o player são carregados automaticamente.

---

### Como trocar as fotos do slideshow

As fotos ficam na pasta `public/` com os nomes `cenario1.webp`, `cenario2.webp`, etc. Para trocar uma foto, substitua o arquivo mantendo o mesmo nome. Para adicionar ou remover fotos, edite o array `fotos` no início do `pages/index.js`.

> Recomendado: imagens no formato `.webp`, tamanho `1280x960`, abaixo de 200KB cada.

---

### Como atualizar as "Dúvidas mais frequentes" da home

Edite o array `"maisPopulares"` no `faq.json`:

```json
"maisPopulares": [
  { "categoriaId": "id-da-categoria", "perguntaId": "id-da-pergunta" },
  ...
]
```

---

## Funcionalidades

- **Slideshow automático** na home com crossfade suave entre as fotos
- **Busca** por texto em todas as perguntas e respostas
- **Dark mode** com toggle manual e detecção automática pelo sistema
- **Botão flutuante do WhatsApp** para contato com o Service Desk
- **CTA de suporte** ao final de cada tópico aberto
- **Deep link por âncora** — links com `#id-da-pergunta` abrem e rolam até a pergunta automaticamente

---

## Perguntas que podem ocorrer:

**P: O que é o `[id].js` na pasta de categoria?**
R: É uma rota dinâmica do Next.js. O `[id]` vira a parte variável da URL (ex: `/categoria/conta`, `/categoria/postagem`). Um único arquivo serve para exibir todas as categorias.

**P: Posso editar o design das páginas?**
R: Sim! Os arquivos em `pages/` usam React (JSX). A estrutura visual fica dentro do `return (...)` de cada arquivo. As cores globais ficam em `styles/globals.css`.

**P: Como funciona o dark mode?**
R: A preferência do usuário é salva no `localStorage`. Se não houver preferência salva, o site segue automaticamente o tema do sistema operacional. As cores de cada modo estão definidas como variáveis CSS em `globals.css`.