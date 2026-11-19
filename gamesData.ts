import { ListeningExercise } from './types';

// Juego 1 — Memoria pairs
export interface MemoryPair {
  id: string;
  es: string;
  hy: string;
}

export const MEMORY_SETS: { nameEs: string; nameHy: string; pairs: MemoryPair[] }[] = [
  {
    nameEs: 'Set 1: Corazón de la canción',
    nameHy: 'Հավաքածու 1. Երգի սիրտը',
    pairs: [
      { id: 'm1', es: 'libertad', hy: 'ազատություն' },
      { id: 'm2', es: 'heridas', hy: 'վերքեր' },
      { id: 'm3', es: 'sueño', hy: 'երազանք' },
      { id: 'm4', es: 'dolor', hy: 'ցավ' },
      { id: 'm5', es: 'suerte', hy: 'բախտ' },
      { id: 'm6', es: 'felicidad', hy: 'երջանկություն' },
    ],
  },
  {
    nameEs: 'Set 2: Verbos de movimiento y mente',
    nameHy: 'Հավաքածու 2. Բայեր և գործողություններ',
    pairs: [
      { id: 'm7', es: 'volar', hy: 'թռչել' },
      { id: 'm8', es: 'alcanzar', hy: 'հասնել' },
      { id: 'm9', es: 'pensar', hy: 'մտածել' },
      { id: 'm10', es: 'imaginar', hy: 'պատկերացնել' },
      { id: 'm11', es: 'conocer', hy: 'ճանաչել' },
      { id: 'm12', es: 'continuar', hy: 'շարունակել' },
    ],
  },
];

// Juego 2 — Completa la canción
export interface ClozeItem {
  id: string;
  before: string;
  answer: string;
  after: string;
  options: { es: string; hy: string }[];
  hy: string;
  explanationHy: string;
}

export const CLOZE_ITEMS: ClozeItem[] = [
  {
    id: 'cl1',
    before: 'Juraría que no sé bien',
    answer: 'lo que quiero',
    after: '',
    options: [
      { es: 'lo que quiero', hy: 'այն, ինչ ուզում եմ' },
      { es: 'el que quiero', hy: 'նա, ում ուզում եմ' },
      { es: 'lo que quise', hy: 'այն, ինչ ուզեցի' },
      { es: 'que me quiero', hy: 'որ ինձ սիրում եմ' },
    ],
    hy: 'Կերդվեի, որ ինքս էլ լավ չգիտեմ՝ ինչ եմ ուզում',
    explanationHy: '«Lo que quiero» («այն, ինչ ուզում եմ») ճիշտ բնօրինակ արտահայտությունն է։',
  },
  {
    id: 'cl2',
    before: 'Pero sé que moriría si me quedo',
    answer: 'en la mitad',
    after: '',
    options: [
      { es: 'en la mitad', hy: 'կես ճանապարհին' },
      { es: 'a la tarde', hy: 'երեկոյան' },
      { es: 'por el mundo', hy: 'աշխարհով մեկ' },
      { es: 'sin libertad', hy: 'առանց ազատության' },
    ],
    hy: 'Բայց գիտեմ, որ կմեռնեի, եթե կես ճանապարհին մնայի',
    explanationHy: '«Quedarse en la mitad»՝ մնալ կես ճանապարհին։',
  },
  {
    id: 'cl3',
    before: 'Por eso',
    answer: 'vuelo',
    after: 'a otros senderos',
    options: [
      { es: 'vuelo', hy: 'թռչում եմ' },
      { es: 'vuelvo', hy: 'վերադառնում եմ' },
      { es: 'vivo', hy: 'ապրում եմ' },
      { es: 'vengo', hy: 'գալիս եմ' },
    ],
    hy: 'Այդ պատճառով թռչում եմ դեպի այլ ուղիներ',
    explanationHy: '«Volar» (թռչել) բայի ներկա 1-ին դեմքն է՝ «vuelo»։',
  },
  {
    id: 'cl4',
    before: 'Para conocer el mundo',
    answer: 'de verdad',
    after: '',
    options: [
      { es: 'de verdad', hy: 'իսկապես, իրականում' },
      { es: 'de miedo', hy: 'վախից' },
      { es: 'en silencio', hy: 'լռության մեջ' },
      { es: 'muy tarde', hy: 'շատ ուշ' },
    ],
    hy: 'Իսկական աշխարհը ճանաչելու համար',
    explanationHy: '«De verdad» նշանակում է «իսկապես, իրականում»։',
  },
  {
    id: 'cl5',
    before: 'Aún no es tarde pero así me estoy',
    answer: 'sintiendo',
    after: '',
    options: [
      { es: 'sintiendo', hy: 'զգալով (ճիշտ ձև)' },
      { es: 'sentiendo', hy: 'սխալ գրություն' },
      { es: 'pensando', hy: 'մտածելով' },
      { es: 'soñando', hy: 'երազելով' },
    ],
    hy: 'Դեռ ուշ չէ, բայց հենց այդպես եմ ինձ զգում',
    explanationHy: '«Sentir» բայի գերունդիումը՝ «sintiendo» (e → i)։',
  },
  {
    id: 'cl6',
    before: 'Y aparecen tantos miedos que no me dejan',
    answer: 'pensar',
    after: '',
    options: [
      { es: 'pensar', hy: 'մտածել' },
      { es: 'volar', hy: 'թռչել' },
      { es: 'alcanzar', hy: 'հասնել' },
      { es: 'continuar', hy: 'շարունակել' },
    ],
    hy: 'Եվ հայտնվում են այնքան վախեր, որ ինձ չեն թողնում մտածել',
    explanationHy: '«No me dejan pensar»՝ չեն թողնում մտածել։',
  },
  {
    id: 'cl7',
    before: 'Y me cuesta imaginar lo que',
    answer: 'vendrá',
    after: '',
    options: [
      { es: 'vendrá', hy: 'կգա, գալու է' },
      { es: 'viene', hy: 'գալիս է' },
      { es: 'viniera', hy: 'եթե գար' },
      { es: 'venderá', hy: 'կվաճառի' },
    ],
    hy: 'Եվ ինձ համար դժվար է պատկերացնել, թե ինչ է գալու',
    explanationHy: '«Venir» բայի ապառնին է՝ «vendrá»։',
  },
  {
    id: 'cl8',
    before: 'Cambio',
    answer: 'heridas',
    after: 'por un sueño',
    options: [
      { es: 'heridas', hy: 'վերքեր' },
      { es: 'miedos', hy: 'վախեր' },
      { es: 'senderos', hy: 'ուղիներ' },
      { es: 'amores', hy: 'սերեր' },
    ],
    hy: 'Վերքերը փոխանակում եմ մի երազանքի հետ',
    explanationHy: '«Cambio heridas por un sueño»՝ կրկներգի երկրորդ տողը։',
  },
  {
    id: 'cl9',
    before: 'Que me',
    answer: 'ayude',
    after: 'a continuar',
    options: [
      { es: 'ayude', hy: 'օգնի (սուբյունկտիվ)' },
      { es: 'ayuda', hy: 'օգնում է (ներկա)' },
      { es: 'ayudó', hy: 'օգնեց (անցյալ)' },
      { es: 'ayudaría', hy: 'կօգներ (պայմանական)' },
    ],
    hy: 'Որն ինձ կօգնի շարունակել',
    explanationHy: 'Դեռ չգտնված երազանքի համար դրվում է սուբյունկտիվ՝ «ayude»։',
  },
  {
    id: 'cl10',
    before: 'Que la suerte',
    answer: 'sea',
    after: 'suerte',
    options: [
      { es: 'sea', hy: 'լինի (սուբյունկտիվ)' },
      { es: 'es', hy: 'է (ներկա)' },
      { es: 'fue', hy: 'եղավ (անցյալ)' },
      { es: 'será', hy: 'կլինի (ապառնի)' },
    ],
    hy: 'Թող որ բախտը իսկապես բախտ լինի',
    explanationHy: '«Que + subjuntivo» մաղթանքի ձևը՝ «sea»։',
  },
];

