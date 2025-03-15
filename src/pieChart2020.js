// src/SurveyPieChart2019.js
import React from "react";
import SurveyPieChart from "./SurveyPieChart";
import colorScheme from "./colorScheme";

const SurveyPieChart2020 = ({ filteredData }) => {
    return (
        <SurveyPieChart
            chartData={{
                labels: ["For", "Imod", "Hverken for eller imod", "Fraværende"],
                datasets: [{
                    data: [
                        filteredData.filter(item => item.svar2.toLowerCase() === "for").length,
                        filteredData.filter(item => item.svar2.toLowerCase() === "imod").length,
                        filteredData.filter(item => item.svar2.toLowerCase() === "hverken for eller imod").length,
                        filteredData.filter(item => item.svar2.trim() === "Fraværende").length
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

export default SurveyPieChart2020;
