import React, { useMemo, useState } from 'react';
import {
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Layers,
  LayoutGrid,
  RotateCcw,
  Search,
} from 'lucide-react';
import { VOCAB_ITEMS } from './vocabData';

interface VocabViewProps {
  learnedIds: string[];
  reviewIds: string[];
  onToggleLearned: (id: string) => void;
  onToggleReview: (id: string) => void;
}

export const VocabView: React.FC<VocabViewProps> = ({
  learnedIds,
  reviewIds,
  onToggleLearned,
  onToggleReview,
}) => {
  const [mode, setMode] = useState<'grid' | 'flashcards'>('grid');
  const [filter, setFilter] = useState<'all' | 'learned' | 'review'>('all');
  const [search, setSearch] = useState('');
  const [revealedCards, setRevealedCards] = useState<Record<string, boolean>>({});

  // Flashcard state
  const [cardIndex, setCardIndex] = useState(0);
  const [flashRevealed, setFlashRevealed] = useState(false);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return VOCAB_ITEMS.filter((item) => {
      if (filter === 'learned' && !learnedIds.includes(item.id)) return false;
      if (filter === 'review' && !reviewIds.includes(item.id)) return false;
      if (q) {
        return (
          item.es.toLowerCase().includes(q) ||
          item.hy.toLowerCase().includes(q) ||
          item.exampleEs.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [filter, learnedIds, reviewIds, search]);

  const activeFlashItem = filteredItems[cardIndex] ?? filteredItems[0];

  const toggleReveal = (id: string) => {
    setRevealedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNextCard = () => {
    if (filteredItems.length === 0) return;
    setFlashRevealed(false);
    setCardIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const handlePrevCard = () => {
    if (filteredItems.length === 0) return;
    setFlashRevealed(false);
    setCardIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#71152F]/15 pb-4">
        <div>
          <p className="text-xs font-medium text-[#A71D36]">
            {VOCAB_ITEMS.length} palabras y expresiones esenciales · Բառապաշար և քարտեր
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#71152F] mt-1">
            Vocabulario interactivo
          </h2>
          <p className="text-sm text-[#5A2434] mt-1">
            La traducción al armenio permanece oculta hasta que pulses la tarjeta para entrenar tu memoria activa.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-[#FFF1DF] border border-[#71152F]/15 self-start md:self-auto">
          <button
            type="button"
            onClick={() => setMode('grid')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
              mode === 'grid' ? 'bg-[#71152F] text-[#FFF1DF]' : 'text-[#71152F]'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Diccionario</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('flashcards');
              setCardIndex(0);
              setFlashRevealed(false);
            }}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
              mode === 'flashcards' ? 'bg-[#71152F] text-[#FFF1DF]' : 'text-[#71152F]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Modo tarjetas</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="inline-flex p-1 rounded-xl bg-white border border-[#71152F]/15 self-start">
          <button
            type="button"
            onClick={() => {
              setFilter('all');
              setCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
              filter === 'all' ? 'bg-[#A71D36] text-white' : 'text-[#71152F]'
            }`}
          >
            Todas ({VOCAB_ITEMS.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter('learned');
              setCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
              filter === 'learned' ? 'bg-[#A71D36] text-white' : 'text-[#71152F]'
            }`}
          >
            Aprendidas ({learnedIds.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilter('review');
              setCardIndex(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer whitespace-nowrap ${
              filter === 'review' ? 'bg-[#A71D36] text-white' : 'text-[#71152F]'
            }`}
          >
            Repasar ({reviewIds.length})
          </button>
        </div>

        <div className="relative sm:w-72">
          <Search className="w-4 h-4 text-[#71152F]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCardIndex(0);
            }}
            placeholder="Buscar palabra... / Որոնել..."
            className="w-full rounded-xl border border-[#71152F]/20 bg-white pl-10 pr-4 py-2 text-sm text-[#2B0A14] focus:outline-none focus:border-[#F07835]"
          />
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#71152F]/15 p-10 text-center space-y-2">
          <p className="font-display text-lg font-bold text-[#71152F]">
            No hay palabras en esta vista · Այս ցուցակում բառեր դեռ չկան
          </p>
          <p className="text-sm text-[#5A2434]">
            Cambia el filtro o marca palabras como «Aprendido» o «Repasar».
          </p>
        </div>
      ) : mode === 'flashcards' && activeFlashItem ? (
        /* Flashcard active recall mode */
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex items-center justify-between text-xs font-mono tabular-nums text-[#71152F]">
            <span>
              Tarjeta {Math.min(cardIndex + 1, filteredItems.length)} / {filteredItems.length}
            </span>
            <span>{activeFlashItem.partOfSpeech}</span>
          </div>

          <div className="rounded-3xl bg-white border border-[#71152F]/20 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-[#71152F] via-[#A71D36] to-[#C93439] p-8 sm:p-10 text-center text-[#FFF1DF] space-y-3">
              <p className="text-xs font-medium text-[#F6B94C]">
                Intenta recordar su significado en armenio · Փորձիր հիշել հայերեն թարգմանությունը
              </p>
              <h3 className="font-display text-3xl sm:text-4xl font-bold">{activeFlashItem.es}</h3>
              <p className="text-xs text-[#FFF1DF]/80 italic">«{activeFlashItem.songLineRef}»</p>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              {!flashRevealed ? (
                <div className="text-center py-4">
                  <button
                    type="button"
                    onClick={() => setFlashRevealed(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#F07835] hover:bg-[#C93439] text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Mostrar traducción · Ցույց տալ թարգմանությունը</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center pb-3 border-b border-[#71152F]/10">
                    <p className="text-2xl font-bold text-[#71152F]">{activeFlashItem.hy}</p>
                    <p className="text-sm text-[#5A2434] mt-1.5">{activeFlashItem.contextMeaningHy}</p>
                  </div>
                  <div className="rounded-xl bg-[#FFF8F0] p-4 space-y-1">
                    <p className="text-xs font-semibold text-[#A71D36]">Ejemplo cotidiano · Առօրյա օրինակ</p>
                    <p className="text-sm font-semibold text-[#2B0A14]">{activeFlashItem.exampleEs}</p>
                    <p className="text-sm text-[#71152F]">{activeFlashItem.exampleHy}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#71152F]/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleLearned(activeFlashItem.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      learnedIds.includes(activeFlashItem.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#FFF1DF] text-[#71152F] hover:bg-[#F6B94C]/40'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Aprendido</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleReview(activeFlashItem.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                      reviewIds.includes(activeFlashItem.id)
                        ? 'bg-[#F07835] text-white'
                        : 'bg-[#FFF1DF] text-[#71152F] hover:bg-[#F6B94C]/40'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Repasar</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevCard}
                    className="p-2.5 rounded-xl bg-[#FFF1DF] text-[#71152F] hover:bg-[#F6B94C]/40 cursor-pointer"
                    aria-label="Tarjeta anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlashRevealed((v) => !v)}
                    className="p-2.5 rounded-xl bg-[#FFF1DF] text-[#71152F] hover:bg-[#F6B94C]/40 cursor-pointer"
                    aria-label="Voltear tarjeta"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextCard}
                    className="px-4 py-2.5 rounded-xl bg-[#71152F] text-[#FFF1DF] text-xs font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Siguiente</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Grid dictionary mode */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredItems.map((item) => {
            const isOpen = Boolean(revealedCards[item.id]);
            const isLearned = learnedIds.includes(item.id);
            const isReview = reviewIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`rounded-2xl bg-white border p-5 flex flex-col justify-between gap-4 transition-colors ${
                  isLearned ? 'border-emerald-500/40' : 'border-[#71152F]/15'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-medium text-[#A71D36]">{item.partOfSpeech}</p>
                      <h3 className="font-display text-xl font-bold text-[#71152F] mt-0.5">
                        {item.es}
                      </h3>
                    </div>
                    {isLearned && (
                      <span className="text-xs font-semibold text-emerald-700 inline-flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Aprendido
                      </span>
                    )}
                  </div>

                  {/* Tap to reveal Armenian translation */}
                  <button
                    type="button"
                    onClick={() => toggleReveal(item.id)}
                    className={`w-full text-left rounded-xl p-3.5 transition-colors cursor-pointer ${
                      isOpen
                        ? 'bg-[#FFF1DF] border border-[#F07835]/35'
                        : 'bg-[#FFF8F0] border border-dashed border-[#71152F]/25 hover:bg-[#FFF1DF]'
                    }`}
                  >
                    {isOpen ? (
                      <div className="space-y-1.5">
                        <p className="text-base font-bold text-[#71152F]">{item.hy}</p>
                        <p className="text-xs text-[#5A2434] leading-relaxed">
                          {item.contextMeaningHy}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs font-semibold text-[#A71D36] flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Pulsa para ver el significado en armenio · Սեղմիր՝ բացելու համար</span>
                      </p>
                    )}
                  </button>

                  <div className="space-y-1 text-xs">
                    <p className="font-semibold text-[#2B0A14]">«{item.exampleEs}»</p>
                    {isOpen && <p className="text-[#71152F]">{item.exampleHy}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-[#71152F]/10">
                  <button
                    type="button"
                    onClick={() => onToggleLearned(item.id)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      isLearned
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#FFF1DF] text-[#71152F] hover:bg-[#F6B94C]/40'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Aprendido</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleReview(item.id)}
                    className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      isReview
                        ? 'bg-[#F07835] text-white'
                        : 'bg-white border border-[#71152F]/20 text-[#71152F] hover:bg-[#FFF8F0]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{isReview ? 'Guardada' : 'Repasar'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
