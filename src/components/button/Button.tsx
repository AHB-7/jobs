import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    children?: ReactNode;
    variant?: string;
};

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
