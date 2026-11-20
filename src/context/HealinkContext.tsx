"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  INITIAL_PARTICIPANT_RECORDS,
  ParticipantEvaluationRecord,
  LEARNING_MODULES,
} from "@/data/safetyData";

const STORAGE_KEY = "healink_safety_learning_v1";

export interface ChildProfile {
  name: string;
  avatar: string;
  avatarName: string;
  stars: number;
  completedModuleSlugs: string[];
  completedSimulations: number[];
}

export interface EvaluationHistoryState {
  preTestScore: number | null;
  postTestScore: number | null;
  participantRecords: ParticipantEvaluationRecord[];
}

interface HealinkContextType {
  isHydrated: boolean;
  childProfile: ChildProfile;
  updateChildProfile: (updates: Partial<ChildProfile>) => void;
  evaluationHistory: EvaluationHistoryState;
  volunteerChecklist: string[];
  completeModule: (slug: string) => void;
  completeSimulation: (id: number, earnedStars: number) => void;
  saveQuizResult: (
    type: "pretest" | "posttest",
    score: number,
    total: number
  ) => number;
  addParticipantRecord: (input: {
    nickname: string;
    avatar: string;
    ageGroup: string;
    preTestScore: number;
    postTestScore: number;
  }) => void;
  toggleVolunteerChecklist: (itemId: string) => void;
  resetAllData: () => void;
}

const DEFAULT_CHILD_PROFILE: ChildProfile = {
  name: "Sahabat Ceria",
  avatar: "🐱",
  avatarName: "Kucing Pemberani",
  stars: 30,
  completedModuleSlugs: ["batasan-pribadi"],
  completedSimulations: [1],
};

const DEFAULT_EVALUATION_HISTORY: EvaluationHistoryState = {
  preTestScore: null,
  postTestScore: null,
  participantRecords: INITIAL_PARTICIPANT_RECORDS,
};

const DEFAULT_CHECKLIST = ["chk-1", "chk-2"];

const HealinkContext = createContext<HealinkContextType | undefined>(undefined);

interface PersistedHealinkState {
  childProfile: ChildProfile;
  evaluationHistory: EvaluationHistoryState;
  volunteerChecklist: string[];
}

