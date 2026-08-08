import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Mission2Call } from "@/components/missions/Mission2Call";
import { Mission4Deepfake } from "@/components/missions/Mission4Deepfake";
import { Mission5Bilingual } from "@/components/missions/Mission5Bilingual";
import { MissionChecklist } from "@/components/missions/MissionChecklist";
import { MissionPick } from "@/components/missions/MissionPick";
import { MissionChat } from "@/components/missions/MissionChat";
import { missions, mission1, mission3, mission6, mission7, mission8 } from "@/data/missions";

export const Route = createFileRoute("/mission/$id")({
  head: () => ({
    meta: [
      { title: "Misiune InfoQuest — investigație de securitate digitală" },
      {
        name: "description",
        content:
          "Rezolvă cazul: apel fals, deepfake sau manipulare bilingvă. Situație, decizie, consecințe și teorie în 4 pași.",
      },
      { property: "og:title", content: "Misiune InfoQuest Cahul" },
      {
        property: "og:description",
        content: "Investighează un caz de securitate digitală în 4 pași și câștigă o insignă.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MissionPage,
});

function MissionPage() {
  const { id } = Route.useParams();
  const mission = missions.find((m) => String(m.id) === id);

  if (!mission || mission.status !== "playable") {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-xl px-4 py-24 text-center">
          <h1 className="text-2xl font-bold">404</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            În curând / Скоро — această misiune nu este încă disponibilă.
          </p>
          <Link
            to="/"
            className="focus-ring mt-6 inline-flex min-h-11 items-center rounded-xl bg-neon px-5 text-sm font-semibold text-primary-foreground"
          >
            ← Harta / Карта
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {mission.id === 1 && <MissionChecklist mission={mission} data={mission1} />}
        {mission.id === 2 && <Mission2Call mission={mission} />}
        {mission.id === 3 && <MissionPick mission={mission} data={mission3} />}
        {mission.id === 4 && <Mission4Deepfake mission={mission} />}
        {mission.id === 5 && <Mission5Bilingual mission={mission} />}
        {mission.id === 6 && <MissionChecklist mission={mission} data={mission6} />}
        {mission.id === 7 && (
          <MissionChat
            mission={mission}
            data={mission7}
            exitLabel={{
              ro: "Raportează contul și ieși din discuție",
              ru: "Пожаловаться на аккаунт и выйти из спора",
            }}
            goodTag={{ ro: "Conflict dezamorsat", ru: "Конфликт погашен" }}
            badTag={{ ro: "Trolul a primit combustibil", ru: "Тролль получил топливо" }}
          />
        )}
        {mission.id === 8 && <MissionChecklist mission={mission} data={mission8} />}
      </main>
    </>
  );
}
