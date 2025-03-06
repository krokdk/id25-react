import React, { useState, useEffect } from "react";
import SurveyPieChart from "./SurveyPieChart";
import colorScheme from "./colorScheme";

const API_URL = "https://id25-backend-docker.onrender.com/api/survey/results";

const App = () => {
    const [surveyData, setSurveyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedParty, setSelectedParty] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const result = await response.json();
                setSurveyData(result);
                setFilteredData(result);
            } catch (error) {
                console.error("Fejl ved hentning af data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const parties = ["A", "B", "C", "F", "I", "M", "O", "V", "Æ", "Ø", "Å"];
    const regions = [...new Set(surveyData.map(item => item.storkreds))];

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = surveyData.filter((item) =>
            item.fornavn.toLowerCase().includes(query) &&
            (!selectedParty || item.parti === selectedParty) &&
            (!selectedRegion || item.storkreds === selectedRegion)
        );

        setFilteredData(filtered);
    };

    const handlePartyFilter = (party) => {
        setSelectedParty(party);
        setSelectedRegion(null);
        setSearchQuery("");
        setFilteredData(surveyData.filter((item) => item.parti === party));
    };

    const handleRegionFilter = (region) => {
        setSelectedRegion(region);
        setSelectedParty(null);
        setSearchQuery("");
        setFilteredData(surveyData.filter((item) => item.storkreds === region));
    };

    if (loading) {
        return <p>Indlæser data...</p>;
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Går du ind for en aldersgrænse for omskæring?</h1>
            <div style={{ marginBottom: "30px" }}>
                <SurveyPieChart chartData={{
                    labels: ["Ja", "Nej", "Ikke besvaret"],
                    datasets: [{
                        data: [
                            filteredData.filter(item => item.svar1 === "ja").length,
                            filteredData.filter(item => item.svar1 === "nej").length,
                            filteredData.filter(item => item.svar1 === "Ingen kommentar").length
                        ],
                        backgroundColor: [colorScheme.primary, colorScheme.secondary, colorScheme.background]
                    }]
                }} />
            </div>

            {filteredData.length === 0 && (selectedParty || selectedRegion || searchQuery) && (
                <p>Ingen data tilgængelig for valget.</p>
            )}

            <input
                type="text"
                placeholder="Søg efter navn..."
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                    marginBottom: "10px",
                    padding: "8px",
                    width: "300px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            />

            <div style={{ marginTop: "20px" }}>
                {parties.map((party) => (
                    <button
                        key={party}
                        onClick={() => handlePartyFilter(party)}
                        style={{
                            ...buttonStyle,
                            backgroundColor: selectedParty === party ? colorScheme.accent : colorScheme.primary,
                        }}
                    >
                        {party}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: "20px" }}>
                {regions.map((region) => (
                    <button
                        key={region}
                        onClick={() => handleRegionFilter(region)}
                        style={{
                            ...buttonStyle,
                            backgroundColor: selectedRegion === region ? colorScheme.accent : colorScheme.secondary,
                        }}
                    >
                        {region}
                    </button>
                ))}
                <button
                    onClick={() => handleRegionFilter(null)}
                    style={{
                        ...buttonStyle,
                        backgroundColor: colorScheme.primary
                    }}
                >
                    Vis alle
                </button>
            </div>

            {filteredData.length > 0 && (
                <div style={{ marginTop: "20px", textAlign: "left", marginLeft: "20px" }}>
                    <h2>Resultater</h2>
                    <table style={tableStyle}>
                        <thead>
                        <tr style={{ backgroundColor: colorScheme.primary, color: colorScheme.text }}>
                            <th style={tableHeaderStyle}>Fornavn</th>
                            <th style={tableHeaderStyle}>Parti</th>
                            <th style={tableHeaderStyle}>Storkreds</th>
                            <th style={tableHeaderStyle}>For aldersgrænse</th>
                            <th style={tableHeaderStyle}>Kommentar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? colorScheme.background : "white" }}>
                                <td style={tableCellStyle}>{item.fornavn}</td>
                                <td style={tableCellStyle}>{item.parti}</td>
                                <td style={tableCellStyle}>{item.storkreds}</td>
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

const tableStyle = {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
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
    color: "white",
    cursor: "pointer",
};

export default App;
