import React from "react";
import colorScheme from "./colorScheme"; // Import color scheme
import "./styles.css"; // Ensure styles are applied

const ResultsTable = ({ filteredData, handleRowClick }) => {
    return (
        <div>
            <table className="table">
                <thead>
                <tr style={{ backgroundColor: colorScheme.primary, color: colorScheme.text }}>
                    <th className="table-header">Fornavn</th>
                    <th className="table-header">For aldersgrænse</th>
                </tr>
                </thead>
                <tbody>
                {filteredData.map((item, index) => (
                    <tr
                        key={index}
                        style={{ backgroundColor: index % 2 === 0 ? colorScheme.background : "white", cursor: "pointer" }}
                        onClick={() => handleRowClick(item)}
                    >
                        <td className="table-cell">{item.fornavn}</td>
                        <td className="table-cell">{item.svar2}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;
