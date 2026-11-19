import { GrammarTopic } from './types';

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'condicional',
    number: 1,
    titleEs: 'Condicional simple',
    titleHy: 'Պարզ պայմանական եղանակ (juraría, moriría)',
    level: 'B1',
    songQuote: 'Juraría que no sé bien lo que quiero / Pero sé que moriría si me quedo en la mitad',
    songQuoteHy: 'Կերդվեի, որ լավ չգիտեմ՝ ինչ եմ ուզում / Բայց գիտեմ, որ կմեռնեի, եթե կես ճանապարհին մնայի',
    explanationHy:
      'Condicional simple-ը կազմվում է բայի ամբողջ անորոշ դերբային (infinitivo) ավելացնելով -ía, -ías, -ía, -íamos, -íais, -ían վերջավորությունները։ Այն օգտագործվում է ենթադրություն, մեղմացված կարծիք, երազանք կամ հիպոթետիկ արդյունք արտահայտելու համար։',
    whyThisFormHy:
      '«Juraría»-ն մեղմացնում է պնդումը («կերդվեի, կարծես թե»), իսկ «moriría»-ն ցույց է տալիս հիպոթետիկ հետևանքը, եթե հերոսուհին կանգ առնի կես ճանապարհին։',
    examples: [
      { es: 'Viajaría por toda América Latina si tuviera vacaciones largas.', hy: 'Կճամփորդեի ամբողջ Լատինական Ամերիկայով, եթե երկար արձակուրդ ունենայի։' },
      { es: 'Yo en tu lugar hablaría con ella hoy mismo.', hy: 'Քո տեղը լինեի՝ հենց այսօր կխոսեի նրա հետ։' },
      { es: 'Me encantaría aprender a bailar tango en Buenos Aires.', hy: 'Շատ կցանկանայի սովորել տանգո պարել Բուենոս Այրեսում։' },
    ],
    conjugationTable: {
      titleEs: 'Conjugación regular en Condicional simple',
      titleHy: 'Կանոնավոր խոնարհումը Condicional simple-ում',
      headers: ['Pronombre', 'jurar', 'morir', 'cambiar'],
      rows: [
        { pronoun: 'yo', forms: ['juraría', 'moriría', 'cambiaría'] },
        { pronoun: 'tú', forms: ['jurarías', 'morirías', 'cambiarías'] },
        { pronoun: 'él / ella / Ud.', forms: ['juraría', 'moriría', 'cambiaría'] },
        { pronoun: 'nosotros/as', forms: ['juraríamos', 'moriríamos', 'cambiaríamos'] },
        { pronoun: 'vosotros/as', forms: ['juraríais', 'moriríais', 'cambiaríais'] },
        { pronoun: 'ellos / Uds.', forms: ['jurarían', 'morirían', 'cambiarían'] },
      ],
    },
    practice: [
      {
        id: 'g1_p1',
        promptEs: 'Yo ______ todo por cumplir mi sueño. (cambiar)',
        promptHy: 'Ես ամեն ինչ ______ իմ երազանքն իրականացնելու համար։ (փոխել — պայմանական, yo)',
        options: ['cambiaría', 'cambiaba', 'cambiaré', 'cambio'],
        optionsHy: ['կփոխեի (պայմանական)', 'փոխում էի (անցյալ անկատար)', 'կփոխեմ (ապառնի)', 'փոխում եմ (ներկա)'],
        correctIndex: 0,
        explanationHy: 'Condicional simple-ում անորոշ դերբային (cambiar) ավելացվում է -ía → cambiaría։ «Cambiaba»-ն անցյալ անկատար է, իսկ «cambiaré»-ն՝ ապառնի։',
      },
      {
        id: 'g1_p2',
        promptEs: '¿Qué ______ tú en una situación tan difícil? (hacer — irregular: har-)',
        promptHy: 'Դու ի՞նչ ______ նման դժվար իրավիճակում։ (անել — անկանոն արմատ՝ har-, tú)',
        options: ['hacerías', 'harías', 'hacías', 'hagas'],
        optionsHy: ['սխալ ձև (անկանոն է)', 'կանեիր (պայմանական)', 'անում էիր (անցյալ անկատար)', 'անես (սուբյունկտիվ)'],
        correctIndex: 1,
        explanationHy: '«Hacer» բայն ունի անկանոն արմատ «har-» + «-ías» → harías։',
      },
    ],
  },
  {
    id: 'presente-indicativo',
    number: 2,
    titleEs: 'Presente de indicativo',
    titleHy: 'Ներկա սահմանական ժամանակ (sé, quiero, quedo, aparecen, tengo)',
    level: 'A1',
    songQuote: 'No sé bien lo que quiero / Y aparecen tantos miedos / Y tengo sueños',
    songQuoteHy: 'Լավ չգիտեմ՝ ինչ եմ ուզում / Եվ հայտնվում են այնքան վախեր / Եվ ունեմ երազանքներ',
    explanationHy:
      'Presente de indicativo-ն արտահայտում է իրական փաստեր, ներկա վիճակներ, սովորություններ և մտքեր։ Երգում հանդիպում են իսպաներենի ամենակարևոր անկանոն բայերը՝ saber (sé), querer (quiero — e→ie), tener (tengo), volar (vuelo — o→ue) և aparecer (aparecen)։',
    whyThisFormHy:
      'Հերոսուհին նկարագրում է այն իրական վիճակը, որի մեջ գտնվում է հենց այսօր՝ ինչ գիտի, ինչ է ուզում և ինչ վախեր են առաջանում իր ներսում։',
    examples: [
      { es: 'Sé hablar español y armenio todos los días.', hy: 'Ես գիտեմ խոսել իսպաներեն և հայերեն ամեն օր։' },
      { es: 'Quiero conocer nuevas ciudades este verano.', hy: 'Ուզում եմ այս ամառ նոր քաղաքներ ճանաչել։' },
      { es: 'Siempre tengo esperanza cuando empiezo un proyecto nuevo.', hy: 'Ես միշտ հույս ունեմ, երբ նոր նախագիծ եմ սկսում։' },
    ],
    conjugationTable: {
      titleEs: 'Verbos clave de la canción en Presente',
      titleHy: 'Երգի հիմնական բայերը ներկա ժամանակում',
      headers: ['Pronombre', 'saber', 'querer', 'tener', 'volar'],
      rows: [
        { pronoun: 'yo', forms: ['sé', 'quiero', 'tengo', 'vuelo'] },
        { pronoun: 'tú', forms: ['sabes', 'quieres', 'tienes', 'vuelas'] },
        { pronoun: 'él / ella', forms: ['sabe', 'quiere', 'tiene', 'vuela'] },
        { pronoun: 'nosotros/as', forms: ['sabemos', 'queremos', 'tenemos', 'volamos'] },
        { pronoun: 'ellos / ellas', forms: ['saben', 'quieren', 'tienen', 'vuelan'] },
      ],
    },
    practice: [
      {
        id: 'g2_p1',
        promptEs: 'Yo no ______ exactamente qué pasará mañana. (saber)',
        promptHy: 'Ես հստակ չ______՝ վաղը ինչ է լինելու։ (իմանալ — ներկա, yo)',
        options: ['sabo', 'sé', 'sabe', 'supe'],
        optionsHy: ['սխալ ձև (անկանոն է)', 'գիտեմ (ներկա, yo)', 'գիտի (ներկա, él/ella)', 'իմացա (անցյալ, yo)'],
        correctIndex: 1,
        explanationHy: '«Saber» բայի 1-ին դեմքի եզակին ներկայում անկանոն է՝ «sé» (երբեք «sabo» չի լինում)։',
      },
      {
        id: 'g2_p2',
        promptEs: 'Mis amigos ______ a Madrid el viernes. (volar)',
        promptHy: 'Իմ ընկերները ուրբաթ օրը ______ Մադրիդ։ (թռչել — ներկա, ellos)',
        options: ['volan', 'vuelan', 'vuelen', 'volamos'],
        optionsHy: ['սխալ ձև (բացակայում է o → ue)', 'թռչում են (ներկա, ellos)', 'թռչեն (սուբյունկտիվ)', 'թռչում ենք (nosotros)'],
        correctIndex: 1,
        explanationHy: '«Volar»-ը o → ue արմատային փոփոխությամբ բայ է՝ ellos vuelan։',
      },
    ],
  },
  {
    id: 'futuro-simple',
    number: 3,
    titleEs: 'Futuro simple',
    titleHy: 'Պարզ ապառնի ժամանակ (vendrá)',
    level: 'A2',
    songQuote: 'Y me cuesta imaginar lo que vendrá',
    songQuoteHy: 'Եվ ինձ համար դժվար է պատկերացնել, թե ինչ է գալու',
    explanationHy:
      'Futuro simple-ը ցույց է տալիս ապագա իրադարձություններ և կանխատեսումներ։ Կանոնավոր բայերին ավելացվում են -é, -ás, -á, -emos, -éis, -án վերջավորությունները։ «Venir» բայը ապառնիում անկանոն է՝ արմատը դառնում է «vendr-» → vendrá։',
    whyThisFormHy:
      '«Vendrá» ձևն ընդգծում է անծանոթ ապագան, որը դեռ առջևում է և որի մասին հերոսուհին միայն ենթադրություններ կարող է անել։',
    examples: [
      { es: 'Pronto vendrá una etapa mucho más tranquila.', hy: 'Շուտով շատ ավելի հանգիստ փուլ կգա։' },
      { es: 'Mañana tendremos la respuesta definitiva.', hy: 'Վաղը մենք կունենանք վերջնական պատասխանը։' },
      { es: 'Algún día conoceré el mar de Argentina.', hy: 'Մի օր կճանաչեմ Արգենտինայի ծովը։' },
    ],
    conjugationTable: {
      titleEs: 'Futuro simple: venir (irregular) y cambiar (regular)',
      titleHy: 'Ապառնի ժամանակ՝ venir (անկանոն) և cambiar (կանոնավոր)',
      headers: ['Pronombre', 'venir (vendr-)', 'tener (tendr-)', 'cambiar'],
      rows: [
        { pronoun: 'yo', forms: ['vendré', 'tendré', 'cambiaré'] },
        { pronoun: 'tú', forms: ['vendrás', 'tendrás', 'cambiarás'] },
        { pronoun: 'él / ella', forms: ['vendrá', 'tendrá', 'cambiará'] },
        { pronoun: 'nosotros/as', forms: ['vendremos', 'tendremos', 'cambiaremos'] },
        { pronoun: 'ellos / ellas', forms: ['vendrán', 'tendrán', 'cambiarán'] },
      ],
    },
    practice: [
      {
        id: 'g3_p1',
        promptEs: 'Nadie sabe con certeza qué ______ después. (venir)',
        promptHy: 'Ոչ ոք վստահ չգիտի, թե հետո ինչ ______։ (գալ — ապառնի)',
        options: ['venirá', 'vendrá', 'viene', 'viniera'],
        optionsHy: ['սխալ ձև (անկանոն է)', 'կգա, գալու է (ապառնի)', 'գալիս է (ներկա)', 'եթե գար (անցյալ սուբյունկտիվ)'],
        correctIndex: 1,
        explanationHy: '«Venir» բայը Futuro simple-ում ստանում է անկանոն «vendr-» արմատը → vendrá։',
      },
    ],
  },
  {
    id: 'presente-progresivo',
    number: 4,
    titleEs: 'Presente progresivo (estar + gerundio)',
    titleHy: 'Ներկա շարունակական ժամանակ (me estoy sintiendo)',
    level: 'A2',
    songQuote: 'Aún no es tarde pero así me estoy sintiendo',
    songQuoteHy: 'Դեռ ուշ չէ, բայց հենց այդպես եմ ինձ զգում',
    explanationHy:
      'Կազմվում է «estar» բայի ներկայով + gerundio (-ando / -iendo)։ «Sentir» բայի գերունդիումը անկանոն է՝ e → i փոփոխությամբ դառնում է «sintiendo»։ Դերանունը (me) կարող է դրվել կամ «estoy»-ից առաջ (me estoy sintiendo), կամ գերունդիումին կցված (estoy sintiéndome)։',
    whyThisFormHy:
      'Եթե ասեր «me siento», կլիներ ընդհանուր վիճակ։ «Me estoy sintiendo»-ն ցույց է տալիս հենց այս պահին ուժեղացող, կենդանի ներքին զգացողություն։',
    examples: [
      { es: 'Últimamente me estoy sintiendo con más confianza.', hy: 'Վերջին շրջանում ինձ ավելի վստահ եմ զգում։' },
      { es: 'Estamos escuchando la canción para mejorar la pronunciación.', hy: 'Մենք լսում ենք երգը՝ արտասանությունը բարելավելու համար։' },
      { es: '¿Qué estás pensando ahora mismo?', hy: 'Ի՞նչ ես մտածում հենց այս պահին։' },
    ],
    practice: [
      {
        id: 'g4_p1',
        promptEs: 'Hoy me estoy ______ mucho más libre. (sentir)',
        promptHy: 'Այսօր ինձ շատ ավելի ազատ եմ ______։ (զգալ — gerundio)',
        options: ['sentiendo', 'sintiendo', 'sentando', 'siento'],
        optionsHy: ['սխալ գրություն (պետք է e → i)', 'զգալով (ճիշտ gerundio)', 'նստեցնելով (sentar բայից)', 'զգում եմ (ներկա)'],
        correctIndex: 1,
        explanationHy: '«Sentir» բայի gerundio-ն ունի e → i փոփոխություն՝ «sintiendo»։',
      },
    ],
  },
  {
    id: 'subjuntivo',
    number: 5,
    titleEs: 'Presente de subjuntivo',
    titleHy: 'Ներկա ստորադասական եղանակ (que me ayude, que la suerte sea)',
    level: 'B1',
    songQuote: 'Cambio heridas por un sueño que me ayude a continuar / Que la suerte sea suerte',
    songQuoteHy: 'Վերքերը փոխանակում եմ մի երազանքի հետ, որն ինձ կօգնի շարունակել / Թող որ բախտը իսկապես բախտ լինի',
    explanationHy:
      'Subjuntivo-ն արտահայտում է ցանկություն, մաղթանք, կասկած կամ դեռ անծանոթ, փնտրվող բան։ -ar բայերը ստանում են -e վերջավորություններ (ayudar → ayude), իսկ -er/-ir բայերը՝ -a։ «Ser» բայը անկանոն է → sea։',
    whyThisFormHy:
      '1) «Un sueño que me ayude»՝ երազանքը դեռ կոնկրետ չէ, այն ցանկալի է, ուստի՝ սուբյունկտիվ։ 2) «Que la suerte sea suerte»՝ ուղղակի մաղթանք («Թող որ...»), որը իսպաներենում միշտ պահանջում է սուբյունկտիվ։',
    examples: [
      { es: 'Busco un libro que me inspire a viajar.', hy: 'Փնտրում եմ մի գիրք, որն ինձ կոգեշնչի ճամփորդել։' },
      { es: '¡Que tengas un día maravilloso!', hy: 'Թող հրաշալի օր ունենաս։' },
      { es: 'Espero que todo sea más fácil este año.', hy: 'Հուսով եմ, որ այս տարի ամեն ինչ ավելի հեշտ կլինի։' },
    ],
    conjugationTable: {
      titleEs: 'Presente de subjuntivo: ayudar y ser',
      titleHy: 'Ներկա սուբյունկտիվ՝ ayudar և ser',
      headers: ['Pronombre', 'ayudar', 'ser (irregular)', 'tener (irregular)'],
      rows: [
        { pronoun: 'yo', forms: ['ayude', 'sea', 'tenga'] },
        { pronoun: 'tú', forms: ['ayudes', 'seas', 'tengas'] },
        { pronoun: 'él / ella', forms: ['ayude', 'sea', 'tenga'] },
        { pronoun: 'nosotros/as', forms: ['ayudemos', 'seamos', 'tengamos'] },
        { pronoun: 'ellos / ellas', forms: ['ayuden', 'sean', 'tengan'] },
      ],
    },
    practice: [
      {
        id: 'g5_p1',
        promptEs: '¡Que la vida te ______ muchas alegrías! (traer)',
        promptHy: 'Թող կյանքը քեզ շատ ուրախություններ ______։ (բերել — մաղթանք, սուբյունկտիվ)',
        options: ['trae', 'traiga', 'traerá', 'trajo'],
        optionsHy: ['բերում է (ներկա)', 'բերի (սուբյունկտիվ)', 'կբերի (ապառնի)', 'բերեց (անցյալ)'],
        correctIndex: 1,
        explanationHy: '«Que + subjuntivo» մաղթանքի կառուցվածքում «traer»-ը դառնում է «traiga»։',
      },
      {
        id: 'g5_p2',
        promptEs: 'Quiero una canción que me ______ energía. (dar)',
        promptHy: 'Ուզում եմ մի երգ, որն ինձ էներգիա ______։ (տալ — սուբյունկտիվ)',
        options: ['da', 'dé', 'daba', 'dio'],
        optionsHy: ['տալիս է (ներկա)', 'տա (սուբյունկտիվ)', 'տալիս էր (անցյալ անկատար)', 'տվեց (անցյալ)'],
        correctIndex: 1,
        explanationHy: 'Անորոշ/փնտրվող առարկայից հետո «que»-ն պահանջում է սուբյունկտիվ՝ «dé»։',
      },
    ],
  },
  {
    id: 'me-cuesta',
    number: 6,
    titleEs: 'Me cuesta + infinitivo',
    titleHy: 'Դժվարության արտահայտում (me cuesta imaginar)',
    level: 'A2',
    songQuote: 'Y me cuesta imaginar lo que vendrá',
    songQuoteHy: 'Եվ ինձ համար դժվար է պատկերացնել, թե ինչ է գալու',
    explanationHy:
      '«Costar + infinitivo» արտահայտում է, որ ինչ-որ գործողություն մեծ ջանք է պահանջում կամ դժվար է տրվում։ Գործում է «gustar» բայի նման՝ me / te / le / nos / os / les cuesta + infinitivo։',
    whyThisFormHy:
      'Ավելի բնական և հուզական է, քան չոր «es difícil para mí imaginar» արտահայտությունը. ցույց է տալիս ներքին դժվարություն։',
    examples: [
      { es: 'Me cuesta levantarme temprano en invierno.', hy: 'Ձմռանը ինձ համար դժվար է վաղ արթնանալ։' },
      { es: 'A veces nos cuesta tomar decisiones grandes.', hy: 'Երբեմն մեզ համար դժվար է մեծ որոշումներ կայացնել։' },
      { es: '¿Te cuesta entender el ritmo rápido de la canción?', hy: 'Քեզ համար դժվա՞ր է հասկանալ երգի արագ ռիթմը։' },
    ],
    practice: [
      {
        id: 'g6_p1',
        promptEs: 'A mi hermano ______ mucho hablar en público.',
        promptHy: 'Իմ եղբոր համար շատ ______ հանրության առաջ խոսելը։',
        options: ['le cuesta', 'me cuesta', 'le cuestan', 'cuesta él'],
        optionsHy: ['նրա համար դժվար է (եզակի)', 'ինձ համար դժվար է', 'նրա համար դժվար են (հոգնակի)', 'քերականորեն սխալ ձև'],
        correctIndex: 0,
        explanationHy: 'Անորոշ դերբայից առաջ (hablar) միշտ օգտագործվում է եզակի «cuesta», իսկ «a mi hermano»-ի համար՝ «le» → le cuesta։',
      },
    ],
  },
  {
    id: 'dejar-infinitivo',
    number: 7,
    titleEs: 'Dejar + infinitivo',
    titleHy: 'Թույլ տալ / թողնել (no me dejan pensar)',
    level: 'A2',
    songQuote: 'Y aparecen tantos miedos que no me dejan pensar',
    songQuoteHy: 'Եվ հայտնվում են այնքան վախեր, որ ինձ չեն թողնում մտածել',
    explanationHy:
      '«Dejar + անորոշ դերբայ» (առանց նախդրի) նշանակում է թույլ տալ կամ հնարավորություն տալ որևէ բան անելու։ Ուշադրություն՝ չշփոթել «dejar de + infinitivo»-ի հետ, որը նշանակում է «դադարել անել մի բան»։',
    whyThisFormHy:
      'Երգում վախերը ներկայացվում են որպես ակտիվ ուժ, որը թույլ չի տալիս հերոսուհուն հանգիստ մտածել («no me dejan pensar»)։',
    examples: [
      { es: 'El ruido de la calle no me deja dormir.', hy: 'Փողոցի աղմուկը ինձ չի թողնում քնել։' },
      { es: 'Déjame explicarte cómo funciona este ejercicio.', hy: 'Թող բացատրեմ քեզ, թե ինչպես է աշխատում այս վարժությունը։' },
      { es: 'La música me deja sentir paz después del trabajo.', hy: 'Երաժշտությունը թույլ է տալիս ինձ խաղաղություն զգալ աշխատանքից հետո։' },
    ],
    practice: [
      {
        id: 'g7_p1',
        promptEs: 'Los nervios no ______ concentrarme en el examen.',
        promptHy: 'Նյարդերը ինձ չ______ կենտրոնանալ քննության ժամանակ։',
        options: ['me dejan', 'me dejan de', 'me dejo', 'deja me'],
        optionsHy: ['ինձ թողնում են (ճիշտ՝ առանց նախդրի)', 'դադարում են (իմաստը փոխվում է)', 'ինձ թողնում եմ (եզակի 1-ին դեմք)', 'սխալ բառերի կարգ'],
        correctIndex: 0,
        explanationHy: '«Թույլ չտալ» իմաստով նախդիր չի դրվում, իսկ «los nervios»-ը հոգնակի է → no me dejan concentrarme։',
      },
    ],
  },
  {
    id: 'lo-que',
    number: 8,
    titleEs: 'Lo que + verbo',
    titleHy: '«Այն, ինչ» կառուցվածքը (lo que quiero, lo que vendrá)',
    level: 'A2',
    songQuote: 'No sé bien lo que quiero / Y me cuesta imaginar lo que vendrá',
    songQuoteHy: 'Լավ չգիտեմ՝ ինչ եմ ուզում / Եվ դժվարանում եմ պատկերացնել, թե ինչ է գալու',
    explanationHy:
      '«Lo que»-ն չեզոք հարաբերական արտահայտություն է, որը փոխարինում է չնշված կամ վերացական առարկային կամ գաղափարին («այն, ինչ»)։ Ի տարբերություն «el que / la que»-ի՝ «lo que»-ն սեռ և թիվ չունի։',
    whyThisFormHy:
      'Հերոսուհին դեռ չի կարող կոնկրետ անուն տալ իր ցանկությանը կամ ապագային, ուստի անհրաժեշտ է չեզոք «lo que» ձևը։',
    examples: [
      { es: 'Haz siempre lo que te haga feliz.', hy: 'Միշտ արա այն, ինչ քեզ երջանիկ է դարձնում։' },
      { es: 'No entendí bien lo que dijiste ayer.', hy: 'Ես լավ չհասկացա այն, ինչ երեկ ասացիր։' },
      { es: 'Lo que más me gusta de esta canción es su ritmo.', hy: 'Այն, ինչ ինձ ամենաշատն է դուր գալիս այս երգում, նրա ռիթմն է։' },
    ],
    practice: [
      {
        id: 'g8_p1',
        promptEs: 'Dime ______ necesitas para empezar.',
        promptHy: 'Ասա ինձ՝ ______ է քեզ պետք սկսելու համար։',
        options: ['lo que', 'el que', 'la que', 'quien'],
        optionsHy: ['այն, ինչ (չեզոք)', 'այն մեկը (արական)', 'այն մեկը (իգական)', 'ով (մարդու համար)'],
        correctIndex: 0,
        explanationHy: 'Երբ խոսքը վերացական կամ չնշված բանի մասին է, օգտագործվում է չեզոք «lo que»-ն։',
      },
    ],
  },
  {
    id: 'haber-de',
    number: 9,
    titleEs: 'Haber de + infinitivo',
    titleHy: '«Haber de + անորոշ դերբայ» պերիֆրազը (he de alcanzar)',
    level: 'B2',
    songQuote: 'Y no algo que no he de alcanzar',
    songQuoteHy: 'Եվ ոչ թե մի բան, որին չեմ կարող հասնել',
    explanationHy:
      '«Haber de + infinitivo» կառուցվածքը ավելի գրական և բանաստեղծական է, քան «tener que»-ն։ Այն արտահայտում է ճակատագրական ապագա, ներքին պարտավորություն կամ հեռանկար։',
    whyThisFormHy:
      'Երգի տեքստում «no he de alcanzar» ձևը շատ ավելի բանաստեղծական է հնչում, քան «no voy a alcanzar»-ը՝ ստեղծելով ճակատագրի ու բախտի հետ երկխոսության երանգ։',
    examples: [
      { es: 'Algún día hemos de volver a este lugar hermoso.', hy: 'Մի օր մենք անպայման վերադառնալու ենք այս գեղեցիկ վայրը։' },
      { es: 'Has de tener paciencia cuando aprendes un idioma.', hy: 'Պետք է համբերություն ունենաս, երբ լեզու ես սովորում։' },
      { es: 'No he de rendirme aunque el camino sea largo.', hy: 'Ես չեմ հանձնվելու, նույնիսկ եթե ճանապարհը երկար լինի։' },
    ],
    conjugationTable: {
      titleEs: 'Presente de haber + de + infinitivo',
      titleHy: 'Haber բայի ներկան «de + infinitivo»-ի հետ',
      headers: ['Pronombre', 'haber de + alcanzar'],
      rows: [
        { pronoun: 'yo', forms: ['he de alcanzar'] },
        { pronoun: 'tú', forms: ['has de alcanzar'] },
        { pronoun: 'él / ella', forms: ['ha de alcanzar'] },
        { pronoun: 'nosotros/as', forms: ['hemos de alcanzar'] },
        { pronoun: 'ellos / ellas', forms: ['han de alcanzar'] },
      ],
    },
    practice: [
      {
        id: 'g9_p1',
        promptEs: 'Nosotros ______ seguir luchando por nuestros sueños.',
        promptHy: 'Մենք ______ շարունակել պայքարել մեր երազանքների համար։ (haber de, nosotros)',
        options: ['hemos de', 'habemos de', 'he de', 'tenemos de'],
        optionsHy: ['պետք է / անպայման պիտի (nosotros)', 'սխալ խոնարհում', 'պիտի (yo — 1-ին դեմք եզակի)', 'սխալ նախդիր (պետք է tener que)'],
        correctIndex: 0,
        explanationHy: '«Haber» բայի nosotros ձևը «hemos» է → hemos de seguir։',
      },
    ],
  },
  {
    id: 'si-presente',
    number: 10,
    titleEs: 'Si + presente de indicativo',
    titleHy: 'Պայմանական նախադասություններ «si + ներկա»-ով (si me quedo)',
    level: 'A2',
    songQuote: 'Pero sé que moriría si me quedo en la mitad',
    songQuoteHy: 'Բայց գիտեմ, որ կմեռնեի, եթե կես ճանապարհին մնայի',
    explanationHy:
      '«Si + presente de indicativo»-ն օգտագործվում է իրական կամ շատ հավանական պայմանների համար (սովորաբար զուգորդվում է presente-ի կամ futuro-ի հետ)։ Երգի խոսակցական-բանաստեղծական լեզվում երբեմն զուգորդվում է condicional-ի (moriría) հետ՝ ներկա պահի վտանգն ավելի սուր զգացնելու համար։ Ուշադրություն՝ «si»-ից հետո երբեք Presente de subjuntivo չի դրվում։',
    whyThisFormHy:
      '«Si me quedo»-ն ցույց է տալիս, որ կես ճանապարհին մնալու վտանգը տեսական չէ, այլ իրական վտանգ է հենց հիմա։',
    examples: [
      { es: 'Si practicas cada día, hablarás español muy bien.', hy: 'Եթե ամեն օր պարապես, շատ լավ իսպաներեն կխոսես։' },
      { es: 'Si me quedo en casa hoy, leeré un buen libro.', hy: 'Եթե այսօր տանը մնամ, մի լավ գիրք կկարդամ։' },
      { es: 'Avísame si necesitas ayuda con la traducción.', hy: 'Տեղեկացրու ինձ, եթե թարգմանության հարցում օգնության կարիք ունենաս։' },
    ],
    practice: [
      {
        id: 'g10_p1',
        promptEs: 'Si ______ miedo, respira profundo y sigue adelante.',
        promptHy: 'Եթե վախ ______, խորը շնչիր և շարունակիր առաջ գնալ։ (tener, tú)',
        options: ['tienes', 'tengas', 'tendrás', 'tenías'],
        optionsHy: ['ունես (ներկա սահմանական)', 'ունենաս (սուբյունկտիվ — «si»-ից հետո սխալ է)', 'կունենաս (ապառնի)', 'ունեիր (անցյալ անկատար)'],
        correctIndex: 0,
        explanationHy: '«Si»-ից հետո երբեք Presente de subjuntivo (tengas) կամ futuro (tendrás) չի դրվում. ճիշտը ներկա սահմանականն է՝ «tienes»։',
      },
    ],
  },
  {
    id: 'para-infinitivo',
    number: 11,
    titleEs: 'Para + infinitivo',
    titleHy: 'Նպատակի արտահայտում (para conocer el mundo)',
    level: 'A1',
    songQuote: 'Por eso vuelo a otros senderos / Para conocer el mundo de verdad',
    songQuoteHy: 'Այդ պատճառով թռչում եմ դեպի այլ ուղիներ / Իսկական աշխարհը ճանաչելու համար',
    explanationHy:
      'Երբ հիմնական նախադասության և նպատակի ենթական նույն անձն է, օգտագործվում է «para + անորոշ դերբայ»։ Հայերենում համապատասխանում է «...-ելու համար» կառուցվածքին։',
    whyThisFormHy:
      'Ե՛վ «vuelo» (ես եմ թռչում), և՛ «conocer» (ես եմ ճանաչելու) գործողությունների ենթական նույնն է՝ հերոսուհին, ուստի՝ para + infinitivo։',
    examples: [
      { es: 'Escucho música latina para aprender vocabulario nuevo.', hy: 'Լատինամերիկյան երաժշտություն եմ լսում՝ նոր բառապաշար սովորելու համար։' },
      { es: 'Salimos temprano para ver el amanecer.', hy: 'Վաղ դուրս եկանք՝ արևածագը տեսնելու համար։' },
      { es: 'Estudio español para viajar por Latinoamérica.', hy: 'Իսպաներեն եմ սովորում՝ Լատինական Ամերիկայով ճամփորդելու համար։' },
    ],
    practice: [
      {
        id: 'g11_p1',
        promptEs: 'Ahorro dinero ______ visitar Buenos Aires.',
        promptHy: 'Գումար եմ խնայում՝ Բուենոս Այրես այցելելու ______։',
        options: ['para', 'por', 'de', 'sin'],
        optionsHy: ['համար (նպատակ)', 'պատճառով / փոխարեն', 'մասին / -ից', 'առանց'],
        correctIndex: 0,
        explanationHy: 'Նպատակը («այցելելու համար») միշտ արտահայտվում է «para + infinitivo»-ով։',
      },
    ],
  },
  {
    id: 'por-eso',
    number: 12,
    titleEs: 'Por eso',
    titleHy: 'Հետևանքի արտահայտում (por eso vuelo)',
    level: 'A1',
    songQuote: 'Pero sé que moriría si me quedo en la mitad / Por eso vuelo a otros senderos',
    songQuoteHy: 'Բայց գիտեմ, որ կմեռնեի, եթե կես ճանապարհին մնայի / Այդ պատճառով թռչում եմ դեպի այլ ուղիներ',
    explanationHy:
      '«Por eso»-ն («այդ պատճառով») կապում է պատճառը իր տրամաբանական հետևանքի հետ։ Ուշադրություն՝ «porque»-ն ներկայացնում է պատճառը («որովհետև»), իսկ «por eso»-ն՝ արդյունքը («այդ պատճառով»)։',
    whyThisFormHy:
      'Կես ճանապարհին մնալու վտանգը դառնում է ուղղակի պատճառ, իսկ նոր ուղիներ փնտրելը՝ դրա հետևանքը։',
    examples: [
      { es: 'Me encanta esta canción; por eso la canto todos los días.', hy: 'Շատ եմ սիրում այս երգը, այդ պատճառով ամեն օր երգում եմ այն։' },
      { es: 'Hoy llueve mucho, por eso llevo paraguas.', hy: 'Այսօր ուժեղ անձրև է գալիս, այդ պատճառով անձրևանոց եմ վերցնում։' },
      { es: 'Quiero cambiar mi rutina; por eso empecé clases de baile.', hy: 'Ուզում եմ փոխել առօրյաս, այդ պատճառով պարի դասերի սկսեցի գնալ։' },
    ],
    practice: [
      {
        id: 'g12_p1',
        promptEs: 'Estaba muy cansada, ______ decidí descansar.',
        promptHy: 'Շատ հոգնած էի, ______ որոշեցի հանգստանալ։',
        options: ['porque', 'por eso', 'pero', 'para'],
        optionsHy: ['որովհետև (պատճառ)', 'այդ պատճառով (հետևանք)', 'բայց (հակադրություն)', 'համար (նպատակ)'],
        correctIndex: 1,
        explanationHy: 'Երկրորդ մասը հոգնածության հետևանքն է, ուստի պետք է «por eso» («այդ պատճառով»)։',
      },
    ],
  },
  {
    id: 'aun-no',
    number: 13,
    titleEs: 'Aún no',
    titleHy: 'Ժամանակային արտահայտություն (aún no es tarde)',
    level: 'A2',
    songQuote: 'Aún no es tarde pero así me estoy sintiendo',
    songQuoteHy: 'Դեռ ուշ չէ, բայց հենց այդպես եմ ինձ զգում',
    explanationHy:
      '«Aún» (շեշտով) նշանակում է «դեռ» (= todavía)։ «Aún no» նշանակում է «դեռ ոչ»՝ ցույց տալով, որ ինչ-որ բան դեռ չի ավարտվել կամ տեղի չի ունեցել։ (Առանց շեշտի «aun» նշանակում է «նույնիսկ» = incluso)։',
    whyThisFormHy:
      'Շեշտում է հույսը. ժամանակը դեռ սպառված չէ, դեռ կարելի է փոխել կյանքը։',
    examples: [
      { es: 'Aún no he visitado Uruguay, pero está en mi lista.', hy: 'Դեռ չեմ այցելել Ուրուգվայ, բայց այն իմ ցուցակում է։' },
      { es: 'Aún no terminamos la clase, faltan diez minutos.', hy: 'Դեռ չենք ավարտել դասը, տասը րոպե է մնացել։' },
      { es: 'Tranquilo, aún no es demasiado tarde para empezar.', hy: 'Հանգիստ եղիր, դեռ շատ ուշ չէ սկսելու համար։' },
    ],
    practice: [
      {
        id: 'g13_p1',
        promptEs: '______ no conozco toda la letra de memoria.',
        promptHy: '______ չգիտեմ ամբողջ տեքստը անգիր։',
        options: ['Aún', 'Ya', 'Nunca', 'Siempre'],
        optionsHy: ['դեռ (aún no = դեռ ոչ)', 'արդեն (ya no = այլևս ոչ)', 'երբեք', 'միշտ'],
        correctIndex: 0,
        explanationHy: '«Դեռ» (= todavía) իմաստով «aún»-ը գրվում է շեշտով (tilde) → Aún no։',
      },
    ],
  },
  {
    id: 'cambiar-por',
    number: 14,
    titleEs: 'Cambiar algo por algo',
    titleHy: 'Փոխանակման կառուցվածք (cambio dolor por libertad)',
    level: 'A2',
    songQuote: 'Cambio dolor por libertad / Cambio heridas por un sueño',
    songQuoteHy: 'Ցավը փոխանակում եմ ազատության հետ / Վերքերը փոխանակում եմ մի երազանքի հետ',
    explanationHy:
      'Իսպաներենում փոխանակման, փոխարինման համար միշտ օգտագործվում է «por» նախդիրը (cambiar A por B)։ Սա տարբերվում է «cambiar de + գոյական»-ից (cambiar de casa, cambiar de opinión — փոխել տունը/կարծիքը)։',
    whyThisFormHy:
      '«Por»-ը ցույց է տալիս հավասարակշռված փոխանակում՝ հրաժարվում եմ ցավից և դրա դիմաց ստանում եմ ազատություն։',
    examples: [
      { es: 'Quiero cambiar esta camisa por una talla más grande.', hy: 'Ուզում եմ այս վերնաշապիկը փոխանակել ավելի մեծ չափսի հետ։' },
      { es: 'No cambiaría mi tranquilidad por nada del mundo.', hy: 'Իմ հանգստությունը չէի փոխանակի աշխարհի ոչ մի բանի հետ։' },
      { es: 'Hoy cambié el café por un té caliente.', hy: 'Այսօր սուրճը փոխարինեցի տաք թեյով։' },
    ],
    practice: [
      {
        id: 'g14_p1',
        promptEs: 'Cambio mis miedos ______ nuevas aventuras.',
        promptHy: 'Վախերս փոխանակում եմ նոր արկածների ______։',
        options: ['por', 'para', 'con', 'a'],
        optionsHy: ['հետ / փոխարեն (փոխանակում)', 'համար (նպատակ)', 'հետ (միասին)', 'դեպի'],
        correctIndex: 0,
        explanationHy: 'Փոխանակումը իսպաներենում միշտ արտահայտվում է «por» նախդիրով → cambiar A por B։',
      },
    ],
  },
  {
    id: 'oraciones-relativo',
    number: 15,
    titleEs: 'Oraciones de relativo con «que»',
    titleHy: 'Հարաբերական նախադասություններ «que»-ով',
    level: 'B1',
    songQuote: 'Un sueño que me ayude a continuar / Algo que no he de alcanzar',
    songQuoteHy: 'Մի երազանք, որն ինձ կօգնի շարունակել / Մի բան, որին չեմ կարող հասնել',
    explanationHy:
      '«Que» հարաբերական դերանունը կապում է գոյականը նրան նկարագրող երկրորդական նախադասության հետ։ Եթե գոյականը հայտնի և իրական է՝ դրվում է indicativo (Tengo un sueño que me hace feliz), իսկ եթե անհայտ կամ փնտրվող՝ subjuntivo (Busco un sueño que me ayude)։',
    whyThisFormHy:
      'Երգը հրաշալի ցույց է տալիս, թե ինչպես է «que»-ն նկարագրում թե՛ երազանքը (que me ayude), թե՛ վախերը (que no me dejan pensar)։',
    examples: [
      { es: 'Esta es la canción que me enseñó muchas palabras nuevas.', hy: 'Սա այն երգն է, որն ինձ շատ նոր բառեր սովորեցրեց։' },
      { es: 'Necesito un consejo que me dé claridad.', hy: 'Ինձ պետք է մի խորհուրդ, որն ինձ հստակություն կտա։' },
      { es: 'Conocí personas que aman la música tanto como yo.', hy: 'Ծանոթացա մարդկանց հետ, որոնք ինձ պես սիրում են երաժշտությունը։' },
    ],
    practice: [
      {
        id: 'g15_p1',
        promptEs: 'Tengo una amiga que ______ tres idiomas. (hablar — persona real y conocida)',
        promptHy: 'Ունեմ մի ընկերուհի, որը երեք լեզու ______։ (խոսել — իրական և ծանոթ անձ)',
        options: ['habla', 'hable', 'hablaría', 'hablando'],
        optionsHy: ['խոսում է (ներկա սահմանական)', 'խոսի (սուբյունկտիվ)', 'կխոսեր (պայմանական)', 'խոսելով (gerundio)'],
        correctIndex: 0,
        explanationHy: 'Երբ խոսվում է իրական, հայտնի մարդու կամ առարկայի մասին, «que»-ից հետո օգտագործվում է indicativo → habla։',
      },
    ],
  },
  {
    id: 'verbos-pronominales',
    number: 16,
    titleEs: 'Verbos pronominales (quedarse, sentirse)',
    titleHy: 'Դերանվանական բայեր (me quedo, me estoy sintiendo)',
    level: 'A2',
    songQuote: 'Si me quedo en la mitad / Así me estoy sintiendo',
    songQuoteHy: 'Եթե կես ճանապարհին մնամ / Այդպես եմ ինձ զգում',
    explanationHy:
      'Դերանվանական բայերը խոնարհվում են me, te, se, nos, os, se դերանուններով։ «Quedarse» նշանակում է «մնալ մի տեղում/վիճակում» (ի տարբերություն «quedar»-ի՝ պայմանավորվել կամ մնացորդ ունենալ), իսկ «sentirse»՝ «իրեն զգալ» (ածականով կամ մակբայով՝ me siento bien / así)։',
    whyThisFormHy:
      'Այս երկու բայերը ներկայացնում են հերոսուհու ներքին աշխարհն ու անձնական դիրքը («ես մնում եմ», «ես ինձ զգում եմ»)։',
    examples: [
      { es: 'Me quedo diez minutos más para terminar el ejercicio.', hy: 'Տասը րոպե էլ եմ մնում՝ վարժությունն ավարտելու համար։' },
      { es: '¿Cómo te sientes hoy después de descansar?', hy: 'Ինչպե՞ս ես քեզ զգում այսօր հանգստանալուց հետո։' },
      { es: 'Nos sentimos muy orgullosos de nuestro progreso.', hy: 'Մենք մեզ շատ հպարտ ենք զգում մեր առաջընթացով։' },
    ],
    conjugationTable: {
      titleEs: 'Conjugación de quedarse y sentirse en Presente',
      titleHy: 'Quedarse և sentirse բայերի ներկա խոնարհումը',
      headers: ['Pronombre', 'quedarse', 'sentirse (e → ie)'],
      rows: [
        { pronoun: 'yo', forms: ['me quedo', 'me siento'] },
        { pronoun: 'tú', forms: ['te quedas', 'te sientes'] },
        { pronoun: 'él / ella', forms: ['se queda', 'se siente'] },
        { pronoun: 'nosotros/as', forms: ['nos quedamos', 'nos sentimos'] },
        { pronoun: 'ellos / ellas', forms: ['se quedan', 'se sienten'] },
      ],
    },
    practice: [
      {
        id: 'g16_p1',
        promptEs: 'Después de escuchar música alegre, yo ______ mucho mejor.',
        promptHy: 'Ուրախ երաժշտություն լսելուց հետո ես ինձ շատ ավելի լավ ______։ (sentirse, yo)',
        options: ['me siento', 'siento me', 'te sientes', 'se siente'],
        optionsHy: ['ինձ զգում եմ (yo — ճիշտ ձև)', 'սխալ դերանվան դիրք', 'քեզ զգում ես (tú)', 'իրեն զգում է (él/ella)'],
        correctIndex: 0,
        explanationHy: '«Sentirse»-ն ունի e → ie փոփոխություն և 1-ին դեմքում «me» դերանուն՝ me siento։',
      },
    ],
  },
  {
    id: 'metaforas',
    number: 17,
    titleEs: 'Lenguaje figurado y metáforas',
    titleHy: 'Պատկերավոր լեզու և փոխաբերություններ',
    level: 'B2',
    songQuote: 'Vuelo a otros senderos / Cambio heridas por un sueño / Moriría si me quedo en la mitad',
    songQuoteHy: 'Թռչում եմ դեպի այլ ուղիներ / Վերքերը փոխանակում եմ երազանքի հետ / Կմեռնեի, եթե կեսին մնայի',
    explanationHy:
      'Երգի բառերը միայն բառացի իմաստ չունեն։ Իսպանախոս մշակույթում հույզերը հաճախ արտահայտվում են հիպերբոլայով (չափազանցություն՝ «moriría»), փոխաբերությամբ («heridas» = հոգեկան ցավ, «volar» = ազատվել, «senderos» = կյանքի ընտրություններ) և հակադրությամբ («dolor» ↔ «felicidad»)։',
    whyThisFormHy:
      'Պատկերավոր լեզուն օգնում է ոչ միայն թարգմանել բառերը, այլ զգալ երգի տրամադրությունն ու խորությունը՝ ինչպես լեզվակիրները։',
    examples: [
      { es: 'El tiempo cura las heridas del corazón.', hy: 'Ժամանակը բուժում է սրտի վերքերը։' },
      { es: 'Cada persona elige su propio sendero en la vida.', hy: 'Յուրաքանչյուր մարդ կյանքում ընտրում է իր սեփական ուղին։' },
      { es: 'Cuando bailo, siento que puedo volar.', hy: 'Երբ պարում եմ, զգում եմ, թե կարող եմ թռչել։' },
    ],
    practice: [
      {
        id: 'g17_p1',
        promptEs: '¿Qué significa la expresión metafórica «quedarse en la mitad» en la canción?',
        promptHy: 'Ի՞նչ է նշանակում «quedarse en la mitad» փոխաբերական արտահայտությունը երգում։',
        options: [
          'Detenerse y conformarse con una vida incompleta',
          'Llegar tarde a una estación de tren',
          'Dividir una canción en dos partes',
          'Olvidar la letra del coro',
        ],
        optionsHy: [
          'Կանգ առնել և համակերպվել կիսատ կյանքի հետ',
          'Ուշանալ գնացքի կայարանից',
          'Երգը բաժանել երկու մասի',
          'Մոռանալ կրկներգի բառերը',
        ],
        correctIndex: 0,
        explanationHy: 'Երգում «en la mitad»-ը նշանակում է կիսատ մնալ, չհասնել երազանքին և հրաժարվել լիարժեք կյանքից։',
      },
    ],
  },
];
