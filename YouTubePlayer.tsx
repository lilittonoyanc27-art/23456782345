import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronRight,
  Clock,
  Download,
  Eye,
  EyeOff,
  Pause,
  Play,
  RotateCcw,
  Save,
  Sliders,
  Trash2,
  Upload,
} from 'lucide-react';
import { LYRIC_LINES, SONG_SECTIONS, YOUTUBE_VIDEO_ID } from './lyricsData';
import { formatTime } from './progressStore';
import { LineTimestamp, TimestampMap } from './types';
import { loadYouTubeIframeAPI, YTPlayerInstance } from './youtubeApi';

interface YouTubePlayerViewProps {
  timestamps: TimestampMap;
  onUpdateTimestamps: (next: TimestampMap) => void;
  onResetTimestamps: () => void;
  jumpToLineId: string | null;
  onClearJump: () => void;
}

export const YouTubePlayerView: React.FC<YouTubePlayerViewProps> = ({
  timestamps,
  onUpdateTimestamps,
  onResetTimestamps,
  jumpToLineId,
  onClearJump,
}) => {
  const playerHostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const subtitleListRef = useRef<HTMLDivElement | null>(null);

  const [playerReady, setPlayerReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [activeLineIndex, setActiveLineIndex] = useState<number>(0);
  const [openTranslations, setOpenTranslations] = useState<Record<string, boolean>>({});
  const [showAllTranslations, setShowAllTranslations] = useState(false);
  const [showSyncEditor, setShowSyncEditor] = useState(false);
  const [liveSyncMode, setLiveSyncMode] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);
  const [importText, setImportText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [repeatLoop, setRepeatLoop] = useState(false);

  const syncedCount = useMemo(
    () => LYRIC_LINES.filter((l) => timestamps[l.id]?.start !== null && timestamps[l.id]?.start !== undefined).length,
    [timestamps]
  );

  // Initialize official YouTube IFrame Player
  useEffect(() => {
    let mounted = true;
    loadYouTubeIframeAPI()
      .then((YT) => {
        if (!mounted || !playerHostRef.current) return;
        const instance = new YT.Player(playerHostRef.current, {
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
              const dur = e.target.getDuration();
              if (dur > 0) setDuration(dur);
            },
            onStateChange: (e) => {
              if (!mounted) return;
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              setIsPlaying(e.data === 1);
            },
          },
        });
        playerRef.current = instance;
      })
      .catch(() => {
        // Fallback handled visually if offline
      });

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

  // Poll player time smoothly and sync active line ONLY for lines that have real user-calibrated timestamps
  useEffect(() => {
    const interval = window.setInterval(() => {
      const p = playerRef.current;
      if (!p || typeof p.getCurrentTime !== 'function') return;
      try {
        const t = p.getCurrentTime();
        if (typeof t === 'number' && !Number.isNaN(t)) {
          setCurrentTime(t);
          const dur = p.getDuration();
          if (dur > 0) setDuration(dur);

          // If repeat loop is active on the selected line and it has start & end
          const currentLine = LYRIC_LINES[activeLineIndex];
          const currentTs = currentLine ? timestamps[currentLine.id] : undefined;
          if (
            repeatLoop &&
            isPlaying &&
            currentTs &&
            currentTs.start !== null &&
            currentTs.end !== null &&
            currentTs.end > currentTs.start &&
            t >= currentTs.end
          ) {
            p.seekTo(currentTs.start, true);
            return;
          }

          // Auto-advance active line if timestamps exist for lines
          if (isPlaying && !liveSyncMode) {
            let matchedIdx = -1;
            for (let i = 0; i < LYRIC_LINES.length; i++) {
              const ts = timestamps[LYRIC_LINES[i].id];
              if (!ts || ts.start === null) continue;
              const endVal = ts.end ?? (LYRIC_LINES[i + 1] ? timestamps[LYRIC_LINES[i + 1].id]?.start : null);
              if (t >= ts.start && (endVal === null || endVal === undefined || t < endVal)) {
                matchedIdx = i;
              }
            }
            if (matchedIdx !== -1 && matchedIdx !== activeLineIndex) {
              setActiveLineIndex(matchedIdx);
            }
          }
        }
      } catch {
        // ignore transient iframe readiness errors
      }
    }, 200);

    return () => window.clearInterval(interval);
  }, [activeLineIndex, isPlaying, liveSyncMode, repeatLoop, timestamps]);

  // Handle jump from full transcript or other tabs
  useEffect(() => {
    if (!jumpToLineId) return;
    const idx = LYRIC_LINES.findIndex((l) => l.id === jumpToLineId);
    if (idx !== -1) {
      setActiveLineIndex(idx);
      setOpenTranslations((prev) => ({ ...prev, [jumpToLineId]: true }));
      const ts = timestamps[jumpToLineId];
      if (playerRef.current && playerReady) {
        if (ts && ts.start !== null) {
          playerRef.current.seekTo(ts.start, true);
          playerRef.current.playVideo();
          setNoticeMessage(null);
        } else {
          setNoticeMessage(
            'Esta línea aún no tiene marca de tiempo guardada. Abre «Sincronizar» para fijar el segundo exacto. / Այս տողի ժամանակային նշիչը դեռ պահպանված չէ։ Բացիր «Սինխրոնացում» խմբագիրը՝ ճշգրիտ վայրկյանը նշելու համար։'
          );
          setShowSyncEditor(true);
        }
      }
    }
    onClearJump();
  }, [jumpToLineId, onClearJump, playerReady, timestamps]);

  const activeLine = LYRIC_LINES[activeLineIndex] ?? LYRIC_LINES[0];

  const toggleLineTranslation = (lineId: string) => {
    setOpenTranslations((prev) => ({
      ...prev,
      [lineId]: !prev[lineId],
    }));
  };

  const handleShowAll = () => {
    const next: Record<string, boolean> = {};
    LYRIC_LINES.forEach((l) => {
      next[l.id] = true;
    });
    setOpenTranslations(next);
    setShowAllTranslations(true);
  };

  const handleHideAll = () => {
    setOpenTranslations({});
    setShowAllTranslations(false);
  };

  const seekToLine = (idx: number, autoPlay = true) => {
    const line = LYRIC_LINES[idx];
    if (!line) return;
    setActiveLineIndex(idx);
    const ts = timestamps[line.id];
    if (playerRef.current && playerReady && ts && ts.start !== null) {
      playerRef.current.seekTo(ts.start, true);
      if (autoPlay) playerRef.current.playVideo();
      setNoticeMessage(null);
    } else if (!ts || ts.start === null) {
      setNoticeMessage(
        'Sin marca de tiempo exacta todavía: puedes activar el Editor de sincronización para guardar el momento exacto de esta línea. / Ճշգրիտ ժամանակը դեռ նշված չէ. կարող ես բացել խմբագիրը և նշել այս տողի սկիզբն ու ավարտը։'
      );
    }
  };

  const handleRepeat = () => {
    const ts = timestamps[activeLine.id];
    if (playerRef.current && playerReady) {
      if (ts && ts.start !== null) {
        playerRef.current.seekTo(ts.start, true);
        playerRef.current.playVideo();
      } else {
        const back = Math.max(0, currentTime - 5);
        playerRef.current.seekTo(back, true);
        playerRef.current.playVideo();
      }
    }
  };

  const handleNext = () => {
    const nextIdx = Math.min(LYRIC_LINES.length - 1, activeLineIndex + 1);
    seekToLine(nextIdx, isPlaying);
  };

  const handlePlayPause = () => {
    if (!playerRef.current || !playerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const updateLineTime = (lineId: string, patch: Partial<LineTimestamp>) => {
    const existing = timestamps[lineId] ?? { start: null, end: null };
    const next: TimestampMap = {
      ...timestamps,
      [lineId]: {
        start: patch.start !== undefined ? patch.start : existing.start,
        end: patch.end !== undefined ? patch.end : existing.end,
      },
    };
    onUpdateTimestamps(next);
  };

  const markStartNow = (lineId: string) => {
    const t = Math.round(currentTime * 10) / 10;
    updateLineTime(lineId, { start: t });
    setNoticeMessage(null);
  };

  const markEndNow = (lineId: string) => {
    const t = Math.round(currentTime * 10) / 10;
    updateLineTime(lineId, { end: t });
    setNoticeMessage(null);
  };

  // One-tap live capture: marks start of active line (and closes previous line's end), then steps to next line
  const handleLiveCaptureNext = () => {
    const t = Math.round(currentTime * 10) / 10;
    const nextMap: TimestampMap = { ...timestamps };
    const curr = LYRIC_LINES[activeLineIndex];
    if (!curr) return;

    // Set previous line end if open
    if (activeLineIndex > 0) {
      const prevLine = LYRIC_LINES[activeLineIndex - 1];
      const prevTs = nextMap[prevLine.id] ?? { start: null, end: null };
      if (prevTs.start !== null && (prevTs.end === null || prevTs.end <= prevTs.start)) {
        nextMap[prevLine.id] = { ...prevTs, end: t };
      }
    }
    const currTs = nextMap[curr.id] ?? { start: null, end: null };
    nextMap[curr.id] = { ...currTs, start: t };
    onUpdateTimestamps(nextMap);

    if (activeLineIndex < LYRIC_LINES.length - 1) {
      setActiveLineIndex(activeLineIndex + 1);
    }
    setNoticeMessage(null);
  };

  const handleExportSync = () => {
    const json = JSON.stringify(timestamps, null, 2);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(json).catch(() => {});
    }
    setNoticeMessage(
      'Datos de sincronización copiados al portapapeles en formato JSON. / Սինխրոնացման տվյալները պատճենվել են JSON ձևաչափով։'
    );
  };

  const handleImportSync = () => {
    try {
      const parsed = JSON.parse(importText) as TimestampMap;
      if (parsed && typeof parsed === 'object') {
        onUpdateTimestamps(parsed);
        setShowImportBox(false);
        setImportText('');
        setNoticeMessage(
          'Sincronización importada y guardada correctamente. / Սինխրոնացումը հաջողությամբ ներմուծվեց և պահպանվեց։'
        );
      }
    } catch {
      setNoticeMessage(
        'Formato JSON no válido. Revisa el texto pegado. / JSON ձևաչափը սխալ է. ստուգիր տեքստը։'
      );
    }
  };

  const isTranslationVisible = (lineId: string) =>
    showAllTranslations || Boolean(openTranslations[lineId]);

  const activeTs = timestamps[activeLine.id];

  return (
    <div className="space-y-6">
      {/* Header summary */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            Natalia Oreiro · Vídeo oficial de YouTube · Subtítulos interactivos ES / HY
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            Vídeo y subtítulos sincronizados
          </h2>
          <p className="text-sm text-[#5A2434] mt-1">
            Տեսանյութ և ինտերակտիվ ենթագրեր. սեղմիր ցանկացած իսպաներեն տողի վրա՝ հայերեն թարգմանությունը տեսնելու համար (նույնիսկ դադարի ժամանակ)։
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowSyncEditor((v) => !v)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              showSyncEditor
                ? 'bg-[#71152F] text-[#FFF1DF]'
                : 'bg-[#FFF1DF] text-[#71152F] border border-[#71152F]/20 hover:bg-[#F6B94C]/30'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{showSyncEditor ? 'Cerrar editor' : 'Editor de sincronización'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-column stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Video + Active Subtitle Banner + Controls */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl overflow-hidden bg-[#1D070E] shadow-lg border border-[#71152F]/20">
            <div className="relative aspect-video w-full bg-[#1D070E]">
              <div ref={playerHostRef} className="w-full h-full" />
            </div>

            {/* Active synchronized subtitle stage right under the video */}
            <div className="bg-gradient-to-r from-[#71152F] via-[#A71D36] to-[#71152F] px-5 py-5 text-[#FFF1DF]">
              <div className="flex items-center justify-between text-xs text-[#F6B94C] mb-2">
                <span className="font-medium">
                  {activeLine.sectionLabel} · Línea {activeLine.order} / {LYRIC_LINES.length}
                </span>
                <span className="font-mono tabular-nums">
                  {formatTime(currentTime)} {duration > 0 ? `/ ${formatTime(duration)}` : ''}
                </span>
              </div>

              <button
                type="button"
                onClick={() => toggleLineTranslation(activeLine.id)}
                className="w-full text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F6B94C] rounded-xl p-2 -mx-2 hover:bg-white/10 transition-colors"
              >
                <p className="font-display text-xl sm:text-2xl font-bold text-[#F6B94C] leading-snug">
                  {activeLine.es}
                </p>
                <p className="text-xs text-[#FFF1DF]/80 mt-1.5">
                  {isTranslationVisible(activeLine.id)
                    ? 'Pulsa para ocultar la traducción · Սեղմիր՝ թարգմանությունը թաքցնելու համար'
                    : 'Pulsa esta línea para ver la traducción al armenio · Սեղմիր տողի վրա՝ հայերեն թարգմանության համար'}
                </p>
              </button>

              {isTranslationVisible(activeLine.id) && (
                <div className="mt-3 pt-3 border-t border-[#F6B94C]/30 text-[#FFF1DF] text-base sm:text-lg font-medium leading-relaxed">
                  {activeLine.hy}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="bg-white rounded-2xl border border-[#71152F]/15 p-4 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handlePlayPause}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#A71D36] hover:bg-[#71152F] text-[#FFF1DF] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pausar' : 'Reproducir'}</span>
            </button>

            <button
              type="button"
              onClick={handleRepeat}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFF1DF] hover:bg-[#F6B94C]/35 text-[#71152F] text-sm font-semibold border border-[#71152F]/15 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Repetir</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFF1DF] hover:bg-[#F6B94C]/35 text-[#71152F] text-sm font-semibold border border-[#71152F]/15 transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleShowAll}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#F07835]/15 hover:bg-[#F07835]/25 text-[#71152F] text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-4 h-4 text-[#C93439]" />
              <span>Mostrar traducción</span>
            </button>

            <button
              type="button"
              onClick={handleHideAll}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#71152F]/5 hover:bg-[#71152F]/10 text-[#71152F] text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <EyeOff className="w-4 h-4" />
              <span>Ocultar traducción</span>
            </button>

            {activeTs?.start !== null && activeTs?.start !== undefined && activeTs?.end !== null && activeTs?.end !== undefined && (
              <button
                type="button"
                onClick={() => setRepeatLoop((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  repeatLoop
                    ? 'bg-[#F07835] text-white'
                    : 'bg-[#FFF1DF] text-[#71152F] border border-[#71152F]/15'
                }`}
              >
                <span>Bucle: {repeatLoop ? 'ON' : 'OFF'}</span>
              </button>
            )}
          </div>

          {/* Transparent sync status note */}
          <div className="bg-[#FFF1DF] rounded-2xl border border-[#F07835]/30 p-4 text-sm text-[#4D1626] space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-[#71152F] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F07835]" />
                Estado de sincronización: {syncedCount} / {LYRIC_LINES.length} líneas calibradas
              </span>
              <span className="text-xs text-[#71152F]/80">
                {syncedCount === 0
                  ? 'Sin marcas inventadas · Չկան հորինված ժամանակներ'
                  : 'Guardado localmente · Պահպանված է բրաուզերում'}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#5A2434]">
              Para garantizar sincronización real sin tiempos inventados, puedes fijar el inicio y el fin exactos de cada línea con el Editor de sincronización mientras escuchas el vídeo. Mientras tanto, todas las líneas son interactivas en todo momento, incluso en pausa.
            </p>
            <p className="text-xs leading-relaxed text-[#5A2434]">
              Ճշգրիտ սինխրոնացման համար կարող ես բացել սինխրոնացման խմբագիրը և մեկ սեղմումով պահպանել յուրաքանչյուր տողի սկիզբն ու ավարտը։ Բոլոր տողերն ու հայերեն թարգմանությունները գործում են նաև դադարի ժամանակ։
            </p>
          </div>

          {noticeMessage && (
            <div className="rounded-xl bg-[#71152F]/10 border border-[#71152F]/25 px-4 py-3 text-xs text-[#71152F] flex items-start justify-between gap-3">
              <span>{noticeMessage}</span>
              <button
                type="button"
                onClick={() => setNoticeMessage(null)}
                className="text-xs font-bold underline shrink-0 cursor-pointer"
              >
                OK
              </button>
            </div>
          )}

          {/* Synchronization Editor Panel */}
          {showSyncEditor && (
            <div className="bg-white rounded-2xl border border-[#71152F]/20 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#71152F]/10 pb-3">
                <div>
                  <h3 className="font-display text-lg font-bold text-[#71152F]">
                    Editor de sincronización · Սինխրոնացման խմբագիր
                  </h3>
                  <p className="text-xs text-[#5A2434] mt-0.5">
                    Tiempo actual del reproductor: <strong className="font-mono tabular-nums text-[#A71D36]">{formatTime(currentTime)}</strong>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setLiveSyncMode((v) => !v)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      liveSyncMode
                        ? 'bg-[#F07835] text-white'
                        : 'bg-[#FFF1DF] text-[#71152F] border border-[#71152F]/20'
                    }`}
                  >
                    {liveSyncMode ? 'Modo en vivo activo' : 'Activar sincronización en vivo'}
                  </button>
                  <button
                    type="button"
                    onClick={handleExportSync}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#FFF1DF] text-[#71152F] border border-[#71152F]/15 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar JSON</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowImportBox((v) => !v)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#FFF1DF] text-[#71152F] border border-[#71152F]/15 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Importar</span>
                  </button>
                  <button
                    type="button"
                    onClick={onResetTimestamps}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#C93439]/10 text-[#A71D36] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Limpiar marcas</span>
                  </button>
                </div>
              </div>

              {liveSyncMode && (
                <div className="rounded-xl bg-gradient-to-r from-[#F07835]/15 to-[#F6B94C]/25 border border-[#F07835]/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-[#71152F]">
                      Línea actual lista para marcar · Հաջորդ նշվող տողը ({activeLine.order}/{LYRIC_LINES.length}):
                    </p>
                    <p className="font-semibold text-sm text-[#2B0A14] mt-0.5">{activeLine.es}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleLiveCaptureNext}
                    className="px-4 py-2.5 rounded-xl bg-[#A71D36] hover:bg-[#71152F] text-white text-sm font-semibold cursor-pointer whitespace-nowrap"
                  >
                    Marcar inicio ahora ({formatTime(currentTime)}) →
                  </button>
                </div>
              )}

              {showImportBox && (
                <div className="space-y-2 p-3 rounded-xl bg-[#FFF8F0] border border-[#71152F]/15">
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    rows={3}
                    placeholder='{"verso1_v1": {"start": 12.4, "end": 16.8}}'
                    className="w-full rounded-lg border border-[#71152F]/20 bg-white p-2.5 text-xs font-mono text-[#2B0A14]"
                  />
                  <button
                    type="button"
                    onClick={handleImportSync}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#71152F] text-white text-xs font-semibold cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Guardar JSON importado</span>
                  </button>
                </div>
              )}

              {/* Selected line manual & 1-click timing controls */}
              <div className="rounded-xl bg-[#FFF8F0] border border-[#71152F]/15 p-4 space-y-3">
                <p className="text-xs font-semibold text-[#A71D36]">
                  Editando línea {activeLine.order}: «{activeLine.es}»
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-[#5A2434]">
                      Inicio (segundos) · Սկիզբ (վրկ)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={activeTs?.start ?? ''}
                        onChange={(e) =>
                          updateLineTime(activeLine.id, {
                            start: e.target.value === '' ? null : Number(e.target.value),
                          })
                        }
                        placeholder="Ej. 14.5"
                        className="w-full rounded-lg border border-[#71152F]/20 bg-white px-3 py-2 text-sm font-mono tabular-nums"
                      />
                      <button
                        type="button"
                        onClick={() => markStartNow(activeLine.id)}
                        className="px-3 py-2 rounded-lg bg-[#F07835] text-white text-xs font-semibold whitespace-nowrap cursor-pointer"
                      >
                        Capturar
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-[#5A2434]">
                      Fin (segundos) · Ավարտ (վրկ)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        value={activeTs?.end ?? ''}
                        onChange={(e) =>
                          updateLineTime(activeLine.id, {
                            end: e.target.value === '' ? null : Number(e.target.value),
                          })
                        }
                        placeholder="Ej. 18.2"
                        className="w-full rounded-lg border border-[#71152F]/20 bg-white px-3 py-2 text-sm font-mono tabular-nums"
                      />
                      <button
                        type="button"
                        onClick={() => markEndNow(activeLine.id)}
                        className="px-3 py-2 rounded-lg bg-[#71152F] text-white text-xs font-semibold whitespace-nowrap cursor-pointer"
                      >
                        Capturar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: Full Clickable Interactive Subtitle List */}
        <div
          ref={subtitleListRef}
          className="lg:col-span-5 bg-white rounded-2xl border border-[#71152F]/15 overflow-hidden"
        >
          <div className="px-5 py-3.5 bg-[#FFF1DF] border-b border-[#71152F]/15 flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-[#71152F] text-base">
                Subtítulos interactivos · Ենթագրեր
              </h3>
              <p className="text-xs text-[#5A2434]">
                Pulsa cualquier línea para ver su traducción · Սեղմիր՝ թարգմանելու համար
              </p>
            </div>
            <span className="text-xs font-mono tabular-nums text-[#A71D36]">
              {LYRIC_LINES.length} líneas
            </span>
          </div>

          <div className="max-h-[640px] overflow-y-auto divide-y divide-[#71152F]/10 p-3 space-y-1">
            {SONG_SECTIONS.map((sec) => {
              const secLines = LYRIC_LINES.filter((l) => l.section === sec.key);
              return (
                <div key={sec.key} className="pt-2 first:pt-0">
                  <div className="px-2 py-1.5 text-xs font-semibold text-[#A71D36] flex items-center justify-between">
                    <span>{sec.label}</span>
                    <span className="text-[#71152F]/70">{sec.labelHy}</span>
                  </div>
                  <div className="space-y-1">
                    {secLines.map((line) => {
                      const globalIdx = LYRIC_LINES.findIndex((x) => x.id === line.id);
                      const isActive = globalIdx === activeLineIndex;
                      const ts = timestamps[line.id];
                      const open = isTranslationVisible(line.id);

                      return (
                        <div
                          key={line.id}
                          className={`rounded-xl transition-colors ${
                            isActive
                              ? 'bg-gradient-to-r from-[#F07835]/20 to-[#F6B94C]/25 border border-[#F07835]/50'
                              : 'hover:bg-[#FFF8F0] border border-transparent'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => {
                              setActiveLineIndex(globalIdx);
                              toggleLineTranslation(line.id);
                              if (ts && ts.start !== null && playerRef.current && playerReady) {
                                playerRef.current.seekTo(ts.start, true);
                              }
                            }}
                            className="w-full text-left px-3.5 py-2.5 cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <span
                                className={`text-sm sm:text-base leading-snug ${
                                  isActive
                                    ? 'font-bold text-[#71152F]'
                                    : line.isInstrumental
                                    ? 'italic text-[#A71D36]'
                                    : 'font-medium text-[#2B0A14]'
                                }`}
                              >
                                {line.es}
                              </span>
                              <span className="text-[11px] font-mono tabular-nums text-[#71152F]/60 shrink-0 mt-0.5">
                                {ts?.start !== null && ts?.start !== undefined ? formatTime(ts.start) : `#${line.order}`}
                              </span>
                            </div>

                            {open && (
                              <div className="mt-2 pt-2 border-t border-[#71152F]/10 text-sm text-[#71152F] font-medium">
                                {line.hy}
                              </div>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
