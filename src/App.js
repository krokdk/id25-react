import React, { useState, useEffect } from "react";
import SurveyPieChart from "./SurveyPieChart";
import colorScheme from "./colorScheme";
import questions from "./questions";
import partyMapper, { getPartiNavn } from "./partyMapper";

const App = () => {
    const [selectedYear, setSelectedYear] = useState("2022");
    const [surveyData, setSurveyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedParty, setSelectedParty] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedPersonHistory, setSelectedPersonHistory] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const API_URL = `https://id25-backend-docker.onrender.com/api/survey/results?year=${selectedYear}`;
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
    }, [selectedYear]); // 🔹 Genindlæs data, når `year` ændres

    const parties = ["A", "B", "C", "F", "I", "M", "O", "V", "Æ", "Ø", "Å"];

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value); // 🔹 Opdater år og API-url
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
        fetchPersonHistory(person.fornavn); // Hent tidligere svar
    };


    const handleReset = () => {
        setSelectedPerson(null);
    };

    const fetchPersonHistory = async (fornavn) => {
        const years = ["2019", "2022", "2024"]; // Define years to check
        const history = {};

        try {
            for (const year of years) {
                const response = await fetch(
                    `https://id25-backend-docker.onrender.com/api/survey/results?year=${year}&fornavn=${encodeURIComponent(fornavn)}`
                );

                if (!response.ok) {
                    console.error(`Fejl ved hentning af ${year}:`, response.statusText);
                    continue; // Skip this year if fetch fails
                }

                const data = await response.json();

                if (data.length > 0) {
                    history[year] = data; // Only store non-empty responses
                }
            }

            setSelectedPersonHistory(history); // Update only with valid data
        } catch (error) {
            console.error("Fejl ved hentning af historiske data:", error);
        }
    };



    const renderPersonResult = (title, person) => (
        <div style={{ marginTop: "20px", textAlign: "left", margin: "auto", maxWidth: "500px" }}>
            <h2>{title}</h2>
            <table style={tableStyle}>
                <tbody>
                <tr><td style={tableHeaderStyle}>Fornavn:</td><td style={tableCellStyle}>{person.fornavn}</td></tr>
                <tr><td style={tableHeaderStyle}>Parti:</td><td style={tableCellStyle}>{getPartiNavn(person.parti)}</td></tr>
                <tr><td style={tableHeaderStyle}>{questions.SPM1}</td><td style={tableCellStyle}>{person.svar1}</td></tr>
                <tr><td style={tableHeaderStyle}>{questions.SPM2}</td><td style={tableCellStyle}>{person.svar2}</td></tr>
                <tr><td style={tableHeaderStyle}>{questions.SPM3}</td><td style={tableCellStyle}>{person.svar3}</td></tr>
                <tr><td style={tableHeaderStyle}>{questions.SPM4}</td><td style={tableCellStyle}>{person.svar4}</td></tr>
                <tr><td style={tableHeaderStyle}>{questions.SPM5}</td><td style={tableCellStyle}>{person.svar5}</td></tr>
                </tbody>
            </table>
        </div>
    );


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
                    value={selectedYear}
                    onChange={handleYearChange}
                    style={dropdownStyle}
                >
                    <option value="2024">Europaparlamentsvalg 2024</option>
                    <option value="2022">Folketingsvalg 2022</option>
                    <option value="2019">Folketingsvalg 2019</option>
                </select>
            </div>

            {/* 🔹 Pie chart */
                !selectedPerson && (
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
                    <h2>Resultater for {getPartiNavn(selectedParty)}</h2>
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
                <div>
                    {/* Display the selected person's result for the selectedYear */}
                    {renderPersonResult("Resultat for valgte", selectedPerson)}

                    {/* Tidligere resultater */}
                    {Object.keys(selectedPersonHistory).length > 0 && (
                        <div style={{ marginTop: "30px" }}>
                            <h2>Tidligere resultater</h2>
                            {Object.entries(selectedPersonHistory)
                                .filter(([year]) => year !== selectedYear) // Ensure past results exclude current year
                                .map(([year, results]) => (
                                    <div key={year} style={{ marginTop: "20px", textAlign: "left", margin: "auto", maxWidth: "500px" }}>

                                        {results.map((entry, index) => (
                                            <React.Fragment key={index}>
                                                {renderPersonResult(`Valg: ${year}`, entry)}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                ))}
                        </div>
                    )}

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
