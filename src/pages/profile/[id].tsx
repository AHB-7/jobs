import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { ProfileHeader } from "../../components/profile-header/ProfileHeader";
import { CreatePost } from "../../components/create-post/CreatePost";
import { PostCard } from "../../components/post-card/PostCard";

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<{ id: string; [key: string]: any }[]>(
        [],
    );

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;
        const postsRef = collection(db, "posts");
        const q = query(
            postsRef,
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc"),
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const postsData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPosts(postsData);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <>
            <ProfileHeader user={user} />
            <CreatePost />
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
        </>
    );
}
