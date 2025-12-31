// data/cssQuestions.js

const cssQuestions = 
[

  {
    "id": "css1",
    "descricao": "O que significa CSS?",
    "alternativas": [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets"
    ],
    "correctAnswer": "Cascading Style Sheets",
    "subject": "CSS"
  },
  {
    "id": "css2",
    "descricao": "Qual propriedade CSS é usada para mudar a cor do texto de um elemento?",
    "alternativas": ["text-color", "font-color", "color", "foreground-color"],
    "correctAnswer": "color",
    "subject": "CSS"
  },
  {
    "id": "css3",
    "descricao": "Qual seletor CSS é usado para selecionar um elemento por seu ID?",
    "alternativas": [".", "#", "*", ":"],
    "correctAnswer": "#",
    "subject": "CSS"
  },
  {
    "id": "css4",
    "descricao": "Como você centraliza um bloco de elemento horizontalmente em CSS?",
    "alternativas": [
      "text-align: center;",
      "align: center;",
      "margin: auto;",
      "padding: center;"
    ],
    "correctAnswer": "margin: auto;",
    "subject": "CSS"
  },
  {
    "id": "css5",
    "descricao": "Qual propriedade CSS controla o espaçamento entre as letras de um texto?",
    "alternativas": [
      "word-spacing",
      "line-height",
      "letter-spacing",
      "text-indent"
    ],
    "correctAnswer": "letter-spacing",
    "subject": "CSS"
  },
  {
    "id": "css6",
    "descricao": "O que é o 'box model' no CSS e quais são suas principais partes?",
    "alternativas": [
      "Elemento, seletor, propriedade e valor",
      "Conteúdo, padding, borda e margem",
      "Display, position, float e clear",
      "Inline, block, flex e grid"
    ],
    "correctAnswer": "Conteúdo, padding, borda e margem",
    "subject": "CSS"
  },
  {
    "id": "css7",
    "descricao": "Qual a diferença entre `display: none;` e `visibility: hidden;`?",
    "alternativas": [
      "Nenhuma diferença",
      "`display: none` remove o elemento do fluxo da página, enquanto `visibility: hidden` apenas o oculta, mantendo seu espaço.",
      "`visibility: hidden` remove o elemento do fluxo, enquanto `display: none` apenas o oculta.",
      "Ambos são obsoletos e devem ser evitados."
    ],
    "correctAnswer": "`display: none` remove o elemento do fluxo da página, enquanto `visibility: hidden` apenas o oculta, mantendo seu espaço.",
    "subject": "CSS"
  },
  {
    "id": "css8",
    "descricao": "O que faz o seletor `.minhaClasse, #meuID { color: red; }`?",
    "alternativas": [
      "Aplica `color: red` a elementos que têm a classe `minhaClasse` E o ID `meuID`.",
      "Aplica `color: red` a elementos com a classe `minhaClasse` OU a elementos com o ID `meuID`.",
      "Aplica a cor vermelha a todos os elementos filhos de `.minhaClasse` e `#meuID`.",
      "Não é um seletor válido."
    ],
    "correctAnswer": "Aplica `color: red` a elementos com a classe `minhaClasse` OU a elementos com o ID `meuID`.",
    "subject": "CSS"
  },
  {
    "id": "css9",
    "descricao": "O que a propriedade `z-index` faz no CSS?",
    "alternativas": [
      "Controla a largura de um elemento.",
      "Determina a ordem de empilhamento de elementos posicionados (qual elemento fica na frente).",
      "Define a opacidade de um elemento.",
      "Ajusta o espaçamento interno."
    ],
    "correctAnswer": "Determina a ordem de empilhamento de elementos posicionados (qual elemento fica na frente).",
    "subject": "CSS"
  },
  {
    "id": "css10",
    "descricao": "O que a propriedade `letter-spacing` controla?",
    "alternativas": [
      "Espaçamentos entre palavras.",
      "Altura da linha.",
      "Espaçamento entre caracteres.",
      "Tamanho da fonte."
    ],
    "correctAnswer": "Espaçamento entre caracteres.",
    "subject": "CSS"
  },
  {
    "id": "css11",
    "descricao": "Qual propriedade controla o espaçamento entre palavras?",
    "alternativas": [
      "letter-spacing",
      "line-height",
      "text-indent",
      "word-spacing"
    ],
    "correctAnswer": "word-spacing",
    "subject": "CSS"
  },
  {
    "id": "css12",
    "descricao": "Como centralizar horizontalmente um elemento com largura fixa?",
    "alternativas": [
      "text-align: center;",
      "margin: 0 auto;",
      "padding: center;",
      "align: center;"
    ],
    "correctAnswer": "margin: 0 auto;",
    "subject": "CSS"
  },
  {
    "id": "css13",
    "descricao": "Qual propriedade permite posicionar elementos em grade bidimensional?",
    "alternativas": ["display: flex", "display: grid", "display: inline-block", "display: table"],
    "correctAnswer": "display: grid",
    "subject": "CSS"
  },
  {
    "id": "css14",
    "descricao": "O que `flexbox` permite controlar?",
    "alternativas": [
      "Tipografia avançada.",
      "O layout de itens em um contêiner unidimensional (linha ou coluna).",
      "A cor de fundo.",
      "Apenas a responsividade de imagens."
    ],
    "correctAnswer": "O layout de itens em um contêiner unidimensional (linha ou coluna).",
    "subject": "CSS"
  },
  {
    "id": "css15",
    "descricao": "Quando usar `position: absolute;` vs `position: relative;`?",
    "alternativas": [
      "`absolute` posiciona o elemento em relação ao seu ancestral posicionado mais próximo e o remove do fluxo normal.",
      "`relative` posiciona o elemento em relação à sua posição normal, sem removê-lo do fluxo.",
      "`absolute` é para elementos filhos, `relative` é para elementos pais.",
      "As duas primeiras alternativas estão corretas."
    ],
    "correctAnswer": "As duas primeiras alternativas estão corretas.",
    "subject": "CSS"
  },
  {
    "id": "css16",
    "descricao": "O que é o Box Model no CSS?",
    "alternativas": [
      "Um modelo de layout para posicionamento de elementos.",
      "Um modelo que descreve a caixa retangular gerada para elementos, composta por conteúdo, preenchimento (padding), borda e margem.",
      "Uma técnica para criar animações.",
      "Um método para aplicar estilos responsivos."
    ],
    "correctAnswer": "Um modelo que descreve a caixa retangular gerada para elementos, composta por conteúdo, preenchimento (padding), borda e margem.",
    "subject": "CSS"
  },
  {
    "id": "css17",
    "descricao": "Qual propriedade CSS controla o espaçamento entre o conteúdo de um elemento e sua borda?",
    "alternativas": [
      "padding",
      "margin",
      "border-spacing",
      "outline"
    ],
    "correctAnswer": "padding",
    "subject": "CSS"
  },
  {
    "id": "css18",
    "descricao": "Qual valor da propriedade box-sizing inclui padding e border no cálculo da largura e altura de um elemento?",
    "alternativas": [
      "content-box",
      "border-box",
      "padding-box",
      "margin-box"
    ],
    "correctAnswer": "border-box",
    "subject": "CSS"
  },
  {
    "id": "css19",
    "descricao": "Qual propriedade CSS é usada para criar um layout flexível?",
    "alternativas": [
      "display: flex;",
      "display: grid;",
      "display: inline-block;",
      "display: table;"
    ],
    "correctAnswer": "display: flex;",
    "subject": "CSS"
  },
  {
    "id": "css20",
    "descricao": "Qual propriedade CSS é usada para criar um layout em grade?",
    "alternativas": [
      "display: flex;",
      "display: grid;",
      "display: block;",
      "display: inline;"
    ],
    "correctAnswer": "display: grid;",
    "subject": "CSS"
  },
  {
    "id": "css21",
    "descricao": "Qual valor da propriedade position posiciona um elemento em relação ao seu elemento pai mais próximo com position diferente de static?",
    "alternativas": ["absolute", "relative", "fixed", "sticky"],
    "correctAnswer": "absolute",
    "subject": "CSS"
  },
  {
    "id": "css22",
    "descricao": "Qual valor da propriedade position posiciona um elemento em relação à janela de visualização do navegador?",
    "alternativas": ["absolute", "relative", "fixed", "sticky"],
    "correctAnswer": "fixed",
    "subject": "CSS"
  },
  {
    "id": "css23",
    "descricao": "Qual valor da propriedade position posiciona um elemento em relação ao seu local original no fluxo do documento?",
    "alternativas": ["absolute", "relative", "fixed", "sticky"],
    "correctAnswer": "relative",
    "subject": "CSS"
  },
  {
    "id": "css24",
    "descricao": "Qual propriedade CSS controla a sobreposição de elementos?",
    "alternativas": ["z-index", "opacity", "visibility", "display"],
    "correctAnswer": "z-index",
    "subject": "CSS"
  },
  {
    "id": "css25",
    "descricao": "Qual valor da propriedade z-index coloca um elemento acima dos elementos com valores menores?",
    "alternativas": [
      "Um valor positivo",
      "Um valor negativo",
      "Zero",
      "Qualquer valor numérico maior"
    ],
    "correctAnswer": "Qualquer valor numérico maior",
    "subject": "CSS"
  },
  {
    "id": "css26",
    "descricao": "Qual propriedade CSS é usada para definir a imagem de fundo de um elemento?",
    "alternativas": [
      "background-color",
      "background-image",
      "image-src",
      "background-src"
    ],
    "correctAnswer": "background-image",
    "subject": "CSS"
  },
  {
    "id": "css27",
    "descricao": "Qual propriedade CSS controla o tamanho da fonte?",
    "alternativas": [
      "text-size",
      "font-style",
      "font-size",
      "text-transform"
    ],
    "correctAnswer": "font-size",
    "subject": "CSS"
  },
  {
    "id": "css28",
    "descricao": "Qual valor da propriedade `text-decoration` remove o sublinhado de um link?",
    "alternativas": [
      "none",
      "no-underline",
      "remove",
      "clean"
    ],
    "correctAnswer": "none",
    "subject": "CSS"
  },
  {
    "id": "css29",
    "descricao": "O que a pseudo-classe `:hover` faz?",
    "alternativas": [
      "Seleciona um elemento que está sendo clicado.",
      "Seleciona um elemento quando o cursor do mouse passa sobre ele.",
      "Seleciona o primeiro filho de um elemento.",
      "Seleciona um link que já foi visitado."
    ],
    "correctAnswer": "Seleciona um elemento quando o cursor do mouse passa sobre ele.",
    "subject": "CSS"
  },
  {
    "id": "css30",
    "descricao": "Qual seletor seleciona todos os elementos `<p>` que são filhos diretos de um `<div>`?",
    "alternativas": [
      "div p",
      "div + p",
      "div > p",
      "div ~ p"
    ],
    "correctAnswer": "div > p",
    "subject": "CSS"
  },
  {
    "id": "css31",
    "descricao": "O que a propriedade `opacity` controla?",
    "alternativas": [
      "A visibilidade de um elemento.",
      "O nível de transparência de um elemento.",
      "A cor de um elemento.",
      "A sombra de um elemento."
    ],
    "correctAnswer": "O nível de transparência de um elemento.",
    "subject": "CSS"
  },
  {
    "id": "css32",
    "descricao": "Qual propriedade é uma abreviação (shorthand) para `border-width`, `border-style` e `border-color`?",
    "alternativas": [
      "border-style",
      "outline",
      "border",
      "border-all"
    ],
    "correctAnswer": "border",
    "subject": "CSS"
  },
  {
    "id": "css33",
    "descricao": "Qual propriedade arredonda os cantos de um elemento?",
    "alternativas": [
      "corner-radius",
      "border-corner",
      "border-radius",
      "round-corners"
    ],
    "correctAnswer": "border-radius",
    "subject": "CSS"
  },
  {
    "id": "css34",
    "descricao": "Qual função de cor usa os valores Vermelho, Verde, Azul e Alfa?",
    "alternativas": [
      "hsl()",
      "rgb()",
      "cmyk()",
      "rgba()"
    ],
    "correctAnswer": "rgba()",
    "subject": "CSS"
  },
  {
    "id": "css35",
    "descricao": "O que são media queries?",
    "alternativas": [
      "Consultas a bancos de dados de mídia.",
      "Uma técnica usada em CSS para aplicar estilos com base nas características do dispositivo, como largura da tela.",
      "Uma forma de importar arquivos de mídia.",
      "Uma biblioteca JavaScript para responsividade."
    ],
    "correctAnswer": "Uma técnica usada em CSS para aplicar estilos com base nas características do dispositivo, como largura da tela.",
    "subject": "CSS"
  },
  {
    "id": "css36",
    "descricao": "Qual é a sintaxe correta para uma media query que aplica estilos para telas com largura máxima de 600px?",
    "alternativas": [
      "@media screen and (max-width: 600px) { ... }",
      "@media screen (width <= 600px) { ... }",
      "@query screen (max-width: 600px) { ... }",
      "@responsive (width: 600px) { ... }"
    ],
    "correctAnswer": "@media screen and (max-width: 600px) { ... }",
    "subject": "CSS"
  },
  {
    "id": "css37",
    "descricao": "O que a propriedade `float` faz?",
    "alternativas": [
      "Faz um elemento flutuar verticalmente.",
      "Remove um elemento do fluxo normal e o posiciona à esquerda ou à direita de seu contêiner, permitindo que o texto flua ao seu redor.",
      "Centraliza um elemento.",
      "Anima um elemento."
    ],
    "correctAnswer": "Remove um elemento do fluxo normal e o posiciona à esquerda ou à direita de seu contêiner, permitindo que o texto flua ao seu redor.",
    "subject": "CSS"
  },
  {
    "id": "css38",
    "descricao": "Qual propriedade é usada para limpar os efeitos de `float`?",
    "alternativas": [
      "clear",
      "overflow",
      "cleanup",
      "stop-float"
    ],
    "correctAnswer": "clear",
    "subject": "CSS"
  },
  {
    "id": "css39",
    "descricao": "O que a pseudo-classe `:nth-child(n)` seleciona?",
    "alternativas": [
      "O n-ésimo elemento de qualquer tipo.",
      "O n-ésimo filho de seu elemento pai.",
      "O n-ésimo elemento com uma classe específica.",
      "O filho que tem `n` irmãos."
    ],
    "correctAnswer": "O n-ésimo filho de seu elemento pai.",
    "subject": "CSS"
  },
  {
    "id": "css40",
    "descricao": "Como você seleciona todos os links `<a>` que possuem um atributo `target`?",
    "alternativas": [
      "a[target]",
      "a.target",
      "a:target",
      "a > target"
    ],
    "correctAnswer": "a[target]",
    "subject": "CSS"
  },
  {
    "id": "css41",
    "descricao": "Qual propriedade CSS é usada para criar transições suaves de um estado de estilo para outro?",
    "alternativas": [
      "animation",
      "transform",
      "transition",
      "move"
    ],
    "correctAnswer": "transition",
    "subject": "CSS"
  },
  {
    "id": "css42",
    "descricao": "Qual propriedade CSS aplica transformações 2D ou 3D a um elemento, como `rotate`, `scale` ou `translate`?",
    "alternativas": [
      "transform",
      "transition",
      "perspective",
      "filter"
    ],
    "correctAnswer": "transform",
    "subject": "CSS"
  },
  {
    "id": "css43",
    "descricao": "O que a regra `@keyframes` é usada para criar?",
    "alternativas": [
      "Fontes personalizadas.",
      "Variáveis CSS.",
      "Animações complexas, definindo os estágios da animação.",
      "Layouts de grade."
    ],
    "correctAnswer": "Animações complexas, definindo os estágios da animação.",
    "subject": "CSS"
  },
  {
    "id": "css44",
    "descricao": "O que são variáveis CSS (Custom Properties)?",
    "alternativas": [
      "Variáveis declaradas em JavaScript.",
      "Valores definidos pelo autor que podem ser reutilizados em todo o documento, declarados com `--nome-da-variavel`.",
      "Uma funcionalidade de pré-processadores como SASS.",
      "Arquivos CSS que contêm apenas variáveis."
    ],
    "correctAnswer": "Valores definidos pelo autor que podem ser reutilizados em todo o documento, declarados com `--nome-da-variavel`.",
    "subject": "CSS"
  },
  {
    "id": "css45",
    "descricao": "Como você usa uma variável CSS chamada `--cor-principal`?",
    "alternativas": [
      "color: $cor-principal;",
      "color: var(--cor-principal);",
      "color: --cor-principal;",
      "color: get(--cor-principal);"
    ],
    "correctAnswer": "color: var(--cor-principal);",
    "subject": "CSS"
  },
  // Novas perguntas de css46 a css200
  {
    "id": "css46",
    "descricao": "Qual propriedade do Flexbox define o alinhamento dos itens ao longo do eixo principal?",
    "alternativas": ["align-items", "justify-content", "flex-direction", "align-content"],
    "correctAnswer": "justify-content",
    "subject": "CSS"
  },
  {
    "id": "css47",
    "descricao": "Qual propriedade do Flexbox define o alinhamento dos itens ao longo do eixo transversal?",
    "alternativas": ["align-items", "justify-content", "flex-wrap", "flex-flow"],
    "correctAnswer": "align-items",
    "subject": "CSS"
  },
  {
    "id": "css48",
    "descricao": "O que `flex-direction: column;` faz?",
    "alternativas": ["Alinha os itens em uma linha.", "Alinha os itens em uma coluna, tornando o eixo principal vertical.", "Inverte a ordem dos itens.", "Permite que os itens quebrem para a próxima linha."],
    "correctAnswer": "Alinha os itens em uma coluna, tornando o eixo principal vertical.",
    "subject": "CSS"
  },
  {
    "id": "css49",
    "descricao": "Qual propriedade permite que os itens flexíveis quebrem para a próxima linha em vez de encolher?",
    "alternativas": ["flex-shrink", "flex-wrap", "flex-basis", "overflow"],
    "correctAnswer": "flex-wrap",
    "subject": "CSS"
  },
  {
    "id": "css50",
    "descricao": "No CSS Grid, qual propriedade define o número e o tamanho das colunas da grade?",
    "alternativas": ["grid-template-rows", "grid-gap", "grid-template-columns", "grid-auto-flow"],
    "correctAnswer": "grid-template-columns",
    "subject": "CSS"
  },
  {
    "id": "css51",
    "descricao": "O que a unidade `fr` representa no CSS Grid?",
    "alternativas": ["Frames por segundo.", "Uma unidade fracionária do espaço disponível no contêiner da grade.", "Uma unidade de tamanho fixo em pixels.", "A fonte de referência."],
    "correctAnswer": "Uma unidade fracionária do espaço disponível no contêiner da grade.",
    "subject": "CSS"
  },
  {
    "id": "css52",
    "descricao": "Qual propriedade é uma abreviação para `grid-row-gap` e `grid-column-gap`?",
    "alternativas": ["grid-spacing", "grid-margin", "grid-gap", "grid-padding"],
    "correctAnswer": "grid-gap",
    "subject": "CSS"
  },
  {
    "id": "css53",
    "descricao": "O que a pseudo-classe `:focus` seleciona?",
    "alternativas": ["Um elemento que tem o foco do teclado, como um campo de formulário selecionado.", "Um elemento que está sendo sobrevoado pelo mouse.", "O primeiro elemento da página.", "Um elemento que foi clicado."],
    "correctAnswer": "Um elemento que tem o foco do teclado, como um campo de formulário selecionado.",
    "subject": "CSS"
  },
  {
    "id": "css54",
    "descricao": "O que o pseudo-elemento `::before` faz?",
    "alternativas": ["Seleciona o primeiro filho de um elemento.", "Insere conteúdo gerado antes do conteúdo de um elemento.", "Aplica estilo ao texto antes de um elemento.", "É usado para comentários."],
    "correctAnswer": "Insere conteúdo gerado antes do conteúdo de um elemento.",
    "subject": "CSS"
  },
  {
    "id": "css55",
    "descricao": "Qual propriedade é necessária para que `::before` e `::after` funcionem?",
    "alternativas": ["display", "position", "content", "visibility"],
    "correctAnswer": "content",
    "subject": "CSS"
  },
  {
    "id": "css56",
    "descricao": "O que significa 'especificidade' em CSS?",
    "alternativas": ["Uma forma de especificar o tipo de fonte.", "A regra que o navegador usa para determinar qual declaração de estilo é mais específica e, portanto, deve ser aplicada a um elemento.", "Uma propriedade para layouts específicos.", "Uma unidade de medida."],
    "correctAnswer": "A regra que o navegador usa para determinar qual declaração de estilo é mais específica e, portanto, deve ser aplicada a um elemento.",
    "subject": "CSS"
  },
  {
    "id": "css57",
    "descricao": "Qual dos seguintes seletores tem a maior especificidade?",
    "alternativas": ["`p` (seletor de tipo)", "`.classe` (seletor de classe)", "`#id` (seletor de ID)", "Estilo inline (atributo `style`)"],
    "correctAnswer": "Estilo inline (atributo `style`)",
    "subject": "CSS"
  },
  {
    "id": "css58",
    "descricao": "O que a declaração `!important` faz?",
    "alternativas": ["Marca uma regra como importante para o desenvolvedor.", "Aumenta a velocidade de renderização da regra.", "Faz com que a regra tenha a maior especificidade, sobrepondo-se a quase todas as outras declarações.", "Importa um arquivo CSS externo."],
    "correctAnswer": "Faz com que a regra tenha a maior especificidade, sobrepondo-se a quase todas as outras declarações.",
    "subject": "CSS"
  },
  {
    "id": "css59",
    "descricao": "Qual propriedade é usada para controlar o que acontece com o conteúdo que transborda (overflows) a caixa de um elemento?",
    "alternativas": ["overflow", "clip", "hide", "text-overflow"],
    "correctAnswer": "overflow",
    "subject": "CSS"
  },
  {
    "id": "css60",
    "descricao": "Qual valor de `overflow` adiciona barras de rolagem apenas quando necessário?",
    "alternativas": ["scroll", "visible", "hidden", "auto"],
    "correctAnswer": "auto",
    "subject": "CSS"
  },
  {
    "id": "css61",
    "descricao": "O que o seletor `*` (universal) faz?",
    "alternativas": ["Seleciona todos os elementos.", "Seleciona apenas elementos com a classe `*`.", "É usado para multiplicação em `calc()`.", "Seleciona o elemento raiz."],
    "correctAnswer": "Seleciona todos os elementos.",
    "subject": "CSS"
  },
  {
    "id": "css62",
    "descricao": "Qual propriedade define a família da fonte (ex: Arial, Times New Roman)?",
    "alternativas": ["font-style", "font-weight", "font-family", "font-variant"],
    "correctAnswer": "font-family",
    "subject": "CSS"
  },
  {
    "id": "css63",
    "descricao": "O que a propriedade `font-weight` controla?",
    "alternativas": ["O peso ou espessura da fonte (ex: normal, bold).", "O tamanho da fonte.", "O estilo da fonte (ex: italic).", "A cor da fonte."],
    "correctAnswer": "O peso ou espessura da fonte (ex: normal, bold).",
    "subject": "CSS"
  },
  {
    "id": "css64",
    "descricao": "Qual propriedade controla a altura de uma linha de texto?",
    "alternativas": ["height", "text-height", "line-height", "spacing"],
    "correctAnswer": "line-height",
    "subject": "CSS"
  },
  {
    "id": "css65",
    "descricao": "Como se aplica um estilo a todos os elementos `<h1>`, `<h2>`, e `<h3>` ao mesmo tempo?",
    "alternativas": ["`h1, h2, h3 { ... }`", "`h1 h2 h3 { ... }`", "`h1 + h2 + h3 { ... }`", "`h1-h3 { ... }`"],
    "correctAnswer": "`h1, h2, h3 { ... }`",
    "subject": "CSS"
  },
  {
    "id": "css66",
    "descricao": "O que a propriedade `box-shadow` cria?",
    "alternativas": ["Uma sombra no texto.", "Uma sombra ao redor da caixa de um elemento.", "Uma borda sombreada.", "Uma sombra interna no elemento."],
    "correctAnswer": "Uma sombra ao redor da caixa de um elemento.",
    "subject": "CSS"
  },
  {
    "id": "css67",
    "descricao": "O que a propriedade `text-shadow` cria?",
    "alternativas": ["Uma sombra na caixa do elemento.", "Uma sombra atrás do texto.", "Um contorno para o texto.", "Um efeito de brilho no texto."],
    "correctAnswer": "Uma sombra atrás do texto.",
    "subject": "CSS"
  },
  {
    "id": "css68",
    "descricao": "Qual valor de `position` mantém um elemento posicionado de forma relativa até que ele atinja um determinado ponto de rolagem, e então se torna `fixed`?",
    "alternativas": ["absolute", "relative", "fixed", "sticky"],
    "correctAnswer": "sticky",
    "subject": "CSS"
  },
  {
    "id": "css69",
    "descricao": "O que são pré-processadores CSS como SASS ou LESS?",
    "alternativas": ["Bibliotecas CSS prontas.", "Linguagens de script que estendem o CSS com recursos como variáveis, aninhamento e mixins, e que são compiladas para CSS normal.", "Editores de texto para CSS.", "Validadores de código CSS."],
    "correctAnswer": "Linguagens de script que estendem o CSS com recursos como variáveis, aninhamento e mixins, e que são compiladas para CSS normal.",
    "subject": "CSS"
  },
  {
    "id": "css70",
    "descricao": "Qual a principal vantagem de usar um pré-processador CSS?",
    "alternativas": ["O CSS final fica menor.", "Torna o CSS mais organizável, reutilizável e fácil de manter.", "Melhora o SEO.", "Não há vantagens, é apenas uma preferência."],
    "correctAnswer": "Torna o CSS mais organizável, reutilizável e fácil de manter.",
    "subject": "CSS"
  },
  {
    "id": "css71",
    "descricao": "Qual unidade de medida é relativa ao tamanho da fonte do elemento raiz (`<html>`)?",
    "alternativas": ["em", "rem", "px", "%"],
    "correctAnswer": "rem",
    "subject": "CSS"
  },
  {
    "id": "css72",
    "descricao": "Qual unidade de medida é relativa ao tamanho da fonte do elemento pai?",
    "alternativas": ["em", "rem", "vw", "pt"],
    "correctAnswer": "em",
    "subject": "CSS"
  },
  {
    "id": "css73",
    "descricao": "O que a unidade `vw` representa?",
    "alternativas": ["A altura da viewport (janela de visualização).", "1% da largura da viewport.", "A largura do elemento pai.", "A largura vertical."],
    "correctAnswer": "1% da largura da viewport.",
    "subject": "CSS"
  },
  {
    "id": "css74",
    "descricao": "O que a unidade `vh` representa?",
    "alternativas": ["A largura da viewport.", "1% da altura da viewport.", "A altura do elemento pai.", "A altura vertical."],
    "correctAnswer": "1% da altura da viewport.",
    "subject": "CSS"
  },
  {
    "id": "css75",
    "descricao": "Qual o propósito da regra `@import` em CSS?",
    "alternativas": ["Para importar variáveis.", "Para importar outra folha de estilo dentro de uma folha de estilo.", "Para importar fontes.", "Para importar imagens."],
    "correctAnswer": "Para importar outra folha de estilo dentro de uma folha de estilo.",
    "subject": "CSS"
  },
  {
    "id": "css76",
    "descricao": "Qual é a desvantagem de usar `@import` em comparação com múltiplas tags `<link>`?",
    "alternativas": ["Não é suportado por todos os navegadores.", "Pode prejudicar o desempenho do carregamento da página, pois bloqueia o download paralelo.", "É mais difícil de escrever.", "Não há desvantagens."],
    "correctAnswer": "Pode prejudicar o desempenho do carregamento da página, pois bloqueia o download paralelo.",
    "subject": "CSS"
  },
  {
    "id": "css77",
    "descricao": "O que a função `calc()` permite fazer?",
    "alternativas": ["Calcular a especificidade de um seletor.", "Realizar cálculos matemáticos para determinar valores de propriedades CSS.", "Converter cores.", "Calcular o tempo de animação."],
    "correctAnswer": "Realizar cálculos matemáticos para determinar valores de propriedades CSS.",
    "subject": "CSS"
  },
  {
    "id": "css78",
    "descricao": "Qual é um exemplo válido de uso da função `calc()`?",
    "alternativas": ["`width: calc(100% - 80px);`", "`width: calculate(100% - 80px);`", "`width: (100% - 80px);`", "`width: 100% - 80px;`"],
    "correctAnswer": "`width: calc(100% - 80px);`",
    "subject": "CSS"
  },
  {
    "id": "css79",
    "descricao": "Qual propriedade é usada para controlar o estilo do cursor do mouse?",
    "alternativas": ["mouse-style", "pointer", "cursor", "hover-style"],
    "correctAnswer": "cursor",
    "subject": "CSS"
  },
  {
    "id": "css80",
    "descricao": "Qual valor de `cursor` muda o cursor para uma 'mãozinha', indicando um link?",
    "alternativas": ["hand", "link", "pointer", "click"],
    "correctAnswer": "pointer",
    "subject": "CSS"
  },
  {
    "id": "css81",
    "descricao": "O que o seletor `p:first-child` seleciona?",
    "alternativas": ["O primeiro parágrafo da página.", "Todo parágrafo que é o primeiro filho de seu pai.", "A primeira letra de cada parágrafo.", "A primeira linha de cada parágrafo."],
    "correctAnswer": "Todo parágrafo que é o primeiro filho de seu pai.",
    "subject": "CSS"
  },
  {
    "id": "css82",
    "descricao": "O que o seletor `p:last-child` seleciona?",
    "alternativas": ["O último parágrafo da página.", "Todo parágrafo que é o último filho de seu pai.", "A última palavra de cada parágrafo.", "O último irmão de um parágrafo."],
    "correctAnswer": "Todo parágrafo que é o último filho de seu pai.",
    "subject": "CSS"
  },
  {
    "id": "css83",
    "descricao": "Qual propriedade define a cor de fundo de um elemento?",
    "alternativas": ["color", "background-color", "bgcolor", "background"],
    "correctAnswer": "background-color",
    "subject": "CSS"
  },
  {
    "id": "css84",
    "descricao": "O que o seletor adjacente `h1 + p` seleciona?",
    "alternativas": ["Todos os parágrafos dentro de um `h1`.", "Todos os parágrafos que são irmãos de um `h1`.", "Apenas o primeiro parágrafo que vem imediatamente após um `h1` e é seu irmão.", "Todos os `h1` que estão dentro de um parágrafo."],
    "correctAnswer": "Apenas o primeiro parágrafo que vem imediatamente após um `h1` e é seu irmão.",
    "subject": "CSS"
  },
  {
    "id": "css85",
    "descricao": "O que o seletor geral de irmãos `h1 ~ p` seleciona?",
    "alternativas": ["Apenas o primeiro parágrafo irmão que segue um `h1`.", "Todos os parágrafos que são irmãos de um `h1` e vêm depois dele.", "O `h1` que é irmão de um `p`.", "Todos os irmãos de um `h1`."],
    "correctAnswer": "Todos os parágrafos que são irmãos de um `h1` e vêm depois dele.",
    "subject": "CSS"
  },
  {
    "id": "css86",
    "descricao": "O que a propriedade `vertical-align` faz?",
    "alternativas": ["Centraliza verticalmente elementos de bloco.", "Define o alinhamento vertical de elementos inline ou de células de tabela.", "Controla a direção do texto.", "Define o espaçamento vertical."],
    "correctAnswer": "Define o alinhamento vertical de elementos inline ou de células de tabela.",
    "subject": "CSS"
  },
  {
    "id": "css87",
    "descricao": "Como você pode aplicar um estilo a um link não visitado?",
    "alternativas": ["`a:link`", "`a:unvisited`", "`a:new`", "`a`"],
    "correctAnswer": "`a:link`",
    "subject": "CSS"
  },
  {
    "id": "css88",
    "descricao": "Como você pode aplicar um estilo a um link visitado?",
    "alternativas": ["`a:visited`", "`a:seen`", "`a:history`", "`a:used`"],
    "correctAnswer": "`a:visited`",
    "subject": "CSS"
  },
  {
    "id": "css89",
    "descricao": "Qual pseudo-classe seleciona um elemento que está ativo (sendo clicado)?",
    "alternativas": ["`:click`", "`:focus`", "`:active`", "`:target`"],
    "correctAnswer": "`:active`",
    "subject": "CSS"
  },
  {
    "id": "css90",
    "descricao": "Qual propriedade define a decoração adicionada ao texto, como sublinhado ou riscado?",
    "alternativas": ["text-style", "text-decoration", "font-decoration", "text-line"],
    "correctAnswer": "text-decoration",
    "subject": "CSS"
  },
  {
    "id": "css91",
    "descricao": "Qual propriedade transforma o texto para maiúsculas, minúsculas ou capitalizado?",
    "alternativas": ["text-case", "font-transform", "text-transform", "case-style"],
    "correctAnswer": "text-transform",
    "subject": "CSS"
  },
  {
    "id": "css92",
    "descricao": "O que a propriedade `white-space: nowrap;` faz?",
    "alternativas": ["Impede que o texto quebre para a próxima linha dentro de um elemento.", "Adiciona espaços extras.", "Remove todos os espaços em branco.", "Condensa o espaço em branco."],
    "correctAnswer": "Impede que o texto quebre para a próxima linha dentro de um elemento.",
    "subject": "CSS"
  },
  {
    "id": "css93",
    "descricao": "O que a propriedade `text-overflow: ellipsis;` faz?",
    "alternativas": ["Adiciona uma elipse (...) ao final do texto que transborda seu contêiner.", "Remove o texto que transborda.", "Cria uma elipse como plano de fundo.", "Transforma todo o texto em elipses."],
    "correctAnswer": "Adiciona uma elipse (...) ao final do texto que transborda seu contêiner.",
    "subject": "CSS"
  },
  {
    "id": "css94",
    "descricao": "Para que a propriedade `text-overflow` funcione, quais outras propriedades geralmente são necessárias?",
    "alternativas": ["`white-space: nowrap;` e `overflow: hidden;`", "`display: block;`", "`text-align: justify;`", "Nenhuma outra propriedade é necessária."],
    "correctAnswer": "`white-space: nowrap;` e `overflow: hidden;`",
    "subject": "CSS"
  },
  {
    "id": "css95",
    "descricao": "Qual propriedade é usada para adicionar um contorno ao redor de um elemento, fora da borda?",
    "alternativas": ["border", "outline", "shadow", "padding"],
    "correctAnswer": "outline",
    "subject": "CSS"
  },
  {
    "id": "css96",
    "descricao": "Qual a principal diferença entre `outline` e `border`?",
    "alternativas": ["`outline` não ocupa espaço no layout, `border` ocupa.", "`outline` só pode ser pontilhado.", "`border` não pode ter cor.", "Não há diferença."],
    "correctAnswer": "`outline` não ocupa espaço no layout, `border` ocupa.",
    "subject": "CSS"
  },
  {
    "id": "css97",
    "descricao": "O que a regra `@font-face` permite fazer?",
    "alternativas": ["Mudar a face de um elemento.", "Especificar uma fonte personalizada para ser baixada e usada em uma página da web.", "Mudar a cor da fonte.", "Aplicar um filtro a uma fonte."],
    "correctAnswer": "Especificar uma fonte personalizada para ser baixada e usada em uma página da web.",
    "subject": "CSS"
  },
  {
    "id": "css98",
    "descricao": "Qual propriedade CSS pode ser usada para criar um gradiente de cores como fundo?",
    "alternativas": ["`background-color`", "`gradient()`", "`background-image` com `linear-gradient()` ou `radial-gradient()`", "`background-gradient`"],
    "correctAnswer": "`background-image` com `linear-gradient()` ou `radial-gradient()`",
    "subject": "CSS"
  },
  {
    "id": "css99",
    "descricao": "Qual propriedade controla o tamanho de uma imagem de fundo?",
    "alternativas": ["`background-size`", "`background-scale`", "`image-size`", "`background-dimensions`"],
    "correctAnswer": "`background-size`",
    "subject": "CSS"
  },
  {
    "id": "css100",
    "descricao": "O que o valor `cover` para `background-size` faz?",
    "alternativas": ["Redimensiona a imagem para cobrir completamente o contêiner, possivelmente cortando parte da imagem.", "Redimensiona a imagem para caber no contêiner, possivelmente deixando espaços vazios.", "Repete a imagem.", "Estica a imagem."],
    "correctAnswer": "Redimensiona a imagem para cobrir completamente o contêiner, possivelmente cortando parte da imagem.",
    "subject": "CSS"
  },
  {
    "id": "css101",
    "descricao": "O que o valor `contain` para `background-size` faz?",
    "alternativas": ["Corta a imagem.", "Redimensiona a imagem para ser o maior possível sem ser cortada ou esticada, cabendo dentro do contêiner.", "Cobre todo o contêiner.", "Define o tamanho em pixels."],
    "correctAnswer": "Redimensiona a imagem para ser o maior possível sem ser cortada ou esticada, cabendo dentro do contêiner.",
    "subject": "CSS"
  },
  {
    "id": "css102",
    "descricao": "Qual propriedade define se uma imagem de fundo se repete ou não?",
    "alternativas": ["`background-repeat`", "`background-loop`", "`background-tile`", "`background-cycle`"],
    "correctAnswer": "`background-repeat`",
    "subject": "CSS"
  },
  {
    "id": "css103",
    "descricao": "Qual propriedade CSS é usada para aplicar efeitos visuais como desfoque ou saturação a um elemento?",
    "alternativas": ["`effect`", "`filter`", "`transform`", "`appearance`"],
    "correctAnswer": "`filter`",
    "subject": "CSS"
  },
  {
    "id": "css104",
    "descricao": "O que o seletor `:not(seletor)` faz?",
    "alternativas": ["Seleciona elementos que não correspondem ao seletor especificado.", "Adiciona uma nota ao seletor.", "É um seletor inválido.", "Seleciona apenas o seletor especificado."],
    "correctAnswer": "Seleciona elementos que não correspondem ao seletor especificado.",
    "subject": "CSS"
  },
  {
    "id": "css105",
    "descricao": "Como você seleciona um elemento `<input>` que está desabilitado?",
    "alternativas": ["`input:disabled`", "`input[disabled]`", "`input.disabled`", "A e B estão corretas."],
    "correctAnswer": "A e B estão corretas.",
    "subject": "CSS"
  },
  {
    "id": "css106",
    "descricao": "Como você seleciona um elemento `<input type='checkbox'>` que está marcado?",
    "alternativas": ["`input:checked`", "`input:selected`", "`input[checked]`", "`input.checked`"],
    "correctAnswer": "`input:checked`",
    "subject": "CSS"
  },
  {
    "id": "css107",
    "descricao": "No Flexbox, o que `align-self` permite?",
    "alternativas": ["Alinhar todos os itens no contêiner.", "Sobrescrever o `align-items` para um único item flexível.", "Definir o tamanho de um item.", "Justificar um único item."],
    "correctAnswer": "Sobrescrever o `align-items` para um único item flexível.",
    "subject": "CSS"
  },
  {
    "id": "css108",
    "descricao": "No Flexbox, qual propriedade controla a ordem dos itens flexíveis?",
    "alternativas": ["`order`", "`flex-order`", "`position`", "`z-index`"],
    "correctAnswer": "`order`",
    "subject": "CSS"
  },
  {
    "id": "css109",
    "descricao": "Qual propriedade no Flexbox é uma abreviação para `flex-grow`, `flex-shrink` e `flex-basis`?",
    "alternativas": ["`flexbox`", "`flex-item`", "`flex`", "`flex-flow`"],
    "correctAnswer": "`flex`",
    "subject": "CSS"
  },
  {
    "id": "css110",
    "descricao": "No Grid, como você faz um item abranger duas colunas, começando da linha 1?",
    "alternativas": ["`grid-column: 1 / 3;`", "`grid-column: span 2;`", "`grid-column-span: 2;`", "A e B estão corretas."],
    "correctAnswer": "A e B estão corretas.",
    "subject": "CSS"
  },
  {
    "id": "css111",
    "descricao": "O que a função `minmax()` faz no CSS Grid?",
    "alternativas": ["Define um tamanho mínimo e máximo para uma faixa de grade (linha ou coluna).", "Encontra o valor mínimo e máximo em uma lista.", "Cria um gradiente.", "É usada para animações."],
    "correctAnswer": "Define um tamanho mínimo e máximo para uma faixa de grade (linha ou coluna).",
    "subject": "CSS"
  },
  {
    "id": "css112",
    "descricao": "O que o `grid-auto-rows` define?",
    "alternativas": ["O tamanho das linhas criadas explicitamente.", "O tamanho das linhas criadas implicitamente (quando há mais itens do que células definidas).", "O número de linhas automáticas.", "A cor das linhas."],
    "correctAnswer": "O tamanho das linhas criadas implicitamente (quando há mais itens do que células definidas).",
    "subject": "CSS"
  },
  {
    "id": "css113",
    "descricao": "O que é um 'framework' CSS como Bootstrap ou Tailwind CSS?",
    "alternativas": ["Um pré-processador CSS.", "Uma coleção de estilos e componentes pré-construídos para acelerar o desenvolvimento de interfaces web.", "Um editor de código.", "Uma linguagem de programação."],
    "correctAnswer": "Uma coleção de estilos e componentes pré-construídos para acelerar o desenvolvimento de interfaces web.",
    "subject": "CSS"
  },
  {
    "id": "css114",
    "descricao": "Qual a principal diferença de abordagem entre Bootstrap e Tailwind CSS?",
    "alternativas": ["Bootstrap é mais antigo.", "Bootstrap é baseado em componentes pré-estilizados, enquanto Tailwind é 'utility-first', fornecendo classes de baixo nível para construir designs personalizados.", "Tailwind não é responsivo.", "Bootstrap não usa Flexbox."],
    "correctAnswer": "Bootstrap é baseado em componentes pré-estilizados, enquanto Tailwind é 'utility-first', fornecendo classes de baixo nível para construir designs personalizados.",
    "subject": "CSS"
  },
  {
    "id": "css115",
    "descricao": "O que `display: inline-block;` faz?",
    "alternativas": ["Faz um elemento se comportar como inline, mas com a capacidade de ter largura e altura definidas.", "É o mesmo que `display: block;`.", "É o mesmo que `display: inline;`.", "Oculta o elemento."],
    "correctAnswer": "Faz um elemento se comportar como inline, mas com a capacidade de ter largura e altura definidas.",
    "subject": "CSS"
  },
  {
    "id": "css116",
    "descricao": "O que a pseudo-classe `:root` seleciona?",
    "alternativas": ["O primeiro elemento da página.", "O elemento raiz do documento, que em HTML é sempre `<html>`.", "Todos os elementos raiz.", "A tag `<body>`."],
    "correctAnswer": "O elemento raiz do documento, que em HTML é sempre `<html>`.",
    "subject": "CSS"
  },
  {
    "id": "css117",
    "descricao": "Por que é uma boa prática definir variáveis CSS no seletor `:root`?",
    "alternativas": ["Para que elas sejam aplicadas apenas ao elemento `<html>`.", "Para que elas se tornem globais e acessíveis a todos os elementos da página.", "Não é uma boa prática.", "Para que o JavaScript possa acessá-las mais facilmente."],
    "correctAnswer": "Para que elas se tornem globais e acessíveis a todos os elementos da página.",
    "subject": "CSS"
  },
  {
    "id": "css118",
    "descricao": "Qual o propósito da propriedade `object-fit` para imagens e vídeos?",
    "alternativas": ["Define o formato do arquivo.", "Especifica como o conteúdo de um elemento substituído (como `<img>` ou `<video>`) deve ser redimensionado para se ajustar ao seu contêiner.", "Adiciona um filtro ao objeto.", "Converte o elemento em um objeto 3D."],
    "correctAnswer": "Especifica como o conteúdo de um elemento substituído (como `<img>` ou `<video>`) deve ser redimensionado para se ajustar ao seu contêiner.",
    "subject": "CSS"
  },
  {
    "id": "css119",
    "descricao": "Qual valor de `object-fit` se comporta de maneira semelhante a `background-size: cover`?",
    "alternativas": ["fill", "contain", "cover", "scale-down"],
    "correctAnswer": "cover",
    "subject": "CSS"
  },
  {
    "id": "css120",
    "descricao": "Qual propriedade controla a posição de uma imagem ou vídeo dentro de seu contêiner quando `object-fit` é usado?",
    "alternativas": ["`object-position`", "`background-position`", "`position`", "`align`"],
    "correctAnswer": "`object-position`",
    "subject": "CSS"
  },
  {
    "id": "css121",
    "descricao": "Qual o propósito da propriedade `clip-path`?",
    "alternativas": ["Recortar um elemento para uma forma básica (círculo, polígono, etc.), tornando parte dele invisível.", "Copiar o caminho de um arquivo.", "Adicionar um caminho de navegação.", "Criar um clipe de áudio."],
    "correctAnswer": "Recortar um elemento para uma forma básica (círculo, polígono, etc.), tornando parte dele invisível.",
    "subject": "CSS"
  },
  {
    "id": "css122",
    "descricao": "O que a propriedade `user-select: none;` faz?",
    "alternativas": ["Impede que o usuário selecione qualquer elemento.", "Impede que o texto de um elemento seja selecionado pelo usuário.", "Oculta o elemento do usuário.", "Seleciona todos os usuários."],
    "correctAnswer": "Impede que o texto de um elemento seja selecionado pelo usuário.",
    "subject": "CSS"
  },
  {
    "id": "css123",
    "descricao": "O que `writing-mode: vertical-rl;` faria com um texto?",
    "alternativas": ["Deixaria o texto na vertical, fluindo da direita para a esquerda.", "Deixaria o texto na horizontal.", "Escreveria o texto ao contrário.", "Aumentaria o tamanho do texto."],
    "correctAnswer": "Deixaria o texto na vertical, fluindo da direita para a esquerda.",
    "subject": "CSS"
  },
  {
    "id": "css124",
    "descricao": "O que a propriedade `caret-color` modifica?",
    "alternativas": ["A cor do texto selecionado.", "A cor do cursor de texto (o cursor piscante em campos de entrada).", "A cor do cursor do mouse.", "A cor da borda."],
    "correctAnswer": "A cor do cursor de texto (o cursor piscante em campos de entrada).",
    "subject": "CSS"
  },
  {
    "id": "css125",
    "descricao": "O que a propriedade `scroll-behavior: smooth;` faz?",
    "alternativas": ["Cria uma animação de rolagem suave quando o usuário clica em um link de âncora.", "Aumenta a velocidade de rolagem.", "Oculta a barra de rolagem.", "Trava a rolagem da página."],
    "correctAnswer": "Cria uma animação de rolagem suave quando o usuário clica em um link de âncora.",
    "subject": "CSS"
  },
  {
    "id": "css126",
    "descricao": "O que o seletor `:empty` seleciona?",
    "alternativas": ["Elementos que não têm filhos, incluindo nós de texto.", "Elementos com o atributo `value` vazio.", "Elementos que estão ocultos.", "Elementos sem um ID."],
    "correctAnswer": "Elementos que não têm filhos, incluindo nós de texto.",
    "subject": "CSS"
  },
  {
    "id": "css127",
    "descricao": "O que o seletor `:target` seleciona?",
    "alternativas": ["O elemento que é o alvo de um evento de clique.", "O elemento cujo `id` corresponde ao fragmento de identificador da URL atual (o que vem depois do '#').", "O elemento `<a>` que está sendo clicado.", "O primeiro elemento da página."],
    "correctAnswer": "O elemento cujo `id` corresponde ao fragmento de identificador da URL atual (o que vem depois do '#').",
    "subject": "CSS"
  },
  {
    "id": "css128",
    "descricao": "Qual propriedade CSS é usada para criar colunas de texto, como em um jornal?",
    "alternativas": ["`columns`", "`text-columns`", "`layout`", "`grid`"],
    "correctAnswer": "`columns`",
    "subject": "CSS"
  },
  {
    "id": "css129",
    "descricao": "O que a propriedade `column-count` define?",
    "alternativas": ["A largura das colunas.", "O número de colunas em que o conteúdo de um elemento deve ser dividido.", "O espaçamento entre as colunas.", "A cor da linha entre as colunas."],
    "correctAnswer": "O número de colunas em que o conteúdo de um elemento deve ser dividido.",
    "subject": "CSS"
  },
  {
    "id": "css130",
    "descricao": "O que a propriedade `column-gap` define?",
    "alternativas": ["O número de colunas.", "A largura das colunas.", "O espaçamento entre as colunas.", "A cor da borda das colunas."],
    "correctAnswer": "O espaçamento entre as colunas.",
    "subject": "CSS"
  },
  {
    "id": "css131",
    "descricao": "Qual propriedade de animação define a duração de um ciclo de animação?",
    "alternativas": ["`animation-name`", "`animation-duration`", "`animation-timing-function`", "`animation-delay`"],
    "correctAnswer": "`animation-duration`",
    "subject": "CSS"
  },
  {
    "id": "css132",
    "descricao": "Qual propriedade de animação define um atraso antes do início da animação?",
    "alternativas": ["`animation-duration`", "`animation-delay`", "`animation-iteration-count`", "`animation-fill-mode`"],
    "correctAnswer": "`animation-delay`",
    "subject": "CSS"
  },
  {
    "id": "css133",
    "descricao": "O que `animation-iteration-count: infinite;` faz?",
    "alternativas": ["Executa a animação apenas uma vez.", "Executa a animação por um tempo infinito.", "Repete a animação infinitamente.", "Pausa a animação."],
    "correctAnswer": "Repete a animação infinitamente.",
    "subject": "CSS"
  },
  {
    "id": "css134",
    "descricao": "Qual propriedade de animação define a curva de velocidade da animação (ex: `ease-in`, `linear`)?",
    "alternativas": ["`animation-curve`", "`animation-speed`", "`animation-timing-function`", "`animation-behavior`"],
    "correctAnswer": "`animation-timing-function`",
    "subject": "CSS"
  },
  {
    "id": "css135",
    "descricao": "Qual propriedade de animação especifica o nome da regra `@keyframes` a ser usada?",
    "alternativas": ["`animation-rule`", "`animation-name`", "`animation-keyframes`", "`animation-target`"],
    "correctAnswer": "`animation-name`",
    "subject": "CSS"
  },
  {
    "id": "css136",
    "descricao": "O que o pseudo-elemento `::placeholder` permite estilizar?",
    "alternativas": ["O texto de um elemento `<p>`.", "O texto de espaço reservado (placeholder) em um campo de formulário.", "Um contêiner vazio.", "O cursor do mouse."],
    "correctAnswer": "O texto de espaço reservado (placeholder) em um campo de formulário.",
    "subject": "CSS"
  },
  {
    "id": "css137",
    "descricao": "O que o pseudo-elemento `::selection` permite estilizar?",
    "alternativas": ["A seleção de um `<select>`.", "A porção de um documento que foi destacada (selecionada) pelo usuário.", "Um elemento selecionado por JavaScript.", "A borda de um elemento focado."],
    "correctAnswer": "A porção de um documento que foi destacada (selecionada) pelo usuário.",
    "subject": "CSS"
  },
  {
    "id": "css138",
    "descricao": "Qual o propósito da propriedade `pointer-events`?",
    "alternativas": ["Definir o estilo do ponteiro do mouse.", "Controlar sob quais circunstâncias um elemento pode se tornar o alvo de eventos de ponteiro (mouse).", "Adicionar eventos de clique a um elemento.", "Animar o ponteiro."],
    "correctAnswer": "Controlar sob quais circunstâncias um elemento pode se tornar o alvo de eventos de ponteiro (mouse).",
    "subject": "CSS"
  },
  {
    "id": "css139",
    "descricao": "O que `pointer-events: none;` faz?",
    "alternativas": ["Oculta o cursor do mouse.", "Faz com que o elemento nunca seja o alvo de eventos do mouse; os eventos 'passam através' dele para o que estiver abaixo.", "Desabilita o mouse na página.", "Aplica um estilo de 'não permitido' ao cursor."],
    "correctAnswer": "Faz com que o elemento nunca seja o alvo de eventos do mouse; os eventos 'passam através' dele para o que estiver abaixo.",
    "subject": "CSS"
  },
  {
    "id": "css140",
    "descricao": "O que a propriedade `text-align-last` faz?",
    "alternativas": ["Alinha todo o texto de um parágrafo.", "Descreve como a última linha de um bloco ou uma linha antes de uma quebra de linha forçada é alinhada.", "Alinha o último parágrafo de uma div.", "Define o alinhamento do último caractere."],
    "correctAnswer": "Descreve como a última linha de um bloco ou uma linha antes de uma quebra de linha forçada é alinhada.",
    "subject": "CSS"
  },
  {
    "id": "css141",
    "descricao": "O que a propriedade `word-break` controla?",
    "alternativas": ["O espaçamento entre as palavras.", "Como as palavras devem ser quebradas quando o texto transborda o contêiner.", "A hifenização das palavras.", "Remove palavras de um texto."],
    "correctAnswer": "Como as palavras devem ser quebradas quando o texto transborda o contêiner.",
    "subject": "CSS"
  },
  {
    "id": "css142",
    "descricao": "O que o valor `currentColor` representa?",
    "alternativas": ["A cor preta.", "A cor vermelha, que é a cor atual.", "Uma palavra-chave que se refere ao valor da propriedade `color` de um elemento.", "Uma variável CSS para a cor atual."],
    "correctAnswer": "Uma palavra-chave que se refere ao valor da propriedade `color` de um elemento.",
    "subject": "CSS"
  },
  {
    "id": "css143",
    "descricao": "Para quais propriedades `currentColor` é útil?",
    "alternativas": ["Apenas `background-color`.", "Apenas `color`.", "Para propriedades como `border-color`, `box-shadow` e `fill` (em SVG), para que elas herdem a cor do texto.", "Não é útil na prática."],
    "correctAnswer": "Para propriedades como `border-color`, `box-shadow` e `fill` (em SVG), para que elas herdem a cor do texto.",
    "subject": "CSS"
  },
  {
    "id": "css144",
    "descricao": "Qual propriedade define como o conteúdo de um elemento (`<img>` ou `<iframe>`) deve ser carregado?",
    "alternativas": ["`load`", "`async`", "`fetch`", "`loading`"],
    "correctAnswer": "`loading`",
    "subject": "CSS"
  },
  {
    "id": "css145",
    "descricao": "O que `loading='lazy'` faz?",
    "alternativas": ["Carrega o recurso imediatamente.", "Adia o carregamento de recursos fora da tela até que o usuário role perto deles.", "Carrega o recurso de forma lenta para economizar dados.", "Impede o carregamento do recurso."],
    "correctAnswer": "Adia o carregamento de recursos fora da tela até que o usuário role perto deles.",
    "subject": "CSS"
  },
  {
    "id": "css146",
    "descricao": "O que é um 'reset' CSS?",
    "alternativas": ["Um botão para resetar os estilos da página.", "Uma coleção de regras CSS para remover ou padronizar os estilos padrão do navegador.", "Uma função para limpar o cache.", "Um framework CSS."],
    "correctAnswer": "Uma coleção de regras CSS para remover ou padronizar os estilos padrão do navegador.",
    "subject": "CSS"
  },
  {
    "id": "css147",
    "descricao": "Qual a diferença entre um 'Reset' e um 'Normalize' CSS?",
    "alternativas": ["São a mesma coisa.", "Reset remove todos os estilos padrão, enquanto Normalize visa tornar os estilos padrão consistentes entre os navegadores.", "Normalize é mais agressivo que Reset.", "Reset é para fontes, Normalize é para layout."],
    "correctAnswer": "Reset remove todos os estilos padrão, enquanto Normalize visa tornar os estilos padrão consistentes entre os navegadores.",
    "subject": "CSS"
  },
  {
    "id": "css148",
    "descricao": "Qual o propósito da metodologia BEM (Block, Element, Modifier)?",
    "alternativas": ["Uma forma de nomear classes CSS para criar componentes reutilizáveis e evitar conflitos de estilo.", "Uma biblioteca JavaScript.", "Uma convenção para nomear arquivos CSS.", "Uma técnica de animação."],
    "correctAnswer": "Uma forma de nomear classes CSS para criar componentes reutilizáveis e evitar conflitos de estilo.",
    "subject": "CSS"
  },
  {
    "id": "css149",
    "descricao": "Em BEM, como seria uma classe para um modificador de 'ativo' em um botão (`block: button`)?",
    "alternativas": ["`button-active`", "`active-button`", "`button--active`", "`button.active`"],
    "correctAnswer": "`button--active`",
    "subject": "CSS"
  },
  {
    "id": "css150",
    "descricao": "Em BEM, como seria uma classe para um elemento 'ícone' dentro de um botão (`block: button`)?",
    "alternativas": ["`button-icon`", "`button > icon`", "`button__icon`", "`icon`"],
    "correctAnswer": "`button__icon`",
    "subject": "CSS"
  },
  {
    "id": "css151",
    "descricao": "Qual propriedade de fundo anexa uma imagem de fundo em relação à viewport, fazendo-a parecer fixa durante a rolagem?",
    "alternativas": ["`background-position`", "`background-origin`", "`background-attachment: fixed;`", "`background-clip`"],
    "correctAnswer": "`background-attachment: fixed;`",
    "subject": "CSS"
  },
  {
    "id": "css152",
    "descricao": "O que a propriedade `font-variant: small-caps;` faz?",
    "alternativas": ["Transforma todo o texto em maiúsculas.", "Transforma letras minúsculas em maiúsculas de tamanho menor.", "Deixa a fonte menor.", "Capitaliza a primeira letra."],
    "correctAnswer": "Transforma letras minúsculas em maiúsculas de tamanho menor.",
    "subject": "CSS"
  },
  {
    "id": "css153",
    "descricao": "Qual propriedade pode ser usada para aplicar hifenização automática ao texto?",
    "alternativas": ["`word-break`", "`text-wrap`", "`hyphens`", "`line-break`"],
    "correctAnswer": "`hyphens`",
    "subject": "CSS"
  },
  {
    "id": "css154",
    "descricao": "Qual seletor seleciona elementos `<input>` cujo valor de `type` é 'text'?",
    "alternativas": ["`input[type=text]`", "`input.text`", "`input:text`", "`input#text`"],
    "correctAnswer": "`input[type=text]`",
    "subject": "CSS"
  },
  {
    "id": "css155",
    "descricao": "Qual seletor de atributo seleciona elementos `<a>` cujo `href` começa com 'https'? ",
    "alternativas": ["`a[href|='https']`", "`a[href^='https']`", "`a[href*='https']`", "`a[href$='https']`"],
    "correctAnswer": "`a[href^='https']`",
    "subject": "CSS"
  },
  {
    "id": "css156",
    "descricao": "Qual seletor de atributo seleciona elementos `<a>` cujo `href` termina com '.pdf'?",
    "alternativas": ["`a[href^='.pdf']`", "`a[href*='.pdf']`", "`a[href$='.pdf']`", "`a[href~='.pdf']`"],
    "correctAnswer": "`a[href$='.pdf']`",
    "subject": "CSS"
  },
  {
    "id": "css157",
    "descricao": "Qual seletor de atributo seleciona elementos `<a>` cujo `href` contém a substring 'example'?",
    "alternativas": ["`a[href$='example']`", "`a[href^='example']`", "`a[href~='example']`", "`a[href*='example']`"],
    "correctAnswer": "`a[href*='example']`",
    "subject": "CSS"
  },
  {
    "id": "css158",
    "descricao": "Qual a finalidade da propriedade `perspective`?",
    "alternativas": ["Dar a elementos 3D uma perspectiva, afetando como eles são vistos em relação ao espectador.", "Mudar a cor de fundo.", "Aumentar a opacidade.", "Aplicar um filtro de perspectiva."],
    "correctAnswer": "Dar a elementos 3D uma perspectiva, afetando como eles são vistos em relação ao espectador.",
    "subject": "CSS"
  },
  {
    "id": "css159",
    "descricao": "O que a propriedade `transform-style: preserve-3d;` faz?",
    "alternativas": ["Converte um elemento 2D em 3D.", "Indica que os filhos de um elemento devem ser posicionados no mesmo espaço 3D do elemento, e não achatados em seu plano.", "Aplica um estilo 3D.", "Preserva a animação 3D."],
    "correctAnswer": "Indica que os filhos de um elemento devem ser posicionados no mesmo espaço 3D do elemento, e não achatados em seu plano.",
    "subject": "CSS"
  },
  {
    "id": "css160",
    "descricao": "O que a propriedade `backface-visibility: hidden;` faz?",
    "alternativas": ["Oculta a face frontal de um elemento.", "Define que a face de trás de um elemento não deve ser visível quando ele está virado para o espectador.", "Remove a cor de fundo.", "Desabilita a visibilidade do elemento."],
    "correctAnswer": "Define que a face de trás de um elemento não deve ser visível quando ele está virado para o espectador.",
    "subject": "CSS"
  },
  {
    "id": "css161",
    "descricao": "Qual a ordem correta para as pseudo-classes de link para evitar problemas de especificidade? (LVHA)",
    "alternativas": ["`:link`, `:visited`, `:hover`, `:active`", "`:hover`, `:active`, `:link`, `:visited`", "`:visited`, `:link`, `:active`, `:hover`", "A ordem não importa."],
    "correctAnswer": "`:link`, `:visited`, `:hover`, `:active`",
    "subject": "CSS"
  },
  {
    "id": "css162",
    "descricao": "Qual propriedade define como um elemento se ajusta a um contêiner grid ou flex, caso não haja espaço suficiente?",
    "alternativas": ["`flex-grow`", "`flex-shrink`", "`flex-basis`", "`overflow`"],
    "correctAnswer": "`flex-shrink`",
    "subject": "CSS"
  },
  {
    "id": "css163",
    "descricao": "Qual propriedade define a capacidade de um item flexível crescer para preencher o espaço disponível?",
    "alternativas": ["`flex-grow`", "`flex-shrink`", "`flex-basis`", "`width`"],
    "correctAnswer": "`flex-grow`",
    "subject": "CSS"
  },
  {
    "id": "css164",
    "descricao": "Qual propriedade do Grid permite nomear as linhas e colunas para um posicionamento mais semântico?",
    "alternativas": ["`grid-template-areas`", "`grid-naming`", "`grid-layout`", "`grid-template`"],
    "correctAnswer": "`grid-template-areas`",
    "subject": "CSS"
  },
  {
    "id": "css165",
    "descricao": "Qual a diferença entre `rgb(0,0,0)` e `#000000`?",
    "alternativas": ["A primeira é para cor de fundo, a segunda para cor de texto.", "A segunda é mais performática.", "São apenas duas notações diferentes para representar a mesma cor (preto).", "A primeira inclui transparência."],
    "correctAnswer": "São apenas duas notações diferentes para representar a mesma cor (preto).",
    "subject": "CSS"
  },
  {
    "id": "css166",
    "descricao": "O que a pseudo-classe `:first-of-type` seleciona?",
    "alternativas": ["O primeiro filho de qualquer tipo.", "O primeiro elemento de um tipo específico dentro de seu contêiner pai.", "O primeiro elemento da página.", "O primeiro elemento com uma classe."],
    "correctAnswer": "O primeiro elemento de um tipo específico dentro de seu contêiner pai.",
    "subject": "CSS"
  },
  {
    "id": "css167",
    "descricao": "O que a pseudo-classe `:last-of-type` seleciona?",
    "alternativas": ["O último elemento de qualquer tipo.", "O último elemento de um tipo específico dentro de seu contêiner pai.", "O último elemento da página.", "O elemento com o maior `z-index`."],
    "correctAnswer": "O último elemento de um tipo específico dentro de seu contêiner pai.",
    "subject": "CSS"
  },
  {
    "id": "css168",
    "descricao": "Qual propriedade é usada para controlar a aparência de marcadores em itens de lista?",
    "alternativas": ["`list-style-type`", "`marker-style`", "`list-marker`", "`list-decoration`"],
    "correctAnswer": "`list-style-type`",
    "subject": "CSS"
  },
  {
    "id": "css169",
    "descricao": "Qual valor de `list-style-type` remove os marcadores de uma lista?",
    "alternativas": ["`hidden`", "`remove`", "`none`", "`blank`"],
    "correctAnswer": "`none`",
    "subject": "CSS"
  },
  {
    "id": "css170",
    "descricao": "O que a propriedade `content` usada com pseudo-elementos pode conter?",
    "alternativas": ["Apenas strings de texto.", "Strings, imagens (`url()`), contadores e mais.", "Apenas contadores.", "Apenas URLs."],
    "correctAnswer": "Strings, imagens (`url()`), contadores e mais.",
    "subject": "CSS"
  },
  {
    "id": "css171",
    "descricao": "Qual propriedade controla o estilo do contorno da tabela (ex: se as bordas das células são colapsadas em uma única borda)?",
    "alternativas": ["`table-style`", "`border-collapse`", "`border-spacing`", "`table-border`"],
    "correctAnswer": "`border-collapse`",
    "subject": "CSS"
  },
  {
    "id": "css172",
    "descricao": "O que `border-collapse: collapse;` faz?",
    "alternativas": ["Oculta as bordas da tabela.", "Faz com que as bordas adjacentes das células sejam combinadas em uma única borda.", "Aumenta o espaçamento das bordas.", "Adiciona uma borda dupla."],
    "correctAnswer": "Faz com que as bordas adjacentes das células sejam combinadas em uma única borda.",
    "subject": "CSS"
  },
  {
    "id": "css173",
    "descricao": "O que `display: contents;` faz?",
    "alternativas": ["Exibe o conteúdo do elemento.", "Faz com que o contêiner do elemento desapareça, mas seus elementos filhos apareçam normalmente no layout.", "Oculta o elemento.", "Centraliza o conteúdo."],
    "correctAnswer": "Faz com que o contêiner do elemento desapareça, mas seus elementos filhos apareçam normalmente no layout.",
    "subject": "CSS"
  },
  {
    "id": "css174",
    "descricao": "Qual propriedade define se o texto pode ser quebrado entre as letras para evitar o transbordamento?",
    "alternativas": ["`text-wrap`", "`letter-break`", "`word-wrap` (obsoleto)", "`overflow-wrap`"],
    "correctAnswer": "`overflow-wrap`",
    "subject": "CSS"
  },
  {
    "id": "css175",
    "descricao": "O que a função `attr()` faz em CSS?",
    "alternativas": ["Define um atributo HTML.", "Permite usar o valor de um atributo de um elemento como um valor CSS (principalmente com a propriedade `content`).", "Remove um atributo.", "Seleciona um atributo."],
    "correctAnswer": "Permite usar o valor de um atributo de um elemento como um valor CSS (principalmente com a propriedade `content`).",
    "subject": "CSS"
  },
  {
    "id": "css176",
    "descricao": "Qual propriedade de fundo controla a área de pintura do fundo (ex: se ele se estende sob a borda)?",
    "alternativas": ["`background-origin`", "`background-clip`", "`background-position`", "`background-size`"],
    "correctAnswer": "`background-clip`",
    "subject": "CSS"
  },
  {
    "id": "css177",
    "descricao": "O que a propriedade `mix-blend-mode` faz?",
    "alternativas": ["Mistura as cores do texto.", "Define como o conteúdo de um elemento deve se misturar com o conteúdo do elemento pai abaixo dele.", "Cria um gradiente.", "Aplica um filtro de cor."],
    "correctAnswer": "Define como o conteúdo de um elemento deve se misturar com o conteúdo do elemento pai abaixo dele.",
    "subject": "CSS"
  },
  {
    "id": "css178",
    "descricao": "Qual propriedade é usada para hifenizar palavras em um texto?",
    "alternativas": ["`text-hyphenate`", "`word-wrap`", "`hyphens`", "`text-break`"],
    "correctAnswer": "`hyphens`",
    "subject": "CSS"
  },
  {
    "id": "css179",
    "descricao": "O que a propriedade `shape-outside` permite fazer?",
    "alternativas": ["Mudar a forma de um elemento.", "Fazer com que o conteúdo em linha flua ao redor de uma forma definida (ex: círculo, polígono) em vez de uma caixa retangular.", "Criar uma sombra com uma forma personalizada.", "Definir a forma do cursor."],
    "correctAnswer": "Fazer com que o conteúdo em linha flua ao redor de uma forma definida (ex: círculo, polígono) em vez de uma caixa retangular.",
    "subject": "CSS"
  },
  {
    "id": "css180",
    "descricao": "Como se define uma variável CSS que é local para um seletor específico?",
    "alternativas": ["Declarando-a dentro do seletor `:root`.", "Declarando-a diretamente dentro do seletor onde será usada.", "Usando a regra `@local`.", "Não é possível."],
    "correctAnswer": "Declarando-a diretamente dentro do seletor onde será usada.",
    "subject": "CSS"
  },
  {
    "id": "css181",
    "descricao": "Qual a principal diferença entre `em` e `rem` para dimensionamento de fontes?",
    "alternativas": ["`em` é sempre maior que `rem`.", "`em` é relativo ao elemento pai, o que pode causar aninhamento complexo, enquanto `rem` é sempre relativo ao elemento raiz (`html`), tornando-o mais previsível.", "`rem` não é bem suportado.", "Não há diferença."],
    "correctAnswer": "`em` é relativo ao elemento pai, o que pode causar aninhamento complexo, enquanto `rem` é sempre relativo ao elemento raiz (`html`), tornando-o mais previsível.",
    "subject": "CSS"
  },
  {
    "id": "css182",
    "descricao": "O que a propriedade `will-change` faz?",
    "alternativas": ["Impede que uma propriedade mude.", "Fornece uma dica ao navegador sobre quais propriedades de um elemento devem mudar, permitindo otimizações de desempenho.", "Muda uma propriedade no futuro.", "Define a velocidade da mudança."],
    "correctAnswer": "Fornece uma dica ao navegador sobre quais propriedades de um elemento devem mudar, permitindo otimizações de desempenho.",
    "subject": "CSS"
  },
  {
    "id": "css183",
    "descricao": "Qual o propósito do `display: grid` com `grid-template-areas`?",
    "alternativas": ["Criar áreas de desenho no grid.", "Permitir nomear áreas do grid e posicionar itens nelas de forma visual e semântica.", "Definir o tamanho das áreas.", "Calcular a área do grid."],
    "correctAnswer": "Permitir nomear áreas do grid e posicionar itens nelas de forma visual e semântica.",
    "subject": "CSS"
  },
  {
    "id": "css184",
    "descricao": "O que o seletor `[lang|='en']` seleciona?",
    "alternativas": ["Elementos com o atributo `lang` exatamente igual a 'en'.", "Elementos com o atributo `lang` começando com 'en' (ex: 'en', 'en-US', 'en-GB').", "Elementos com o atributo `lang` contendo 'en'.", "Elementos com o atributo `lang` terminando com 'en'."],
    "correctAnswer": "Elementos com o atributo `lang` começando com 'en' (ex: 'en', 'en-US', 'en-GB').",
    "subject": "CSS"
  },
  {
    "id": "css185",
    "descricao": "O que a propriedade `font-kerning` controla?",
    "alternativas": ["O espaçamento entre todas as letras.", "O ajuste do espaçamento entre pares específicos de caracteres para uma melhor legibilidade.", "A altura da fonte.", "O estilo da fonte."],
    "correctAnswer": "O ajuste do espaçamento entre pares específicos de caracteres para uma melhor legibilidade.",
    "subject": "CSS"
  },
  {
    "id": "css186",
    "descricao": "Qual propriedade define a cor da linha desenhada por `text-decoration`?",
    "alternativas": ["`text-decoration-style`", "`text-decoration-color`", "`color`", "`line-color`"],
    "correctAnswer": "`text-decoration-color`",
    "subject": "CSS"
  },
  {
    "id": "css187",
    "descricao": "Qual propriedade define o estilo da linha de `text-decoration` (ex: `solid`, `wavy`, `dotted`)?",
    "alternativas": ["`text-decoration-line`", "`text-decoration-style`", "`line-style`", "`border-style`"],
    "correctAnswer": "`text-decoration-style`",
    "subject": "CSS"
  },
  {
    "id": "css188",
    "descricao": "Qual propriedade CSS é usada para criar um efeito de máscara, revelando partes de um elemento?",
    "alternativas": ["`filter`", "`clip-path`", "`mask-image`", "`opacity`"],
    "correctAnswer": "`mask-image`",
    "subject": "CSS"
  },
  {
    "id": "css189",
    "descricao": "O que a propriedade `aspect-ratio` permite fazer?",
    "alternativas": ["Definir a proporção (relação largura/altura) de uma caixa, permitindo que a altura se ajuste automaticamente à largura e vice-versa.", "Mudar a resolução da tela.", "Alterar a proporção de uma imagem.", "Calcular a proporção de cores."],
    "correctAnswer": "Definir a proporção (relação largura/altura) de uma caixa, permitindo que a altura se ajuste automaticamente à largura e vice-versa.",
    "subject": "CSS"
  },
  {
    "id": "css190",
    "descricao": "O que a propriedade `text-orientation` faz?",
    "alternativas": ["Gira o texto.", "Define a orientação dos caracteres em uma linha quando o modo de escrita é vertical.", "Alinha o texto.", "Define o espaçamento do texto."],
    "correctAnswer": "Define a orientação dos caracteres em uma linha quando o modo de escrita é vertical.",
    "subject": "CSS"
  },
  {
    "id": "css191",
    "descricao": "O que o seletor `:is()` (também conhecido como `:matches()` ou `:any()`) faz?",
    "alternativas": ["Verifica se um elemento existe.", "Seleciona qualquer elemento em uma lista de seletores, simplificando seletores longos.", "É um seletor de identidade.", "Compara dois elementos."],
    "correctAnswer": "Seleciona qualquer elemento em uma lista de seletores, simplificando seletores longos.",
    "subject": "CSS"
  },
  {
    "id": "css192",
    "descricao": "O que o seletor `:where()` faz, e qual sua principal diferença para `:is()`?",
    "alternativas": ["São idênticos.", "`:where()` tem sempre especificidade zero, enquanto `:is()` assume a especificidade do seletor mais específico em sua lista.", "`:where()` é para localização, `:is()` é para identidade.", "`:where()` não é um seletor válido."],
    "correctAnswer": "`:where()` tem sempre especificidade zero, enquanto `:is()` assume a especificidade do seletor mais específico em sua lista.",
    "subject": "CSS"
  },
  {
    "id": "css193",
    "descricao": "Qual o propósito da propriedade `gap` no Flexbox e no Grid?",
    "alternativas": ["Definir o espaçamento entre os itens da grade ou flexíveis.", "Preencher um espaço vazio.", "Criar um buraco no layout.", "Definir a margem do contêiner."],
    "correctAnswer": "Definir o espaçamento entre os itens da grade ou flexíveis.",
    "subject": "CSS"
  },
  {
    "id": "css194",
    "descricao": "O que são 'Logical Properties' em CSS (ex: `margin-inline-start`)?",
    "alternativas": ["Propriedades que usam lógica booleana.", "Propriedades que se referem à direção do fluxo do texto (início/fim, bloco/linha) em vez de direções físicas (esquerda/direita, topo/fundo), facilitando a internacionalização.", "Propriedades que só funcionam com JavaScript.", "Propriedades para lógica de programação."],
    "correctAnswer": "Propriedades que se referem à direção do fluxo do texto (início/fim, bloco/linha) em vez de direções físicas (esquerda/direita, topo/fundo), facilitando a internacionalização.",
    "subject": "CSS"
  },
  {
    "id": "css195",
    "descricao": "Em um idioma da esquerda para a direita como o português, a qual propriedade física `padding-inline-start` corresponde?",
    "alternativas": ["`padding-top`", "`padding-bottom`", "`padding-right`", "`padding-left`"],
    "correctAnswer": "`padding-left`",
    "subject": "CSS"
  },
  {
    "id": "css196",
    "descricao": "O que a função `clamp(MIN, VAL, MAX)` faz?",
    "alternativas": ["Escolhe um valor aleatório entre MIN e MAX.", "Fixa ('prende') um valor entre um limite inferior (MIN) e um superior (MAX).", "Calcula a média entre MIN e MAX.", "É usada para criar grampos de layout."],
    "correctAnswer": "Fixa ('prende') um valor entre um limite inferior (MIN) e um superior (MAX).",
    "subject": "CSS"
  },
  {
    "id": "css197",
    "descricao": "Qual o propósito do `backdrop-filter`?",
    "alternativas": ["Aplicar efeitos gráficos como desfoque ou mudança de cor à área atrás de um elemento.", "Filtrar a imagem de fundo.", "Definir a cor de fundo.", "Mudar o filtro do navegador."],
    "correctAnswer": "Aplicar efeitos gráficos como desfoque ou mudança de cor à área atrás de um elemento.",
    "subject": "CSS"
  },
  {
    "id": "css198",
    "descricao": "Qual propriedade controla o modo como o navegador renderiza fontes para otimizar a legibilidade e o desempenho?",
    "alternativas": ["`text-rendering`", "`font-display`", "`font-smoothing`", "`font-synthesis`"],
    "correctAnswer": "`font-smoothing`",
    "subject": "CSS"
  },
  {
    "id": "css199",
    "descricao": "O que o `@supports` (Feature Queries) permite fazer?",
    "alternativas": ["Verificar se o usuário suporta o site.", "Aplicar um bloco de CSS condicionalmente, apenas se o navegador suportar um par de propriedade:valor específico.", "Importar um CSS de suporte.", "Oferecer suporte técnico via CSS."],
    "correctAnswer": "Aplicar um bloco de CSS condicionalmente, apenas se o navegador suportar um par de propriedade:valor específico.",
    "subject": "CSS"
  },
  {
    "id": "css200",
    "descricao": "O que o seletor `a:not([href])` seleciona?",
    "alternativas": ["Todos os links `<a>`.", "Elementos `<a>` que não possuem o atributo `href`.", "Elementos que não são links.", "Links `<a>` com `href` vazio."],
    "correctAnswer": "Elementos `<a>` que não possuem o atributo `href`.",
    "subject": "CSS"
  }
]

module.exports = { cssQuestions };
