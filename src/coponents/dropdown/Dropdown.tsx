import { useState, type ReactNode } from "react";
import { Button } from "../button/Button";
import { useToggle } from "../../hooks/useToggle";
import React from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";

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
    const [state, setState] = useLocalStorage<string>("jobTitle", "state");

    return (
        <div className="dropDown">
            <Button onClick={() => toggle()} className="button">
                {triggerValue}
            </Button>
            {open && (
                <DropdownContainer variants={variants}>
                    {React.Children.map(children, (child, index) => (
                        <p
                            key={index}
                            onClick={() => {
                                console.log(child);
                                setState(child);
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
