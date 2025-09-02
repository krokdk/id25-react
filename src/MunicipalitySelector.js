import React from "react";

const MunicipalitySelector = ({ value, onChange }) => {
    const options = [

        { value: null, label: "Alle" },
        { value: "Aalborg Kommune", label: "Aalborg" },
        { value: "Københavns Kommune", label: "København" },
        { value: "Randers Kommune", label: "Randers" }
    ];

    return (
        <div style={{ marginBottom: "20px" }}>
            <label htmlFor="municipalitySelect">Vælg kommune:</label>
            <select
                id="municipalitySelect"
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

export default MunicipalitySelector;
