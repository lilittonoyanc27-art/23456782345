export type TabId =
  | 'inicio'
  | 'video'
  | 'letra'
  | 'cantando'
  | 'analisis'
  | 'gramatica'
  | 'vocabulario'
  | 'conversacion'
  | 'escucha'
  | 'quiz'
  | 'juegos'
  | 'progreso';

export type SectionKey = 'verso1' | 'coro1' | 'instrumental' | 'verso2' | 'coro2' | 'corofinal';

export interface WordNote {
  word: string;
  hy: string;
  noteHy: string;
}

export interface LyricLine {
  id: string;
  order: number;
  section: SectionKey;
  sectionLabel: string;
  isInstrumental?: boolean;
  es: string;
  hy: string;
  meaningEs: string;
  meaningHy: string;
  words: WordNote[];
  grammarEs: string;
  grammarHy: string;
  grammarTopicId?: string;
}

export interface LineTimestamp {
  start: number | null;
  end: number | null;
}

export type TimestampMap = Record<string, LineTimestamp>;

export interface ConjugationRow {
  pronoun: string;
  forms: string[];
}

export interface ConjugationTable {
  titleEs: string;
  titleHy: string;
  headers: string[];
  rows: ConjugationRow[];
}

export interface GrammarExample {
  es: string;
  hy: string;
}

export interface GrammarPracticeItem {
  id: string;
  promptEs: string;
  promptHy: string;
  options: string[];
  optionsHy: string[];
  correctIndex: number;
  explanationHy: string;
}

export interface GrammarTopic {
  id: string;
  number: number;
  titleEs: string;
  titleHy: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  songQuote: string;
  songQuoteHy: string;
  explanationHy: string;
  whyThisFormHy: string;
  examples: GrammarExample[];
  conjugationTable?: ConjugationTable;
  practice: GrammarPracticeItem[];
}

export interface VocabItem {
  id: string;
  es: string;
  partOfSpeech: string;
  hy: string;
  contextMeaningHy: string;
  exampleEs: string;
  exampleHy: string;
  songLineRef: string;
}

export interface ConversationQuestion {
  id: string;
  level: 'A1–A2' | 'B1' | 'B2';
  topicEs: string;
  topicHy: string;
  es: string;
  hy: string;
  sampleEs: string;
  sampleHy: string;
}

export type QuizCategory =
  | 'Comprensión'
  | 'Gramática'
  | 'Vocabulario'
  | 'Traducción'
  | 'Expresiones'
  | 'Escucha';

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  topicRef: string;
  questionEs: string;
  questionHy: string;
  relatedLineId?: string;
  options: string[];
  optionsHy?: string[];
  correctIndex: number;
  explanationHy: string;
}

export interface MistakeRecord {
  id: string;
  source: string;
  promptEs: string;
  chosenAnswer: string;
  correctAnswer: string;
  topicRef: string;
  explanationHy: string;
  timestamp: number;
}

export interface GameScoreRecord {
  played: number;
  bestScore: number;
  completed: boolean;
}

export interface ListeningExercise {
  id: string;
  type:
    | 'word'
    | 'restore'
    | 'translation'
    | 'tense'
    | 'order'
    | 'difference';
  typeLabelEs: string;
  typeLabelHy: string;
  lineId: string;
  instructionEs: string;
  instructionHy: string;
  promptEs?: string;
  options?: string[];
  correctOption?: string;
  orderedTokens?: string[];
  diffPair?: [string, string];
  explanationHy: string;
}

export interface UserProgress {
  points: number;
  learnedVocabIds: string[];
  reviewVocabIds: string[];
  completedGrammarIds: string[];
  singCompletedLineIds: string[];
  completedEscuchaIds: string[];
  conversationPracticedIds: string[];
  quizBestPercent: number;
  quizAttempts: number;
  gameScores: Record<string, GameScoreRecord>;
  mistakes: MistakeRecord[];
}
