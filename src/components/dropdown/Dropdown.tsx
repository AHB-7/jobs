import {
    type ReactNode,
    useRef,
    useEffect,

    isValidElement,
} from "react";
import { Button } from "../button/Button";
import { useToggle } from "../../hooks/useToggle";
import "./index.css";

type DropdownProps = {
    children?: ReactNode;
    trigger?: ReactNode;
    variants?: string;
    onChange?: (value: string) => void;
    containerClass?: string;
};

function Dropdown({
    children,
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
                className={`${open ? "btn-open" : ""} ${variants || ""}`}
            >
                {trigger}
            </Button>
            {open && (
                <div className={`dropdown-container ${containerClass || ""}`}>
                    {Array.isArray(children) ? (
                        children.map((child, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    const value =
                                        isValidElement(child) && child.props
                                            ? String(
                                                  (child.props as any)
                                                      .children || child,
                                              )
                                            : String(child);
                                    handleItemClick(value);
                                }}
                            >
                                <p>{child}</p>
                            </div>
                        ))
                    ) : (
                        <div onClick={() => handleItemClick(String(children))}>
                            <p>{children}</p>
                        </div>
                    )}
                </div>
            )} 
        </div>
    );
}

export { Dropdown };
