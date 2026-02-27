import React from "react";
import Question2025Kommunal, { Questions2026, Questions2019, Questions2021, Questions2025Regional } from "./Questions2025";
import Questions from "./questions";
import "./styles.css";

const QuestionTitle = ({ value, year }) => {

const options2026 = [
    { spm: "spm1", text: Questions2026.SPM1, bread: "Kommuner kan selvstændigt udvikle og gennemføre forebyggende indsatser. Dette gælder også områder, hvor Folketinget ikke har fastsat forbud, f.eks. forebyggelse af rygning eller andre sundhedsmæssige risici. Omskæring af raske drengebørn kan medføre komplikationer både på kort og på langt sigt. Derfor har vi stillet de kommunale kandidater 3 spørgsmål og givet dem mulighed for at supplere med en kommentar." },
    { spm: "spm2", text: Questions2026.SPM2, bread: "Det kommunale bagland har stor betydning for den politiske udvikling i et parti. De har ofte indflydelse på hvilke kandidater, der opstilles til kommende valg og en del går videre til Folketinget senere." },
    { spm: "spm3", text: Questions2026.SPM3, bread: "Dette spørgsmål har til formål at vise om kandidaterne er på linje med deres parti, eller om de repræsenterer en anden linje." },
    { spm: "spm4", text: Questions2026.SPM4, bread: "spørgsmål 4" },
    { spm: "spm5", text: Questions2026.SPM5, bread: "spørgsmål 5" },
    { spm: "spm6", text: Questions2026.SPM6, bread: "spørgsmål 6" },
    { spm: "spm7", text: Questions2026.SPM7, bread: "spørgsmål 7" },
    { spm: "spm8", text: Questions2026.SPM8, bread: "spørgsmål 8" },
    { spm: "spm9", text: Questions2026.SPM9, bread: "spørgsmål 9" },
    { spm: "spm10", text: Questions2026.SPM10, bread: "spørgsmål 10" },
    { spm: "spm11", text: Questions2026.SPM11, bread: "spørgsmål 11" },
    { spm: "spm12", text: Questions2026.SPM12, bread: "spørgsmål 12" },
    { spm: "spm13", text: Questions2026.SPM13, bread: "spørgsmål 13" },
    { spm: "spm14", text: Questions2026.SPM14, bread: "spørgsmål 14" },
    { spm: "spm15", text: Questions2026.SPM15, bread: "spørgsmål 15" },
    { spm: "spm16", text: Questions2026.SPM16, bread: "spørgsmål 16" },
    { spm: "spm17", text: Questions2026.SPM17, bread: "spørgsmål 17" },
    { spm: "spm18", text: Questions2026.SPM18, bread: "spørgsmål 18" },
    { spm: "spm19", text: Questions2026.SPM19, bread: "spørgsmål 19" },
    { spm: "spm20", text: Questions2026.SPM20, bread: "spørgsmål 20" },
];


    const options2025 = [
        { spm: "spm1", text: Question2025Kommunal.SPM1, bread: "Kommuner kan selvstændigt udvikle og gennemføre forebyggende indsatser. Dette gælder også områder, hvor Folketinget ikke har fastsat forbud, f.eks. forebyggelse af rygning eller andre sundhedsmæssige risici. Omskæring af raske drengebørn kan medføre komplikationer både på kort og på langt sigt. Derfor har vi stillet de kommunale kandidater 3 spørgsmål og givet dem mulighed for at supplere med en kommentar." },
        { spm: "spm2", text: Question2025Kommunal.SPM2, bread: "Det kommunale bagland har stor betydning for den politiske udvikling i et parti. De har ofte indflydelse på hvilke kandidater, der opstilles til kommende valg og en del går videre til Folketinget senere." },
        { spm: "spm3", text: Question2025Kommunal.SPM3, bread: "Dette spørgsmål har til formål at vise om kandidaterne er på linje med deres parti, eller om de repræsenterer en anden linje." },
    ];

    const options2025reg = [
        { spm: "spm1", text: Questions2025Regional.SPM1, bread: "Der forekommer hvert år et betydeligt antal kort- og langsigtede komplikationer relateret til omskæring uden medicinsk begrundelse. Regionerne bærer den økonomiske byrde ved behandling af disse komplikationer.\r\nRegionerne kan selvstændigt udvikle og gennemføre  forebyggelses- og sundhedsfremmende  indsatser. Dette gælder også områder, hvor Folketinget ikke har fastsat forbud, f.eks. forebyggelse af rygning, alkohol eller andre sundhedsmæssige risici.\r\nRegionale forebyggelsestiltag gennemføres som oftest, hvis det på sigt kan øge borgernes sundhed, samt nedbringe det regionale udgiftsniveau.    " },
        { spm: "spm2", text: Questions2025Regional.SPM2, bread: "Det regionale bagland har stor betydning for den politiske udvikling i et parti. De har ofte indflydelse på hvilke kandidater, der opstilles til kommende valg og en del går videre til Folketinget senere. " },
        { spm: "spm3", text: Questions2025Regional.SPM3, bread: "Dette spørgsmål har til formål at vise om kandidaterne er på linje med deres parti, eller om de repræsenterer en anden linje. " },
    ];

    const optionsOld = [
        { spm: "spm1", text: Questions.SPM1, bread: "" },
        { spm: "spm2", text: Questions.SPM2, bread: "" },
        { spm: "spm3", text: Questions.SPM3, bread: "" },
        { spm: "spm4", text: Questions.SPM4, bread: "" },
    ];


    if (year === "2026") {
        return (
            <div>
                <div className="spmdisc">{options2026.find(p => p.spm == value).bread}</div>
                <h3 className="spmtitle"> {options2026.find(p => p.spm === value).text} </h3>
            </div>
        );
    }

    if (year === "9999") {
        return (
            <div>
                <div className="spmdisc">{options2025.find(p => p.spm == value).bread}</div>
                <h3 className="spmtitle"> {options2025.find(p => p.spm === value).text} </h3>
            </div>
        );
    }
    if (year === "8888") {
        return (
            <div>
                <div className="spmdisc"> {options2025reg.find(p => p.spm === value).bread} </div>
                <h3 className="spmtitle"> {options2025reg.find(p => p.spm === value).text} </h3>
            </div>
        );
    }
    else if (year === "2021") {
        return (
            <h3 className="spmtitle"> {Questions2021.SPM2} </h3>
        );

    }
    else if (year === "2019") {
        return (
            <h3 className="spmtitle"> {Questions2019.SPM2} </h3>
        );

    }
    else {
        return (
            <h3 className="spmtitle"> {optionsOld.find(p => p.spm === value).text} </h3>
        );
    }
};

export default QuestionTitle;
