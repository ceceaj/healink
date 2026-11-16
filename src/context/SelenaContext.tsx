"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  Article,
  ARTICLES,
  CommunityGroup,
  INITIAL_GROUPS,
  Psychologist,
  PSYCHOLOGISTS,
  NotificationItem,
  INITIAL_NOTIFICATIONS,
  UserProfile,
  DEFAULT_USER,
  DEFAULT_ADMIN,
  MoodType,
  MoodEntry,
  INITIAL_MOOD_HISTORY,
  GratitudeNote,
  INITIAL_GRATITUDE_NOTES,
  ConsultationMessage,
} from "@/data/mockData";

const STORAGE_KEY = "selena_pwa_state_v2";

export interface NewArticleInput {
  title: string;
  category: string;
  readTime?: string;
  author?: string;
  authorCredential?: string;
  badge?: string;
  summary: string;
  content: string[];
}

export interface ConsultationMessageExtras {
  messageType?: "text" | "voice" | "booking" | "assessment" | "summary";
  metaTitle?: string;
  metaItems?: string[];
}

interface SelenaContextType {
  isHydrated: boolean;

  // Auth State
  currentUser: UserProfile;
  loginAsRole: (
    role: "user" | "admin",
    customData?: Partial<UserProfile>
  ) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  logout: () => void;

  // Mood & Gratitude State
  todayMood: MoodType | null;
  setTodayMood: (mood: MoodType) => void;
  moodHistory: MoodEntry[];
  gratitudeNotes: GratitudeNote[];
  addGratitudeNote: (text: string) => void;

  // Articles State
  articles: Article[];
  bookmarkedIds: string[];
  toggleBookmark: (articleId: string) => void;
  addArticle: (newArticle: NewArticleInput) => Article;

  // Groups & Moderation State
  groups: CommunityGroup[];
  joinGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  sendGroupMessage: (
    groupId: string,
    text: string,
    isVoiceNote?: boolean
  ) => void;
  reportMessage: (groupId: string, messageId: string) => void;
  deleteGroupMessage: (groupId: string, messageId: string) => void;
  kickMemberFromGroup: (groupId: string, senderName: string) => void;

  // Consultation State
  psychologists: Psychologist[];
  sendConsultationMessage: (
    psychologistId: string,
    text: string,
    senderRole?: "user" | "psychologist",
    triggerAutoReply?: boolean,
    extras?: ConsultationMessageExtras
  ) => void;

  // Notifications State
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markAllNotificationsRead: () => void;
  markNotificationRead: (id: string) => void;

  // Demo Reset Helper
  resetDemoData: () => void;
}

const SelenaContext = createContext<SelenaContextType | undefined>(undefined);

interface PersistedSelenaState {
  currentUser: UserProfile;
  todayMood: MoodType | null;
  moodHistory: MoodEntry[];
  gratitudeNotes: GratitudeNote[];
  articles: Article[];
  bookmarkedIds: string[];
  groups: CommunityGroup[];
  psychologists: Psychologist[];
  notifications: NotificationItem[];
}

function getCurrentTimeLabel(): string {
  const now = new Date();
  return (
    String(now.getHours()).padStart(2, "0") +
    ":" +
    String(now.getMinutes()).padStart(2, "0")
  );
}

function slugifyTitle(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-") +
    "-" +
    Math.floor(100 + Math.random() * 900)
  );
}

