import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { XP_PER_MISSION } from "@/data/config";
import { playableIds } from "@/data/missions";

const KEY = "infoquest.progress.v1";
const TOTAL_MISSIONS = 8;

type State = { completed: number[]; xp: number };

type Ctx = State & {
  complete: (id: number) => void;
  reset: () => void;
  isCompleted: (id: number) => boolean;
  shieldPercent: number;
  allMvpDone: boolean;
  hydrated: boolean;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ completed: [], xp: 0 });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as State;
        if (Array.isArray(parsed.completed)) {
          setState({ completed: parsed.completed, xp: parsed.xp ?? 0 });
        }
      }
    } catch {
      /* ignore corrupted state */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: State) => {
    setState(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const complete = useCallback((id: number) => {
    setState((prev) => {
      if (prev.completed.includes(id)) return prev;
      const next = {
        completed: [...prev.completed, id].sort((a, b) => a - b),
        xp: prev.xp + XP_PER_MISSION,
      };
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => persist({ completed: [], xp: 0 }), [persist]);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      complete,
      reset,
      hydrated,
      isCompleted: (id: number) => state.completed.includes(id),
      shieldPercent: Math.round((state.completed.length / TOTAL_MISSIONS) * 100),
      allMvpDone: playableIds.every((id) => state.completed.includes(id)),
    }),
    [state, complete, reset, hydrated],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}

export { TOTAL_MISSIONS };
