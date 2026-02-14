import { useState } from "react";
import { ProfileHeader } from "../../components/profile-header/ProfileHeader";
import { CreatePost } from "../../components/create-post/CreatePost";
import { PostCard } from "../../components/post-card/PostCard";
import Filter from "../../components/filter/Filter";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { usePosts } from "../../hooks/usePosts";

export default function Profile() {
    const { user, loading: userLoading } = useCurrentUser();
    const { posts, loading: postsLoading } = usePosts({
        userId: user?.uid,
    });
    const [filter, setFilter] = useState<string>("");

    if (userLoading) return <div>Loading...</div>;

    const filteredPosts = posts
        .filter((post) => {
            if (
                !filter ||
                filter === "Newest First" ||
                filter === "Oldest First"
            ) {
                return true;
            }
            return post.status === filter;
        })
        .sort((a, b) => {
            if (filter === "Oldest First") {
                return Number(a.createdAt) - Number(b.createdAt);
            }
            return Number(b.createdAt) - Number(a.createdAt);
        });

    return (
        <div className="profile-page">
            <ProfileHeader user={user} />
            <CreatePost />
            <Filter onFilterChange={setFilter}>{filteredPosts.length}</Filter>
            <div className="postes-list">
                {postsLoading ? (
                    <div>Loading posts...</div>
                ) : (
                    filteredPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                )}
            </div>
        </div>
    );
}
