import React from "react";
import "./styles.css";

const options = [
    // { value: "2025", label: "Folketingsvalg 2025" },
    { value: "9999", label: "Kommunalvalg 2025" },
    //{ value: "8888", label: "Regionsrådsvalg 2025" },
    { value: "2024", label: "Europaparlamentsvalg 2024" },
    { value: "2022", label: "Folketingsvalg 2022" },
    { value: "2021", label: "Borgerforslag 2021" },
    { value: "2019", label: "Folketingsvalg 2019" },
];

export const GetYearLabel = (valgt) => {
    const result = options.find(p => p.value === valgt);
    return result ? result.label : "N/A"; // Hvis ikke fundet, returner bogstav
};

const YearSelector = ({ value, onChange }) => {


    return (
        <div className="dropdownComponent">
            <label htmlFor="yearSelect">Kandidattest:</label>
            <select
                id="yearSelect"
                value={value}
                onChange={onChange}
                className="dropdown"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default YearSelector;
