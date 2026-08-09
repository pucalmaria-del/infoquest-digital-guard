import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "ro" | "ru";

const STORAGE_KEY = "infoquest.lang";

export const strings = {
  ro: {
    brand: "InfoQuest Cahul",
    tagline: "Scutul comunității digitale",
    motto: "Observă. Verifică. Protejează comunitatea.",
    heroLead: "Un joc educațional bilingv pentru elevi, profesori, familii și întreaga comunitate.",
    heroSub: "Învață să recunoști fraudele, dezinformarea, deepfake-urile și pericolele digitale.",
    storyTitle: "Dosarul: Umbra",
    story:
      "Orașul s-a conectat la Rețeaua Comunității. Dar în rețea a apărut un actor anonim — Umbra: sparge conturi, sună locuitorii în numele operatorilor, publică video falsificate și seamănă zvonuri între vorbitorii de română și de rusă.",
    story2:
      "Protocolul-străjer VIG (Vigilent) s-a trezit, dar nu poate lupta singur. Patrula InfoQuest — șase mentori ai comunității — te recrutează ca detectiv-stagiar. Închide cele 8 fisuri ale scutului și alungă Umbra din rețea.",
    langLabel: "Limba interfeței",
    xp: "XP",
    missionsDone: "Misiuni rezolvate",
    badges: "Insigne",
    mapTitle: "Harta misiunilor",
    soon: "În curând",
    soonBadge: "În curând",
    playable: "Disponibil",
    done: "Rezolvată",
    start: "Începe misiunea",
    continue: "Continuă",
    understood: "Am înțeles",
    close: "Închide",
    backToMap: "Înapoi la hartă",
    replay: "Reia misiunea",
    next: "Mai departe",
    finish: "Finalizează",
    stepStory: "Situația",
    stepChoice: "Decizia",
    stepConsequence: "Consecințele",
    stepTheory: "Teoria",
    theoryTitle: "Ce trebuie să reții",
    xpEarned: "+{xp} XP obținut",
    badgeUnlocked: "Insignă deblocată",
    mentorSays: "Briefing",
    lockedTeaserNote: "Misiunea se deschide în curând.",
    finalBadge: "Scutul complet",
    finalBadgeHint:
      "Scutul complet se va deschide când vor apărea toate 8 misiuni. Deocamdată colectează cele 3 insigne disponibile.",
    finalBadgeReady: "Ai rezolvat toate misiunile disponibile. Bravo, detectiv!",
    shieldProgress: "Integritatea scutului orașului",
    correct: "Decizie corectă",
    wrong: "Decizie riscantă",
    found: "Găsite",
    missed: "Ratate",
    verdictQuestion: "Verdictul tău:",
    submit: "Confirmă",
    bottom: {
      logo: "Sigla echipei",
      logoHint: "Trage o imagine aici sau dă clic pentru a încărca sigla echipei.",
      logoUploaded: "Siglă încărcată. Clic pentru a o schimba.",
      logoRemove: "Șterge sigla",
      qr: "Cod QR",
      qrHint: "Scanează pentru a deschide jocul.",
      qrDownload: "Descarcă",
      members: "Membrii echipei",
      membersHint: "Completați lista echipei.",
      role: "Rol",
      demo: "Demonstrația jocului",
      demoHint: "Videoclipul demonstrativ va fi adăugat aici.",
      demoMissing:
        "Linkul video nu este configurat încă. Înlocuiește DEMO_VIDEO_URL în src/data/config.ts.",
    },
    a11y: {
      openMission: "Deschide misiunea",
      lockedMission: "Misiune blocată, vezi descrierea",
      switchTo: "Comută pe limba",
      openBlock: "Deschide secțiunea",
    },
  },
  ru: {
    brand: "InfoQuest Cahul",
    tagline: "Щит цифрового сообщества",
    motto: "Наблюдай. Проверяй. Защищай сообщество.",
    heroLead: "Двуязычная образовательная игра для школьников, учителей, семей и всего сообщества.",
    heroSub: "Научись распознавать мошенничество, дезинформацию, дипфейки и цифровые угрозы.",
    storyTitle: "Дело: Тень",
    story:
      "Город подключился к Сети Сообщества. Но в сети завёлся анонимный актор — Тень: взламывает аккаунты, звонит жителям от имени операторов, публикует поддельные видео и сеет слухи между русско- и румыноязычными жителями.",
    story2:
      "Страж-протокол VIG («Бдительный») пробудился, но в одиночку не справится. Патруль InfoQuest — шесть наставников сообщества — набирает тебя детективом-стажёром. Закрой 8 трещин щита и вытесни Тень из сети.",
    langLabel: "Язык интерфейса",
    xp: "XP",
    missionsDone: "Пройдено миссий",
    badges: "Бейджи",
    mapTitle: "Карта миссий",
    soon: "Скоро",
    soonBadge: "Скоро",
    playable: "Доступно",
    done: "Пройдена",
    start: "Начать миссию",
    continue: "Продолжить",
    understood: "Понятно",
    close: "Закрыть",
    backToMap: "Назад к карте",
    replay: "Пройти снова",
    next: "Далее",
    finish: "Завершить",
    stepStory: "Ситуация",
    stepChoice: "Решение",
    stepConsequence: "Последствия",
    stepTheory: "Теория",
    theoryTitle: "Что нужно запомнить",
    xpEarned: "+{xp} XP получено",
    badgeUnlocked: "Бейдж открыт",
    mentorSays: "Брифинг",
    lockedTeaserNote: "Миссия откроется скоро.",
    finalBadge: "Полный щит",
    finalBadgeHint:
      "Полный щит откроется, когда выйдут все 8 миссий. Пока собери 3 доступных бейджа.",
    finalBadgeReady: "Ты прошёл все доступные миссии. Отлично, детектив!",
    shieldProgress: "Целостность щита города",
    correct: "Верное решение",
    wrong: "Рискованное решение",
    found: "Найдено",
    missed: "Пропущено",
    verdictQuestion: "Твой вердикт:",
    submit: "Подтвердить",
    bottom: {
      logo: "Логотип команды",
      logoHint: "Перетащи изображение сюда или нажми, чтобы загрузить логотип.",
      logoUploaded: "Логотип загружен. Нажми, чтобы заменить.",
      logoRemove: "Удалить логотип",
      qr: "QR-код",
      qrHint: "Отсканируй, чтобы открыть игру.",
      qrDownload: "Скачать",
      members: "Команда проекта",
      membersHint: "Заполните список команды.",
      role: "Роль",
      demo: "Демонстрация игры",
      demoHint: "Демонстрационное видео появится здесь.",
      demoMissing: "Ссылка на видео пока не настроена. Замени DEMO_VIDEO_URL в src/data/config.ts.",
    },
    a11y: {
      openMission: "Открыть миссию",
      lockedMission: "Миссия заблокирована, посмотреть описание",
      switchTo: "Переключить язык на",
      openBlock: "Открыть раздел",
    },
  },
} as const;

export type Strings = (typeof strings)["ro"];

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Strings };

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ro");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "ro" || saved === "ru") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: strings[lang] as Strings }), [lang, setLang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useI18n must be used inside LanguageProvider");
  return ctx;
}
