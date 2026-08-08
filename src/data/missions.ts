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
    status: "playable",
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
    status: "playable",
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
    status: "playable",
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
    status: "playable",
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
    status: "playable",
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


/* ------------------------- Generic mission shapes ------------------------- */

export type ChecklistItem = { id: string; label: Bi; explain: Bi; correct: boolean };

export type Reactions = {
  good: { characterId: string; emotion: EmotionName; line: Bi };
  bad: { characterId: string; emotion: EmotionName; line: Bi };
};

export type EmotionName = "joy" | "proud" | "calm" | "worried" | "sad" | "angry";

export type ChecklistMission = {
  brief: Bi;
  prompt: Bi;
  scene: Bi;
  items: ChecklistItem[];
  minCorrect: number;
  goodOutcome: Bi;
  badOutcome: Bi;
  theory: Record<Lang, string[]>;
  badge: Bi;
  reactions: Reactions;
};

export type PickCard = { id: string; title: Bi; body: Bi; real: boolean; explain: Bi };

export type PickMission = {
  brief: Bi;
  prompt: Bi;
  cards: PickCard[];
  goodOutcome: Bi;
  badOutcome: Bi;
  theory: Record<Lang, string[]>;
  badge: Bi;
  reactions: Reactions;
};

export type ChatMission = {
  brief: Bi;
  callerName: Bi;
  turns: CallTurn[];
  goodOutcome: Bi;
  badOutcome: Bi;
  theory: Record<Lang, string[]>;
  badge: Bi;
  reactions: Reactions;
};

/* ------------------------- Mission 1: compromised account ------------------------- */

