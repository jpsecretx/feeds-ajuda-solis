# Central de Ajuda — Feeds

Repositório da Central de Ajuda do Feeds. Este é um projeto construído em Next.js (React) focado em ser rápido, responsivo e amigável para os usuários.

---
## Estrutura de arquivos

Abaixo está o mapa para você se encontrar facilmente no código:

feeds-ajuda/
│
├── data/
│   └── faq.json        ← ARQUIVO PRINCIPAL — edite aqui os textos, vídeos e categorias
│
├── pages/
│   ├── _app.js         ← inicialização do app (não mexa)
│   ├── index.js        ← página inicial (home)
│   ├── busca.js        ← página de resultados de busca
│   └── categoria/
│       └── [id].js     ← modelo da página de cada categoria individual
│
├── components/
│   └── Layout.js       ← header, rodapé e configurações globais do site
│
├── styles/
│   └── globals.css     ← cores, grids e fontes globais
│
├── package.json        ← dependências do projeto
└── next.config.js      ← configuração do Next.js


---

## Como editar ou adicionar conteúdo

Todo o conteúdo de texto do site vive dentro do arquivo **`data/faq.json`**. Como é um arquivo JSON, lembre-se de usar **aspas duplas** em tudo e não esquecer das vírgulas separando os itens.

### Como adicionar uma nova pergunta
Encontre a categoria onde a pergunta se encaixa no `faq.json` e adicione um novo bloco como este dentro da lista de `"perguntas"`:

{
  "id": "minha-nova-pergunta",
  "pergunta": "Como fazer X?",
  "resposta": "Para fazer X, você deve seguir estes passos.",
  "introPassos": "Siga o passo a passo abaixo:",
  "passos": [
    "Passo 1: faça isso",
    "Passo 2: depois isso"
  ],
  "dica": "Lembre-se de salvar antes de sair."
}

Você pode usar os campos `"resposta"`, `"lista"`, `"passos"`, `"conclusao"`, `"importante"` e `"dica"` juntos ou separados, o site vai se adaptar automaticamente ao que você preencher.

### Como adicionar uma nova categoria
Adicione um novo bloco no array `"categorias"`:

{
  "id": "nova-categoria",
  "emoji": "/icones/seu-icone.png",
  "titulo": "Nome da Categoria",
  "perguntas": [
    ...
  ]
}

A nova categoria vai aparecer automaticamente na tela inicial e a página dela será gerada sozinha.

---

## Estrutura

**P: O que é o `[id].js` na pasta de categoria?** R: É uma rota dinâmica do Next.js. O `[id]` vira a parte variável da URL (ex: `/categoria/conta`, `/categoria/postagem`). Um único arquivo inteligente serve para exibir todas as categorias do site.

**P: Posso editar o design das páginas?** R: Sim! Os arquivos na pasta `pages/` usam React (JSX), que parece muito com HTML. A estrutura visual da página fica dentro do `return (...)` de cada arquivo.