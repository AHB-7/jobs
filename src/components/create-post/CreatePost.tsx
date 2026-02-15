import { useState } from "react";
import { createPost } from "../../firebase";
import { Dropdown } from "../dropdown/Dropdown";
import { Button } from "../button/Button";
import { STATUSES } from "../../constants/statuses";
import "./index.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    createPostSchema,
    type CreatePostFormData,
} from "../../constants/schema";

export function CreatePost() {
    const [updateError, setUpdateError] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            postContent: "",
            status: "",
        },
    });

    const onSubmit = (data: CreatePostFormData) => {
        setUpdateError("");
        createPost(data.postContent, data.status)
            .then(() => {
                setUpdateSuccess(true);
                reset();
                setTimeout(() => {
                    setUpdateSuccess(false);
                }, 200);
            })
            .catch((error) => {
                setUpdateError(error.message);
            });
    };

    return (
        <div className="create-post-container">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="create-post-form"
            >
                <textarea
                    {...register("postContent")}
                    placeholder={
                        errors.postContent?.message || "Here we go again..."
                    }
                    className="post-input"
                />

                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Dropdown
                            trigger={
                                errors.status?.message ||
                                field.value ||
                                "status"
                            }
                            variants="button-main-dropdown"
                            onChange={field.onChange}
                        >
                            {STATUSES}
                        </Dropdown>
                    )}
                />

                <Button
                    type="submit"
                    className={`create-post-btn ${updateSuccess ? "success" : ""}`}
                >
                    Create Post
                </Button>
                {updateError && (
                    <span className="error-message">{updateError}</span>
                )}
            </form>
        </div>
    );
}
