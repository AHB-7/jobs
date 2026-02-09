import { forwardRef, type ForwardedRef, type InputHTMLAttributes } from "react";
import "./index.css";
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const Input = forwardRef(
    (
        { label, id, error, ...otherProps }: CustomInputProps,
        ref: ForwardedRef<HTMLInputElement>,
    ) => {
        const inputId = id || otherProps.name;

        return (
            <div className="inputContainer">
                <label className="inputLabel" htmlFor={inputId}>
                    {label}
                </label>
                <input
                    className={`inputStyle ${error ? "inputError" : ""}`}
                    id={inputId}
                    ref={ref}
                    {...otherProps}
                />
                {error && <span className="inputErrorMsg">{error}</span>}
            </div>
        );
    },
);
const Textarea = forwardRef(
    (
        { label, id, ...otherProps }: CustomInputProps,
        ref: ForwardedRef<HTMLInputElement>,
    ) => {
        const inputId = id || otherProps.name;

        return (
            <div className="inputContainer">
                <label className="inputLabel" htmlFor={inputId}>
                    {label}
                </label>
                <input
                    className="inputStyle"
                    id={inputId}
                    ref={ref}
                    {...otherProps}
                />
            </div>
        );
    },
);

export { Input, Textarea };
