import { useEffect, useState } from "react";
import { Button } from "../../coponents/button/Button";
import { auth, signOutUser } from "../../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");

    const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.currentUser) return;
        updateProfile(auth.currentUser, { displayName, photoURL })
            .then(() => setUser(auth.currentUser))
            .catch((error) =>
                console.error("Failed to update profile:", error),
            );
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    return (
        <>
            <h1>{user?.email}</h1>
            <img src={`${user?.photoURL}`}></img>
            <h2>{user?.displayName}</h2>
            <Button
                variant="danger"
                onClick={(e) => {
                    e.preventDefault();
                    signOutUser();
                }}
            >
                Sign Out
            </Button>
            <form onSubmit={handleUpdateProfile}>
                <input
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Display Name"
                />
                <input
                    type="url"
                    name="photoURL"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    placeholder="Photo URL"
                />
                <Button type="submit">Update Profile</Button>
            </form>
        </>
    );
}
