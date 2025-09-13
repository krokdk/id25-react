import React from "react";
import Questions2025 from "./Questions2025";
import Questions from "./questions";
import "./styles.css";

const QuestionTitle = ({ value, year }) => {
    const options2025 = [
        // { value: "2025", label: "Folketingsvalg 2025" },
        { spm: "spm1", text: Questions2025.SPM1 },
        { spm: "spm2", text: Questions2025.SPM2 },
        { spm: "spm3", text: Questions2025.SPM3 },
    ];

    const optionsOld = [
        // { value: "2025", label: "Folketingsvalg 2025" },
        { spm: "spm1", text: Questions.SPM1 },
        { spm: "spm2", text: Questions.SPM2 },
        { spm: "spm3", text: Questions.SPM3 },
        { spm: "spm4", text: Questions.SPM4 },

    ];



    if (year === "8888" || year === "9999") {
        return (
            <h3 className="spmtitle"> {options2025.find(p => p.spm === value).text} </h3>
        );
    }
    else {
        return (
            <h3 className="spmtitle"> {optionsOld.find(p => p.spm === value).text} </h3>
        );
    }
};

export default QuestionTitle;
