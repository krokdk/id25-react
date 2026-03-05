import React from "react";
import Questions, { Questions2026 } from "../Questions2025";
import PartyButton from "../party/PartyButton";
import "../styles.css";

const PersonDetailsCard2025 = ({ person, onPartyClick }) => {
    if (!person || !person.fornavn) return null;

    const hasNoAnswers =
        !person.answers[0] || person.answers[0].answer === "Ikke besvaret";

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
                            <strong>{person.fornavn}</strong> har endnu ikke besvaret vores kandidattest.
                        </p>
                        {person.url && person.url.trim() !== "" && (
                            <a href={person.url} >Hvorfor ikke skrive og spørge hvorfor?</a>
                        )}
                    </div>
                </div>


            </div>
        );
    }

    const questionAnswerPairs = person.answers
        .map((ans, i) => {
            const questionKey = `SPM${i + 1}`;
            return {
                question: Questions2026[questionKey]?.TEXT,
                answer: ans?.answer
            };
        })
        .filter(qa => qa.question && qa.answer);

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


            <div className="qa-block">
                <div className="qa-question">Kommentar</div>
                <div className="qa-answer">{person.comment}</div>
            </div>
        </div>
    );
};

export default PersonDetailsCard2025;
