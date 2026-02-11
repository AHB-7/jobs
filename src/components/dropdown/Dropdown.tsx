import { Children, useEffect, useState, useRef, type ReactNode } from "react";
import { Button } from "../button/Button";
import { useToggle } from "../../hooks/useToggle";
import "./index.css";

type DropdownProps = {
    children?: ReactNode;
    trigger?: ReactNode;
    variants?: string;
    onChange?: (value: string) => void;
    containerClass?: ReactNode;
    className?: ReactNode;
};

function DropdownContainer({ children, className }: DropdownProps) {
    return (
        <div className={`dropdownContainer ${className || ""}`}>{children}</div>
    );
}

function Dropdown({
    children,
    trigger,
    containerClass,
    variants,
    onChange,
}: DropdownProps) {
    const [open, toggle] = useToggle();
    const [triggerValue, setTriggerValue] = useState<ReactNode>(trigger);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTriggerValue(trigger);

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                if (open) toggle();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, trigger]);

    return (
        <div
            ref={dropdownRef}
            onClick={(e) => e.stopPropagation()}
            className="dropdown-and-container"
        >
            <Button
                type="button"
                onClick={() => toggle()}
                className={`${open && "btn-open"} ${variants}`}
            >
                {triggerValue}
            </Button>
            {open && (
                <DropdownContainer className={containerClass}>
                    {Children.map(children, (child, index) => (
                        <div
                            key={index}
                            onClick={(e) => {
                                onChange?.(
                                    (e.target as HTMLElement).textContent || "",
                                );
                                toggle();
                            }}
                        >
                            <p>{child}</p>
                        </div>
                    ))}
                </DropdownContainer>
            )}
        </div>
    );
}

export { Dropdown };