// Juego 3 — Ordena las palabras
export interface OrderSentenceItem {
  id: string;
  correct: string[];
  hy: string;
}

export const ORDER_ITEMS: OrderSentenceItem[] = [
  {
    id: 'ord1',
    correct: ['Cambio', 'dolor', 'por', 'libertad'],
    hy: 'Ցավը փոխանակում եմ ազատության հետ',
  },
  {
    id: 'ord2',
    correct: ['Por', 'eso', 'vuelo', 'a', 'otros', 'senderos'],
    hy: 'Այդ պատճառով թռչում եմ դեպի այլ ուղիներ',
  },
  {
    id: 'ord3',
    correct: ['Para', 'conocer', 'el', 'mundo', 'de', 'verdad'],
    hy: 'Իսկական աշխարհը ճանաչելու համար',
  },
  {
    id: 'ord4',
    correct: ['Y', 'tengo', 'sueños', 'de', 'amores', 'nuevos'],
    hy: 'Եվ ունեմ նոր սերերի մասին երազանքներ',
  },
  {
    id: 'ord5',
    correct: ['Y', 'me', 'cuesta', 'imaginar', 'lo', 'que', 'vendrá'],
    hy: 'Եվ ինձ համար դժվար է պատկերացնել, թե ինչ է գալու',
  },
  {
    id: 'ord6',
    correct: ['Que', 'la', 'suerte', 'sea', 'suerte'],
    hy: 'Թող որ բախտը իսկապես բախտ լինի',
  },
  {
    id: 'ord7',
    correct: ['Que', 'me', 'ayude', 'a', 'continuar'],
    hy: 'Որն ինձ կօգնի շարունակել',
  },
];

// Juego 4 — Escucha y elige
export interface ListenChoiceItem {
  id: string;
  lineId: string;
  sectionHint: string;
  correctLine: string;
  options: { es: string; hy: string }[];
  hy: string;
}

export const LISTEN_CHOICE_ITEMS: ListenChoiceItem[] = [
  {
    id: 'lc1',
    lineId: 'verso1_v1',
    sectionHint: 'Verso 1 · Línea 1',
    correctLine: 'Juraría que no sé bien lo que quiero',
    options: [
      { es: 'Juraría que no sé bien lo que quiero', hy: 'Կերդվեի, որ լավ չգիտեմ՝ ինչ եմ ուզում' },
      { es: 'Diría que ya sé todo lo que quiero', hy: 'Կասեի, որ արդեն ամեն ինչ գիտեմ՝ ինչ եմ ուզում' },
      { es: 'Juraría que no sé bien lo que vendrá', hy: 'Կերդվեի, որ լավ չգիտեմ՝ ինչ է գալու' },
      { es: 'Sabría que no tengo lo que quiero', hy: 'Կիմանայի, որ չունեմ այն, ինչ ուզում եմ' },
    ],
    hy: 'Կերդվեի, որ ինքս էլ լավ չգիտեմ՝ ինչ եմ ուզում',
  },
  {
    id: 'lc2',
    lineId: 'verso1_v3',
    sectionHint: 'Verso 1 · Línea 3',
    correctLine: 'Por eso vuelo a otros senderos',
    options: [
      { es: 'Por eso vuelvo a mis senderos', hy: 'Այդ պատճառով վերադառնում եմ իմ ուղիներին' },
      { es: 'Por eso vuelo a otros senderos', hy: 'Այդ պատճառով թռչում եմ դեպի այլ ուղիներ' },
      { es: 'Por eso busco otros silencios', hy: 'Այդ պատճառով փնտրում եմ այլ լռություններ' },
      { es: 'Para volar a otros lugares', hy: 'Այլ վայրեր թռչելու համար' },
    ],
    hy: 'Այդ պատճառով թռչում եմ դեպի այլ ուղիներ',
  },
  {
    id: 'lc3',
    lineId: 'verso1_v6',
    sectionHint: 'Verso 1 · Línea 6',
    correctLine: 'Y aparecen tantos miedos que no me dejan pensar',
    options: [
      { es: 'Y desaparecen los miedos que no me dejan soñar', hy: 'Եվ անհետանում են վախերը, որ չեն թողնում երազել' },
      { es: 'Y aparecen tantos sueños que no me dejan dormir', hy: 'Եվ հայտնվում են այնքան երազներ, որ չեն թողնում քնել' },
      { es: 'Y aparecen tantos miedos que no me dejan pensar', hy: 'Եվ հայտնվում են այնքան վախեր, որ ինձ չեն թողնում մտածել' },
      { es: 'Y me quedan tantos miedos que no puedo olvidar', hy: 'Եվ մնում են այնքան վախեր, որ չեմ կարող մոռանալ' },
    ],
    hy: 'Եվ հայտնվում են այնքան վախեր, որ ինձ չեն թողնում մտածել',
  },
  {
    id: 'lc4',
    lineId: 'coro1_c1',
    sectionHint: 'Coro 1 · Línea 1',
    correctLine: 'Cambio dolor por libertad',
    options: [
      { es: 'Cambio dolor por soledad', hy: 'Ցավը փոխանակում եմ մենության հետ' },
      { es: 'Cambio temor por libertad', hy: 'Վախը փոխանակում եմ ազատության հետ' },
      { es: 'Cambio el amor por libertad', hy: 'Սերը փոխանակում եմ ազատության հետ' },
      { es: 'Cambio dolor por libertad', hy: 'Ցավը փոխանակում եմ ազատության հետ' },
    ],
    hy: 'Ցավը փոխանակում եմ ազատության հետ',
  },
  {
    id: 'lc5',
    lineId: 'coro1_c6',
    sectionHint: 'Coro 1 · Línea 6',
    correctLine: 'Y no algo que no he de alcanzar',
    options: [
      { es: 'Y no algo que no he de alcanzar', hy: 'Եվ ոչ թե մի բան, որին չեմ կարող հասնել' },
      { es: 'Y no algo que no puedo olvidar', hy: 'Եվ ոչ թե մի բան, որ չեմ կարող մոռանալ' },
      { es: 'Y algo que siempre voy a buscar', hy: 'Եվ մի բան, որ միշտ փնտրելու եմ' },
      { es: 'Y no un sueño que debo dejar', hy: 'Եվ ոչ թե երազանք, որ պետք է թողնեմ' },
    ],
    hy: 'Եվ ոչ թե մի բան, որին չեմ կարող հասնել',
  },
];

// Juego 5 — Traduce al español (word bank construction)
export interface TranslateBuildItem {
  id: string;
  hy: string;
  correctTokens: string[];
  distractors: string[];
}

