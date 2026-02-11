import { deletePost, updatePostStatus, updatePostBody } from "../../firebase";
import { Dropdown } from "../dropdown/Dropdown";
import { STATUS_VARIANTS, STATUSES } from "../../constants/statuses";
import { MdEdit } from "react-icons/md";
import "./index.css";

import { useToggle } from "../../hooks/useToggle";
import { Button } from "../button/Button";
import { useState } from "react";
import { FaMinus } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";

export function PostCard({
    post,
}: {
    post: { id: string; [key: string]: any };
}) {
    const [isEditing, toggleEditing] = useToggle();
    const [newBody, setNewBody] = useState(post.body ?? "");
    const [currentStatus, setCurrentStatus] = useState(post.status);
    const [isSaved, setIsSaved] = useToggle();
    const [isDeleting, setIsDeleting] = useToggle();
    return (
        <div className="post-card">
            <div className="post-header">
                {isDeleting === isEditing && (
                    <p className="post-card-date">
                        {post.createdAt?.toDate().toLocaleDateString()}
                    </p>
                )}
                {isDeleting && (
                    <p className="post-card-date">
                        You sure you want to remove this job
                    </p>
                )}
                {isEditing && (
                    <p className="post-card-date">Keep the the job as it is</p>
                )}
                <div className="actions-btn">
                    {isDeleting ? (
                        <></>
                    ) : (
                        <>
                            {isEditing ? (
                                <FaMinus
                                    onClick={() => {
                                        toggleEditing();
                                    }}
                                    className="edit-post-btn post-btn edit-post-btn-close"
                                />
                            ) : (
                                <MdEdit
                                    onClick={() => {
                                        toggleEditing();
                                    }}
                                    className="edit-post-btn post-btn"
                                />
                            )}
                        </>
                    )}

                    {!isEditing &&
                        (isDeleting ? (
                            <div className="actions-btn">
                                <a
                                    onClick={() => {
                                        deletePost(post.id);
                                        setIsDeleting();
                                    }}
                                    className="edit-post-btn post-btn confirm-delet-btn edit-post-btn-close"
                                >
                                    yes
                                </a>
                                <a
                                    onClick={() => {
                                        setIsDeleting();
                                    }}
                                    className="edit-post-btn post-btn  confirm-delet-btn"
                                >
                                    no
                                </a>
                            </div>
                        ) : (
                            <GrFormClose
                                onClick={() => {
                                    setIsDeleting();
                                }}
                                className="delete-post-btn post-btn"
                            />
                        ))}
                </div>
            </div>

            {isEditing ? (
                <>
                    <textarea
                        className="card-title onEdit"
                        defaultValue={post.body}
                        onChange={(e) => setNewBody(e.target.value)}
                    />
                    <Button
                        onClick={async () => {
                            await updatePostBody(post.id, newBody).catch(
                                console.error,
                            );
                            setIsSaved();
                            setTimeout(() => {
                                toggleEditing();
                                setIsSaved();
                            }, 1000);
                        }}
                        className={`save-edit-btn ${isSaved ? "save-edit-succes" : ""}`}
                    >
                        {`Save Changes ${isSaved ? "Saving.." : ""}`}
                    </Button>
                </>
            ) : (
                <>
                    <p className="card-title clamp">{post.body}</p>
                    <div className="corner">
                        <Dropdown
                            variants={`${STATUS_VARIANTS[currentStatus.toLowerCase()]} button-dropdown`}
                            containerClass="dropdown-container-sm"
                            trigger={currentStatus}
                            onChange={(value: string) => {
                                if (!value) return;
                                setCurrentStatus(value);
                                updatePostStatus(post.id, value).catch(
                                    console.error,
                                );
                            }}
                        >
                            {STATUSES}
                        </Dropdown>
                    </div>
                </>
            )}
        </div>
    );
}
