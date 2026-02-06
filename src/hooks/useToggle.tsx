import { useState } from "react";

type ToggleTypes = {
    initialValue?: boolean;
};

export function useToggle({ initialValue = false }: ToggleTypes = {}) {
    const [open, setOpen] = useState(initialValue);
    const toggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    return [open, toggle] as const;
}
