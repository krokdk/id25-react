import React from "react";
import "./styles.css";


export const question2026 = [
    { value: "spm1", label: "1: Bør kirke og stat adskilles?" },
    { value: "spm2", label: "2: Støtte til trossamfund" },
    { value: "spm3", label: "3: Bør kongen have religionsfrihed?" },
    { value: "spm4", label: "4: Civil registrering" },
    { value: "spm5", label: "5: Bør Koranloven afskaffes?" },
    { value: "spm6", label: "6: Kristendomskundskab i folkeskolen" },
    { value: "spm7", label: "7: Forbud mod iøjnefaldende religiøse symboler i skoler" },
    { value: "spm8", label: "8: Offentlige lokaler til religionsudøvelse" },
    { value: "spm9", label: "9: Statstilskud til religiøse friskoler" },
    { value: "spm10", label: "10: Forbud mod omvendelsesterapi til LGBT+" },
    { value: "spm11", label: "11: Forbud mod religiøse ægteskabskontrakter" },
    { value: "spm12", label: "12: Personlig holdning til omskæring af raske drengebørn" },
    { value: "spm13", label: "13: 18 års mindstealder for omskæring af raske børn" },
];

export const NavigationButton = ({selectedQuestion, handleQuestionSelect }) => {
    return (<div style={{ marginTop: "10px", textAlign: "center" }}>
        <button className="button"
            onClick={() => {
                const prevQuestion = GetPreviousQuestion({ current: selectedQuestion });
                handleQuestionSelect(prevQuestion.value);
            }
            }
            disabled={selectedQuestion === "spm1"}

        >
            Forrige
        </button>
        <button className="button"
            onClick={() => {
                const nextQuestion = GetNextQuestion({ current: selectedQuestion });
                handleQuestionSelect(nextQuestion.value)

            }}
            disabled={selectedQuestion === "spm13"}


        >
            Næste
        </button>
    </div>);
}

export const GetNextQuestion = ({ current }) => {

    const index = question2026.findIndex(option => option.value === current);

    return question2026[index + 1];
}

export const GetPreviousQuestion = ({ current }) => {

    const index = question2026.findIndex(option => option.value === current);

    return question2026[index - 1];
}

const QuestionSelector = ({ value, handleQuestionSelect, year }) => {



    const options2025 = [
        { value: "spm1", label: "Spørgsmål 1" },
        { value: "spm2", label: "Spørgsmål 2" },
        { value: "spm3", label: "Spørgsmål 3" },
    ];

    const optionsOld = [
        { value: "spm1", label: "Spørgsmål 1" },
        { value: "spm2", label: "Spørgsmål 2" },
        { value: "spm3", label: "Spørgsmål 3" },
        { value: "spm4", label: "Spørgsmål 4" },
    ];


    const options2019 = [
        { value: "spm2", label: "Spørgsmålet" }
    ];

    const options2021 = [
        { value: "spm2", label: "Borgerforslag" }
    ];

    let options = year === "2026" ? question2026 : (year === "9999" || year === "8888") ? options2025 : year === "2019" ? options2019 : year === "2021" ? options2021 : optionsOld;

    return (
        <div className="dropdownComponent">
            <select
                id="questionSelect"
                value={value}
                onChange={(e) => handleQuestionSelect(e.target.value)}
                className="dropdown"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default QuestionSelector;
