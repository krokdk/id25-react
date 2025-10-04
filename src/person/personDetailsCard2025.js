import React from "react";
import Questions from "../Questions2025";
import PartyButton from "../party/PartyButton";
import "../styles.css";

const PersonDetailsCard2025 = ({ person, onPartyClick }) => {
    if (!person || !person.fornavn) return null;

    const hasNoAnswers =
        !person.svar1 || person.svar1 === "Ikke besvaret";

    if (hasNoAnswers) {
        return (
            <div className="card person-card">
                <div className="person-header">
                    <h2>{person.fornavn}</h2>
                    <PartyButton party={person.parti} onClick={onPartyClick} />
                    <h3>{person.valg}, {person.storkreds}</h3>
                </div>

                <div className="qa-block">
                    <div className="qa-question">
                        <p>
                            <strong>{person.fornavn}</strong> har desværre ikke besvaret vores kandidattest.
                        </p>
                        { person.url && person.url.trim() !== "" && (
                            <p>
                                Hvorfor ikke skrive og spørge hvorfor?

                                <a href={person.url} target="_blank" rel="noopener noreferrer">
                                                            kontaktinfo
                                                        </a>
                            </p>
                        )}
                    </div>
                </div>


            </div>
        );
    }

    const questionAnswerPairs = [
        { question: Questions.SPM1, answer: person.svar1 },
        { question: Questions.SPM2, answer: person.svar2 },
        { question: Questions.SPM3, answer: person.svar3 },
        { question: Questions.Comment, answer: person.svar4 },
    ].filter(qa => qa.answer && qa.answer !== "");

    return (
        <div className="card person-card">
            <div className="person-header">
                <h2>{person.fornavn}</h2>
                <PartyButton party={person.parti} onClick={onPartyClick} />
                <h2>{person.valg}, {person.storkreds}</h2>
            </div>

            {questionAnswerPairs.map(({ question, answer }, index) => (
                <div key={index} className="qa-block">
                    <div className="qa-question">{question}</div>
                    <div className="qa-answer">{answer}</div>
                </div>
            ))}
        </div>
    );
};

export default PersonDetailsCard2025;
