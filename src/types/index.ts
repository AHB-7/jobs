import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type PostDataTypes = {
    id: string;
    body: string;
    status: string;
    createdAt: Date;
}[];
export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    children?: ReactNode;
    variant?: string;
};
