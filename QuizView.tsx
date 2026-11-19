import React, { useMemo, useState } from 'react';
import { Award, CheckCircle2, Languages, RotateCcw, XCircle } from 'lucide-react';
import { QUIZ_QUESTIONS } from './quizData';
import { MistakeRecord, QuizCategory, QuizQuestion } from './types';

interface QuizViewProps {
  onFinishQuiz: (correctCount: number, totalCount: number) => void;
  onRecordMistake: (mistake: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}

interface ShuffledQuizItem {
  question: QuizQuestion;
  options: { text: string; hy?: string; isCorrect: boolean }[];
}

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildQuizDeck(category: 'Todas' | QuizCategory): ShuffledQuizItem[] {
  const pool =
    category === 'Todas'
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter((q) => q.category === category);
  return shuffleArray(pool).map((q) => ({
    question: q,
    options: shuffleArray(
      q.options.map((text, idx) => ({
        text,
        hy: q.optionsHy?.[idx],
        isCorrect: idx === q.correctIndex,
      }))
    ),
  }));
}

const CATEGORIES: ('Todas' | QuizCategory)[] = [
  'Todas',
  'Comprensión',
  'Gramática',
  'Vocabulario',
  'Traducción',
  'Expresiones',
  'Escucha',
];

export const QuizView: React.FC<QuizViewProps> = ({ onFinishQuiz, onRecordMistake }) => {
  const [category, setCategory] = useState<'Todas' | QuizCategory>('Todas');
  const [deck, setDeck] = useState<ShuffledQuizItem[]>(() => buildQuizDeck('Todas'));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showQuestionHy, setShowQuestionHy] = useState(false);
  const [openOptHy, setOpenOptHy] = useState<Record<number, boolean>>({});
  const [results, setResults] = useState<
    { question: QuizQuestion; chosen: string; correct: string; isCorrect: boolean }[]
  >([]);
  const [finished, setFinished] = useState(false);

  const startQuiz = (cat: 'Todas' | QuizCategory) => {
    setCategory(cat);
    setDeck(buildQuizDeck(cat));
    setCurrentIndex(0);
    setSelectedIdx(null);
    setShowQuestionHy(false);
    setOpenOptHy({});
    setResults([]);
    setFinished(false);
  };

  const currentItem = deck[currentIndex];

