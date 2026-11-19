import { LyricLine, SectionKey } from './types';

export const YOUTUBE_VIDEO_ID = 'G6OYDUomYwI';
export const YOUTUBE_URL = 'https://www.youtube.com/watch?v=G6OYDUomYwI';

interface BaseLineSpec {
  key: string;
  es: string;
  hy: string;
  meaningEs: string;
  meaningHy: string;
  words: { word: string; hy: string; noteHy: string }[];
  grammarEs: string;
  grammarHy: string;
  grammarTopicId: string;
}

const VERSE_LINES: BaseLineSpec[] = [
  {
    key: 'v1',
    es: 'Juraría que no sé bien lo que quiero',
    hy: 'Կերդվեի, որ ինքս էլ լավ չգիտեմ՝ ինչ եմ ուզում',
    meaningEs: 'Confiesa con honestidad que todavía está buscando su camino y no tiene todas las respuestas.',
    meaningHy: 'Հերոսուհին անկեղծորեն խոստովանում է, որ դեռ փնտրում է իր ճանապարհը և հստակ չի պատկերացնում իր բոլոր ցանկությունները։',
    words: [
      { word: 'jurar', hy: 'երդվել', noteHy: '«Juraría»-ն պայմանական եղանակն է՝ մեղմացված համոզմունք արտահայտելու համար («կերդվեի, ինձ թվում է»):' },
      { word: 'saber', hy: 'իմանալ, գիտենալ', noteHy: '«No sé bien»՝ «լավ չգիտեմ, վստահ չեմ»։' },
      { word: 'lo que', hy: 'այն, ինչ', noteHy: 'Չեզոք հարաբերական արտահայտություն՝ անորոշ գաղափարը մատնանշելու համար։' },
    ],
    grammarEs: 'Condicional simple (juraría) + Presente de indicativo (sé, quiero) + Lo que + verbo.',
    grammarHy: 'Օգտագործված են պայմանական եղանակը (juraría), ներկա սահմանականը (sé, quiero) և «lo que + բայ» կառուցվածքը։',
    grammarTopicId: 'condicional',
  },
  {
    key: 'v2',
    es: 'Pero sé que moriría si me quedo en la mitad',
    hy: 'Բայց գիտեմ, որ կմեռնեի, եթե կես ճանապարհին մնայի',
    meaningEs: 'Aunque dude de su meta exacta, tiene claro que conformarse o detenerse sería perder la vitalidad.',
    meaningHy: 'Թեև վերջնական նպատակը դեռ հստակ չէ, նա համոզված է, որ կես ճանապարհին կանգ առնելն իր համար հոգևոր մահ կլինի։',
    words: [
      { word: 'morir', hy: 'մեռնել', noteHy: 'Փոխաբերական չափազանցություն՝ ներքին կյանքի ու կրքի կորուստը ցույց տալու համար։' },
      { word: 'quedarse', hy: 'մնալ', noteHy: 'Դերանվանական բայ՝ մի վայրում կամ վիճակում մնալու իմաստով։' },
      { word: 'en la mitad', hy: 'կես ճանապարհին, կեսին', noteHy: 'Նշանակում է գործը կամ կյանքը կիսատ թողնել։' },
    ],
    grammarEs: 'Condicional simple (moriría) + Oración condicional coloquial (si + presente: si me quedo).',
    grammarHy: 'Երգի կենդանի լեզվում «moriría» պայմանական ձևը համադրվում է «si me quedo» ներկա ժամանակի հետ՝ ընդգծելու հենց հիմա կայացվող որոշման հրատապությունը։',
    grammarTopicId: 'si-presente',
  },
  {
    key: 'v3',
    es: 'Por eso vuelo a otros senderos',
    hy: 'Այդ պատճառով թռչում եմ դեպի այլ ուղիներ',
    meaningEs: 'Decide tomar acción y abrirse a nuevas direcciones en lugar de quedarse atrapada.',
    meaningHy: 'Նա չի հանձնվում, այլ քայլ է անում դեպի նոր հորիզոններ՝ ընտրելով ազատության և փոփոխության ուղին։',
    words: [
      { word: 'por eso', hy: 'այդ պատճառով', noteHy: 'Կապակցող արտահայտություն, որը ցույց է տալիս նախորդ մտքի հետևանքը։' },
      { word: 'volar', hy: 'թռչել', noteHy: 'Ազատության և թեթևության փոխաբերություն (o → ue անկանոն բայ՝ vuelo)։' },
      { word: 'senderos', hy: 'ուղիներ, արահետներ', noteHy: 'Կյանքի նոր ճանապարհների ու փորձառությունների բանաստեղծական անվանում։' },
    ],
    grammarEs: 'Conector consecutivo (por eso) + Presente irregular con diptongación (volar → vuelo).',
    grammarHy: '«Por eso»-ն ցույց է տալիս հետևանք, իսկ «vuelo»-ն՝ o → ue արմատային փոփոխությամբ ներկա ժամանակի ձև է։',
    grammarTopicId: 'por-eso',
  },
  {
    key: 'v4',
    es: 'Para conocer el mundo de verdad',
    hy: 'Իսկական աշխարհը ճանաչելու համար',
    meaningEs: 'Su objetivo no es escapar sin rumbo, sino experimentar la vida de forma auténtica.',
    meaningHy: 'Նրա նպատակն աննպատակ փախուստը չէ, այլ կյանքն ու աշխարհն իրականում, սեփական փորձով ճանաչելը։',
    words: [
      { word: 'para + infinitivo', hy: '...-ելու համար', noteHy: 'Արտահայտում է հստակ նպատակ։' },
      { word: 'conocer', hy: 'ճանաչել, ծանոթանալ', noteHy: 'Օգտագործվում է վայրեր, մարդիկ և փորձառություններ ճանաչելու համար։' },
      { word: 'de verdad', hy: 'իսկապես, իրականում', noteHy: 'Շեշտում է անկեղծությունն ու իրական լինելը։' },
    ],
    grammarEs: 'Oración final con «para + infinitivo» (para conocer).',
    grammarHy: '«Para + անորոշ դերբայ» կառուցվածքը ներկայացնում է գործողության նպատակը։',
    grammarTopicId: 'para-infinitivo',
  },
  {
    key: 'v5',
    es: 'Aún no es tarde pero así me estoy sintiendo',
    hy: 'Դեռ ուշ չէ, բայց հենց այդպես եմ ինձ զգում',
    meaningEs: 'Racionalmente sabe que tiene tiempo para cambiar, aunque sus emociones la apresuran.',
    meaningHy: 'Մտքով հասկանում է, որ փոփոխության համար դեռ ուշ չէ, բայց հոգում արդեն զգում է անհանգստություն և շտապելու կարիք։',
    words: [
      { word: 'aún no', hy: 'դեռ ոչ', noteHy: 'Ցույց է տալիս, որ մի բան դեռ տեղի չի ունեցել («todavía no»-ի հոմանիշը)։' },
      { word: 'así', hy: 'այսպես, այդպես', noteHy: 'Վերաբերում է զգացողության կերպին։' },
      { word: 'sentirse', hy: 'իրեն զգալ', noteHy: '«Me estoy sintiendo»՝ հենց այս պահին ապրվող հոգեվիճակ։' },
    ],
    grammarEs: 'Expresión temporal (aún no) + Presente progresivo con verbo pronominal (me estoy sintiendo).',
    grammarHy: '«Estar + gerundio» (estoy sintiendo) ձևը ցույց է տալիս հենց ներկա պահին ընթացող ներքին զգացողություն, իսկ «me»-ն կարող է դրվել «estoy»-ից առաջ։',
    grammarTopicId: 'presente-progresivo',
  },
  {
    key: 'v6',
    es: 'Y aparecen tantos miedos que no me dejan pensar',
    hy: 'Եվ հայտնվում են այնքան վախեր, որ ինձ չեն թողնում մտածել',
    meaningEs: 'Las dudas e inseguridades surgen de golpe y bloquean la claridad mental.',
    meaningHy: 'Անորոշության պահերին վախերն այնքան են շատանում, որ խանգարում են հանգիստ մտածել և որոշում կայացնել։',
    words: [
      { word: 'aparecer', hy: 'հայտնվել, ի հայտ գալ', noteHy: 'Ցույց է տալիս անսպասելի կամ ինքնաբուխ առաջացում։' },
      { word: 'tantos miedos', hy: 'այնքան շատ վախեր', noteHy: '«Tantos»-ը համաձայնեցվում է հոգնակի արական «miedos» գոյականի հետ։' },
      { word: 'dejar + infinitivo', hy: 'թողնել / թույլ տալ անել մի բան', noteHy: 'Ժխտական ձևով՝ «no me dejan pensar» («ինձ չեն թողնում մտածել»)։' },
    ],
    grammarEs: 'Presente de indicativo (aparecen) + Consecutiva (tantos... que) + Dejar + infinitivo.',
    grammarHy: '«Dejar + infinitivo» կառուցվածքը նշանակում է թույլ տալ կամ հնարավորություն տալ որևէ գործողություն կատարել։',
    grammarTopicId: 'dejar-infinitivo',
  },
  {
    key: 'v7',
    es: 'Y tengo sueños de amores nuevos',
    hy: 'Եվ ունեմ նոր սերերի մասին երազանքներ',
    meaningEs: 'Pese al miedo, el corazón sigue abierto al entusiasmo, al cariño y a nuevas historias.',
    meaningHy: 'Չնայած վախերին՝ նրա սիրտը բաց է մնում հույսի, նոր զգացմունքների և պայծառ երազանքների համար։',
    words: [
      { word: 'tener sueños', hy: 'երազանքներ ունենալ', noteHy: '«Sueño» նշանակում է և՛ «քուն/երազ», և՛ «նվիրական երազանք»։' },
      { word: 'amores nuevos', hy: 'նոր սերեր', noteHy: 'Հոգնակին ընդգծում է նոր կյանքի և զգացմունքային թարմության ձգտումը։' },
    ],
    grammarEs: 'Presente irregular (tener → tengo) + Sustantivo plural con adjetivo pospuesto (amores nuevos).',
    grammarHy: '«Tengo»-ն «tener» բայի առաջին դեմքի անկանոն ներկան է։ Իսպաներենում ածականը հաճախ դրվում է գոյականից հետո։',
    grammarTopicId: 'presente-indicativo',
  },
  {
    key: 'v8',
    es: 'Y me cuesta imaginar lo que vendrá',
    hy: 'Եվ ինձ համար դժվար է պատկերացնել, թե ինչ է գալու',
    meaningEs: 'El futuro es un misterio: le resulta difícil visualizar qué le espera adelante.',
    meaningHy: 'Ապագան անծանոթ է ու խորհրդավոր, և նա դժվարանում է պատկերացնել, թե ինչ իրադարձություններ են իրեն սպասվում։',
    words: [
      { word: 'me cuesta', hy: 'ինձ համար դժվար է', noteHy: '«Costar» բայը գործում է «gustar»-ի պես՝ դժվարություն կամ ջանք արտահայտելու համար։' },
      { word: 'imaginar', hy: 'պատկերացնել', noteHy: 'Անորոշ դերբայ «me cuesta»-ից հետո։' },
      { word: 'vendrá', hy: 'կգա, գալու է', noteHy: '«Venir» բայի անկանոն ապառնի ժամանակը (futuro simple)։' },
    ],
    grammarEs: 'Me cuesta + infinitivo + Lo que + Futuro simple irregular (venir → vendrá).',
    grammarHy: 'Միավորված են «me cuesta + infinitivo» դժվարության կառուցվածքը և «venir» բայի անկանոն ապառնի ձևը՝ «vendrá»։',
    grammarTopicId: 'me-cuesta',
  },
];

