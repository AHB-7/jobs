import { create } from "zustand";
import { persist } from "zustand/middleware";
type User = {
    uid: string;

    email: string;
    displayName: string;
};

type SessionState = {
    user: User | null;
    accessToken: string | null;
    setUser: (user: User) => void;
    setTokens: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
};

export const useUserSession = create<SessionState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            setUser: (user) => set({ user }),
            setTokens: (accessToken) => set({ accessToken }),
            logout: () => set({ user: null, accessToken: null }),
        }),
        {
            name: "user-session",
        },
    ),
);
