import { Children, useState, type ReactNode } from "react";
import { Button } from "../button/Button";
import { useToggle } from "../../hooks/useToggle";
import "./index.css";

type DropdownProps = {
    children?: ReactNode;
    trigger?: ReactNode;
    variants?: string;
    onChange?: (value: string) => void;
};

function DropdownContainer({ children, variants }: DropdownProps) {
    return (
        <div
            className={
                variants
                    ? `dropdownContainer dropdownContainer-${variants}`
                    : "dropdownContainer"
            }
        >
            {children}
        </div>
    );
}

function Dropdown({ children, trigger, variants, onChange }: DropdownProps) {
    const [open, toggle] = useToggle();
    const [triggerValue, setTriggerValue] = useState<ReactNode>(trigger);

    return (
        <div className="dropDown" onClick={(e) => e.stopPropagation()}>
            <Button type="button" onClick={() => toggle()} className="button">
                {triggerValue}
            </Button>
            {open && (
                <DropdownContainer variants={variants}>
                    {Children.map(children, (child, index) => (
                        <p
                            key={index}
                            onClick={(e) => {
                                onChange?.(
                                    (e.target as HTMLElement).textContent || "",
                                );
                                toggle();
                            }}
                        >
                            {child}
                        </p>
                    ))}
                </DropdownContainer>
            )}
        </div>
    );
}

export { Dropdown };
