import type { Bi } from "./missions";

export type Emotion = "joy" | "proud" | "calm" | "worried" | "sad" | "angry";

export type Character = {
  id: string;
  name: Bi;
  role: Bi;
  /** css color token used for the avatar accent */
  color: string;
  /** skin / plate tone */
  tone: string;
  robot?: boolean;
};

export const characters: Record<string, Character> = {
  prof: {
    id: "prof",
    name: { ro: "Andrei", ru: "Андрей" },
    role: { ro: "profesorul de informatică", ru: "учитель информатики" },
    color: "var(--danger)",
    tone: "#e8b28c",
  },
  mama: {
    id: "mama",
    name: { ro: "Elena", ru: "Елена" },
    role: { ro: "mama din patrulă", ru: "мама из патруля" },
    color: "var(--neon)",
    tone: "#f2c6a0",
  },
  business: {
    id: "business",
    name: { ro: "Cristina", ru: "Кристина" },
    role: { ro: "antreprenoarea locală", ru: "местная предпринимательница" },
    color: "var(--gold)",
    tone: "#eab98f",
  },
  elev: {
    id: "elev",
    name: { ro: "Vlad", ru: "Влад" },
    role: { ro: "elevul-martor", ru: "школьник-свидетель" },
    color: "var(--violet)",
    tone: "#f0c39c",
  },
  eleva: {
    id: "eleva",
    name: { ro: "Ana", ru: "Аня" },
    role: { ro: "eleva-martoră", ru: "школьница-свидетель" },
    color: "var(--success)",
    tone: "#f5cbaa",
  },
  vecina: {
    id: "vecina",
    name: { ro: "Doamna Maria", ru: "Тётя Мария" },
    role: { ro: "vecina din cartier", ru: "соседка из района" },
    color: "var(--neon-soft)",
    tone: "#eec19d",
  },
  expert: {
    id: "expert",
    name: { ro: "Igor", ru: "Игорь" },
    role: { ro: "expertul tehnic", ru: "технический эксперт" },
    color: "var(--gold)",
    tone: "#e5b189",
  },
  vig: {
    id: "vig",
    name: { ro: "VIG", ru: "VIG" },
    role: { ro: "protocolul-străjer", ru: "протокол-страж" },
    color: "var(--violet)",
    tone: "#20304d",
    robot: true,
  },
};

export type Reaction = {
  characterId: string;
  emotion: Emotion;
  line: Bi;
};

export const emotionLabel: Record<Emotion, Bi> = {
  joy: { ro: "bucurie", ru: "радость" },
  proud: { ro: "mândrie", ru: "гордость" },
  calm: { ro: "calm", ru: "спокойствие" },
  worried: { ro: "îngrijorare", ru: "тревога" },
  sad: { ro: "tristețe", ru: "грусть" },
  angry: { ro: "supărare", ru: "возмущение" },
};
