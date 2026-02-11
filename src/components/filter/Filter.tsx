import type { ReactNode } from "react";
import { ImFilter } from "react-icons/im";
import "./index.css";
import { useToggle } from "../../hooks/useToggle";
import { Dropdown } from "../dropdown/Dropdown";
import { STATUSES } from "../../constants/statuses";
type FilterProps = {
    children?: ReactNode;
};
export default function Filter({ children }: FilterProps) {
    const [_filterClicked, toggleFilter] = useToggle();

    return (
        <div className="filter-container">
            <p className="joint-styling left">
                You have applied to <strong>{children}</strong> jobs
            </p>

            <Dropdown
                variants="joint-styling right"
                trigger={<ImFilter />}
                onChange={() => {
                    toggleFilter();
                }}
            >
                {["Oldest First", "Newest First", ...STATUSES]}
            </Dropdown>
        </div>
    );
}
