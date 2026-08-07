import type { Lang } from "@/lib/i18n";

export type MissionStatus = "playable" | "soon";

export type Bi = Record<Lang, string>;

export type Mission = {
  id: number;
  status: MissionStatus;
  color: string; // css color token
  icon: string;
  title: Bi;
  teaser: Bi;
  mentor: Bi;
  x: number; // % position on desktop constellation
  y: number;
};

export const missions: Mission[] = [
  {
    id: 1,
    status: "soon",
    color: "var(--danger)",
    icon: "user-lock",
    x: 12,
    y: 12,
    title: { ro: "Contul compromis", ru: "Взломанный аккаунт" },
    mentor: { ro: "Mentor: profesorul", ru: "Наставник: учитель" },
    teaser: {
      ro: "Parola ta a apărut într-o scurgere de date și cineva intră în contul tău din alt oraș. Vei învăța semnele unui cont compromis și cum să activezi autentificarea în doi pași.",
      ru: "Твой пароль попал в утечку, и кто-то входит в аккаунт из другого города. Ты научишься видеть признаки взлома и включать двухфакторную аутентификацию.",
    },
  },
  {
    id: 2,
    status: "playable",
    color: "var(--neon)",
    icon: "phone-call",
    x: 8,
    y: 36,
    title: { ro: "Apelul fals de la operator", ru: "Фальшивый звонок оператора" },
    mentor: { ro: "Mentor: mama", ru: "Наставник: мама" },
    teaser: {
      ro: "Un „operator” te sună și cere codul din SMS.",
      ru: "«Оператор» звонит и просит код из SMS.",
    },
  },
  {
    id: 3,
    status: "soon",
    color: "var(--gold)",
    icon: "gift",
    x: 8,
    y: 60,
    title: { ro: "Scam sau ofertă reală?", ru: "Скам или реальное предложение?" },
    mentor: { ro: "Mentor: antreprenoarea", ru: "Наставник: предпринимательница" },
    teaser: {
      ro: "Un premiu, un job și un grant îți apar în aceeași zi. Doar unul e real. Vei învăța să verifici sursa, plata „de garanție” și presiunea timpului.",
      ru: "Приз, вакансия и грант приходят в один день. Реален только один. Ты научишься проверять источник, «залоговый» платёж и давление сроками.",
    },
  },
  {
    id: 4,
    status: "playable",
    color: "var(--violet)",
    icon: "scan-face",
    x: 12,
    y: 84,
    title: { ro: "Deepfake Detective", ru: "Детектив дипфейков" },
    mentor: { ro: "Mentor: elevul-martor", ru: "Наставник: школьник-свидетель" },
    teaser: {
      ro: "Un video manipulat circulă în oraș.",
      ru: "По городу разошлось поддельное видео.",
    },
  },
  {
    id: 5,
    status: "playable",
    color: "var(--success)",
    icon: "languages",
    x: 88,
    y: 84,
    title: { ro: "Detectivul bilingv", ru: "Двуязычный детектив" },
    mentor: { ro: "Mentor: eleva-martoră", ru: "Наставница: школьница-свидетель" },
    teaser: {
      ro: "Același mesaj, două limbi, alte emoții.",
      ru: "Одно сообщение, два языка, разные эмоции.",
    },
  },
  {
    id: 6,
    status: "soon",
    color: "var(--neon-soft)",
    icon: "map-pin",
    x: 92,
    y: 60,
    title: { ro: "Orașul sub asediul zvonurilor", ru: "Город под осадой слухов" },
    mentor: { ro: "Mentor: profesorul", ru: "Наставник: учитель" },
    teaser: {
      ro: "Un zvon pornește dintr-un grup de cartier și în două ore ajunge în tot orașul. Vei urmări harta răspândirii și vei învăța cum se oprește dezinformarea.",
      ru: "Слух стартует в районном чате и через два часа охватывает весь город. Ты проследишь карту распространения и научишься останавливать дезинформацию.",
    },
  },
  {
    id: 7,
    status: "soon",
    color: "var(--violet)",
    icon: "shield-alert",
    x: 92,
    y: 36,
    title: { ro: "Apără comunitatea de troli", ru: "Защити сообщество от троллей" },
    mentor: { ro: "Mentor: VIG", ru: "Наставник: VIG" },
    teaser: {
      ro: "Comentariile se transformă în ceartă între vecini. VIG apare și te învață să răspunzi la agresiune fără să alimentezi conflictul.",
      ru: "Комментарии превращаются в ссору между соседями. Появляется VIG и учит отвечать на агрессию, не разжигая конфликт.",
    },
  },
  {
    id: 8,
    status: "soon",
    color: "var(--gold)",
    icon: "link-2-off",
    x: 88,
    y: 12,
    title: { ro: "Capcana linkului fals", ru: "Ловушка фальшивой ссылки" },
    mentor: { ro: "Mentor: expertul tehnic", ru: "Наставник: технический эксперт" },
    teaser: {
      ro: "Un QR de pe un afiș din centru duce la o pagină de login aproape identică. Vei învăța să citești adresa, domeniul și formularul fals.",
      ru: "QR-код с афиши в центре ведёт на почти идентичную страницу входа. Ты научишься читать адрес, домен и поддельную форму.",
    },
  },
];

