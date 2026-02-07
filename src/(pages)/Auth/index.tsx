import { useRef } from "react";
import { Button } from "../../coponents/button/Button";
import {
    SignUpUser,
    SignInUser,
    signInWithGoogle,
} from "../../firebase";

export function Auth() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <h1>Log inn</h1>
            <form action="login" className="form">
                <input type="email" ref={emailRef} id="email" />
                <input type="password" ref={passwordRef} id="password" />
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        const email = emailRef.current?.value ?? "";
                        const password = passwordRef.current?.value ?? "";
                        SignInUser(email, password);
                    }}
                >
                    Sign In
                </Button>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        signInWithGoogle();
                    }}
                >
                    Sign in with google
                </Button>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        const email = emailRef.current?.value ?? "";
                        const password = passwordRef.current?.value ?? "";
                        SignUpUser(email, password);
                    }}
                >
                    Sign Up
                </Button>
            </form>
        </>
    );
}