export const TRANSLATE_BUILD_ITEMS: TranslateBuildItem[] = [
  {
    id: 'tb1',
    hy: 'Ցավը փոխանակում եմ ազատության հետ',
    correctTokens: ['Cambio', 'dolor', 'por', 'libertad'],
    distractors: ['para', 'miedo'],
  },
  {
    id: 'tb2',
    hy: 'Վերքերը փոխանակում եմ մի երազանքի հետ',
    correctTokens: ['Cambio', 'heridas', 'por', 'un', 'sueño'],
    distractors: ['una', 'para'],
  },
  {
    id: 'tb3',
    hy: 'Դեռ ուշ չէ',
    correctTokens: ['Aún', 'no', 'es', 'tarde'],
    distractors: ['ya', 'pronto'],
  },
  {
    id: 'tb4',
    hy: 'Ինձ համար դժվար է պատկերացնել ապագան',
    correctTokens: ['Me', 'cuesta', 'imaginar', 'el', 'futuro'],
    distractors: ['cuestan', 'pensar'],
  },
  {
    id: 'tb5',
    hy: 'Թող որ բախտը լինի բախտ',
    correctTokens: ['Que', 'la', 'suerte', 'sea', 'suerte'],
    distractors: ['es', 'el'],
  },
  {
    id: 'tb6',
    hy: 'Այդ պատճառով ես սովորում եմ իսպաներեն',
    correctTokens: ['Por', 'eso', 'aprendo', 'español'],
    distractors: ['porque', 'para'],
  },
];

// Juego 6 — Detectives de gramática
export interface GrammarDetectiveItem {
  id: string;
  sentenceEs: string;
  sentenceHy: string;
  highlighted: string;
  correctLabel: string;
  options: { es: string; hy: string }[];
  explanationHy: string;
}

export const DETECTIVE_ITEMS: GrammarDetectiveItem[] = [
  {
    id: 'det1',
    sentenceEs: 'Juraría que no sé bien lo que quiero.',
    sentenceHy: 'Կերդվեի, որ ինքս էլ լավ չգիտեմ՝ ինչ եմ ուզում։',
    highlighted: 'Juraría',
    correctLabel: 'Condicional simple',
    options: [
      { es: 'Condicional simple', hy: 'Պարզ պայմանական եղանակ' },
      { es: 'Futuro simple', hy: 'Պարզ ապառնի ժամանակ' },
      { es: 'Presente de subjuntivo', hy: 'Ներկա ստորադասական եղանակ' },
      { es: 'Presente progresivo', hy: 'Ներկա շարունակական ժամանակ' },
    ],
    explanationHy: '«Jurar + ía»՝ պայմանական եղանակ (Condicional simple)։',
  },
  {
    id: 'det2',
    sentenceEs: 'Que la suerte sea suerte.',
    sentenceHy: 'Թող որ բախտը իսկապես բախտ լինի։',
    highlighted: 'sea',
    correctLabel: 'Presente de subjuntivo',
    options: [
      { es: 'Presente de indicativo', hy: 'Ներկա սահմանական ժամանակ' },
      { es: 'Presente de subjuntivo', hy: 'Ներկա ստորադասական եղանակ' },
      { es: 'Condicional simple', hy: 'Պարզ պայմանական եղանակ' },
      { es: 'Futuro simple', hy: 'Պարզ ապառնի ժամանակ' },
    ],
    explanationHy: '«Que + sea»՝ «ser» բայի ներկա սուբյունկտիվը մաղթանքի մեջ։',
  },
  {
    id: 'det3',
    sentenceEs: 'Y me cuesta imaginar lo que vendrá.',
    sentenceHy: 'Եվ ինձ համար դժվար է պատկերացնել, թե ինչ է գալու։',
    highlighted: 'vendrá',
    correctLabel: 'Futuro simple',
    options: [
      { es: 'Condicional simple', hy: 'Պարզ պայմանական եղանակ' },
      { es: 'Presente de indicativo', hy: 'Ներկա սահմանական ժամանակ' },
      { es: 'Futuro simple', hy: 'Պարզ ապառնի ժամանակ' },
      { es: 'Verbo pronominal', hy: 'Դերանվանական բայ' },
    ],
    explanationHy: '«Venir → vendrá»՝ անկանոն պարզ ապառնի ժամանակ։',
  },
  {
    id: 'det4',
    sentenceEs: 'Aún no es tarde pero así me estoy sintiendo.',
    sentenceHy: 'Դեռ ուշ չէ, բայց հենց այդպես եմ ինձ զգում։',
    highlighted: 'me estoy sintiendo',
    correctLabel: 'Presente progresivo',
    options: [
      { es: 'Presente progresivo', hy: 'Ներկա շարունակական ժամանակ' },
      { es: 'Futuro simple', hy: 'Պարզ ապառնի ժամանակ' },
      { es: 'Perífrasis haber de', hy: '«haber de» պերիֆրազ' },
      { es: 'Condicional simple', hy: 'Պարզ պայմանական եղանակ' },
    ],
    explanationHy: '«Estar + gerundio»՝ ներկա շարունակական ժամանակ։',
  },
  {
    id: 'det5',
    sentenceEs: 'Y no algo que no he de alcanzar.',
    sentenceHy: 'Եվ ոչ թե մի բան, որին չեմ կարող հասնել։',
    highlighted: 'he de alcanzar',
    correctLabel: 'Haber de + infinitivo',
    options: [
      { es: 'Me cuesta + infinitivo', hy: 'Դժվարության կառուցվածք' },
      { es: 'Haber de + infinitivo', hy: '«haber de + անորոշ դերբայ» պերիֆրազ' },
      { es: 'Para + infinitivo', hy: 'Նպատակի կառուցվածք' },
      { es: 'Dejar + infinitivo', hy: 'Թույլ տալու կառուցվածք' },
    ],
    explanationHy: 'Գրական «haber de + infinitivo» կառուցվածքն է։',
  },
  {
    id: 'det6',
    sentenceEs: 'Pero sé que moriría si me quedo en la mitad.',
    sentenceHy: 'Բայց գիտեմ, որ կմեռնեի, եթե կես ճանապարհին մնայի։',
    highlighted: 'si me quedo',
    correctLabel: 'Si + presente de indicativo',
    options: [
      { es: 'Si + presente de indicativo', hy: 'Պայմանական «si + ներկա»' },
      { es: 'Presente de subjuntivo', hy: 'Ներկա ստորադասական եղանակ' },
      { es: 'Futuro simple', hy: 'Պարզ ապառնի ժամանակ' },
      { es: 'Por eso', hy: 'Հետևանքի կապակցող բառ' },
    ],
    explanationHy: '«Si» շաղկապից հետո դրված է ներկա սահմանական՝ «me quedo»։',
  },
  {
    id: 'det7',
    sentenceEs: 'Para conocer el mundo de verdad.',
    sentenceHy: 'Իսկական աշխարհը ճանաչելու համար։',
    highlighted: 'Para conocer',
    correctLabel: 'Para + infinitivo (finalidad)',
    options: [
      { es: 'Por eso (consecuencia)', hy: 'Հետևանք (այդ պատճառով)' },
      { es: 'Para + infinitivo (finalidad)', hy: 'Նպատակ (...-ելու համար)' },
      { es: 'Dejar + infinitivo', hy: 'Թույլ տալ անել մի բան' },
      { es: 'Lo que + verbo', hy: '«Այն, ինչ» կառուցվածք' },
    ],
    explanationHy: '«Para + անորոշ դերբայ»՝ արտահայտում է նպատակ։',
  },
];

// Juego 7 — Verdadero o falso
export interface TrueFalseItem {
  id: string;
  statementEs: string;
  statementHy: string;
  isTrue: boolean;
  explanationHy: string;
}

