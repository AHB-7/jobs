import type { ReactNode } from "react";
import { ImFilter } from "react-icons/im";
import "./index.css";
import { Dropdown } from "../dropdown/Dropdown";
import { STATUSES } from "../../constants/statuses";

type FilterProps = {
    children?: ReactNode;
    onFilterChange: (filter: string) => void;
};

export default function Filter({ children, onFilterChange }: FilterProps) {
    const filters = ["Newest First", "Oldest First", ...STATUSES];

    return (
        <div className="filter-container">
            <p className="left">
                You have applied to <strong>{children}</strong>
            </p>

            <Dropdown
                variants="right"
                trigger={<ImFilter />}
                onChange={(value) => {
                    onFilterChange(value);
                }}
            >
                {filters}
            </Dropdown>
        </div>
    );
}
