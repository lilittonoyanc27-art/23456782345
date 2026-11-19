import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Headphones,
  Pause,
  Play,
  RotateCcw,
  Sliders,
  XCircle,
} from 'lucide-react';
import { LISTENING_EXERCISES } from './gamesData';
import { LYRIC_LINES, YOUTUBE_VIDEO_ID } from './lyricsData';
import { formatTime } from './progressStore';
import { MistakeRecord, TimestampMap } from './types';
import { loadYouTubeIframeAPI, YTPlayerInstance } from './youtubeApi';

interface EscuchaViewProps {
  timestamps: TimestampMap;
  escuchaClips: TimestampMap;
  onSaveEscuchaClip: (exerciseId: string, start: number | null, end: number | null) => void;
  completedIds: string[];
  onCompleteExercise: (id: string) => void;
  onRecordMistake: (mistake: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}

function shuffleDeterministic(tokens: string[], seedStr: string): string[] {
  const arr = [...tokens];
  let seed = 0;
  for (let i = 0; i < seedStr.length; i++) seed += seedStr.charCodeAt(i);
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (seed * 31 + 17) % 1000;
    const j = seed % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.join(' ') === tokens.join(' ') && arr.length > 1) {
    [arr[0], arr[1]] = [arr[1], arr[0]];
  }
  return arr;
}

