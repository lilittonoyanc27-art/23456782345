import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Languages, Shuffle, XCircle } from 'lucide-react';
import { GRAMMAR_TOPICS } from './grammarData';
import { MistakeRecord } from './types';

interface ShuffledPracticeOption {
  text: string;
  hy: string;
  isCorrect: boolean;
}

function shuffleArrayRandom<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface GrammarViewProps {
  initialTopicId: string | null;
  completedIds: string[];
  onCompleteTopic: (topicId: string) => void;
  onRecordMistake: (mistake: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}

export const GrammarView: React.FC<GrammarViewProps> = ({
  initialTopicId,
  completedIds,
  onCompleteTopic,
  onRecordMistake,
}) => {
  const [selectedId, setSelectedId] = useState<string>(initialTopicId || GRAMMAR_TOPICS[0].id);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [openPromptHy, setOpenPromptHy] = useState<Record<string, boolean>>({});
  const [openOptionHy, setOpenOptionHy] = useState<Record<string, boolean>>({});
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);

  useEffect(() => {
    if (initialTopicId && GRAMMAR_TOPICS.some((t) => t.id === initialTopicId)) {
      setSelectedId(initialTopicId);
    }
  }, [initialTopicId]);

  const activeIndex = Math.max(
    0,
    GRAMMAR_TOPICS.findIndex((t) => t.id === selectedId)
  );
  const topic = GRAMMAR_TOPICS[activeIndex];

  // Randomly shuffle options for each practice question while varying correct-answer slots
  const shuffledPracticeMap = useMemo(() => {
    const map: Record<string, ShuffledPracticeOption[]> = {};
    let lastCorrectSlot = -1;

    topic.practice.forEach((p, idx) => {
      const base: ShuffledPracticeOption[] = p.options.map((text, i) => ({
        text,
        hy: p.optionsHy[i] || '',
        isCorrect: i === p.correctIndex,
      }));
      let shuffled = shuffleArrayRandom(base);
      const correctSlot = shuffled.findIndex((o) => o.isCorrect);

      // Avoid putting consecutive questions' correct answers in the exact same slot
      if (shuffled.length > 1 && (correctSlot === lastCorrectSlot || (idx === 0 && shuffleSeed === 0 && correctSlot === p.correctIndex))) {
        const altSlots = shuffled
          .map((_, i) => i)
          .filter((i) => i !== correctSlot && i !== lastCorrectSlot);
        const swapTarget = altSlots[Math.floor(Math.random() * altSlots.length)] ?? ((correctSlot + 1) % shuffled.length);
        [shuffled[correctSlot], shuffled[swapTarget]] = [shuffled[swapTarget], shuffled[correctSlot]];
      }
      lastCorrectSlot = shuffled.findIndex((o) => o.isCorrect);
      map[p.id] = shuffled;
    });

    return map;
  }, [topic, shuffleSeed]);

  const handleSelectOption = (
    practiceId: string,
    chosenText: string,
    correctText: string,
    promptEs: string,
    explanationHy: string
  ) => {
    setAnswers((prev) => ({ ...prev, [practiceId]: chosenText }));
    if (chosenText !== correctText) {
      onRecordMistake({
        source: `Gramática: ${topic.titleEs}`,
        promptEs,
        chosenAnswer: chosenText,
        correctAnswer: correctText,
        topicRef: topic.titleEs,
        explanationHy,
      });
    } else {
      const allCorrect = topic.practice.every((item) => {
        const chosen = item.id === practiceId ? chosenText : answers[item.id];
        return chosen === item.options[item.correctIndex];
      });
      if (allCorrect && !completedIds.includes(topic.id)) {
        onCompleteTopic(topic.id);
      }
    }
  };

  const handleReshuffleTopic = () => {
    setAnswers((prev) => {
      const next = { ...prev };
      topic.practice.forEach((item) => {
        delete next[item.id];
      });
      return next;
    });
    setOpenPromptHy({});
    setOpenOptionHy({});
    setShuffleSeed((s) => s + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            17 lecciones interactivas · 17 քերականական դաս երգի օրինակներով
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            Gramática completa de «Cambio Dolor»
          </h2>
        </div>
        <div className="text-sm font-medium text-[#71152F] tabular-nums">
          Completadas: <strong className="text-[#C93439]">{completedIds.length}</strong> / {GRAMMAR_TOPICS.length}
        </div>
      </div>

      {/* Mobile topic dropdown */}
      <div className="lg:hidden">
        <label className="block text-xs font-semibold text-[#71152F] mb-1.5">
          Elegir tema · Ընտրիր թեման
        </label>
        <select
          value={topic.id}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full rounded-xl border border-[#71152F]/25 bg-white px-3.5 py-3 text-sm font-semibold text-[#2B0A14]"
        >
          {GRAMMAR_TOPICS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.number}. {t.titleEs} ({t.level}) {completedIds.includes(t.id) ? '✓' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Desktop sidebar of all 17 topics */}
        <aside className="hidden lg:block lg:col-span-4 bg-white rounded-2xl border border-[#71152F]/15 overflow-hidden">
          <div className="px-4 py-3 bg-[#FFF1DF] border-b border-[#71152F]/15 text-xs font-semibold text-[#71152F]">
            Índice de 17 temas · 17 քերականական թեմաներ
          </div>
          <div className="max-h-[700px] overflow-y-auto divide-y divide-[#71152F]/10">
            {GRAMMAR_TOPICS.map((t) => {
              const isSelected = t.id === topic.id;
              const isDone = completedIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedId(t.id)}
                  className={`w-full text-left px-4 py-3 flex items-start justify-between gap-2 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#71152F] text-[#FFF1DF]'
                      : 'hover:bg-[#FFF8F0] text-[#2B0A14]'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">
                      {t.number}. {t.titleEs}
                    </p>
                    <p
                      className={`text-[11px] mt-0.5 truncate ${
                        isSelected ? 'text-[#F6B94C]' : 'text-[#5A2434]'
                      }`}
                    >
                      {t.titleHy}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                    <span
                      className={`text-[11px] font-mono ${
                        isSelected ? 'text-[#FFF1DF]/80' : 'text-[#A71D36]'
                      }`}
                    >
                      {t.level}
                    </span>
                    {isDone && (
                      <CheckCircle2
                        className={`w-4 h-4 ${isSelected ? 'text-[#F6B94C]' : 'text-emerald-600'}`}
                      />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Active Grammar Lesson Content */}
        <div className="lg:col-span-8 space-y-5">
          <article className="bg-white rounded-2xl border border-[#71152F]/15 p-5 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#71152F]/10 pb-4">
              <div>
                <p className="text-xs font-medium text-[#A71D36]">
                  Tema {topic.number} de {GRAMMAR_TOPICS.length} · Nivel {topic.level}
                </p>
                <h3 className="font-display text-2xl font-bold text-[#71152F] mt-1">
                  {topic.titleEs}
                </h3>
                <p className="text-base font-semibold text-[#C93439] mt-0.5">{topic.titleHy}</p>
              </div>
              {completedIds.includes(topic.id) && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Completado · Ավարտված</span>
                </span>
              )}
            </div>

            {/* Song Example */}
            <div className="rounded-xl bg-gradient-to-r from-[#71152F] to-[#A71D36] p-5 text-[#FFF1DF] space-y-1.5">
              <p className="text-xs font-medium text-[#F6B94C]">
                Ejemplo de la canción · Օրինակ երգից
              </p>
              <p className="font-display text-lg sm:text-xl font-bold leading-snug">
                «{topic.songQuote}»
              </p>
              <p className="text-sm text-[#FFF1DF]/90">{topic.songQuoteHy}</p>
            </div>

            {/* Explanation in Armenian */}
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-bold text-[#71152F] mb-1">
                  Բացատրություն (Explicación)
                </h4>
                <p className="text-sm sm:text-base text-[#2B0A14] leading-relaxed">
                  {topic.explanationHy}
                </p>
              </div>
              <div className="rounded-xl bg-[#FFF1DF] p-4">
                <h4 className="text-xs font-bold text-[#A71D36] mb-1">
                  Ինչո՞ւ է ընտրված հենց այս ձևը · ¿Por qué esta forma?
                </h4>
                <p className="text-sm text-[#4D1626] leading-relaxed">{topic.whyThisFormHy}</p>
              </div>
            </div>

            {/* Conjugation Table when relevant */}
            {topic.conjugationTable && (
              <div className="space-y-2">
                <div>
                  <h4 className="text-sm font-bold text-[#71152F]">
                    {topic.conjugationTable.titleEs}
                  </h4>
                  <p className="text-xs text-[#5A2434]">{topic.conjugationTable.titleHy}</p>
                </div>
                <div className="overflow-x-auto rounded-xl border border-[#71152F]/15">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#FFF1DF] text-[#71152F] text-xs">
                      <tr>
                        {topic.conjugationTable.headers.map((h) => (
                          <th key={h} className="px-4 py-2.5 font-bold whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#71152F]/10 bg-white">
                      {topic.conjugationTable.rows.map((row) => (
                        <tr key={row.pronoun}>
                          <td className="px-4 py-2.5 font-semibold text-[#A71D36] whitespace-nowrap">
                            {row.pronoun}
                          </td>
                          {row.forms.map((form, i) => (
                            <td key={i} className="px-4 py-2.5 text-[#2B0A14] whitespace-nowrap">
                              {form}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3 Life Examples */}
            <div className="space-y-2.5">
              <h4 className="text-sm font-bold text-[#71152F]">
                3 ejemplos de la vida real · 3 նոր կենսական օրինակ
              </h4>
              <div className="divide-y divide-[#71152F]/10 rounded-xl border border-[#71152F]/15 bg-[#FFFDF9]">
                {topic.examples.map((ex, idx) => (
                  <div key={idx} className="p-4 space-y-1">
                    <p className="text-sm sm:text-base font-semibold text-[#2B0A14]">
                      {idx + 1}. {ex.es}
                    </p>
                    <p className="text-sm text-[#71152F]">{ex.hy}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Practice */}
            <div className="space-y-4 pt-2 border-t border-[#71152F]/15">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="font-display text-lg font-bold text-[#71152F]">
                    Práctica rápida · Ավտոմատ ստուգմամբ վարժություն
                  </h4>
                  <p className="text-xs text-[#5A2434]">
                    Pulsa la pregunta o «HY» en cada opción para ver la traducción al armenio.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReshuffleTopic}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF1DF] hover:bg-[#F6B94C]/35 text-[#71152F] text-xs font-semibold border border-[#71152F]/15 cursor-pointer"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Mezclar</span>
                </button>
              </div>

              {topic.practice.map((p) => {
                const chosen = answers[p.id];
                const answered = chosen !== undefined;
                const correctText = p.options[p.correctIndex];
                const isRight = chosen === correctText;
                const shuffledOpts = shuffledPracticeMap[p.id] ?? [];
                const showHy = !!openPromptHy[p.id];

                return (
                  <div
                    key={p.id}
                    className="rounded-xl bg-[#FFF8F0] border border-[#71152F]/15 p-4 space-y-3"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenPromptHy((prev) => ({ ...prev, [p.id]: !prev[p.id] }))
                      }
                      className="w-full text-left group cursor-pointer"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-base text-[#2B0A14] group-hover:text-[#A71D36] transition-colors">
                          {p.promptEs}
                        </p>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A71D36] bg-[#FFF1DF] border border-[#71152F]/15 px-2 py-0.5 rounded-lg shrink-0">
                          <Languages className="w-3 h-3" />
                          <span>{showHy ? 'Ocultar' : 'HY'}</span>
                        </span>
                      </div>
                      {showHy && (
                        <p className="text-sm text-[#71152F] mt-1.5 bg-[#FFF1DF] rounded-lg px-3 py-2 border border-[#F07835]/30">
                          {p.promptHy}
                        </p>
                      )}
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {shuffledOpts.map((opt) => {
                        const optKey = `${p.id}_${opt.text}`;
                        const showOptHy = !!openOptionHy[optKey];
                        let btnStyle =
                          'bg-white border-[#71152F]/20 text-[#2B0A14] hover:bg-[#FFF1DF]';
                        if (answered) {
                          if (opt.isCorrect) {
                            btnStyle = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
                          } else if (opt.text === chosen) {
                            btnStyle = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
                          }
                        }
                        return (
                          <div
                            key={opt.text}
                            onClick={() =>
                              handleSelectOption(
                                p.id,
                                opt.text,
                                correctText,
                                p.promptEs,
                                p.explanationHy
                              )
                            }
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleSelectOption(
                                  p.id,
                                  opt.text,
                                  correctText,
                                  p.promptEs,
                                  p.explanationHy
                                );
                              }
                            }}
                            className={`text-left px-4 py-3 rounded-xl border text-sm sm:text-base transition-colors cursor-pointer ${btnStyle}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span>{opt.text}</span>
                              {opt.hy && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenOptionHy((prev) => ({
                                      ...prev,
                                      [optKey]: !prev[optKey],
                                    }));
                                  }}
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#A71D36] bg-[#FFF1DF] hover:bg-[#F6B94C]/40 border border-[#71152F]/15 px-2 py-0.5 rounded-lg shrink-0 cursor-pointer"
                                  title="Traducir opción al armenio"
                                >
                                  <Languages className="w-3 h-3" />
                                  <span>{showOptHy ? 'Ocultar' : 'HY'}</span>
                                </button>
                              )}
                            </div>
                            {showOptHy && opt.hy && (
                              <p className="text-xs sm:text-sm font-normal text-[#71152F] mt-1.5 pt-1.5 border-t border-[#71152F]/15">
                                {opt.hy}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {answered && (
                      <div
                        className={`rounded-xl p-3.5 text-sm flex items-start gap-2.5 ${
                          isRight
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                            : 'bg-rose-50 text-[#71152F] border border-[#C93439]/30'
                        }`}
                      >
                        {isRight ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-[#C93439] shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-bold text-xs">
                            {isRight
                              ? '¡Correcto! · Ճիշտ է'
                              : `Respuesta correcta: «${correctText}» · Սխալ պատասխանի բացատրություն`}
                          </p>
                          <p className="text-xs sm:text-sm mt-1 leading-relaxed">{p.explanationHy}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-[#71152F]/10">
              <button
                type="button"
                disabled={activeIndex === 0}
                onClick={() => setSelectedId(GRAMMAR_TOPICS[activeIndex - 1].id)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFF1DF] text-[#71152F] text-sm font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>
              <button
                type="button"
                disabled={activeIndex === GRAMMAR_TOPICS.length - 1}
                onClick={() => setSelectedId(GRAMMAR_TOPICS[activeIndex + 1].id)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#A71D36] hover:bg-[#71152F] text-[#FFF1DF] text-sm font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                <span>Siguiente tema</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