export const playableIds = missions.filter((m) => m.status === "playable").map((m) => m.id);

/* ------------------------- Mission 2: fake operator call ------------------------- */

export type CallOption = {
  text: Bi;
  kind: "safe" | "risky" | "leak" | "hangup";
};

export type CallTurn = { caller: Bi; options: CallOption[] };

export const mission2 = {
  brief: {
    ro: "„Am primit exact același apel săptămâna trecută”, spune mama din Patrula InfoQuest. „Vocea era calmă, profesionistă — și aproape am dictat codul. Ascultă cu atenție și alege ce spui.”",
    ru: "«Мне звонили точно так же на прошлой неделе, — говорит мама из Патруля InfoQuest. — Голос был спокойный, профессиональный, и я почти продиктовала код. Слушай внимательно и выбирай, что сказать».",
  },
  callerName: { ro: "Serviciul Clienți (necunoscut)", ru: "Служба поддержки (неизвестный)" },
  turns: [
    {
      caller: {
        ro: "Bună ziua! Vă deranjez de la serviciul tehnic al operatorului. Am detectat o tentativă de conectare la contul dumneavoastră.",
        ru: "Здравствуйте! Беспокою из технической службы оператора. Мы зафиксировали попытку входа в ваш аккаунт.",
      },
      options: [
        {
          kind: "safe",
          text: {
            ro: "De unde știu că sunteți chiar operatorul meu?",
            ru: "Откуда я знаю, что вы действительно мой оператор?",
          },
        },
        {
          kind: "risky",
          text: { ro: "Ce trebuie să fac acum?", ru: "Что мне нужно сделать сейчас?" },
        },
      ],
    },
    {
      caller: {
        ro: "Vă transmit chiar acum un SMS de verificare. Citiți-mi cele 6 cifre ca să blocăm accesul intrusului.",
        ru: "Сейчас отправляю вам проверочное SMS. Продиктуйте мне 6 цифр, чтобы мы заблокировали доступ злоумышленнику.",
      },
      options: [
        {
          kind: "leak",
          text: { ro: "Bine, codul este 4 8 2 9 1 7.", ru: "Хорошо, код 4 8 2 9 1 7." },
        },
        {
          kind: "safe",
          text: {
            ro: "Nu dictez niciun cod. Închid și sun la numărul oficial de pe factură.",
            ru: "Никакой код я не диктую. Я перезвоню по официальному номеру из счёта.",
          },
        },
        {
          kind: "risky",
          text: {
            ro: "Pot să vă spun doar primele trei cifre?",
            ru: "А можно я скажу только первые три цифры?",
          },
        },
      ],
    },
    {
      caller: {
        ro: "Dacă închideți, contul se blochează definitiv în 2 minute! Grăbiți-vă, vă rog.",
        ru: "Если вы прервёте звонок, аккаунт будет заблокирован навсегда через 2 минуты! Пожалуйста, поторопитесь.",
      },
      options: [
        {
          kind: "hangup",
          text: {
            ro: "Închid apelul și blochez numărul.",
            ru: "Заканчиваю звонок и блокирую номер.",
          },
        },
        {
          kind: "leak",
          text: { ro: "Bine, bine — codul este 4 8 2 9 1 7.", ru: "Ладно, ладно — код 4 8 2 9 1 7." },
        },
      ],
    },
  ] as CallTurn[],
  goodOutcome: {
    ro: "Apel încheiat, numărul e în lista neagră. Ai raportat numărul operatorului real: alți locuitori primesc o avertizare. Umbra a pierdut o fisură din scut.",
    ru: "Звонок сброшен, номер в чёрном списке. Ты сообщил номер настоящему оператору: другие жители получают предупреждение. Тень потеряла одну трещину в щите.",
  },
  badOutcome: {
    ro: "Codul a fost dictat. În 40 de secunde contul e preluat, parola schimbată și mesajele tale sunt folosite ca să ceară bani prietenilor tăi.",
    ru: "Код продиктован. Через 40 секунд аккаунт захвачен, пароль изменён, а от твоего имени у друзей просят деньги.",
  },
  theory: {
    ro: [
      "Nicio bancă și niciun operator nu cere codul din SMS — nici măcar parțial.",
      "Urgența artificială („în 2 minute!”) este semnalul principal al fraudei.",
      "Închide și sună singur la numărul oficial de pe factură sau de pe cardul tău.",
      "Codul din SMS este o cheie de unică folosință: cine îl are, intră în cont.",
      "Raportează numărul operatorului și avertizează familia.",
    ],
    ru: [
      "Ни один банк и ни один оператор не просит код из SMS — даже частично.",
      "Искусственная срочность («через 2 минуты!») — главный признак мошенничества.",
      "Заверши звонок и перезвони сам по официальному номеру из счёта или с карты.",
      "Код из SMS — одноразовый ключ: у кого он есть, тот входит в аккаунт.",
      "Сообщи номер оператору и предупреди семью.",
    ],
  },
  badge: { ro: "Insigna „Linie sigură”", ru: "Бейдж «Безопасная линия»" },
};

