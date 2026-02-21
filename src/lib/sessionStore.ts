import { create } from "zustand";

export type StageKey = "raw" | "mix" | "coach" | "master";
export type JobStatus = "idle" | "queued" | "processing" | "done" | "failed";

export type AudioVariant = "A" | "B";

export type Version = {
  id: string;
  stage: StageKey;
  label: string;
  createdAt: string; // keep string for now; backend can send ISO later
  audioUrl?: string; // optional until backend wiring
  variant?: AudioVariant; // optional
};

export type ProducerMessage = {
  id: string;
  role: "assistant" | "user" | "system";
  text: string;
  createdAt: number; // unix ms
  stage?: StageKey;
};

type SessionMeta = {
  id: string;
  title: string;
  genre: string;
  platform: string;
  style: string;
};

type SessionState = {
  meta: SessionMeta | null;

  stage: StageKey;
  activeVariant: AudioVariant;

  jobStatusByStage: Record<StageKey, JobStatus>;
  errorByStage: Partial<Record<StageKey, string>>;

  versions: Version[];
  activeVersionIdByStage: Partial<Record<StageKey, string>>;

  messages: ProducerMessage[];

  // --- actions
  setMeta: (meta: SessionMeta) => void;
  setStage: (stage: StageKey) => void;
  setVariant: (variant: AudioVariant) => void;

  setJobStatus: (stage: StageKey, status: JobStatus) => void;
  setStageError: (stage: StageKey, message?: string) => void;

  addVersion: (version: Version) => void;
  setActiveVersion: (stage: StageKey, versionId: string) => void;

  addMessage: (msg: Omit<ProducerMessage, "id" | "createdAt">) => void;
  resetSession: () => void;
};

const initialJobStatus: Record<StageKey, JobStatus> = {
  raw: "idle",
  mix: "idle",
  coach: "idle",
  master: "idle",
};

export const useSessionStore = create<SessionState>((set, get) => ({
  meta: null,

  stage: "raw",
  activeVariant: "A",

  jobStatusByStage: { ...initialJobStatus },
  errorByStage: {},

  versions: [],
  activeVersionIdByStage: {},

  messages: [
    {
      id: "sys-1",
      role: "system",
      text: "Welcome. Upload/record a vocal and we’ll refine it step-by-step.",
      createdAt: Date.now(),
    },
  ],

  setMeta: (meta) => set({ meta }),

  setStage: (stage) =>
    set((s) => ({
      stage,
      activeVariant: "A", // reset to A when switching stage
      // clear any stage-level error display when user moves around
      errorByStage: { ...s.errorByStage, [stage]: undefined },
    })),

  setVariant: (variant) => set({ activeVariant: variant }),

  setJobStatus: (stage, status) =>
    set((s) => ({
      jobStatusByStage: { ...s.jobStatusByStage, [stage]: status },
    })),

  setStageError: (stage, message) =>
    set((s) => ({
      errorByStage: { ...s.errorByStage, [stage]: message },
      jobStatusByStage: {
        ...s.jobStatusByStage,
        [stage]: message ? "failed" : s.jobStatusByStage[stage],
      },
    })),

  addVersion: (version) =>
    set((s) => ({
      versions: [version, ...s.versions],
      activeVersionIdByStage: {
        ...s.activeVersionIdByStage,
        [version.stage]: version.id,
      },
    })),

  setActiveVersion: (stage, versionId) =>
    set((s) => ({
      activeVersionIdByStage: { ...s.activeVersionIdByStage, [stage]: versionId },
    })),

  addMessage: (msg) =>
    set((s) => ({
      messages: [
        ...s.messages,
        {
          id: `${msg.role}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
          createdAt: Date.now(),
          ...msg,
        },
      ],
    })),

  resetSession: () =>
    set({
      meta: null,
      stage: "raw",
      activeVariant: "A",
      jobStatusByStage: { ...initialJobStatus },
      errorByStage: {},
      versions: [],
      activeVersionIdByStage: {},
      messages: [
        {
          id: "sys-1",
          role: "system",
          text: "Welcome. Upload/record a vocal and we’ll refine it step-by-step.",
          createdAt: Date.now(),
        },
      ],
    }),
}));

// Small selectors (optional but keeps components lean later)
export const selectActiveStage = (s: SessionState) => s.stage;
export const selectJobStatus = (stage: StageKey) => (s: SessionState) =>
  s.jobStatusByStage[stage];
export const selectActiveVersionId = (stage: StageKey) => (s: SessionState) =>
  s.activeVersionIdByStage[stage];