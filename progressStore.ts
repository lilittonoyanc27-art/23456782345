import { MistakeRecord, TimestampMap, UserProgress } from './types';

const PROGRESS_KEY = 'cambio_dolor_progress_v1';
const TIMESTAMPS_KEY = 'cambio_dolor_timestamps_v1';
const ESCUCHA_CLIPS_KEY = 'cambio_dolor_escucha_clips_v1';

export const DEFAULT_PROGRESS: UserProgress = {
  points: 0,
  learnedVocabIds: [],
  reviewVocabIds: [],
  completedGrammarIds: [],
  singCompletedLineIds: [],
  completedEscuchaIds: [],
  conversationPracticedIds: [],
  quizBestPercent: 0,
  quizAttempts: 0,
  gameScores: {},
  mistakes: [],
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      gameScores: parsed.gameScores ?? {},
      mistakes: Array.isArray(parsed.mistakes) ? parsed.mistakes : [],
      learnedVocabIds: Array.isArray(parsed.learnedVocabIds) ? parsed.learnedVocabIds : [],
      reviewVocabIds: Array.isArray(parsed.reviewVocabIds) ? parsed.reviewVocabIds : [],
      completedGrammarIds: Array.isArray(parsed.completedGrammarIds) ? parsed.completedGrammarIds : [],
      singCompletedLineIds: Array.isArray(parsed.singCompletedLineIds) ? parsed.singCompletedLineIds : [],
      completedEscuchaIds: Array.isArray(parsed.completedEscuchaIds) ? parsed.completedEscuchaIds : [],
      conversationPracticedIds: Array.isArray(parsed.conversationPracticedIds) ? parsed.conversationPracticedIds : [],
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage quota issues safely
  }
}

export function clearProgress(): UserProgress {
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch {
    // Ignore
  }
  return { ...DEFAULT_PROGRESS };
}

export function loadTimestamps(): TimestampMap {
  try {
    const raw = localStorage.getItem(TIMESTAMPS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as TimestampMap;
  } catch {
    return {};
  }
}

export function saveTimestamps(map: TimestampMap): void {
  try {
    localStorage.setItem(TIMESTAMPS_KEY, JSON.stringify(map));
  } catch {
    // Ignore
  }
}

export function clearTimestamps(): TimestampMap {
  try {
    localStorage.removeItem(TIMESTAMPS_KEY);
  } catch {
    // Ignore
  }
  return {};
}

export function loadEscuchaClips(): TimestampMap {
  try {
    const raw = localStorage.getItem(ESCUCHA_CLIPS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as TimestampMap;
  } catch {
    return {};
  }
}

export function saveEscuchaClips(map: TimestampMap): void {
  try {
    localStorage.setItem(ESCUCHA_CLIPS_KEY, JSON.stringify(map));
  } catch {
    // Ignore
  }
}

export function appendMistake(
  current: MistakeRecord[],
  mistake: Omit<MistakeRecord, 'id' | 'timestamp'>
): MistakeRecord[] {
  const exists = current.find(
    (m) => m.promptEs === mistake.promptEs && m.correctAnswer === mistake.correctAnswer
  );
  if (exists) {
    return current.map((m) =>
      m.id === exists.id ? { ...m, chosenAnswer: mistake.chosenAnswer, timestamp: Date.now() } : m
    );
  }
  const next: MistakeRecord = {
    ...mistake,
    id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
  };
  return [next, ...current].slice(0, 60);
}

export function formatTime(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || Number.isNaN(seconds) || seconds < 0) {
    return '--:--';
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const tenths = Math.floor((seconds - Math.floor(seconds)) * 10);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${tenths}`;
}