const CHORUS_LINES: BaseLineSpec[] = [
  {
    key: 'c1',
    es: 'Cambio dolor por libertad',
    hy: 'Ցավը փոխանակում եմ ազատության հետ',
    meaningEs: 'El lema central de la canción: transformar el sufrimiento pasado en una vida libre y propia.',
    meaningHy: 'Երգի գլխավոր կարգախոսն է՝ անցյալի ցավն ու տառապանքը փոխարինել ներքին ազատությամբ ու ինքնուրույնությամբ։',
    words: [
      { word: 'cambiar ... por ...', hy: 'մի բան փոխանակել մեկ այլ բանով', noteHy: '«Por» նախդիրը պարտադիր է փոխանակման իմաստի համար։' },
      { word: 'dolor', hy: 'ցավ, տառապանք', noteHy: 'Այստեղ՝ հոգեկան ցավ ու հին վշտեր։' },
      { word: 'libertad', hy: 'ազատություն', noteHy: '«-tad» վերջավորությամբ բառերը իսպաներենում իգական սեռի են (la libertad)։' },
    ],
    grammarEs: 'Estructura «cambiar algo por algo» en presente de indicativo.',
    grammarHy: '«Cambiar A por B» կառուցվածքը ցույց է տալիս գիտակցված փոխանակում. «por»-ը փոխարինվում է հայերեն «...-ով / ...-ի հետ» կապով։',
    grammarTopicId: 'cambiar-por',
  },
  {
    key: 'c2',
    es: 'Cambio heridas por un sueño',
    hy: 'Վերքերը փոխանակում եմ մի երազանքի հետ',
    meaningEs: 'Deja atrás las cicatrices emocionales para aferrarse a una ilusión que dé sentido a sus días.',
    meaningHy: 'Նա որոշում է այլևս չապրել հին հոգեկան վերքերով, այլ ընտրել մի մեծ երազանք, որն իրեն առաջ կտանի։',
    words: [
      { word: 'heridas', hy: 'վերքեր', noteHy: 'Փոխաբերական իմաստով՝ հոգեկան ցավեր ու հիասթափություններ։' },
      { word: 'un sueño', hy: 'մի երազանք', noteHy: 'Անորոշ հոդը «un» շեշտում է, որ նույնիսկ մեկ անկեղծ երազանքը բավարար է ուժ գտնելու համար։' },
    ],
    grammarEs: 'Cambiar algo por algo + Sustantivo plural (heridas) + Artículo indefinido (un sueño).',
    grammarHy: 'Կրկնվում է «cambiar algo por algo» կառուցվածքը՝ հուզական ռիթմ և վճռականություն ստեղծելու համար։',
    grammarTopicId: 'metaforas',
  },
  {
    key: 'c3',
    es: 'Que me ayude a continuar',
    hy: 'Որն ինձ կօգնի շարունակել',
    meaningEs: 'Busca un sueño que todavía no conoce del todo, pero que tenga el poder de impulsarla hacia adelante.',
    meaningHy: 'Երազանքը դեռ կոնկրետացված չէ, բայց այն պետք է ունենա ուժ՝ իրեն առաջ շարժելու և կյանքը շարունակելու համար։',
    words: [
      { word: 'que', hy: 'որը', noteHy: 'Հարաբերական դերանուն՝ կապված «un sueño» գոյականին։' },
      { word: 'ayudar a + inf.', hy: 'օգնել անել մի բան', noteHy: '«Ayudar» բայը միշտ պահանջում է «a» նախդիրը անորոշ դերբայից առաջ։' },
      { word: 'continuar', hy: 'շարունակել', noteHy: 'Առաջ գնալ՝ չնայած դժվարություններին։' },
    ],
    grammarEs: 'Oración de relativo con Presente de subjuntivo (un sueño que me ayude) + ayudar a + infinitivo.',
    grammarHy: 'Օգտագործված է սուբյունկտիվ («ayude»), որովհետև խոսվում է դեռ չգտնված, ցանկալի երազանքի մասին։',
    grammarTopicId: 'subjuntivo',
  },
  {
    key: 'c4',
    es: 'Cambio dolor, felicidad',
    hy: 'Փոխում եմ ցավը՝ երջանկության',
    meaningEs: 'Una expresión poética y comprimida: deja el dolor y llama directamente a la felicidad.',
    meaningHy: 'Բանաստեղծական, սեղմ ձևակերպում՝ ցավին հրաժեշտ տալու և երջանկությունը կյանք հրավիրելու կոչ։',
    words: [
      { word: 'dolor', hy: 'ցավ', noteHy: 'Հակադրվում է «felicidad» բառին։' },
      { word: 'felicidad', hy: 'երջանկություն', noteHy: '«-dad» վերջավորությամբ իգական գոյական (la felicidad)։' },
    ],
    grammarEs: 'Elipsis poética (omisión de «por») y contraste léxico (antónimos).',
    grammarHy: 'Երգի ռիթմի համար բաց է թողնված «por» նախդիրը՝ ստեղծելով հակադրության ուժեղ պատկեր (ցավ ↔ երջանկություն)։',
    grammarTopicId: 'metaforas',
  },
  {
    key: 'c5',
    es: 'Que la suerte sea suerte',
    hy: 'Թող որ բախտը իսկապես բախտ լինի',
    meaningEs: 'Desea que la buena fortuna por fin se vuelva real y tangible en su vida.',
    meaningHy: 'Նա սրտանց մաղթում է, որ հաջողությունն ու բախտը դադարեն միայն բառ լինելուց և իրական դառնան իր կյանքում։',
    words: [
      { word: 'que + subjuntivo', hy: 'թող որ...', noteHy: 'Անկախ ցանկության ու մաղթանքի արտահայտություն։' },
      { word: 'suerte', hy: 'բախտ, հաջողություն', noteHy: 'Իգական սեռի գոյական՝ «la suerte»։' },
      { word: 'sea', hy: 'լինի', noteHy: '«Ser» բայի ներկա սուբյունկտիվի ձևը (3-րդ դեմք եզակի)։' },
    ],
    grammarEs: 'Expresión de deseo «Que + presente de subjuntivo» (ser → sea).',
    grammarHy: '«Que + սուբյունկտիվ» կառուցվածքը հայերենում հրաշալի թարգմանվում է «Թող որ...» մաղթանքով։',
    grammarTopicId: 'subjuntivo',
  },
  {
    key: 'c6',
    es: 'Y no algo que no he de alcanzar',
    hy: 'Եվ ոչ թե մի բան, որին չեմ կարող հասնել',
    meaningEs: 'Rechaza la idea de que la felicidad sea un destino inalcanzable reservado solo para otros.',
    meaningHy: 'Նա չի ուզում հավատալ, թե երջանկությունն ու բախտն անհասանելի են. նա վստահ է, որ արժանի է հասնել դրանց։',
    words: [
      { word: 'algo', hy: 'մի բան, ինչ-որ բան', noteHy: 'Անորոշ դերանուն։' },
      { word: 'haber de + infinitivo', hy: 'պետք է / նախատեսված լինել / կարողանալ', noteHy: 'Գրական և արտահայտիչ կառուցվածք՝ ապագայի կամ ճակատագրի երանգով։' },
      { word: 'alcanzar', hy: 'հասնել, նվաճել', noteHy: 'Նպատակին կամ երազանքին հասնել։' },
    ],
    grammarEs: 'Perífrasis verbal «haber de + infinitivo» (he de alcanzar) dentro de una oración de relativo.',
    grammarHy: '«He de alcanzar»-ը գրական պերիֆրազ է՝ ճակատագրական կամ ապագա հնարավորության իմաստով։',
    grammarTopicId: 'haber-de',
  },
];