export const EscuchaView: React.FC<EscuchaViewProps> = ({
  timestamps,
  escuchaClips,
  onSaveEscuchaClip,
  completedIds,
  onCompleteExercise,
  onRecordMistake,
}) => {
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const [exIndex, setExIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [builtTokens, setBuiltTokens] = useState<{ text: string; poolIdx: number }[]>([]);
  const [orderChecked, setOrderChecked] = useState<boolean | null>(null);
  const [showClipBinder, setShowClipBinder] = useState(false);

  const ex = LISTENING_EXERCISES[exIndex] ?? LISTENING_EXERCISES[0];
  const refLine = LYRIC_LINES.find((l) => l.id === ex.lineId);

  // Effective clip interval: custom exercise binding -> fallback to main synced line timestamp -> null
  const effectiveClip = escuchaClips[ex.id] ?? timestamps[ex.lineId] ?? { start: null, end: null };

  const scrambledPool = useMemo(() => {
    if (!ex.orderedTokens) return [];
    return shuffleDeterministic(ex.orderedTokens, ex.id);
  }, [ex.id, ex.orderedTokens]);

  useEffect(() => {
    let mounted = true;
    loadYouTubeIframeAPI()
      .then((YT) => {
        if (!mounted || !playerHostRef.current) return;
        const p = new YT.Player(playerHostRef.current, {
          videoId: YOUTUBE_VIDEO_ID,
          width: '100%',
          height: '100%',
          playerVars: {
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (e) => {
              if (!mounted) return;
              playerRef.current = e.target;
              setPlayerReady(true);
            },
            onStateChange: (e) => {
              if (!mounted) return;
              setIsPlaying(e.data === 1);
            },
          },
        });
        playerRef.current = p;
      })
      .catch(() => {});

    return () => {
      mounted = false;
      try {
        playerRef.current?.destroy();
      } catch {
        // ignore
      }
      playerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      const p = playerRef.current;
      if (!p || typeof p.getCurrentTime !== 'function') return;
      try {
        const t = p.getCurrentTime();
        if (typeof t === 'number' && !Number.isNaN(t)) {
          setCurrentTime(t);
          if (
            isPlaying &&
            effectiveClip.end !== null &&
            effectiveClip.end !== undefined &&
            t >= effectiveClip.end
          ) {
            p.pauseVideo();
          }
        }
      } catch {
        // ignore
      }
    }, 200);
    return () => window.clearInterval(id);
  }, [effectiveClip.end, isPlaying]);

  const goToExercise = (idx: number) => {
    setExIndex(idx);
    setSelectedChoice(null);
    setBuiltTokens([]);
    setOrderChecked(null);
  };

  const playFragment = () => {
    if (!playerRef.current || !playerReady) return;
    if (effectiveClip.start !== null && effectiveClip.start !== undefined) {
      playerRef.current.seekTo(effectiveClip.start, true);
    }
    playerRef.current.playVideo();
  };

  const togglePlayPause = () => {
    if (!playerRef.current || !playerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playFragment();
    }
  };

  const handleChooseOption = (opt: string) => {
    setSelectedChoice(opt);
    if (opt === ex.correctOption) {
      onCompleteExercise(ex.id);
    } else {
      onRecordMistake({
        source: `Escucha: ${ex.typeLabelEs}`,
        promptEs: ex.promptEs || ex.instructionEs,
        chosenAnswer: opt,
        correctAnswer: ex.correctOption || '',
        topicRef: 'Escucha activa',
        explanationHy: ex.explanationHy,
      });
    }
  };

  const handleAddToken = (text: string, poolIdx: number) => {
    if (builtTokens.some((b) => b.poolIdx === poolIdx)) return;
    setBuiltTokens((prev) => [...prev, { text, poolIdx }]);
    setOrderChecked(null);
  };

  const handleRemoveToken = (idxInBuilt: number) => {
    setBuiltTokens((prev) => prev.filter((_, i) => i !== idxInBuilt));
    setOrderChecked(null);
  };

  const handleCheckOrder = () => {
    if (!ex.orderedTokens) return;
    const userSentence = builtTokens.map((b) => b.text).join(' ');
    const target = ex.orderedTokens.join(' ');
    const ok = userSentence === target;
    setOrderChecked(ok);
    if (ok) {
      onCompleteExercise(ex.id);
    } else {
      onRecordMistake({
        source: 'Escucha: Construye la frase',
        promptEs: ex.instructionEs,
        chosenAnswer: userSentence || '(vacío)',
        correctAnswer: target,
        topicRef: 'Escucha activa',
        explanationHy: ex.explanationHy,
      });
    }
  };

  const choicesList = useMemo(() => {
    const base = ex.type === 'difference' ? ex.diffPair ?? [] : ex.options ?? [];
    return shuffleDeterministic(base, `${ex.id}_opts`);
  }, [ex.diffPair, ex.id, ex.options, ex.type]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            6 tipos de ejercicios · 12 retos con vídeo real · Լսողական ընկալում
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            Escucha — Comprensión auditiva
          </h2>
          <p className="text-sm text-[#5A2434] mt-1">
            Escucha fragmentos reales del vídeo oficial y entrena el oído: palabras, tiempos verbales, orden y diferencias sutiles.
          </p>
        </div>
        <div className="text-sm font-medium text-[#71152F] tabular-nums">
          Superados: <strong className="text-[#C93439]">{completedIds.length}</strong> / {LISTENING_EXERCISES.length}
        </div>
      </div>

      {/* Exercise selector strip */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {LISTENING_EXERCISES.map((item, i) => {
          const active = i === exIndex;
          const done = completedIds.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goToExercise(i)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                active
                  ? 'bg-[#71152F] text-[#FFF1DF] border-[#71152F]'
                  : done
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white text-[#71152F] border-[#71152F]/15 hover:bg-[#FFF1DF]'
              }`}
            >
              {i + 1}. {item.typeLabelEs} {done ? '✓' : ''}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Real YouTube Fragment Player + Custom Fragment Binder */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden bg-[#1D070E] border border-[#71152F]/20">
            <div className="aspect-video w-full">
              <div ref={playerHostRef} className="w-full h-full" />
            </div>
            <div className="p-4 bg-gradient-to-r from-[#71152F] to-[#A71D36] text-[#FFF1DF] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#F6B94C]">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Fragmento real · {refLine?.sectionLabel}</span>
                </span>
                <span className="font-mono tabular-nums">{formatTime(currentTime)}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F07835] hover:bg-[#C93439] text-white text-xs font-semibold cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlaying ? 'Pausar' : 'Escuchar fragmento'}</span>
                </button>
                <button
                  type="button"
                  onClick={playFragment}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repetir</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowClipBinder((v) => !v)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold cursor-pointer"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Vincular tiempo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Transparent customizable fragment binding */}
          <div className="rounded-2xl bg-[#FFF1DF] border border-[#F07835]/30 p-4 text-xs text-[#4D1626] space-y-2">
            <div className="flex items-center justify-between font-semibold text-[#71152F]">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#F07835]" />
                <span>Intervalo vinculado</span>
              </span>
              <span className="font-mono tabular-nums">
                {effectiveClip.start !== null && effectiveClip.start !== undefined
                  ? `${formatTime(effectiveClip.start)} → ${
                      effectiveClip.end !== null && effectiveClip.end !== undefined
                        ? formatTime(effectiveClip.end)
                        : 'libre'
                    }`
                  : 'Sin vincular (reproducción libre)'}
              </span>
            </div>
            <p className="leading-relaxed">
              Si aún no has sincronizado esta línea, pulsa «Vincular tiempo» para guardar el segundo exacto de inicio y fin de este ejercicio sin usar tiempos inventados.
            </p>
          </div>

          {showClipBinder && (
            <div className="rounded-2xl bg-white border border-[#71152F]/20 p-4 space-y-3">
              <p className="text-xs font-bold text-[#71152F]">
                Ajustar intervalo para Ejercicio {exIndex + 1} · Կարգավորել հատվածի ժամանակը
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#5A2434]">Inicio (s)</label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={effectiveClip.start ?? ''}
                      onChange={(e) =>
                        onSaveEscuchaClip(
                          ex.id,
                          e.target.value === '' ? null : Number(e.target.value),
                          effectiveClip.end
                        )
                      }
                      className="w-full rounded-lg border border-[#71152F]/20 px-2.5 py-1.5 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onSaveEscuchaClip(
                          ex.id,
                          Math.round(currentTime * 10) / 10,
                          effectiveClip.end
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-[#F07835] text-white text-[11px] font-semibold cursor-pointer"
                    >
                      Ahora
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-[#5A2434]">Fin (s)</label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={effectiveClip.end ?? ''}
                      onChange={(e) =>
                        onSaveEscuchaClip(
                          ex.id,
                          effectiveClip.start,
                          e.target.value === '' ? null : Number(e.target.value)
                        )
                      }
                      className="w-full rounded-lg border border-[#71152F]/20 px-2.5 py-1.5 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        onSaveEscuchaClip(
                          ex.id,
                          effectiveClip.start,
                          Math.round(currentTime * 10) / 10
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-[#71152F] text-white text-[11px] font-semibold cursor-pointer"
                    >
                      Ahora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Exercise Stage */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#71152F]/15 p-5 sm:p-7 space-y-5">
          <div className="border-b border-[#71152F]/10 pb-3">
            <p className="text-xs font-semibold text-[#A71D36]">
              Ejercicio {exIndex + 1} / {LISTENING_EXERCISES.length} · {ex.typeLabelEs} / {ex.typeLabelHy}
            </p>
            <h3 className="font-display text-xl font-bold text-[#71152F] mt-1">
              {ex.instructionEs}
            </h3>
            <p className="text-sm text-[#5A2434] mt-0.5">{ex.instructionHy}</p>
          </div>

          {ex.promptEs && (
            <div className="rounded-xl bg-[#FFF8F0] border border-[#F07835]/35 px-5 py-4 font-display text-xl font-bold text-[#71152F]">
              {ex.promptEs}
            </div>
          )}

          {ex.type === 'order' ? (
            <div className="space-y-4">
              {/* Answer slots */}
              <div className="min-h-[68px] rounded-2xl bg-[#FFF8F0] border border-dashed border-[#71152F]/30 p-3.5 flex flex-wrap gap-2 items-center">
                {builtTokens.length === 0 ? (
                  <span className="text-xs text-[#71152F]/60">
                    Pulsa las palabras de abajo en orden · Սեղմիր ներքևի բառերի վրա՝ ճիշտ հերթականությամբ
                  </span>
                ) : (
                  builtTokens.map((t, i) => (
                    <button
                      key={`${t.poolIdx}_${i}`}
                      type="button"
                      onClick={() => handleRemoveToken(i)}
                      className="px-3.5 py-2 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer hover:bg-[#A71D36]"
                    >
                      {t.text}
                    </button>
                  ))
                )}
              </div>

              {/* Word pool */}
              <div className="flex flex-wrap gap-2">
                {scrambledPool.map((word, pIdx) => {
                  const used = builtTokens.some((b) => b.poolIdx === pIdx);
                  return (
                    <button
                      key={`${word}_${pIdx}`}
                      type="button"
                      disabled={used}
                      onClick={() => handleAddToken(word, pIdx)}
                      className={`px-3.5 py-2 rounded-xl border text-sm font-semibold transition-colors cursor-pointer ${
                        used
                          ? 'opacity-30 bg-[#FFF1DF] border-transparent cursor-not-allowed'
                          : 'bg-white border-[#71152F]/25 text-[#2B0A14] hover:bg-[#FFF1DF]'
                      }`}
                    >
                      {word}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCheckOrder}
                  className="px-5 py-2.5 rounded-xl bg-[#A71D36] hover:bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
                >
                  Comprobar · Ստուգել
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setBuiltTokens([]);
                    setOrderChecked(null);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#FFF1DF] text-[#71152F] text-sm font-semibold cursor-pointer"
                >
                  Reiniciar
                </button>
              </div>

              {orderChecked !== null && (
                <div
                  className={`rounded-xl p-4 text-sm flex items-start gap-2.5 ${
                    orderChecked
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-[#71152F] border border-[#C93439]/30'
                  }`}
                >
                  {orderChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#C93439] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold text-xs">
                      {orderChecked ? '¡Frase exacta! · Ճշգրիտ է' : 'Revisa el orden · Ստուգիր հերթականությունը'}
                    </p>
                    <p className="text-xs sm:text-sm mt-1">{ex.explanationHy}</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 gap-2.5">
                {choicesList.map((opt) => {
                  const answered = selectedChoice !== null;
                  let style = 'bg-white border-[#71152F]/20 text-[#2B0A14] hover:bg-[#FFF1DF]';
                  if (answered) {
                    if (opt === ex.correctOption) {
                      style = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
                    } else if (opt === selectedChoice) {
                      style = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
                    }
                  }
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleChooseOption(opt)}
                      className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm sm:text-base transition-colors cursor-pointer ${style}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selectedChoice !== null && (
                <div
                  className={`rounded-xl p-4 text-sm flex items-start gap-2.5 ${
                    selectedChoice === ex.correctOption
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-50 text-[#71152F] border border-[#C93439]/30'
                  }`}
                >
                  {selectedChoice === ex.correctOption ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[#C93439] shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-bold text-xs">
                      {selectedChoice === ex.correctOption
                        ? '¡Buen oído! · Հիանալի լսողություն'
                        : `Respuesta correcta: «${ex.correctOption}»`}
                    </p>
                    <p className="text-xs sm:text-sm mt-1">{ex.explanationHy}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prev / Next */}
          <div className="flex items-center justify-between pt-4 border-t border-[#71152F]/10">
            <button
              type="button"
              disabled={exIndex === 0}
              onClick={() => goToExercise(exIndex - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFF1DF] text-[#71152F] text-sm font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              disabled={exIndex === LISTENING_EXERCISES.length - 1}
              onClick={() => goToExercise(exIndex + 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#A71D36] hover:bg-[#71152F] text-[#FFF1DF] text-sm font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <span>Siguiente ejercicio</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
