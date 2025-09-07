import React, { useEffect, useState } from "react";
import { getColorScheme } from "./colorScheme";
import "./styles.css";
import { getPartyColor } from "./party/partyMapper.js"

const ResultsTable = ({ filteredData, handleRowClick }) => {
    const [colorScheme, setColorScheme] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = filteredData.slice(startIndex, endIndex);

    useEffect(() => {
        const scheme = getColorScheme();
        setColorScheme(scheme);
    }, []);

    useEffect(() => {
        setCurrentPage(1);

    }, [filteredData]);

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
                    {currentRows.map((item, index) => (
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
            {/* Pagination knapper */}
            <div style={{ marginTop: "10px", textAlign: "center" }}>
                <button className="button"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Forrige
                </button>
                <button className="button"
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Næste
                </button>
            </div>

        </div>
    );
};

export default ResultsTable;
