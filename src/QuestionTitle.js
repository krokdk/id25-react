import React from "react";
import Question2025Kommunal, { Questions2019, Questions2021, Questions2025Regional } from "./Questions2025";
import Questions from "./questions";
import "./styles.css";

const QuestionTitle = ({ value, year }) => {
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