export const mission1: ChecklistMission = {
  brief: {
    ro: "„Parola ta a apărut într-o scurgere de date”, spune Andrei, profesorul de informatică. „Contul tău a fost accesat azi-noapte din alt oraș. Alege TOATE acțiunile corecte pentru primele 10 minute.”",
    ru: "«Твой пароль попал в утечку, — говорит Андрей, учитель информатики. — Ночью в аккаунт зашли из другого города. Выбери ВСЕ правильные действия на первые 10 минут».",
  },
  scene: {
    ro: "Notificare: „Conectare nouă — Chișinău, dispozitiv necunoscut, ora 03:14”. Ai și un e-mail de schimbare a parolei pe care nu l-ai cerut.",
    ru: "Уведомление: «Новый вход — Кишинёв, неизвестное устройство, 03:14». Ещё пришло письмо о смене пароля, которую ты не запрашивал.",
  },
  prompt: {
    ro: "Bifează acțiunile corecte:",
    ru: "Отметь правильные действия:",
  },
  items: [
    {
      id: "pass",
      correct: true,
      label: { ro: "Schimbă imediat parola cu una lungă și unică", ru: "Сразу смени пароль на длинный и уникальный" },
      explain: {
        ro: "Parola veche e deja publică — trebuie înlocuită peste tot unde era refolosită.",
        ru: "Старый пароль уже публичен — его надо заменить везде, где он повторялся.",
      },
    },
    {
      id: "2fa",
      correct: true,
      label: { ro: "Activează autentificarea în doi pași (2FA)", ru: "Включи двухфакторную аутентификацию (2FA)" },
      explain: {
        ro: "Chiar dacă parola scapă din nou, intrusul nu are al doilea factor.",
        ru: "Даже если пароль снова утечёт, у злоумышленника не будет второго фактора.",
      },
    },
    {
      id: "sessions",
      correct: true,
      label: { ro: "Închide toate sesiunile active de pe alte dispozitive", ru: "Заверши все активные сессии на других устройствах" },
      explain: {
        ro: "Fără asta, intrusul rămâne conectat chiar și după schimbarea parolei.",
        ru: "Иначе злоумышленник остаётся в аккаунте даже после смены пароля.",
      },
    },
    {
      id: "warn",
      correct: true,
      label: { ro: "Avertizează prietenii că din contul tău pot veni cereri de bani", ru: "Предупреди друзей, что с твоего аккаунта могут просить деньги" },
      explain: {
        ro: "Conturile furate sunt folosite pentru a înșela contactele apropiate.",
        ru: "Угнанные аккаунты используют, чтобы обманывать близкие контакты.",
      },
    },
    {
      id: "reply",
      correct: false,
      label: { ro: "Răspunde la e-mailul suspect cerând explicații", ru: "Ответь на подозрительное письмо с просьбой объяснить" },
      explain: {
        ro: "Răspunsul confirmă că adresa e activă și pornește o nouă rundă de atacuri.",
        ru: "Ответ подтверждает, что адрес живой, и запускает новую волну атак.",
      },
    },
    {
      id: "same",
      correct: false,
      label: { ro: "Pune aceeași parolă, dar cu o cifră în plus", ru: "Поставь тот же пароль, но с лишней цифрой" },
      explain: {
        ro: "Variațiile mici sunt primele testate de programele de spargere.",
        ru: "Мелкие вариации — первое, что перебирают программы взлома.",
      },
    },
    {
      id: "wait",
      correct: false,
      label: { ro: "Așteaptă câteva zile, poate a fost o eroare", ru: "Подожди пару дней — вдруг это ошибка" },
      explain: {
        ro: "Fiecare oră de întârziere înseamnă mai multe conturi legate pierdute.",
        ru: "Каждый час промедления — это ещё несколько потерянных связанных аккаунтов.",
      },
    },
  ],
  minCorrect: 4,
  goodOutcome: {
    ro: "Ai închis fisura în 8 minute: parolă nouă, 2FA activat, sesiuni deconectate și prietenii avertizați. Umbra a pierdut accesul.",
    ru: "Ты закрыл трещину за 8 минут: новый пароль, включённая 2FA, отключённые сессии и предупреждённые друзья. Тень потеряла доступ.",
  },
  badOutcome: {
    ro: "Contul a rămas deschis pentru intrus. Peste noapte au fost trimise 60 de mesaje cu cereri de bani către contactele tale.",
    ru: "Аккаунт остался открытым для чужого. За ночь по твоим контактам ушло 60 сообщений с просьбой денег.",
  },
  theory: {
    ro: [
      "O parolă unică pentru fiecare cont — folosește un manager de parole.",
      "2FA oprește majoritatea atacurilor chiar și cu parola scursă.",
      "Deconectează toate sesiunile: schimbarea parolei singură nu alungă intrusul.",
      "Verifică-ți adresa pe un serviciu de scurgeri de date.",
      "Anunță contactele imediat — ei sunt ținta următoare.",
    ],
    ru: [
      "Уникальный пароль для каждого аккаунта — используй менеджер паролей.",
      "2FA останавливает большинство атак даже при утёкшем пароле.",
      "Отключи все сессии: одна смена пароля не выгоняет чужого.",
      "Проверь свою почту в сервисе проверки утечек.",
      "Сразу предупреди контакты — они следующая цель.",
    ],
  },
  badge: { ro: "Insigna „Lacăt dublu”", ru: "Бейдж «Двойной замок»" },
  reactions: {
    good: {
      characterId: "prof",
      emotion: "proud",
      line: {
        ro: "Andrei zâmbește: „Exact așa reacționează un detectiv. Mâine povestești clasei cum ai făcut-o.”",
        ru: "Андрей улыбается: «Вот так и реагирует детектив. Завтра расскажешь классу, как ты это сделал».",
      },
    },
    bad: {
      characterId: "prof",
      emotion: "worried",
      line: {
        ro: "Andrei își strânge fruntea: „Am mai văzut asta. Hai să reluăm — fiecare minut contează.”",
        ru: "Андрей хмурится: «Я это уже видел. Давай заново — тут важна каждая минута».",
      },
    },
  },
};

/* ------------------------- Mission 3: scam or real offer ------------------------- */

