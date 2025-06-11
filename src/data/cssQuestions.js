// data/cssQuestions.js

const cssQuestions = [
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
  // Adicione mais perguntas de CSS aqui
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
    "alternativas": ["text-align: center;", "align: center;", "margin: auto;", "padding: center;"],
    "correctAnswer": "margin: auto;",
    "subject": "CSS"
  },
  {
    "id": "css5",
    "descricao": "Qual propriedade CSS controla o espaçamento entre as letras de um texto?",
    "alternativas": ["word-spacing", "line-height", "letter-spacing", "text-indent"],
    "correctAnswer": "letter-spacing",
    "subject": "CSS"
  }
];

module.exports = { cssQuestions };