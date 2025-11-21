export interface Player {
  id: string;
  username: string;
  socketId: string;
  score: number;
  hasAnswered: boolean;
  isBot: boolean;
  isReady: boolean;
}

export interface Question {
  question: string;
  alternativas: string[];
  correctAnswer: string;
}

export interface GameConfig {
  category: string;
  numQuestions: number;
  quizTime: number;
}

export interface Game {
  id: string;
  config: GameConfig;
  players: Player[];
  questions: Question[];
  currentQuestionIndex: number;
  questionTimer: NodeJS.Timeout | null;
  isFinished: boolean;
}
