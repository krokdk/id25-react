import React from "react";
import questions from "./questions";
import {getPartiNavn, getPartyColor} from "./partyMapper";
import "./styles.css";
import Questions from "./questions"; // Import global styles

const PersonDetailsCard2021 = ({ person }) => {
    // If no person is selected, return null
    if (!person || !person.fornavn) return null;



    const questionAnswerPairs = [
        { question: "Hvordan stemte vedkommene da Intact Denmarks borgerforslag var til afstemning i Folketinget?", answer: person.svar2 },
    ].filter(qa => qa.answer && qa.answer !== "");

    return (
        <div className="card person-card">
            <div className="person-header">
                <h2>{person.fornavn}</h2>
                <p
                    className="party-label"
                    style={{ backgroundColor: getPartyColor(person.parti) }}
                >
                    {getPartiNavn(person.parti) || "Øvrige"}
                </p>
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

export default PersonDetailsCard2021;
