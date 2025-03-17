import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const SurveyPieChart = ({ chartData, labels, onSliceClick }) => {

    const handleClick = (event, elements) => {
        if (elements.length > 0) {
            const clickedIndex = elements[0].index;
            const selectedAnswer = labels[clickedIndex];
            onSliceClick(selectedAnswer); // Pass the selected label to parent component
        }
    };

    return (
        <Pie
            data={chartData}
            options={{
                onClick: handleClick, // Handle slice clicks
                responsive: true,
                plugins: {
                    legend: { position: "top" }
                }
            }}
        />
    );
};

export default SurveyPieChart;
