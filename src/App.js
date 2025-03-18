import React, { useState, useEffect } from "react";
import SurveyPieChartDefault from "./pieChartDefault";
import partyMapper, { getPartiNavn, getPartiFarve } from "./partyMapper";
import "./styles.css";
import ResultsTable from "./resultsTable";
import PersonDetailsTable from "./personDetailsTable";
import PersonDetailsTable2019 from "./personDetailsTable2019";
import PersonDetailsTable2020 from "./personDetailsTable2020";
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
    const [selectedFilter, setSelectedFilter] = useState(null); // State for filtering


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

    const handleSliceClick = (selectedAnswer) => {
        if (selectedFilter === selectedAnswer) {
            // Reset filtering
            setSelectedFilter(null);
            setFilteredData(surveyData.filter(item =>
                (!selectedParty || item.parti === selectedParty) &&
                item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            // Filter based on selected answer + any active party filter
            setSelectedFilter(selectedAnswer);
            setFilteredData(surveyData.filter(item =>
                item.svar2.toLowerCase() === selectedAnswer.toLowerCase() &&
                (!selectedParty || item.parti === selectedParty) &&
                item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        }
    };

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
            // Reset visning til alle data og fjern parti-valg
            setSelectedParty(null);
            setSelectedFilter(null); // Nulstil Pie Chart
            setFilteredData(surveyData.filter(item =>
                item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else if (party === "?") {
            // Filter for those who DO NOT belong to any listed party
            setSelectedParty("?");
            setFilteredData(surveyData.filter(item =>
                !partyMapper.some(p => p.bogstav === item.parti) &&
                item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            // Filtrer kun på parti + eventuelt svar2 filter
            setSelectedParty(party);
            setFilteredData(surveyData.filter(item =>
                item.parti === party &&
                (!selectedFilter || item.svar2.toLowerCase() === selectedFilter.toLowerCase()) &&
                item.fornavn.toLowerCase().includes(searchQuery.toLowerCase())
            ));
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
        const years = ["2019", "2020", "2022", "2024"]; // Define years to check
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
            : year === "2020"
                ? PersonDetailsTable2020
                : PersonDetailsTable;

        return (
            <div style={{ marginTop: "20px", textAlign: "left", margin: "auto", maxWidth: "500px" }}>
                <h2 style={{textAlign: "center"}}>{title}</h2>
                <TableComponent person={person} />
            </div>
        );
    };

    if (loading) {
        return <LoadingSpinner />;
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
                    className="dropdown"
                >
                    <option value="2024">Europaparlamentsvalg 2024</option>
                    <option value="2022">Folketingsvalg 2022</option>
                    <option value="2020">Borgerforslag 2020</option>
                    <option value="2019">Folketingsvalg 2019</option>
                </select>
            </div>

            {/* 🔹 Pie chart */
                !selectedPerson && (
                    <div style={{marginBottom: "30px"}}>
                        <SurveyPieChartDefault
                            filteredData={selectedParty ? filteredData : surveyData}
                            labels={{
                                "2019": ["For", "Imod", "Måske", "Ikke besvaret"],
                                "2020": ["For", "Imod", "Hverken for eller imod", "Fraværende"]
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
                        {selectedParty
                            ? `Resultater for ${getPartiNavn(selectedParty)}`
                            : selectedFilter
                                ? `Resultater for: ${selectedFilter}`
                                : "Alle besvarelser"}
                    </h2>
                    <ResultsTable
                        filteredData={filteredData}
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
                        <div style={{ marginTop: "30px" }}>
                            <h2>Besvarelser for andre år</h2>
                            {Object.entries(selectedPersonHistory)
                                .filter(([year]) => year !== selectedYear) // Ensure past results exclude current year
                                .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA)) // Sort descending (newest first)
                                .map(([year, results]) => (
                                    <div key={year} style={{ marginTop: "20px", textAlign: "left", margin: "auto", maxWidth: "500px" }}>

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
};


export default App;
