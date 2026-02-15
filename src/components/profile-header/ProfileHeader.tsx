import { useState } from "react";
import { auth, signOutUser } from "../../firebase";
import { updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";
import { CiLogout } from "react-icons/ci";
import { useToggle } from "../../hooks/useToggle";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "./index.css";
import { FcReuse } from "react-icons/fc";
import { TbUserEdit } from "react-icons/tb";
import {
    updateProfileSchema,
    type UpdateProfileFormData,
} from "../../constants/schema";

export function ProfileHeader({ user }: { user: User | null }) {
    const [open, toggle] = useToggle();
    const [updateError, setUpdateError] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<UpdateProfileFormData>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            displayName: user?.displayName || "",
            photoURL: user?.photoURL || "",
        },
    });

    const onUpdateProfile = async (data: UpdateProfileFormData) => {
        try {
            setUpdateError("");
            setUpdateSuccess(false);
            if (!auth.currentUser) return;

            await updateProfile(auth.currentUser, {
                displayName: data.displayName,
                photoURL: data.photoURL || null,
            });

            setUpdateSuccess(true);
            setTimeout(() => {
                toggle();
                setUpdateSuccess(false);
            }, 1500);
        } catch (error) {
            setUpdateError("Failed to update profile. Please try again.");
            console.error("Failed to update profile:", error);
        }
    };

    return (
        <>
            <div className="header">
                {user?.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="profile image"
                        onClick={toggle}
                    />
                ) : (
                    <FcReuse
                        className="photo-viewer icon-viewer"
                        role="Icon for profile image"
                        onClick={toggle}
                    />
                )}
                <div>
                    <h1 onClick={toggle}>
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
            <TbUserEdit className="edit" onClick={toggle} />

            {open && (
                <div className="profile-update-modal">
                    <form
                        onSubmit={handleSubmit(onUpdateProfile)}
                        className="profile-form"
                        noValidate
                    >
                        <div className="profile-form-header">
                            <h2>Update Your Profile</h2>
                            <button
                                type="button"
                                className="close-btn"
                                onClick={toggle}
                            >
                                &times;
                            </button>
                        </div>

                        <Controller
                            name="photoURL"
                            control={control}
                            render={({ field }) => (
                                <>
                                    {field.value || user?.photoURL ? (
                                        <img
                                            src={
                                                field.value ||
                                                user?.photoURL ||
                                                ""
                                            }
                                            alt="Profile"
                                            className="photo-viewer"
                                        />
                                    ) : (
                                        <FcReuse className="photo-viewer icon-viewer" />
                                    )}
                                </>
                            )}
                        />

                        <Input
                            type="text"
                            label="Display name"
                            id="displayName"
                            placeholder="Enter your display name"
                            defaultValue={user?.displayName || ""}
                            error={errors.displayName?.message}
                            {...register("displayName")}
                        />
                        <Input
                            label="Avatar URL"
                            type="url"
                            id="photoURL"
                            placeholder="https://example.com/photo.jpg"
                            error={errors.photoURL?.message}
                            {...register("photoURL")}
                        />
                        {updateError && (
                            <p className="auth-error">{updateError}</p>
                        )}
                        {updateSuccess && (
                            <p className="auth-success">
                                Profile updated successfully!
                            </p>
                        )}
                        <Button className="profile-update-btn" type="submit">
                            Update Profile
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
}
