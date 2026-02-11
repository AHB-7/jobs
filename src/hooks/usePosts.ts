// hooks/usePosts.ts
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { getPostsQuery } from "../firebase";

export function usePosts({ userId }: { userId?: string }) {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        setLoading(true);
        const q = getPostsQuery(userId);

        // This starts the real-time connection
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const postData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(postData);
                setLoading(false);
            },
            (error) => {
                console.error("Snapshot error:", error);
                setLoading(false);
            },
        );

        // Cleanup: stops listening when user leaves the page
        return () => unsubscribe();
    }, [userId]);

    return { posts, loading };
}
