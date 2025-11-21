import { Question } from '../game.types';
import { htmlQuestions } from './html.questions';
// Other question files will be imported and exported here

export const allQuestions: { [key: string]: Question[] } = {
  HTML: htmlQuestions,
  // CSS: cssQuestions,
  // ...
};

export const getQuestionsByCategory = (category: string): Question[] => {
  return allQuestions[category] || allQuestions['HTML']; // Fallback to HTML
};
