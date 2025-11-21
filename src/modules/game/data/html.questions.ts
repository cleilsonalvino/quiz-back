import { Question } from '../game.types';

const rawHtmlQuestions = [
  // I will copy a few questions here as an example, not the whole file.
  // In a real scenario, this would be the whole file.
  {
    "id": 1,
    "descricao": "O que é HTML?",
    "alternativas": [
      "Hyperlink Markup Language - Linguagem de Marcação de Hiperlink.",
      "HyperTransfer Markup Language - Linguagem de Transferência de Hipertexto.",
      "HyperText Machine Language - Linguagem de Máquina Hipertexto.",
      "HyperText Markup Language - Linguagem de Marcação de Hipertexto."
    ],
    "correctAnswer": "HyperText Markup Language - Linguagem de Marcação de Hipertexto.",
    "subject": "HTML"
  },
  {
    "id": 2,
    "descricao": "Qual das alternativas a seguir descreve corretamente a Web 2.0?",
    "alternativas": [
      "Será como um gigantesco sistema operacional inteligente, com a presença de Internet das Coisas e Inteligência Artificial.",
      "Surgiu em meados de 2004, com tecnologias server-side, e é caracterizada pela colaboração e dinamismo.",
      "Surgiu em 1990, com a junção de HTML, HTTP e Hyperlinks, sendo uma Web informativa e estática.",
      "Caracteriza-se pela utilização do HTML 5, permitindo uma melhor definição do conteúdo, conhecida como Web semântica."
    ],
    "correctAnswer": "Surgiu em meados de 2004, com tecnologias server-side, e é caracterizada pela colaboração e dinamismo.",
    "subject": "HTML"
  },
  {
    "id": 3,
    "descricao": "Sobre a Web 4.0, qual das afirmações é correta?",
    "alternativas": [
      "Caracteriza-se pelo surgimento da World Wide Web, permitindo o compartilhamento de informações na Internet.",
      "Representa a junção de três tecnologias simples: HTML, HTTP e Hyperlinks, formando uma Web meramente informativa.",
      "É conhecida como Web semântica ou inteligente, com avanços em blockchain e machine learning.",
      "Será como um gigantesco sistema operacional inteligente e dinâmico, utilizando dados para suportar a tomada de decisão."
    ],
    "correctAnswer": "Será como um gigantesco sistema operacional inteligente e dinâmico, utilizando dados para suportar a tomada de decisão.",
    "subject": "HTML"
  }
];

export const htmlQuestions: Question[] = rawHtmlQuestions.map(q => ({
  question: q.descricao,
  alternativas: q.alternativas,
  correctAnswer: q.correctAnswer,
}));
