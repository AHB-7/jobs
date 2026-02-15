// hooks/usePosts.ts
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { getPostsQuery } from "../firebase";
import type { PostDataTypes } from "../types";

export function usePosts({ userId }: { userId?: string }) {
    const [posts, setPosts] = useState<PostDataTypes>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const q = getPostsQuery(userId);

        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const postData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setPosts(postData as PostDataTypes);
                setLoading(false);
            },
            (error) => {
                console.error("Snapshot error:", error);
                setLoading(false);
            },
        );

        return () => unsubscribe();
    }, [userId]);

    return { posts, loading };
}