export function SelenaProvider({ children }: { children: React.ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEFAULT_USER);
  const [todayMood, setTodayMoodState] = useState<MoodType | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(
    INITIAL_MOOD_HISTORY
  );
  const [gratitudeNotes, setGratitudeNotes] = useState<GratitudeNote[]>(
    INITIAL_GRATITUDE_NOTES
  );
  const [articles, setArticles] = useState<Article[]>(ARTICLES);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([
    "art-1",
    "art-2",
  ]);
  const [groups, setGroups] = useState<CommunityGroup[]>(INITIAL_GROUPS);
  const [psychologists, setPsychologists] =
    useState<Psychologist[]>(PSYCHOLOGISTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    INITIAL_NOTIFICATIONS
  );

  // Load persisted state from localStorage on client mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PersistedSelenaState>;
        if (parsed.currentUser) setCurrentUser(parsed.currentUser);
        if (parsed.todayMood !== undefined) setTodayMoodState(parsed.todayMood);
        if (Array.isArray(parsed.moodHistory))
          setMoodHistory(parsed.moodHistory);
        if (Array.isArray(parsed.gratitudeNotes))
          setGratitudeNotes(parsed.gratitudeNotes);
        if (Array.isArray(parsed.articles) && parsed.articles.length > 0)
          setArticles(parsed.articles);
        if (Array.isArray(parsed.bookmarkedIds))
          setBookmarkedIds(parsed.bookmarkedIds);
        if (Array.isArray(parsed.groups) && parsed.groups.length > 0)
          setGroups(parsed.groups);
        if (
          Array.isArray(parsed.psychologists) &&
          parsed.psychologists.length > 0
        )
          setPsychologists(parsed.psychologists);
        if (
          Array.isArray(parsed.notifications) &&
          parsed.notifications.length > 0
        )
          setNotifications(parsed.notifications);
      }
    } catch (err) {
      console.error("Failed to read Selena state from localStorage:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync changes to localStorage whenever state updates after hydration
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const stateToSave: PersistedSelenaState = {
        currentUser,
        todayMood,
        moodHistory,
        gratitudeNotes,
        articles,
        bookmarkedIds,
        groups,
        psychologists,
        notifications,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (err) {
      console.error("Failed to save Selena state to localStorage:", err);
    }
  }, [
    isHydrated,
    currentUser,
    todayMood,
    moodHistory,
    gratitudeNotes,
    articles,
    bookmarkedIds,
    groups,
    psychologists,
    notifications,
  ]);

  // Auth Actions
  const loginAsRole = useCallback(
    (role: "user" | "admin", customData?: Partial<UserProfile>) => {
      const baseProfile = role === "admin" ? DEFAULT_ADMIN : DEFAULT_USER;
      setCurrentUser({
        ...baseProfile,
        ...customData,
        role,
      });
    },
    []
  );

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(DEFAULT_USER);
    setTodayMoodState(null);
  }, []);

  // Mood & Gratitude Actions
  const setTodayMood = useCallback((mood: MoodType) => {
    setTodayMoodState(mood);

    const moodLabels: Record<MoodType, { label: string; note: string }> = {
      happy: {
        label: "Senang",
        note: "Hati terasa hangat dan lebih tenang hari ini.",
      },
      neutral: {
        label: "Biasa Saja",
        note: "Mengambil jeda bernapas dan hadir di saat ini.",
      },
      sad: {
        label: "Sedih",
        note: "Mengakui perasaan berat dengan lembut tanpa menghakimi diri.",
      },
    };

    const newEntry: MoodEntry = {
      id: `mh-${Date.now()}`,
      mood,
      label: moodLabels[mood].label,
      date: `Hari ini • ${getCurrentTimeLabel()}`,
      note: moodLabels[mood].note,
    };

    setMoodHistory((prev) => [newEntry, ...prev.slice(0, 14)]);
  }, []);

  const addGratitudeNote = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newNote: GratitudeNote = {
      id: `gn-${Date.now()}`,
      text: trimmed,
      date: `Hari ini • ${getCurrentTimeLabel()}`,
    };
    setGratitudeNotes((prev) => [newNote, ...prev]);
  }, []);

  // Article Actions
  const toggleBookmark = useCallback((articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  }, []);

  const addArticle = useCallback(
    (newArticleInput: NewArticleInput): Article => {
      const created: Article = {
        id: `art-${Date.now()}`,
        slug: slugifyTitle(newArticleInput.title),
        title: newArticleInput.title.trim(),
        category: newArticleInput.category || "Trauma Healing",
        readTime: newArticleInput.readTime || "5 Menit Baca",
        date: "Hari ini",
        author:
          newArticleInput.author ||
          currentUser.name ||
          "dr. Nadya Larasati, M.Psi., Psikolog",
        authorCredential:
          newArticleInput.authorCredential ||
          "Psikolog Klinis Terverifikasi SELENA",
        authorAvatar: "/psychologists/nadya.svg",
        badge: newArticleInput.badge || "Artikel Baru ✨",
        image:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBSSHT1UzitH9nHuCWixbOOIoVt1ZZbcowHTNo3v9blJyyN5uB5IvSKwNoLTNBKj7vFe2Pb0ze_pwLjKJnQFf3AzHZ837SYWkN2yp0mPEKdMXE_GQZ0jA7QmzS3_H7jCXOBImnAAk-9Fv0tKGRMB5sR_2Z8LYajt6a8_WrB5fRwaLOY6X9CgFOUJhXE7KXOHj2FSLKA1ordrUkiJ8cC39oOYfyrBbVZwf-FNKRurbE",
        summary: newArticleInput.summary.trim(),
        content:
          newArticleInput.content.length > 0
            ? newArticleInput.content
            : [newArticleInput.summary.trim()],
      };
      setArticles((prev) => [created, ...prev]);
      return created;
    },
    [currentUser.name]
  );

  // Groups & Moderation Actions
  const joinGroup = useCallback((groupId: string) => {
    setGroups((prev) =>
      prev.map((grp) =>
        grp.id === groupId && !grp.isJoined
          ? { ...grp, isJoined: true, memberCount: grp.memberCount + 1 }
          : grp
      )
    );
  }, []);

  const leaveGroup = useCallback((groupId: string) => {
    setGroups((prev) =>
      prev.map((grp) =>
        grp.id === groupId && grp.isJoined
          ? {
              ...grp,
              isJoined: false,
              memberCount: Math.max(1, grp.memberCount - 1),
            }
          : grp
      )
    );
  }, []);

  const sendGroupMessage = useCallback(
    (groupId: string, text: string, isVoiceNote?: boolean) => {
      const trimmed = text.trim();
      if (!trimmed && !isVoiceNote) return;

      const senderRole: "member" | "psychologist" | "admin" =
        currentUser.role === "admin" ? "psychologist" : "member";

      const newMessage = {
        id: `gm-${Date.now()}`,
        senderName:
          currentUser.role === "admin" ? currentUser.name : currentUser.alias,
        senderRole,
        senderAvatar:
          currentUser.role === "admin" ? "/psychologists/nadya.svg" : undefined,
        text: isVoiceNote
          ? trimmed || "🎵 Pesan Suara Menenangkan (0:18)"
          : trimmed,
        timestamp: getCurrentTimeLabel(),
        isReported: false,
        isVoiceNote: Boolean(isVoiceNote),
        voiceDuration: isVoiceNote ? "0:18" : undefined,
      };

      setGroups((prev) =>
        prev.map((grp) =>
          grp.id === groupId
            ? { ...grp, messages: [...grp.messages, newMessage] }
            : grp
        )
      );
    },
    [currentUser]
  );

  const reportMessage = useCallback((groupId: string, messageId: string) => {
    setGroups((prev) =>
      prev.map((grp) =>
        grp.id === groupId
          ? {
              ...grp,
              messages: grp.messages.map((msg) =>
                msg.id === messageId ? { ...msg, isReported: true } : msg
              ),
            }
          : grp
      )
    );
  }, []);

  const deleteGroupMessage = useCallback(
    (groupId: string, messageId: string) => {
      setGroups((prev) =>
        prev.map((grp) =>
          grp.id === groupId
            ? {
                ...grp,
                messages: grp.messages.filter((msg) => msg.id !== messageId),
              }
            : grp
        )
      );
    },
    []
  );

  const kickMemberFromGroup = useCallback(
    (groupId: string, senderName: string) => {
      setGroups((prev) =>
        prev.map((grp) =>
          grp.id === groupId
            ? {
                ...grp,
                memberCount: Math.max(1, grp.memberCount - 1),
                messages: grp.messages.filter(
                  (msg) => msg.senderName !== senderName
                ),
              }
            : grp
        )
      );
    },
    []
  );

  // Consultation Actions
  const sendConsultationMessage = useCallback(
    (
      psychologistId: string,
      text: string,
      senderRole: "user" | "psychologist" = "user",
      triggerAutoReply: boolean = false,
      extras?: ConsultationMessageExtras
    ) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const targetPsych = psychologists.find((p) => p.id === psychologistId);
      const senderName =
        senderRole === "psychologist"
          ? targetPsych?.name || currentUser.name
          : currentUser.alias;

      const newMessage: ConsultationMessage = {
        id: `cm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        senderName,
        senderRole,
        text: trimmed,
        timestamp: getCurrentTimeLabel(),
        messageType: extras?.messageType || "text",
        metaTitle: extras?.metaTitle,
        metaItems: extras?.metaItems,
      };

      setPsychologists((prev) =>
        prev.map((psy) =>
          psy.id === psychologistId
            ? { ...psy, messages: [...psy.messages, newMessage] }
            : psy
        )
      );

      if (senderRole === "user" && triggerAutoReply) {
        setTimeout(() => {
          setPsychologists((prev) =>
            prev.map((psy) => {
              if (psy.id !== psychologistId) return psy;
              const autoReplies = [
                `Terima kasih sudah menceritakan hal ini dengan jujur, ${currentUser.alias} 💜 Perasaan yang kamu alami sangat wajar pasca pengalaman tersebut. Mari kita urai perlahan, bagian mana yang saat ini paling membebani pikiranmu?`,
                `Saya mendengarkanmu sepenuhnya, ${currentUser.alias} 🌸 Kamu aman di ruang konsultasi ini. Tarik napas perlahan dan tidak perlu terburu-buru. Kita bisa menyusun langkah pemulihan yang paling nyaman untukmu.`,
                `Langkahmu untuk menghubungi psikolog hari ini adalah wujud keberanian yang luar biasa, ${currentUser.alias} 🌿 Kita akan berjalan bersama sesuai ritme kesiapanmu.`,
              ];
              const replyText =
                autoReplies[psy.messages.length % autoReplies.length];
              return {
                ...psy,
                messages: [
                  ...psy.messages,
                  {
                    id: `cm-reply-${Date.now()}`,
                    senderName: psy.name,
                    senderRole: "psychologist",
                    text: replyText,
                    timestamp: getCurrentTimeLabel(),
                    messageType: "text",
                  },
                ],
              };
            })
          );
        }, 1500);
      }
    },
    [currentUser.alias, currentUser.name, psychologists]
  );

  // Notifications Actions
  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  // Reset Demo Data Helper
  const resetDemoData = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Failed to clear localStorage:", err);
    }
    setCurrentUser(DEFAULT_USER);
    setTodayMoodState(null);
    setMoodHistory(INITIAL_MOOD_HISTORY);
    setGratitudeNotes(INITIAL_GRATITUDE_NOTES);
    setArticles(ARTICLES);
    setBookmarkedIds(["art-1", "art-2"]);
    setGroups(INITIAL_GROUPS);
    setPsychologists(PSYCHOLOGISTS);
    setNotifications(INITIAL_NOTIFICATIONS);
  }, []);

  const unreadNotificationCount = notifications.filter((n) => !n.isRead).length;

  return (
    <SelenaContext.Provider
      value={{
        isHydrated,
        currentUser,
        loginAsRole,
        updateUserProfile,
        logout,
        todayMood,
        setTodayMood,
        moodHistory,
        gratitudeNotes,
        addGratitudeNote,
        articles,
        bookmarkedIds,
        toggleBookmark,
        addArticle,
        groups,
        joinGroup,
        leaveGroup,
        sendGroupMessage,
        reportMessage,
        deleteGroupMessage,
        kickMemberFromGroup,
        psychologists,
        sendConsultationMessage,
        notifications,
        unreadNotificationCount,
        markAllNotificationsRead,
        markNotificationRead,
        resetDemoData,
      }}
    >
      {children}
    </SelenaContext.Provider>
  );
}

export function useSelena() {
  const context = useContext(SelenaContext);
  if (!context) {
    throw new Error("useSelena must be used within a SelenaProvider");
  }
  return context;
}
