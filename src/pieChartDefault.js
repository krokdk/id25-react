// src/SurveyPieChartDefault.js
import React from "react";
import SurveyPieChart from "./SurveyPieChart";
import colorScheme from "./colorScheme";

const SurveyPieChartDefault = ({ filteredData }) => {
    return (
        <SurveyPieChart
            chartData={{
                labels: ["Ja", "Nej", "Ved ikke", "Ikke besvaret"],
                datasets: [{
                    data: [
                        filteredData.filter(item => item.svar2.toLowerCase() === "ja").length,
                        filteredData.filter(item => item.svar2.toLowerCase() === "nej").length,
                        filteredData.filter(item => item.svar2.toLowerCase() === "ved ikke").length,
                        filteredData.filter(item => item.svar2.trim() === "").length
                    ],
                    backgroundColor: [
                        colorScheme.secondary,
                        colorScheme.primary,
                        colorScheme.tertiary,
                        colorScheme.background
                    ]
                }]
            }}
        />
    );
};

export default SurveyPieChartDefault;
