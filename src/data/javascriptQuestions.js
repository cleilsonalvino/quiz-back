// data/javascriptQuestions.js

const javascriptQuestions = [
  {
    "id": "js1",
    "descricao": "Qual palavra-chave é usada para declarar uma variável que pode ser reatribuída no JavaScript?",
    "alternativas": ["const", "let", "var", "Não há diferença"],
    "correctAnswer": "let",
    "subject": "JavaScript"
  },
  {
    "id": "js2",
    "descricao": "Qual método JavaScript é usado para imprimir algo no console do navegador?",
    "alternativas": ["console.log()", "print()", "log.console()", "display()"],
    "correctAnswer": "console.log()",
    "subject": "JavaScript"
  },
  // Adicione mais perguntas de JavaScript aqui
  {
    "id": "js3",
    "descricao": "Qual é a saída do código `typeof null` em JavaScript?",
    "alternativas": ['"object"', '"null"', '"undefined"', '"number"'],
    "correctAnswer": '"object"',
    "subject": "JavaScript"
  },
  {
    "id": "js4",
    "descricao": "Qual operador é usado para estritamente igual (valor e tipo) em JavaScript?",
    "alternativas": ["==", "===", "!=", "!=="],
    "correctAnswer": "===",
    "subject": "JavaScript"
  },
  {
    "id": "js5",
    "descricao": "O que o método `querySelector()` retorna?",
    "alternativas": ["Uma lista de todos os elementos correspondentes", "O primeiro elemento correspondente", "O último elemento correspondente", "Nenhum elemento"],
    "correctAnswer": "O primeiro elemento correspondente",
    "subject": "JavaScript"
  },
    {
        "id": "js6",
        "descricao": "Qual é a função do método `addEventListener()`?",
        "alternativas": [
        "Adicionar um evento ao DOM",
        "Remover um evento do DOM",
        "Adicionar um ouvinte de evento a um elemento",
        "Remover todos os ouvintes de eventos"
        ],
        "correctAnswer": "Adicionar um ouvinte de evento a um elemento",
        "subject": "JavaScript"
    },
    {
        "id": "js7",
        "descricao": "Qual é o resultado da expressão `5 + '5'` em JavaScript?",
        "alternativas": ["10", "'55'", "'5'", "'5' + 5"],
        "correctAnswer": "'55'",
        "subject": "JavaScript"
    },
    {
        "id": "js8",
        "descricao": "Como você define uma função anônima em JavaScript?",
        "alternativas": [
        "() => { }",
        "function() { }",
        "(function() { })",
        "() { }"
        ],
        "correctAnswer": "() => { }",
        "subject": "JavaScript"
    },
    {
        "id": "js9",
        "descricao": "Qual é a diferença entre `==` e `===` em JavaScript?",
        "alternativas": [
            "`==` compara apenas valores",
            "`===` compara valores e tipos",
            "Não há diferença",
            "Ambos são iguais"
        ],
        "correctAnswer": "`===` compara valores e tipos",
        "subject": "JavaScript"
    },
    {
    "id": "js10",
    "descricao": "Qual método é usado para converter uma string JavaScript em um número inteiro?",
    "alternativas": ["parseInt()", "toFloat()", "toFixed()", "toString()"],
    "correctAnswer": "parseInt()",
    "subject": "JavaScript"
  },
  {
    "id": "js11",
    "descricao": "Qual das opções a seguir é um tipo de dado primitivo em JavaScript?",
    "alternativas": ["Object", "Array", "Boolean", "Function"],
    "correctAnswer": "Boolean",
    "subject": "JavaScript"
  },
  {
    "id": "js12",
    "descricao": "Como você escreve um comentário de linha única em JavaScript?",
    "alternativas": ["// Comentário", "/* Comentário */", "", "# Comentário"],
    "correctAnswer": "// Comentário",
    "subject": "JavaScript"
  },
  {
    "id": "js13",
    "descricao": "Qual é a finalidade do método `JSON.parse()`?",
    "alternativas": [
      "Converter um objeto JavaScript em uma string JSON",
      "Converter uma string JSON em um objeto JavaScript",
      "Validar uma string JSON",
      "Formatar uma string JSON"
    ],
    "correctAnswer": "Converter uma string JSON em um objeto JavaScript",
    "subject": "JavaScript"
  },
  {
    "id": "js14",
    "descricao": "Qual evento ocorre quando o usuário clica em um elemento HTML?",
    "alternativas": ["onmouseover", "onchange", "onclick", "onload"],
    "correctAnswer": "onclick",
    "subject": "JavaScript"
  },
  {
    "id": "js15",
    "descricao": "Qual das seguintes opções NÃO é um loop em JavaScript?",
    "alternativas": ["for loop", "while loop", "do...while loop", "until loop"],
    "correctAnswer": "until loop",
    "subject": "JavaScript"
  },
  {
    "id": "js16",
    "descricao": "Como você acessa o primeiro elemento de um array chamado `myArray`?",
    "alternativas": ["myArray[0]", "myArray.first()", "myArray(0)", "myArray.1"],
    "correctAnswer": "myArray[0]",
    "subject": "JavaScript"
  },
  {
    "id": "js17",
    "descricao": "O que o método `push()` faz em um array?",
    "alternativas": [
      "Remove o último elemento",
      "Adiciona um elemento ao início",
      "Adiciona um elemento ao final",
      "Remove o primeiro elemento"
    ],
    "correctAnswer": "Adiciona um elemento ao final",
    "subject": "JavaScript"
  },
  {
    "id": "js18",
    "descricao": "Qual palavra-chave é usada para sair de um loop em JavaScript?",
    "alternativas": ["exit", "stop", "break", "continue"],
    "correctAnswer": "break",
    "subject": "JavaScript"
  },
  {
    "id": "js19",
    "descricao": "Qual é o valor de `this` dentro de uma função regular em JavaScript?",
    "alternativas": [
      "O objeto global (window no navegador, global no Node.js)",
      "O objeto ao qual a função pertence",
      "undefined",
      "O objeto que chamou a função"
    ],
    "correctAnswer": "O objeto que chamou a função",
    "subject": "JavaScript"
  },
  {
    "id": "js20",
    "descricao": "Qual é o nome do mecanismo que permite que funções em JavaScript lembrem-se de seu ambiente léxico (escopo) mesmo depois que a função externa terminou de executar?",
    "alternativas": ["Prototypes", "Callbacks", "Closures", "Promises"],
    "correctAnswer": "Closures",
    "subject": "JavaScript"
  },
  {
    "id": "js21",
    "descricao": "Qual método de array é usado para executar uma função em cada elemento do array e retornar um novo array com os resultados?",
    "alternativas": ["forEach()", "filter()", "map()", "reduce()"],
    "correctAnswer": "map()",
    "subject": "JavaScript"
  },
  {
    "id": "js22",
    "descricao": "O que o operador `spread (...)` faz em JavaScript?",
    "alternativas": [
      "Combina dois arrays em um",
      "Copia propriedades de um objeto para outro",
      "Expande um iterável (como um array) em elementos individuais",
      "Todas as alternativas anteriores"
    ],
    "correctAnswer": "Expande um iterável (como um array) em elementos individuais",
    "subject": "JavaScript"
  },
  {
    "id": "js23",
    "descricao": "Qual é a maneira correta de declarar uma constante em JavaScript?",
    "alternativas": ["var myConst = 10;", "let myConst = 10;", "const myConst = 10;", "constant myConst = 10;"],
    "correctAnswer": "const myConst = 10;",
    "subject": "JavaScript"
  },
  {
    "id": "js24",
    "descricao": "O que o método `setTimeout()` faz?",
    "alternativas": [
      "Executa uma função repetidamente a cada N milissegundos",
      "Executa uma função uma única vez após N milissegundos",
      "Interrompe a execução de uma função",
      "Limpa um temporizador"
    ],
    "correctAnswer": "Executa uma função uma única vez após N milissegundos",
    "subject": "JavaScript"
  },
  {
    "id": "js25",
    "descricao": "Qual é a saída do seguinte código JavaScript?\n```javascript\nlet x = 10;\nfunction test() {\n  console.log(x);\n  let x = 20;\n}\ntest();\n```",
    "alternativas": ["10", "20", "undefined", "Erro (ReferenceError)"],
    "correctAnswer": "Erro (ReferenceError)",
    "subject": "JavaScript"
  },
  {
    "id": "js26",
    "descricao": "Qual método de array é usado para testar se *todos* os elementos em um array passam no teste implementado pela função fornecida?",
    "alternativas": ["some()", "filter()", "every()", "find()"],
    "correctAnswer": "every()",
    "subject": "JavaScript"
  },
  {
    "id": "js27",
    "descricao": "O que são 'callbacks' em JavaScript?",
    "alternativas": [
      "Funções que são passadas como argumentos para outras funções e executadas posteriormente",
      "Funções que são chamadas automaticamente pelo navegador",
      "Funções que retornam outras funções",
      "Funções que lidam com erros"
    ],
    "correctAnswer": "Funções que são passadas como argumentos para outras funções e executadas posteriormente",
    "subject": "JavaScript"
  },
  {
    "id": "js28",
    "descricao": "Qual método é usado para remover o último elemento de um array e retorná-lo?",
    "alternativas": ["shift()", "unshift()", "pop()", "splice()"],
    "correctAnswer": "pop()",
    "subject": "JavaScript"
  },
  {
    "id": "js29",
    "descricao": "O que `NaN` significa em JavaScript?",
    "alternativas": ["Not a Number", "No and Null", "New Array Name", "None"],
    "correctAnswer": "Not a Number",
    "subject": "JavaScript"
  },
  {
    "id": "js30",
    "descricao": "Qual é a maneira correta de incluir um arquivo JavaScript externo chamado 'script.js' em um documento HTML?",
    "alternativas": [
      "<script src='script.js'></script>",
      "<javascript href='script.js'></javascript>",
      "<script link='script.js'></script>",
      "<js src='script.js'></js>"
    ],
    "correctAnswer": "<script src='script.js'></script>",
    "subject": "JavaScript"
  },
  {
    "id": "js31",
    "descricao": "Qual das seguintes opções é usada para desestruturar um array em JavaScript?",
    "alternativas": [
      "let [a, b] = myArray;",
      "let {a, b} = myArray;",
      "let a, b = myArray;",
      "array.destructure(a, b);"
    ],
    "correctAnswer": "let [a, b] = myArray;",
    "subject": "JavaScript"
  },
  {
    "id": "js32",
    "descricao": "O que o operador `typeof` retorna para um array em JavaScript?",
    "alternativas": ["array", "object", "string", "undefined"],
    "correctAnswer": "object",
    "subject": "JavaScript"
  },
  {
    "id": "js33",
    "descricao": "Qual método de string é usado para encontrar a primeira ocorrência de um valor especificado em uma string?",
    "alternativas": ["search()", "match()", "indexOf()", "includes()"],
    "correctAnswer": "indexOf()",
    "subject": "JavaScript"
  },
  {
    "id": "js34",
    "descricao": "Qual das seguintes opções é usada para criar uma classe em JavaScript (ES6)?",
    "alternativas": [
      "function MyClass() {}",
      "class MyClass {}",
      "var MyClass = function() {};",
      "create class MyClass {};"
    ],
    "correctAnswer": "class MyClass {}",
    "subject": "JavaScript"
  },
  {
    "id": "js35",
    "descricao": "O que as 'Promises' representam em JavaScript?",
    "alternativas": [
      "Um objeto que representa a eventual conclusão ou falha de uma operação assíncrona.",
      "Um tipo especial de função para lidar com eventos.",
      "Um novo tipo de loop para iteração.",
      "Uma maneira de declarar variáveis globais."
    ],
    "correctAnswer": "Um objeto que representa a eventual conclusão ou falha de uma operação assíncrona.",
    "subject": "JavaScript"
  },
  {
    "id": "js36",
    "descricao": "Qual das seguintes opções é usada para importar módulos em JavaScript (ES6)?",
    "alternativas": [
      "require()",
      "import",
      "include",
      "load()"
    ],
    "correctAnswer": "import",
    "subject": "JavaScript"
  },
  {
    "id": "js37",
    "descricao": "Qual é a principal diferença entre `null` e `undefined` em JavaScript?",
    "alternativas": [
      "`null` significa a ausência intencional de qualquer valor, enquanto `undefined` significa que uma variável foi declarada, mas ainda não foi atribuído um valor.",
      "`null` e `undefined` são exatamente a mesma coisa.",
      "`null` é um tipo de dado, e `undefined` é um valor.",
      "Não há distinção prática; ambos indicam um valor ausente."
    ],
    "correctAnswer": "`null` significa a ausência intencional de qualquer valor, enquanto `undefined` significa que uma variável foi declarada, mas ainda não foi atribuído um valor.",
    "subject": "JavaScript"
  },
  {
    "id": "js38",
    "descricao": "Qual método de array é usado para remover um elemento de um índice específico e/ou adicionar novos elementos no lugar?",
    "alternativas": ["slice()", "concat()", "splice()", "join()"],
    "correctAnswer": "splice()",
    "subject": "JavaScript"
  },
  {
    "id": "js39",
    "descricao": "O que é 'hoisting' em JavaScript?",
    "alternativas": [
      "Um erro comum de sintaxe.",
      "Um comportamento onde declarações de variáveis e funções são movidas para o topo do seu escopo durante a fase de compilação.",
      "Uma técnica para otimizar o desempenho do código.",
      "Um tipo de iteração em loops."
    ],
    "correctAnswer": "Um comportamento onde declarações de variáveis e funções são movidas para o topo do seu escopo durante a fase de compilação.",
    "subject": "JavaScript"
  },
  {
    "id": "js40",
    "descricao": "Qual é a saída do seguinte código JavaScript?\n```javascript\nconsole.log(1 + '2' + '2');\n```",
    "alternativas": ["'122'", "'5'", "'32'", "32"],
    "correctAnswer": "'122'",
    "subject": "JavaScript"
  },
  {
    "id": "js41",
    "descricao": "Qual das opções a seguir é uma maneira de criar um objeto em JavaScript?",
    "alternativas": [
      "let obj = {};",
      "let obj = new Object();",
      "let obj = Object.create(null);",
      "Todas as alternativas anteriores."
    ],
    "correctAnswer": "Todas as alternativas anteriores.",
    "subject": "JavaScript"
  },
  {
    "id": "js42",
    "descricao": "Qual método de array é usado para juntar todos os elementos de um array em uma string?",
    "alternativas": ["toString()", "join()", "concat()", "slice()"],
    "correctAnswer": "join()",
    "subject": "JavaScript"
  },
  {
    "id": "js43",
    "descricao": "O que o `bind()` faz em JavaScript?",
    "alternativas": [
      "Define o valor de `this` para uma função e retorna uma nova função.",
      "Executa uma função imediatamente.",
      "Cria uma cópia profunda de uma função.",
      "Adiciona um ouvinte de evento."
    ],
    "correctAnswer": "Define o valor de `this` para uma função e retorna uma nova função.",
    "subject": "JavaScript"
  },
  {
    "id": "js44",
    "descricao": "Em JavaScript, o que é um 'truthy' value?",
    "alternativas": [
      "Um valor que é estritamente igual a `true`.",
      "Um valor que é considerado `false` em um contexto booleano.",
      "Um valor que é considerado `true` em um contexto booleano.",
      "Apenas o número 1."
    ],
    "correctAnswer": "Um valor que é considerado `true` em um contexto booleano.",
    "subject": "JavaScript"
  },
  {
    "id": "js45",
    "descricao": "Qual das seguintes opções é um valor 'falsy' em JavaScript?",
    "alternativas": ["'0'", "{}", "[]", "0"],
    "correctAnswer": "0",
    "subject": "JavaScript"
  },
  {
    "id": "js46",
    "descricao": "Qual método é usado para verificar se uma variável é um array?",
    "alternativas": ["typeof myArray === 'array'", "myArray.isAnArray()", "Array.isArray(myArray)", "myArray instanceof Array"],
    "correctAnswer": "Array.isArray(myArray)",
    "subject": "JavaScript"
  },
  {
    "id": "js47",
    "descricao": "O que o método `Object.keys(obj)` retorna?",
    "alternativas": ["Um array com os valores das propriedades de obj", "Um array com as chaves das propriedades de obj", "Um objeto com as chaves e valores de obj", "Um boolean indicando se o objeto tem chaves"],
    "correctAnswer": "Um array com as chaves das propriedades de obj",
    "subject": "JavaScript"
  },
  {
    "id": "js48",
    "descricao": "Como são chamadas as strings que permitem expressões embutidas, demarcadas por crases (`)?",
    "alternativas": ["String Literals", "Template Literals", "Expression Strings", "Dynamic Strings"],
    "correctAnswer": "Template Literals",
    "subject": "JavaScript"
  },
  {
    "id": "js49",
    "descricao": "Qual é a principal finalidade da sintaxe `async/await` em JavaScript?",
    "alternativas": ["Executar código síncrono", "Tornar o código assíncrono mais fácil de ler e escrever, parecendo síncrono", "Declarar variáveis globais", "Criar loops mais eficientes"],
    "correctAnswer": "Tornar o código assíncrono mais fácil de ler e escrever, parecendo síncrono",
    "subject": "JavaScript"
  },
  {
    "id": "js50",
    "descricao": "Qual bloco é usado para tratar exceções (erros) em JavaScript?",
    "alternativas": ["if...else", "switch...case", "try...catch", "for...in"],
    "correctAnswer": "try...catch",
    "subject": "JavaScript"
  },
  {
    "id": "js51",
    "descricao": "O que descreve o 'event bubbling' no DOM do JavaScript?",
    "alternativas": ["O evento é capturado do elemento mais externo para o mais interno", "O evento se propaga do elemento mais interno para o mais externo", "O evento ocorre apenas no elemento alvo", "O evento é cancelado antes de se propagar"],
    "correctAnswer": "O evento se propaga do elemento mais interno para o mais externo",
    "subject": "JavaScript"
  },
  {
    "id": "js52",
    "descricao": "Qual é a principal diferença entre `localStorage` e `sessionStorage`?",
    "alternativas": ["localStorage é mais rápido", "sessionStorage é excluído quando o navegador é fechado", "localStorage só armazena strings", "Não há diferença"],
    "correctAnswer": "sessionStorage é excluído quando o navegador é fechado",
    "subject": "JavaScript"
  },
  {
    "id": "js53",
    "descricao": "Qual é a diferença fundamental entre `forEach()` e `map()`?",
    "alternativas": ["`forEach()` é mais rápido que `map()`", "`map()` retorna um novo array, `forEach()` não", "`forEach()` modifica o array original, `map()` não", "`map()` só pode ser usado com números"],
    "correctAnswer": "`map()` retorna um novo array, `forEach()` não",
    "subject": "JavaScript"
  },
  {
    "id": "js54",
    "descricao": "Como você define um valor padrão para um parâmetro em uma função ES6?",
    "alternativas": ["function(a = 1) {}", "function(a || 1) {}", "function(a ? a : 1) {}", "function(a) { a = a || 1; }"],
    "correctAnswer": "function(a = 1) {}",
    "subject": "JavaScript"
  },
  {
    "id": "js55",
    "descricao": "O que os 'rest parameters' (`...args`) permitem em uma função?",
    "alternativas": ["Passar um número fixo de argumentos", "Representar um número indefinido de argumentos como um array", "Espalhar os elementos de um array", "Definir valores padrão para argumentos"],
    "correctAnswer": "Representar um número indefinido de argumentos como um array",
    "subject": "JavaScript"
  },
  {
    "id": "js56",
    "descricao": "Em classes ES6, como são chamados os métodos especiais para obter e definir o valor de uma propriedade?",
    "alternativas": ["getters e setters", "get() e set()", "readers e writers", "accessors e mutators"],
    "correctAnswer": "getters e setters",
    "subject": "JavaScript"
  },
  {
    "id": "js57",
    "descricao": "Qual é a função de `Promise.all(promises)`?",
    "alternativas": ["Retorna a primeira Promise que for resolvida", "Retorna uma única Promise que resolve quando todas as Promises no iterável forem resolvidas", "Retorna uma Promise que rejeita se qualquer uma das Promises rejeitar", "Ambas B e C estão corretas"],
    "correctAnswer": "Ambas B e C estão corretas",
    "subject": "JavaScript"
  },
  {
    "id": "js58",
    "descricao": "O que a palavra-chave `new` faz em JavaScript?",
    "alternativas": ["Cria uma nova variável", "Cria uma instância de um objeto a partir de uma função construtora", "Declara uma nova função", "Aloca memória para um array"],
    "correctAnswer": "Cria uma instância de um objeto a partir de uma função construtora",
    "subject": "JavaScript"
  },
  {
    "id": "js59",
    "descricao": "Qual é o propósito de usar `'use strict';` no início de um arquivo JavaScript?",
    "alternativas": ["Para habilitar recursos modernos do JavaScript", "Para executar o código em 'modo estrito', que captura erros comuns e ações 'inseguras'", "Para tornar o código mais rápido", "Para permitir o uso de TypeScript"],
    "correctAnswer": "Para executar o código em 'modo estrito', que captura erros comuns e ações 'inseguras'",
    "subject": "JavaScript"
  },
  {
    "id": "js60",
    "descricao": "Qual a principal diferença entre `slice()` e `splice()` em arrays?",
    "alternativas": ["`slice()` modifica o array original, `splice()` não", "`splice()` retorna um novo array, `slice()` não", "`splice()` pode adicionar/remover elementos, `slice()` retorna uma cópia de uma porção do array", "Ambos fazem a mesma coisa"],
    "correctAnswer": "`splice()` pode adicionar/remover elementos, `slice()` retorna uma cópia de uma porção do array",
    "subject": "JavaScript"
  },
  {
    "id": "js61",
    "descricao": "O que é o 'Event Loop' (Laço de Eventos) em JavaScript?",
    "alternativas": ["Um tipo de loop `for`", "Um mecanismo que permite que JavaScript execute operações de longa duração sem bloquear a thread principal", "Uma função para lidar com eventos de mouse", "Uma API para animações"],
    "correctAnswer": "Um mecanismo que permite que JavaScript execute operações de longa duração sem bloquear a thread principal",
    "subject": "JavaScript"
  },
  {
    "id": "js62",
    "descricao": "Qual método de objeto impede que novas propriedades sejam adicionadas a um objeto, mas permite a modificação das existentes?",
    "alternativas": ["Object.freeze()", "Object.seal()", "Object.preventExtensions()", "Object.lock()"],
    "correctAnswer": "Object.seal()",
    "subject": "JavaScript"
  },
  {
    "id": "js63",
    "descricao": "Qual é a principal característica do tipo de dado `Symbol`?",
    "alternativas": ["É usado para armazenar símbolos matemáticos", "Cria identificadores únicos e imutáveis, frequentemente usados como chaves de propriedade de objeto", "É um sinônimo para o tipo `String`", "Representa um ícone gráfico"],
    "correctAnswer": "Cria identificadores únicos e imutáveis, frequentemente usados como chaves de propriedade de objeto",
    "subject": "JavaScript"
  },
  {
    "id": "js64",
    "descricao": "Qual é a maneira mais confiável de verificar se uma propriedade existe em um objeto, incluindo as do protótipo?",
    "alternativas": ["`'prop' in obj`", "`obj.hasOwnProperty('prop')`", "`obj.prop !== undefined`", "`Object.keys(obj).includes('prop')`"],
    "correctAnswer": "`'prop' in obj`",
    "subject": "JavaScript"
  },
  {
    "id": "js65",
    "descricao": "Para que serve a API Fetch em JavaScript?",
    "alternativas": ["Para manipular o DOM", "Para fazer requisições de rede (HTTP) de forma assíncrona", "Para armazenar dados no navegador", "Para criar animações complexas"],
    "correctAnswer": "Para fazer requisições de rede (HTTP) de forma assíncrona",
    "subject": "JavaScript"
  },
  {
    "id": "js66",
    "descricao": "Qual é a principal diferença entre um `Map` e um `WeakMap`?",
    "alternativas": ["`WeakMap` não permite chaves que não sejam objetos", "`WeakMap` permite que suas chaves sejam coletadas pelo garbage collector se não houver outras referências a elas", "Não há diferença funcional", "Ambas A e B estão corretas"],
    "correctAnswer": "Ambas A e B estão corretas",
    "subject": "JavaScript"
  },
  {
    "id": "js67",
    "descricao": "O que caracteriza uma 'função pura' em programação funcional?",
    "alternativas": ["Uma função que não tem parâmetros", "Uma função que sempre retorna o mesmo resultado para os mesmos argumentos e não tem efeitos colaterais observáveis", "Uma função que modifica variáveis fora de seu escopo", "Uma função que só pode ser chamada uma vez"],
    "correctAnswer": "Uma função que sempre retorna o mesmo resultado para os mesmos argumentos e não tem efeitos colaterais observáveis",
    "subject": "JavaScript"
  },
  {
    "id": "js68",
    "descricao": "Qual é a finalidade do método `Array.from()`?",
    "alternativas": ["Criar uma cópia de um array", "Converter um objeto semelhante a um array ou iterável em um novo array", "Verificar se um objeto é um array", "Remover elementos de um array"],
    "correctAnswer": "Converter um objeto semelhante a um array ou iterável em um novo array",
    "subject": "JavaScript"
  },
  {
    "id": "js69",
    "descricao": "Qual método de array é mais adequado para verificar se um elemento específico existe em um array?",
    "alternativas": ["indexOf()", "find()", "includes()", "some()"],
    "correctAnswer": "includes()",
    "subject": "JavaScript"
  },
  {
    "id": "js70",
    "descricao": "Como uma 'arrow function' trata a palavra-chave `this`?",
    "alternativas": ["Ela tem seu próprio `this`, como uma função regular", "O valor de `this` é sempre `window`", "Ela não possui seu próprio `this`; ela herda o `this` do escopo pai (léxico)", "O uso de `this` é proibido em arrow functions"],
    "correctAnswer": "Ela não possui seu próprio `this`; ela herda o `this` do escopo pai (léxico)",
    "subject": "JavaScript"
  },
  // Continuarei adicionando mais 130 perguntas a partir daqui.
  {
    "id": "js71",
    "descricao": "Qual é a saída de `console.log(typeof NaN)`?",
    "alternativas": ["'nan'", "'undefined'", "'object'", "'number'"],
    "correctAnswer": "'number'",
    "subject": "JavaScript"
  },
  {
    "id": "js72",
    "descricao": "O que o método `Object.assign()` faz?",
    "alternativas": ["Copia os valores de todas as propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto destino", "Atribui um novo protótipo a um objeto", "Compara dois objetos", "Cria um novo objeto vazio"],
    "correctAnswer": "Copia os valores de todas as propriedades próprias enumeráveis de um ou mais objetos de origem para um objeto destino",
    "subject": "JavaScript"
  },
  {
    "id": "js73",
    "descricao": "Qual o resultado de `[] == ![]` em JavaScript?",
    "alternativas": ["false", "true", "SyntaxError", "undefined"],
    "correctAnswer": "true",
    "subject": "JavaScript"
  },
  {
    "id": "js74",
    "descricao": "Como você pode interromper a propagação de um evento no DOM?",
    "alternativas": ["event.preventDefault()", "event.stopPropagation()", "event.stop()", "event.cancelBubble = true"],
    "correctAnswer": "event.stopPropagation()",
    "subject": "JavaScript"
  },
  {
    "id": "js75",
    "descricao": "O que é 'desestruturação' (destructuring) em JavaScript?",
    "alternativas": ["Uma forma de destruir objetos para liberar memória", "Uma sintaxe que permite extrair valores de arrays ou propriedades de objetos em variáveis distintas", "Um método para remover elementos de um array", "Um tipo de erro de sintaxe"],
    "correctAnswer": "Uma sintaxe que permite extrair valores de arrays ou propriedades de objetos em variáveis distintas",
    "subject": "JavaScript"
  },
  {
    "id": "js76",
    "descricao": "Qual o propósito do operador de coalescência nula (`??`)?",
    "alternativas": ["Retornar o operando do lado direito quando o do lado esquerdo é `null` ou `undefined`, e caso contrário, retorna o do lado esquerdo", "Retornar `true` se ambos os operandos forem `null`", "Substituir o operador `||` em todos os casos", "Verificar se um valor é nulo"],
    "correctAnswer": "Retornar o operando do lado direito quando o do lado esquerdo é `null` ou `undefined`, e caso contrário, retorna o do lado esquerdo",
    "subject": "JavaScript"
  },
  {
    "id": "js77",
    "descricao": "Qual é a principal diferença entre uma 'NodeList' e um 'HTMLCollection'?",
    "alternativas": ["`NodeList` pode conter nós que não são elementos (como texto), `HTMLCollection` só contém elementos", "`HTMLCollection` é estática, enquanto `NodeList` é dinâmica (live)", "`NodeList` possui o método `forEach`, `HTMLCollection` geralmente não", "A e C estão corretas"],
    "correctAnswer": "A e C estão corretas",
    "subject": "JavaScript"
  },
  {
    "id": "js78",
    "descricao": "O que o método `Array.prototype.reduce()` faz?",
    "alternativas": ["Reduz o número de elementos no array", "Executa uma função 'redutora' para cada elemento do array, resultando em um único valor de retorno", "Filtra os elementos de um array", "Retorna um novo array com menos elementos"],
    "correctAnswer": "Executa uma função 'redutora' para cada elemento do array, resultando em um único valor de retorno",
    "subject": "JavaScript"
  },
  {
    "id": "js79",
    "descricao": "Qual é a função do atributo `defer` em uma tag `<script>`?",
    "alternativas": ["Atrasa a execução do script até que o carregamento do documento termine", "Executa o script de forma assíncrona, mas em ordem", "Garante que o script seja executado após o parsing do HTML ter sido concluído", "Executa o script antes do parsing do HTML"],
    "correctAnswer": "Garante que o script seja executado após o parsing do HTML ter sido concluído",
    "subject": "JavaScript"
  },
  {
    "id": "js80",
    "descricao": "Como você pode clonar um objeto em JavaScript sem criar uma referência ao objeto original?",
    "alternativas": ["`let clone = original;`", "`let clone = {...original};` (para cópias rasas)", "`let clone = JSON.parse(JSON.stringify(original));` (para cópias profundas)", "B e C são métodos válidos para diferentes tipos de clonagem"],
    "correctAnswer": "B e C são métodos válidos para diferentes tipos de clonagem",
    "subject": "JavaScript"
  },
  // ... e assim por diante até js200
  {
    "id": "js81",
    "descricao": "O que é o `prototype` em JavaScript?",
    "alternativas": ["Um modelo para criar objetos", "Um mecanismo pelo qual objetos JavaScript herdam recursos uns dos outros", "Uma palavra-chave para declarar variáveis privadas", "Uma função para criar cópias de objetos"],
    "correctAnswer": "Um mecanismo pelo qual objetos JavaScript herdam recursos uns dos outros",
    "subject": "JavaScript"
  },
  {
    "id": "js82",
    "descricao": "Qual a finalidade do método `filter()` em um array?",
    "alternativas": ["Modificar cada elemento do array", "Criar um novo array com todos os elementos que passaram no teste implementado pela função fornecida", "Encontrar o primeiro elemento que satisfaz a condição", "Verificar se algum elemento satisfaz a condição"],
    "correctAnswer": "Criar um novo array com todos os elementos que passaram no teste implementado pela função fornecida",
    "subject": "JavaScript"
  },
  {
    "id": "js83",
    "descricao": "O que o operador ternário (`condição ? valor1 : valor2`) faz?",
    "alternativas": ["Define três variáveis de uma vez", "É um atalho para uma instrução `if...else`", "Cria um loop que executa três vezes", "Compara três valores"],
    "correctAnswer": "É um atalho para uma instrução `if...else`",
    "subject": "JavaScript"
  },
  {
    "id": "js84",
    "descricao": "Como você pode converter um número para uma string em JavaScript?",
    "alternativas": ["`String(num)`", "`num.toString()`", "`'' + num`", "Todas as alternativas anteriores"],
    "correctAnswer": "Todas as alternativas anteriores",
    "subject": "JavaScript"
  },
  {
    "id": "js85",
    "descricao": "Qual a diferença entre os loops `for...in` e `for...of`?",
    "alternativas": ["`for...in` itera sobre os valores, `for...of` sobre as chaves", "`for...in` itera sobre as chaves/índices de um objeto, `for...of` itera sobre os valores de um iterável", "Ambos são idênticos", "`for...of` é mais antigo e obsoleto"],
    "correctAnswer": "`for...in` itera sobre as chaves/índices de um objeto, `for...of` itera sobre os valores de um iterável",
    "subject": "JavaScript"
  },
  {
    "id": "js86",
    "descricao": "O que o `document.getElementById()` retorna se nenhum elemento com o ID especificado for encontrado?",
    "alternativas": ["`undefined`", "`false`", "`null`", "Um erro"],
    "correctAnswer": "`null`",
    "subject": "JavaScript"
  },
  {
    "id": "js87",
    "descricao": "Qual é o propósito de `JSON.stringify()`?",
    "alternativas": ["Converter um objeto JavaScript em uma string JSON", "Analisar uma string JSON", "Validar um objeto JSON", "Criar um objeto a partir de uma string"],
    "correctAnswer": "Converter um objeto JavaScript em uma string JSON",
    "subject": "JavaScript"
  },
  {
    "id": "js88",
    "descricao": "O que é uma IIFE (Immediately Invoked Function Expression)?",
    "alternativas": ["Uma função que é declarada e executada imediatamente", "Uma função que nunca é executada", "Um tipo de classe", "Uma função que só pode ser chamada por outra função"],
    "correctAnswer": "Uma função que é declarada e executada imediatamente",
    "subject": "JavaScript"
  },
  {
    "id": "js89",
    "descricao": "Qual o resultado de `true + false` em JavaScript?",
    "alternativas": ["`truefalse`", "1", "0", "`NaN`"],
    "correctAnswer": "1",
    "subject": "JavaScript"
  },
  {
    "id": "js90",
    "descricao": "Qual método de string remove espaços em branco do início e do fim de uma string?",
    "alternativas": ["`trim()`", "`strip()`", "`clean()`", "`removeSpaces()`"],
    "correctAnswer": "`trim()`",
    "subject": "JavaScript"
  },
  {
    "id": "js91",
    "descricao": "O que o `event.preventDefault()` faz?",
    "alternativas": ["Impede a ação padrão do navegador para um evento", "Para a propagação do evento", "Cancela a execução do script", "Reinicia o evento"],
    "correctAnswer": "Impede a ação padrão do navegador para um evento",
    "subject": "JavaScript"
  },
  {
    "id": "js92",
    "descricao": "Como você pode obter o número de elementos em um array `arr`?",
    "alternativas": ["`arr.length`", "`arr.size()`", "`arr.count`", "`length(arr)`"],
    "correctAnswer": "`arr.length`",
    "subject": "JavaScript"
  },
  {
    "id": "js93",
    "descricao": "Qual é a função do operador de encadeamento opcional (`?.`)?",
    "alternativas": ["Permite ler o valor de uma propriedade localizada profundamente em uma cadeia de objetos sem ter que validar que cada referência na cadeia é válida", "Faz uma pergunta ao usuário", "Cria uma cadeia de Promises", "Substitui o operador ternário"],
    "correctAnswer": "Permite ler o valor de uma propriedade localizada profundamente em uma cadeia de objetos sem ter que validar que cada referência na cadeia é válida",
    "subject": "JavaScript"
  },
  {
    "id": "js94",
    "descricao": "Qual a saída de `console.log(!!'hello')`?",
    "alternativas": ["`'hello'`", "`true`", "`false`", "`undefined`"],
    "correctAnswer": "`true`",
    "subject": "JavaScript"
  },
  {
    "id": "js95",
    "descricao": "Qual método de string retorna uma nova string com todas as ocorrências de um padrão substituídas por uma substituição?",
    "alternativas": ["`replace()`", "`replaceAll()`", "`substitute()`", "`change()`"],
    "correctAnswer": "`replaceAll()`",
    "subject": "JavaScript"
  },
  {
    "id": "js96",
    "descricao": "O que é `this` no escopo global em um navegador?",
    "alternativas": ["O objeto `document`", "O objeto `window`", "`null`", "`undefined`"],
    "correctAnswer": "O objeto `window`",
    "subject": "JavaScript"
  },
  {
    "id": "js97",
    "descricao": "Qual método é usado para agendar a execução repetida de uma função a cada intervalo de tempo especificado?",
    "alternativas": ["`setTimeout()`", "`setInterval()`", "`requestAnimationFrame()`", "`repeat()`"],
    "correctAnswer": "`setInterval()`",
    "subject": "JavaScript"
  },
  {
    "id": "js98",
    "descricao": "Como você declara uma 'arrow function' que recebe um parâmetro `x` e retorna `x * 2`?",
    "alternativas": ["`x => x * 2`", "`function(x) { return x * 2 }`", "`x -> x * 2`", "`=> x * 2`"],
    "correctAnswer": "`x => x * 2`",
    "subject": "JavaScript"
  },
  {
    "id": "js99",
    "descricao": "O que o `constructor` faz dentro de uma classe ES6?",
    "alternativas": ["Destrói a instância da classe", "É um método especial para criar e inicializar um objeto criado com uma classe", "Constrói a cadeia de protótipos", "Retorna o nome da classe"],
    "correctAnswer": "É um método especial para criar e inicializar um objeto criado com uma classe",
    "subject": "JavaScript"
  },
  {
    "id": "js100",
    "descricao": "Qual o resultado de `0.1 + 0.2 === 0.3` em JavaScript?",
    "alternativas": ["`true`", "`false`", "`SyntaxError`", "`undefined`"],
    "correctAnswer": "`false`",
    "subject": "JavaScript"
  },
  {
    "id": "js101",
    "descricao": "Qual método de string verifica se uma string começa com os caracteres de outra string?",
    "alternativas": ["`includes()`", "`match()`", "`startsWith()`", "`indexOf()`"],
    "correctAnswer": "`startsWith()`",
    "subject": "JavaScript"
  },
  {
    "id": "js102",
    "descricao": "Em `async/await`, qual palavra-chave é usada para pausar a execução de uma função `async` até que uma `Promise` seja resolvida?",
    "alternativas": ["`pause`", "`wait`", "`await`", "`hold`"],
    "correctAnswer": "`await`",
    "subject": "JavaScript"
  },
  {
    "id": "js103",
    "descricao": "O que o `Object.freeze(obj)` faz?",
    "alternativas": ["Impede a modificação de propriedades existentes e a adição de novas propriedades", "Apenas impede a adição de novas propriedades", "Apenas impede a exclusão de propriedades", "Cria uma cópia congelada do objeto"],
    "correctAnswer": "Impede a modificação de propriedades existentes e a adição de novas propriedades",
    "subject": "JavaScript"
  },
  {
    "id": "js104",
    "descricao": "Qual a forma correta de herdar de uma classe pai `Parent` em uma classe filha `Child` em ES6?",
    "alternativas": ["`class Child extends Parent {}`", "`class Child inherits Parent {}`", "`class Child implements Parent {}`", "`class Child.prototype = new Parent()`"],
    "correctAnswer": "`class Child extends Parent {}`",
    "subject": "JavaScript"
  },
  {
    "id": "js105",
    "descricao": "Dentro do construtor de uma classe filha, qual método deve ser chamado para invocar o construtor da classe pai?",
    "alternativas": ["`parent()`", "`super()`", "`this()`", "`__proto__()`"],
    "correctAnswer": "`super()`",
    "subject": "JavaScript"
  },
  {
    "id": "js106",
    "descricao": "Qual método de array inverte a ordem dos elementos no local (modifica o array original)?",
    "alternativas": ["`sort()`", "`flip()`", "`reverse()`", "`invert()`"],
    "correctAnswer": "`reverse()`",
    "subject": "JavaScript"
  },
  {
    "id": "js107",
    "descricao": "O que o `...` faz quando usado na desestruturação de um objeto: `let { a, ...rest } = obj;`?",
    "alternativas": ["Cria um erro de sintaxe", "Copia todo o objeto `obj` para `rest`", "Cria um novo objeto `rest` com todas as propriedades de `obj` que não foram desestruturadas (neste caso, `a`)", "Ignora as propriedades restantes"],
    "correctAnswer": "Cria um novo objeto `rest` com todas as propriedades de `obj` que não foram desestruturadas (neste caso, `a`)",
    "subject": "JavaScript"
  },
  {
    "id": "js108",
    "descricao": "O que é 'currying' em JavaScript?",
    "alternativas": ["Um tipo de tempero para código", "Uma técnica de transformar uma função que aceita múltiplos argumentos em uma sequência de funções que aceitam um único argumento", "Um erro de compilação", "Uma forma de escrever comentários"],
    "correctAnswer": "Uma técnica de transformar uma função que aceita múltiplos argumentos em uma sequência de funções que aceitam um único argumento",
    "subject": "JavaScript"
  },
  {
    "id": "js109",
    "descricao": "Qual o valor de `this` em uma função chamada com `call()` ou `apply()`?",
    "alternativas": ["Sempre o objeto global", "Sempre `undefined`", "O primeiro argumento passado para `call()`/`apply()`", "O objeto onde a função foi declarada"],
    "correctAnswer": "O primeiro argumento passado para `call()`/`apply()`",
    "subject": "JavaScript"
  },
  {
    "id": "js110",
    "descricao": "Como você cria um comentário de múltiplas linhas em JavaScript?",
    "alternativas": ["`// ... //`", "``", "`/* ... */`", "`# ... #`"],
    "correctAnswer": "`/* ... */`",
    "subject": "JavaScript"
  },
  {
    "id": "js111",
    "descricao": "Qual método é usado para obter a data e hora atuais?",
    "alternativas": ["`new Date()`", "`Date.now()`", "`getCurrentTime()`", "A e B estão corretas"],
    "correctAnswer": "A e B estão corretas",
    "subject": "JavaScript"
  },
  {
    "id": "js112",
    "descricao": "Qual método de string retorna o caractere em um índice especificado?",
    "alternativas": ["`charAt()`", "`characterAt()`", "`getChar()`", "`indexOf()`"],
    "correctAnswer": "`charAt()`",
    "subject": "JavaScript"
  },
  {
    "id": "js113",
    "descricao": "Qual operador pode ser usado para concatenar strings?",
    "alternativas": ["`&`", "`+`", "`&&`", "`||`"],
    "correctAnswer": "`+`",
    "subject": "JavaScript"
  },
  {
    "id": "js114",
    "descricao": "O que o `document.createElement()` faz?",
    "alternativas": ["Cria um novo elemento HTML especificado pela tag", "Seleciona um elemento existente", "Remove um elemento", "Clona um elemento"],
    "correctAnswer": "Cria um novo elemento HTML especificado pela tag",
    "subject": "JavaScript"
  },
  {
    "id": "js115",
    "descricao": "Como você adiciona um elemento `newElement` como filho de `parentElement`?",
    "alternativas": ["`parentElement.appendChild(newElement)`", "`newElement.addTo(parentElement)`", "`parentElement.addChild(newElement)`", "`parentElement.insert(newElement)`"],
    "correctAnswer": "`parentElement.appendChild(newElement)`",
    "subject": "JavaScript"
  },
  {
    "id": "js116",
    "descricao": "Qual método de array retorna o índice do primeiro elemento que satisfaz a condição de teste?",
    "alternativas": ["`findIndex()`", "`indexOf()`", "`search()`", "`find()`"],
    "correctAnswer": "`findIndex()`",
    "subject": "JavaScript"
  },
  {
    "id": "js117",
    "descricao": "O que o `Set` em ES6 representa?",
    "alternativas": ["Uma coleção de valores onde cada valor deve ser único", "Um tipo de array que não pode ser modificado", "Um objeto para definir configurações", "Um sinônimo para `Map`"],
    "correctAnswer": "Uma coleção de valores onde cada valor deve ser único",
    "subject": "JavaScript"
  },
  {
    "id": "js118",
    "descricao": "Qual é a saída de `console.log(typeof [])`?",
    "alternativas": ["`'array'`", "`'list'`", "`'object'`", "`'undefined'`"],
    "correctAnswer": "`'object'`",
    "subject": "JavaScript"
  },
  {
    "id": "js119",
    "descricao": "Qual o propósito do arquivo `package.json` em um projeto Node.js?",
    "alternativas": ["Armazenar o código-fonte principal", "Listar as dependências do projeto e outras metainformações", "Definir as variáveis de ambiente", "Conter os testes unitários"],
    "correctAnswer": "Listar as dependências do projeto e outras metainformações",
    "subject": "JavaScript"
  },
  {
    "id": "js120",
    "descricao": "O que é um 'módulo' em JavaScript (ES6)?",
    "alternativas": ["Qualquer arquivo JavaScript", "Um arquivo que exporta seu código para que outros arquivos possam importá-lo", "Um objeto global", "Uma função construtora"],
    "correctAnswer": "Um arquivo que exporta seu código para que outros arquivos possam importá-lo",
    "subject": "JavaScript"
  },
  {
    "id": "js121",
    "descricao": "Qual o comando usado para instalar pacotes com o `npm`?",
    "alternativas": ["`npm add <pacote>`", "`npm get <pacote>`", "`npm install <pacote>`", "`npm fetch <pacote>`"],
    "correctAnswer": "`npm install <pacote>`",
    "subject": "JavaScript"
  },
  {
    "id": "js122",
    "descricao": "O que a palavra-chave `continue` faz dentro de um loop?",
    "alternativas": ["Encerra o loop completamente", "Pula a iteração atual e continua para a próxima", "Causa um erro", "Pausa a execução do loop"],
    "correctAnswer": "Pula a iteração atual e continua para a próxima",
    "subject": "JavaScript"
  },
  {
    "id": "js123",
    "descricao": "Qual método de string a converte para letras minúsculas?",
    "alternativas": ["`toLowerCase()`", "`toLower()`", "`lowerCase()`", "`caseLower()`"],
    "correctAnswer": "`toLowerCase()`",
    "subject": "JavaScript"
  },
  {
    "id": "js124",
    "descricao": "Qual é a saída do código a seguir?\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 10);\n}\n```",
    "alternativas": ["0, 1, 2", "3, 3, 3", "0, 0, 0", "1, 2, 3"],
    "correctAnswer": "3, 3, 3",
    "subject": "JavaScript"
  },
  {
    "id": "js125",
    "descricao": "Como o problema da pergunta anterior (closure em loops) pode ser resolvido usando `let`?",
    "alternativas": ["Substituindo `var` por `let` cria um escopo de bloco para `i`, resolvendo o problema", "`let` não resolve este problema", "Usando `const` em vez de `let`", "Declarando `i` fora do loop"],
    "correctAnswer": "Substituindo `var` por `let` cria um escopo de bloco para `i`, resolvendo o problema",
    "subject": "JavaScript"
  },
  {
    "id": "js126",
    "descricao": "O que é o `DOM` (Document Object Model)?",
    "alternativas": ["Um estilo de programação", "Uma representação em árvore de um documento HTML ou XML que permite a manipulação de sua estrutura, estilo e conteúdo", "Um formato de dados para intercâmbio de informações", "Um servidor web para JavaScript"],
    "correctAnswer": "Uma representação em árvore de um documento HTML ou XML que permite a manipulação de sua estrutura, estilo e conteúdo",
    "subject": "JavaScript"
  },
  {
    "id": "js127",
    "descricao": "Qual a diferença entre `let` e `const`?",
    "alternativas": ["`let` é para números, `const` é para strings", "Variáveis `const` não podem ser reatribuídas, enquanto `let` podem", "`const` tem escopo global, `let` tem escopo de função", "Não há diferença"],
    "correctAnswer": "Variáveis `const` não podem ser reatribuídas, enquanto `let` podem",
    "subject": "JavaScript"
  },
  {
    "id": "js128",
    "descricao": "O que acontece se você tentar reatribuir um valor a uma variável `const`?",
    "alternativas": ["O valor é alterado silenciosamente", "Um `TypeError` é lançado", "Um `Warning` é exibido no console", "O código continua sem erros"],
    "correctAnswer": "Um `TypeError` é lançado",
    "subject": "JavaScript"
  },
  {
    "id": "js129",
    "descricao": "O que o método `Promise.resolve(valor)` faz?",
    "alternativas": ["Retorna um objeto `Promise` que é resolvido com o valor dado", "Rejeita uma `Promise`", "Verifica se um valor é uma `Promise`", "Pausa a execução"],
    "correctAnswer": "Retorna um objeto `Promise` que é resolvido com o valor dado",
    "subject": "JavaScript"
  },
  {
    "id": "js130",
    "descricao": "O que o método `Promise.reject(motivo)` faz?",
    "alternativas": ["Retorna um objeto `Promise` que é rejeitado com um dado motivo", "Resolve uma `Promise`", "Ignora um erro", "Converte um erro em um valor resolvido"],
    "correctAnswer": "Retorna um objeto `Promise` que é rejeitado com um dado motivo",
    "subject": "JavaScript"
  },
  {
    "id": "js131",
    "descricao": "Como você pode manipular a resposta de uma requisição `fetch` que retornou com sucesso?",
    "alternativas": ["Usando o bloco `.catch()`", "Usando o bloco `.finally()`", "Usando o bloco `.then()`", "A resposta é manipulada automaticamente"],
    "correctAnswer": "Usando o bloco `.then()`",
    "subject": "JavaScript"
  },
  {
    "id": "js132",
    "descricao": "Qual método é chamado em uma resposta `fetch` para converter o corpo da resposta em JSON?",
    "alternativas": ["`.json()`", "`.parseJSON()`", "`.toJson()`", "`.text()`"],
    "correctAnswer": "`.json()`",
    "subject": "JavaScript"
  },
  {
    "id": "js133",
    "descricao": "O que a 'Temporal Dead Zone' (TDZ) se refere em ES6?",
    "alternativas": ["Um período em que uma variável `let` ou `const` não pode ser acessada antes de sua declaração", "Um erro de fuso horário", "Uma falha de segurança em Promises", "Um atraso na rede"],
    "correctAnswer": "Um período em que uma variável `let` ou `const` não pode ser acessada antes de sua declaração",
    "subject": "JavaScript"
  },
  {
    "id": "js134",
    "descricao": "Qual o resultado de `typeof function(){}`?",
    "alternativas": ["`'object'`", "`'function'`", "`'undefined'`", "`'syntax'`"],
    "correctAnswer": "`'function'`",
    "subject": "JavaScript"
  },
  {
    "id": "js135",
    "descricao": "O que são 'static methods' (métodos estáticos) em uma classe?",
    "alternativas": ["Métodos que pertencem à própria classe, e não a uma instância da classe", "Métodos que não podem ser modificados", "Métodos que só podem ser chamados de dentro de outros métodos da classe", "Métodos que são herdados de `Object`"],
    "correctAnswer": "Métodos que pertencem à própria classe, e não a uma instância da classe",
    "subject": "JavaScript"
  },
  {
    "id": "js136",
    "descricao": "Como você pode chamar um método estático `myStaticMethod` de uma classe `MyClass`?",
    "alternativas": ["`let instance = new MyClass(); instance.myStaticMethod();`", "`MyClass.myStaticMethod();`", "`this.myStaticMethod();`", "Métodos estáticos não podem ser chamados"],
    "correctAnswer": "`MyClass.myStaticMethod();`",
    "subject": "JavaScript"
  },
  {
    "id": "js137",
    "descricao": "Qual é a principal característica de um `Generator` em JavaScript?",
    "alternativas": ["Gerar números aleatórios", "Ser uma função que pode ser pausada e retomada, permitindo a produção de uma sequência de valores ao longo do tempo", "Gerar HTML dinamicamente", "Uma classe para criar jogos"],
    "correctAnswer": "Ser uma função que pode ser pausada e retomada, permitindo a produção de uma sequência de valores ao longo do tempo",
    "subject": "JavaScript"
  },
  {
    "id": "js138",
    "descricao": "Qual sintaxe é usada para declarar uma função geradora?",
    "alternativas": ["`function* myGenerator() {}`", "`generator function myGenerator() {}`", "`function myGenerator<T>() {}`", "`async function myGenerator() {}`"],
    "correctAnswer": "`function* myGenerator() {}`",
    "subject": "JavaScript"
  },
  {
    "id": "js139",
    "descricao": "Dentro de uma função geradora, qual palavra-chave é usada para pausar e retornar um valor?",
    "alternativas": ["`return`", "`pause`", "`stop`", "`yield`"],
    "correctAnswer": "`yield`",
    "subject": "JavaScript"
  },
  {
    "id": "js140",
    "descricao": "O que o `document.querySelectorAll()` retorna?",
    "alternativas": ["O primeiro elemento que corresponde ao seletor", "Uma `NodeList` estática contendo todos os elementos que correspondem ao seletor", "Um `HTMLCollection` dinâmico", "`null` se nada for encontrado"],
    "correctAnswer": "Uma `NodeList` estática contendo todos os elementos que correspondem ao seletor",
    "subject": "JavaScript"
  },
  {
    "id": "js141",
    "descricao": "Qual é a diferença entre os atributos `id` e `class` em HTML?",
    "alternativas": ["`id` deve ser único por página, `class` pode ser usada em múltiplos elementos", "`class` deve ser único, `id` pode ser múltiplo", "Não há diferença", "`id` é para CSS, `class` é para JavaScript"],
    "correctAnswer": "`id` deve ser único por página, `class` pode ser usada em múltiplos elementos",
    "subject": "JavaScript"
  },
  {
    "id": "js142",
    "descricao": "O que significa dizer que JavaScript é uma linguagem de 'tipagem dinâmica'?",
    "alternativas": ["Os tipos de dados não existem", "O tipo de uma variável é determinado em tempo de execução e pode mudar", "Você deve declarar o tipo de cada variável", "JavaScript só tem um tipo de dado"],
    "correctAnswer": "O tipo de uma variável é determinado em tempo de execução e pode mudar",
    "subject": "JavaScript"
  },
  {
    "id": "js143",
    "descricao": "Qual método de string extrai uma parte de uma string e a retorna como uma nova string?",
    "alternativas": ["`substring()`", "`substr()`", "`slice()`", "Todas as alternativas anteriores"],
    "correctAnswer": "Todas as alternativas anteriores",
    "subject": "JavaScript"
  },
  {
    "id": "js144",
    "descricao": "O que o `this` se refere em um 'event listener' anexado a um elemento, quando a função de callback não é uma arrow function?",
    "alternativas": ["O objeto `window`", "O objeto `document`", "O próprio elemento que disparou o evento", "`undefined`"],
    "correctAnswer": "O próprio elemento que disparou o evento",
    "subject": "JavaScript"
  },
  {
    "id": "js145",
    "descricao": "O que é 'composição de funções'?",
    "alternativas": ["Uma forma de combinar duas ou mais funções para que a saída de uma seja a entrada da próxima", "Criar funções dentro de outras funções", "Um erro de sintaxe", "Dividir uma função em partes menores"],
    "correctAnswer": "Uma forma de combinar duas ou mais funções para que a saída de uma seja a entrada da próxima",
    "subject": "JavaScript"
  },
  {
    "id": "js146",
    "descricao": "Qual o valor da propriedade `length` de uma string vazia `''`?",
    "alternativas": ["`undefined`", "`null`", "0", "1"],
    "correctAnswer": "0",
    "subject": "JavaScript"
  },
  {
    "id": "js147",
    "descricao": "O que o `Array.prototype.flat()` faz?",
    "alternativas": ["Cria um novo array com todos os elementos de sub-arrays concatenados nele recursivamente até uma profundidade especificada", "Deixa o array mais rápido", "Ordena o array", "Inverte o array"],
    "correctAnswer": "Cria um novo array com todos os elementos de sub-arrays concatenados nele recursivamente até uma profundidade especificada",
    "subject": "JavaScript"
  },
  {
    "id": "js148",
    "descricao": "O que é o 'shadow DOM'?",
    "alternativas": ["Uma cópia oculta do DOM principal", "Uma tecnologia da web para encapsular HTML e CSS (estilo e marcação) em um componente web", "Um erro de renderização", "Uma API para temas escuros"],
    "correctAnswer": "Uma tecnologia da web para encapsular HTML e CSS (estilo e marcação) em um componente web",
    "subject": "JavaScript"
  },
  {
    "id": "js149",
    "descricao": "Qual o propósito dos 'Web Workers'?",
    "alternativas": ["Executar scripts em segundo plano em uma thread separada, para que tarefas computacionalmente intensivas não bloqueiem a interface do usuário", "Substituir o 'Event Loop'", "Animar elementos da página", "Gerenciar o armazenamento local"],
    "correctAnswer": "Executar scripts em segundo plano em uma thread separada, para que tarefas computacionalmente intensivas não bloqueiem a interface do usuário",
    "subject": "JavaScript"
  },
  {
    "id": "js150",
    "descricao": "Qual o resultado de `'a' > 'b'`?",
    "alternativas": ["`true`", "`false`", "`undefined`", "`SyntaxError`"],
    "correctAnswer": "`false`",
    "subject": "JavaScript"
  },
  {
    "id": "js151",
    "descricao": "O que é 'memoization'?",
    "alternativas": ["Uma técnica de otimização que armazena os resultados de chamadas de função custosas e retorna o resultado em cache quando a mesma entrada ocorre novamente", "A capacidade de uma função de lembrar de seu escopo léxico", "Um tipo de erro de memória", "Uma forma de escrever código que se auto-corrige"],
    "correctAnswer": "Uma técnica de otimização que armazena os resultados de chamadas de função custosas e retorna o resultado em cache quando a mesma entrada ocorre novamente",
    "subject": "JavaScript"
  },
  {
    "id": "js152",
    "descricao": "Qual é a diferença entre um 'statement' (instrução) e uma 'expression' (expressão) em JavaScript?",
    "alternativas": ["Não há diferença", "Uma expressão produz um valor, uma instrução realiza uma ação", "Uma instrução sempre termina com ponto e vírgula", "Uma expressão só pode conter operadores matemáticos"],
    "correctAnswer": "Uma expressão produz um valor, uma instrução realiza uma ação",
    "subject": "JavaScript"
  },
  {
    "id": "js153",
    "descricao": "Qual dos seguintes é um exemplo de uma expressão em JavaScript?",
    "alternativas": ["`let x = 10;`", "`if (x > 5) {}`", "`5 + 5`", "`for (let i=0; i<5; i++) {}`"],
    "correctAnswer": "`5 + 5`",
    "subject": "JavaScript"
  },
  {
    "id": "js154",
    "descricao": "O que `Array.prototype.find()` retorna se nenhum elemento satisfaz a condição?",
    "alternativas": ["`null`", "`false`", "`undefined`", "Um erro"],
    "correctAnswer": "`undefined`",
    "subject": "JavaScript"
  },
  {
    "id": "js155",
    "descricao": "Como você acessa o valor de uma propriedade de objeto que contém um hífen (ex: `my-prop`)?",
    "alternativas": ["`obj.my-prop`", "`obj['my-prop']`", "`obj(my-prop)`", "Não é possível"],
    "correctAnswer": "`obj['my-prop']`",
    "subject": "JavaScript"
  },
  {
    "id": "js156",
    "descricao": "O que `void 0` retorna?",
    "alternativas": ["`0`", "`null`", "`undefined`", "`NaN`"],
    "correctAnswer": "`undefined`",
    "subject": "JavaScript"
  },
  {
    "id": "js157",
    "descricao": "Qual o propósito do 'strict mode' (`'use strict'`)?",
    "alternativas": ["Torna o JavaScript mais permissivo", "Altera a sintaxe para ser mais semelhante a outras linguagens", "Opta por uma variante restrita do JavaScript, eliminando alguns erros silenciosos e lançando mais exceções", "Aumenta o desempenho"],
    "correctAnswer": "Opta por uma variante restrita do JavaScript, eliminando alguns erros silenciosos e lançando mais exceções",
    "subject": "JavaScript"
  },
  {
    "id": "js158",
    "descricao": "O que é 'type coercion' (coerção de tipo)?",
    "alternativas": ["Um erro que ocorre quando os tipos não correspondem", "A conversão automática de um valor de um tipo de dado para outro", "A definição explícita do tipo de uma variável", "Uma técnica para evitar erros de tipo"],
    "correctAnswer": "A conversão automática de um valor de um tipo de dado para outro",
    "subject": "JavaScript"
  },
  {
    "id": "js159",
    "descricao": "Qual o resultado de `1 < 2 < 3`?",
    "alternativas": ["`true`", "`false`", "`SyntaxError`", "`1`"],
    "correctAnswer": "`true`",
    "subject": "JavaScript"
  },
  {
    "id": "js160",
    "descricao": "Qual o resultado de `3 > 2 > 1`?",
    "alternativas": ["`true`", "`false`", "`SyntaxError`", "`1`"],
    "correctAnswer": "`false`",
    "subject": "JavaScript"
  },
  {
    "id": "js161",
    "descricao": "Qual método de string é usado para extrair os caracteres de uma string entre dois índices especificados?",
    "alternativas": ["`slice()`", "`split()`", "`substr()`", "`get()`"],
    "correctAnswer": "`slice()`",
    "subject": "JavaScript"
  },
  {
    "id": "js162",
    "descricao": "Qual o propósito do método `Object.entries(obj)`?",
    "alternativas": ["Retornar um array com as chaves de `obj`", "Retornar um array com os valores de `obj`", "Retornar um array contendo pares `[chave, valor]` para cada propriedade enumerável de `obj`", "Verificar se `obj` está vazio"],
    "correctAnswer": "Retornar um array contendo pares `[chave, valor]` para cada propriedade enumerável de `obj`",
    "subject": "JavaScript"
  },
  {
    "id": "js163",
    "descricao": "O que é 'tree shaking' no contexto de bundlers como Webpack ou Rollup?",
    "alternativas": ["Uma animação de CSS", "Uma técnica de eliminação de código morto (dead-code elimination) para remover código não utilizado de um bundle", "Uma forma de depurar código", "Um erro de compilação"],
    "correctAnswer": "Uma técnica de eliminação de código morto (dead-code elimination) para remover código não utilizado de um bundle",
    "subject": "JavaScript"
  },
  {
    "id": "js164",
    "descricao": "Qual método de objeto cria um novo objeto com a cadeia de protótipos e propriedades especificadas?",
    "alternativas": ["`Object.new()`", "`Object.create()`", "`Object.build()`", "`Object.assign()`"],
    "correctAnswer": "`Object.create()`",
    "subject": "JavaScript"
  },
  {
    "id": "js165",
    "descricao": "Qual dos seguintes operadores tem a maior precedência?",
    "alternativas": ["`*` (multiplicação)", "`+` (adição)", "`=` (atribuição)", "`()` (agrupamento)"],
    "correctAnswer": "`()` (agrupamento)",
    "subject": "JavaScript"
  },
  {
    "id": "js166",
    "descricao": "O que `window.requestAnimationFrame()` é usado para?",
    "alternativas": ["Fazer requisições de rede", "Dizer ao navegador que você deseja realizar uma animação e solicita que o navegador agende um redesenho da janela para o próximo quadro de animação", "Executar uma função após um atraso", "Acessar o sistema de arquivos"],
    "correctAnswer": "Dizer ao navegador que você deseja realizar uma animação e solicita que o navegador agende um redesenho da janela para o próximo quadro de animação",
    "subject": "JavaScript"
  },
  {
    "id": "js167",
    "descricao": "Qual é a principal diferença entre `==` e `Object.is()`?",
    "alternativas": ["Não há diferença", "`Object.is()` não faz coerção de tipo, assim como `===`", "`Object.is()` trata `+0` e `-0` como diferentes, e `NaN` como igual a `NaN`", "B e C estão corretas"],
    "correctAnswer": "B e C estão corretas",
    "subject": "JavaScript"
  },
  {
    "id": "js168",
    "descricao": "O que é `RegExp` em JavaScript?",
    "alternativas": ["Um novo tipo de variável", "Um objeto usado para corresponder padrões de texto com expressões regulares", "Uma função para registrar eventos", "Um erro regular"],
    "correctAnswer": "Um objeto usado para corresponder padrões de texto com expressões regulares",
    "subject": "JavaScript"
  },
  {
    "id": "js169",
    "descricao": "Qual flag em uma expressão regular a torna 'case-insensitive' (sem diferenciar maiúsculas e minúsculas)?",
    "alternativas": ["`g` (global)", "`m` (multiline)", "`i` (ignore case)", "`s` (single line)"],
    "correctAnswer": "`i` (ignore case)",
    "subject": "JavaScript"
  },
  {
    "id": "js170",
    "descricao": "O que `localStorage.setItem('key', 'value')` faz?",
    "alternativas": ["Obtém um item do localStorage", "Adiciona ou atualiza um par chave/valor no localStorage", "Remove um item do localStorage", "Limpa todo o localStorage"],
    "correctAnswer": "Adiciona ou atualiza um par chave/valor no localStorage",
    "subject": "JavaScript"
  },
  {
    "id": "js171",
    "descricao": "Qual é um dos principais casos de uso para a estrutura de dados `Map` em vez de um Objeto simples?",
    "alternativas": ["`Map` é mais rápido para acesso a propriedades", "As chaves de um `Map` podem ser de qualquer tipo (incluindo objetos e funções), não apenas strings ou símbolos", "`Map` mantém a ordem de inserção dos elementos", "B e C estão corretas"],
    "correctAnswer": "B e C estão corretas",
    "subject": "JavaScript"
  },
  {
    "id": "js172",
    "descricao": "Qual é a saída de `('b' + 'a' + + 'a' + 'a').toLowerCase()`?",
    "alternativas": ["`banana`", "`'ba' + NaN + 'a'`", "`banaa`", "`banan`"],
    "correctAnswer": "`banana`",
    "subject": "JavaScript"
  },
  {
    "id": "js173",
    "descricao": "O que são 'Web Components'?",
    "alternativas": ["Componentes pré-construídos em bibliotecas como React ou Vue", "Um conjunto de tecnologias da web que permitem criar elementos personalizados reutilizáveis e encapsulados", "Arquivos JavaScript que podem ser compartilhados entre projetos", "Um padrão de design para construir interfaces de usuário"],
    "correctAnswer": "Um conjunto de tecnologias da web que permitem criar elementos personalizados reutilizáveis e encapsulados",
    "subject": "JavaScript"
  },
  {
    "id": "js174",
    "descricao": "Qual é a principal desvantagem do uso de `var` em vez de `let`?",
    "alternativas": ["`var` não pode ser reatribuído", "`var` tem escopo de função (ou global), o que pode levar a comportamentos inesperados (hoisting, sobrescrita de variáveis)", "`var` é mais lento", "`var` não é suportado em navegadores modernos"],
    "correctAnswer": "`var` tem escopo de função (ou global), o que pode levar a comportamentos inesperados (hoisting, sobrescrita de variáveis)",
    "subject": "JavaScript"
  },
  {
    "id": "js175",
    "descricao": "Como você pode converter uma `NodeList` em um `Array`?",
    "alternativas": ["`Array.from(nodeList)`", "`[...nodeList]`", "`Array.prototype.slice.call(nodeList)`", "Todas as alternativas anteriores"],
    "correctAnswer": "Todas as alternativas anteriores",
    "subject": "JavaScript"
  },
  {
    "id": "js176",
    "descricao": "O que o método `some()` faz em um array?",
    "alternativas": ["Testa se pelo menos um elemento no array passa no teste implementado pela função fornecida", "Testa se todos os elementos passam no teste", "Retorna a soma de todos os elementos", "Encontra um elemento específico"],
    "correctAnswer": "Testa se pelo menos um elemento no array passa no teste implementado pela função fornecida",
    "subject": "JavaScript"
  },
  {
    "id": "js177",
    "descricao": "Qual o valor da propriedade `name` de uma função anônima?",
    "alternativas": ["`'anonymous'`", "`'function'`", "Uma string vazia (`''`)", "`undefined`"],
    "correctAnswer": "Uma string vazia (`''`)",
    "subject": "JavaScript"
  },
  {
    "id": "js178",
    "descricao": "O que o operador `%` (módulo) faz?",
    "alternativas": ["Calcula a porcentagem", "Retorna o resto da divisão inteira", "Divide dois números", "Eleva um número a uma potência"],
    "correctAnswer": "Retorna o resto da divisão inteira",
    "subject": "JavaScript"
  },
  {
    "id": "js179",
    "descricao": "O que `document.cookie` retorna?",
    "alternativas": ["Um objeto com todos os cookies", "Um array de cookies", "Uma única string contendo todos os cookies para aquele documento", "O último cookie definido"],
    "correctAnswer": "Uma única string contendo todos os cookies para aquele documento",
    "subject": "JavaScript"
  },
  {
    "id": "js180",
    "descricao": "Em JavaScript, o que é uma 'high-order function' (função de ordem superior)?",
    "alternativas": ["Uma função que é mais eficiente que outras", "Uma função que aceita outra função como argumento, retorna uma função, ou ambas", "Uma função declarada com a palavra-chave `class`", "Uma função que só pode ser usada no topo do arquivo"],
    "correctAnswer": "Uma função que aceita outra função como argumento, retorna uma função, ou ambas",
    "subject": "JavaScript"
  },
  {
    "id": "js181",
    "descricao": "Qual método de `Math` é usado para arredondar um número para o inteiro mais próximo?",
    "alternativas": ["`Math.ceil()`", "`Math.floor()`", "`Math.round()`", "`Math.trunc()`"],
    "correctAnswer": "`Math.round()`",
    "subject": "JavaScript"
  },
  {
    "id": "js182",
    "descricao": "Qual método de `Math` arredonda um número para cima para o próximo inteiro maior?",
    "alternativas": ["`Math.ceil()`", "`Math.floor()`", "`Math.round()`", "`Math.up()`"],
    "correctAnswer": "`Math.ceil()`",
    "subject": "JavaScript"
  },
  {
    "id": "js183",
    "descricao": "Qual o propósito do `...` quando usado em um literal de objeto: `const newObj = { ...oldObj };`?",
    "alternativas": ["É um erro de sintaxe", "Cria um novo objeto copiando as propriedades enumeráveis de `oldObj` (cópia rasa)", "Cria uma referência para `oldObj`", "Adiciona `oldObj` como um protótipo para `newObj`"],
    "correctAnswer": "Cria um novo objeto copiando as propriedades enumeráveis de `oldObj` (cópia rasa)",
    "subject": "JavaScript"
  },
  {
    "id": "js184",
    "descricao": "Qual o valor de `[1, 2, 3].map(parseInt)`?",
    "alternativas": ["`[1, 2, 3]`", "`[1, NaN, NaN]`", "`[1, 1, 2]`", "`[1, 2, 2]`"],
    "correctAnswer": "`[1, NaN, NaN]`",
    "subject": "JavaScript"
  },
  {
    "id": "js185",
    "descricao": "Qual o propósito do operador `instanceof`?",
    "alternativas": ["Verificar se um objeto é uma instância de uma determinada classe ou função construtora", "Criar uma nova instância de um objeto", "Comparar duas instâncias", "Copiar uma instância"],
    "correctAnswer": "Verificar se um objeto é uma instância de uma determinada classe ou função construtora",
    "subject": "JavaScript"
  },
  {
    "id": "js186",
    "descricao": "O que o método `at()` faz em um array ou string?",
    "alternativas": ["Encontra um elemento em um índice específico, permitindo índices negativos para contar a partir do final", "Substitui um elemento em um índice", "Adiciona um elemento em um índice", "Verifica a presença de um elemento"],
    "correctAnswer": "Encontra um elemento em um índice específico, permitindo índices negativos para contar a partir do final",
    "subject": "JavaScript"
  },
  {
    "id": "js187",
    "descricao": "Como você pode evitar que o valor de `this` mude em uma função de callback?",
    "alternativas": ["Usando uma arrow function", "Usando o método `bind()`", "Armazenando o `this` em uma variável (ex: `const self = this;`)", "Todas as alternativas anteriores"],
    "correctAnswer": "Todas as alternativas anteriores",
    "subject": "JavaScript"
  },
  {
    "id": "js188",
    "descricao": "O que é 'JSX'?",
    "alternativas": ["Uma versão do JavaScript", "Uma extensão de sintaxe para JavaScript, popularizada pelo React, que permite escrever marcação semelhante a HTML em arquivos JavaScript", "Um novo tipo de dado", "Um formato de arquivo de imagem"],
    "correctAnswer": "Uma extensão de sintaxe para JavaScript, popularizada pelo React, que permite escrever marcação semelhante a HTML em arquivos JavaScript",
    "subject": "JavaScript"
  },
  {
    "id": "js189",
    "descricao": "O que o `Promise.finally(callback)` faz?",
    "alternativas": ["Executa o callback apenas se a Promise for resolvida", "Executa o callback apenas se a Promise for rejeitada", "Executa o callback quando a Promise é estabelecida (resolvida ou rejeitada)", "É um sinônimo para `.then()`"],
    "correctAnswer": "Executa o callback quando a Promise é estabelecida (resolvida ou rejeitada)",
    "subject": "JavaScript"
  },
  {
    "id": "js190",
    "descricao": "O que `BigInt` representa em JavaScript?",
    "alternativas": ["Um tipo numérico primitivo que pode representar inteiros com precisão arbitrária", "Uma forma de tornar os números mais rápidos", "Um objeto para cálculos matemáticos complexos", "Um sinônimo para `Number`"],
    "correctAnswer": "Um tipo numérico primitivo que pode representar inteiros com precisão arbitrária",
    "subject": "JavaScript"
  },
  {
    "id": "js191",
    "descricao": "Qual o propósito do `Proxy` em JavaScript?",
    "alternativas": ["Fazer requisições de rede através de um servidor proxy", "Criar um objeto que envolve outro objeto ('target') e permite interceptar e redefinir operações fundamentais para o target", "Otimizar o uso de memória", "Proteger o código contra injeção de scripts"],
    "correctAnswer": "Criar um objeto que envolve outro objeto ('target') e permite interceptar e redefinir operações fundamentais para o target",
    "subject": "JavaScript"
  },
  {
    "id": "js192",
    "descricao": "Qual é a principal diferença entre escopo de bloco (`let`/`const`) e escopo de função (`var`)?",
    "alternativas": ["Não há diferença", "Escopo de bloco é limitado ao bloco (`{...}`) onde a variável foi declarada, enquanto escopo de função é limitado à função", "Escopo de função é mais restrito", "Escopo de bloco é obsoleto"],
    "correctAnswer": "Escopo de bloco é limitado ao bloco (`{...}`) onde a variável foi declarada, enquanto escopo de função é limitado à função",
    "subject": "JavaScript"
  },
  {
    "id": "js193",
    "descricao": "O que o `Object.seal(obj)` faz?",
    "alternativas": ["Impede a adição de novas propriedades e marca todas as existentes como não configuráveis, mas os valores podem ser alterados", "Congela o objeto completamente", "Apenas impede a adição de novas propriedades", "Remove o protótipo do objeto"],
    "correctAnswer": "Impede a adição de novas propriedades e marca todas as existentes como não configuráveis, mas os valores podem ser alterados",
    "subject": "JavaScript"
  },
  {
    "id": "js194",
    "descricao": "O que é 'Shallow Copy' (Cópia Rasa) de um objeto?",
    "alternativas": ["Uma cópia onde as propriedades aninhadas são também copiadas recursivamente", "Uma cópia onde as propriedades de primeiro nível são copiadas, mas as propriedades aninhadas são compartilhadas por referência", "Uma cópia exata bit a bit", "Uma referência ao objeto original"],
    "correctAnswer": "Uma cópia onde as propriedades de primeiro nível são copiadas, mas as propriedades aninhadas são compartilhadas por referência",
    "subject": "JavaScript"
  },
  {
    "id": "js195",
    "descricao": "O que é 'Deep Copy' (Cópia Profunda) de um objeto?",
    "alternativas": ["Uma cópia onde as propriedades de primeiro nível são copiadas por referência", "Uma referência ao objeto original", "Uma cópia onde todas as propriedades, incluindo as aninhadas, são duplicadas recursivamente, sem compartilhar referências", "Um sinônimo para Shallow Copy"],
    "correctAnswer": "Uma cópia onde todas as propriedades, incluindo as aninhadas, são duplicadas recursivamente, sem compartilhar referências",
    "subject": "JavaScript"
  },
  {
    "id": "js196",
    "descricao": "Qual o resultado de `null == undefined`?",
    "alternativas": ["`true`", "`false`", "`TypeError`", "`0`"],
    "correctAnswer": "`true`",
    "subject": "JavaScript"
  },
  {
    "id": "js197",
    "descricao": "Qual o resultado de `null === undefined`?",
    "alternativas": ["`true`", "`false`", "`TypeError`", "`0`"],
    "correctAnswer": "`false`",
    "subject": "JavaScript"
  },
  {
    "id": "js198",
    "descricao": "O que a palavra-chave `export` faz em um módulo ES6?",
    "alternativas": ["Importa código de outro módulo", "Torna variáveis, funções ou classes disponíveis para serem importadas por outros módulos", "Executa o módulo", "Oculta o código do escopo global"],
    "correctAnswer": "Torna variáveis, funções ou classes disponíveis para serem importadas por outros módulos",
    "subject": "JavaScript"
  },
  {
    "id": "js199",
    "descricao": "O que é um 'polyfill'?",
    "alternativas": ["Uma ferramenta para formatar código", "Um pedaço de código (geralmente JavaScript na web) usado para fornecer funcionalidade moderna em navegadores mais antigos que não a suportam nativamente", "Um tipo de estrutura de dados", "Um padrão de projeto para criar objetos"],
    "correctAnswer": "Um pedaço de código (geralmente JavaScript na web) usado para fornecer funcionalidade moderna em navegadores mais antigos que não a suportam nativamente",
    "subject": "JavaScript"
  },
  {
    "id": "js200",
    "descricao": "O que `Array.prototype.includes()` oferece de vantagem sobre `Array.prototype.indexOf()`?",
    "alternativas": ["É mais rápido", "`includes()` consegue encontrar o valor `NaN` em um array, enquanto `indexOf()` não", "Pode procurar por objetos e arrays", "Não há vantagem"],
    "correctAnswer": "`includes()` consegue encontrar o valor `NaN` em um array, enquanto `indexOf()` não",
    "subject": "JavaScript"
  }

  

];

module.exports = { javascriptQuestions };