function buildSection(
  section: SectionKey,
  sectionLabel: string,
  specs: BaseLineSpec[],
  startOrder: number
): LyricLine[] {
  return specs.map((spec, idx) => ({
    id: `${section}_${spec.key}`,
    order: startOrder + idx,
    section,
    sectionLabel,
    es: spec.es,
    hy: spec.hy,
    meaningEs: spec.meaningEs,
    meaningHy: spec.meaningHy,
    words: spec.words,
    grammarEs: spec.grammarEs,
    grammarHy: spec.grammarHy,
    grammarTopicId: spec.grammarTopicId,
  }));
}

export const SONG_SECTIONS: { key: SectionKey; label: string; labelHy: string }[] = [
  { key: 'verso1', label: '[Verso 1]', labelHy: 'Տուն 1' },
  { key: 'coro1', label: '[Coro 1]', labelHy: 'Կրկներգ 1' },
  { key: 'instrumental', label: '[Instrumental]', labelHy: 'Գործիքային հատված' },
  { key: 'verso2', label: '[Verso 2]', labelHy: 'Տուն 2' },
  { key: 'coro2', label: '[Coro 2]', labelHy: 'Կրկներգ 2' },
  { key: 'corofinal', label: '[Coro final]', labelHy: 'Եզրափակիչ կրկներգ' },
];