export const mission3: PickMission = {
  brief: {
    ro: "„Trei oferte într-o zi”, spune Cristina, antreprenoarea. „Una singură e reală. Citește-le cu ochi de contabil: cine plătește, cui și de ce.”",
    ru: "«Три предложения за один день, — говорит Кристина, предпринимательница. — Реально только одно. Читай глазами бухгалтера: кто платит, кому и за что».",
  },
  prompt: { ro: "Care ofertă este reală?", ru: "Какое предложение настоящее?" },
  cards: [
    {
      id: "prize",
      real: false,
      title: { ro: "Ai câștigat un telefon!", ru: "Ты выиграл телефон!" },
      body: {
        ro: "„Felicitări! Ai fost selectat aleatoriu. Achită doar 350 MDL taxa de livrare în următoarele 30 de minute.”",
        ru: "«Поздравляем! Вы выбраны случайно. Оплатите только 350 MDL за доставку в течение 30 минут».",
      },
      explain: {
        ro: "Un premiu real nu se plătește niciodată de către câștigător. Taxa + cronometru = fraudă.",
        ru: "За настоящий приз победитель никогда не платит. Сбор + таймер = мошенничество.",
      },
    },
    {
      id: "job",
      real: false,
      title: { ro: "Job de acasă, 500 € pe săptămână", ru: "Работа из дома, 500 € в неделю" },
      body: {
        ro: "„Fără experiență, 2 ore pe zi. Trimite datele cardului pentru «verificarea contului» și copia buletinului pe WhatsApp.”",
        ru: "«Без опыта, 2 часа в день. Пришлите данные карты для „проверки счёта“ и копию удостоверения в WhatsApp».",
      },
      explain: {
        ro: "Un angajator nu cere niciodată datele cardului. Salariul nerealist e momeala.",
        ru: "Работодатель никогда не просит данные карты. Нереальная зарплата — приманка.",
      },
    },
    {
      id: "grant",
      real: true,
      title: { ro: "Grant pentru tineri antreprenori", ru: "Грант для молодых предпринимателей" },
      body: {
        ro: "Anunț pe site-ul oficial al primăriei, cu regulament PDF, termen de 3 săptămâni, comisie de evaluare și contact instituțional. Nicio plată în avans.",
        ru: "Объявление на официальном сайте мэрии: регламент в PDF, срок 3 недели, оценочная комиссия и институциональный контакт. Никаких предоплат.",
      },
      explain: {
        ro: "Sursă oficială, reguli publice, termen rezonabil, zero plăți în avans — semnele unei oferte reale.",
        ru: "Официальный источник, публичные правила, разумный срок, ноль предоплат — признаки настоящего предложения.",
      },
    },
  ],
  goodOutcome: {
    ro: "Corect. Grantul e real: sursă oficială, regulament public, fără plăți în avans. Celelalte două cer bani sau date înainte să dea ceva.",
    ru: "Верно. Грант настоящий: официальный источник, публичный регламент, без предоплат. Два других требуют денег или данных до того, как что-то дать.",
  },
  badOutcome: {
    ro: "Ai ales o capcană. Taxa „de livrare” și „verificarea cardului” sunt cele mai frecvente scheme din oraș — banii nu se întorc.",
    ru: "Ты выбрал ловушку. «Сбор за доставку» и «проверка карты» — самые частые схемы в городе, и деньги не возвращаются.",
  },
  theory: {
    ro: [
      "Dacă trebuie să plătești ca să primești un premiu — este fraudă.",
      "Nimeni nu are nevoie de datele cardului tău ca să-ți dea bani.",
      "Verifică oferta pe site-ul oficial al instituției, nu pe linkul primit.",
      "Presiunea timpului („30 de minute”) este un instrument de manipulare.",
      "Un venit nerealist ascunde întotdeauna un cost ascuns.",
    ],
    ru: [
      "Если нужно заплатить, чтобы получить приз, — это мошенничество.",
      "Никому не нужны данные твоей карты, чтобы перевести тебе деньги.",
      "Проверяй предложение на официальном сайте, а не по присланной ссылке.",
      "Давление сроком («30 минут») — инструмент манипуляции.",
      "За нереальным доходом всегда прячется скрытая цена.",
    ],
  },
  badge: { ro: "Insigna „Ochi de contabil”", ru: "Бейдж «Взгляд бухгалтера»" },
  reactions: {
    good: {
      characterId: "business",
      emotion: "joy",
      line: {
        ro: "Cristina râde ușurată: „Ai citit oferta ca un profesionist. Așa mi-am salvat și eu afacerea anul trecut.”",
        ru: "Кристина смеётся с облегчением: «Ты прочитал предложение как профессионал. Так я в прошлом году спасла свой бизнес».",
      },
    },
    bad: {
      characterId: "business",
      emotion: "sad",
      line: {
        ro: "Cristina oftează: „350 de lei par puțin… până înțelegi că schema are 400 de victime în oraș.”",
        ru: "Кристина вздыхает: «350 леев кажутся мелочью… пока не поймёшь, что у схемы 400 жертв в городе».",
      },
    },
  },
};

