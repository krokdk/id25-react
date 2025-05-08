import React from "react";
import Questions from "./questions";
import PartyButton from "./PartyButton";
import "./styles.css";

const PersonDetailsCard = ({ person, onPartyClick }) => {
    if (!person || !person.fornavn) return null;

    const hasNoAnswers =
        !person.svar1 || person.svar1 === "Ikke besvaret";

    if (hasNoAnswers) {
        return (
            <div className="card person-card">
                <div className="person-header">
                    <h2>{person.fornavn}</h2>
                    <PartyButton party={person.parti} onClick={onPartyClick} />
                </div>

                <div className="qa-block">
                    <div className="qa-question">
                        <p>
                            <strong>{person.fornavn}</strong> har desværre ikke besvaret vores spørgeskema.
                        </p>
                        { person.url && person.url.trim() !== "" && (
                            <p>
                                Hvorfor ikke skrive og spørge hvorfor? Du finder kontakt-informationer her:
                            </p>
                        )}
                    </div>
                    <div className="qa-answer">
                        <a href={person.url} target="_blank" rel="noopener noreferrer">
                            {person.url}
                        </a>
                    </div>
                </div>


            </div>
        );
    }

    const questionAnswerPairs = [
        { question: Questions.SPM1, answer: person.svar1 },
        { question: Questions.SPM2, answer: person.svar2 },
        { question: Questions.SPM3, answer: person.svar3 },
        { question: Questions.SPM4, answer: person.svar4 },
        { question: Questions.SPM5, answer: person.svar5 },
    ].filter(qa => qa.answer && qa.answer !== "");

    return (
        <div className="card person-card">
            <div className="person-header">
                <h2>{person.fornavn}</h2>
                <PartyButton party={person.parti} onClick={onPartyClick} />
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

export default PersonDetailsCard;
