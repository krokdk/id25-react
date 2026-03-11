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
                marginBottom: "15px",
                padding: "4px",
                width: "300px",
                height: "30px",
                border: "1px solid #ccc",
            }}
        />
    );
};

export default SearchInput;