export const TRUE_FALSE_ITEMS: TrueFalseItem[] = [
  {
    id: 'tf1',
    statementEs: 'La protagonista dice que ya sabe con total seguridad todo lo que quiere.',
    statementHy: 'Հերոսուհին ասում է, որ լիովին վստահ գիտի իր բոլոր ցանկությունները։',
    isTrue: false,
    explanationHy: 'Սխալ է. նա անկեղծորեն ասում է «Juraría que no sé bien lo que quiero»։',
  },
  {
    id: 'tf2',
    statementEs: 'Ella siente que quedarse «en la mitad» sería terrible para su vida.',
    statementHy: 'Նա զգում է, որ կես ճանապարհին մնալն իր համար սարսափելի կլիներ։',
    isTrue: true,
    explanationHy: 'Ճիշտ է. «Pero sé que moriría si me quedo en la mitad»։',
  },
  {
    id: 'tf3',
    statementEs: 'Los miedos que aparecen no la dejan pensar.',
    statementHy: 'Հայտնվող վախերը նրան չեն թողնում մտածել։',
    isTrue: true,
    explanationHy: 'Ճիշտ է. «Y aparecen tantos miedos que no me dejan pensar»։',
  },
  {
    id: 'tf4',
    statementEs: 'La protagonista ya perdió todos sus sueños sobre el amor.',
    statementHy: 'Հերոսուհին արդեն կորցրել է սիրո մասին իր բոլոր երազանքները։',
    isTrue: false,
    explanationHy: 'Սխալ է. նա երգում է «Y tengo sueños de amores nuevos»։',
  },
  {
    id: 'tf5',
    statementEs: 'En el coro, cambia el dolor por libertad y las heridas por un sueño.',
    statementHy: 'Կրկներգում նա ցավը փոխանակում է ազատության, իսկ վերքերը՝ երազանքի հետ։',
    isTrue: true,
    explanationHy: 'Ճիշտ է. «Cambio dolor por libertad / Cambio heridas por un sueño»։',
  },
  {
    id: 'tf6',
    statementEs: 'Para ella es muy fácil imaginar exactamente qué pasará en el futuro.',
    statementHy: 'Նրա համար շատ հեշտ է պատկերացնել, թե ինչ է լինելու ապագայում։',
    isTrue: false,
    explanationHy: 'Սխալ է. «Y me cuesta imaginar lo que vendrá»՝ նրա համար դժվար է պատկերացնել։',
  },
  {
    id: 'tf7',
    statementEs: 'La canción afirma que «aún no es tarde».',
    statementHy: 'Երգը պնդում է, որ «դեռ ուշ չէ»։',
    isTrue: true,
    explanationHy: 'Ճիշտ է. «Aún no es tarde pero así me estoy sintiendo»։',
  },
  {
    id: 'tf8',
    statementEs: 'Ella desea que la suerte sea algo imposible de alcanzar.',
    statementHy: 'Նա ցանկանում է, որ բախտը լինի անհասանելի մի բան։',
    isTrue: false,
    explanationHy: 'Սխալ է. նա մաղթում է հակառակը՝ «Que la suerte sea suerte y no algo que no he de alcanzar»։',
  },
];

// Juego 8 — Corrige el error
export interface CorrectErrorItem {
  id: string;
  wrongEs: string;
  hy: string;
  options: { es: string; hy: string; isCorrect: boolean }[];
  explanationHy: string;
}

export const CORRECT_ERROR_ITEMS: CorrectErrorItem[] = [
  {
    id: 'err1',
    wrongEs: 'Cambio dolor para libertad.',
    hy: 'Ցավը փոխանակում եմ ազատության հետ։',
    options: [
      { es: 'Cambio dolor por libertad.', hy: 'Ցավը փոխանակում եմ ազատության հետ (ճիշտ նախդիր՝ por)', isCorrect: true },
      { es: 'Cambio dolor de libertad.', hy: 'Սխալ նախդիր՝ de', isCorrect: false },
      { es: 'Cambio dolor a libertad.', hy: 'Սխալ նախդիր՝ a', isCorrect: false },
    ],
    explanationHy: 'Փոխանակման համար օգտագործվում է «por», ոչ թե «para»։',
  },
  {
    id: 'err2',
    wrongEs: 'Así me estoy sentiendo hoy.',
    hy: 'Այսօր ինձ հենց այդպես եմ զգում։',
    options: [
      { es: 'Así me estoy sentando hoy.', hy: 'Այսօր այսպես նստում եմ (sentar բայից)', isCorrect: false },
      { es: 'Así me estoy sintiendo hoy.', hy: 'Այսօր ինձ հենց այդպես եմ զգում (ճիշտ՝ sintiendo)', isCorrect: true },
      { es: 'Así estoy me sintiendo hoy.', hy: 'Դերանվան սխալ դիրք', isCorrect: false },
    ],
    explanationHy: '«Sentir» բայի գերունդիումը անկանոն է՝ «sintiendo»։',
  },
  {
    id: 'err3',
    wrongEs: 'Me cuestan imaginar lo que vendrá.',
    hy: 'Ինձ համար դժվար է պատկերացնել, թե ինչ է գալու։',
    options: [
      { es: 'Me costo imaginar lo que vendrá.', hy: 'Սխալ դեմք՝ costo', isCorrect: false },
      { es: 'Me cuesta imaginando lo que vendrá.', hy: 'Սխալ դերբայ՝ imaginando', isCorrect: false },
      { es: 'Me cuesta imaginar lo que vendrá.', hy: 'Ինձ համար դժվար է պատկերացնել՝ ինչ է գալու (ճիշտ)', isCorrect: true },
    ],
    explanationHy: 'Անորոշ դերբայից առաջ (imaginar) «costar»-ը միշտ եզակի է՝ «me cuesta»։',
  },
  {
    id: 'err4',
    wrongEs: 'Que la suerte es suerte.',
    hy: 'Թող որ բախտը բախտ լինի։',
    options: [
      { es: 'Que la suerte sea suerte.', hy: 'Թող որ բախտը բախտ լինի (ճիշտ սուբյունկտիվ՝ sea)', isCorrect: true },
      { es: 'Que la suerte será suerte.', hy: 'Սխալ՝ ապառնի será', isCorrect: false },
      { es: 'Que la suerte eras suerte.', hy: 'Սխալ անցյալ ձև՝ eras', isCorrect: false },
    ],
    explanationHy: '«Que + մաղթանք» կառուցվածքում պարտադիր է Presente de subjuntivo՝ «sea»։',
  },
  {
    id: 'err5',
    wrongEs: 'No sabo bien lo que quiero.',
    hy: 'Լավ չգիտեմ՝ ինչ եմ ուզում։',
    options: [
      { es: 'No sabe bien lo que quiero.', hy: 'Նա լավ չգիտի՝ ինչ եմ ուզում (3-րդ դեմք)', isCorrect: false },
      { es: 'No sé bien lo que quiero.', hy: 'Ես լավ չգիտեմ՝ ինչ եմ ուզում (ճիշտ՝ sé)', isCorrect: true },
      { es: 'No sepo bien lo que quiero.', hy: 'Գոյություն չունեցող ձև', isCorrect: false },
    ],
    explanationHy: '«Saber» բայի 1-ին դեմքի եզակին ներկայում անկանոն է՝ «sé»։',
  },
  {
    id: 'err6',
    wrongEs: 'Por eso volo a otros senderos.',
    hy: 'Այդ պատճառով թռչում եմ դեպի այլ ուղիներ։',
    options: [
      { es: 'Por eso volé a otros senderos.', hy: 'Այդ պատճառով թռա (անցյալ)', isCorrect: false },
      { es: 'Por eso vuelas a otros senderos.', hy: 'Դու թռչում ես (2-րդ դեմք)', isCorrect: false },
      { es: 'Por eso vuelo a otros senderos.', hy: 'Այդ պատճառով թռչում եմ դեպի այլ ուղիներ (ճիշտ)', isCorrect: true },
    ],
    explanationHy: '«Volar» բայը ներկայում ունի o → ue փոփոխություն՝ «yo vuelo»։',
  },
  {
    id: 'err7',
    wrongEs: 'Y me cuesta imaginar lo que venirá.',
    hy: 'Եվ ինձ համար դժվար է պատկերացնել, թե ինչ է գալու։',
    options: [
      { es: 'Y me cuesta imaginar lo que vendrá.', hy: 'Ինձ համար դժվար է պատկերացնել՝ ինչ է գալու (ճիշտ)', isCorrect: true },
      { es: 'Y me cuesta imaginar lo que venderá.', hy: 'Ինչ կվաճառի (vender բայից)', isCorrect: false },
      { es: 'Y me cuesta imaginar lo que venga.', hy: 'Սխալ եղանակ այս դեպքում', isCorrect: false },
    ],
    explanationHy: '«Venir» բայի ապառնին անկանոն է՝ «vendrá» (ոչ «venirá»)։',
  },
];