/* ------------------------- Mission 6: rumor under siege ------------------------- */

export const mission6: ChecklistMission = {
  brief: {
    ro: "„În chatul cartierului a apărut un zvon”, spune doamna Maria. „Deja e în trei grupuri. Alege ce faci ca să oprești valul, nu ca să-l hrănești.”",
    ru: "«В районном чате появился слух, — говорит тётя Мария. — Он уже в трёх группах. Выбери, что сделать, чтобы остановить волну, а не подкормить её».",
  },
  scene: {
    ro: "Mesaj redistribuit de 214 ori: „Se închide spitalul din Cahul! Mi-a spus o cunoștință care lucrează acolo. Trimite la toți!”",
    ru: "Сообщение переслали 214 раз: «Больницу в Кагуле закрывают! Мне сказала знакомая, которая там работает. Разошли всем!»",
  },
  prompt: { ro: "Ce faci?", ru: "Что ты делаешь?" },
  items: [
    {
      id: "source",
      correct: true,
      label: { ro: "Caută anunțul pe pagina oficială a spitalului", ru: "Ищи объявление на официальной странице больницы" },
      explain: {
        ro: "Prima verificare: instituția însăși, nu cel care a trimis mesajul.",
        ru: "Первая проверка — сама организация, а не тот, кто прислал сообщение.",
      },
    },
    {
      id: "ask",
      correct: true,
      label: { ro: "Întreabă politicos autorul: „De unde ai informația?”", ru: "Вежливо спроси автора: «Откуда информация?»" },
      explain: {
        ro: "„O cunoștință a spus” nu este sursă. Întrebarea oprește lanțul.",
        ru: "«Знакомая сказала» — не источник. Вопрос обрывает цепочку.",
      },
    },
    {
      id: "correct",
      correct: true,
      label: { ro: "Publică dezmințirea în același grup, cu link oficial", ru: "Опубликуй опровержение в том же чате со ссылкой на источник" },
      explain: {
        ro: "Corectarea trebuie să ajungă exact unde a fost zvonul.",
        ru: "Опровержение должно попасть именно туда, где был слух.",
      },
    },
    {
      id: "calm",
      correct: true,
      label: { ro: "Scrie calm, fără să faci pe cineva „prost”", ru: "Пиши спокойно, никого не называя «глупым»" },
      explain: {
        ro: "Rușinarea îi face pe oameni să apere zvonul în loc să-l verifice.",
        ru: "Стыд заставляет людей защищать слух, а не проверять его.",
      },
    },
    {
      id: "forward",
      correct: false,
      label: { ro: "Retrimite mesajul „ca să afle și alții, în caz că e adevărat”", ru: "Перешли сообщение «вдруг правда, пусть знают»" },
      explain: {
        ro: "„În caz că” este exact mecanismul prin care zvonul crește exponențial.",
        ru: "«Вдруг правда» — это и есть механизм, которым слух растёт лавиной.",
      },
    },
    {
      id: "screenshot",
      correct: false,
      label: { ro: "Fă un screenshot și postează-l pe pagina ta cu „Ce părere aveți?”", ru: "Сделай скриншот и выложи у себя: «Что думаете?»" },
      explain: {
        ro: "Un screenshot distribuie zvonul unui public nou, fără verificare.",
        ru: "Скриншот разносит слух на новую аудиторию без проверки.",
      },
    },
  ],
  minCorrect: 4,
  goodOutcome: {
    ro: "În 40 de minute dezmințirea oficială e în toate cele trei grupuri. Valul s-a oprit, iar spitalul nu mai primește 200 de apeluri panicate.",
    ru: "За 40 минут официальное опровержение появилось во всех трёх чатах. Волна остановилась, и больница не получила 200 панических звонков.",
  },
  badOutcome: {
    ro: "Zvonul a ajuns în 12 grupuri. Oamenii au început să-și anuleze programările reale, iar corectarea de a doua zi nu mai ajunge la nimeni.",
    ru: "Слух дошёл до 12 чатов. Люди начали отменять реальные приёмы, а опровержение на следующий день уже никто не прочитал.",
  },
  theory: {
    ro: [
      "Zvonul se răspândește de 6 ori mai repede decât dezmințirea — reacționează în prima oră.",
      "„Mi-a spus cineva care lucrează acolo” nu este o sursă verificabilă.",
      "Corectează în același grup unde a apărut zvonul.",
      "Nu retrimite „în caz că e adevărat” — verifică întâi.",
      "Tonul calm convinge; ironia face oamenii să se apere.",
    ],
    ru: [
      "Слух расходится в 6 раз быстрее опровержения — реагируй в первый час.",
      "«Мне сказал человек, который там работает» — не проверяемый источник.",
      "Исправляй в том же чате, где появился слух.",
      "Не пересылай «вдруг правда» — сначала проверь.",
      "Спокойный тон убеждает, ирония заставляет защищаться.",
    ],
  },
  badge: { ro: "Insigna „Stingător de zvonuri”", ru: "Бейдж «Гаситель слухов»" },
  reactions: {
    good: {
      characterId: "vecina",
      emotion: "joy",
      line: {
        ro: "Doamna Maria bate din palme: „Vecinii s-au liniștit! Uite, chiar și eu am învățat azi ceva.”",
        ru: "Тётя Мария хлопает в ладоши: «Соседи успокоились! Вот и я сегодня чему-то научилась».",
      },
    },
    bad: {
      characterId: "vecina",
      emotion: "worried",
      line: {
        ro: "Doamna Maria strânge telefonul: „Acum tot blocul sună la spital… și eu am trimis prima.”",
        ru: "Тётя Мария сжимает телефон: «Теперь весь дом звонит в больницу… а переслала первой я».",
      },
    },
  },
};

