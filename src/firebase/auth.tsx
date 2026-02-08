import { Navigate, Outlet } from "react-router-dom";
import { auth } from ".";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useUserSession } from "../hooks/useStore";

export default function ProtectedRoute() {
    const [loading, setLoading] = useState(true);
    const { user, setUser, logout } = useUserSession();

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
    if (!user) return <Navigate to="/" />;

    return <Outlet />;
}