export const LYRIC_LINES: LyricLine[] = [
  ...buildSection('verso1', '[Verso 1]', VERSE_LINES, 1),
  ...buildSection('coro1', '[Coro 1]', CHORUS_LINES, 9),
  {
    id: 'instrumental_break',
    order: 15,
    section: 'instrumental',
    sectionLabel: '[Instrumental]',
    isInstrumental: true,
    es: '[Instrumental]',
    hy: 'Գործիքային հատված — երաժշտական դադար, ռիթմի ու էներգիայի աճ',
    meaningEs: 'Pausa musical con ritmo latino que prepara el regreso de la voz con aún más fuerza.',
    meaningHy: 'Լատինամերիկյան ռիթմիկ գործիքային հատված, որը նախապատրաստում է երկրորդ տան վերադարձը՝ նոր լիցքով ու էներգիայով։',
    words: [],
    grammarEs: 'Sección instrumental sin letra cantada.',
    grammarHy: 'Այս հատվածում խոսք չկա. կարող եք լսել ռիթմը և պատրաստվել երկրորդ տանը։',
  },
  ...buildSection('verso2', '[Verso 2]', VERSE_LINES, 16),
  ...buildSection('coro2', '[Coro 2]', CHORUS_LINES, 24),
  ...buildSection('corofinal', '[Coro final]', CHORUS_LINES, 30),
];

