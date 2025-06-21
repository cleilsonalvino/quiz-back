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

  

];

module.exports = { javascriptQuestions };