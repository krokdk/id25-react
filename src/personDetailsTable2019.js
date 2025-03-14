import React from "react";
import questions from "./questions";
import { getPartiNavn } from "./partyMapper";
import "./styles.css"; // Import global styles

const PersonDetailsTable2019 = ({ person }) => {
    // If no person is selected, return null
    if (!person || !person.fornavn) return null;

    return (
        <table className="table">
            <tbody>
            <tr><td className="table-header">Fornavn:</td><td className="table-cell">{person.fornavn}</td></tr>
            <tr><td className="table-header">Parti:</td><td className="table-cell">{getPartiNavn(person.parti)}</td></tr>
            <tr><td className="table-header">{questions.SPM2}</td><td className="table-cell">{person.svar2}</td></tr>
            </tbody>
        </table>
    );
};

export default PersonDetailsTable2019;