export const SINGABLE_LINES: LyricLine[] = LYRIC_LINES.filter((l) => !l.isInstrumental);

// Unique 14 lines for line-by-line deep analysis without clutter, while keeping full song intact elsewhere
export const UNIQUE_LINES_FOR_ANALYSIS: LyricLine[] = [
  ...LYRIC_LINES.filter((l) => l.section === 'verso1'),
  ...LYRIC_LINES.filter((l) => l.section === 'coro1'),
];

export interface AnalysisTheme {
  id: string;
  titleEs: string;
  titleHy: string;
  bodyEs: string;
  bodyHy: string;
  discussionPromptEs: string;
  discussionPromptHy: string;
}

export const SONG_ANALYSIS_THEMES: AnalysisTheme[] = [
  {
    id: 'main-meaning',
    titleEs: '1. El sentido principal de la canción',
    titleHy: '1. Երգի հիմնական իմաստը',
    bodyEs:
      '«Cambio dolor» es un himno a la valentía emocional y al renacimiento personal. La protagonista reconoce que todavía no tiene todas las respuestas sobre su futuro, pero sabe con absoluta claridad qué no quiere: quedarse paralizada en el dolor o conformarse con vivir «a medias».',
    bodyHy:
      '«Cambio dolor» երգը ներքին քաջության և անձնական վերածննդի հիմն է։ Հերոսուհին անկեղծորեն ընդունում է, որ դեռ չունի ապագայի բոլոր պատասխանները, բայց հստակ գիտի, թե ինչ չի ուզում՝ մնալ ցավի մեջ կամ բավարարվել «կիսատ» կյանքով։',
    discussionPromptEs: '¿Alguna vez sentiste que no sabías exactamente tu destino, pero sí sabías que necesitabas un cambio?',
    discussionPromptHy: 'Երբևէ զգացե՞լ ես, որ հստակ չգիտես վերջնակետդ, բայց համոզված ես, որ փոփոխություն է պետք։',
  },
  {
    id: 'freedom',
    titleEs: '2. ¿Por qué la protagonista habla de libertad?',
    titleHy: '2. Ինչու է հերոսուհին խոսում ազատության մասին',
    bodyEs:
      'Para ella, la libertad no es solo viajar o cambiar de lugar; es liberarse de los miedos, del dolor acumulado y de las expectativas ajenas. Cuando canta «Cambio dolor por libertad», convierte el sufrimiento en una moneda de cambio para recuperar el control de su propia historia.',
    bodyHy:
      'Նրա համար ազատությունը միայն ճամփորդելը կամ տեղափոխվելը չէ. դա վախերից, կուտակված ցավից և ուրիշների պարտադրած սահմաններից ազատվելն է։ «Cambio dolor por libertad» տողով նա տառապանքը վերածում է գիտակցված ընտրության՝ իր կյանքի ղեկը սեփական ձեռքը վերցնելու համար։',
    discussionPromptEs: '¿Qué significa la palabra «libertad» en tu vida cotidiana?',
    discussionPromptHy: 'Ի՞նչ է նշանակում «ազատություն» բառը քո առօրյա կյանքում։',
  },
  {
    id: 'fear-hope-dreams',
    titleEs: '3. Miedo, esperanza y sueños: un equilibrio humano',
    titleHy: '3. Վախի, հույսի և երազանքների կապը',
    bodyEs:
      'La canción no idealiza la valentía como ausencia de miedo. En el mismo verso conviven «aparecen tantos miedos que no me dejan pensar» y «tengo sueños de amores nuevos». Eso vuelve la letra muy real: los sueños nacen precisamente junto al miedo, y seguir adelante a pesar de las dudas es lo que nos hace crecer.',
    bodyHy:
      'Երգը քաջությունը չի պատկերում որպես վախի բացակայություն։ Նույն տան մեջ կողք կողքի ապրում են «հայտնվում են այնքան վախեր, որ չեն թողնում մտածել» և «ունեմ նոր սերերի երազանքներ» տողերը։ Հենց այս համադրությունն է երգը դարձնում կենդանի ու իրական. երազանքը հաղթում է վախին ոչ թե այն ժխտելով, այլ նրանից առաջ անցնելով։',
    discussionPromptEs: '¿Qué te ayuda a seguir soñando cuando aparecen dudas o miedos?',
    discussionPromptHy: 'Ի՞նչն է քեզ օգնում շարունակել երազել, երբ վախեր ու կասկածներ են հայտնվում։',
  },
  {
    id: 'desire-for-change',
    titleEs: '4. El impulso hacia el cambio',
    titleHy: '4. Ինչ է նշանակում փոփոխությունների ձգտումը',
    bodyEs:
      'La frase «moriría si me quedo en la mitad» refleja el rechazo a la rutina sin alma. Cambiar no es huir del pasado por debilidad, sino elegir activamente explorar «otros senderos» para conocer el mundo real con ojos propios.',
    bodyHy:
      '«Կմեռնեի, եթե կես ճանապարհին մնայի» արտահայտությունը մերժում է անհոգի սովորությունն ու կանգնածությունը։ Փոփոխությունը փախուստ չէ, այլ գիտակցված որոշում՝ ընտրելու «այլ ուղիներ» և աշխարհը սեփական աչքերով բացահայտելու համար։',
    discussionPromptEs: '¿Cuál ha sido el cambio más positivo que hiciste en los últimos años?',
    discussionPromptHy: 'Ո՞րն է եղել վերջին տարիներին քո կատարած ամենադրական փոփոխությունը։',
  },
  {
    id: 'emotions-by-section',
    titleEs: '5. Las emociones en cada parte de la canción',
    titleHy: '5. Հույզերի զարգացումը տարբեր հատվածներում',
    bodyEs:
      'Los versos (Verso 1 y Verso 2) son reflexivos, íntimos y honestos: mezclan incertidumbre, impaciencia («aún no es tarde»), miedo y curiosidad. En cambio, los coros (Coro 1, Coro 2 y Coro final) estallan con energía luminosa, determinación y optimismo: la duda se transforma en una declaración firme.',
    bodyHy:
      'Տները (Verso 1 և Verso 2) ներքին խոստովանություն են՝ լի անորոշությամբ, անհամբերությամբ («դեռ ուշ չէ»), վախով և հետաքրքրասիրությամբ։ Իսկ կրկներգերը (Coro 1, Coro 2, Coro final) պայթում են լուսավոր էներգիայով, վճռականությամբ և լավատեսությամբ. կասկածը վերածվում է հստակ ու զորեղ հայտարարության։',
    discussionPromptEs: '¿Qué parte de la canción te transmite más energía al escucharla: el verso o el coro?',
    discussionPromptHy: 'Երգի ո՞ր հատվածն է քեզ ամենաշատ էներգիա տալիս՝ տո՞ւնը, թե՞ կրկներգը։',
  },
  {
    id: 'metaphors',
    titleEs: '6. Metáforas y lenguaje figurado',
    titleHy: '6. Փոխաբերություններ և պատկերավոր արտահայտություններ',
    bodyEs:
      'La letra usa imágenes muy visuales: «quedarse en la mitad» simboliza una vida incompleta; «volar a otros senderos» une el vuelo (libertad) con los caminos (decisiones); «heridas» representa las marcas emocionales del pasado; y «cambiar dolor por libertad» usa el verbo económico «cambiar» en sentido espiritual.',
    bodyHy:
      'Երգը հարուստ է տեսողական պատկերներով. «կես ճանապարհին մնալ» նշանակում է կիսատ ապրած կյանք, «թռչել այլ ուղիներ» արտահայտությունը միավորում է թռիչքը (ազատություն) և արահետները (ընտրություններ), «վերքերը» խորհրդանշում են հոգու ցավերը, իսկ «ցավը փոխանակել ազատության հետ» արտահայտությունը սովորական առևտրային «cambiar» բայը վերածում է հոգևոր որոշման։',
    discussionPromptEs: '¿Cuál de las metáforas de la canción te parece más poética y por qué?',
    discussionPromptHy: 'Երգի ո՞ր փոխաբերությունն է քեզ ամենաբանաստեղծականը թվում և ինչո՞ւ։',
  },
  {
    id: 'core-message',
    titleEs: '7. El mensaje esencial para el oyente',
    titleHy: '7. Երգի գլխավոր ուղերձը ունկնդրին',
    bodyEs:
      'Nunca es demasiado tarde para empezar de nuevo. Tener miedo es normal y no saberlo todo también lo es; lo decisivo es no rendirse a mitad del camino y atreverse a creer que la buena suerte y la felicidad sí están a nuestro alcance.',
    bodyHy:
      'Երբեք ուշ չէ նորից սկսելու համար։ Վախենալն ու ամեն ինչ չիմանալը մարդկային է. կարևորը կես ճանապարհին չհանձնվելն է և հավատալը, որ բախտն ու երջանկությունը հասանելի են քեզ։',
    discussionPromptEs: 'Si tuvieras que resumir el mensaje de la canción en una frase propia en español, ¿cómo sería?',
    discussionPromptHy: 'Եթե փորձեիր երգի ամբողջ ուղերձը ամփոփել քո մեկ իսպաներեն նախադասությամբ, ի՞նչ կասեիր։',
  },
];
