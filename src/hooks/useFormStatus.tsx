import { useState } from "react";

export function useFormStatus() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const resetStatus = () => {
        setError("");
        setSuccess(false);
    };

    return {
        error,
        success,
        setError,
        setSuccess,
        resetStatus,
    };
}
