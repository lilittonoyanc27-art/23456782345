import React, { useState } from 'react';
import { BookOpen, Eye, EyeOff, Languages, PlayCircle, RotateCcw } from 'lucide-react';
import { LYRIC_LINES, SONG_SECTIONS } from './lyricsData';
import { formatTime } from './progressStore';
import { TimestampMap } from './types';

interface LyricsViewProps {
  timestamps: TimestampMap;
  onJumpToVideo: (lineId: string) => void;
  onOpenGrammarTopic: (topicId: string) => void;
}

export const LyricsView: React.FC<LyricsViewProps> = ({
  timestamps,
  onJumpToVideo,
  onOpenGrammarTopic,
}) => {
  const [reverseMode, setReverseMode] = useState(false);
  const [openTranslation, setOpenTranslation] = useState<Record<string, boolean>>({});
  const [openExplanation, setOpenExplanation] = useState<Record<string, boolean>>({});
  const [openGrammar, setOpenGrammar] = useState<Record<string, boolean>>({});
  const [revealedReverse, setRevealedReverse] = useState<Record<string, boolean>>({});

  const toggleTranslation = (id: string) => {
    setOpenTranslation((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleExplanation = (id: string) => {
    setOpenExplanation((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleGrammar = (id: string) => {
    setOpenGrammar((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleReverseReveal = (id: string) => {
    setRevealedReverse((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const all: Record<string, boolean> = {};
    LYRIC_LINES.forEach((l) => {
      all[l.id] = true;
    });
    if (reverseMode) {
      setRevealedReverse(all);
    } else {
      setOpenTranslation(all);
    }
  };

  const collapseAll = () => {
    if (reverseMode) {
      setRevealedReverse({});
    } else {
      setOpenTranslation({});
      setOpenExplanation({});
      setOpenGrammar({});
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Mode Switch */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            Letra íntegra original · Բնօրինակ ամբողջական տեքստը՝ բոլոր կրկնություններով
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            Letra interactiva y traducción
          </h2>
          <p className="text-sm text-[#5A2434] mt-1">
            {reverseMode
              ? 'Modo inverso (HY → ES): lee el armenio, intenta recordar la línea en español y pulsa «Mostrar respuesta».'
              : 'Pulsa cualquier línea en español para ver la traducción armenia, vocabulario clave y notas de gramática.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="inline-flex p-1 rounded-xl bg-[#FFF1DF] border border-[#71152F]/15">
            <button
              type="button"
              onClick={() => setReverseMode(false)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                !reverseMode ? 'bg-[#71152F] text-[#FFF1DF]' : 'text-[#71152F] hover:bg-white/60'
              }`}
            >
              ES → HY
            </button>
            <button
              type="button"
              onClick={() => setReverseMode(true)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                reverseMode ? 'bg-[#71152F] text-[#FFF1DF]' : 'text-[#71152F] hover:bg-white/60'
              }`}
            >
              HY → ES (Inverso)
            </button>
          </div>

          <button
            type="button"
            onClick={expandAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#71152F]/15 text-xs font-semibold text-[#71152F] hover:bg-[#FFF1DF] cursor-pointer whitespace-nowrap"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{reverseMode ? 'Mostrar todas' : 'Abrir traducciones'}</span>
          </button>

          <button
            type="button"
            onClick={collapseAll}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#71152F]/15 text-xs font-semibold text-[#71152F] hover:bg-[#FFF1DF] cursor-pointer whitespace-nowrap"
          >
            {reverseMode ? <RotateCcw className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Ocultar</span>
          </button>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-8">
        {SONG_SECTIONS.map((sec) => {
          const lines = LYRIC_LINES.filter((l) => l.section === sec.key);
          return (
            <section key={sec.key} className="space-y-3">
              <div className="flex items-baseline justify-between border-b border-[#71152F]/15 pb-2">
                <h3 className="font-display text-xl font-bold text-[#A71D36]">{sec.label}</h3>
                <span className="text-xs font-medium text-[#71152F]/75">{sec.labelHy}</span>
              </div>

              <div className="space-y-2.5">
                {lines.map((line) => {
                  const ts = timestamps[line.id];
                  const isOpen = Boolean(openTranslation[line.id]);
                  const isExplOpen = Boolean(openExplanation[line.id]);
                  const isGramOpen = Boolean(openGrammar[line.id]);
                  const isRevOpen = Boolean(revealedReverse[line.id]);

                  if (line.isInstrumental) {
                    return (
                      <div
                        key={line.id}
                        className="rounded-2xl bg-[#FFF1DF] border border-[#F07835]/30 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                      >
                        <div>
                          <p className="font-display italic font-bold text-[#A71D36]">{line.es}</p>
                          <p className="text-sm text-[#5A2434] mt-0.5">{line.hy}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onJumpToVideo(line.id)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#71152F]/15 text-xs font-semibold text-[#71152F] hover:bg-[#F6B94C]/30 cursor-pointer self-start sm:self-auto whitespace-nowrap"
                        >
                          <PlayCircle className="w-4 h-4 text-[#C93439]" />
                          <span>Ir al vídeo</span>
                        </button>
                      </div>
                    );
                  }

                  // Reverse study mode: Armenian first -> recall Spanish -> Mostrar respuesta
                  if (reverseMode) {
                    return (
                      <div
                        key={line.id}
                        className="rounded-2xl bg-white border border-[#71152F]/15 p-4 sm:p-5 transition-colors hover:border-[#F07835]/50"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-[#A71D36]">
                              Línea {line.order} · Հիշիր իսպաներեն տողը
                            </p>
                            <p className="text-base sm:text-lg font-semibold text-[#2B0A14]">
                              {line.hy}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => toggleReverseReveal(line.id)}
                              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                isRevOpen
                                  ? 'bg-[#FFF1DF] text-[#71152F] border border-[#71152F]/20'
                                  : 'bg-[#A71D36] hover:bg-[#71152F] text-[#FFF1DF]'
                              }`}
                            >
                              {isRevOpen ? 'Ocultar respuesta' : 'Mostrar respuesta'}
                            </button>
                            <button
                              type="button"
                              onClick={() => onJumpToVideo(line.id)}
                              className="p-2 rounded-xl bg-[#FFF1DF] text-[#71152F] hover:bg-[#F6B94C]/35 cursor-pointer"
                              aria-label="Ir al vídeo"
                              title="Ir al vídeo"
                            >
                              <PlayCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {isRevOpen && (
                          <div className="mt-3 pt-3 border-t border-[#71152F]/10 space-y-2">
                            <p className="font-display text-lg sm:text-xl font-bold text-[#71152F]">
                              {line.es}
                            </p>
                            <p className="text-xs text-[#5A2434]">{line.grammarHy}</p>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Standard interactive Spanish -> Armenian mode
                  return (
                    <div
                      key={line.id}
                      className={`rounded-2xl border transition-colors ${
                        isOpen
                          ? 'bg-[#FFFDF9] border-[#F07835]/60 shadow-sm'
                          : 'bg-white border-[#71152F]/15 hover:border-[#F07835]/40'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleTranslation(line.id)}
                        className="w-full text-left px-4 sm:px-5 py-4 cursor-pointer flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <p className="font-display text-lg sm:text-xl font-bold text-[#2B0A14] leading-snug">
                            {line.es}
                          </p>
                          {!isOpen && (
                            <p className="text-xs text-[#71152F]/65">
                              Pulsa para ver la traducción al armenio · Սեղմիր՝ թարգմանելու համար
                            </p>
                          )}
                        </div>
                        <span className="text-xs font-mono tabular-nums text-[#A71D36]/80 shrink-0 mt-1">
                          {ts?.start !== null && ts?.start !== undefined
                            ? formatTime(ts.start)
                            : `#${line.order}`}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 space-y-4 border-t border-[#71152F]/10 pt-3.5">
                          <div className="text-base sm:text-lg font-semibold text-[#71152F]">
                            {line.hy}
                          </div>

                          {/* Action buttons for Explanation, Grammar, Video */}
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => toggleExplanation(line.id)}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                isExplOpen
                                  ? 'bg-[#F07835] text-white'
                                  : 'bg-[#FFF1DF] text-[#71152F] hover:bg-[#F6B94C]/40'
                              }`}
                            >
                              <Languages className="w-3.5 h-3.5" />
                              <span>Explicación</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => toggleGrammar(line.id)}
                              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                                isGramOpen
                                  ? 'bg-[#71152F] text-[#FFF1DF]'
                                  : 'bg-[#FFF1DF] text-[#71152F] hover:bg-[#F6B94C]/40'
                              }`}
                            >
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>Gramática · Քերականություն</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => onJumpToVideo(line.id)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#71152F]/20 text-xs font-semibold text-[#A71D36] hover:bg-[#FFF1DF] cursor-pointer whitespace-nowrap"
                            >
                              <PlayCircle className="w-3.5 h-3.5" />
                              <span>Ir al vídeo</span>
                            </button>
                          </div>

                          {/* Vocabulary & Key Words Explanation */}
                          {isExplOpen && (
                            <div className="rounded-xl bg-[#FFF8F0] border border-[#F07835]/25 p-4 space-y-3">
                              <p className="text-xs font-semibold text-[#A71D36]">
                                Palabras importantes · Կարևոր բառեր և իմաստ
                              </p>
                              <p className="text-sm text-[#4D1626]">{line.meaningHy}</p>
                              <div className="divide-y divide-[#71152F]/10">
                                {line.words.map((w) => (
                                  <div key={w.word} className="py-2 first:pt-0 last:pb-0">
                                    <div className="flex flex-wrap items-baseline gap-2">
                                      <span className="font-bold text-sm text-[#71152F]">{w.word}</span>
                                      <span className="text-xs text-[#A71D36]">— {w.hy}</span>
                                    </div>
                                    <p className="text-xs text-[#5A2434] mt-0.5">{w.noteHy}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Grammar Commentary */}
                          {isGramOpen && (
                            <div className="rounded-xl bg-[#71152F]/5 border border-[#71152F]/15 p-4 space-y-2">
                              <p className="text-xs font-semibold text-[#71152F]">{line.grammarEs}</p>
                              <p className="text-sm text-[#2B0A14] leading-relaxed">{line.grammarHy}</p>
                              {line.grammarTopicId && (
                                <button
                                  type="button"
                                  onClick={() => onOpenGrammarTopic(line.grammarTopicId!)}
                                  className="text-xs font-semibold text-[#C93439] hover:text-[#71152F] underline cursor-pointer pt-1"
                                >
                                  Abrir lección completa de gramática → Բացել քերականության դասը
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
