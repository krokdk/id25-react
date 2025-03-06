import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const SurveyPieChart = ({ chartData }) => {
    return (
        <div style={{ textAlign: "center", maxWidth: "500px", margin: "auto" }}>
            <Pie data={chartData} />
        </div>
    );
};

export default SurveyPieChart;