/* ------------------------- Mission 4: deepfake detective ------------------------- */

export type Clue = {
  id: string;
  real: boolean;
  label: Bi;
  explain: Bi;
};

export const mission4 = {
  brief: {
    ro: "„Videoclipul a apărut în grupul școlii noaptea”, spune elevul-martor. „Primarul pare să anunțe închiderea liceului. Deschide tabla de probe și caută semnele manipulării.”",
    ru: "«Видео появилось в школьном чате ночью, — говорит школьник-свидетель. — Мэр как будто объявляет о закрытии лицея. Открой доску доказательств и найди признаки подделки».",
  },
  videoCaption: {
    ro: "Înregistrare virală: „Anunț urgent al primăriei”",
    ru: "Виральная запись: «Срочное объявление мэрии»",
  },
  clues: [
    {
      id: "blink",
      real: true,
      label: { ro: "Clipire nefirească a ochilor", ru: "Неестественное мигание глаз" },
      explain: {
        ro: "Modelele generative clipesc rar sau prea regulat.",
        ru: "Генеративные модели мигают редко или слишком ритмично.",
      },
    },
    {
      id: "lips",
      real: true,
      label: { ro: "Buzele nu se potrivesc cu sunetul", ru: "Губы не совпадают со звуком" },
      explain: {
        ro: "Sincronizarea audio-video se rupe la consoane.",
        ru: "Синхронизация звука и губ ломается на согласных.",
      },
    },
    {
      id: "edge",
      real: true,
      label: { ro: "Artefacte pe conturul feței", ru: "Артефакты по контуру лица" },
      explain: {
        ro: "Marginea feței tremură sau se estompează la mișcare.",
        ru: "Край лица дрожит или размывается при движении.",
      },
    },
    {
      id: "light",
      real: true,
      label: { ro: "Lumină și umbre contradictorii", ru: "Противоречивый свет и тени" },
      explain: {
        ro: "Fața e luminată din stânga, fundalul din dreapta.",
        ru: "Лицо освещено слева, фон — справа.",
      },
    },
    {
      id: "logo",
      real: false,
      label: { ro: "Sigla instituției în colț", ru: "Логотип учреждения в углу" },
      explain: {
        ro: "O siglă nu dovedește nimic — se copiază în 5 secunde.",
        ru: "Логотип ничего не доказывает — он копируется за 5 секунд.",
      },
    },
    {
      id: "shaky",
      real: false,
      label: { ro: "Camera tremură puțin", ru: "Камера немного дрожит" },
      explain: {
        ro: "Tremurul apare și în filmările reale, de mână.",
        ru: "Дрожание бывает и в настоящих съёмках с рук.",
      },
    },
  ] as Clue[],
  verdicts: {
    fake: { ro: "Este deepfake", ru: "Это дипфейк" },
    real: { ro: "Este video real", ru: "Это реальное видео" },
  },
  goodOutcome: {
    ro: "Corect: e un deepfake. Originalul arată primarul vorbind despre reparația unui parc. Vocea a fost clonată, iar fraza despre liceu — adăugată.",
    ru: "Верно: это дипфейк. В оригинале мэр говорит о ремонте парка. Голос клонировали, а фразу про лицей добавили.",
  },
  badOutcome: {
    ro: "Videoclipul era un deepfake. Prin distribuire, 400 de părinți au crezut anunțul fals și au sunat la școală într-o singură oră.",
    ru: "Видео было дипфейком. Из-за пересылки 400 родителей поверили фальшивке и за час позвонили в школу.",
  },
  theory: {
    ro: [
      "Verifică clipirea și sincronizarea buzelor cu sunetul.",
      "Privește conturul feței, urechile și dinții — acolo apar artefactele.",
      "Compară lumina de pe față cu lumina din fundal.",
      "Caută originalul pe canalul oficial înainte să distribui.",
      "Un logo, o siglă sau o cameră tremurată nu dovedesc autenticitatea.",
    ],
    ru: [
      "Проверь мигание и синхронность губ со звуком.",
      "Смотри на контур лица, уши и зубы — там появляются артефакты.",
      "Сравни свет на лице со светом на фоне.",
      "Найди оригинал на официальном канале прежде чем делиться.",
      "Логотип, эмблема или дрожащая камера не доказывают подлинность.",
    ],
  },
  badge: { ro: "Insigna „Ochi digital”", ru: "Бейдж «Цифровой глаз»" },
};

