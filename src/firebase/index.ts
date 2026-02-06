import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDD5Hkp5Yj0mYm0R0xaPgny-zBZ-M58zro",
    authDomain: "jobs-9caf9.firebaseapp.com",
    projectId: "jobs-9caf9",
    storageBucket: "jobs-9caf9.firebasestorage.app",
    messagingSenderId: "773230600302",
    appId: "1:773230600302:web:1272a5f6a3c9f6cb7a067f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function SignUpUser(emailInput: string, passwordInput: string) {
    const email = emailInput;
    const password = passwordInput;
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

export function SignInUser(emailInput: string, passwordInput: string) {
    const email = emailInput;
    const password = passwordInput;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

export function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("signed in with google");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}

export function signOutUser() {
    signOut(auth)
        .then(() => {
            console.log("user cleaned");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
}
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log("You are loged in");
        // loged in view
    } else {
        // loged out view
        console.log("You are loged out");
    }
});

const user = auth.currentUser;
export function getUserProfile() {
    if (user !== null) {
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;
        console.log(displayName, email, photoURL, emailVerified);
    }
}
