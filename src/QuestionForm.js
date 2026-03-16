import { useState } from "react";
import { Questions2026 } from "./Questions2025";
import MunicipalitySelector, { GetMunicipalities } from "./MunicipalitySelector";
import "./styles.css";
import ResultsTableMatch from "./resultsTableMatch";
import PersonResult from "./person/personResult";
import PersonDetailsCard2025 from "./person/personDetailsCard2025"
import LoadingSpinner from "./spinner/loadingSpinner";

const QuestionForm = () => {

    const allMunicipalities = GetMunicipalities();
    const [selectedMunicipality, setSelectedMunicipality] = useState(null);

    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [besvaret, setBesvaret] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    const question2026 = Object.values(Questions2026);


    const handleRowClick = (person) => {
        setSelectedPerson(person);
    };

    const handleBackClick = () => {
        setSelectedPerson(null);
    };

    const handleSeDineSvarClick = () => {
        setBesvaret(false);
    };

    const handleMunicipalityChange = (municipality) => {

        if (municipality.target.value === allMunicipalities[0].value) {
            setSelectedMunicipality(null);
        } else {
            setSelectedMunicipality(municipality.target.value);
        }

    };

    const handleAnswerChange = (index, value) => {
        setAnswers({
            ...answers,
            [index]: value
        });
        if (selectedMunicipality && currentQuestion < question2026.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleSubmit = async () => {

        if (!selectedMunicipality) {
            alert("Vælg kommune først");
            return;
        }

        const answersArray = Object.entries(answers).map(([i, answer]) => ({
            question: question2026[i].TEXT,
            answer,
            comment: ""
        }));

        const body = {
            storkreds: selectedMunicipality,
            answers: answersArray
        };

        setBesvaret(true);
        try {

            setLoading(true);

            const response = await fetch(
                "https://id25-backend-docker.onrender.com/api/survey/results/matches",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const data = await response.json();

            // sorter efter score
            data.sort((a, b) => b.score - a.score);

            setResult(data);


        } catch (error) {
            console.error("Fejl ved kald til match API:", error);
        } finally {
            setLoading(false);
        }
    };

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const nextQuestion = () => {
        if (!selectedMunicipality) {
            alert("Vælg kommune først");
            return;
        }

        if (currentQuestion < question2026.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const prevQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const q = question2026[currentQuestion];
    const groupName = `question-${currentQuestion}/${question2026.length}`;

    if (!besvaret) {
        return (

            <div className="qa-block">

                {(currentQuestion === 0) && (

                    <div className="card person-card">

                        <div className="qa-block">
                            <div className="qa-question">
                                <p>Besvar testen og find de opstillede kandidater som matcher dine svar bedst</p>
                            </div>
                        </div>

                        <div className="spmdisc">
                            Vælg den storkreds du må stemme i
                        </div>

                        <MunicipalitySelector
                            value={selectedMunicipality}
                            year="2026"
                            onChange={handleMunicipalityChange}
                        />

                    </div>


                )};

                {(
                    <div className="card person-card">

                        <div className="qa-question">
                            <p>{q.TEXT}</p>
                        </div>

                        <div className="qa-answers">

                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name={groupName}
                                    checked={answers[currentQuestion] === "Ja"}
                                    onChange={() => handleAnswerChange(currentQuestion, "Ja")}
                                />
                                Ja
                            </label>

                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name={groupName}
                                    checked={answers[currentQuestion] === "Nej"}
                                    onChange={() => handleAnswerChange(currentQuestion, "Nej")}
                                />
                                Nej
                            </label>

                            <label className="radio-option">
                                <input
                                    type="radio"
                                    name={groupName}
                                    checked={answers[currentQuestion] === "Ved ikke"}
                                    onChange={() => handleAnswerChange(currentQuestion, "Ved ikke")}
                                />
                                Ved ikke
                            </label>

                            <div className="spmdisc">
                                <p>{q.BREAD}</p>
                            </div>
                        </div>
                    </div>
                )};

                <div className="navigation" >

                    {currentQuestion > -1 && (
                        <button className="button" onClick={prevQuestion}>
                            Forrige
                        </button>
                    )}

                    {currentQuestion < question2026.length - 1 ? (
                        <button className="button"
                            disabled={!selectedMunicipality}
                            onClick={nextQuestion}>
                            Næste
                        </button>
                    ) : (
                        <button className="button" onClick={handleSubmit}>
                            Besvar
                        </button>
                    )}

                </div>

            </div>

        );
    }
    if (loading) {
        return (
            <LoadingSpinner />
        );
    }

    if (besvaret && !selectedPerson) {
        return (
            result.length > 0 && (


                <div className="result-block">
                    <button className="button" onClick={handleSeDineSvarClick}>
                        Se dine svar
                    </button>
                    <h3>Top 10 bedste matches</h3>
                    <ResultsTableMatch
                        filteredData={result}
                        handleRowClick={handleRowClick}
                        rowsPerPage={10}
                    />
                </div>
            )
        );
    }
    if (selectedPerson) {
        return (
            <>
                <button className="button" onClick={handleBackClick}>
                    Tilbage
                </button>
                <PersonDetailsCard2025
                    person={selectedPerson}
                    onPartyClick={null}
                />
            </>
        );
    }
};

export default QuestionForm;
