import { create } from "zustand";

export interface HCaptchaState {
    token: string | null;
    setToken: (token: string) => void;
}

export const useHCaptchaStore = create<HCaptchaState>((set) => ({
    token: null,
    setToken: (token: string) => set({ token }),
}));
