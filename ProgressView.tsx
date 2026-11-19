import React, { useMemo, useState } from 'react';
import { Award, BookOpen, CheckCircle2, Flame, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { CONVERSATION_QUESTIONS } from './conversationData';
import { LISTENING_EXERCISES } from './gamesData';
import { GRAMMAR_TOPICS } from './grammarData';
import { SINGABLE_LINES } from './lyricsData';
import { TabId, UserProgress } from './types';
import { VOCAB_ITEMS } from './vocabData';

interface ProgressViewProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onNavigate: (tab: TabId) => void;
  onClearMistake: (mistakeId: string) => void;
}

const GAME_NAMES: { id: string; title: string }[] = [
  { id: 'memoria', title: '1. Memoria' },
  { id: 'completa', title: '2. Completa la canción' },
  { id: 'ordena', title: '3. Ordena las palabras' },
  { id: 'escucha_elige', title: '4. Escucha y elige' },
  { id: 'traduce', title: '5. Traduce al español' },
  { id: 'detectives', title: '6. Detectives de gramática' },
  { id: 'verdadero_falso', title: '7. Verdadero o falso' },
  { id: 'corrige', title: '8. Corrige el error' },
  { id: 'desafio60', title: '9. Desafío de 60 segundos' },
  { id: 'camino', title: '10. El camino de los sueños' },
];

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onResetProgress,
  onNavigate,
  onClearMistake,
}) => {
  const [confirmingReset, setConfirmingReset] = useState(false);

  const metrics = useMemo(() => {
    const vocabPct = Math.round((progress.learnedVocabIds.length / VOCAB_ITEMS.length) * 100);
    const grammarPct = Math.round(
      (progress.completedGrammarIds.length / GRAMMAR_TOPICS.length) * 100
    );
    const singPct = Math.round(
      (progress.singCompletedLineIds.length / SINGABLE_LINES.length) * 100
    );
    const escuchaPct = Math.round(
      (progress.completedEscuchaIds.length / LISTENING_EXERCISES.length) * 100
    );
    const gamesCompleted = GAME_NAMES.filter((g) => progress.gameScores[g.id]?.completed).length;
    const gamesPct = Math.round((gamesCompleted / GAME_NAMES.length) * 100);
    const overallPct = Math.round(
      (vocabPct + grammarPct + singPct + escuchaPct + gamesPct + progress.quizBestPercent) / 6
    );
    return { vocabPct, grammarPct, singPct, escuchaPct, gamesCompleted, gamesPct, overallPct };
  }, [progress]);

  const achievements = useMemo(
    () => [
      {
        id: 'ach_vocab',
        titleEs: 'Coleccionista de palabras',
        titleHy: '10+ բառ յուրացված',
        unlocked: progress.learnedVocabIds.length >= 10,
      },
      {
        id: 'ach_grammar',
        titleEs: 'Dominio gramatical',
        titleHy: '5+ քերականության դաս ավարտված',
        unlocked: progress.completedGrammarIds.length >= 5,
      },
      {
        id: 'ach_sing',
        titleEs: 'Voz de Cambio Dolor',
        titleHy: '8+ տող երգելով սովորած',
        unlocked: progress.singCompletedLineIds.length >= 8,
      },
      {
        id: 'ach_quiz',
        titleEs: 'Estrella del Quiz',
        titleHy: '75%+ արդյունք վիկտորինայում',
        unlocked: progress.quizBestPercent >= 75,
      },
      {
        id: 'ach_games',
        titleEs: 'Campeón de juegos',
        titleHy: '4+ խաղ հաղթահարված',
        unlocked: metrics.gamesCompleted >= 4,
      },
      {
        id: 'ach_camino',
        titleEs: 'El camino de los sueños',
        titleHy: 'Ավարտել «Երազանքների ճանապարհը»',
        unlocked: Boolean(progress.gameScores['camino']?.completed),
      },
    ],
    [metrics.gamesCompleted, progress]
  );

  const learnedWords = useMemo(
    () => VOCAB_ITEMS.filter((v) => progress.learnedVocabIds.includes(v.id)),
    [progress.learnedVocabIds]
  );

  const difficultTopics = useMemo(() => {
    const counts: Record<string, number> = {};
    progress.mistakes.forEach((m) => {
      counts[m.topicRef] = (counts[m.topicRef] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [progress.mistakes]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            Guardado automático en tu dispositivo · Իմ առաջընթացն ու արդյունքները
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            Mi progreso
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setConfirmingReset(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#C93439]/35 text-[#A71D36] hover:bg-rose-50 text-xs font-semibold cursor-pointer self-start sm:self-auto whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar todo el progreso</span>
        </button>
      </div>

      {/* Inline confirmation panel (never uses window.confirm) */}
      {confirmingReset && (
        <div className="rounded-2xl bg-rose-50 border border-[#C93439] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#71152F]">
              ¿Seguro que deseas borrar todo tu progreso? · Վստա՞հ ես, որ ուզում ես զրոյացնել ամբողջ առաջընթացը։
            </p>
            <p className="text-xs text-[#5A2434]">
              Se reiniciarán puntos, palabras aprendidas, juegos, quiz y lista de errores.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setConfirmingReset(false)}
              className="px-4 py-2 rounded-xl bg-white border border-[#71152F]/20 text-xs font-semibold text-[#71152F] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                onResetProgress();
                setConfirmingReset(false);
              }}
              className="px-4 py-2 rounded-xl bg-[#C93439] hover:bg-[#A71D36] text-white text-xs font-semibold cursor-pointer"
            >
              Sí, reiniciar todo
            </button>
          </div>
        </div>
      )}

      {/* Top KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#71152F] to-[#A71D36] p-5 text-[#FFF1DF]">
          <p className="text-xs text-[#F6B94C] font-medium">Progreso total · Ընդհանուր</p>
          <p className="font-display text-3xl sm:text-4xl font-bold mt-2 tabular-nums">
            {metrics.overallPct}%
          </p>
          <div className="mt-3 h-1.5 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-[#F6B94C]" style={{ width: `${metrics.overallPct}%` }} />
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-[#71152F]/15 p-5">
          <p className="text-xs text-[#A71D36] font-medium flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[#F07835]" />
            <span>Puntos · Միավորներ</span>
          </p>
          <p className="font-display text-3xl sm:text-4xl font-bold text-[#71152F] mt-2 tabular-nums">
            {progress.points}
          </p>
          <p className="text-xs text-[#5A2434] mt-1">
            Quiz mejor marca: {progress.quizBestPercent}%
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-[#71152F]/15 p-5">
          <p className="text-xs text-[#A71D36] font-medium">Vocabulario y gramática</p>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-2 tabular-nums">
            {progress.learnedVocabIds.length}/{VOCAB_ITEMS.length} ·{' '}
            {progress.completedGrammarIds.length}/{GRAMMAR_TOPICS.length}
          </p>
          <p className="text-xs text-[#5A2434] mt-1">Բառեր · Քերականություն</p>
        </div>

        <div className="rounded-2xl bg-white border border-[#71152F]/15 p-5">
          <p className="text-xs text-[#A71D36] font-medium">Juegos y conversación</p>
          <p className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-2 tabular-nums">
            {metrics.gamesCompleted}/10 · {progress.conversationPracticedIds.length}/
            {CONVERSATION_QUESTIONS.length}
          </p>
          <p className="text-xs text-[#5A2434] mt-1">Խաղեր · Խոսակցական</p>
        </div>
      </div>

      {/* Module Progress Bars */}
      <div className="bg-white rounded-2xl border border-[#71152F]/15 p-5 sm:p-6 space-y-4">
        <h3 className="font-display text-xl font-bold text-[#71152F]">
          Avance por sección · Առաջընթացը բաժիններով
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: 'Gramática (17 temas)', pct: metrics.grammarPct, tab: 'gramatica' as TabId },
            { label: `Vocabulario (${VOCAB_ITEMS.length} palabras)`, pct: metrics.vocabPct, tab: 'vocabulario' as TabId },
            { label: 'Aprende cantando (33 líneas)', pct: metrics.singPct, tab: 'cantando' as TabId },
            { label: 'Escucha (12 ejercicios)', pct: metrics.escuchaPct, tab: 'escucha' as TabId },
            { label: 'Juegos interactivos (10 juegos)', pct: metrics.gamesPct, tab: 'juegos' as TabId },
            { label: 'Gran Quiz (mejor porcentaje)', pct: progress.quizBestPercent, tab: 'quiz' as TabId },
          ].map((row) => (
            <div key={row.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => onNavigate(row.tab)}
                  className="text-[#71152F] hover:underline cursor-pointer"
                >
                  {row.label}
                </button>
                <span className="font-mono tabular-nums text-[#A71D36]">{row.pct}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#FFF1DF] overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#F07835] to-[#A71D36] transition-all"
                  style={{ width: `${row.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements & Games Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#71152F]/15 p-5 sm:p-6 space-y-4">
          <h3 className="font-display text-xl font-bold text-[#71152F] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#F07835]" />
            <span>Logros · Նվաճումներ</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`rounded-xl p-3.5 border ${
                  a.unlocked
                    ? 'bg-[#FFF1DF] border-[#F07835]/50'
                    : 'bg-[#FFF8F0]/60 border-[#71152F]/10 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Trophy
                    className={`w-4 h-4 shrink-0 ${
                      a.unlocked ? 'text-[#C93439]' : 'text-[#71152F]/40'
                    }`}
                  />
                  <p className="text-xs font-bold text-[#71152F]">{a.titleEs}</p>
                </div>
                <p className="text-[11px] text-[#5A2434] mt-1">{a.titleHy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#71152F]/15 p-5 sm:p-6 space-y-4">
          <h3 className="font-display text-xl font-bold text-[#71152F]">
            Progreso en los 10 juegos · Խաղերի արդյունքներ
          </h3>
          <div className="divide-y divide-[#71152F]/10">
            {GAME_NAMES.map((g) => {
              const rec = progress.gameScores[g.id];
              return (
                <div
                  key={g.id}
                  className="py-2.5 flex items-center justify-between text-xs sm:text-sm"
                >
                  <span className="font-medium text-[#2B0A14]">{g.title}</span>
                  <span className="font-mono tabular-nums text-[#71152F]">
                    {rec ? (
                      <span className="inline-flex items-center gap-1.5">
                        {rec.completed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        <span>Mejor: {rec.bestScore} pts · {rec.played}x</span>
                      </span>
                    ) : (
                      <span className="text-[#5A2434]/60">Sin jugar</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Learned Words & Mistakes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#71152F]/15 p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-[#71152F] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#A71D36]" />
              <span>Palabras aprendidas ({learnedWords.length})</span>
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('vocabulario')}
              className="text-xs font-semibold text-[#C93439] underline cursor-pointer"
            >
              Ir al vocabulario
            </button>
          </div>
          {learnedWords.length === 0 ? (
            <p className="text-sm text-[#5A2434]">
              Aún no has marcado palabras como «Aprendido». Explora la sección de Vocabulario.
            </p>
          ) : (
            <div className="divide-y divide-[#71152F]/10 max-h-72 overflow-y-auto">
              {learnedWords.map((w) => (
                <div key={w.id} className="py-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#71152F]">{w.es}</span>
                  <span className="text-[#5A2434]">{w.hy}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-[#71152F]/15 p-5 sm:p-6 space-y-4">
          <h3 className="font-display text-xl font-bold text-[#71152F]">
            Errores y temas difíciles ({progress.mistakes.length}) · Սխալների կրկնություն
          </h3>

          {difficultTopics.length > 0 && (
            <div className="rounded-xl bg-[#FFF1DF] p-3.5 text-xs text-[#4D1626] space-y-1">
              <p className="font-bold text-[#71152F]">Temas para reforzar · Թեմաներ կրկնելու համար</p>
              <p>
                {difficultTopics
                  .slice(0, 5)
                  .map(([topic, cnt]) => `${topic} (${cnt})`)
                  .join(' · ')}
              </p>
            </div>
          )}

          {progress.mistakes.length === 0 ? (
            <p className="text-sm text-[#5A2434]">
              ¡Sin errores registrados por ahora! Հիանալի է, սխալներ չկան։
            </p>
          ) : (
            <div className="space-y-2.5 max-h-72 overflow-y-auto">
              {progress.mistakes.map((m) => (
                <div
                  key={m.id}
                  className="rounded-xl bg-[#FFF8F0] border border-[#C93439]/25 p-3.5 text-xs space-y-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-[#A71D36]">{m.source}</span>
                    <button
                      type="button"
                      onClick={() => onClearMistake(m.id)}
                      className="text-[#71152F]/70 hover:text-[#71152F] inline-flex items-center gap-0.5 cursor-pointer shrink-0"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Quitar</span>
                    </button>
                  </div>
                  <p className="font-semibold text-[#2B0A14]">{m.promptEs}</p>
                  <p className="text-[#C93439]">Elegiste: {m.chosenAnswer}</p>
                  <p className="text-emerald-700 font-semibold">Correcta: {m.correctAnswer}</p>
                  <p className="text-[#5A2434]">{m.explanationHy}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
