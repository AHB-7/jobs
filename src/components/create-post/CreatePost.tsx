import { useState } from "react";
import { createPost } from "../../firebase";
import { Dropdown } from "../dropdown/Dropdown";
import { Button } from "../button/Button";
import { STATUSES } from "../../constants/statuses";
import "./index.css";

export function CreatePost() {
    const [postContent, setPostContent] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        createPost(postContent, status);
        setPostContent("");
    };

    return (
        <div className="create-post-container">
            <form onSubmit={handleSubmit} className="create-post-form">
                <textarea
                    value={postContent}
                    onChange={(e) => {
                        setPostContent(e.target.value);
                    }}
                    name="postContent"
                    placeholder="The job you have applied for, the company you have applied to."
                    required
                    minLength={4}
                    className="post-input"
                />
                <Dropdown
                    trigger={status || "Status"}
                    variants="button-main-dropdown"
                    onChange={(value: string) => setStatus(value)}
                >
                    {STATUSES}
                </Dropdown>
                <Button type="submit" className="create-post-btn">
                    Create Post
                </Button>
            </form>
        </div>
    );
}
