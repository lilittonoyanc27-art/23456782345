import React, { useMemo, useState } from 'react';
import { CheckCircle2, Eye, MessageSquare } from 'lucide-react';
import { CONVERSATION_QUESTIONS } from './conversationData';

interface ConversationViewProps {
  practicedIds: string[];
  onTogglePracticed: (id: string) => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  practicedIds,
  onTogglePracticed,
}) => {
  const [levelFilter, setLevelFilter] = useState<'Todos' | 'A1–A2' | 'B1' | 'B2'>('Todos');
  const [openTranslations, setOpenTranslations] = useState<Record<string, boolean>>({});
  const [openSamples, setOpenSamples] = useState<Record<string, boolean>>({});

  const visibleQuestions = useMemo(() => {
    if (levelFilter === 'Todos') return CONVERSATION_QUESTIONS;
    return CONVERSATION_QUESTIONS.filter((q) => q.level === levelFilter);
  }, [levelFilter]);

  const toggleTrans = (id: string) => {
    setOpenTranslations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSample = (id: string) => {
    setOpenSamples((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            40 preguntas reales · 15 A1–A2 · 15 B1 · 10 B2 · Խոսակցական պրակտիկա
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            Preguntas para hablar
          </h2>
          <p className="text-sm text-[#5A2434] mt-1">
            Pulsa la pregunta en español para ver su traducción al armenio y practica respondiendo en voz alta antes de abrir la respuesta de ejemplo.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-[#FFF1DF] border border-[#71152F]/15 self-start md:self-auto">
          {(['Todos', 'A1–A2', 'B1', 'B2'] as const).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => setLevelFilter(lvl)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                levelFilter === lvl ? 'bg-[#71152F] text-[#FFF1DF]' : 'text-[#71152F]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="text-xs text-[#5A2434] flex items-center justify-between">
        <span>Mostrando {visibleQuestions.length} preguntas de conversación</span>
        <span className="font-mono tabular-nums text-[#71152F]">
          Practicadas: {practicedIds.length} / {CONVERSATION_QUESTIONS.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visibleQuestions.map((q, idx) => {
          const isTransOpen = Boolean(openTranslations[q.id]);
          const isSampleOpen = Boolean(openSamples[q.id]);
          const isPracticed = practicedIds.includes(q.id);

          return (
            <article
              key={q.id}
              className={`rounded-2xl bg-white border p-5 flex flex-col justify-between gap-4 transition-colors ${
                isPracticed ? 'border-emerald-500/40' : 'border-[#71152F]/15'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#A71D36]">
                  <span className="font-semibold">
                    {q.level} · {q.topicEs} / {q.topicHy}
                  </span>
                  <span className="font-mono tabular-nums text-[#71152F]/60">#{idx + 1}</span>
                </div>

                {/* Clickable Spanish question to reveal Armenian translation */}
                <button
                  type="button"
                  onClick={() => toggleTrans(q.id)}
                  className="w-full text-left group cursor-pointer space-y-1.5"
                >
                  <h3 className="font-display text-lg font-bold text-[#2B0A14] group-hover:text-[#71152F] transition-colors leading-snug">
                    {q.es}
                  </h3>
                  {!isTransOpen && (
                    <p className="text-xs text-[#71152F]/65">
                      Pulsa la pregunta para ver la traducción armenia · Սեղմիր՝ թարգմանելու համար
                    </p>
                  )}
                </button>

                {isTransOpen && (
                  <div className="rounded-xl bg-[#FFF1DF] px-4 py-3 text-sm font-medium text-[#71152F]">
                    {q.hy}
                  </div>
                )}

                {isSampleOpen && (
                  <div className="rounded-xl bg-[#FFF8F0] border border-[#F07835]/30 p-4 space-y-1.5">
                    <p className="text-xs font-semibold text-[#A71D36] flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Respuesta de ejemplo · Օրինակ պատասխան</span>
                    </p>
                    <p className="text-sm font-semibold text-[#2B0A14] leading-relaxed">
                      «{q.sampleEs}»
                    </p>
                    <p className="text-xs sm:text-sm text-[#71152F] leading-relaxed pt-1">
                      {q.sampleHy}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#71152F]/10">
                <button
                  type="button"
                  onClick={() => toggleSample(q.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFF1DF] hover:bg-[#F6B94C]/40 text-[#71152F] text-xs font-semibold cursor-pointer whitespace-nowrap"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isSampleOpen ? 'Ocultar ejemplo' : 'Ver respuesta de ejemplo'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onTogglePracticed(q.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                    isPracticed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border border-[#71152F]/20 text-[#71152F] hover:bg-[#FFF8F0]'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isPracticed ? 'Practicada' : 'Marcar practicada'}</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
