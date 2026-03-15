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


    if (!besvaret) {
        return (

            <div className="card person-card">

                <div className="qa-block">
                    <div className="qa-question">
                        <p>Besvar kandidattesten:</p>
                    </div>
                </div>



                <MunicipalitySelector
                    value={selectedMunicipality}
                    year="2026"
                    onChange={handleMunicipalityChange}
                />

                {question2026.map((q, index) => {

                    const groupName = `question-${index}`;

                    return (
                        <div key={index} className="qa-block">

                            <div className="qa-question">
                                <p>{q.TEXT}</p>
                            </div>
                            <div className="spmdisc">
                                <p>{q.BREAD}</p>
                            </div>

                            <div className="qa-answers">

                                <label>
                                    <input
                                        type="radio"
                                        name={groupName}
                                        checked={answers[index] === "Ja"}
                                        onChange={() => handleAnswerChange(index, "Ja")}
                                    />
                                    Ja
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name={groupName}
                                        checked={answers[index] === "Nej"}
                                        onChange={() => handleAnswerChange(index, "Nej")}
                                    />
                                    Nej
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name={groupName}
                                        checked={answers[index] === "Ved ikke"}
                                        onChange={() => handleAnswerChange(index, "Ved ikke")}
                                    />
                                    Ved ikke
                                </label>

                            </div>

                        </div>
                    );
                })}

                <button className="button" onClick={handleSubmit}>
                    Besvar
                </button>

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
                    <h3>Bedste match</h3>
                    <ResultsTableMatch
                        filteredData={result}
                        handleRowClick={handleRowClick}
                        rowsPerPage={5}
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
