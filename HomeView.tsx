import React from 'react';
import {
  ArrowRight,
  BookOpen,
  Gamepad2,
  Headphones,
  MessageCircle,
  Mic,
  Music,
  PlayCircle,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { CONVERSATION_QUESTIONS } from './conversationData';
import { GRAMMAR_TOPICS } from './grammarData';
import { SINGABLE_LINES } from './lyricsData';
import { QUIZ_QUESTIONS } from './quizData';
import { TabId, UserProgress } from './types';
import { VOCAB_ITEMS } from './vocabData';

interface HomeViewProps {
  progress: UserProgress;
  onNavigate: (tab: TabId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ progress, onNavigate }) => {
  const gamesDone = Object.values(progress.gameScores).filter((g) => g.completed).length;

  const pathways: {
    tab: TabId;
    titleEs: string;
    titleHy: string;
    descEs: string;
    metric: string;
    icon: React.ReactNode;
  }[] = [
    {
      tab: 'video',
      titleEs: 'Vídeo y subtítulos',
      titleHy: 'Տեսանյութ և ենթագրեր',
      descEs: 'Reproductor oficial de YouTube, subtítulos interactivos con traducción al armenio y editor de sincronización.',
      metric: 'YouTube + Sync',
      icon: <PlayCircle className="w-5 h-5 text-[#C93439]" />,
    },
    {
      tab: 'letra',
      titleEs: 'Letra y traducción',
      titleHy: 'Ամբողջական տեքստ',
      descEs: 'Cada verso con traducción natural al armenio, vocabulario, notas de gramática y modo inverso HY → ES.',
      metric: `${SINGABLE_LINES.length} líneas`,
      icon: <Music className="w-5 h-5 text-[#C93439]" />,
    },
    {
      tab: 'cantando',
      titleEs: 'Aprende cantando',
      titleHy: 'Սովորիր երգելով',
      descEs: 'Rutina guiada en 7 pasos por cada verso con progreso por estrofa y mini-comprobaciones.',
      metric: `${progress.singCompletedLineIds.length}/${SINGABLE_LINES.length}`,
      icon: <Mic className="w-5 h-5 text-[#C93439]" />,
    },
    {
      tab: 'analisis',
      titleEs: 'Análisis de la canción',
      titleHy: 'Երգի վերլուծություն',
      descEs: 'Sentido profundo, metáforas, libertad, miedos y desglose bilingüe verso a verso.',
      metric: '7 claves + 14 versos',
      icon: <Sparkles className="w-5 h-5 text-[#C93439]" />,
    },
    {
      tab: 'gramatica',
      titleEs: 'Gramática interactiva',
      titleHy: 'Քերականություն',
      descEs: '17 temas esenciales del condicional al subjuntivo con tablas, ejemplos reales y práctica.',
      metric: `${progress.completedGrammarIds.length}/${GRAMMAR_TOPICS.length} temas`,
      icon: <BookOpen className="w-5 h-5 text-[#C93439]" />,
    },
    {
      tab: 'vocabulario',
      titleEs: 'Vocabulario y tarjetas',
      titleHy: 'Բառարան և քարտեր',
      descEs: '36 palabras clave con traducción oculta para memoria activa y modo tarjetas.',
      metric: `${progress.learnedVocabIds.length}/${VOCAB_ITEMS.length} palabras`,
      icon: <BookOpen className="w-5 h-5 text-[#C93439]" />,
    },
    {
      tab: 'conversacion',
      titleEs: 'Preguntas para hablar',
      titleHy: 'Խոսակցական պրակտիկա',
      descEs: '40 preguntas reales divididas en A1–A2, B1 y B2 con respuestas modelo en español y armenio.',
      metric: `${CONVERSATION_QUESTIONS.length} preguntas`,
      icon: <MessageCircle className="w-5 h-5 text-[#C93439]" />,
    },
    {
      tab: 'escucha',
      titleEs: 'Escucha activa',
      titleHy: 'Լսողական ընկալում',
      descEs: '12 ejercicios auditivos de 6 tipos distintos usando el vídeo real de la canción.',
      metric: `${progress.completedEscuchaIds.length}/12 retos`,
      icon: <Headphones className="w-5 h-5 text-[#C93439]" />,
    },
    {
      tab: 'quiz',
      titleEs: 'Gran Quiz',
      titleHy: 'Մեծ վիկտորինա',
      descEs: '32 preguntas aleatorias en 6 categorías con explicaciones detalladas en armenio.',
      metric: `Mejor: ${progress.quizBestPercent}%`,
      icon: <Trophy className="w-5 h-5 text-[#C93439]" />,
    },
    {
      tab: 'juegos',
      titleEs: '10 juegos interactivos',
      titleHy: '10 խաղեր',
      descEs: 'Memoria, Completa la canción, Detectives, Desafío de 60s y El camino de los sueños.',
      metric: `${gamesDone}/10 juegos`,
      icon: <Gamepad2 className="w-5 h-5 text-[#C93439]" />,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Warm Latin-American Hero Stage */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#71152F] via-[#A71D36] to-[#C93439] text-[#FFF1DF] p-6 sm:p-10 lg:p-12 shadow-lg">
        {/* Decorative warm Latin musical SVG artwork */}
        <svg
          aria-hidden="true"
          viewBox="0 0 480 420"
          className="pointer-events-none absolute -right-10 -bottom-12 w-72 sm:w-96 opacity-20"
          fill="none"
        >
          <circle cx="260" cy="210" r="170" stroke="#F6B94C" strokeWidth="2" />
          <circle cx="260" cy="210" r="126" stroke="#F07835" strokeWidth="2" strokeDasharray="8 8" />
          <circle cx="260" cy="210" r="82" stroke="#FFF1DF" strokeWidth="1.5" />
          <path
            d="M40 280 C120 220, 190 320, 270 250 C340 190, 400 260, 460 200"
            stroke="#F6B94C"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M20 315 C110 255, 190 355, 285 285 C355 225, 415 295, 470 235"
            stroke="#FFF1DF"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M250 110 V245 C250 262 232 275 215 270 C198 265 196 244 212 236 C224 230 236 234 242 240 V135 L312 115 V220 C312 237 294 250 277 245 C260 240 258 219 274 211 C286 205 298 209 304 215 V100 L250 110Z"
            fill="#F6B94C"
          />
        </svg>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-xs sm:text-sm font-medium text-[#F6B94C]">
              A1–B2 · Español / Հայերեն · Plataforma musical interactiva
            </p>
            <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-balance">
              Natalia Oreiro — Cambio Dolor
            </h1>
            <p className="text-base sm:text-lg text-[#FFF1DF]/90 max-w-2xl leading-relaxed">
              Aprende español auténtico con ritmo latinoamericano: subtítulos interactivos con traducción al armenio, 17 lecciones de gramática, 36 palabras clave, 40 preguntas de conversación y 10 juegos reales.
            </p>
            <p className="text-sm text-[#F6B94C]/95 max-w-2xl leading-relaxed">
              Սովորիր իսպաներեն երաժշտությամբ՝ բնօրինակ տեսանյութով, սեղմվող հայերեն թարգմանություններով, քերականությամբ, վիկտորինայով և 10 ինտերակտիվ խաղերով։
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('video')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F07835] hover:bg-[#F6B94C] hover:text-[#2B0A14] text-white font-bold text-sm transition-colors cursor-pointer whitespace-nowrap shadow-md"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Empezar con el vídeo</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('cantando')}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-[#FFF1DF] font-semibold text-sm transition-colors cursor-pointer whitespace-nowrap border border-white/25"
              >
                <Mic className="w-4 h-4 text-[#F6B94C]" />
                <span>Aprende cantando</span>
              </button>
            </div>
          </div>

          {/* Right featured quote & live points card */}
          <div className="lg:col-span-4 rounded-2xl bg-[#2B0A14]/45 backdrop-blur-sm border border-[#F6B94C]/30 p-6 space-y-4">
            <p className="text-xs font-semibold text-[#F6B94C]">Estribillo · Կրկներգ</p>
            <blockquote className="font-display text-xl italic leading-snug text-[#FFF1DF]">
              «Cambio dolor por libertad,
              <br />
              cambio heridas por un sueño
              <br />
              que me ayude a continuar»
            </blockquote>
            <p className="text-sm text-[#FFF1DF]/85 leading-relaxed">
              Ցավը փոխանակում եմ ազատության հետ, վերքերը փոխանակում եմ մի երազանքի հետ, որն ինձ կօգնի շարունակել։
            </p>
            <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="text-[#FFF1DF]/80">Tus puntos · Միավորներ</span>
              <span className="font-mono font-bold text-base text-[#F6B94C] tabular-nums">
                {progress.points} pts
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Summary KPI strip below hero */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-white border border-[#71152F]/15 p-4">
          <p className="text-xs text-[#A71D36] font-medium">Gramática</p>
          <p className="font-display text-2xl font-bold text-[#71152F] mt-1 tabular-nums">
            {GRAMMAR_TOPICS.length} temas
          </p>
          <p className="text-xs text-[#5A2434]">Ամբողջական դասեր</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#71152F]/15 p-4">
          <p className="text-xs text-[#A71D36] font-medium">Vocabulario</p>
          <p className="font-display text-2xl font-bold text-[#71152F] mt-1 tabular-nums">
            {VOCAB_ITEMS.length} tarjetas
          </p>
          <p className="text-xs text-[#5A2434]">Իսպաներեն–հայերեն</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#71152F]/15 p-4">
          <p className="text-xs text-[#A71D36] font-medium">Conversación</p>
          <p className="font-display text-2xl font-bold text-[#71152F] mt-1 tabular-nums">
            {CONVERSATION_QUESTIONS.length} preguntas
          </p>
          <p className="text-xs text-[#5A2434]">A1–A2 · B1 · B2</p>
        </div>
        <div className="rounded-2xl bg-white border border-[#71152F]/15 p-4">
          <p className="text-xs text-[#A71D36] font-medium">Quiz y juegos</p>
          <p className="font-display text-2xl font-bold text-[#71152F] mt-1 tabular-nums">
            {QUIZ_QUESTIONS.length} + 10
          </p>
          <p className="text-xs text-[#5A2434]">Վիկտորինա և խաղեր</p>
        </div>
      </section>

      {/* Complete Learning Modules Grid */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-[#71152F]">
              Ruta de aprendizaje · Ուսումնական բաժիններ
            </h2>
            <p className="text-sm text-[#5A2434]">
              Elige cualquier módulo para practicar a tu ritmo. Todo tu progreso se guarda automáticamente.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pathways.map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => onNavigate(item.tab)}
              className="group text-left rounded-2xl bg-white border border-[#71152F]/15 hover:border-[#F07835] p-5 flex flex-col justify-between gap-4 transition-all cursor-pointer"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="p-2 rounded-xl bg-[#FFF1DF]">{item.icon}</span>
                  <span className="text-xs font-mono tabular-nums text-[#A71D36]">
                    {item.metric}
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#71152F] group-hover:text-[#A71D36] transition-colors">
                    {item.titleEs}
                  </h3>
                  <p className="text-xs font-semibold text-[#C93439]">{item.titleHy}</p>
                </div>
                <p className="text-sm text-[#5A2434] leading-relaxed">{item.descEs}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#71152F] group-hover:translate-x-0.5 transition-transform">
                <span>Abrir sección</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
