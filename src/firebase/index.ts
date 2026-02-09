import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export async function signUpUser(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export async function signInUser(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export async function signInWithGoogle() {
    return signInWithPopup(auth, provider);
}

export async function signOutUser() {
    return signOut(auth);
}

export async function createPost(content: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("User not authenticated");
    return addDoc(collection(db, "posts"), {
        body: content,
        userId: user.uid,
        createdAt: serverTimestamp(),
    });
}
