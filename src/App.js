import React, { useState, useEffect } from "react";
import SurveyPieChartDefault from "./pieChartDefault";
import partyMapper, { getPartiNavn } from "./partyMapper";
import "./styles.css";
import ResultsTable from "./resultsTable";
import PersonDetailsTable from "./personDetailsTable";
import PersonDetailsTable2019 from "./personDetailsTable2019";
import PersonDetailsTable2021 from "./personDetailsTable2021";
import LoadingSpinner from "./loadingSpinner";


const App = () => {
    const [selectedYear, setSelectedYear] = useState("2022");
    const [surveyData, setSurveyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedParty, setSelectedParty] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedPersonHistory, setSelectedPersonHistory] = useState({});
    const [selectedFilter, setSelectedFilter] = useState(null); // Valgt svar fra Pie Chart
    const [pieChartData, setPieChartData] = useState([]); // Data til Pie Chart
    const [tableData, setTableData] = useState([]); // Data til Tabel


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const API_URL = `https://id25-backend-docker.onrender.com/api/survey/results?year=${selectedYear}`;
                const response = await fetch(API_URL);
                const result = await response.json();

                const sorted = result.sort((a, b) => a.fornavn.localeCompare(b.fornavn));

                setSurveyData(sorted);
                setPieChartData(sorted);
                setTableData(sorted)
                setFilteredData(sorted);
            } catch (error) {
                console.error("Fejl ved hentning af data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedYear]); // 🔹 Genindlæs data, når `year` ændres

    const updatePieChartData = (party) => {
        if (party) {
            if (party === "?") {
                setPieChartData(surveyData.filter(item =>
                    !partyMapper.some(p => p.bogstav === item.parti) &&
                    item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
                ));
            } else {
                setPieChartData(surveyData.filter(item => item.parti === party));
            }
        } else {
            setPieChartData(surveyData); // Hvis intet parti er valgt, vis alle
        }
    };


    const handleSliceClick = (selectedAnswer) => {
        if (selectedFilter === selectedAnswer) {
            // Reset filtering
            setSelectedFilter(null);
            setTableData(surveyData.filter(item =>
                (!selectedParty || item.parti === selectedParty) &&
                item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
            ));
            setTableData(surveyData.filter(item => item.parti === selectedParty));
        } else {
            // Filtrér tabellen (parti + valgt svar2)
            setSelectedFilter(selectedAnswer);
            if (selectedParty === "?") {
                setTableData(surveyData.filter(item =>
                    item.svar2.toLowerCase() === selectedAnswer.toLowerCase()
                    && !partyMapper.some(p => p.bogstav === item.parti)
                    && item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
                ));
            } else {
                setTableData(surveyData.filter(item =>
                    item.svar2.toLowerCase() === selectedAnswer.toLowerCase()
                    && (!selectedParty || item.parti === selectedParty)
                    && item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
                ));
            }
        }
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        setSelectedParty(null);
        setSearchQuery("");
        setSelectedPerson(null);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = surveyData.filter(item =>
            item.fornavn.toLowerCase().includes(query) &&
            (!selectedParty || item.parti === selectedParty) &&
            (!selectedFilter || item.svar2.toLowerCase() === selectedFilter.toLowerCase())
        ).sort((a, b) => a.fornavn.localeCompare(b.fornavn)); // 🔹 Sortér alfabetisk

        setTableData(filtered);
    };


    const handlePartyFilter = (party) => {
        if (selectedParty === party) {
            // Nulstil til standardvisning
            setSelectedParty(null);
            setSelectedFilter(null);
            setPieChartData(surveyData);
            setTableData(surveyData);
        } else if (party === "?") {
            // Filter for those who DO NOT belong to any listed party
            setSelectedParty("?");
            updatePieChartData("?");
            setTableData(surveyData.filter(item =>
                !partyMapper.some(p => p.bogstav === item.parti) &&
                item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            // Filtrér Pie Chart data (kun på parti)
            setSelectedParty(party);
            updatePieChartData(party);
            setTableData(surveyData.filter(item => item.parti === party));
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
        const years = ["2019", "2021", "2022", "2024"]; // Define years to check
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

    const renderPersonResult = (title, person, year) => {
        if (!person || !person.fornavn) return null; // Ensure person exists

        const TableComponent = year === "2019"
            ? PersonDetailsTable2019
            : year === "2021"
                ? PersonDetailsTable2021
                : PersonDetailsTable;

        return (
            <div style={{marginTop: "20px", textAlign: "left", margin: "auto", maxWidth: "500px"}}>
                <h2 style={{textAlign: "center"}}>{title}</h2>
                <TableComponent person={person}/>
            </div>
        );
    };

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (selectedFilter) {
        if (selectedParty) {
            return (
                <div style={{textAlign: "center"}}>
                    <h1>Går du ind for en aldersgrænse for omskæring?</h1>

                    {/* 🔹 Drop-down til at vælge årstal */}
                    <div style={{marginBottom: "20px"}}>
                        <select
                            id="yearSelect"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="dropdown"
                        >
                            <option value="2024">Europaparlamentsvalg 2024</option>
                            <option value="2022">Folketingsvalg 2022</option>
                            <option value="2021">Borgerforslag 2021</option>
                            <option value="2019">Folketingsvalg 2019</option>
                        </select>
                    </div>

                    {/* 🔹 Pie chart */
                        !selectedPerson && (
                            <div style={{marginBottom: "30px"}}>
                                <SurveyPieChartDefault
                                    filteredData={pieChartData}
                                    labels={{
                                        "2019": ["For", "Imod", "Måske", "Ikke besvaret"],
                                        "2021": ["For", "Imod", "Hverken for eller imod", "Fraværende"]
                                    }[selectedYear] || ["Ja", "Nej", "Ved ikke", "Ikke besvaret"]}
                                    onSliceClick={handleSliceClick} // Handle clicks on chart
                                />
                            </div>
                        )
                    }

                    <div className="party-buttons">
                        {partyMapper.map((party) => (
                            <button
                                key={party.bogstav}
                                onClick={() => handlePartyFilter(party.bogstav)}
                                className={`party-button ${selectedParty === party.bogstav ? "selected" : ""}`}
                                style={{
                                    backgroundColor: party.farve
                                }}
                                title={party.navn}
                            >
                                {party.bogstav}
                            </button>
                        ))}

                        {/* Add the "?" Button */}
                        <button
                            onClick={() => handlePartyFilter("?")}
                            className={`party-button ${selectedParty === "?" ? "selected" : ""}`}
                            style={{
                                backgroundColor: "#888", // Neutral gray color for non-party
                            }}
                            title={"Øvrige"}
                        >
                            ?
                        </button>
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

                    {filteredData.length > 0 && !selectedPerson && (
                        <div style={{marginTop: "20px"}}>
                            <h2>
                                {selectedParty === "?"
                                    ? "Resultater for øvrige"
                                    : `Resultater for ${getPartiNavn(selectedParty)}`}
                            </h2>
                            <ResultsTable
                                filteredData={tableData}
                                handleRowClick={handleRowClick}
                            />
                        </div>
                    )}


                    {selectedPerson && (
                        <div>
                            {/* Display the selected person's result for the selectedYear */}
                            {renderPersonResult(`Besvarelse for ${selectedYear}`, selectedPerson, selectedYear)}

                            {/* Andre resultater */}
                            {Object.keys(selectedPersonHistory).length > 0 && (
                                <div style={{marginTop: "30px"}}>
                                    <h2>Besvarelser for andre år</h2>
                                    {Object.entries(selectedPersonHistory)
                                        .filter(([year]) => year !== selectedYear) // Ensure past results exclude current year
                                        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Sort descending (newest first)
                                        .map(([year, results]) => (
                                            <div key={year} style={{
                                                marginTop: "20px",
                                                textAlign: "left",
                                                margin: "auto",
                                                maxWidth: "500px"
                                            }}>

                                                {results.map((entry, index) => (
                                                    <React.Fragment key={index}>
                                                        {renderPersonResult(`${year}`, entry, year)}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        ))}
                                </div>
                            )}

                            <button onClick={handleReset} className="button">Tilbage</button>
                        </div>
                    )}

                </div>
            );
        } else {
            return (
                <div style={{textAlign: "center"}}>
                    <h1>Går du ind for en aldersgrænse for omskæring?</h1>

                    {/* 🔹 Drop-down til at vælge årstal */}
                    <div style={{marginBottom: "20px"}}>
                        <select
                            id="yearSelect"
                            value={selectedYear}
                            onChange={handleYearChange}
                            className="dropdown"
                        >
                            <option value="2024">Europaparlamentsvalg 2024</option>
                            <option value="2022">Folketingsvalg 2022</option>
                            <option value="2021">Borgerforslag 2021</option>
                            <option value="2019">Folketingsvalg 2019</option>
                        </select>
                    </div>

                    {/* 🔹 Pie chart */
                        !selectedPerson && (
                            <div style={{marginBottom: "30px"}}>
                                <SurveyPieChartDefault
                                    filteredData={pieChartData}
                                    labels={{
                                        "2019": ["For", "Imod", "Måske", "Ikke besvaret"],
                                        "2021": ["For", "Imod", "Hverken for eller imod", "Fraværende"]
                                    }[selectedYear] || ["Ja", "Nej", "Ved ikke", "Ikke besvaret"]}
                                    onSliceClick={handleSliceClick} // Handle clicks on chart
                                />
                            </div>
                        )
                    }

                    <div className="party-buttons">
                        {partyMapper.map((party) => (
                            <button
                                key={party.bogstav}
                                onClick={() => handlePartyFilter(party.bogstav)}
                                className={`party-button ${selectedParty === party.bogstav ? "selected" : ""}`}
                                style={{
                                    backgroundColor: party.farve
                                }}
                                title={party.navn}
                            >
                                {party.bogstav}
                            </button>
                        ))}

                        {/* Add the "?" Button */}
                        <button
                            onClick={() => handlePartyFilter("?")}
                            className={`party-button ${selectedParty === "?" ? "selected" : ""}`}
                            style={{
                                backgroundColor: "#888", // Neutral gray color for non-party
                            }}
                            title={"Øvrige"}
                        >
                            ?
                        </button>
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

                    {filteredData.length > 0 && !selectedPerson && (
                        <div style={{marginTop: "20px"}}>
                            <h2>
                                {selectedParty === "?"
                                    ? "Resultater for øvrige"
                                    : `Resultater for: ${selectedFilter}`}
                            </h2>
                            <ResultsTable
                                filteredData={tableData}
                                handleRowClick={handleRowClick}
                            />
                        </div>
                    )}


                    {selectedPerson && (
                        <div>
                            {/* Display the selected person's result for the selectedYear */}
                            {renderPersonResult(`Besvarelse for ${selectedYear}`, selectedPerson, selectedYear)}

                            {/* Andre resultater */}
                            {Object.keys(selectedPersonHistory).length > 0 && (
                                <div style={{marginTop: "30px"}}>
                                    <h2>Besvarelser for andre år</h2>
                                    {Object.entries(selectedPersonHistory)
                                        .filter(([year]) => year !== selectedYear) // Ensure past results exclude current year
                                        .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Sort descending (newest first)
                                        .map(([year, results]) => (
                                            <div key={year} style={{
                                                marginTop: "20px",
                                                textAlign: "left",
                                                margin: "auto",
                                                maxWidth: "500px"
                                            }}>

                                                {results.map((entry, index) => (
                                                    <React.Fragment key={index}>
                                                        {renderPersonResult(`${year}`, entry, year)}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        ))}
                                </div>
                            )}

                            <button onClick={handleReset} className="button">Tilbage</button>
                        </div>
                    )}

                </div>
            );
        }
    } else {
        return (
            <div style={{textAlign: "center"}}>
                <h1>Går du ind for en aldersgrænse for omskæring?</h1>

                {/* 🔹 Drop-down til at vælge årstal */}
                <div style={{marginBottom: "20px"}}>
                    <label htmlFor="yearSelect">Vælg kandidattest:</label>
                    <select
                        id="yearSelect"
                        value={selectedYear}
                        onChange={handleYearChange}
                        className="dropdown"
                    >
                        <option value="2024">Europaparlamentsvalg 2024</option>
                        <option value="2022">Folketingsvalg 2022</option>
                        <option value="2021">Borgerforslag 2021</option>
                        <option value="2019">Folketingsvalg 2019</option>
                    </select>
                </div>

                {/* 🔹 Pie chart */
                    !selectedPerson && (
                        <div style={{marginBottom: "30px"}}>
                            <SurveyPieChartDefault
                                filteredData={pieChartData}
                                labels={{
                                    "2019": ["For", "Imod", "Måske", "Ikke besvaret"],
                                    "2021": ["For", "Imod", "Hverken for eller imod", "Fraværende"]
                                }[selectedYear] || ["Ja", "Nej", "Ved ikke", "Ikke besvaret"]}
                                onSliceClick={handleSliceClick} // Handle clicks on chart
                            />
                        </div>
                    )
                }

                <div className="party-buttons">
                    {partyMapper.map((party) => (
                        <button
                            key={party.bogstav}
                            onClick={() => handlePartyFilter(party.bogstav)}
                            className={`party-button ${selectedParty === party.bogstav ? "selected" : ""}`}
                            style={{
                                backgroundColor: party.farve
                            }}
                            title={party.navn}
                        >
                            {party.bogstav}
                        </button>
                    ))}

                    {/* Add the "?" Button */}
                    <button
                        onClick={() => handlePartyFilter("?")}
                        className={`party-button ${selectedParty === "?" ? "selected" : ""}`}
                        style={{
                            backgroundColor: "#888", // Neutral gray color for non-party
                        }}
                        title={"Øvrige"}
                    >
                        ?
                    </button>
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

                {filteredData.length > 0 && !selectedPerson && (
                    <div style={{marginTop: "20px"}}>
                        <h2>
                            {selectedParty === "?"
                                ? "Resultater for øvrige"
                                : selectedParty
                                    ? `Resultater for ${getPartiNavn(selectedParty)}`
                                    : "Alle besvarelser"}
                        </h2>
                        <ResultsTable
                            filteredData={tableData}
                            handleRowClick={handleRowClick}
                        />
                    </div>
                )}


                {selectedPerson && (
                    <div>
                        <button onClick={handleReset} className="button">Tilbage</button>
                        {/* Display the selected person's result for the selectedYear */}
                        {renderPersonResult(`Besvarelse for ${selectedYear}`, selectedPerson, selectedYear)}

                        {/* Andre resultater */}
                        {Object.keys(selectedPersonHistory).length > 0 && (
                            <div style={{marginTop: "30px"}}>
                                <h2>Besvarelser for andre år</h2>
                                {Object.entries(selectedPersonHistory)
                                    .filter(([year]) => year !== selectedYear) // Ensure past results exclude current year
                                    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Sort descending (newest first)
                                    .map(([year, results]) => (
                                        <div key={year} style={{
                                            marginTop: "20px",
                                            textAlign: "left",
                                            margin: "auto",
                                            maxWidth: "500px"
                                        }}>

                                            {results.map((entry, index) => (
                                                <React.Fragment key={index}>
                                                    {renderPersonResult(`${year}`, entry, year)}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        );
    }
};


export default App;
