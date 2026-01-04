import React from "react";
import "./styles.css";

const QuestionSelector = ({ value, onChange, year }) => {
    const options2025 = [
        { value: "spm1", label: "Spørgsmål 1" },
        { value: "spm2", label: "Spørgsmål 2" },
        { value: "spm3", label: "Spørgsmål 3" },
    ];

    const optionsOld = [
        { value: "spm1", label: "Spørgsmål 1" },
        { value: "spm2", label: "Spørgsmål 2" },
        { value: "spm3", label: "Spørgsmål 3" },
        { value: "spm4", label: "Spørgsmål 4" },
    ];


    const options2019 = [
        { value: "spm2", label: "Spørgsmålet" }
    ];

    const options2021 = [
        { value: "spm2", label: "Borgerforslag" }
    ];

    let options = year === "2026" ? optionsOld :  ( year === "9999" || year === "8888" ) ? options2025 : year === "2019" ? options2019 : year === "2021" ? options2021:  optionsOld;

    return (
        <div className="dropdownComponent">
            <label htmlFor="questionSelect">Spørgsmål:</label>
            <select
                id="questionSelect"
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

export default QuestionSelector;
