import { Children, useState, type ReactNode } from "react";
import { Button } from "../button/Button";
import { useToggle } from "../../hooks/useToggle";

type DropdownProps = {
    children?: ReactNode;
    trigger?: ReactNode;
    variants?: string;
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

function Dropdown({ children, trigger, variants }: DropdownProps) {
    const [open, toggle] = useToggle();
    const [triggerValue, setTriggerValue] = useState<ReactNode>(trigger);

    return (
        <div className="dropDown">
            <Button onClick={() => toggle()} className="button">
                {triggerValue}
            </Button>
            {open && (
                <DropdownContainer variants={variants}>
                    {Children.map(children, (child, index) => (
                        <p
                            key={index}
                            onClick={() => {
                                setTriggerValue(child);
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
