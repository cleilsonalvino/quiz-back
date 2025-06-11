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
    }
];

module.exports = { javascriptQuestions };