import React, { useCallback, useEffect, useState } from 'react';
import {
  Award,
  BookOpen,
  FileText,
  Gamepad2,
  Headphones,
  Home,
  Layers,
  Menu,
  MessageCircle,
  Mic,
  PlayCircle,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import { AnalysisView } from './AnalysisView';
import { ConversationView } from './ConversationView';
import { EscuchaView } from './EscuchaView';
import { GamesView } from './GamesView';
import { GrammarView } from './GrammarView';
import { HomeView } from './HomeView';
import { LyricsView } from './LyricsView';
import {
  appendMistake,
  clearProgress,
  clearTimestamps,
  loadEscuchaClips,
  loadProgress,
  loadTimestamps,
  saveEscuchaClips,
  saveProgress,
  saveTimestamps,
} from './progressStore';
import { ProgressView } from './ProgressView';
import { QuizView } from './QuizView';
import { SingLearnView } from './SingLearnView';
import { MistakeRecord, TabId, TimestampMap, UserProgress } from './types';
import { VocabView } from './VocabView';
import { YouTubePlayerView } from './YouTubePlayer';

interface NavItem {
  id: TabId;
  labelEs: string;
  labelHy: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'inicio', labelEs: 'Inicio', labelHy: 'Սկիզբ', icon: <Home className="w-4 h-4" /> },
  {
    id: 'video',
    labelEs: 'Vídeo y subtítulos',
    labelHy: 'Տեսանյութ',
    icon: <PlayCircle className="w-4 h-4" />,
  },
  {
    id: 'letra',
    labelEs: 'Letra y traducción',
    labelHy: 'Տեքստ',
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: 'cantando',
    labelEs: 'Aprende cantando',
    labelHy: 'Երգելով',
    icon: <Mic className="w-4 h-4" />,
  },
  {
    id: 'analisis',
    labelEs: 'Análisis',
    labelHy: 'Վերլուծություն',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 'gramatica',
    labelEs: 'Gramática',
    labelHy: 'Քերականություն',
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    id: 'vocabulario',
    labelEs: 'Vocabulario',
    labelHy: 'Բառապաշար',
    icon: <Layers className="w-4 h-4" />,
  },
  {
    id: 'conversacion',
    labelEs: 'Conversación',
    labelHy: 'Խոսակցական',
    icon: <MessageCircle className="w-4 h-4" />,
  },
  {
    id: 'escucha',
    labelEs: 'Escucha',
    labelHy: 'Լսողություն',
    icon: <Headphones className="w-4 h-4" />,
  },
  { id: 'quiz', labelEs: 'Quiz', labelHy: 'Վիկտորինա', icon: <Trophy className="w-4 h-4" /> },
  { id: 'juegos', labelEs: 'Juegos', labelHy: 'Խաղեր', icon: <Gamepad2 className="w-4 h-4" /> },
  {
    id: 'progreso',
    labelEs: 'Mi progreso',
    labelHy: 'Առաջընթաց',
    icon: <Award className="w-4 h-4" />,
  },
];

