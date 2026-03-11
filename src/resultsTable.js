import React, { useEffect, useState } from "react";
import { getColorScheme } from "./colorScheme";
import "./styles.css";
import { getPartyColor, getPartiBogstav, getPartiNavn } from "./party/partyMapper.js"

const ResultsTable = ({ filteredData, handleRowClick, rowsPerPage }) => {
    const [colorScheme, setColorScheme] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

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

                <tbody>
                    {currentRows.map((item, index) => (
                        <tr
                            key={index}
                            style={{ backgroundColor: index % 2 === 0 ? colorScheme.background : "white", cursor: "pointer" }}
                            onClick={() => handleRowClick(item)
                            }
                        >

                            <td className="table-cell" style={{ textAlign: "center", columnWidth: "40px" }}>
                                <div
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "30px",
                                        height: "30px",
                                        backgroundColor: getPartyColor(item.parti),
                                        borderRadius: "4px",
                                        color: "white",
                                        fontWeight: "bolder"
                                    }}
                                >
                                    {getPartiBogstav(getPartiNavn(item.parti))}
                                </div>
                            </td>
                            <td className="table-cell" style={{ textAlign: "left", }}>{item.fornavn}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>


    );
};

export default ResultsTable;

