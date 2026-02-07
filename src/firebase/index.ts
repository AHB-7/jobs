import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
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
            return error;
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
            return error;
        });
}

export function signInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("signed in with google");
        })
        .catch((error) => {
            return error;
        });
}

export function signOutUser() {
    signOut(auth)
        .then(() => {
            console.log("user cleaned");
        })
        .catch((error) => {
            return error;
        });
}
// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         const uid = user.uid;
//         console.log("You are loged in");
//         // loged in view
//     } else {
//         // loged out view
//         console.log("You are loged out");
//     }
// });

// const user = auth.currentUser;
// export function getUserProfile() {
//     if (user !== null) {
//         const displayName = user.displayName;
//         const email = user.email;
//         const photoURL = user.photoURL;
//         const emailVerified = user.emailVerified;
//         const uid = user.uid;
//         console.log(displayName, email, photoURL, emailVerified);
//     }
// }