const TOP_QUICK_LINKS: { id: TabId; label: string }[] = [
  { id: 'video', label: 'Vídeo' },
  { id: 'letra', label: 'Letra' },
  { id: 'gramatica', label: 'Gramática' },
  { id: 'juegos', label: 'Juegos' },
  { id: 'progreso', label: 'Progreso' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [progress, setProgress] = useState<UserProgress>(() => loadProgress());
  const [timestamps, setTimestamps] = useState<TimestampMap>(() => loadTimestamps());
  const [escuchaClips, setEscuchaClips] = useState<TimestampMap>(() => loadEscuchaClips());

  const [jumpToLineId, setJumpToLineId] = useState<string | null>(null);
  const [grammarFocusId, setGrammarFocusId] = useState<string | null>(null);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const navigate = useCallback((tab: TabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleJumpToVideo = useCallback(
    (lineId: string) => {
      setJumpToLineId(lineId);
      navigate('video');
    },
    [navigate]
  );

  const handleOpenGrammarTopic = useCallback(
    (topicId: string) => {
      setGrammarFocusId(topicId);
      navigate('gramatica');
    },
    [navigate]
  );

  const handleUpdateTimestamps = useCallback((next: TimestampMap) => {
    setTimestamps(next);
    saveTimestamps(next);
  }, []);

  const handleResetTimestamps = useCallback(() => {
    setTimestamps(clearTimestamps());
  }, []);

  const handleSaveEscuchaClip = useCallback(
    (exerciseId: string, start: number | null, end: number | null) => {
      setEscuchaClips((prev) => {
        const next = { ...prev, [exerciseId]: { start, end } };
        saveEscuchaClips(next);
        return next;
      });
    },
    []
  );

  const handleToggleLearnedVocab = useCallback((id: string) => {
    setProgress((prev) => {
      const exists = prev.learnedVocabIds.includes(id);
      const nextLearned = exists
        ? prev.learnedVocabIds.filter((x) => x !== id)
        : [...prev.learnedVocabIds, id];
      return {
        ...prev,
        learnedVocabIds: nextLearned,
        points: exists ? prev.points : prev.points + 5,
      };
    });
  }, []);

  const handleToggleReviewVocab = useCallback((id: string) => {
    setProgress((prev) => {
      const exists = prev.reviewVocabIds.includes(id);
      return {
        ...prev,
        reviewVocabIds: exists
          ? prev.reviewVocabIds.filter((x) => x !== id)
          : [...prev.reviewVocabIds, id],
      };
    });
  }, []);

  const handleCompleteGrammar = useCallback((topicId: string) => {
    setProgress((prev) => {
      if (prev.completedGrammarIds.includes(topicId)) return prev;
      return {
        ...prev,
        completedGrammarIds: [...prev.completedGrammarIds, topicId],
        points: prev.points + 25,
      };
    });
  }, []);

  const handleCompleteSingLine = useCallback((lineId: string) => {
    setProgress((prev) => {
      if (prev.singCompletedLineIds.includes(lineId)) return prev;
      return {
        ...prev,
        singCompletedLineIds: [...prev.singCompletedLineIds, lineId],
        points: prev.points + 10,
      };
    });
  }, []);

  const handleCompleteEscucha = useCallback((exId: string) => {
    setProgress((prev) => {
      if (prev.completedEscuchaIds.includes(exId)) return prev;
      return {
        ...prev,
        completedEscuchaIds: [...prev.completedEscuchaIds, exId],
        points: prev.points + 15,
      };
    });
  }, []);

  const handleTogglePracticedConv = useCallback((id: string) => {
    setProgress((prev) => {
      const exists = prev.conversationPracticedIds.includes(id);
      return {
        ...prev,
        conversationPracticedIds: exists
          ? prev.conversationPracticedIds.filter((x) => x !== id)
          : [...prev.conversationPracticedIds, id],
        points: exists ? prev.points : prev.points + 5,
      };
    });
  }, []);

  const handleFinishQuiz = useCallback((correctCount: number, totalCount: number) => {
    const pct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
    setProgress((prev) => ({
      ...prev,
      quizAttempts: prev.quizAttempts + 1,
      quizBestPercent: Math.max(prev.quizBestPercent, pct),
      points: prev.points + correctCount * 5,
    }));
  }, []);

  const handleRecordGameResult = useCallback(
    (gameId: string, score: number, completed: boolean) => {
      setProgress((prev) => {
        const current = prev.gameScores[gameId];
        const nextRec = {
          played: (current?.played ?? 0) + 1,
          bestScore: Math.max(current?.bestScore ?? 0, score),
          completed: Boolean(current?.completed || completed),
        };
        return {
          ...prev,
          points: prev.points + Math.max(10, Math.round(score / 2)),
          gameScores: {
            ...prev.gameScores,
            [gameId]: nextRec,
          },
        };
      });
    },
    []
  );

  const handleRecordMistake = useCallback((mistake: Omit<MistakeRecord, 'id' | 'timestamp'>) => {
    setProgress((prev) => ({
      ...prev,
      mistakes: appendMistake(prev.mistakes, mistake),
    }));
  }, []);

  const handleClearMistake = useCallback((mistakeId: string) => {
    setProgress((prev) => ({
      ...prev,
      mistakes: prev.mistakes.filter((m) => m.id !== mistakeId),
    }));
  }, []);

  const handleResetProgress = useCallback(() => {
    setProgress(clearProgress());
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#2B0A14] flex flex-col">
      {/* Compact 3-zone Top Bar (obeys <=15% mobile height & clean 3-zone contract) */}
      <header className="sticky top-0 z-40 bg-[#71152F] text-[#FFF1DF] border-b border-[#F6B94C]/20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Title */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-white/10 text-[#FFF1DF] cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={() => navigate('inicio')}
              className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#FFF1DF] hover:text-[#F6B94C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Cambio Dolor
            </button>
          </div>

          {/* Zone 2: 5 concise single-line text nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#FFF1DF]/85">
            {TOP_QUICK_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => navigate(link.id)}
                className={`whitespace-nowrap shrink-0 pb-0.5 transition-colors cursor-pointer ${
                  activeTab === link.id
                    ? 'text-[#F6B94C] border-b-2 border-[#F6B94C]'
                    : 'hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => navigate('cantando')}
              className="px-4 py-2 rounded-xl bg-[#F07835] hover:bg-[#F6B94C] hover:text-[#2B0A14] text-white text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Aprende cantando
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-over navigation drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-[#2B0A14]/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#FFF8F0] h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
            <div className="px-5 py-4 bg-[#71152F] text-[#FFF1DF] flex items-center justify-between">
              <span className="font-display font-bold text-lg">Natalia Oreiro</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 cursor-pointer"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-3 space-y-1 flex-1">
              {NAV_ITEMS.map((item) => {
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#71152F] text-[#FFF1DF]'
                        : 'text-[#2B0A14] hover:bg-[#FFF1DF]'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className={active ? 'text-[#F6B94C]' : 'text-[#A71D36]'}>
                        {item.icon}
                      </span>
                      <span>{item.labelEs}</span>
                    </span>
                    <span
                      className={`text-[11px] ${
                        active ? 'text-[#F6B94C]' : 'text-[#5A2434]/75'
                      }`}
                    >
                      {item.labelHy}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Layout: Desktop Left Sidebar + Content Stage */}
      <div className="max-w-[1440px] w-full mx-auto flex-1 flex items-start gap-6 px-4 sm:px-6 py-6 sm:py-8">
        {/* Desktop Navigation Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-24">
          <nav className="bg-white rounded-2xl border border-[#71152F]/15 p-2.5 space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#71152F] text-[#FFF1DF]'
                      : 'text-[#2B0A14] hover:bg-[#FFF1DF]'
                  }`}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span className={active ? 'text-[#F6B94C]' : 'text-[#A71D36]'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.labelEs}</span>
                  </span>
                  <span
                    className={`text-[11px] shrink-0 ml-2 ${
                      active ? 'text-[#F6B94C]' : 'text-[#5A2434]/70'
                    }`}
                  >
                    {item.labelHy}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Compact Progress Summary in Sidebar */}
          <div className="mt-4 rounded-2xl bg-[#FFF1DF] border border-[#F07835]/30 p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#71152F]">
              <span>Tus puntos</span>
              <span className="font-mono tabular-nums text-[#C93439]">{progress.points} pts</span>
            </div>
            <p className="text-[11px] text-[#5A2434]">
              A1–B2 · Español / Հայերեն · Progreso guardado localmente
            </p>
          </div>
        </aside>

        {/* Active Module Content */}
        <main className="flex-1 min-w-0">
          {activeTab === 'inicio' && <HomeView progress={progress} onNavigate={navigate} />}

          {activeTab === 'video' && (
            <YouTubePlayerView
              timestamps={timestamps}
              onUpdateTimestamps={handleUpdateTimestamps}
              onResetTimestamps={handleResetTimestamps}
              jumpToLineId={jumpToLineId}
              onClearJump={() => setJumpToLineId(null)}
            />
          )}

          {activeTab === 'letra' && (
            <LyricsView
              timestamps={timestamps}
              onJumpToVideo={handleJumpToVideo}
              onOpenGrammarTopic={handleOpenGrammarTopic}
            />
          )}

          {activeTab === 'cantando' && (
            <SingLearnView
              timestamps={timestamps}
              completedLineIds={progress.singCompletedLineIds}
              onCompleteLine={handleCompleteSingLine}
              onGoToSync={handleJumpToVideo}
            />
          )}

          {activeTab === 'analisis' && (
            <AnalysisView
              onJumpToVideo={handleJumpToVideo}
              onOpenGrammarTopic={handleOpenGrammarTopic}
            />
          )}

          {activeTab === 'gramatica' && (
            <GrammarView
              initialTopicId={grammarFocusId}
              completedIds={progress.completedGrammarIds}
              onCompleteTopic={handleCompleteGrammar}
              onRecordMistake={handleRecordMistake}
            />
          )}

          {activeTab === 'vocabulario' && (
            <VocabView
              learnedIds={progress.learnedVocabIds}
              reviewIds={progress.reviewVocabIds}
              onToggleLearned={handleToggleLearnedVocab}
              onToggleReview={handleToggleReviewVocab}
            />
          )}

          {activeTab === 'conversacion' && (
            <ConversationView
              practicedIds={progress.conversationPracticedIds}
              onTogglePracticed={handleTogglePracticedConv}
            />
          )}

          {activeTab === 'escucha' && (
            <EscuchaView
              timestamps={timestamps}
              escuchaClips={escuchaClips}
              onSaveEscuchaClip={handleSaveEscuchaClip}
              completedIds={progress.completedEscuchaIds}
              onCompleteExercise={handleCompleteEscucha}
              onRecordMistake={handleRecordMistake}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizView
              onFinishQuiz={handleFinishQuiz}
              onRecordMistake={handleRecordMistake}
            />
          )}

          {activeTab === 'juegos' && (
            <GamesView
              timestamps={timestamps}
              gameScores={progress.gameScores}
              onRecordGameResult={handleRecordGameResult}
              onRecordMistake={handleRecordMistake}
            />
          )}

          {activeTab === 'progreso' && (
            <ProgressView
              progress={progress}
              onResetProgress={handleResetProgress}
              onNavigate={navigate}
              onClearMistake={handleClearMistake}
            />
          )}
        </main>
      </div>

      {/* Clean Minimal Footer */}
      <footer className="border-t border-[#71152F]/15 bg-[#FFF1DF]/60 mt-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5A2434]">
          <span>Natalia Oreiro — Cambio Dolor · Aprende español con música (ES / HY)</span>
          <span>Niveles A1–B2 · Իսպաներենի ինտերակտիվ հարթակ</span>
        </div>
      </footer>
    </div>
  );
}
