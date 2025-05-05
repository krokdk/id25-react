import React from "react";

const SearchInput = ({ value, onChange }) => {
    return (
        <input
            type="text"
            placeholder="Søg efter navn..."
            value={value}
            onChange={onChange}
            style={{
                marginTop: "10px",
                padding: "8px",
                width: "300px",
                border: "1px solid #ccc",
                borderRadius: "5px",
            }}
        />
    );
};

export default SearchInput;
