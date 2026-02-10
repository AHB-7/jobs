import { Children, useEffect, useState, type ReactNode } from "react";
import { Button } from "../button/Button";
import { useToggle } from "../../hooks/useToggle";
import "./index.css";

type DropdownProps = {
    children?: ReactNode;
    trigger?: ReactNode;
    variants?: string;
    onChange?: (value: string) => void;
};

function DropdownContainer({ children }: DropdownProps) {
    return <div className="dropdownContainer">{children}</div>;
}

function Dropdown({ children, trigger, variants, onChange }: DropdownProps) {
    const [open, toggle] = useToggle();
    const [triggerValue, setTriggerValue] = useState<ReactNode>(trigger);

    useEffect(() => {
        setTriggerValue(trigger);
    }, [trigger]);

    return (
        <div
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
                <DropdownContainer>
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