// Juego 9 — Desafío de 60 segundos
export interface SpeedQuestion {
  id: string;
  prompt: string;
  promptHy: string;
  options: string[];
  correct: string;
}

export const SPEED_QUESTIONS: SpeedQuestion[] = [
  { id: 'sp1', prompt: 'libertad =', promptHy: 'Ընտրիր «libertad» բառի թարգմանությունը', options: ['ազատություն', 'ցավ', 'վախ', 'բախտ'], correct: 'ազատություն' },
  { id: 'sp2', prompt: 'heridas =', promptHy: 'Ընտրիր «heridas» բառի թարգմանությունը', options: ['երազներ', 'վերքեր', 'ուղիներ', 'սերեր'], correct: 'վերքեր' },
  { id: 'sp3', prompt: 'vendrá = futuro de...', promptHy: 'Ո՞ր բայի ապառնին է «vendrá»-ն', options: ['venir', 'vender', 'ver', 'vivir'], correct: 'venir' },
  { id: 'sp4', prompt: 'miedo =', promptHy: 'Ընտրիր «miedo» բառի թարգմանությունը', options: ['հույս', 'ուրախություն', 'վախ', 'ուշ'], correct: 'վախ' },
  { id: 'sp5', prompt: 'Cambio dolor ___ libertad', promptHy: 'Ցավը փոխանակում եմ ազատության հետ', options: ['por', 'para', 'de', 'sin'], correct: 'por' },
  { id: 'sp6', prompt: 'aún no =', promptHy: 'Ի՞նչ է նշանակում «aún no»', options: ['դեռ ոչ', 'արդեն', 'երբեք', 'միշտ'], correct: 'դեռ ոչ' },
  { id: 'sp7', prompt: 'suerte =', promptHy: 'Ընտրիր «suerte» բառի թարգմանությունը', options: ['աշխարհ', 'բախտ', 'կես', 'ցավ'], correct: 'բախտ' },
  { id: 'sp8', prompt: 'juraría = tiempo...', promptHy: 'Ո՞ր ժամանակն է «juraría»-ն', options: ['Condicional', 'Presente', 'Futuro', 'Gerundio'], correct: 'Condicional' },
  { id: 'sp9', prompt: 'senderos =', promptHy: 'Ընտրիր «senderos» բառի թարգմանությունը', options: ['ուղիներ', 'վախեր', 'տարիներ', 'բառեր'], correct: 'ուղիներ' },
  { id: 'sp10', prompt: 'alcanzar =', promptHy: 'Ընտրիր «alcanzar» բայի թարգմանությունը', options: ['մոռանալ', 'հասնել', 'կանգնել', 'թռչել'], correct: 'հասնել' },
  { id: 'sp11', prompt: 'Que la suerte ___ suerte', promptHy: 'Թող որ բախտը բախտ լինի', options: ['sea', 'es', 'fue', 'son'], correct: 'sea' },
  { id: 'sp12', prompt: 'por eso =', promptHy: 'Ի՞նչ է նշանակում «por eso»', options: ['այդ պատճառով', 'որովհետև', 'թեև', 'բայց'], correct: 'այդ պատճառով' },
  { id: 'sp13', prompt: 'de verdad =', promptHy: 'Ի՞նչ է նշանակում «de verdad»', options: ['իսկապես', 'արագ', 'ուշ', 'հետո'], correct: 'իսկապես' },
  { id: 'sp14', prompt: 'me cuesta =', promptHy: 'Ի՞նչ է նշանակում «me cuesta»', options: ['ինձ համար դժվար է', 'ինձ դուր է գալիս', 'ես գիտեմ', 'ես մնում եմ'], correct: 'ինձ համար դժվար է' },
  { id: 'sp15', prompt: 'felicidad =', promptHy: 'Ընտրիր «felicidad» բառի թարգմանությունը', options: ['երջանկություն', 'վերք', 'միտք', 'քուն'], correct: 'երջանկություն' },
  { id: 'sp16', prompt: 'gerundio de sentir =', promptHy: '«Sentir» բայի գերունդիումը', options: ['sintiendo', 'sentiendo', 'sentado', 'siento'], correct: 'sintiendo' },
  { id: 'sp17', prompt: 'sueño =', promptHy: 'Ընտրիր «sueño» բառի թարգմանությունը', options: ['երազանք', 'վախ', 'ցավ', 'ճանապարհ'], correct: 'երազանք' },
  { id: 'sp18', prompt: 'Que me ___ a continuar', promptHy: 'Որն ինձ կօգնի շարունակել', options: ['ayude', 'ayuda', 'ayudó', 'ayudaba'], correct: 'ayude' },
];

// Juego 10 — El camino de los sueños (8 progressive stops)
export interface JourneyStage {
  id: string;
  stageNumber: number;
  titleEs: string;
  titleHy: string;
  category: 'Vocabulario' | 'Gramática' | 'Comprensión' | 'Escucha';
  lineId?: string;
  questionEs: string;
  questionHy: string;
  options: { es: string; hy?: string; isCorrect: boolean }[];
  rewardHy: string;
  explanationHy: string;
}

