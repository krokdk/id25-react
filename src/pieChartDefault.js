import React from "react";
import SurveyPieChart from "./SurveyPieChart";
import colorScheme from "./colorScheme";

const SurveyPieChartDefault = ({ filteredData, labels, onSliceClick }) => {
    return (
        <SurveyPieChart
            chartData={{
                labels: labels,
                datasets: [{
                    data: labels.map(label =>
                        filteredData.filter(item =>
                            item.svar2 && item.svar2.toLowerCase() === label.toLowerCase()
                        ).length
                    ),
                    backgroundColor: [
                        colorScheme.secondary,
                        colorScheme.primary,
                        colorScheme.tertiary,
                        colorScheme.background
                    ]
                }]
            }}
            labels={labels}
            onSliceClick={onSliceClick} // Handle click events
        />
    );
};

export default SurveyPieChartDefault;
