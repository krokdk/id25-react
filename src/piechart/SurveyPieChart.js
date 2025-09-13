import React from "react";
import {Pie} from "react-chartjs-2";
import {Chart, ArcElement, Tooltip, Legend} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const SurveyPieChart = ({chartData, labels, onSliceClick}) => {

    const handleClick = (event, elements) => {
        if (elements.length > 0) {
            const clickedIndex = elements[0].index;
            const selectedAnswer = labels[clickedIndex];
            onSliceClick(selectedAnswer);
        }
    };

    return (
        <Pie
            data={chartData}
            options={{
                onClick: handleClick,
                responsive: true,
                plugins: {
                    legend: {position: "top", align: "start"}
                }
            }}
        />
    );
};

export default SurveyPieChart;
