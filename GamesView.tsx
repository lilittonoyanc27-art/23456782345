import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Compass,
  Flame,
  Gamepad2,
  Headphones,
  Languages,
  Play,
  RotateCcw,
  Timer,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  CLOZE_ITEMS,
  CORRECT_ERROR_ITEMS,
  DETECTIVE_ITEMS,
  JOURNEY_STAGES,
  LISTEN_CHOICE_ITEMS,
  MEMORY_SETS,
  ORDER_ITEMS,
  SPEED_QUESTIONS,
  TRANSLATE_BUILD_ITEMS,
  TRUE_FALSE_ITEMS,
} from './gamesData';
import { YOUTUBE_VIDEO_ID } from './lyricsData';
import { GameScoreRecord, MistakeRecord, TimestampMap } from './types';
import { loadYouTubeIframeAPI, YTPlayerInstance } from './youtubeApi';

type GameId =
  | 'memoria'
  | 'completa'
  | 'ordena'
  | 'escucha_elige'
  | 'traduce'
  | 'detectives'
  | 'verdadero_falso'
  | 'corrige'
  | 'desafio60'
  | 'camino';

interface GamesViewProps {
  timestamps: TimestampMap;
  gameScores: Record<string, GameScoreRecord>;
  onRecordGameResult: (gameId: string, score: number, completed: boolean) => void;
  onRecordMistake: (mistake: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}

const GAMES_CATALOG: { id: GameId; num: number; titleEs: string; titleHy: string; descEs: string }[] = [
  {
    id: 'memoria',
    num: 1,
    titleEs: 'Memoria',
    titleHy: 'Հիշողության խաղ',
    descEs: 'Encuentra las parejas español–armenio volteando tarjetas.',
  },
  {
    id: 'completa',
    num: 2,
    titleEs: 'Completa la canción',
    titleHy: 'Լրացրու երգի բառերը',
    descEs: 'Rellena las palabras que faltan en las líneas originales.',
  },
  {
    id: 'ordena',
    num: 3,
    titleEs: 'Ordena las palabras',
    titleHy: 'Դասավորիր բառերը',
    descEs: 'Reconstruye versos auténticos a partir de palabras mezcladas.',
  },
  {
    id: 'escucha_elige',
    num: 4,
    titleEs: 'Escucha y elige',
    titleHy: 'Լսիր և ընտրիր',
    descEs: 'Escucha el vídeo real y elige la línea exacta entre cuatro opciones.',
  },
  {
    id: 'traduce',
    num: 5,
    titleEs: 'Traduce al español',
    titleHy: 'Թարգմանիր իսպաներեն',
    descEs: 'Construye la frase en español a partir del texto armenio.',
  },
  {
    id: 'detectives',
    num: 6,
    titleEs: 'Detectives de gramática',
    titleHy: 'Քերականական դետեկտիվ',
    descEs: 'Identifica condicional, subjuntivo, futuro y perífrasis.',
  },
  {
    id: 'verdadero_falso',
    num: 7,
    titleEs: 'Verdadero o falso',
    titleHy: 'Ճիշտ է, թե սխալ',
    descEs: 'Comprueba si cada afirmación refleja el sentido real de la canción.',
  },
  {
    id: 'corrige',
    num: 8,
    titleEs: 'Corrige el error',
    titleHy: 'Ուղղիր սխալը',
    descEs: 'Detecta y repara errores gramaticales frecuentes.',
  },
  {
    id: 'desafio60',
    num: 9,
    titleEs: 'Desafío de 60 segundos',
    titleHy: '60 վայրկյանի մարտահրավեր',
    descEs: 'Responde tantas preguntas como puedas antes de que acabe el reloj.',
  },
  {
    id: 'camino',
    num: 10,
    titleEs: 'El camino de los sueños',
    titleHy: 'Երազանքների ճանապարհը',
    descEs: 'Aventura de 8 niveles combinando vocabulario, gramática y escucha.',
  },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Reusable bilingual option row with inline click-to-translate HY toggle
const BilingualOptionRow: React.FC<{
  textEs: string;
  textHy?: string;
  isHyOpen: boolean;
  onToggleHy: () => void;
  onSelect: () => void;
  disabled?: boolean;
  stateClass: string;
  letter?: string;
}> = ({ textEs, textHy, isHyOpen, onToggleHy, onSelect, disabled, stateClass, letter }) => (
  <div className={`rounded-xl border transition-colors ${stateClass}`}>
    <div className="flex items-stretch justify-between gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={onSelect}
        className="flex-1 text-left px-4 py-3.5 text-sm sm:text-base cursor-pointer disabled:cursor-default flex items-center gap-3"
      >
        {letter && (
          <span className="w-7 h-7 rounded-lg bg-[#FFF1DF] text-[#71152F] text-xs font-bold flex items-center justify-center shrink-0">
            {letter}
          </span>
        )}
        <span className="leading-snug">{textEs}</span>
      </button>

      {textHy && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleHy();
          }}
          title="Ver traducción en armenio · Հայերեն թարգմանություն"
          className={`px-3 my-1.5 mr-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0 ${
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

    {textHy && isHyOpen && (
      <div className="px-4 pb-3 pt-1.5 border-t border-[#71152F]/10 text-sm text-[#71152F] font-medium">
        {textHy}
      </div>
    )}
  </div>
);

// ---------- Game 1: Memoria ----------
const MemoryGame: React.FC<{ onFinish: (score: number) => void }> = ({ onFinish }) => {
  const [setIdx, setSetIdx] = useState(0);
  const [cards, setCards] = useState<
    { uid: string; pairId: string; text: string; lang: 'es' | 'hy' }[]
  >([]);
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);

  const initBoard = (idx: number) => {
    const chosen = MEMORY_SETS[idx];
    const deck = shuffle(
      chosen.pairs.flatMap((p) => [
        { uid: `${p.id}_es`, pairId: p.id, text: p.es, lang: 'es' as const },
        { uid: `${p.id}_hy`, pairId: p.id, text: p.hy, lang: 'hy' as const },
      ])
    );
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  useEffect(() => {
    initBoard(setIdx);
  }, [setIdx]);

  const handleFlip = (uid: string) => {
    if (flipped.length >= 2 || flipped.includes(uid)) return;
    const card = cards.find((c) => c.uid === uid);
    if (!card || matched.includes(card.pairId)) return;

    const nextFlipped = [...flipped, uid];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const first = cards.find((c) => c.uid === nextFlipped[0])!;
      const second = cards.find((c) => c.uid === nextFlipped[1])!;
      if (first.pairId === second.pairId && first.lang !== second.lang) {
        const nextMatched = [...matched, first.pairId];
        setMatched(nextMatched);
        setFlipped([]);
        if (nextMatched.length === MEMORY_SETS[setIdx].pairs.length) {
          const score = Math.max(40, 120 - moves * 4);
          onFinish(score);
        }
      } else {
        window.setTimeout(() => {
          setFlipped([]);
        }, 700);
      }
    }
  };

  const allDone = matched.length === MEMORY_SETS[setIdx].pairs.length && cards.length > 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex p-1 rounded-xl bg-[#FFF1DF] border border-[#71152F]/15">
          {MEMORY_SETS.map((s, idx) => (
            <button
              key={s.nameEs}
              type="button"
              onClick={() => setSetIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                setIdx === idx ? 'bg-[#71152F] text-[#FFF1DF]' : 'text-[#71152F]'
              }`}
            >
              {s.nameEs}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 text-xs font-mono tabular-nums text-[#71152F]">
          <span>Parejas: {matched.length}/{MEMORY_SETS[setIdx].pairs.length}</span>
          <span>Intentos: {moves}</span>
          <button
            type="button"
            onClick={() => initBoard(setIdx)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FFF1DF] font-sans font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {allDone && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-4 flex items-center justify-between gap-3">
          <div>
            <p className="font-bold text-emerald-900 text-sm">
              ¡Todas las parejas encontradas en {moves} intentos! · Բոլոր զույգերը գտնված են
            </p>
            <p className="text-xs text-emerald-800">Puntuación guardada en tu progreso.</p>
          </div>
          <button
            type="button"
            onClick={() => initBoard(setIdx)}
            className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold cursor-pointer"
          >
            Jugar de nuevo
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {cards.map((c) => {
          const isMatched = matched.includes(c.pairId);
          const isRevealed = isMatched || flipped.includes(c.uid);
          return (
            <button
              key={c.uid}
              type="button"
              onClick={() => handleFlip(c.uid)}
              className={`min-h-[108px] rounded-2xl p-4 border text-center flex flex-col items-center justify-center transition-all cursor-pointer ${
                isMatched
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                  : isRevealed
                  ? 'bg-[#FFF1DF] border-[#F07835] text-[#71152F] shadow-sm'
                  : 'bg-gradient-to-br from-[#71152F] to-[#A71D36] border-[#71152F] text-[#F6B94C] hover:brightness-110'
              }`}
            >
              {isRevealed ? (
                <>
                  <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">
                    {c.lang === 'es' ? 'ES' : 'HY'}
                  </span>
                  <span className="font-bold text-base mt-1 leading-snug">{c.text}</span>
                </>
              ) : (
                <span className="font-display text-2xl font-bold">♪</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ---------- Game 2: Completa la canción ----------
const ClozeGame: React.FC<{
  onFinish: (score: number) => void;
  onMistake: (m: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}> = ({ onFinish, onMistake }) => {
  const [roundSeed, setRoundSeed] = useState(0);
  const deck = useMemo(
    () =>
      shuffle(CLOZE_ITEMS).map((item) => ({
        ...item,
        shuffledOptions: shuffle(item.options),
      })),
    [roundSeed]
  );

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [showPromptHy, setShowPromptHy] = useState(false);
  const [openOptHy, setOpenOptHy] = useState<Record<string, boolean>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const item = deck[idx];

  const handleChoose = (optEs: string) => {
    if (chosen !== null) return;
    setChosen(optEs);
    if (optEs === item.answer) {
      setCorrectCount((c) => c + 1);
    } else {
      onMistake({
        source: 'Juego: Completa la canción',
        promptEs: `${item.before} ___ ${item.after}`,
        chosenAnswer: optEs,
        correctAnswer: item.answer,
        topicRef: 'Letra de la canción',
        explanationHy: item.explanationHy,
      });
    }
  };

  const handleNext = () => {
    if (idx + 1 >= deck.length) {
      setDone(true);
      onFinish(correctCount * 10);
    } else {
      setIdx((i) => i + 1);
      setChosen(null);
      setShowPromptHy(false);
      setOpenOptHy({});
    }
  };

  const restart = () => {
    setRoundSeed((s) => s + 1);
    setIdx(0);
    setChosen(null);
    setShowPromptHy(false);
    setOpenOptHy({});
    setCorrectCount(0);
    setDone(false);
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-[#FFF8F0] border border-[#71152F]/15 p-6 text-center space-y-4">
        <Trophy className="w-10 h-10 text-[#F07835] mx-auto" />
        <h4 className="font-display text-2xl font-bold text-[#71152F]">
          Resultado: {correctCount} / {deck.length}
        </h4>
        <p className="text-sm text-[#5A2434]">
          Has ganado {correctCount * 10} puntos · Դու վաստակեցիր {correctCount * 10} միավոր։
        </p>
        <button
          type="button"
          onClick={restart}
          className="px-5 py-2.5 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
        >
          Jugar otra vez
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs font-mono text-[#A71D36]">
        <span>Línea {idx + 1} / {deck.length}</span>
        <span>Aciertos: {correctCount}</span>
      </div>

      <button
        type="button"
        onClick={() => setShowPromptHy((v) => !v)}
        className="w-full text-left rounded-2xl bg-gradient-to-r from-[#71152F] to-[#A71D36] p-6 text-[#FFF1DF] space-y-2 cursor-pointer hover:brightness-105 transition-all"
      >
        <p className="font-display text-xl sm:text-2xl font-bold leading-relaxed">
          {item.before}{' '}
          <span className="inline-block px-3 py-0.5 rounded-lg bg-[#F6B94C] text-[#2B0A14]">
            {chosen ?? '______'}
          </span>{' '}
          {item.after}
        </p>
        {showPromptHy ? (
          <p className="text-base text-[#F6B94C] font-medium pt-2 border-t border-white/20">
            {item.hy}
          </p>
        ) : (
          <p className="text-xs text-[#FFF1DF]/80">
            Pulsa la línea para ver la traducción armenia · Սեղմիր՝ հայերեն թարգմանության համար
          </p>
        )}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {item.shuffledOptions.map((opt, oIdx) => {
          let cls = 'bg-white border-[#71152F]/20 hover:bg-[#FFF1DF]';
          if (chosen !== null) {
            if (opt.es === item.answer) cls = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
            else if (opt.es === chosen) cls = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
          }
          return (
            <BilingualOptionRow
              key={opt.es}
              textEs={opt.es}
              textHy={opt.hy}
              letter={String.fromCharCode(65 + oIdx)}
              isHyOpen={Boolean(openOptHy[opt.es])}
              onToggleHy={() =>
                setOpenOptHy((prev) => ({ ...prev, [opt.es]: !prev[opt.es] }))
              }
              onSelect={() => handleChoose(opt.es)}
              disabled={chosen !== null}
              stateClass={cls}
            />
          );
        })}
      </div>

      {chosen !== null && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-[#FFF1DF] p-4">
          <p className="text-sm text-[#4D1626]">{item.explanationHy}</p>
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-[#71152F] text-[#FFF1DF] text-xs font-semibold cursor-pointer shrink-0"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

// ---------- Game 3 & 5: Word Builder (Ordena las palabras / Traduce al español) ----------
const WordBuilderGame: React.FC<{
  mode: 'order' | 'translate';
  onFinish: (score: number) => void;
  onMistake: (m: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}> = ({ mode, onFinish, onMistake }) => {
  const [roundSeed, setRoundSeed] = useState(0);
  const items = useMemo(() => {
    if (mode === 'order') {
      return shuffle(ORDER_ITEMS).map((o) => ({
        id: o.id,
        promptHy: o.hy,
        correctTokens: o.correct,
        pool: shuffle(o.correct),
      }));
    }
    return shuffle(TRANSLATE_BUILD_ITEMS).map((t) => ({
      id: t.id,
      promptHy: t.hy,
      correctTokens: t.correctTokens,
      pool: shuffle([...t.correctTokens, ...t.distractors]),
    }));
  }, [mode, roundSeed]);

  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<{ text: string; poolIdx: number }[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const curr = items[idx];

  const handleCheck = () => {
    const attempt = picked.map((p) => p.text).join(' ');
    const target = curr.correctTokens.join(' ');
    if (attempt === target) {
      setStatus('correct');
      setScore((s) => s + 15);
    } else {
      setStatus('wrong');
      onMistake({
        source: mode === 'order' ? 'Juego: Ordena las palabras' : 'Juego: Traduce al español',
        promptEs: curr.promptHy,
        chosenAnswer: attempt || '(vacío)',
        correctAnswer: target,
        topicRef: 'Estructura de la frase',
        explanationHy: `Ճիշտ նախադասությունն է՝ «${target}»։`,
      });
    }
  };

  const handleNext = () => {
    if (idx + 1 >= items.length) {
      setDone(true);
      onFinish(score);
    } else {
      setIdx((i) => i + 1);
      setPicked([]);
      setStatus('idle');
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-[#FFF8F0] border border-[#71152F]/15 p-6 text-center space-y-4">
        <Trophy className="w-10 h-10 text-[#F07835] mx-auto" />
        <h4 className="font-display text-2xl font-bold text-[#71152F]">
          ¡Completado! {score} puntos
        </h4>
        <button
          type="button"
          onClick={() => {
            setRoundSeed((s) => s + 1);
            setIdx(0);
            setPicked([]);
            setStatus('idle');
            setScore(0);
            setDone(false);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
        >
          Jugar otra vez
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs font-mono text-[#A71D36]">
        <span>Frase {idx + 1} / {items.length}</span>
        <span>Puntos: {score}</span>
      </div>

      <div className="rounded-2xl bg-[#FFF1DF] border border-[#F07835]/35 p-5 space-y-1">
        <p className="text-xs font-semibold text-[#A71D36]">
          {mode === 'order'
            ? 'Ordena las palabras para formar el verso · Հավաքիր տողը ճիշտ հերթականությամբ'
            : 'Traduce al español usando el banco de palabras · Թարգմանիր իսպաներեն'}
        </p>
        <p className="text-lg font-bold text-[#71152F]">{curr.promptHy}</p>
      </div>

      <div className="min-h-[68px] rounded-2xl bg-white border-2 border-dashed border-[#71152F]/25 p-3.5 flex flex-wrap gap-2 items-center">
        {picked.length === 0 ? (
          <span className="text-xs text-[#71152F]/60">
            Pulsa las palabras abajo para construir la frase...
          </span>
        ) : (
          picked.map((tok, i) => (
            <button
              key={`${tok.poolIdx}_${i}`}
              type="button"
              onClick={() => {
                setPicked((prev) => prev.filter((_, k) => k !== i));
                setStatus('idle');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
            >
              {tok.text}
            </button>
          ))
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {curr.pool.map((word, pIdx) => {
          const used = picked.some((p) => p.poolIdx === pIdx);
          return (
            <button
              key={`${word}_${pIdx}`}
              type="button"
              disabled={used}
              onClick={() => {
                setPicked((prev) => [...prev, { text: word, poolIdx: pIdx }]);
                setStatus('idle');
              }}
              className={`px-3.5 py-2 rounded-xl border text-sm font-semibold cursor-pointer ${
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

      <div className="flex flex-wrap items-center gap-2">
        {status !== 'correct' ? (
          <button
            type="button"
            onClick={handleCheck}
            className="px-5 py-2.5 rounded-xl bg-[#A71D36] hover:bg-[#71152F] text-white text-sm font-semibold cursor-pointer"
          >
            Comprobar
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold cursor-pointer"
          >
            Siguiente frase →
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setPicked([]);
            setStatus('idle');
          }}
          className="px-4 py-2.5 rounded-xl bg-[#FFF1DF] text-[#71152F] text-sm font-semibold cursor-pointer"
        >
          Limpiar
        </button>
        {status === 'wrong' && (
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2.5 rounded-xl bg-white border border-[#71152F]/20 text-[#71152F] text-sm font-semibold cursor-pointer"
          >
            Saltar →
          </button>
        )}
      </div>

      {status !== 'idle' && (
        <div
          className={`rounded-xl p-4 text-sm ${
            status === 'correct'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-rose-50 text-[#71152F] border border-[#C93439]/30'
          }`}
        >
          {status === 'correct'
            ? '¡Perfecto! Հրաշալի է, ճիշտ կառուցեցիր նախադասությունը։'
            : `Respuesta correcta: «${curr.correctTokens.join(' ')}»`}
        </div>
      )}
    </div>
  );
};

// ---------- Game 4: Escucha y elige (Real YouTube playback) ----------
const ListenChooseGame: React.FC<{
  timestamps: TimestampMap;
  onFinish: (score: number) => void;
  onMistake: (m: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}> = ({ timestamps, onFinish, onMistake }) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<YTPlayerInstance | null>(null);
  const [ready, setReady] = useState(false);

  const [roundSeed, setRoundSeed] = useState(0);
  const deck = useMemo(
    () =>
      shuffle(LISTEN_CHOICE_ITEMS).map((item) => ({
        ...item,
        shuffledOptions: shuffle(item.options),
      })),
    [roundSeed]
  );

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [showQHy, setShowQHy] = useState(false);
  const [openOptHy, setOpenOptHy] = useState<Record<string, boolean>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const item = deck[idx];

  useEffect(() => {
    let mounted = true;
    loadYouTubeIframeAPI()
      .then((YT) => {
        if (!mounted || !hostRef.current) return;
        const p = new YT.Player(hostRef.current, {
          videoId: YOUTUBE_VIDEO_ID,
          width: '100%',
          height: '100%',
          playerVars: { rel: 0, modestbranding: 1, playsinline: 1, origin: window.location.origin },
          events: {
            onReady: (e) => {
              if (!mounted) return;
              playerRef.current = e.target;
              setReady(true);
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
    };
  }, []);

  const playClip = () => {
    if (!playerRef.current || !ready) return;
    const ts = timestamps[item.lineId];
    if (ts && ts.start !== null) {
      playerRef.current.seekTo(ts.start, true);
    }
    playerRef.current.playVideo();
  };

  const handleChoose = (optEs: string) => {
    if (chosen !== null) return;
    setChosen(optEs);
    if (optEs === item.correctLine) {
      setCorrectCount((c) => c + 1);
    } else {
      onMistake({
        source: 'Juego: Escucha y elige',
        promptEs: item.sectionHint,
        chosenAnswer: optEs,
        correctAnswer: item.correctLine,
        topicRef: 'Escucha activa',
        explanationHy: `Բնօրինակ տողն է՝ «${item.correctLine}» (${item.hy})։`,
      });
    }
  };

  const handleNext = () => {
    if (idx + 1 >= deck.length) {
      setDone(true);
      onFinish(correctCount * 20);
    } else {
      setIdx((i) => i + 1);
      setChosen(null);
      setShowQHy(false);
      setOpenOptHy({});
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-[#FFF8F0] border border-[#71152F]/15 p-6 text-center space-y-4">
        <Trophy className="w-10 h-10 text-[#F07835] mx-auto" />
        <h4 className="font-display text-2xl font-bold text-[#71152F]">
          Escucha y elige: {correctCount} / {deck.length}
        </h4>
        <button
          type="button"
          onClick={() => {
            setRoundSeed((s) => s + 1);
            setIdx(0);
            setChosen(null);
            setShowQHy(false);
            setOpenOptHy({});
            setCorrectCount(0);
            setDone(false);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
        >
          Jugar otra vez
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      <div className="lg:col-span-5 space-y-3">
        <div className="rounded-2xl overflow-hidden bg-[#1D070E] border border-[#71152F]/20">
          <div className="aspect-video w-full">
            <div ref={hostRef} className="w-full h-full" />
          </div>
          <div className="p-3 bg-[#71152F] flex items-center justify-between">
            <button
              type="button"
              onClick={playClip}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F07835] text-white text-xs font-semibold cursor-pointer"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Escuchar fragmento</span>
            </button>
            <span className="text-xs text-[#F6B94C]">{item.sectionHint}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#A71D36]">
          <span>Ronda {idx + 1} / {deck.length}</span>
          <span>Aciertos: {correctCount}</span>
        </div>

        <button
          type="button"
          onClick={() => setShowQHy((v) => !v)}
          className="w-full text-left rounded-xl bg-[#FFF8F0] border border-[#71152F]/15 p-4 cursor-pointer hover:bg-[#FFF1DF] transition-colors"
        >
          <p className="font-display text-lg font-bold text-[#71152F]">
            ¿Cuál de estas cuatro líneas corresponde a la canción?
          </p>
          {showQHy ? (
            <p className="text-sm text-[#A71D36] font-medium mt-1.5">
              Այս չորս տողերից ո՞րն է իրականում հնչում երգում։ (Սեղմիր «HY» կոճակը՝ յուրաքանչյուր տարբերակը թարգմանելու համար)
            </p>
          ) : (
            <p className="text-xs text-[#71152F]/70 mt-1">
              Pulsa la pregunta o «HY» en las opciones para ver armenio
            </p>
          )}
        </button>

        <div className="space-y-2.5">
          {item.shuffledOptions.map((opt, oIdx) => {
            let cls = 'bg-white border-[#71152F]/20 hover:bg-[#FFF1DF]';
            if (chosen !== null) {
              if (opt.es === item.correctLine) cls = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
              else if (opt.es === chosen) cls = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
            }
            return (
              <BilingualOptionRow
                key={opt.es}
                textEs={opt.es}
                textHy={opt.hy}
                letter={String.fromCharCode(65 + oIdx)}
                isHyOpen={Boolean(openOptHy[opt.es])}
                onToggleHy={() =>
                  setOpenOptHy((prev) => ({ ...prev, [opt.es]: !prev[opt.es] }))
                }
                onSelect={() => handleChoose(opt.es)}
                disabled={chosen !== null}
                stateClass={cls}
              />
            );
          })}
        </div>

        {chosen !== null && (
          <div className="rounded-xl bg-[#FFF1DF] p-4 flex items-center justify-between gap-3">
            <p className="text-sm text-[#4D1626]">{item.hy}</p>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded-xl bg-[#71152F] text-[#FFF1DF] text-xs font-semibold cursor-pointer shrink-0"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Game 6: Detectives de gramática ----------
const GrammarDetectiveGame: React.FC<{
  onFinish: (score: number) => void;
  onMistake: (m: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}> = ({ onFinish, onMistake }) => {
  const [roundSeed, setRoundSeed] = useState(0);
  const deck = useMemo(
    () =>
      shuffle(DETECTIVE_ITEMS).map((item) => ({
        ...item,
        shuffledOptions: shuffle(item.options),
      })),
    [roundSeed]
  );

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [showSentenceHy, setShowSentenceHy] = useState(false);
  const [openOptHy, setOpenOptHy] = useState<Record<string, boolean>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const item = deck[idx];

  const handleChoose = (optEs: string) => {
    if (chosen !== null) return;
    setChosen(optEs);
    if (optEs === item.correctLabel) {
      setCorrectCount((c) => c + 1);
    } else {
      onMistake({
        source: 'Juego: Detectives de gramática',
        promptEs: `${item.sentenceEs} (${item.highlighted})`,
        chosenAnswer: optEs,
        correctAnswer: item.correctLabel,
        topicRef: item.correctLabel,
        explanationHy: item.explanationHy,
      });
    }
  };

  const handleNext = () => {
    if (idx + 1 >= deck.length) {
      setDone(true);
      onFinish(correctCount * 15);
    } else {
      setIdx((i) => i + 1);
      setChosen(null);
      setShowSentenceHy(false);
      setOpenOptHy({});
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-[#FFF8F0] border border-[#71152F]/15 p-6 text-center space-y-4">
        <Trophy className="w-10 h-10 text-[#F07835] mx-auto" />
        <h4 className="font-display text-2xl font-bold text-[#71152F]">
          Caso resuelto: {correctCount} / {deck.length}
        </h4>
        <button
          type="button"
          onClick={() => {
            setRoundSeed((s) => s + 1);
            setIdx(0);
            setChosen(null);
            setShowSentenceHy(false);
            setOpenOptHy({});
            setCorrectCount(0);
            setDone(false);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
        >
          Jugar otra vez
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs font-mono text-[#A71D36]">
        <span>Pista {idx + 1} / {deck.length}</span>
        <span>Aciertos: {correctCount}</span>
      </div>

      <button
        type="button"
        onClick={() => setShowSentenceHy((v) => !v)}
        className="w-full text-left rounded-2xl bg-[#FFF1DF] border border-[#F07835]/35 p-6 space-y-2 cursor-pointer hover:border-[#F07835] transition-colors"
      >
        <p className="text-xs font-semibold text-[#A71D36]">
          Identifica la estructura resaltada · Որոշիր ընդգծված քերականական ձևը
        </p>
        <p className="font-display text-xl sm:text-2xl font-bold text-[#2B0A14]">
          {item.sentenceEs}
        </p>
        <p className="text-sm font-bold text-[#71152F]">
          Elemento a analizar:{' '}
          <span className="underline decoration-[#F07835] decoration-2">{item.highlighted}</span>
        </p>
        {showSentenceHy ? (
          <p className="text-sm text-[#71152F] font-semibold pt-2 border-t border-[#71152F]/15">
            {item.sentenceHy}
          </p>
        ) : (
          <p className="text-xs text-[#71152F]/70">
            Pulsa la frase para ver la traducción armenia · Սեղմիր՝ թարգմանելու համար
          </p>
        )}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {item.shuffledOptions.map((opt, oIdx) => {
          let cls = 'bg-white border-[#71152F]/20 hover:bg-[#FFF1DF]';
          if (chosen !== null) {
            if (opt.es === item.correctLabel) cls = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
            else if (opt.es === chosen) cls = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
          }
          return (
            <BilingualOptionRow
              key={opt.es}
              textEs={opt.es}
              textHy={opt.hy}
              letter={String.fromCharCode(65 + oIdx)}
              isHyOpen={Boolean(openOptHy[opt.es])}
              onToggleHy={() =>
                setOpenOptHy((prev) => ({ ...prev, [opt.es]: !prev[opt.es] }))
              }
              onSelect={() => handleChoose(opt.es)}
              disabled={chosen !== null}
              stateClass={cls}
            />
          );
        })}
      </div>

      {chosen !== null && (
        <div className="rounded-xl bg-[#FFF8F0] border border-[#71152F]/15 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-[#4D1626]">{item.explanationHy}</p>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-[#71152F] text-[#FFF1DF] text-xs font-semibold cursor-pointer shrink-0"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

// ---------- Game 7: Verdadero o falso ----------
const TrueFalseGame: React.FC<{
  onFinish: (score: number) => void;
  onMistake: (m: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}> = ({ onFinish, onMistake }) => {
  const [roundSeed, setRoundSeed] = useState(0);
  const deck = useMemo(() => shuffle(TRUE_FALSE_ITEMS), [roundSeed]);

  const [idx, setIdx] = useState(0);
  const [chosen, setChosen] = useState<boolean | null>(null);
  const [showHy, setShowHy] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const item = deck[idx];

  const handleChoose = (val: boolean) => {
    if (chosen !== null) return;
    setChosen(val);
    if (val === item.isTrue) {
      setCorrectCount((c) => c + 1);
    } else {
      onMistake({
        source: 'Juego: Verdadero o falso',
        promptEs: item.statementEs,
        chosenAnswer: val ? 'Verdadero' : 'Falso',
        correctAnswer: item.isTrue ? 'Verdadero' : 'Falso',
        topicRef: 'Comprensión de la canción',
        explanationHy: item.explanationHy,
      });
    }
  };

  const handleNext = () => {
    if (idx + 1 >= deck.length) {
      setDone(true);
      onFinish(correctCount * 12);
    } else {
      setIdx((i) => i + 1);
      setChosen(null);
      setShowHy(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-[#FFF8F0] border border-[#71152F]/15 p-6 text-center space-y-4">
        <Trophy className="w-10 h-10 text-[#F07835] mx-auto" />
        <h4 className="font-display text-2xl font-bold text-[#71152F]">
          Verdadero o falso: {correctCount} / {deck.length}
        </h4>
        <button
          type="button"
          onClick={() => {
            setRoundSeed((s) => s + 1);
            setIdx(0);
            setChosen(null);
            setShowHy(false);
            setCorrectCount(0);
            setDone(false);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
        >
          Repetir
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs font-mono text-[#A71D36]">
        <span>Afirmación {idx + 1} / {deck.length}</span>
        <span>Aciertos: {correctCount}</span>
      </div>

      <button
        type="button"
        onClick={() => setShowHy((v) => !v)}
        className="w-full text-left rounded-2xl bg-[#FFF1DF] border border-[#F07835]/30 p-6 space-y-2 cursor-pointer hover:border-[#F07835] transition-colors"
      >
        <p className="font-display text-xl font-bold text-[#2B0A14] leading-snug">
          {item.statementEs}
        </p>
        {showHy ? (
          <p className="text-base text-[#71152F] font-semibold pt-2 border-t border-[#71152F]/15">
            {item.statementHy}
          </p>
        ) : (
          <p className="text-xs text-[#71152F]/75">
            Pulsa la afirmación para ver la traducción armenia · Սեղմիր՝ հայերեն թարգմանության համար
          </p>
        )}
      </button>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Verdadero · Ճիշտ է', val: true },
          { label: 'Falso · Սխալ է', val: false },
        ].map((btn) => {
          let cls = 'bg-white border-[#71152F]/20 hover:bg-[#FFF1DF] text-[#71152F]';
          if (chosen !== null) {
            if (btn.val === item.isTrue) cls = 'bg-emerald-50 border-emerald-600 text-emerald-900';
            else if (btn.val === chosen) cls = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
          }
          return (
            <button
              key={btn.label}
              type="button"
              onClick={() => handleChoose(btn.val)}
              className={`py-4 px-4 rounded-2xl border font-bold text-sm sm:text-base cursor-pointer ${cls}`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {chosen !== null && (
        <div className="rounded-xl bg-[#FFF8F0] border border-[#71152F]/15 p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-[#4D1626]">{item.explanationHy}</p>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-[#71152F] text-[#FFF1DF] text-xs font-semibold cursor-pointer shrink-0"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

// ---------- Game 8: Corrige el error ----------
const CorrectErrorGame: React.FC<{
  onFinish: (score: number) => void;
  onMistake: (m: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}> = ({ onFinish, onMistake }) => {
  const [roundSeed, setRoundSeed] = useState(0);
  const deck = useMemo(
    () =>
      shuffle(CORRECT_ERROR_ITEMS).map((item) => ({
        ...item,
        shuffledOptions: shuffle(item.options),
      })),
    [roundSeed]
  );

  const [idx, setIdx] = useState(0);
  const [chosenEs, setChosenEs] = useState<string | null>(null);
  const [showWrongHy, setShowWrongHy] = useState(false);
  const [openOptHy, setOpenOptHy] = useState<Record<string, boolean>>({});
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const item = deck[idx];

  const handleChoose = (opt: { es: string; hy: string; isCorrect: boolean }) => {
    if (chosenEs !== null) return;
    setChosenEs(opt.es);
    if (opt.isCorrect) {
      setCorrectCount((c) => c + 1);
    } else {
      const right = item.shuffledOptions.find((o) => o.isCorrect)!;
      onMistake({
        source: 'Juego: Corrige el error',
        promptEs: item.wrongEs,
        chosenAnswer: opt.es,
        correctAnswer: right.es,
        topicRef: 'Corrección gramatical',
        explanationHy: item.explanationHy,
      });
    }
  };

  const handleNext = () => {
    if (idx + 1 >= deck.length) {
      setDone(true);
      onFinish(correctCount * 15);
    } else {
      setIdx((i) => i + 1);
      setChosenEs(null);
      setShowWrongHy(false);
      setOpenOptHy({});
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl bg-[#FFF8F0] border border-[#71152F]/15 p-6 text-center space-y-4">
        <Trophy className="w-10 h-10 text-[#F07835] mx-auto" />
        <h4 className="font-display text-2xl font-bold text-[#71152F]">
          Errores corregidos: {correctCount} / {deck.length}
        </h4>
        <button
          type="button"
          onClick={() => {
            setRoundSeed((s) => s + 1);
            setIdx(0);
            setChosenEs(null);
            setShowWrongHy(false);
            setOpenOptHy({});
            setCorrectCount(0);
            setDone(false);
          }}
          className="px-5 py-2.5 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
        >
          Jugar otra vez
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-xs font-mono text-[#A71D36]">
        <span>Frase {idx + 1} / {deck.length}</span>
        <span>Aciertos: {correctCount}</span>
      </div>

      <button
        type="button"
        onClick={() => setShowWrongHy((v) => !v)}
        className="w-full text-left rounded-2xl bg-rose-50 border border-[#C93439]/30 p-5 space-y-1.5 cursor-pointer hover:border-[#C93439] transition-colors"
      >
        <p className="text-xs font-semibold text-[#C93439]">
          Frase con error · Սխալ նախադասություն (սեղմիր՝ թարգմանության համար)
        </p>
        <p className="font-display text-xl font-bold text-[#71152F] line-through decoration-[#C93439]/60">
          {item.wrongEs}
        </p>
        {showWrongHy && <p className="text-sm text-[#5A2434] font-medium pt-1">{item.hy}</p>}
      </button>

      <div className="space-y-2.5">
        {item.shuffledOptions.map((opt, oIdx) => {
          let cls = 'bg-white border-[#71152F]/20 hover:bg-[#FFF1DF]';
          if (chosenEs !== null) {
            if (opt.isCorrect) cls = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
            else if (opt.es === chosenEs) cls = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
          }
          return (
            <BilingualOptionRow
              key={opt.es}
              textEs={opt.es}
              textHy={opt.hy}
              letter={String.fromCharCode(65 + oIdx)}
              isHyOpen={Boolean(openOptHy[opt.es])}
              onToggleHy={() =>
                setOpenOptHy((prev) => ({ ...prev, [opt.es]: !prev[opt.es] }))
              }
              onSelect={() => handleChoose(opt)}
              disabled={chosenEs !== null}
              stateClass={cls}
            />
          );
        })}
      </div>

      {chosenEs !== null && (
        <div className="rounded-xl bg-[#FFF1DF] p-4 flex items-center justify-between gap-3">
          <p className="text-sm text-[#4D1626]">{item.explanationHy}</p>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 rounded-xl bg-[#71152F] text-[#FFF1DF] text-xs font-semibold cursor-pointer shrink-0"
          >
            Siguiente →
          </button>
        </div>
      )}
    </div>
  );
};

// ---------- Game 9: Desafío de 60 segundos ----------
const Speed60Game: React.FC<{ onFinish: (score: number) => void }> = ({ onFinish }) => {
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [deck, setDeck] = useState(() => shuffle(SPEED_QUESTIONS));
  const [qIdx, setQIdx] = useState(0);
  const [showHintHy, setShowHintHy] = useState(false);
  const [flash, setFlash] = useState<'ok' | 'bad' | null>(null);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          window.clearInterval(timer);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (finished) {
      onFinish(score);
    }
  }, [finished, onFinish, score]);

  const start = () => {
    setDeck(shuffle(SPEED_QUESTIONS));
    setQIdx(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(60);
    setShowHintHy(false);
    setFinished(false);
    setRunning(true);
  };

  const curr = deck[qIdx % deck.length];
  const opts = useMemo(() => shuffle(curr.options), [curr.id, qIdx]);

  const answer = (opt: string) => {
    if (!running) return;
    if (opt === curr.correct) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setBestStreak((b) => Math.max(b, nextStreak));
      setScore((s) => s + 10 + Math.min(10, nextStreak * 2));
      setFlash('ok');
    } else {
      setStreak(0);
      setFlash('bad');
    }
    window.setTimeout(() => setFlash(null), 220);
    setShowHintHy(false);
    setQIdx((i) => i + 1);
  };

  if (!running && !finished) {
    return (
      <div className="rounded-2xl bg-gradient-to-br from-[#71152F] to-[#A71D36] p-8 text-center text-[#FFF1DF] space-y-4">
        <Timer className="w-10 h-10 text-[#F6B94C] mx-auto" />
        <h4 className="font-display text-2xl font-bold">Desafío de 60 segundos</h4>
        <p className="text-sm text-[#FFF1DF]/90 max-w-md mx-auto">
          Responde rápido preguntas de vocabulario y gramática de «Cambio Dolor». Cada racha suma puntos extra.
        </p>
        <button
          type="button"
          onClick={start}
          className="px-6 py-3 rounded-xl bg-[#F07835] hover:bg-[#F6B94C] hover:text-[#2B0A14] text-white font-bold text-sm cursor-pointer transition-colors"
        >
          Empezar cronómetro · Սկսել 60 վայրկյանը
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="rounded-2xl bg-[#FFF8F0] border border-[#71152F]/15 p-8 text-center space-y-4">
        <Trophy className="w-10 h-10 text-[#F07835] mx-auto" />
        <h4 className="font-display text-2xl font-bold text-[#71152F]">
          ¡Tiempo terminado! {score} puntos
        </h4>
        <p className="text-sm text-[#5A2434]">
          Mejor racha seguida: <strong>{bestStreak}</strong> respuestas correctas · Ամենաերկար շարքը՝ {bestStreak}
        </p>
        <button
          type="button"
          onClick={start}
          className="px-6 py-3 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
        >
          Intentar superar tu récord
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#71152F] text-[#FFF1DF] px-5 py-3.5">
        <span className="inline-flex items-center gap-1.5 font-mono text-lg font-bold tabular-nums text-[#F6B94C]">
          <Timer className="w-5 h-5" />
          {timeLeft}s
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
          <Flame className="w-4 h-4 text-[#F07835]" />
          Racha: {streak}
        </span>
        <span className="font-mono font-bold tabular-nums">Puntos: {score}</span>
      </div>

      <button
        type="button"
        onClick={() => setShowHintHy((v) => !v)}
        className={`w-full rounded-2xl border p-6 text-center transition-colors cursor-pointer ${
          flash === 'ok'
            ? 'bg-emerald-50 border-emerald-500'
            : flash === 'bad'
            ? 'bg-rose-50 border-[#C93439]'
            : 'bg-[#FFF1DF] border-[#F07835]/30'
        }`}
      >
        <p className="font-display text-2xl font-bold text-[#71152F]">{curr.prompt}</p>
        {showHintHy ? (
          <p className="text-sm text-[#A71D36] font-medium mt-1.5">{curr.promptHy}</p>
        ) : (
          <p className="text-xs text-[#71152F]/65 mt-1">Pulsa para pista en armenio · Սեղմիր՝ հայերենի համար</p>
        )}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {opts.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => answer(opt)}
            className="px-5 py-4 rounded-2xl bg-white border border-[#71152F]/20 hover:bg-[#FFF1DF] text-base font-semibold text-[#2B0A14] cursor-pointer"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

// ---------- Game 10: El camino de los sueños (8-stage progressive journey) ----------
const DreamJourneyGame: React.FC<{
  onFinish: (score: number) => void;
  onMistake: (m: Omit<MistakeRecord, 'id' | 'timestamp'>) => void;
}> = ({ onFinish, onMistake }) => {
  const [roundSeed, setRoundSeed] = useState(0);
  const stagesWithShuffledOpts = useMemo(
    () =>
      JOURNEY_STAGES.map((st) => ({
        ...st,
        shuffledOptions: shuffle(st.options),
      })),
    [roundSeed]
  );

  const [stageIdx, setStageIdx] = useState(0);
  const [unlockedMax, setUnlockedMax] = useState(0);
  const [selectedEs, setSelectedEs] = useState<string | null>(null);
  const [showQHy, setShowQHy] = useState(false);
  const [openOptHy, setOpenOptHy] = useState<Record<string, boolean>>({});
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [completedAll, setCompletedAll] = useState(false);

  const stage = stagesWithShuffledOpts[stageIdx];
  const selectedObj = stage.shuffledOptions.find((o) => o.es === selectedEs);

  const handleChoose = (opt: { es: string; hy?: string; isCorrect: boolean }) => {
    if (selectedEs !== null) return;
    setSelectedEs(opt.es);
    if (opt.isCorrect) {
      setEarnedPoints((p) => p + 20);
      if (stageIdx + 1 > unlockedMax) {
        setUnlockedMax(Math.min(stagesWithShuffledOpts.length - 1, stageIdx + 1));
      }
      if (stageIdx === stagesWithShuffledOpts.length - 1) {
        setCompletedAll(true);
        onFinish(earnedPoints + 20);
      }
    } else {
      const right = stage.shuffledOptions.find((o) => o.isCorrect)!;
      onMistake({
        source: `El camino de los sueños (${stage.titleEs})`,
        promptEs: stage.questionEs,
        chosenAnswer: opt.es,
        correctAnswer: right.es,
        topicRef: stage.category,
        explanationHy: stage.explanationHy,
      });
    }
  };

  const advance = () => {
    if (stageIdx < stagesWithShuffledOpts.length - 1) {
      setStageIdx((s) => s + 1);
      setSelectedEs(null);
      setShowQHy(false);
      setOpenOptHy({});
    }
  };

  const retryStage = () => {
    setSelectedEs(null);
  };

  const restartAll = () => {
    setRoundSeed((s) => s + 1);
    setStageIdx(0);
    setUnlockedMax(0);
    setSelectedEs(null);
    setShowQHy(false);
    setOpenOptHy({});
    setEarnedPoints(0);
    setCompletedAll(false);
  };

  return (
    <div className="space-y-6">
      {/* Road map visual path */}
      <div className="rounded-2xl bg-gradient-to-r from-[#71152F] via-[#A71D36] to-[#C93439] p-5 text-[#FFF1DF] space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#F6B94C]" />
            <h4 className="font-display text-lg font-bold">
              El camino de los sueños · Երազանքների ճանապարհը
            </h4>
          </div>
          <span className="text-xs font-mono tabular-nums text-[#F6B94C]">
            Nivel {stageIdx + 1} / {stagesWithShuffledOpts.length} · {earnedPoints} pts
          </span>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {stagesWithShuffledOpts.map((st, i) => {
            const unlocked = i <= unlockedMax;
            const current = i === stageIdx;
            const passed =
              i < unlockedMax || (completedAll && i === stagesWithShuffledOpts.length - 1);
            return (
              <button
                key={st.id}
                type="button"
                disabled={!unlocked}
                onClick={() => {
                  setStageIdx(i);
                  setSelectedEs(null);
                  setShowQHy(false);
                  setOpenOptHy({});
                }}
                className={`rounded-xl py-2.5 px-2 text-center border transition-all cursor-pointer disabled:cursor-not-allowed ${
                  current
                    ? 'bg-[#F6B94C] text-[#2B0A14] border-white font-bold'
                    : passed
                    ? 'bg-emerald-500/90 text-white border-emerald-300 font-semibold'
                    : unlocked
                    ? 'bg-white/15 text-[#FFF1DF] border-white/30'
                    : 'bg-black/20 text-white/40 border-white/10'
                }`}
              >
                <span className="text-xs font-mono block">{st.stageNumber}</span>
                <span className="text-[10px] block truncate mt-0.5">{st.category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {completedAll ? (
        <div className="rounded-2xl bg-[#FFF1DF] border border-[#F07835] p-6 text-center space-y-3">
          <Trophy className="w-12 h-12 text-[#C93439] mx-auto" />
          <h4 className="font-display text-2xl font-bold text-[#71152F]">
            ¡Llegaste a la cima de tus sueños!
          </h4>
          <p className="text-sm text-[#4D1626] max-w-lg mx-auto">
            {stage.rewardHy} Has completado los 8 niveles del viaje con {earnedPoints} puntos.
          </p>
          <button
            type="button"
            onClick={restartAll}
            className="px-5 py-2.5 rounded-xl bg-[#71152F] text-[#FFF1DF] text-sm font-semibold cursor-pointer"
          >
            Recorrer el camino de nuevo
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-[#71152F]/15 p-5 sm:p-6 space-y-5">
          <button
            type="button"
            onClick={() => setShowQHy((v) => !v)}
            className="w-full text-left rounded-xl bg-[#FFF8F0] border border-[#71152F]/15 p-4 cursor-pointer hover:bg-[#FFF1DF] transition-colors space-y-1"
          >
            <p className="text-xs font-semibold text-[#A71D36]">
              {stage.titleEs} · {stage.titleHy} ({stage.category})
            </p>
            <h5 className="font-display text-xl font-bold text-[#2B0A14] leading-snug">
              {stage.questionEs}
            </h5>
            {showQHy ? (
              <p className="text-sm text-[#71152F] font-semibold pt-1.5 border-t border-[#71152F]/10">
                {stage.questionHy}
              </p>
            ) : (
              <p className="text-xs text-[#71152F]/70">
                Pulsa la pregunta para ver la traducción armenia · Սեղմիր՝ հայերեն թարգմանության համար
              </p>
            )}
          </button>

          <div className="space-y-2.5">
            {stage.shuffledOptions.map((opt, oIdx) => {
              let cls = 'bg-white border-[#71152F]/20 hover:bg-[#FFF1DF]';
              if (selectedEs !== null) {
                if (opt.isCorrect) cls = 'bg-emerald-50 border-emerald-600 text-emerald-900 font-semibold';
                else if (opt.es === selectedEs) cls = 'bg-rose-50 border-[#C93439] text-[#A71D36]';
              }
              return (
                <BilingualOptionRow
                  key={opt.es}
                  textEs={opt.es}
                  textHy={opt.hy}
                  letter={String.fromCharCode(65 + oIdx)}
                  isHyOpen={Boolean(openOptHy[opt.es])}
                  onToggleHy={() =>
                    setOpenOptHy((prev) => ({ ...prev, [opt.es]: !prev[opt.es] }))
                  }
                  onSelect={() => handleChoose(opt)}
                  disabled={selectedEs !== null}
                  stateClass={cls}
                />
              );
            })}
          </div>

          {selectedObj && (
            <div
              className={`rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                selectedObj.isCorrect
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-rose-50 border border-[#C93439]/30 text-[#71152F]'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {selectedObj.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-[#C93439] shrink-0 mt-0.5" />
                )}
                <div className="text-sm">
                  <p className="font-bold">
                    {selectedObj.isCorrect ? stage.rewardHy : '¡Sigue intentando!'}
                  </p>
                  <p className="text-xs mt-0.5">{stage.explanationHy}</p>
                </div>
              </div>

              {selectedObj.isCorrect ? (
                <button
                  type="button"
                  onClick={advance}
                  className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-semibold cursor-pointer shrink-0"
                >
                  Avanzar al Paso {stageIdx + 2} →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={retryStage}
                  className="px-5 py-2.5 rounded-xl bg-[#A71D36] text-white text-xs font-semibold cursor-pointer shrink-0"
                >
                  Intentar de nuevo
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ---------- Main Games Hub ----------
export const GamesView: React.FC<GamesViewProps> = ({
  timestamps,
  gameScores,
  onRecordGameResult,
  onRecordMistake,
}) => {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);

  const activeMeta = GAMES_CATALOG.find((g) => g.id === activeGame);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            10 juegos interactivos completos · 10 ինտերակտիվ ուսումնական խաղ
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            {activeMeta ? `Juego ${activeMeta.num}: ${activeMeta.titleEs}` : 'Juegos interactivos'}
          </h2>
          {activeMeta && (
            <p className="text-sm text-[#5A2434] mt-0.5">
              {activeMeta.titleHy} · {activeMeta.descEs}
            </p>
          )}
        </div>

        {activeGame && (
          <button
            type="button"
            onClick={() => setActiveGame(null)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FFF1DF] hover:bg-[#F6B94C]/40 text-[#71152F] text-xs font-semibold cursor-pointer self-start sm:self-auto whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Todos los juegos</span>
          </button>
        )}
      </div>

      {!activeGame ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAMES_CATALOG.map((g) => {
            const rec = gameScores[g.id];
            const isJourney = g.id === 'camino';
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveGame(g.id)}
                className={`text-left rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all cursor-pointer ${
                  isJourney
                    ? 'sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#71152F] via-[#A71D36] to-[#C93439] text-[#FFF1DF] border-[#71152F] hover:brightness-105'
                    : 'bg-white border-[#71152F]/15 hover:border-[#F07835] text-[#2B0A14]'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-semibold ${
                        isJourney ? 'text-[#F6B94C]' : 'text-[#A71D36]'
                      }`}
                    >
                      Juego {g.num} {g.id === 'escucha_elige' ? '· Vídeo real' : ''}
                    </span>
                    {rec?.completed && (
                      <span
                        className={`inline-flex items-center gap-1 font-semibold ${
                          isJourney ? 'text-[#F6B94C]' : 'text-emerald-700'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {rec.bestScore} pts
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-display text-xl font-bold ${
                      isJourney ? 'text-[#FFF1DF]' : 'text-[#71152F]'
                    }`}
                  >
                    {g.titleEs}
                  </h3>
                  <p className={`text-xs font-semibold ${isJourney ? 'text-[#F6B94C]' : 'text-[#C93439]'}`}>
                    {g.titleHy}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${
                      isJourney ? 'text-[#FFF1DF]/90' : 'text-[#5A2434]'
                    }`}
                  >
                    {g.descEs}
                  </p>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                    isJourney ? 'text-[#F6B94C]' : 'text-[#A71D36]'
                  }`}
                >
                  {g.id === 'escucha_elige' ? (
                    <Headphones className="w-4 h-4" />
                  ) : (
                    <Gamepad2 className="w-4 h-4" />
                  )}
                  <span>Jugar ahora →</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-[#71152F]/15 p-5 sm:p-7">
          {activeGame === 'memoria' && (
            <MemoryGame onFinish={(score) => onRecordGameResult('memoria', score, true)} />
          )}
          {activeGame === 'completa' && (
            <ClozeGame
              onFinish={(score) => onRecordGameResult('completa', score, true)}
              onMistake={onRecordMistake}
            />
          )}
          {activeGame === 'ordena' && (
            <WordBuilderGame
              mode="order"
              onFinish={(score) => onRecordGameResult('ordena', score, true)}
              onMistake={onRecordMistake}
            />
          )}
          {activeGame === 'escucha_elige' && (
            <ListenChooseGame
              timestamps={timestamps}
              onFinish={(score) => onRecordGameResult('escucha_elige', score, true)}
              onMistake={onRecordMistake}
            />
          )}
          {activeGame === 'traduce' && (
            <WordBuilderGame
              mode="translate"
              onFinish={(score) => onRecordGameResult('traduce', score, true)}
              onMistake={onRecordMistake}
            />
          )}
          {activeGame === 'detectives' && (
            <GrammarDetectiveGame
              onFinish={(score) => onRecordGameResult('detectives', score, true)}
              onMistake={onRecordMistake}
            />
          )}
          {activeGame === 'verdadero_falso' && (
            <TrueFalseGame
              onFinish={(score) => onRecordGameResult('verdadero_falso', score, true)}
              onMistake={onRecordMistake}
            />
          )}
          {activeGame === 'corrige' && (
            <CorrectErrorGame
              onFinish={(score) => onRecordGameResult('corrige', score, true)}
              onMistake={onRecordMistake}
            />
          )}
          {activeGame === 'desafio60' && (
            <Speed60Game onFinish={(score) => onRecordGameResult('desafio60', score, score > 0)} />
          )}
          {activeGame === 'camino' && (
            <DreamJourneyGame
              onFinish={(score) => onRecordGameResult('camino', score, true)}
              onMistake={onRecordMistake}
            />
          )}
        </div>
      )}
    </div>
  );
};