/* ------------------------- Mission 7: trolls in the comments ------------------------- */

export const mission7: ChatMission = {
  brief: {
    ro: "„Comentariile au luat foc”, spune VIG. „Un cont provoacă vecinii unii împotriva altora. Nu câștigi cearta — o dezamorsezi. Alege răspunsurile.”",
    ru: "«Комментарии горят, — говорит VIG. — Один аккаунт стравливает соседей. Спор не выигрывают — его гасят. Выбирай ответы».",
  },
  callerName: { ro: "@vocea_reala (cont nou, 3 zile)", ru: "@real_golos (новый аккаунт, 3 дня)" },
  turns: [
    {
      caller: {
        ro: "Numai voi, cei de la școala aia, stricați orașul. Toți sunteți la fel, se vede din prima.",
        ru: "Это всё вы, из той школы, портите город. Все вы одинаковые, сразу видно.",
      },
      options: [
        {
          kind: "safe",
          text: {
            ro: "Nu răspund la generalizări. Dacă ai un caz concret, spune-l cu date.",
            ru: "Я не отвечаю на обобщения. Если есть конкретный случай — назови его с фактами.",
          },
        },
        {
          kind: "risky",
          text: { ro: "Tu chiar nu ai altceva de făcut?", ru: "Тебе что, заняться нечем?" },
        },
      ],
    },
    {
      caller: {
        ro: "Ha! Deci recunoști. Uite, oamenii deja mă susțin, tu ești singur aici.",
        ru: "Ха! Значит, признаёшь. Смотри, меня уже поддерживают, ты тут один.",
      },
      options: [
        {
          kind: "leak",
          text: {
            ro: "Ești un troll plătit, cine te-a angajat? Sunteți o rușine.",
            ru: "Ты проплаченный тролль, кто тебя нанял? Позорище.",
          },
        },
        {
          kind: "safe",
          text: {
            ro: "Aici e sursa oficială cu cifrele reale. Cine vrea, poate verifica singur.",
            ru: "Вот официальный источник с реальными цифрами. Кто хочет — проверит сам.",
          },
        },
        {
          kind: "risky",
          text: { ro: "Nu sunt singur, o să vezi tu.", ru: "Я не один, ты ещё увидишь." },
        },
      ],
    },
    {
      caller: {
        ro: "Sursele tale sunt cumpărate. Toată lumea știe adevărul, doar voi vă prefaceți.",
        ru: "Твои источники куплены. Все знают правду, только вы притворяетесь.",
      },
      options: [
        {
          kind: "hangup",
          text: {
            ro: "Am pus faptele, restul e la vedere. Raportez contul și ies din discuție.",
            ru: "Факты я привёл, остальное видно всем. Жалуюсь на аккаунт и выхожу из спора.",
          },
        },
        {
          kind: "leak",
          text: {
            ro: "Vino la primărie mâine să vedem cine minte, laș ce ești.",
            ru: "Приходи завтра к мэрии, посмотрим, кто врёт, трус.",
          },
        },
      ],
    },
  ],
  goodOutcome: {
    ro: "Ai pus faptele o singură dată, calm, apoi ai ieșit. Fără combustibil, comentariul provocator a coborât în josul paginii, iar contul a fost raportat de încă 12 vecini.",
    ru: "Ты один раз спокойно привёл факты и вышел. Без топлива провокация уползла вниз страницы, а на аккаунт пожаловались ещё 12 соседей.",
  },
  badOutcome: {
    ro: "Cearta a devenit spectacol: 90 de comentarii, doi vecini certați pe bune și trolul cu acoperire de 5 ori mai mare decât la început.",
    ru: "Ссора стала шоу: 90 комментариев, двое соседей поссорились по-настоящему, а охват тролля вырос в пять раз.",
  },
  theory: {
    ro: [
      "Trolul caută emoție, nu adevăr: reacția ta este plata lui.",
      "Răspunde o singură dată, cu fapte și sursă, pentru cititorii tăcuți.",
      "Nu răspunde la insultă cu insultă — pierzi publicul neutru.",
      "Raportează și blochează în loc să continui firul.",
      "Un cont nou, fără istoric, care generalizează după etnie sau limbă, este semnal clar.",
    ],
    ru: [
      "Троллю нужна эмоция, а не правда: твоя реакция — его оплата.",
      "Ответь один раз фактами и ссылкой — для молчаливых читателей.",
      "Не отвечай на оскорбление оскорблением: теряешь нейтральную аудиторию.",
      "Пожалуйся и заблокируй вместо продолжения ветки.",
      "Новый аккаунт без истории, обобщающий по языку или национальности, — явный сигнал.",
    ],
  },
  badge: { ro: "Insigna „Scut calm”", ru: "Бейдж «Спокойный щит»" },
  reactions: {
    good: {
      characterId: "vig",
      emotion: "proud",
      line: {
        ro: "VIG pulsează albastru: „Temperatura discuției: normală. Detectiv, ai dezamorsat conflictul fără o singură insultă.”",
        ru: "VIG светится синим: «Температура обсуждения: норма. Детектив, ты погасил конфликт без единого оскорбления».",
      },
    },
    bad: {
      characterId: "vig",
      emotion: "angry",
      line: {
        ro: "VIG clipește roșu: „Alertă: ai hrănit provocatorul. Emoția ta i-a dublat acoperirea.”",
        ru: "VIG мигает красным: «Тревога: ты подкормил провокатора. Твоя эмоция удвоила его охват».",
      },
    },
  },
};