/* ------------------------- Mission 5: bilingual detective ------------------------- */

export type Token = { text: string; manipulative?: boolean; note?: Bi };

export const mission5 = {
  brief: {
    ro: "„Aceeași știre circulă în oraș în două limbi”, spune eleva-martoră. „Faptul e identic, dar una din versiuni te face să te temi. Marchează cuvintele adăugate.”",
    ru: "«Одна и та же новость ходит по городу на двух языках, — говорит школьница-свидетель. — Факт один, но одна версия заставляет бояться. Отметь добавленные слова».",
  },
  factNote: {
    ro: "Faptul verificat: apa se oprește 4 ore pentru lucrări planificate pe strada Ștefan cel Mare.",
    ru: "Проверенный факт: воду отключают на 4 часа из-за плановых работ на улице Штефана чел Маре.",
  },
  ro: {
    label: "Versiunea RO",
    tokens: [
      { text: "Anunț:" },
      { text: "apa" },
      { text: "va" },
      { text: "fi" },
      { text: "oprită" },
      { text: "4" },
      { text: "ore" },
      { text: "pe" },
      { text: "strada" },
      { text: "Ștefan" },
      { text: "cel" },
      { text: "Mare" },
      { text: "pentru" },
      { text: "lucrări" },
      { text: "planificate." },
    ] as Token[],
  },
  ru: {
    label: "Версия RU",
    tokens: [
      { text: "СРОЧНО!!!", manipulative: true, note: { ro: "Urgență falsă adăugată.", ru: "Добавлена ложная срочность." } },
      { text: "Воду" },
      {
        text: "полностью",
        manipulative: true,
        note: { ro: "Amplificator absent în original.", ru: "Усилитель, которого нет в оригинале." },
      },
      { text: "отключают" },
      { text: "на" },
      { text: "4" },
      { text: "часа" },
      { text: "на" },
      { text: "улице" },
      { text: "Штефана" },
      { text: "чел" },
      { text: "Маре" },
      { text: "—" },
      {
        text: "власти",
        manipulative: true,
        note: { ro: "Se introduce un „vinovat”, absent din fapt.", ru: "Вводится «виновник», которого нет в факте." },
      },
      {
        text: "скрывают",
        manipulative: true,
        note: { ro: "Acuzație inventată.", ru: "Придуманное обвинение." },
      },
      { text: "причину." },
      {
        text: "Запасайтесь",
        manipulative: true,
        note: { ro: "Chemare la panică.", ru: "Призыв к панике." },
      },
      { text: "срочно!" },
    ] as Token[],
  },
  goodOutcome: {
    ro: "Ai izolat manipulările: faptul rămâne același, dar versiunea RU adaugă panică și un vinovat inventat. Vecinii primesc informația calmă, fără cozi la magazin.",
    ru: "Ты выделил манипуляции: факт тот же, но версия RU добавляет панику и придуманного виновника. Соседи получают спокойную информацию, без очередей в магазине.",
  },
  badOutcome: {
    ro: "O parte din manipulări au trecut neobservate, iar versiunea emoțională s-a răspândit mai repede decât faptul.",
    ru: "Часть манипуляций осталась незамеченной, и эмоциональная версия разошлась быстрее факта.",
  },
  theory: {
    ro: [
      "Compară versiunile în ambele limbi: faptul trebuie să fie identic.",
      "Cuvintele „urgent”, „complet”, „ascund” adaugă emoție, nu informație.",
      "Un „vinovat” apărut doar în traducere este semn de manipulare.",
      "Chemările la acțiune imediată („cumpărați acum”) provoacă panică.",
      "Verifică sursa oficială înainte de a retransmite în celălalt grup lingvistic.",
    ],
    ru: [
      "Сравнивай версии на двух языках: факт должен быть одинаковым.",
      "Слова «срочно», «полностью», «скрывают» добавляют эмоцию, а не информацию.",
      "«Виновник», появившийся только в переводе, — признак манипуляции.",
      "Призывы к немедленным действиям («покупайте сейчас») создают панику.",
      "Проверь официальный источник, прежде чем пересылать в другую языковую группу.",
    ],
  },
  badge: { ro: "Insigna „Punte lingvistică”", ru: "Бейдж «Языковой мост»" },
};

export const badgeByMission: Record<number, Bi> = {
  2: mission2.badge,
  4: mission4.badge,
  5: mission5.badge,
};
