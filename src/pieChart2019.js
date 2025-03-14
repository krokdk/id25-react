// src/SurveyPieChart2019.js
import React from "react";
import SurveyPieChart from "./SurveyPieChart";
import colorScheme from "./colorScheme";

const SurveyPieChart2019 = ({ filteredData }) => {
    return (
        <SurveyPieChart
            chartData={{
                labels: ["For", "Imod", "Måske", "Ikke besvaret"],
                datasets: [{
                    data: [
                        filteredData.filter(item => item.svar2.toLowerCase() === "for").length,
                        filteredData.filter(item => item.svar2.toLowerCase() === "imod").length,
                        filteredData.filter(item => item.svar2.toLowerCase() === "måske").length,
                        filteredData.filter(item => item.svar2.trim() === "").length
                    ],
                    backgroundColor: [
                        colorScheme.secondary,
                        colorScheme.primary,
                        colorScheme.accent,
                        colorScheme.background
                    ]
                }]
            }}
        />
    );
};

export default SurveyPieChart2019;
