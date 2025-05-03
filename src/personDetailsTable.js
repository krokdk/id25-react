import React from "react";
import questions from "./questions";
import "./styles.css";
import { getPartiNavn } from "./partyMapper";

const PersonDetailsTable = ({ person }) => {
    // Hvis ingen person er valgt
    if (!person || !person.fornavn) return null;

    // Hvis kandidaten ikke har svaret
    if (!person.svar1 || person.svar1 === "Ikke besvaret") {

        if (!person.url ||  person.url === "")
        {
           <div className="missing-response1">
               <p> {person.fornavn} har endnu ikke besvaret vores spørgeskema.</p>
           </div>

        }
        else
          return (
            <div className="missing-response2">
                <p> {person.fornavn} har endnu ikke besvaret vores spørgeskema.</p>
                <p>
                    Hvad med at skrive og spørge {person.fornavn} hvorfor? Du finder kontakt-informationer her:
                    <p>
                    </p>
                    {" "}
                    <a href={person.url} target="_blank" rel="noopener noreferrer">
                        {person.url}
                    </a>
                </p>
            </div>
                );
            };

    // Ellers vis tabel med data
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