export const JOURNEY_STAGES: JourneyStage[] = [
  {
    id: 'j1',
    stageNumber: 1,
    titleEs: 'Paso 1: Dejar la duda',
    titleHy: 'Քայլ 1. Հաղթահարել կասկածը',
    category: 'Comprensión',
    questionEs: '¿Qué sabe la protagonista con certeza aunque dude de lo que quiere?',
    questionHy: 'Ի՞նչ գիտի հերոսուհին հաստատ, թեև կասկածում է՝ ինչ է ուզում։',
    options: [
      { es: 'Que moriría si se queda en la mitad', hy: 'Որ կմեռներ, եթե կես ճանապարհին մնար', isCorrect: true },
      { es: 'Que nunca viajará', hy: 'Որ երբեք չի ճամփորդի', isCorrect: false },
      { es: 'Que el dolor no cambia', hy: 'Որ ցավը չի փոխվում', isCorrect: false },
    ],
    rewardHy: 'Կողմնացույցը միացավ. դու սկսեցիր քո ճանապարհը։',
    explanationHy: 'Երգի երկրորդ տողում հստակ ասվում է՝ «Pero sé que moriría si me quedo en la mitad»։',
  },
  {
    id: 'j2',
    stageNumber: 2,
    titleEs: 'Paso 2: Abrir las alas',
    titleHy: 'Քայլ 2. Բացել թևերը',
    category: 'Vocabulario',
    questionEs: '¿Qué significa «Por eso vuelo a otros senderos»?',
    questionHy: 'Ի՞նչ է նշանակում «Por eso vuelo a otros senderos»։',
    options: [
      { es: 'Այդ պատճառով մնում եմ նույն տեղում', isCorrect: false },
      { es: 'Այդ պատճառով թռչում եմ դեպի այլ ուղիներ', isCorrect: true },
      { es: 'Այդ պատճառով փակում եմ աչքերս', isCorrect: false },
    ],
    rewardHy: 'Առաջին արահետը բացված է։',
    explanationHy: '«Vuelo» = թռչում եմ, «otros senderos» = այլ ուղիներ։',
  },
  {
    id: 'j3',
    stageNumber: 3,
    titleEs: 'Paso 3: Conocer el mundo',
    titleHy: 'Քայլ 3. Ճանաչել աշխարհը',
    category: 'Gramática',
    questionEs: 'Completa el propósito: «Vuelo a otros senderos ______ conocer el mundo de verdad».',
    questionHy: 'Լրացրու նպատակ արտահայտող բառը («Իսկական աշխարհը ճանաչելու համար»)։',
    options: [
      { es: 'por', hy: 'պատճառով / փոխարեն', isCorrect: false },
      { es: 'de', hy: 'ից / մասին', isCorrect: false },
      { es: 'para', hy: 'համար (նպատակ)', isCorrect: true },
    ],
    rewardHy: 'Հորիզոնը լայնանում է։',
    explanationHy: 'Նպատակը միշտ արտահայտվում է «para + infinitivo»-ով։',
  },
  {
    id: 'j4',
    stageNumber: 4,
    titleEs: 'Paso 4: Cruzar el bosque de los miedos',
    titleHy: 'Քայլ 4. Անցնել վախերի անտառով',
    category: 'Gramática',
    questionEs: '¿Cuál es la forma correcta del presente progresivo en el Verso 1?',
    questionHy: 'Ո՞րն է ներկա շարունակականի ճիշտ ձևը 1-ին տան մեջ։',
    options: [
      { es: 'me estoy sintiendo', hy: 'ինձ զգում եմ հենց հիմա (ճիշտ)', isCorrect: true },
      { es: 'me estoy sentiendo', hy: 'սխալ գրություն (e→i բացակայում է)', isCorrect: false },
      { es: 'estoy sentirme', hy: 'սխալ կառուցվածք', isCorrect: false },
    ],
    rewardHy: 'Դու անցար վախերի անտառի միջով։',
    explanationHy: '«Sentir» → gerundio «sintiendo» → «me estoy sintiendo»։',
  },
  {
    id: 'j5',
    stageNumber: 5,
    titleEs: 'Paso 5: Escuchar la señal',
    titleHy: 'Քայլ 5. Լսել երգի ազդանշանը',
    category: 'Escucha',
    lineId: 'verso1_v8',
    questionEs: 'Escucha el final del Verso 1. ¿Qué verbo en futuro cierra el verso?',
    questionHy: 'Լսիր 1-ին տան ավարտը. ապառնի ժամանակի ո՞ր բայն է փակում տողը։',
    options: [
      { es: 'será', hy: 'կլինի', isCorrect: false },
      { es: 'vendrá', hy: 'կգա, գալու է', isCorrect: true },
      { es: 'dirá', hy: 'կասի', isCorrect: false },
    ],
    rewardHy: 'Քո լսողությունը սրվել է։',
    explanationHy: 'Տունն ավարտվում է «Y me cuesta imaginar lo que vendrá» տողով։',
  },
  {
    id: 'j6',
    stageNumber: 6,
    titleEs: 'Paso 6: El intercambio valiente',
    titleHy: 'Քայլ 6. Համարձակ փոխանակում',
    category: 'Vocabulario',
    questionEs: 'En el coro, ¿qué cambia la protagonista por «un sueño»?',
    questionHy: 'Կրկներգում ի՞նչն է հերոսուհին փոխանակում երազանքի հետ։',
    options: [
      { es: 'senderos', hy: 'ուղիներ', isCorrect: false },
      { es: 'amores', hy: 'սերեր', isCorrect: false },
      { es: 'heridas', hy: 'վերքեր', isCorrect: true },
    ],
    rewardHy: 'Հին վերքերը մնացին անցյալում։',
    explanationHy: '«Cambio heridas por un sueño»՝ վերքերը փոխանակում եմ մի երազանքի հետ։',
  },
  {
    id: 'j7',
    stageNumber: 7,
    titleEs: 'Paso 7: La llave del subjuntivo',
    titleHy: 'Քայլ 7. Սուբյունկտիվի բանալին',
    category: 'Gramática',
    questionEs: 'Elige la frase correcta del deseo en el coro:',
    questionHy: 'Ընտրիր կրկներգի մաղթանքի ճիշտ տարբերակը։',
    options: [
      { es: 'Que la suerte sea suerte', hy: 'Թող որ բախտը բախտ լինի (սուբյունկտիվ)', isCorrect: true },
      { es: 'Que la suerte es suerte', hy: 'Որ բախտը բախտ է (ներկա սահմանական)', isCorrect: false },
      { es: 'Que la suerte fue suerte', hy: 'Որ բախտը բախտ եղավ (անցյալ)', isCorrect: false },
    ],
    rewardHy: 'Դու գտար ազատության բանալին։',
    explanationHy: 'Մաղթանքն արտահայտվում է սուբյունկտիվով՝ «Que la suerte sea suerte»։',
  },
  {
    id: 'j8',
    stageNumber: 8,
    titleEs: 'Paso 8: La cima de los sueños',
    titleHy: 'Քայլ 8. Երազանքների գագաթը',
    category: 'Comprensión',
    lineId: 'coro1_c6',
    questionEs: '¿Qué significa la última línea del coro «Y no algo que no he de alcanzar»?',
    questionHy: 'Ի՞նչ է նշանակում կրկներգի վերջին տողը։',
    options: [
      { es: 'Եվ ոչ թե մի բան, որը չեմ ուզում տեսնել', isCorrect: false },
      { es: 'Եվ ոչ թե մի բան, որին չեմ կարող հասնել', isCorrect: true },
      { es: 'Եվ մի բան, որն արդեն կորցրել եմ', isCorrect: false },
    ],
    rewardHy: 'Շնորհավորում ենք. դու հասար քո երազանքի գագաթին։',
    explanationHy: '«Alcanzar» = հասնել, «he de alcanzar» = հասնելու եմ / կարող եմ հասնել։',
  },
];