  const handleSelect = (optIdx: number) => {
    if (selectedIdx !== null || !currentItem) return;
    setSelectedIdx(optIdx);
    const chosenOpt = currentItem.options[optIdx];
    const correctOpt = currentItem.options.find((o) => o.isCorrect)!;

    setResults((prev) => [
      ...prev,
      {
        question: currentItem.question,
        chosen: chosenOpt.text,
        correct: correctOpt.text,
        isCorrect: chosenOpt.isCorrect,
      },
    ]);

    if (!chosenOpt.isCorrect) {
      onRecordMistake({
        source: `Quiz (${currentItem.question.category})`,
        promptEs: currentItem.question.questionEs,
        chosenAnswer: chosenOpt.text,
        correctAnswer: correctOpt.text,
        topicRef: currentItem.question.topicRef,
        explanationHy: currentItem.question.explanationHy,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= deck.length) {
      const correctCount = results.filter((r) => r.isCorrect).length;
      setFinished(true);
      onFinishQuiz(correctCount, deck.length);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIdx(null);
      setShowQuestionHy(false);
      setOpenOptHy({});
    }
  };

  const wrongResults = useMemo(() => results.filter((r) => !r.isCorrect), [results]);
  const topicsToReview = useMemo(() => {
    const set = new Set<string>();
    wrongResults.forEach((r) => set.add(r.question.topicRef));
    return Array.from(set);
  }, [wrongResults]);

  const correctSoFar = results.filter((r) => r.isCorrect).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            {QUIZ_QUESTIONS.length} preguntas aleatorias · 6 categorías · Մեծ վիկտորինա
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            Gran Quiz de «Cambio Dolor»
          </h2>
          <p className="text-sm text-[#5A2434] mt-1">
            Pulsa cualquier pregunta o el botón «HY» en las respuestas en español para ver su traducción al armenio.
          </p>
        </div>

        <button
          type="button"
          onClick={() => startQuiz(category)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFF1DF] hover:bg-[#F6B94C]/40 text-[#71152F] text-xs font-semibold cursor-pointer self-start md:self-auto whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Mezclar de nuevo</span>
        </button>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => startQuiz(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              category === cat
                ? 'bg-[#71152F] text-[#FFF1DF]'
                : 'bg-white border border-[#71152F]/15 text-[#71152F] hover:bg-[#FFF1DF]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {finished ? (
        <div className="bg-white rounded-3xl border border-[#71152F]/15 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-[#71152F] to-[#A71D36] rounded-2xl p-6 text-[#FFF1DF]">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-[#F6B94C]">
                Resultado final · Վերջնական արդյունք
              </p>
              <h3 className="font-display text-3xl font-bold tabular-nums">
                {correctSoFar} / {deck.length} ({Math.round((correctSoFar / deck.length) * 100)}%)
              </h3>
              <p className="text-sm text-[#FFF1DF]/90">
                {correctSoFar / deck.length >= 0.85
                  ? '¡Excelente dominio! Հիանալի արդյունք՝ դու վստահ տիրապետում ես երգին։'
                  : correctSoFar / deck.length >= 0.6
                  ? '¡Muy buen avance! Լավ առաջընթաց է. կրկնիր նշված թեմաները։'
                  : 'Buen primer paso. Լավ սկիզբ է. ուսումնասիրիր սխալները և նորից փորձիր։'}
              </p>
            </div>
            <Award className="w-12 h-12 text-[#F6B94C] shrink-0" />
          </div>

          {topicsToReview.length > 0 && (
            <div className="rounded-2xl bg-[#FFF1DF] p-5 space-y-2">
              <h4 className="text-sm font-bold text-[#71152F]">
                Temas recomendados para repasar · Թեմաներ, որոնք արժե կրկնել
              </h4>
              <p className="text-sm text-[#5A2434]">{topicsToReview.join(' · ')}</p>
            </div>
          )}

          {wrongResults.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-display text-lg font-bold text-[#71152F]">
                Revisión de errores ({wrongResults.length}) · Սխալների վերլուծություն
              </h4>
              <div className="space-y-3">
                {wrongResults.map((w, i) => (
                  <div
                    key={i}
                    className="rounded-xl bg-[#FFF8F0] border border-[#C93439]/25 p-4 space-y-1.5"
                  >
                    <p className="text-xs font-semibold text-[#A71D36]">
                      {w.question.category} · {w.question.topicRef}
                    </p>
                    <p className="text-sm font-bold text-[#2B0A14]">{w.question.questionEs}</p>
                    <p className="text-xs text-[#71152F]">{w.question.questionHy}</p>
                    <p className="text-xs text-[#C93439]">Tu respuesta: {w.chosen}</p>
                    <p className="text-xs text-emerald-700 font-semibold">
                      Correcta: {w.correct}
                    </p>
                    <p className="text-xs text-[#5A2434] pt-1">{w.question.explanationHy}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => startQuiz(category)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#A71D36] hover:bg-[#71152F] text-[#FFF1DF] font-semibold text-sm cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Repetir quiz con nuevo orden · Նորից անցնել</span>
          </button>
        </div>
      ) : currentItem ? (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#71152F]/15 p-5 sm:p-8 space-y-6">
          {/* Progress header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-[#A71D36]">
              <span>
                {currentItem.question.category} · {currentItem.question.topicRef}
              </span>
              <span className="font-mono tabular-nums">
                Pregunta {currentIndex + 1} / {deck.length} · Aciertos: {correctSoFar}
              </span>
            </div>
            <div className="h-2 rounded-full bg-[#FFF1DF] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F07835] to-[#A71D36] transition-all"
                style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Clickable Spanish Question to reveal Armenian translation */}
          <button
            type="button"
            onClick={() => setShowQuestionHy((v) => !v)}
            className="w-full text-left rounded-2xl bg-[#FFF8F0] border border-[#71152F]/15 p-5 hover:bg-[#FFF1DF] transition-colors cursor-pointer space-y-2"
          >
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#2B0A14] leading-snug">
              {currentItem.question.questionEs}
            </h3>
            {showQuestionHy ? (
              <p className="text-base font-semibold text-[#71152F] pt-2 border-t border-[#71152F]/15">
                {currentItem.question.questionHy}
              </p>
            ) : (
              <p className="text-xs text-[#71152F]/70">
                Pulsa la pregunta para ver la traducción armenia · Սեղմիր՝ հայերեն թարգմանության համար
              </p>
            )}
          </button>

          <div className="grid grid-cols-1 gap-3">
            {currentItem.options.map((opt, idx) => {
              const answered = selectedIdx !== null;
              let cls = 'bg-white border-[#71152F]/20 text-[#2B0A14] hover:bg-[#FFF1DF]';
              if (answered) {
                if (opt.isCorrect) {
                  cls = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
                } else if (idx === selectedIdx) {
                  cls = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
                }
              }
              const isHyOpen = Boolean(openOptHy[idx]);
              return (
                <div key={`${opt.text}_${idx}`} className={`rounded-2xl border transition-colors ${cls}`}>
                  <div className="flex items-stretch justify-between gap-2">
                    <button
                      type="button"
                      disabled={answered}
                      onClick={() => handleSelect(idx)}
                      className="flex-1 text-left px-5 py-4 text-sm sm:text-base cursor-pointer disabled:cursor-default flex items-center gap-3"
                    >
                      <span className="w-7 h-7 rounded-lg bg-[#FFF1DF] text-[#71152F] text-xs font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt.text}</span>
                    </button>

                    {opt.hy && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenOptHy((prev) => ({ ...prev, [idx]: !prev[idx] }));
                        }}
                        title="Traducir opción al armenio"
                        className={`px-3 my-2 mr-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0 ${
                          isHyOpen
                            ? 'bg-[#71152F] text-[#FFF1DF]'
                            : 'bg-[#FFF1DF] text-[#71152F] hover:bg-[#F6B94C]/45'
                        }`}
                      >
                        <Languages className="w-3.5 h-3.5" />
                        <span>HY</span>
                      </button>
                    )}
                  </div>

                  {opt.hy && isHyOpen && (
                    <div className="px-5 pb-3.5 pt-2 border-t border-[#71152F]/10 text-sm text-[#71152F] font-medium">
                      {opt.hy}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {selectedIdx !== null && (
            <div className="space-y-4">
              <div
                className={`rounded-2xl p-4 flex items-start gap-3 ${
                  currentItem.options[selectedIdx].isCorrect
                    ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border border-[#C93439]/30 text-[#71152F]'
                }`}
              >
                {currentItem.options[selectedIdx].isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-[#C93439] shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <p className="text-xs font-bold">
                    {currentItem.options[selectedIdx].isCorrect
                      ? '¡Respuesta correcta! · Ճիշտ պատասխան'
                      : `Respuesta correcta: «${currentItem.options.find((o) => o.isCorrect)?.text}»`}
                  </p>
                  <p className="text-sm leading-relaxed">{currentItem.question.explanationHy}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-[#71152F] hover:bg-[#A71D36] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
                >
                  {currentIndex + 1 >= deck.length
                    ? 'Ver resultado final · Տեսնել արդյունքը'
                    : 'Siguiente pregunta →'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
