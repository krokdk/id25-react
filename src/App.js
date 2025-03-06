import React, { useState, useEffect } from "react";
import SurveyPieChart from "./SurveyPieChart";

const API_URL = "https://id25-backend-docker.onrender.com/api/survey/results";

const App = () => {
    const [surveyData, setSurveyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedParty, setSelectedParty] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const result = await response.json();
                setSurveyData(result);
                setFilteredData(result); // Vis alle data initialt
            } catch (error) {
                console.error("Fejl ved hentning af data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const parties = ["A", "B", "C", "F", "I", "M", "O", "V", "Æ", "Ø", "Å"];

    // Find unikke storkredse fra dataene
    const regions = [...new Set(surveyData.map(item => item.storkreds))];

    const handlePartyFilter = (party) => {
        setSelectedParty(party);
        setSelectedRegion(null); // Nulstil region-filtrering
        setFilteredData(party ? surveyData.filter((item) => item.parti === party) : surveyData);
    };

    const handleRegionFilter = (region) => {
        setSelectedRegion(region);
        setSelectedParty(null); // Nulstil parti-filtrering
        setFilteredData(region ? surveyData.filter((item) => item.storkreds === region) : surveyData);
    };

    if (loading) {
        return <p>Indlæser data...</p>;
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Går du ind for en aldersgrænse for omskæring?</h1>
            <SurveyPieChart chartData={{
                labels: ["Ja", "Nej", "Ikke besvaret"],
                datasets: [{
                    data: [
                        filteredData.filter(item => item.svar1 === "ja").length,
                        filteredData.filter(item => item.svar1 === "nej").length,
                        filteredData.filter(item => item.svar1 === "Ingen kommentar").length
                    ],
                    backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"]
                }]
            }} />

            {filteredData.length === 0 && (selectedParty || selectedRegion) && (
                <p>Ingen data tilgængelig for valget.</p>
            )}

            {/* Parti-filtrering */}
            <div style={{ marginTop: "20px" }}>
                {parties.map((party) => (
                    <button
                        key={party}
                        onClick={() => handlePartyFilter(party)}
                        style={{
                            ...buttonStyle,
                            backgroundColor: selectedParty === party ? "#888" : "#007bff",
                        }}
                    >
                        {party}
                    </button>
                ))}
                {/*<button onClick={() => handlePartyFilter(null)} style={buttonStyle}>*/}
                {/*    Vis alle*/}
                {/*</button>*/}
            </div>

            {/* Storkreds-filtrering */}
            <div style={{ marginTop: "20px" }}>
                {regions.map((region) => (
                    <button
                        key={region}
                        onClick={() => handleRegionFilter(region)}
                        style={{
                            ...buttonStyle,
                            backgroundColor: selectedRegion === region ? "#888" : "#28a745",
                        }}
                    >
                        {region}
                    </button>
                ))}
                <button onClick={() => handleRegionFilter(null)} style={buttonStyle}>
                    Vis alle
                </button>
            </div>

            {/* Resultater for valgte parti */}
            {selectedParty && filteredData.length > 0 && (
                <div style={{ marginTop: "20px", textAlign: "left", marginLeft: "20px" }}>
                    <h2>Resultater for parti {selectedParty}</h2>
                    <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                            <th style={tableHeaderStyle}>Fornavn</th>
                            <th style={tableHeaderStyle}>Storkreds</th>
                            <th style={tableHeaderStyle}>For aldersgrænse</th>
                            <th style={tableHeaderStyle}>Kommentar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                                <td style={tableCellStyle}>{item.fornavn}</td>
                                <td style={tableCellStyle}>{item.storkreds}</td>
                                <td style={tableCellStyle}>{item.svar1}</td>
                                <td style={tableCellStyle}>{item.svar5}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Resultater for valgte storkreds */}
            {selectedRegion && filteredData.length > 0 && (
                <div style={{ marginTop: "20px", textAlign: "left", marginLeft: "20px" }}>
                    <h2>Resultater for Storkreds {selectedRegion}</h2>
                    <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
                        <thead>
                        <tr style={{ backgroundColor: "#28a745", color: "white" }}>
                            <th style={tableHeaderStyle}>Fornavn</th>
                            <th style={tableHeaderStyle}>Parti</th>
                            <th style={tableHeaderStyle}>For aldersgrænse</th>
                            <th style={tableHeaderStyle}>Kommentar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white" }}>
                                <td style={tableCellStyle}>{item.fornavn}</td>
                                <td style={tableCellStyle}>{item.parti}</td>
                                <td style={tableCellStyle}>{item.svar1}</td>
                                <td style={tableCellStyle}>{item.svar5}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const tableHeaderStyle = {
    padding: "10px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
};

const tableCellStyle = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
};

const buttonStyle = {
    margin: "5px",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
};

export default App;
