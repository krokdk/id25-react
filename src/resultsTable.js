import React, { useEffect, useState } from "react";
import { getColorScheme } from "./colorScheme";
import "./styles.css"; // Ensure styles are applied

const ResultsTable = ({ filteredData, handleRowClick }) => {
  const [colorScheme, setColorScheme] = useState(null);

  useEffect(() => {
    const scheme = getColorScheme();
    setColorScheme(scheme);
  }, []);

  // Vent til farver er klar
  if (!colorScheme) return null;


    return (
        <div>
            <table className="table">
                <thead>
                <tr style={{ backgroundColor: colorScheme.secondary, color: colorScheme.text }}>
                    <th className="table-header">Kandidatens navn</th>
                    <th className="table-header">Er for aldersgrænse?</th>
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
