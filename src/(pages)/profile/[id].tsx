import { useEffect, useState } from "react";
import { Button } from "../../coponents/button/Button";
import { auth, signOutUser } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
    const [user, setUser] = useState(null);

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
        </>
    );
}
