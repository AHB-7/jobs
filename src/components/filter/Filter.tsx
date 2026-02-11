import type { ReactNode } from "react";
import { ImFilter } from "react-icons/im";
import "./index.css";
import { useToggle } from "../../hooks/useToggle";
import { Dropdown } from "../dropdown/Dropdown";
type FilterProps = {
    children?: ReactNode;
};
export default function Filter({ children }: FilterProps) {
    const [filterClicked, toggleFilter] = useToggle();
    return (
        <div className="filter-container">
            <p className="joint-styling left">
                You have applied to <strong>{children}</strong> jobs
            </p>

            <Dropdown
                className="joint-styling right"
                trigger={<ImFilter />}
                onClick={() => {
                    toggleFilter();
                }}
            >
                {["10 days"]}
            </Dropdown>
        </div>
    );
}
