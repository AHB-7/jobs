import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FirebaseError } from "firebase/app";
import { Button } from "../../components/button/Button";
import { signUpUser, signInUser, signInWithGoogle } from "../../firebase";
import { useUserSession } from "../../hooks/useStore";
import { Input } from "../../components/input/Input";
import "./index.css";
import { FaGoogle } from "react-icons/fa";

const authSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

const firebaseErrorMessages: Record<string, string> = {
    "auth/user-not-found": "No account found with this email",
    "auth/wrong-password": "Incorrect password",
    "auth/invalid-credential": "Invalid email or password",
    "auth/email-already-in-use": "An account with this email already exists",
    "auth/too-many-requests": "Too many attempts. Please try again later",
    "auth/network-request-failed": "Network error. Check your connection",
};

function getFirebaseErrorMessage(error: unknown): string {
    if (error instanceof FirebaseError) {
        return (
            firebaseErrorMessages[error.code] ??
            "Something went wrong. Please try again"
        );
    }
    return "Something went wrong. Please try again";
}

export function Auth() {
    const { user } = useUserSession();
    const [authError, setAuthError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
    });

    if (user) return <Navigate to={`/profile/${user.uid}`} />;

    const onSignIn = async (data: AuthFormData) => {
        try {
            setAuthError("");
            await signInUser(data.email, data.password);
        } catch (error) {
            setAuthError(getFirebaseErrorMessage(error));
        }
    };

    const onSignUp = async (data: AuthFormData) => {
        try {
            setAuthError("");
            await signUpUser(data.email, data.password);
        } catch (error) {
            setAuthError(getFirebaseErrorMessage(error));
        }
    };

    return (
        <div className="auth-page">
            <form
                className="form-container"
                noValidate
                onSubmit={handleSubmit(onSignIn)}
            >
                <h1>Sign in/up</h1>
                {authError && <p className="auth-error">{authError}</p>}
                <Input
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    {...register("password")}
                />
                <div className="button-group">
                    <Button type="submit" className="sign-in-btn">
                        Sign In
                    </Button>
                    <Button
                        type="button"
                        onClick={() => signInWithGoogle()}
                        className="google-btn"
                    >
                        <FaGoogle /> <p>Continue with Google</p>
                    </Button>
                    <a
                        className="sign-up-link"
                        onClick={handleSubmit(onSignUp)}
                    >
                        Sign Up
                    </a>
                </div>
            </form>
        </div>
    );
}
