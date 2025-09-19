import React, { useState, useEffect, use } from "react";
import SurveyPieChartDefault from "./piechart/pieChartDefault";
import partyMapper, { getPartiNavn, getPartiBogstav } from "./party/partyMapper";
import "./styles.css";
import ResultsTable from "./resultsTable";
import LoadingSpinner from "./spinner/loadingSpinner";
import useSurveyData from "./useSurveyData";
import PartySelector from "./party/partySelector";
import SearchInput from "./searchInput";
import PersonResult from "./person/personResult";
import YearSelector from "./yearSelector";
import MunicipalitySelector from "./MunicipalitySelector";
import QuestionSelector from "./QuestionSelector";
import Questions2025 from "./Questions2025";
import QuestionTitle from "./QuestionTitle";
//import MapAnimation from "./map/MapAnimation";

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


    //const [selectedYear, setSelectedYear] = useState("2025");
    const [selectedYear, setSelectedYear] = useState("9999");
    const [selectedQuestion, setSelectedQuestion] = useState("spm1");
    const [filteredData, setFilteredData] = useState([]);
    const [selectedParty, setSelectedParty] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedPersonHistory, setSelectedPersonHistory] = useState({});
    const [selectedFilter, setSelectedFilter] = useState(null); // Valgt svar fra Pie Chart
    const [pieChartData, setPieChartData] = useState([]); // Data til Pie Chart
    const [tableData, setTableData] = useState([]); // Data til Tabel
    const [selectedMunicipality, setSelectedMunicipality] = useState(null);
    const { surveyData, loading } = useSurveyData(selectedYear);

    useEffect(() => {

        if (surveyData.length > 0) {
            let filter = surveyData.filter(item =>

                (!selectedMunicipality || item.storkreds === selectedMunicipality)

                && (!selectedParty || getPartiBogstav(getPartiNavn(item.parti)) === selectedParty)

                && (!searchQuery || item.fornavn.toLowerCase().includes(searchQuery))

                && (!selectedFilter || selectedCondition(item, selectedFilter)
                )

            )
                .sort((a, b) => a.fornavn.localeCompare(b.fornavn))
                ;

            if (selectedYear === "2019" || selectedYear === "2021") {
                setSelectedQuestion("spm2")
            }

            setFilteredData(filter);
            setTableData(filter);
            setPieChartData(filter);
        }
    }, [surveyData, selectedMunicipality, selectedParty, searchQuery, selectedFilter]);

    useEffect(() => { setSelectedQuestion(selectedQuestion); }, [selectedQuestion]);


    const handleQuestionSelect = (selectedQuestion) => {
        setSelectedQuestion(selectedQuestion.target.value);
    }

    const handleSliceClick = (selectedAnswer) => {
        if (selectedFilter === selectedAnswer) {
            // Reset filtering
            setSelectedFilter(null);

        } else {
            // Filtrér tabellen (parti + valgt svar2)
            setSelectedFilter(selectedAnswer);
        }
    };


    const selectedCondition = (item, label) => {

        if (selectedQuestion === "spm1") { return item.svar1 && item.svar1.toLowerCase() === label.toLowerCase(); }
        else if (selectedQuestion === "spm2") { return item.svar2 && item.svar2.toLowerCase() === label.toLowerCase(); }
        else if (selectedQuestion === "spm3") { return item.svar3 && item.svar3.toLowerCase() === label.toLowerCase(); }
        else return item.svar1 && item.svar1.toLowerCase() === label.toLowerCase();
    };

    const selectedLabels = (year, question) => {

        if (question === "spm3" && (year === "9999" || year === "8888")) {
            return ["Ja, mit parti er for en 18-års aldersgrænse.",
                "Ja, mit parti er imod en 18-års aldersgrænse.",
                "Ja, mit parti har fritstillet partimedlemmerne om en 18-års aldersgrænse.",
                "Ikke besvaret",
                "Nej, det ved jeg ikke."
            ];
        }


        return {
            "2019": ["For", "Imod", "Måske", "Ikke besvaret"],
            "2021": ["For", "Imod", "Hverken for eller imod", "Fraværende"]
        }[year] || ["Ja", "Nej", "Ved ikke", "Ikke besvaret"]
    };


    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
        setSelectedParty(null);
        setSearchQuery("");
        setSelectedPerson(null);
        setSelectedMunicipality(null);
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
    };

    const handleMunicipalityChange = (municipality) => {

        if (municipality.target.value === "Alle") {
            setSelectedMunicipality(null);
        }
        else {
            setSelectedMunicipality(municipality.target.value);
        }

    };

    const handlePartyFilter = (party) => {
        if (selectedParty === party) {
            setSelectedParty(null);
        }
        else {
            setSelectedParty(party);
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
        const years = ["2019", "2021", "2022", "2024"];//, "2025"]; // Define years to check
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
        return (
            <div style={{ textAlign: "center" }}>
                <YearSelector value={selectedYear} onChange={handleYearChange} />
                <MunicipalitySelector value={selectedMunicipality} year={selectedYear} onChange={handleMunicipalityChange} />
                <QuestionSelector value={selectedQuestion} onChange={handleQuestionSelect} year={selectedYear} />
                <QuestionTitle value={selectedQuestion} year={selectedYear} />
                <LoadingSpinner />
                <PartySelector selectedParty={selectedParty} onSelect={handlePartyFilter} />
            </div>
        );
    }
    return (

        <div className="relative min-h-screen">

            <div style={{ textAlign: "center" }}>

                <YearSelector value={selectedYear} onChange={handleYearChange} />
                <MunicipalitySelector value={selectedMunicipality} year={selectedYear} onChange={handleMunicipalityChange} />
                <QuestionSelector value={selectedQuestion} onChange={handleQuestionSelect} year={selectedYear} />
                <QuestionTitle value={selectedQuestion} year={selectedYear} />

                {/* 🔹 Pie chart */
                    !selectedPerson && (
                        <div style={{ marginBottom: "30px" }}>
                            <SurveyPieChartDefault
                                filteredData={pieChartData}
                                labels={selectedLabels(selectedYear, selectedQuestion)}
                                onSliceClick={handleSliceClick}
                                condition={selectedCondition}
                            />
                        </div>
                    )
                }

                <PartySelector selectedParty={selectedParty} onSelect={handlePartyFilter} />

                <SearchInput value={searchQuery} onChange={handleSearchChange} />


                {filteredData.length > 0 && !selectedPerson && (
                    <div style={{ marginTop: "20px" }}>
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
                        <PersonResult //title={`Besvarelse for ${selectedYear}`}
                            person={selectedPerson}
                            year={selectedYear}
                            onPartyClick={(party) => {
                                handleReset();
                                !selectedParty && setSelectedParty(party);
                            }}
                        />

                        {/* Andre resultater */}
                        {Object.keys(selectedPersonHistory).length > 0 && (
                            <div style={{ marginTop: "30px" }}>
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
        </div>
    );
};


export default App;