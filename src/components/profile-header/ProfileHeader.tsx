import { useState } from "react";
import { auth, signOutUser } from "../../firebase";
import { updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";
import { CiLogout } from "react-icons/ci";
import { RiEditCircleFill } from "react-icons/ri";
import { useToggle } from "../../hooks/useToggle";
import Input from "../input/Input";
import { Button } from "../button/Button";
import "./index.css";

export function ProfileHeader({ user }: { user: User | null }) {
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [open, toggle] = useToggle();

    const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.currentUser) return;
        updateProfile(auth.currentUser, { displayName, photoURL }).catch(
            (error) => console.error("Failed to update profile:", error),
        );
    };

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
            {open && (
                <form onSubmit={handleUpdateProfile}>
                    <Input
                        type="text"
                        name="displayName"
                        label="Display name"
                        defaultValue={`${user?.displayName}`}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Display Name"
                    />
                    <Input
                        label="Avatar"
                        type="url"
                        name="photoURL"
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="Photo URL"
                    />
                    <Button type="submit">Update Profile</Button>
                </form>
            )}
        </>
    );
}