/* ------------------------- Mission 8: the fake link trap ------------------------- */

export const mission8: ChecklistMission = {
  brief: {
    ro: "„Am scanat un QR de pe un afiș din centru”, spune Igor, expertul tehnic. „Pagina arată perfect. Marchează TOATE semnele care o dau de gol.”",
    ru: "«Я отсканировал QR с афиши в центре, — говорит Игорь, технический эксперт. — Страница выглядит идеально. Отметь ВСЕ признаки, которые её выдают».",
  },
  scene: {
    ro: "Adresa paginii: http://cahul-primaria.secure-login24.top/plata\nTitlu: „Autentificare — Servicii publice”. Formular: utilizator, parolă, cod PIN al cardului. Text roșu: „Sesiune expiră în 04:59”.",
    ru: "Адрес страницы: http://cahul-primaria.secure-login24.top/plata\nЗаголовок: «Вход — Публичные услуги». Форма: логин, пароль, PIN-код карты. Красный текст: «Сессия истекает через 04:59».",
  },
  prompt: { ro: "Marchează semnalele de alarmă:", ru: "Отметь тревожные признаки:" },
  items: [
    {
      id: "domain",
      correct: true,
      label: { ro: "Domeniul real este secure-login24.top, nu primăria", ru: "Настоящий домен — secure-login24.top, а не мэрия" },
      explain: {
        ro: "Citește de la dreapta ultimului punct spre stânga: acolo e adevăratul proprietar.",
        ru: "Читай справа налево от последней точки: там настоящий владелец сайта.",
      },
    },
    {
      id: "http",
      correct: true,
      label: { ro: "Conexiune http:// fără certificat", ru: "Соединение http:// без сертификата" },
      explain: {
        ro: "O pagină de autentificare fără https trimite parola în clar.",
        ru: "Страница входа без https отправляет пароль в открытом виде.",
      },
    },
    {
      id: "pin",
      correct: true,
      label: { ro: "Cere codul PIN al cardului", ru: "Запрашивает PIN-код карты" },
      explain: {
        ro: "Niciun serviciu online nu are nevoie de PIN — el se folosește doar la bancomat și terminal.",
        ru: "Ни один онлайн-сервис не требует PIN — он нужен только в банкомате и терминале.",
      },
    },
    {
      id: "timer",
      correct: true,
      label: { ro: "Cronometru „sesiunea expiră în 5 minute”", ru: "Таймер «сессия истекает через 5 минут»" },
      explain: {
        ro: "Cronometrul există ca să nu ai timp să verifici adresa.",
        ru: "Таймер существует, чтобы у тебя не было времени проверить адрес.",
      },
    },
    {
      id: "logo",
      correct: false,
      label: { ro: "Pagina are sigla primăriei sus", ru: "На странице сверху логотип мэрии" },
      explain: {
        ro: "Sigla se copiază cu clic dreapta — nu dovedește nimic, nici în plus nici în minus.",
        ru: "Логотип копируется правой кнопкой — он ничего не доказывает.",
      },
    },
    {
      id: "ro",
      correct: false,
      label: { ro: "Textul este scris corect în română", ru: "Текст написан по-румынски без ошибок" },
      explain: {
        ro: "Paginile false moderne sunt traduse corect: gramatica nu mai e un criteriu.",
        ru: "Современные фальшивки переводят грамотно: грамматика больше не критерий.",
      },
    },
  ],
  minCorrect: 4,
  goodOutcome: {
    ro: "Nu ai introdus nimic. Ai raportat afișul la primărie și QR-ul fals lipit peste cel real a fost dat jos în aceeași zi.",
    ru: "Ты ничего не ввёл. Ты сообщил про афишу в мэрию, и поддельный QR, наклеенный поверх настоящего, сняли в тот же день.",
  },
  badOutcome: {
    ro: "Datele au ajuns la Umbră. Cu parola și PIN-ul, prima tranzacție apare după 3 minute, iar banca cere dovada că nu ai autorizat-o tu.",
    ru: "Данные ушли к Тени. С паролем и PIN-кодом первая операция проходит через 3 минуты, а банк требует доказать, что это не ты.",
  },
  theory: {
    ro: [
      "Citește domeniul de la ultimul punct spre stânga — acolo e proprietarul real.",
      "Pagina de login trebuie să fie https, dar https singur nu garantează nimic.",
      "PIN-ul cardului nu se introduce niciodată online.",
      "Nu scana QR-uri lipite peste alte QR-uri, pe afișe sau pe parcometre.",
      "Deschide serviciul din bookmark sau tastând adresa, nu din link.",
    ],
    ru: [
      "Читай домен от последней точки влево — там настоящий владелец.",
      "Страница входа должна быть https, но один https ничего не гарантирует.",
      "PIN-код карты никогда не вводят онлайн.",
      "Не сканируй QR, наклеенные поверх других QR, на афишах и паркоматах.",
      "Открывай сервис из закладки или вводя адрес вручную, а не по ссылке.",
    ],
  },
  badge: { ro: "Insigna „Cititor de adrese”", ru: "Бейдж «Читатель адресов»" },
  reactions: {
    good: {
      characterId: "expert",
      emotion: "proud",
      line: {
        ro: "Igor dă din cap aprobator: „Ai citit domeniul corect. Asta face diferența dintre o victimă și un detectiv.”",
        ru: "Игорь одобрительно кивает: «Домен прочитан правильно. Именно это отличает жертву от детектива».",
      },
    },
    bad: {
      characterId: "expert",
      emotion: "sad",
      line: {
        ro: "Igor își scoate ochelarii: „Pagina arăta perfect, știu. Dar adresa spunea totul de la început.”",
        ru: "Игорь снимает очки: «Страница выглядела идеально, знаю. Но адрес говорил всё с самого начала».",
      },
    },
  },
};

