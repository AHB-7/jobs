import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { signUpUser, signInUser, signInWithGoogle } from "../../firebase";
import { useUserSession } from "../../hooks/useStore";
import { Input } from "../../components/input/Input";
import "./index.css";
import { FaGoogle } from "react-icons/fa";

export function Auth() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { user } = useUserSession();

    if (user) return <Navigate to={`/profile/${user.uid}`} />;

    const getCredentials = () => ({
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
    });

    return (
        <form className="form-container" onSubmit={(e) => e.preventDefault()}>
            <h1>Sign in/up</h1>
            <Input
                label="Email Address"
                id="email"
                type="email"
                ref={emailRef}
                placeholder="Enter your email"
                required
            />
            <Input
                label="Password"
                id="password"
                type="password"
                ref={passwordRef}
                placeholder="Enter your password"
                required
            />
            <div className="button-group">
                <Button
                    onClick={() => {
                        const { email, password } = getCredentials();
                        signInUser(email, password);
                    }}
                    className="sign-in-btn"
                >
                    Sign In
                </Button>
                <Button
                    onClick={() => signInWithGoogle()}
                    className="google-btn"
                >
                    <FaGoogle /> <p>Continue with Google</p>
                </Button>
                <a
                    className="sign-up-link"
                    onClick={() => {
                        const { email, password } = getCredentials();
                        signUpUser(email, password);
                    }}
                >
                    Sign Up
                </a>
            </div>
        </form>
    );
}
