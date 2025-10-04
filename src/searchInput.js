import React from "react";

const SearchInput = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Søg på kandidatens navn..."
            value={value}
            onChange={onChange}
            style={{
                marginTop: "10px",
                padding: "4px",
                width: "400px",
                height: "30px",
                border: "1px solid #ccc",
                font: "24",
            }}
        />
    );
};

export default SearchInput;
