import React, { useEffect, useState } from "react";
import { getColorScheme } from "./colorScheme";
import "./styles.css"; // Ensure styles are applied
import { getPartyColor } from "./party/partyMapper.js"

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
                        <th className="table-header" style={{ width: "15px" }} >Parti</th>
                        <th className="table-header" style={{ textAlign: "center" }} >Kandidatens navn</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr
                            key={index}
                            style={{ backgroundColor: index % 2 === 0 ? colorScheme.background : "white", cursor: "pointer" }}
                            onClick={() => handleRowClick(item)}
                        >
                            <td className="table-cell" style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "30px",       // bredde på boksen
                                        height: "30px",      // samme som width → gør den kvadratisk
                                        backgroundColor: getPartyColor(item.parti), // vælg din farve
                                        borderRadius: "4px", // kan fjernes eller ændres (fx 50% = cirkel)
                                        color: "white",
                                        fontWeight: "bolder"
                                    }}
                                >
                                    {item.parti}
                                </div>
                            </td>
                            <td className="table-cell" style={{ textAlign: "center" }}>{item.fornavn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ResultsTable;
