import { useState } from "react";
import { auth, signOutUser } from "../../firebase";
import { updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";
import { CiLogout } from "react-icons/ci";
import { RiEditCircleFill } from "react-icons/ri";
import { useToggle } from "../../hooks/useToggle";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import "./index.css";
import { FcReuse } from "react-icons/fc";

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
                {user?.photoURL ? (
                    <img
                        src={`${user?.photoURL}`}
                        alt="profile image"
                        onClick={() => {
                            toggle();
                        }}
                    />
                ) : (
                    <FcReuse
                        className="photo-viewer"
                        role="Icone for profile image"
                        onClick={() => {
                            toggle();
                        }}
                    />
                )}
                <div>
                    <h1
                        onClick={() => {
                            toggle();
                        }}
                    >
                        {user?.displayName || "Click to edit profile"}
                    </h1>
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
                <div className="profile-update-modal">
                    <form
                        onSubmit={handleUpdateProfile}
                        className="profile-form"
                    >
                        <div className="profile-form-header">
                            <h2>Update Your Profile</h2>
                            <button className="close-btn" onClick={toggle}>
                                &times;
                            </button>
                        </div>
                        <>
                            {user?.photoURL ? (
                                <img
                                    src={`${photoURL || user?.photoURL}`}
                                    alt="Profile"
                                    className="photo-viewer"
                                />
                            ) : (
                                <FcReuse className="photo-viewer" />
                            )}
                        </>
                        <Input
                            type="text"
                            name="displayName"
                            label="Display name"
                            defaultValue={`${user?.displayName || "Write your name here..."}`}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Display Name"
                            required
                        />
                        <Input
                            label="Avatar"
                            type="url"
                            name="photoURL"
                            onChange={(e) => setPhotoURL(e.target.value)}
                            placeholder="Photo URL"
                            defaultValue={"Just copy any image url"}
                        />
                        <Button className="profile-update-btn" type="submit">
                            Update Profile
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
}