// Escucha — 12 structured listening exercises covering all 6 required modes
export const LISTENING_EXERCISES: ListeningExercise[] = [
  {
    id: 'esc_1',
    type: 'word',
    typeLabelEs: 'Reconoce la palabra',
    typeLabelHy: 'Ճանաչիր լսած բառը',
    lineId: 'verso1_v1',
    instructionEs: 'Escucha el fragmento y elige la primera palabra que canta Natalia.',
    instructionHy: 'Լսիր հատվածը և ընտրիր առաջին բառը, որը երգում է Նատալիան։',
    options: ['Juraría', 'Querría', 'Sabría', 'Moriría'],
    correctOption: 'Juraría',
    explanationHy: 'Առաջին տողը սկսվում է «Juraría que no sé bien lo que quiero» բառով։',
  },
  {
    id: 'esc_2',
    type: 'word',
    typeLabelEs: 'Reconoce la palabra',
    typeLabelHy: 'Ճանաչիր լսած բառը',
    lineId: 'verso1_v3',
    instructionEs: 'Escucha y reconoce el sustantivo plural al final de la línea.',
    instructionHy: 'Լսիր և ճանաչիր տողի վերջում հնչող հոգնակի գոյականը։',
    options: ['caminos', 'senderos', 'destinos', 'sueños'],
    correctOption: 'senderos',
    explanationHy: '«Por eso vuelo a otros senderos»՝ վերջին բառը «senderos» է։',
  },
  {
    id: 'esc_3',
    type: 'restore',
    typeLabelEs: 'Restaura la línea',
    typeLabelHy: 'Վերականգնիր տողը',
    lineId: 'verso1_v2',
    instructionEs: 'Escucha el fragmento y completa la parte que falta.',
    instructionHy: 'Լսիր հատվածը և լրացրու բաց թողնված մասը։',
    promptEs: 'Pero sé que moriría si ______ en la mitad',
    options: ['me quedo', 'me siento', 'me vuelo', 'me voy'],
    correctOption: 'me quedo',
    explanationHy: 'Բնօրինակ տողն է՝ «Pero sé que moriría si me quedo en la mitad»։',
  },
  {
    id: 'esc_4',
    type: 'restore',
    typeLabelEs: 'Restaura la línea',
    typeLabelHy: 'Վերականգնիր տողը',
    lineId: 'coro1_c2',
    instructionEs: 'Escucha el coro y completa el intercambio exacto.',
    instructionHy: 'Լսիր կրկներգը և լրացրու ճիշտ բառը։',
    promptEs: 'Cambio ______ por un sueño',
    options: ['miedos', 'heridas', 'días', 'noches'],
    correctOption: 'heridas',
    explanationHy: 'Կրկներգում հնչում է՝ «Cambio heridas por un sueño»։',
  },
  {
    id: 'esc_5',
    type: 'translation',
    typeLabelEs: 'Elige la traducción',
    typeLabelHy: 'Ընտրիր ճիշտ թարգմանությունը',
    lineId: 'verso1_v5',
    instructionEs: 'Escucha la línea y selecciona su traducción fiel al armenio.',
    instructionHy: 'Լսիր տողը և ընտրիր ճիշտ հայերեն թարգմանությունը։',
    options: [
      'Դեռ ուշ չէ, բայց հենց այդպես եմ ինձ զգում',
      'Արդեն ուշ է, և ես հոգնել եմ սպասելուց',
      'Ես վախենում եմ, որ շուտով ուշ կլինի',
      'Այսպես եմ զգում, որովհետև չեմ ուզում փոխվել',
    ],
    correctOption: 'Դեռ ուշ չէ, բայց հենց այդպես եմ ինձ զգում',
    explanationHy: '«Aún no es tarde pero así me estoy sintiendo»։',
  },
  {
    id: 'esc_6',
    type: 'translation',
    typeLabelEs: 'Elige la traducción',
    typeLabelHy: 'Ընտրիր ճիշտ թարգմանությունը',
    lineId: 'coro1_c1',
    instructionEs: 'Escucha el inicio del coro y elige el significado correcto.',
    instructionHy: 'Լսիր կրկներգի սկիզբը և ընտրիր ճիշտ իմաստը։',
    options: [
      'Ազատությունը փոխանակում եմ ցավի հետ',
      'Ցավը փոխանակում եմ ազատության հետ',
      'Ցավն ու ազատությունը նույնն են',
      'Փնտրում եմ ցավից ազատվելու ճանապարհ',
    ],
    correctOption: 'Ցավը փոխանակում եմ ազատության հետ',
    explanationHy: '«Cambio dolor por libertad»։',
  },
  {
    id: 'esc_7',
    type: 'tense',
    typeLabelEs: 'Identifica el tiempo verbal',
    typeLabelHy: 'Որոշիր բայի ժամանակը',
    lineId: 'verso1_v8',
    instructionEs: 'Escucha «Y me cuesta imaginar lo que vendrá». ¿Qué tiempo verbal es «vendrá»?',
    instructionHy: 'Լսիր տողը և որոշիր «vendrá» բայի ժամանակը։',
    options: ['Presente de indicativo', 'Futuro simple', 'Condicional simple', 'Presente progresivo'],
    correctOption: 'Futuro simple',
    explanationHy: '«Vendrá»-ն «venir» բայի պարզ ապառնի ժամանակն է (Futuro simple)։',
  },
  {
    id: 'esc_8',
    type: 'tense',
    typeLabelEs: 'Identifica el tiempo verbal',
    typeLabelHy: 'Որոշիր բայի ժամանակը',
    lineId: 'coro1_c5',
    instructionEs: 'Escucha «Que la suerte sea suerte». ¿Qué modo y tiempo es «sea»?',
    instructionHy: 'Լսիր տողը և որոշիր «sea» բայի եղանակն ու ժամանակը։',
    options: ['Presente de subjuntivo', 'Futuro simple', 'Condicional simple', 'Pretérito perfecto'],
    correctOption: 'Presente de subjuntivo',
    explanationHy: '«Sea»-ն «ser» բայի Presente de subjuntivo ձևն է։',
  },
  {
    id: 'esc_9',
    type: 'order',
    typeLabelEs: 'Construye la frase oída',
    typeLabelHy: 'Կառուցիր լսած նախադասությունը',
    lineId: 'verso1_v4',
    instructionEs: 'Escucha la línea y ordena las palabras exactamente como suenan.',
    instructionHy: 'Լսիր տողը և դասավորիր բառերը ճիշտ հերթականությամբ։',
    orderedTokens: ['Para', 'conocer', 'el', 'mundo', 'de', 'verdad'],
    explanationHy: 'Ճիշտ հերթականությունը՝ «Para conocer el mundo de verdad»։',
  },
  {
    id: 'esc_10',
    type: 'order',
    typeLabelEs: 'Construye la frase oída',
    typeLabelHy: 'Կառուցիր լսած նախադասությունը',
    lineId: 'coro1_c3',
    instructionEs: 'Escucha la tercera línea del coro y ordénala.',
    instructionHy: 'Լսիր կրկներգի երրորդ տողը և հավաքիր այն։',
    orderedTokens: ['Que', 'me', 'ayude', 'a', 'continuar'],
    explanationHy: 'Ճիշտ հերթականությունը՝ «Que me ayude a continuar»։',
  },
  {
    id: 'esc_11',
    type: 'difference',
    typeLabelEs: 'Encuentra la diferencia',
    typeLabelHy: 'Գտիր տարբերությունը երկու նման արտահայտությունների միջև',
    lineId: 'verso1_v6',
    instructionEs: 'Escucha y elige cuál de las dos frases parecidas aparece realmente en la canción.',
    instructionHy: 'Լսիր և ընտրիր՝ երկու նման նախադասություններից որն է իրականում հնչում երգում։',
    diffPair: [
      'Y aparecen tantos miedos que no me dejan pensar',
      'Y aparecen tantos miedos que no me dejan soñar',
    ],
    correctOption: 'Y aparecen tantos miedos que no me dejan pensar',
    explanationHy: 'Տարբերությունը վերջին բայում է՝ «pensar» (մտածել), ոչ թե «soñar» (երազել)։',
  },
  {
    id: 'esc_12',
    type: 'difference',
    typeLabelEs: 'Encuentra la diferencia',
    typeLabelHy: 'Գտիր տարբերությունը երկու նման արտահայտությունների միջև',
    lineId: 'coro1_c6',
    instructionEs: 'Compara las dos opciones casi iguales y elige la original de la canción.',
    instructionHy: 'Համեմատիր գրեթե նույն երկու տարբերակները և ընտրիր երգի բնօրինակը։',
    diffPair: [
      'Y no algo que no he de alcanzar',
      'Y no algo que no voy a olvidar',
    ],
    correctOption: 'Y no algo que no he de alcanzar',
    explanationHy: 'Երգում հնչում է «he de alcanzar» (որին չեմ կարող հասնել), ոչ թե «voy a olvidar»։',
  },
];

// Micro-questions for Aprende cantando (keyed by line key: v1..v8, c1..c6)
export interface SingMiniQuestion {
  promptEs: string;
  promptHy: string;
  options: { es: string; hy?: string }[];
  correctIndex: number;
  explanationHy: string;
}

