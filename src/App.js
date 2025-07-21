import React, { useState, useEffect } from "react";
import SurveyPieChartDefault from "./pieChartDefault";
import partyMapper, { getPartiNavn } from "./partyMapper";
import "./styles.css";
import ResultsTable from "./resultsTable";
import LoadingSpinner from "./loadingSpinner";
import useSurveyData from "./useSurveyData";
import PartySelector from "./partySelector";
import SearchInput from "./searchInput";
import PersonResult from "./personResult";
import YearSelector from "./yearSelector";


const App = () => {
  console.log("ID25 is running");

   window.parent.postMessage({ type: 'iframe-ready' }, '*');

   const handleMessage = (event) => {
      if (event.data?.type === 'set-colors') {
        const colors = event.data.colors;
        if (colors && typeof colors === 'object') {
           for (const [key, value] of Object.entries(colors)) {
             document.documentElement.style.setProperty(`--${key}`, value);
             console.log(`Satte --${key} til ${value}`);
          }
        }
     }
   };

   useEffect(() => {
     window.addEventListener('message', handleMessage);
     return () => window.removeEventListener('message', handleMessage);
   }, []);


    const [selectedYear, setSelectedYear] = useState("2025");
    const [filteredData, setFilteredData] = useState([]);
    const [selectedParty, setSelectedParty] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedPersonHistory, setSelectedPersonHistory] = useState({});
    const [selectedFilter, setSelectedFilter] = useState(null); // Valgt svar fra Pie Chart
    const [pieChartData, setPieChartData] = useState([]); // Data til Pie Chart
    const [tableData, setTableData] = useState([]); // Data til Tabel


    const { surveyData, loading } = useSurveyData(selectedYear);
    useEffect(() => {
        if (surveyData.length > 0) {
            setFilteredData(surveyData);
            setTableData(surveyData);
            setPieChartData(surveyData);
        }
    }, [surveyData]);


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
        fetchPersonHistory(person.fornavn);
    };

    const handleReset = () => {
        setSelectedPerson(null);
    };

    const fetchPersonHistory = async (fornavn) => {
        const years = ["2019", "2021", "2022", "2024", "2025"]; // Define years to check
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

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (selectedFilter) {
        if (selectedParty) {
            return (
                <div style={{textAlign: "center"}}>
                    {/* 🔹 Drop-down til at vælge årstal */}
                    <YearSelector value={selectedYear} onChange={handleYearChange} />

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

                    <PartySelector selectedParty={selectedParty} onSelect={handlePartyFilter} />

                    <SearchInput value={searchQuery} onChange={handleSearchChange} />

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
                            <PersonResult title={`Besvarelse for ${selectedYear}`}
                                          person={selectedPerson}
                                          year={selectedYear}
                                          onPartyClick={(party) => {
                                              handleReset();
                                              !selectedParty && setSelectedParty(party);
                                          }}
                            />

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
                                                        <PersonResult title={`${year}`} person={entry} year={year} />
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
                    {/* 🔹 Drop-down til at vælge årstal */}
                    <YearSelector value={selectedYear} onChange={handleYearChange} />

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

                    <PartySelector selectedParty={selectedParty} onSelect={handlePartyFilter} />

                    <SearchInput value={searchQuery} onChange={handleSearchChange} />

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
                            <PersonResult
                                title={`Besvarelse for ${selectedYear}`}
                                person={selectedPerson}
                                year={selectedYear}
                                onPartyClick={(party) => {
                                    handleReset();
                                    !selectedParty && setSelectedParty(party);
                                }}
                            />

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
                                                        <PersonResult title={`${year}`} person={entry} year={year} />
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
                {/* 🔹 Drop-down til at vælge årstal */}
                <YearSelector value={selectedYear} onChange={handleYearChange} />

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

                <PartySelector selectedParty={selectedParty} onSelect={handlePartyFilter} />

                <SearchInput value={searchQuery} onChange={handleSearchChange} />


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
                        <PersonResult title={`Besvarelse for ${selectedYear}`}
                                      person={selectedPerson}
                                      year={selectedYear}
                                      onPartyClick={(party) => {
                                          handleReset();
                                          !selectedParty && setSelectedParty(party);
                                      }}
                        />

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
                                                    <PersonResult title={`${year}`} person={entry} year={year} />
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
