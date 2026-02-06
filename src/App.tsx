import { useRef } from "react";
import { Button } from "./coponents/button/Button";
import {
    SignUpUser,
    signOutUser,
    SignInUser,
    signInWithGoogle,
    auth,
} from "./firebase";

function App() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const user = auth.currentUser;
    function getUserProfile() {
        if (user !== null) {
            const displayName = user.displayName;
            const email = user.email;
            const photoURL = user.photoURL;
            const emailVerified = user.emailVerified;
            const uid = user.uid;
            console.log(displayName, email, photoURL, emailVerified);
        }
    }

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
                        getUserProfile();
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
            <Button
                variant="danger"
                onClick={(e) => {
                    e.preventDefault();
                    signOutUser();
                }}
            >
                Sign Out
            </Button>
            <div>{}</div>
        </>
    );
}

export default App;
