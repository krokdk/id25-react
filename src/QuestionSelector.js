import React from "react";
import "./styles.css";

const QuestionSelector = ({ value, onChange, year }) => {

    const options2026 = [
        { value: "spm1", label: "Spørgsmål 1" },
        { value: "spm2", label: "Spørgsmål 2" },
        { value: "spm3", label: "Spørgsmål 3" },
        { value: "spm4", label: "Spørgsmål 4" },
        { value: "spm5", label: "Spørgsmål 5" },
        { value: "spm6", label: "Spørgsmål 6" },
        { value: "spm7", label: "Spørgsmål 7" },
        { value: "spm8", label: "Spørgsmål 8" },
        { value: "spm9", label: "Spørgsmål 9" },
        { value: "spm10", label: "Spørgsmål 10" },
        { value: "spm11", label: "Spørgsmål 11" },
        { value: "spm12", label: "Spørgsmål 12" },
        { value: "spm13", label: "Spørgsmål 13" },
        { value: "spm14", label: "Spørgsmål 14" },
        { value: "spm15", label: "Spørgsmål 15" },
        { value: "spm16", label: "Spørgsmål 16" },
        { value: "spm17", label: "Spørgsmål 17" },
        { value: "spm18", label: "Spørgsmål 18" },
        { value: "spm19", label: "Spørgsmål 19" },
        { value: "spm20", label: "Spørgsmål 20" },
    ];

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

    let options = year === "2026" ? options2026 :  ( year === "9999" || year === "8888" ) ? options2025 : year === "2019" ? options2019 : year === "2021" ? options2021:  optionsOld;

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