/* ------------------------- Reactions for missions 2, 4, 5 ------------------------- */

export const reactions2: Reactions = {
  good: {
    characterId: "mama",
    emotion: "joy",
    line: {
      ro: "Elena răsuflă ușurată: „Ai închis apelul mai repede decât mine! Acum îi sun pe toți din bloc.”",
      ru: "Елена облегчённо выдыхает: «Ты сбросил звонок быстрее, чем я! Сейчас обзвоню весь подъезд».",
    },
  },
  bad: {
    characterId: "mama",
    emotion: "sad",
    line: {
      ro: "Elena își acoperă gura: „Exact așa am pățit și eu. Hai să încercăm din nou, împreună.”",
      ru: "Елена закрывает рот рукой: «Со мной было точно так же. Давай попробуем ещё раз, вместе».",
    },
  },
};

export const reactions4: Reactions = {
  good: {
    characterId: "elev",
    emotion: "proud",
    line: {
      ro: "Vlad sare în picioare: „Am pus dezmințirea în grupul școlii — 200 de oameni au văzut adevărul!”",
      ru: "Влад вскакивает: «Я выложил опровержение в школьный чат — 200 человек увидели правду!»",
    },
  },
  bad: {
    characterId: "elev",
    emotion: "worried",
    line: {
      ro: "Vlad se uită în podea: „Am distribuit și eu videoul… mama a sunat deja la școală.”",
      ru: "Влад смотрит в пол: «Я тоже переслал это видео… мама уже позвонила в школу».",
    },
  },
};

export const reactions5: Reactions = {
  good: {
    characterId: "eleva",
    emotion: "joy",
    line: {
      ro: "Ana zâmbește larg: „Ai găsit toate cuvintele! Acum grupul RO și cel RU citesc același fapt.”",
      ru: "Аня широко улыбается: «Ты нашёл все слова! Теперь RO- и RU-чаты читают один и тот же факт».",
    },
  },
  bad: {
    characterId: "eleva",
    emotion: "worried",
    line: {
      ro: "Ana clatină din cap: „Câteva cuvinte au trecut… și tocmai ele au speriat jumătate din cartier.”",
      ru: "Аня качает головой: «Пара слов проскочила… и именно они напугали полрайона».",
    },
  },
};

export const badgeByMission: Record<number, Bi> = {
  1: mission1.badge,
  2: mission2.badge,
  3: mission3.badge,
  4: mission4.badge,
  5: mission5.badge,
  6: mission6.badge,
  7: mission7.badge,
  8: mission8.badge,
};