export const SING_MINI_QUESTIONS: Record<string, SingMiniQuestion> = {
  v1: {
    promptEs: '¿Qué significa «lo que quiero» en esta línea?',
    promptHy: 'Ի՞նչ է նշանակում «lo que quiero» արտահայտությունը այս տողում։',
    options: [
      { es: 'այն, ինչ ուզում եմ' },
      { es: 'այն, ինչ ունեմ' },
      { es: 'այն, ինչ գիտեմ' },
    ],
    correctIndex: 0,
    explanationHy: '«Querer» = ուզել, «lo que quiero» = այն, ինչ ուզում եմ։',
  },
  v2: {
    promptEs: '¿Qué expresa «moriría»?',
    promptHy: 'Ի՞նչ է արտահայտում «moriría» ձևը։',
    options: [
      { es: 'Futuro seguro', hy: 'Հաստատ ապառնի' },
      { es: 'Condicional simple', hy: 'Պարզ պայմանական (կմեռնեի)' },
      { es: 'Pasado reciente', hy: 'Մոտ անցյալ' },
    ],
    correctIndex: 1,
    explanationHy: '«Moriría»-ն պայմանական եղանակ է (Condicional simple)։',
  },
  v3: {
    promptEs: '¿Cuál es el infinitivo de «vuelo»?',
    promptHy: 'Ո՞րն է «vuelo» ձևի անորոշ դերբայը։',
    options: [
      { es: 'volver', hy: 'վերադառնալ' },
      { es: 'valer', hy: 'արժենալ' },
      { es: 'volar', hy: 'թռչել' },
    ],
    correctIndex: 2,
    explanationHy: '«Volar» (թռչել) → o → ue փոփոխությամբ «yo vuelo»։',
  },
  v4: {
    promptEs: '¿Qué función tiene «para» antes de «conocer»?',
    promptHy: 'Ի՞նչ գործառույթ ունի «para»-ն «conocer»-ից առաջ։',
    options: [
      { es: 'Expresar finalidad', hy: 'Արտահայտել նպատակ' },
      { es: 'Expresar causa', hy: 'Արտահայտել պատճառ' },
      { es: 'Expresar tiempo', hy: 'Արտահայտել ժամանակ' },
    ],
    correctIndex: 0,
    explanationHy: '«Para + infinitivo» արտահայտում է նպատակ («ճանաչելու համար»)։',
  },
  v5: {
    promptEs: '¿Cuál es el sinónimo de «aún no»?',
    promptHy: 'Ո՞րն է «aún no» արտահայտության հոմանիշը։',
    options: [
      { es: 'ya no', hy: 'այլևս ոչ' },
      { es: 'todavía no', hy: 'դեռ ոչ' },
      { es: 'siempre no', hy: 'սխալ արտահայտություն' },
    ],
    correctIndex: 1,
    explanationHy: '«Aún no» = «todavía no» (դեռ ոչ)։',
  },
  v6: {
    promptEs: '¿Qué impiden los miedos en esta línea?',
    promptHy: 'Ինչի՞ն են խանգարում վախերը այս տողում։',
    options: [
      { es: 'cantar', hy: 'երգել' },
      { es: 'caminar', hy: 'քայլել' },
      { es: 'pensar', hy: 'մտածել' },
    ],
    correctIndex: 2,
    explanationHy: '«Que no me dejan pensar»՝ ինձ չեն թողնում մտածել։',
  },
  v7: {
    promptEs: '¿Qué significa «sueños» en este contexto?',
    promptHy: 'Ի՞նչ է նշանակում «sueños» բառը այս համատեքստում։',
    options: [
      { es: 'երազանքներ' },
      { es: 'վախեր' },
      { es: 'ուղիներ' },
    ],
    correctIndex: 0,
    explanationHy: '«Tengo sueños de amores nuevos»՝ ունեմ նոր սերերի մասին երազանքներ։',
  },
  v8: {
    promptEs: '¿De qué verbo viene «vendrá»?',
    promptHy: 'Ո՞ր բայից է առաջացել «vendrá»-ն։',
    options: [
      { es: 'vender', hy: 'վաճառել' },
      { es: 'venir', hy: 'գալ' },
      { es: 'ver', hy: 'տեսնել' },
    ],
    correctIndex: 1,
    explanationHy: '«Venir» բայի անկանոն ապառնին է «vendrá»։',
  },
  c1: {
    promptEs: '¿Qué preposición usamos para intercambiar algo?',
    promptHy: 'Ո՞ր նախդիրն ենք օգտագործում փոխանակման համար։',
    options: [
      { es: 'para', hy: 'համար' },
      { es: 'en', hy: 'մեջ' },
      { es: 'por', hy: 'փոխարեն / հետ' },
    ],
    correctIndex: 2,
    explanationHy: 'Փոխանակման կառուցվածքն է «cambiar algo por algo»։',
  },
  c2: {
    promptEs: '¿Qué palabra significa «վերքեր»?',
    promptHy: 'Ո՞ր բառն է նշանակում «վերքեր»։',
    options: [
      { es: 'heridas', hy: 'վերքեր' },
      { es: 'suerte', hy: 'բախտ' },
      { es: 'senderos', hy: 'ուղիներ' },
    ],
    correctIndex: 0,
    explanationHy: '«Heridas»՝ վերքեր (այստեղ՝ հոգեկան վերքեր)։',
  },
  c3: {
    promptEs: '¿Por qué dice «ayude» y no «ayuda»?',
    promptHy: 'Ինչո՞ւ է ասում «ayude» և ոչ «ayuda»։',
    options: [
      { es: 'Es pasado', hy: 'Անցյալ ժամանակ է' },
      { es: 'Es subjuntivo (un sueño buscado)', hy: 'Սուբյունկտիվ է (փնտրվող երազանք)' },
      { es: 'Es imperativo', hy: 'Հրամայական է' },
    ],
    correctIndex: 1,
    explanationHy: 'Քանի որ երազանքը դեռ ցանկալի ու փնտրվող է, օգտագործվում է սուբյունկտիվ՝ «ayude»։',
  },
  c4: {
    promptEs: '¿Qué par de palabras opuestas aparecen aquí?',
    promptHy: 'Հակադիր բառերի ո՞ր զույգն է հանդիպում այստեղ։',
    options: [
      { es: 'miedo / sueño', hy: 'վախ / երազանք' },
      { es: 'mundo / mitad', hy: 'աշխարհ / կես' },
      { es: 'dolor / felicidad', hy: 'ցավ / երջանկություն' },
    ],
    correctIndex: 2,
    explanationHy: '«Dolor» (ցավ) և «felicidad» (երջանկություն)։',
  },
  c5: {
    promptEs: '¿Qué expresa «Que la suerte sea suerte»?',
    promptHy: 'Ի՞նչ է արտահայտում «Que la suerte sea suerte» տողը։',
    options: [
      { es: 'Un deseo', hy: 'Մաղթանք (Թող որ...)' },
      { es: 'Una pregunta', hy: 'Հարց' },
      { es: 'Una orden negativa', hy: 'Ժխտական հրաման' },
    ],
    correctIndex: 0,
    explanationHy: '«Que + subjuntivo»-ն արտահայտում է անկեղծ մաղթանք։',
  },
  c6: {
    promptEs: '¿Qué significa «alcanzar»?',
    promptHy: 'Ի՞նչ է նշանակում «alcanzar» բայը։',
    options: [
      { es: 'կորցնել' },
      { es: 'հասնել' },
      { es: 'մոռանալ' },
    ],
    correctIndex: 1,
    explanationHy: '«Alcanzar» = հասնել, նվաճել։',
  },
};
