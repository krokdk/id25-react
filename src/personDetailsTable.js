import React from "react";
import questions from "./questions";
import "./styles.css"; // Import global styles

const PersonDetailsTable = ({ person }) => {
    // If no person is selected, return null
    if (!person || !person.fornavn) return null;

    return (
        <table className="table">
            <tbody>
            <tr><td className="table-header">Fornavn:</td><td className="table-cell">{person.fornavn}</td></tr>
            <tr><td className="table-header">Parti:</td><td className="table-cell">{getPartiNavn(person.parti)}</td></tr>
            <tr><td className="table-header">{questions.SPM1}</td><td className="table-cell">{person.svar1}</td></tr>
            <tr><td className="table-header">{questions.SPM2}</td><td className="table-cell">{person.svar2}</td></tr>
            <tr><td className="table-header">{questions.SPM3}</td><td className="table-cell">{person.svar3}</td></tr>
            <tr><td className="table-header">{questions.SPM4}</td><td className="table-cell">{person.svar4}</td></tr>
            <tr><td className="table-header">{questions.SPM5}</td><td className="table-cell">{person.svar5}</td></tr>
            </tbody>
        </table>
    );
};

export default PersonDetailsTable;
