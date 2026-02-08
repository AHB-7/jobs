import { useRef } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "../../coponents/button/Button";
import { SignUpUser, SignInUser, signInWithGoogle } from "../../firebase";
import { useUserSession } from "../../hooks/useStore";
import Input from "../../coponents/input/Input";

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
        <form onSubmit={(e) => e.preventDefault()}>
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
            <Button
                onClick={() => {
                    const { email, password } = getCredentials();
                    SignInUser(email, password);
                }}
            >
                Sign In
            </Button>
            <Button onClick={() => signInWithGoogle()}>
                Sign in with google
            </Button>
            <Button
                onClick={() => {
                    const { email, password } = getCredentials();
                    SignUpUser(email, password);
                }}
            >
                Sign Up
            </Button>
        </form>
    );
}
