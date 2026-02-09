import { useEffect, useState } from "react";
import { Button } from "../../components/button/Button";
import { auth, createPost, db, signOutUser, updatePostStatus } from "../../firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import type { User } from "firebase/auth";
import { CiLogout } from "react-icons/ci";
import { RiEditCircleFill } from "react-icons/ri";
import { useToggle } from "../../hooks/useToggle";
import Input from "../../components/input/Input";
import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { Dropdown } from "../../components/dropdown/Dropdown";
import "./index.css";
export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [open, toggle] = useToggle();
    const [posts, setPosts] = useState<{ id: string; [key: string]: any }[]>(
        [],
    );
    const [postContent, setPostContent] = useState("");
    const [status, setStatus] = useState("");
    const handleUpdateProfile = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!auth.currentUser) return;
        updateProfile(auth.currentUser, { displayName, photoURL })
            .then(() => setUser(auth.currentUser))
            .catch((error) =>
                console.error("Failed to update profile:", error),
            );
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleCreatePost = (value: {
        postContent: string;
        status: string;
        date: Date;
    }) => {
        createPost(value.postContent, value.status);
    };

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
            <div className="header">
                <img src={`${user?.photoURL}`} />
                <div>
                    <h1>{user?.displayName}</h1>
                    <p>{user?.email}</p>
                </div>
            </div>

            <CiLogout
                className="log-out"
                onClick={(e) => {
                    e.preventDefault();
                    signOutUser();
                }}
            />
            <RiEditCircleFill
                className="edit"
                onClick={() => {
                    toggle();
                }}
            />
            {open && (
                <form onSubmit={handleUpdateProfile}>
                    <Input
                        type="text"
                        name="displayName"
                        label="Display name"
                        defaultValue={`${user?.displayName}`}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Display Name"
                    />
                    <Input
                        label="Avatar"
                        type="url"
                        name="photoURL"
                        // value={`${user?.photoURL}`}
                        onChange={(e) => setPhotoURL(e.target.value)}
                        placeholder="Photo URL"
                    />
                    <Button type="submit">Update Profile</Button>
                </form>
            )}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreatePost({ postContent, status, date: new Date() });
                    setPostContent("");
                }}
            >
                <Input
                    type="text"
                    value={postContent}
                    onChange={(e) => {
                        setPostContent(e.target.value);
                    }}
                    name="postContent"
                    label="New Post"
                    placeholder="What's on your mind?"
                    required
                    min={4}
                />
                <Dropdown
                    trigger="Status"
                    variants="warning"
                    onChange={(value: string) => setStatus(value)}
                >
                    {[
                        "Planing",
                        "Applied",
                        "Called",
                        "Interviewing",
                        "Offered",
                        "Rejected",
                    ]}
                </Dropdown>
                <Button type="submit">Create Post</Button>
            </form>

            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.body}</h2>
                    <p>{post.createdAt?.toDate().toLocaleDateString()}</p>
                    <Dropdown
                        trigger={post.status}
                        variants="warning"
                        onChange={(value: string) => updatePostStatus(post.id, value)}
                    >
                        {[
                            "Planing",
                            "Applied",
                            "Called",
                            "Interviewing",
                            "Offered",
                            "Rejected",
                        ]}
                    </Dropdown>
                </div>
            ))}
        </>
    );
}
