import { create } from "zustand";
import { persist } from "zustand/middleware";
type User = {
    uid: string;
    email: string;
    displayName: string;
};

type SessionState = {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
};

export const useUserSession = create<SessionState>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            logout: () => set({ user: null }),
        }),
        {
            name: "user-session",
        },
    ),
);
