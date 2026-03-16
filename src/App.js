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
import YearSelector, { GetYearLabel } from "./yearSelector";
import MunicipalitySelector, { GetMunicipalities } from "./MunicipalitySelector";
import QuestionSelector, { NavigationButton } from "./QuestionSelector";
import QuestionTitle from "./QuestionTitle";
import QuestionForm from "./QuestionForm";
import Modal from "./Modal";
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

    const allMunicipalities = GetMunicipalities();
    const [selectedYear, setSelectedYear] = useState("2026");
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
    const [hideUnanswered, setHideUnanswered] = useState(true);
    const [besvar, setBesvar] = useState();

    useEffect(() => {

        if (surveyData.length > 0) {


            let filter = surveyData.filter(item =>

                (!selectedMunicipality || item.storkreds === selectedMunicipality)

                && (!selectedParty || getPartiBogstav(getPartiNavn(item.parti)) === selectedParty)

                && (!searchQuery || item.fornavn.toLowerCase().includes(searchQuery))

                && (!selectedFilter || selectedCondition(item, selectedFilter)
                ))
                .sort((a, b) => a.fornavn.localeCompare(b.fornavn));

            if (hideUnanswered) {
                let filter2 = filter.filter(item =>
                    !(item.answers[0].answer === 'Ikke besvaret')
                );

                setFilteredData(filter2);
                setTableData(filter2);
                setPieChartData(filter2);

            }
            else {
                setFilteredData(filter);
                setTableData(filter);
                setPieChartData(filter);
            }

        }
    }, [surveyData, selectedMunicipality, selectedParty, searchQuery, selectedFilter, hideUnanswered]);

    useEffect(() => { setSelectedQuestion(selectedQuestion); }, [selectedQuestion]);



    const handleQuestionSelect = (value) => {

        setSelectedFilter(null);
        setSelectedQuestion(value);
    }

    const handleSliceClick = (selectedAnswer) => {

        if (selectedAnswer === "Ikke besvaret") {
            setHideUnanswered(!hideUnanswered);

        }
        else if (selectedFilter === selectedAnswer) {
            // Reset filtering
            setSelectedFilter(null);

        } else {
            // Filtrér tabellen (parti + valgt svar2)
            setSelectedFilter(selectedAnswer);
        }
    };


    const selectedCondition = (item, label) => {
        if (!selectedQuestion) return false;

        // Extract the numeric part from strings like "spm1", "spm2", etc.
        const match = selectedQuestion.match(/\d+$/);
        const index = match ? parseInt(match[0], 10) - 1 : 0;

        const answerObj = item?.answers?.[index];

        return (
            answerObj?.answer &&
            answerObj.answer.toLowerCase() === label.toLowerCase()
        );
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
        setHideUnanswered(false);
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (!query) {
            setHideUnanswered(true);
        }
    };

    const handleMunicipalityChange = (municipality) => {

        if (municipality.target.value === allMunicipalities[0].value) {
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
        //fetchPersonHistory(person.fornavn);
    };

    const handleReset = () => {
        setSelectedPerson(null);
    };

    const fetchPersonHistory = async (fornavn) => {
        const years = ["2019", "2021", "2022", "2024", "2026", "8888", "9999"];
        const history = {};

        try {
            for (const year of years) {
                const response = await fetch(
                    `https://id25-backend-docker.onrender.com/api/survey/results?year=${year}&fornavn=${encodeURIComponent(fornavn)}`
                );

                if (!response.ok) {
                    console.error(`Fejl ved hentning af ${year}:`, response.statusText);
                    continue;
                }

                const data = await response.json();

                if (data.length > 0 && data[0].svar2 != "Ikke besvaret") {
                    history[year] = data;
                }
            }

            setSelectedPersonHistory(history);
        } catch (error) {
            console.error("Fejl ved hentning af historiske data:", error);
        }
    };



    const SpinnerOrData = () => {

        if (loading) {
            return (
                <LoadingSpinner />
            );
        }
        return (<div style={{ marginBottom: "30px" }}>
            <SurveyPieChartDefault
                filteredData={pieChartData}
                labels={selectedLabels(selectedYear, selectedQuestion)}
                onSliceClick={handleSliceClick}
                condition={selectedCondition}

            />
        </div>);
    }

    const rowsPerPage = searchQuery ? 100 : 0;
    return (

        <div className="relative min-h-screen">
            <div style={{ textAlign: "center" }}>
                <div>
                    <MunicipalitySelector
                        value={selectedMunicipality}
                        year={selectedYear}
                        onChange={handleMunicipalityChange}
                    />

                    <PartySelector selectedParty={selectedParty} onSelect={handlePartyFilter} />

                    <ResultsTable
                        filteredData={tableData}
                        handleRowClick={handleRowClick}
                        rowsPerPage={rowsPerPage}
                    />

                    <SearchInput value={searchQuery} onChange={handleSearchChange} />

                    <QuestionSelector
                        value={selectedQuestion}
                        handleQuestionSelect={handleQuestionSelect}
                        year={selectedYear}
                    />


                    <NavigationButton
                        selectedQuestion={selectedQuestion}
                        handleQuestionSelect={handleQuestionSelect}
                    />

                    <QuestionTitle value={selectedQuestion} year={selectedYear} />


                    <button className="button"
                        onClick={() => {
                            setBesvar(true);
                        }
                        }
                    >
                        Tag kandidattesten
                    </button>

                    <h2>
                        {
                            selectedParty && selectedMunicipality
                                ? `Fordeling af besvarelser for ${getPartiNavn(selectedParty)} for ${selectedMunicipality}`
                                : selectedParty && !selectedMunicipality ? `Fordeling af alle besvarelser for ${getPartiNavn(selectedParty)}` :
                                    !selectedParty && selectedMunicipality ? `Fordeling af alle besvarelser for ${selectedMunicipality}` :
                                        "Fordeling af alle besvarelser"}
                    </h2>

                    <SpinnerOrData />ˇ
                </div>


                {filteredData.length > 0 && (
                    <div style={{ marginTop: "20px" }}>

                        <ResultsTable
                            filteredData={tableData}
                            handleRowClick={handleRowClick}
                            rowsPerPage={10}
                        />
                    </div>
                )}

                <Modal open={!!besvar} onClose={() => setBesvar(null)}>
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 12 }}>
                            <h2 id="modal-title" style={{ margin: 0 }}>
                                {selectedPerson?.name ?? "Detaljer"}
                            </h2>
                            <button onClick={() => setBesvar(null)} className="button">Luk</button>
                        </div>

                        {besvar && (
                            <>
                                <QuestionForm
                                />
                            </>
                        )}
                    </div>
                </Modal>


                <Modal open={!!selectedPerson} onClose={() => setSelectedPerson(null)}>
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginBottom: 12 }}>
                            <h2 id="modal-title" style={{ margin: 0 }}>
                                {selectedPerson?.name ?? "Detaljer"}
                            </h2>
                            <button onClick={() => setSelectedPerson(null)} className="button">Luk</button>
                        </div>

                        {selectedPerson && (
                            <>
                                <PersonResult
                                    person={selectedPerson}
                                    year={selectedYear}
                                    onPartyClick={(party) => {
                                        setSelectedPerson(null);
                                        !selectedParty && setSelectedParty(party);
                                    }}
                                />
                            </>
                        )}
                    </div>
                </Modal>
            </div>
        </div>
    );
};


export default App;