export function HealinkProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [childProfile, setChildProfile] = useState<ChildProfile>(
    DEFAULT_CHILD_PROFILE
  );
  const [evaluationHistory, setEvaluationHistory] =
    useState<EvaluationHistoryState>(DEFAULT_EVALUATION_HISTORY);
  const [volunteerChecklist, setVolunteerChecklist] =
    useState<string[]>(DEFAULT_CHECKLIST);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistedHealinkState>;
        if (parsed.childProfile) setChildProfile(parsed.childProfile);
        if (parsed.evaluationHistory)
          setEvaluationHistory(parsed.evaluationHistory);
        if (Array.isArray(parsed.volunteerChecklist))
          setVolunteerChecklist(parsed.volunteerChecklist);
      }
    } catch (err) {
      console.error("Failed to read Healink state from localStorage:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const payload: PersistedHealinkState = {
        childProfile,
        evaluationHistory,
        volunteerChecklist,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (err) {
      console.error("Failed to save Healink state to localStorage:", err);
    }
  }, [isHydrated, childProfile, evaluationHistory, volunteerChecklist]);

  const updateChildProfile = useCallback((updates: Partial<ChildProfile>) => {
    setChildProfile((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const completeModule = useCallback((slug: string) => {
    setChildProfile((prev) => {
      if (prev.completedModuleSlugs.includes(slug)) {
        return prev;
      }
      const mod = LEARNING_MODULES.find((m) => m.slug === slug);
      const reward = mod?.rewardStars ?? 20;
      return {
        ...prev,
        stars: prev.stars + reward,
        completedModuleSlugs: [...prev.completedModuleSlugs, slug],
      };
    });
  }, []);

  const completeSimulation = useCallback((id: number, earnedStars: number) => {
    setChildProfile((prev) => {
      if (prev.completedSimulations.includes(id)) {
        return prev;
      }
      return {
        ...prev,
        stars: prev.stars + earnedStars,
        completedSimulations: [...prev.completedSimulations, id],
      };
    });
  }, []);

  const saveQuizResult = useCallback(
    (type: "pretest" | "posttest", score: number, total: number): number => {
      const percentage = Math.round((score / Math.max(1, total)) * 100);

      // Award 25 bonus stars for completing a quiz
      setChildProfile((prev) => ({
        ...prev,
        stars: prev.stars + 25,
      }));

      setEvaluationHistory((prev) => {
        const nextPre = type === "pretest" ? percentage : prev.preTestScore;
        const nextPost = type === "posttest" ? percentage : prev.postTestScore;

        // Also update or append the active child's record in participantRecords
        const activeCode = `Peserta #${String(
          prev.participantRecords.length + 1
        ).padStart(2, "0")}`;
        const existingIdx = prev.participantRecords.findIndex(
          (r) =>
            r.nickname.toLowerCase() === childProfile.name.trim().toLowerCase()
        );

        let updatedRecords = [...prev.participantRecords];
        if (existingIdx >= 0) {
          const currentRec = updatedRecords[existingIdx];
          updatedRecords[existingIdx] = {
            ...currentRec,
            avatar: childProfile.avatar,
            preTestScore:
              type === "pretest" ? percentage : currentRec.preTestScore,
            postTestScore:
              type === "posttest" ? percentage : currentRec.postTestScore,
            completedModules: childProfile.completedModuleSlugs.length,
            updatedAt: "Baru saja • Desa Cibodas",
          };
        } else {
          const newRec: ParticipantEvaluationRecord = {
            id: `rec-${Date.now()}`,
            code: activeCode,
            nickname: childProfile.name || "Sahabat Ceria",
            avatar: childProfile.avatar || "🐱",
            ageGroup: "9-11 Tahun (Peserta Aktif)",
            preTestScore: type === "pretest" ? percentage : nextPre ?? 50,
            postTestScore:
              type === "posttest" ? percentage : nextPost ?? percentage,
            completedModules: childProfile.completedModuleSlugs.length,
            updatedAt: "Baru saja • Desa Cibodas",
          };
          updatedRecords = [newRec, ...updatedRecords];
        }

        return {
          preTestScore: nextPre,
          postTestScore: nextPost,
          participantRecords: updatedRecords,
        };
      });

      return percentage;
    },
    [
      childProfile.avatar,
      childProfile.completedModuleSlugs.length,
      childProfile.name,
    ]
  );

  const addParticipantRecord = useCallback(
    (input: {
      nickname: string;
      avatar: string;
      ageGroup: string;
      preTestScore: number;
      postTestScore: number;
    }) => {
      setEvaluationHistory((prev) => {
        const nextNum = prev.participantRecords.length + 1;
        const newRec: ParticipantEvaluationRecord = {
          id: `rec-${Date.now()}`,
          code: `Peserta #${String(nextNum).padStart(2, "0")}`,
          nickname: input.nickname.trim() || `Anak #${nextNum}`,
          avatar: input.avatar || "🐰",
          ageGroup: input.ageGroup || "9 Tahun (SD)",
          preTestScore: input.preTestScore,
          postTestScore: input.postTestScore,
          completedModules: 4,
          updatedAt: "Input Relawan • Desa Cibodas",
        };
        return {
          ...prev,
          participantRecords: [newRec, ...prev.participantRecords],
        };
      });
    },
    []
  );

  const toggleVolunteerChecklist = useCallback((itemId: string) => {
    setVolunteerChecklist((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const resetAllData = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear localStorage:", err);
    }
    setChildProfile(DEFAULT_CHILD_PROFILE);
    setEvaluationHistory(DEFAULT_EVALUATION_HISTORY);
    setVolunteerChecklist(DEFAULT_CHECKLIST);
  }, []);

  return (
    <HealinkContext.Provider
      value={{
        isHydrated,
        childProfile,
        updateChildProfile,
        evaluationHistory,
        volunteerChecklist,
        completeModule,
        completeSimulation,
        saveQuizResult,
        addParticipantRecord,
        toggleVolunteerChecklist,
        resetAllData,
      }}
    >
      {children}
    </HealinkContext.Provider>
  );
}

export function useHealink() {
  const context = useContext(HealinkContext);
  if (!context) {
    throw new Error("useHealink must be used within a HealinkProvider");
  }
  return context;
}
