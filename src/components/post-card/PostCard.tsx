import { deletePost, updatePostStatus } from "../../firebase";
import { Dropdown } from "../dropdown/Dropdown";
import { STATUSES } from "../../constants/statuses";
import "./index.css";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export function PostCard({
    post,
}: {
    post: { id: string; [key: string]: any };
}) {
    return (
        <div className="post-card">
            <h2 className="post-card-title">{post.body}</h2>
            <p className="post-card-date">
                {post.createdAt?.toDate().toLocaleDateString()}
            </p>
            <Dropdown
                variants="button-dropdown"
                trigger={post.status}
                onChange={(value: string) => updatePostStatus(post.id, value)}
            >
                {STATUSES}
            </Dropdown>
            <IoIosRemoveCircleOutline
                onClick={() => deletePost(post.id)}
                className="post-card-delete"
            ></IoIosRemoveCircleOutline>
        </div>
    );
}
