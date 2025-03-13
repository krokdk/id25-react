import React, { useState, useEffect } from "react";
import SurveyPieChart from "./SurveyPieChart";
import colorScheme from "./colorScheme";
import questions from "./questions";

const App = () => {
    const [year, setYear] = useState("2022");
    const [surveyData, setSurveyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedParty, setSelectedParty] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPerson, setSelectedPerson] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const API_URL = `https://id25-backend-docker.onrender.com/api/survey/results?year=${year}`;
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
    }, [year]); // 🔹 Genindlæs data, når `year` ændres

    const parties = ["A", "B", "C", "F", "I", "M", "O", "V", "Æ", "Ø", "Å"];

    const handleYearChange = (event) => {
        setYear(event.target.value); // 🔹 Opdater år og API-url
        setSelectedParty(null);
        setSearchQuery("");
        setSelectedPerson(null);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = surveyData.filter(
            (item) =>
                item.fornavn.toLowerCase().includes(query) &&
                (!selectedParty || item.parti === selectedParty)
        );

        setFilteredData(filtered);
    };

    const handlePartyFilter = (party) => {
        if (selectedParty === party) {
            setSelectedParty(null);
            setSearchQuery("");
            setSelectedPerson(null);
            setFilteredData(surveyData);
        } else {
            setSelectedParty(party);
            setSearchQuery("");
            setSelectedPerson(null);
            setFilteredData(surveyData.filter((item) => item.parti === party));
        }
    };

    const handleRowClick = (person) => {
        setSelectedPerson(person);
    };

    const handleReset = () => {
        setSelectedPerson(null);
    };

    if (loading) {
        return <p>Indlæser data...</p>;
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Går du ind for en aldersgrænse for omskæring?</h1>

            {/* 🔹 Drop-down til at vælge årstal */}
            <div style={{ marginBottom: "20px" }}>
                <label htmlFor="yearSelect">Vælg valg:</label>
                <select
                    id="yearSelect"
                    value={year}
                    onChange={handleYearChange}
                    style={dropdownStyle}
                >
                    <option value="2024">Europaparlamentsvalg 2024</option>
                    <option value="2022">Folketingsvalg 2022</option>
                    <option value="2019">Folketingsvalg 2019</option>
                </select>
            </div>

            {!selectedPerson && (
                <div style={{ marginBottom: "30px" }}>
                    <SurveyPieChart chartData={{
                        labels: ["Ja", "Nej", "Ved ikke", "Ikke besvaret"],
                        datasets: [{
                            data: [
                                filteredData.filter(item => item.svar2 === "Ja").length,
                                filteredData.filter(item => item.svar2 === "Nej").length,
                                filteredData.filter(item => item.svar2 === "").length,
                                filteredData.filter(item => item.svar2.toLowerCase() === "ved ikke").length
                            ],
                            backgroundColor: [colorScheme.primary, colorScheme.secondary, colorScheme.accent, colorScheme.background]
                        }]
                    }} />
                </div>
            )}

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


            {(
                <input
                    type="text"
                    placeholder="Søg efter navn..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    style={{
                        marginTop: "10px",
                        padding: "8px",
                        width: "300px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
            )}


            {selectedParty && filteredData.length > 0 && !selectedPerson && (
                <div style={{ marginTop: "20px" }}>
                    <h2>Resultater for parti {selectedParty}</h2>
                    <table style={tableStyle}>
                        <thead>
                        <tr style={{ backgroundColor: colorScheme.primary, color: colorScheme.text }}>
                            <th style={tableHeaderStyle}>Fornavn</th>
                            <th style={tableHeaderStyle}>For aldersgrænse</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((item, index) => (
                            <tr
                                key={index}
                                style={{ backgroundColor: index % 2 === 0 ? colorScheme.background : "white", cursor: "pointer" }}
                                onClick={() => handleRowClick(item)}
                            >
                                <td style={tableCellStyle}>{item.fornavn}</td>
                                <td style={tableCellStyle}>{item.svar2}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedPerson && (
                <div style={{ marginTop: "20px", textAlign: "left", margin: "auto", maxWidth: "500px" }}>
                    <h2>Detaljer</h2>
                    <table style={tableStyle}>
                        <tbody>
                        <tr><td style={tableHeaderStyle}>Fornavn:</td><td style={tableCellStyle}>{selectedPerson.fornavn}</td></tr>
                        <tr><td style={tableHeaderStyle}>Parti:</td><td style={tableCellStyle}>{selectedPerson.parti}</td></tr>
                        <tr><td style={tableHeaderStyle}>{questions.SPM1}</td><td style={tableCellStyle}>{selectedPerson.svar1}</td></tr>
                        <tr><td style={tableHeaderStyle}>{questions.SPM2}</td><td style={tableCellStyle}>{selectedPerson.svar2}</td></tr>
                        <tr><td style={tableHeaderStyle}>{questions.SPM3}</td><td style={tableCellStyle}>{selectedPerson.svar3}</td></tr>
                        <tr><td style={tableHeaderStyle}>{questions.SPM4}</td><td style={tableCellStyle}>{selectedPerson.svar4}</td></tr>
                        <tr><td style={tableHeaderStyle}>{questions.SPM5}</td><td style={tableCellStyle}>{selectedPerson.svar5}</td></tr>
                        </tbody>
                    </table>
                    <button onClick={handleReset} style={buttonStyle}>Tilbage</button>
                </div>
            )}
        </div>
    );
};

// CSS styles
const tableStyle = {
    width: "100%",
    maxWidth: "500px", // 🔹 Sætter tabellens bredde til max 500px (samme som Pie-chart)
    margin: "auto", // 🔹 Centrerer tabellen
    borderCollapse: "collapse",
    tableLayout: "fixed",
    whiteSpace: "pre-wrap", // 🔹 Bevarer linjeskift og bryder lange ord
    wordBreak: "break-word", // 🔹 Sikrer ord brydes korrekt
    overflowWrap: "break-word", // 🔹 Ekstra sikkerhed for lange ord
    padding: "8px",
    borderBottom: "1px solid #ddd",
};

const tableHeaderStyle = {
    padding: "10px",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
    width: "50%", // 🔹 Giver lige meget plads til hver kolonne
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
};

const tableCellStyle = {
    padding: "8px",
    borderBottom: "1px solid #ddd",
};

const buttonStyle = {
    margin: "5px",
    padding: "10px",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
    backgroundColor: colorScheme.primary
};

// 🔹 Dropdown styling
const dropdownStyle = {
    marginLeft: "10px",
    padding: "5px",
    fontSize: "16px",
};

export default App;
