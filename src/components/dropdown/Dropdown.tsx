import { useRef, useEffect, type ReactNode } from "react";
import { Button } from "../button/Button";
import { useToggle } from "../../hooks/useToggle";
import "./index.css";

type DropdownProps = {
    children?: string[];
    trigger?: ReactNode;
    variants?: string;
    onChange?: (value: string) => void;
    containerClass?: string;
};

function Dropdown({
    children = [],
    trigger,
    containerClass,
    variants,
    onChange,
}: DropdownProps) {
    const [open, toggle] = useToggle();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                toggle();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [open, toggle]);

    const handleItemClick = (value: string) => {
        onChange?.(value);
        toggle();
    };

    return (
        <div ref={dropdownRef} className="dropdown-and-container">
            <Button
                type="button"
                onClick={toggle}
                className={`${open ? "btn-open" : ""} ${variants || ""}`.trim()}
            >
                {trigger}
            </Button>
            {open && (
                <div
                    className={`dropdown-container ${containerClass || ""}`.trim()}
                >
                    {children.map((child, index) => (
                        <div key={index} onClick={() => handleItemClick(child)}>
                            <p>{child}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export { Dropdown };
