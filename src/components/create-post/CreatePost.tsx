import { useState } from "react";
import { createPost } from "../../firebase";
import { Dropdown } from "../dropdown/Dropdown";
import { Button } from "../button/Button";
import { STATUSES } from "../../constants/statuses";
import "./index.css";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const createPostSchema = z.object({
    postContent: z
        .string()
        .min(4, "My My ... You can write a bet longer job title 😉"),
    status: z.string().min(1, "Status is required"),
});

type CreatePostFormData = z.infer<typeof createPostSchema>;

export function CreatePost() {
    const [updateError, setUpdateError] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
    } = useForm<CreatePostFormData>({
        resolver: zodResolver(createPostSchema),
        defaultValues: {
            postContent: "",
            status: "",
        },
    });

    const status = watch("status");

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
                        errors.postContent
                            ? errors.postContent.message
                            : `${`Here we go again...`}`
                    }
                    className="post-input"
                />

                <Dropdown
                    trigger={`${errors.status ? errors.status.message : status || "status"}`}
                    variants="button-main-dropdown"
                    onChange={(value: string) =>
                        setValue("status", value, { shouldValidate: true })
                    }
                >
                    {STATUSES}
                </Dropdown>
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
