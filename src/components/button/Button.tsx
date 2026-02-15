import type { ButtonProps } from "../../types";

export function Button({ children, variant, className, ...rest }: ButtonProps) {
    const classes = ["button", variant && `button-${variant}`, className]
        .filter(Boolean)
        .join(" ");
    return (
        <button className={classes} {...rest}>
            {children}
        </button>
    );
}
