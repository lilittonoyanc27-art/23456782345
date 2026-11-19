import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, MessageCircle, PlayCircle } from 'lucide-react';
import { SONG_ANALYSIS_THEMES, UNIQUE_LINES_FOR_ANALYSIS } from './lyricsData';

interface AnalysisViewProps {
  onJumpToVideo: (lineId: string) => void;
  onOpenGrammarTopic: (topicId: string) => void;
}

export const AnalysisView: React.FC<AnalysisViewProps> = ({
  onJumpToVideo,
  onOpenGrammarTopic,
}) => {
  const [activeSubView, setActiveSubView] = useState<'themes' | 'lines'>('themes');
  const [expandedLineId, setExpandedLineId] = useState<string | null>(UNIQUE_LINES_FOR_ANALYSIS[0]?.id ?? null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            Comprensión profunda · Երգի խորքային վերլուծություն (ES / HY)
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            Análisis de la canción
          </h2>
          <p className="text-sm text-[#5A2434] mt-1">
            Explora el mensaje, las emociones, las metáforas y el análisis verso a verso para hablar con naturalidad.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-[#FFF1DF] border border-[#71152F]/15 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveSubView('themes')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
              activeSubView === 'themes'
                ? 'bg-[#71152F] text-[#FFF1DF]'
                : 'text-[#71152F] hover:bg-white/60'
            }`}
          >
            7 Claves temáticas
          </button>
          <button
            type="button"
            onClick={() => setActiveSubView('lines')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
              activeSubView === 'lines'
                ? 'bg-[#71152F] text-[#FFF1DF]'
                : 'text-[#71152F] hover:bg-white/60'
            }`}
          >
            Análisis línea por línea
          </button>
        </div>
      </div>

      {activeSubView === 'themes' ? (
        <div className="space-y-5">
          {SONG_ANALYSIS_THEMES.map((theme) => (
            <article
              key={theme.id}
              className="rounded-2xl bg-white border border-[#71152F]/15 p-5 sm:p-6 space-y-4"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-[#71152F]">{theme.titleEs}</h3>
                <p className="text-sm font-semibold text-[#C93439] mt-0.5">{theme.titleHy}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-[#A71D36]">Español</p>
                  <p className="text-sm sm:text-base text-[#2B0A14] leading-relaxed">
                    {theme.bodyEs}
                  </p>
                </div>
                <div className="space-y-1.5 md:border-l md:border-[#71152F]/10 md:pl-5">
                  <p className="text-xs font-semibold text-[#A71D36]">Հայերեն</p>
                  <p className="text-sm sm:text-base text-[#2B0A14] leading-relaxed">
                    {theme.bodyHy}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#FFF1DF] px-4 py-3.5 space-y-1">
                <p className="text-xs font-semibold text-[#71152F] flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#F07835]" />
                  <span>Para conversar · Քննարկման հարց</span>
                </p>
                <p className="text-sm font-semibold text-[#2B0A14]">{theme.discussionPromptEs}</p>
                <p className="text-xs text-[#5A2434]">{theme.discussionPromptHy}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-xs text-[#5A2434]">
            Desglose detallado de las 14 líneas distintas de la canción (Verso 1 y Coro 1, que se repiten en Verso 2, Coro 2 y Coro final).
          </p>
          {UNIQUE_LINES_FOR_ANALYSIS.map((line, index) => {
            const open = expandedLineId === line.id;
            return (
              <div
                key={line.id}
                className="rounded-2xl bg-white border border-[#71152F]/15 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setExpandedLineId(open ? null : line.id)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#FFF8F0] transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-xs text-[#A71D36] font-medium">
                      {line.sectionLabel} · Verso {index + 1}
                    </p>
                    <p className="font-display text-lg font-bold text-[#2B0A14] mt-0.5">
                      {line.es}
                    </p>
                    <p className="text-sm text-[#71152F] mt-0.5">{line.hy}</p>
                  </div>
                  {open ? (
                    <ChevronUp className="w-5 h-5 text-[#71152F] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#71152F] shrink-0" />
                  )}
                </button>

                {open && (
                  <div className="px-5 pb-5 pt-3 border-t border-[#71152F]/10 space-y-4 bg-[#FFFDF9]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-[#A71D36]">Sentido (ES)</p>
                        <p className="text-sm text-[#2B0A14] leading-relaxed">{line.meaningEs}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-[#A71D36]">Իմաստը (HY)</p>
                        <p className="text-sm text-[#2B0A14] leading-relaxed">{line.meaningHy}</p>
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#FFF1DF] p-4 space-y-2">
                      <p className="text-xs font-semibold text-[#71152F]">
                        Vocabulario esencial · Կարևոր բառապաշար
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {line.words.map((w) => (
                          <div key={w.word} className="bg-white/80 rounded-lg p-3 border border-[#71152F]/10">
                            <p className="text-sm font-bold text-[#71152F]">
                              {w.word} <span className="font-medium text-[#C93439]">· {w.hy}</span>
                            </p>
                            <p className="text-xs text-[#5A2434] mt-1">{w.noteHy}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-xl bg-[#71152F]/5 border border-[#71152F]/15 p-4 space-y-1.5">
                      <p className="text-xs font-semibold text-[#71152F] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Gramática · {line.grammarEs}</span>
                      </p>
                      <p className="text-sm text-[#2B0A14]">{line.grammarHy}</p>
                      <div className="flex flex-wrap gap-3 pt-2">
                        {line.grammarTopicId && (
                          <button
                            type="button"
                            onClick={() => onOpenGrammarTopic(line.grammarTopicId!)}
                            className="text-xs font-semibold text-[#A71D36] underline cursor-pointer"
                          >
                            Ir a la lección de gramática →
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onJumpToVideo(line.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#71152F] underline cursor-pointer"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Escuchar en el vídeo</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
