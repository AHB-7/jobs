import { useEffect, useState } from "react";
import { Button } from "../../coponents/button/Button";
import { auth, signOutUser } from "../../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";
import "./style.css";
import { CiLogout } from "react-icons/ci";
import { RiEditCircleFill } from "react-icons/ri";
import { useToggle } from "../../hooks/useToggle";
import Input from "../../coponents/input/Input";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [open, toggle] = useToggle();

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
            <div className="header">
                <img src={`${user?.photoURL}`} />
                <div>
                    <h1>{user?.displayName}</h1>
                    <p>{user?.email}</p>
                </div>
            </div>

            <CiLogout
                className="log-out"
                onClick={(e) => {
                    e.preventDefault();
                    signOutUser();
                }}
            />
            <RiEditCircleFill
                className="edit"
                onClick={() => {
                    toggle();
                }}
            />
            <>
                {open && (
                    <form onSubmit={handleUpdateProfile}>
                        <Input
                            type="text"
                            name="displayName"
                            label="Display name"
                            value={`${user?.displayName}`}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Display Name"
                        />
                        <Input
                            label="Avatar"
                            type="url"
                            name="photoURL"
                            value={`${user?.photoURL}`}
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="Photo URL"
                        />
                        <Button type="submit">Update Profile</Button>
                    </form>
                )}
            </>
        </>
    );
}
