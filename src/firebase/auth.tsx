import { Navigate, Outlet } from "react-router-dom";
import { auth } from ".";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUserSession } from "../hooks/useStore";

// Wraps ALL routes — only syncs Firebase → Zustand, no redirecting
export function AuthListener() {
    const [loading, setLoading] = useState(true);
    const { setUser, logout } = useUserSession();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email ?? "",
                    displayName: firebaseUser.displayName ?? "",
                });
            } else {
                logout();
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [setUser, logout]);

    if (loading) return null;

    return <Outlet />;
}

// Wraps only protected routes — redirects if not logged in
export default function ProtectedRoute() {
    const { user } = useUserSession();

    if (!user) return <Navigate to="/" />;

    return <Outlet />;
}
