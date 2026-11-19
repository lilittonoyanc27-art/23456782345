import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Mic,
  Pause,
  Play,
  RotateCcw,
  Volume2,
} from 'lucide-react';
import { SING_MINI_QUESTIONS } from './gamesData';
import { SINGABLE_LINES, SONG_SECTIONS, YOUTUBE_VIDEO_ID } from './lyricsData';
import { formatTime } from './progressStore';
import { TimestampMap } from './types';
import { loadYouTubeIframeAPI, YTPlayerInstance } from './youtubeApi';

interface SingLearnViewProps {
  timestamps: TimestampMap;
  completedLineIds: string[];
  onCompleteLine: (lineId: string) => void;
  onGoToSync: (lineId: string) => void;
}

export const SingLearnView: React.FC<SingLearnViewProps> = ({
  timestamps,
  completedLineIds,
  onCompleteLine,
  onGoToSync,
}) => {
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [showExpressions, setShowExpressions] = useState(false);
  const [repeatedAloud, setRepeatedAloud] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showMiniQHy, setShowMiniQHy] = useState(false);
  const [openMiniOptHy, setOpenMiniOptHy] = useState<Record<string, boolean>>({});
  const [clipNotice, setClipNotice] = useState<string | null>(null);

  const line = SINGABLE_LINES[currentIdx] ?? SINGABLE_LINES[0];
  const baseKey = line.id.split('_').pop() ?? 'v1';
  const miniQ = SING_MINI_QUESTIONS[baseKey];

  const shuffledMiniOptions = useMemo(() => {
    if (!miniQ) return [];
    const arr = miniQ.options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === miniQ.correctIndex,
    }));
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [line.id, miniQ]);

  const stanzas = useMemo(
    () => SONG_SECTIONS.filter((s) => s.key !== 'instrumental'),
    []
  );

  // Initialize official YouTube player for real listening
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

  // Stop at line end if synced
  useEffect(() => {
    const interval = window.setInterval(() => {
      const p = playerRef.current;
      const ts = timestamps[line.id];
      if (!p || !isPlaying || !ts || ts.end === null || ts.end === undefined) return;
      try {
        if (p.getCurrentTime() >= ts.end) {
          p.pauseVideo();
        }
      } catch {
        // ignore
      }
    }, 200);
    return () => window.clearInterval(interval);
  }, [isPlaying, line.id, timestamps]);

  const resetLineStep = (nextIdx: number) => {
    setCurrentIdx(nextIdx);
    setShowTranslation(false);
    setShowExpressions(false);
    setRepeatedAloud(false);
    setSelectedAnswer(null);
    setShowMiniQHy(false);
    setOpenMiniOptHy({});
    setClipNotice(null);
  };

  const handlePlayLine = () => {
    if (!playerRef.current || !playerReady) return;
    const ts = timestamps[line.id];
    if (ts && ts.start !== null) {
      playerRef.current.seekTo(ts.start, true);
      playerRef.current.playVideo();
      setClipNotice(null);
    } else {
      playerRef.current.playVideo();
      setClipNotice(
        'Esta línea aún no tiene marca de tiempo guardada. Puedes fijar su segundo exacto en «Vídeo y subtítulos».'
      );
    }
  };

  const handleTogglePlayPause = () => {
    if (!playerRef.current || !playerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      handlePlayLine();
    }
  };

  const handleAnswerMiniQ = (optEs: string, isCorrect: boolean) => {
    setSelectedAnswer(optEs);
    if (isCorrect) {
      onCompleteLine(line.id);
    }
  };

  const ts = timestamps[line.id];
  const selectedMiniObj = shuffledMiniOptions.find((o) => o.es === selectedAnswer);

  return (
    <div className="space-y-6">
      <div className="border-b border-[#71152F]/15 pb-4">
        <p className="text-xs font-medium text-[#A71D36]">
          Método paso a paso · Երգելով սովորելու 7 քայլանոց ռեժիմ
        </p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
          Aprende cantando
        </h2>
        <p className="text-sm text-[#5A2434] mt-1">
          Escucha una línea, léela, descubre su traducción, estudia sus expresiones, repítela en voz alta y supera el mini-reto.
        </p>
      </div>

      {/* Stanza progress strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {stanzas.map((sec) => {
          const secLines = SINGABLE_LINES.filter((l) => l.section === sec.key);
          const doneCount = secLines.filter((l) => completedLineIds.includes(l.id)).length;
          const pct = Math.round((doneCount / secLines.length) * 100);
          const isCurrentSec = line.section === sec.key;

          return (
            <button
              key={sec.key}
              type="button"
              onClick={() => {
                const firstIdx = SINGABLE_LINES.findIndex((l) => l.section === sec.key);
                if (firstIdx !== -1) resetLineStep(firstIdx);
              }}
              className={`rounded-xl p-3 text-left border transition-colors cursor-pointer ${
                isCurrentSec
                  ? 'bg-[#71152F] text-[#FFF1DF] border-[#71152F]'
                  : 'bg-white text-[#2B0A14] border-[#71152F]/15 hover:bg-[#FFF1DF]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>{sec.label.replace(/\[|\]/g, '')}</span>
                <span className="font-mono tabular-nums">{pct}%</span>
              </div>
              <div
                className={`mt-2 h-1.5 rounded-full overflow-hidden ${
                  isCurrentSec ? 'bg-white/20' : 'bg-[#FFF1DF]'
                }`}
              >
                <div
                  className="h-full bg-[#F6B94C] transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p
                className={`text-[11px] mt-1 tabular-nums ${
                  isCurrentSec ? 'text-[#F6B94C]' : 'text-[#5A2434]'
                }`}
              >
                {doneCount}/{secLines.length} · {sec.labelHy}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main 2-column guided stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Video & Step 1: Listen */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl overflow-hidden bg-[#1D070E] border border-[#71152F]/20">
            <div className="aspect-video w-full">
              <div ref={playerHostRef} className="w-full h-full" />
            </div>
            <div className="p-4 bg-[#71152F] text-[#FFF1DF] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTogglePlayPause}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F07835] hover:bg-[#C93439] text-white text-xs font-semibold cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>1. Escuchar línea</span>
                </button>
                <button
                  type="button"
                  onClick={handlePlayLine}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Repetir</span>
                </button>
              </div>
              <span className="text-[11px] font-mono tabular-nums text-[#F6B94C]">
                {ts?.start !== null && ts?.start !== undefined
                  ? `${formatTime(ts.start)}${ts.end ? `–${formatTime(ts.end)}` : ''}`
                  : 'Sin marca exacta'}
              </span>
            </div>
          </div>

          {clipNotice && (
            <div className="rounded-xl bg-[#FFF1DF] border border-[#F07835]/35 p-3.5 text-xs text-[#5A2434] space-y-1.5">
              <p>{clipNotice}</p>
              <button
                type="button"
                onClick={() => onGoToSync(line.id)}
                className="font-semibold text-[#A71D36] underline cursor-pointer"
              >
                Abrir Editor de sincronización para esta línea →
              </button>
            </div>
          )}
        </div>

        {/* Steps 2–7 Interactive Card */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#71152F]/15 p-5 sm:p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#71152F]/10 pb-3">
            <span className="text-xs font-semibold text-[#A71D36]">
              {line.sectionLabel} · Línea {currentIdx + 1} de {SINGABLE_LINES.length}
            </span>
            {completedLineIds.includes(line.id) && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dominada · Յուրացված է</span>
              </span>
            )}
          </div>

          {/* Step 2 & 3: Read Spanish + Click for Armenian translation */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-[#71152F]/75">
              Paso 2 y 3 · Lee en español y pulsa para ver el armenio
            </p>
            <button
              type="button"
              onClick={() => setShowTranslation((v) => !v)}
              className="w-full text-left rounded-2xl bg-gradient-to-r from-[#FFF1DF] to-[#F6B94C]/25 border border-[#F07835]/40 p-5 hover:border-[#F07835] transition-colors cursor-pointer space-y-2"
            >
              <p className="font-display text-2xl font-bold text-[#71152F] leading-snug">
                {line.es}
              </p>
              {showTranslation ? (
                <p className="text-base sm:text-lg font-semibold text-[#A71D36] pt-2 border-t border-[#71152F]/15">
                  {line.hy}
                </p>
              ) : (
                <p className="text-xs font-semibold text-[#C93439] flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pulsa aquí para descubrir la traducción armenia · Սեղմիր՝ հայերենը տեսնելու համար</span>
                </p>
              )}
            </button>
          </div>

          {/* Step 4: Study expressions */}
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowExpressions((v) => !v)}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#71152F] hover:text-[#A71D36] cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-[#F07835]" />
              <span>
                Paso 4 · {showExpressions ? 'Ocultar expresiones clave' : 'Estudiar expresiones clave · Ուսումնասիրել արտահայտությունները'}
              </span>
            </button>

            {showExpressions && (
              <div className="rounded-xl bg-[#FFF8F0] border border-[#71152F]/15 p-4 space-y-2.5">
                {line.words.map((w) => (
                  <div key={w.word} className="text-sm">
                    <span className="font-bold text-[#71152F]">{w.word}</span>{' '}
                    <span className="text-[#C93439] font-medium">— {w.hy}</span>
                    <p className="text-xs text-[#5A2434] mt-0.5">{w.noteHy}</p>
                  </div>
                ))}
                <p className="text-xs text-[#71152F] pt-2 border-t border-[#71152F]/10">
                  <strong>Gramática:</strong> {line.grammarHy}
                </p>
              </div>
            )}
          </div>

          {/* Step 5: Repeat aloud */}
          <div className="rounded-xl bg-[#FFF8F0] border border-[#71152F]/15 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Mic className="w-4 h-4 text-[#A71D36] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#71152F]">
                  Paso 5 · Repite la línea en voz alta con ritmo
                </p>
                <p className="text-xs text-[#5A2434]">
                  Բարձրաձայն կրկնիր տողը երգի ռիթմով և նշիր, երբ վստահ արտասանես։
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRepeatedAloud((v) => !v)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap transition-colors ${
                repeatedAloud
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-[#71152F]/20 text-[#71152F]'
              }`}
            >
              {repeatedAloud ? '✓ Ya la repetí' : 'Marcar repetida'}
            </button>
          </div>

          {/* Step 6: Mini-question */}
          {miniQ && (
            <div className="space-y-3 pt-2 border-t border-[#71152F]/10">
              <p className="text-xs font-bold text-[#A71D36]">
                Paso 6 · Pequeña comprobación · Փոքր ստուգում
              </p>
              <button
                type="button"
                onClick={() => setShowMiniQHy((v) => !v)}
                className="w-full text-left rounded-xl bg-[#FFF8F0] border border-[#71152F]/15 p-3.5 cursor-pointer hover:bg-[#FFF1DF] transition-colors"
              >
                <p className="text-base font-semibold text-[#2B0A14]">{miniQ.promptEs}</p>
                {showMiniQHy ? (
                  <p className="text-sm text-[#71152F] font-medium mt-1">{miniQ.promptHy}</p>
                ) : (
                  <p className="text-xs text-[#71152F]/70 mt-0.5">
                    Pulsa para traducir al armenio · Սեղմիր՝ թարգմանելու համար
                  </p>
                )}
              </button>

              <div className="grid grid-cols-1 gap-2">
                {shuffledMiniOptions.map((opt) => {
                  const answered = selectedAnswer !== null;
                  let cls = 'bg-white border-[#71152F]/20 text-[#2B0A14] hover:bg-[#FFF1DF]';
                  if (answered) {
                    if (opt.isCorrect) {
                      cls = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
                    } else if (opt.es === selectedAnswer) {
                      cls = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
                    }
                  }
                  const hyOpen = Boolean(openMiniOptHy[opt.es]);
                  return (
                    <div key={opt.es} className={`rounded-xl border transition-colors ${cls}`}>
                      <div className="flex items-stretch justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleAnswerMiniQ(opt.es, opt.isCorrect)}
                          className="flex-1 px-4 py-3 text-sm text-left cursor-pointer"
                        >
                          {opt.es}
                        </button>
                        {opt.hy && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMiniOptHy((prev) => ({ ...prev, [opt.es]: !prev[opt.es] }));
                            }}
                            className={`px-2.5 my-1.5 mr-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                              hyOpen ? 'bg-[#71152F] text-[#FFF1DF]' : 'bg-[#FFF1DF] text-[#71152F]'
                            }`}
                          >
                            HY
                          </button>
                        )}
                      </div>
                      {opt.hy && hyOpen && (
                        <div className="px-4 pb-2.5 pt-1 border-t border-[#71152F]/10 text-xs text-[#71152F] font-medium">
                          {opt.hy}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              {selectedMiniObj && (
                <p
                  className={`text-sm font-medium pt-1 ${
                    selectedMiniObj.isCorrect ? 'text-emerald-700' : 'text-[#C93439]'
                  }`}
                >
                  {selectedMiniObj.isCorrect ? '✓ ¡Excelente! ' : '✗ Intenta de nuevo: '}
                  {miniQ.explanationHy}
                </p>
              )}
            </div>
          )}

          {/* Step 7: Navigate lines */}
          <div className="flex items-center justify-between pt-4 border-t border-[#71152F]/10">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => resetLineStep(currentIdx - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFF1DF] text-[#71152F] text-sm font-semibold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              onClick={() => {
                if (!completedLineIds.includes(line.id) && repeatedAloud) {
                  onCompleteLine(line.id);
                }
                if (currentIdx < SINGABLE_LINES.length - 1) {
                  resetLineStep(currentIdx + 1);
                }
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#A71D36] hover:bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
            >
              <span>
                {currentIdx === SINGABLE_LINES.length - 1
                  ? 'Finalizar canción'
                  : 'Paso 7 · Siguiente línea'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
