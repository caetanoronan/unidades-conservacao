# Proteção da Natureza no Brasil

Índice interativo de apoio para estudo e consulta preliminar sobre proteção ambiental, unidades de conservação, vegetação nativa e direitos territoriais no Brasil.

O projeto apresenta os instrumentos como um conjunto integrado, sem tratar categorias jurídicas diferentes como equivalentes. A Constituição fornece a base geral; o Código Florestal regula a vegetação; o SNUC organiza as unidades de conservação; e os regimes indígenas e quilombolas protegem direitos territoriais, culturais e coletivos próprios.

## Objetivos

- Organizar referências legais e ambientais em uma interface única.
- Explicar conceitos para estudantes, pesquisadores e público geral.
- Comparar categorias do SNUC e instrumentos do Código Florestal.
- Diferenciar unidades de conservação de APP, Reserva Legal, Terras Indígenas e territórios quilombolas.
- Conectar conceitos jurídicos a temas de ecologia marinha e pesquisa de campo.

## Conteúdo

- Constituição Federal e fundamentos da proteção ambiental.
- Código Florestal, APP, Reserva Legal e instrumentos complementares.
- Sistema Nacional de Unidades de Conservação (SNUC).
- Terras Indígenas e territórios quilombolas.
- Glossário de direito ambiental, SNUC, ecologia marinha e pesquisa de campo.
- Consulta aos PDFs de referência organizados por tema.

### Código Florestal

Inclui APP, Reserva Legal, Áreas de Uso Restrito, apicuns e salgados, Área Verde Urbana, APP urbana, área urbana consolidada, Lei nº 14.285/2021, compensação de Reserva Legal e alterações legislativas.

### SNUC

Apresenta as 12 categorias em Proteção Integral e Uso Sustentável, com objetivo, usos, restrições, domínio, visitação e governança quando aplicável.

### Povos e territórios

Diferencia Terras Indígenas, territórios quilombolas e unidades de conservação, incluindo relações ou sobreposições que exigem compatibilização institucional.

### Glossário

Reúne termos de Direito ambiental, SNUC, Código Florestal, Ecologia marinha, Ecologia bentônica, Pesquisa e campo, com busca textual, filtro por área, definição e contexto.

### Conclusão

Sintetiza como Constituição, Código Florestal, SNUC e regimes tradicionais se complementam sem confundir suas funções jurídicas.

## Arquivos principais

- `index.html`: entrada na raiz e ponto de entrada do GitHub Pages.
- `web_interacion/index_snuc_categorias.html`: interface principal.
- `web_interacion/snuc_categorias.css`: layout, paleta, temas e acessibilidade visual.
- `web_interacion/snuc_categorias.js`: dados, renderização, filtros, abas, glossário e alternância de tema.
- `web_interacion/snuc_categorias.json`: categorias do SNUC.
- `web_interacion/codigo_florestal.json`: instrumentos do Código Florestal.
- `web_interacion/codigo_florestal_temas.json`: aprofundamentos com links para PDFs.
- `web_interacion/glossario.json`: termos e definições da consulta temática.
- Arquivos `.csv`: versões tabulares para análise ou edição em planilhas.

## Executar localmente

Na raiz do projeto, execute:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000/`.

O arquivo `web_interacion/terminal_server.sh` também inicia o servidor a partir da raiz do projeto em ambientes com Bash.

## Requisitos

- Python 3 para o servidor local.
- Navegador moderno com suporte a JavaScript, `fetch` e `localStorage`.
- Bash apenas para usar diretamente o script do servidor.

Não há dependências externas de Node.js, banco de dados ou framework obrigatório.

## Acessibilidade

- Navegação por abas com setas, `Home` e `End`.
- Semântica `tablist`, `tab` e `tabpanel`.
- Estados `aria-selected`, `aria-controls` e `aria-pressed`.
- Foco visual destacado em controles e links.
- Modo claro e modo escuro com preferência persistente.
- Suporte a `prefers-reduced-motion`.
- Layout responsivo e resultados anunciados com `aria-live`.

## Temas visuais

- Modo claro: creme, verde-menta, rosa, amarelo e lilás.
- Modo escuro: azul-petróleo, verde profundo, ameixa, violeta, âmbar e coral.

## Fontes e responsabilidade de uso

Os PDFs estão organizados nas pastas `Codigo_florestal`, `Snuc` e `comunidades_tradicionais`. A aplicação apoia estudo e consulta inicial, mas não substitui texto legal vigente, mapas oficiais, atos de criação, planos de manejo, normas locais, licenças ou análise técnica e jurídica de um caso concreto.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie o conteúdo desta pasta para a branch `main`.
3. Em `Settings > Pages`, selecione `Deploy from a branch`.
4. Escolha a branch `main` e a pasta `/ (root)`.
5. Salve e aguarde a publicação.

O `index.html` na raiz encaminha o visitante para `web_interacion/index_snuc_categorias.html`, mantendo os PDFs e os dados acessíveis por caminhos relativos.

## Preparar o Git e o remote

O repositório Git local está configurado na branch `main` e conectado ao repositório público:

`https://github.com/caetanoronan/unidades-conservacao`

Para reproduzir a configuração em outra cópia do projeto, na raiz:

```bash
git init
git add .
git commit -m "Inicializa índice interativo de proteção ambiental"
git branch -M main
git remote add origin https://github.com/USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Substitua `USUARIO/NOME-DO-REPOSITORIO` pelos dados do seu repositório. Não inclua tokens ou senhas na URL.

Para conferir o acesso remoto:

```bash
git remote -v
git status
```

## Checklist antes de publicar

- [ ] Revisar textos e ortografia.
- [ ] Conferir PDFs e respectivas fontes.
- [ ] Testar modo claro e modo escuro.
- [ ] Testar navegação por teclado.
- [ ] Testar filtros do SNUC e do Código Florestal.
- [ ] Testar busca e filtro do Glossário.
- [ ] Verificar layout em desktop e celular.
- [ ] Confirmar caminhos relativos pela raiz.
- [ ] Executar `node --check web_interacion/snuc_categorias.js`.
- [ ] Executar o servidor local e abrir `http://localhost:8000/`.
- [ ] Inicializar o Git somente depois da revisão final.
- [ ] Confirmar o remote antes do primeiro `push`.
- [ ] Ativar o GitHub Pages pela branch `main`.

## Autor

Pesquisa e desenvolvimento: **Ronan Armando Caetano**.
