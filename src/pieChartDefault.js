import React, { useEffect, useState } from "react";
import { getColorScheme } from "./colorScheme";
import SurveyPieChart from "./SurveyPieChart";


const SurveyPieChartDefault = ({ filteredData, labels, onSliceClick }) => {
  const [colors, setColors] = useState(null);

  useEffect(() => {
    const scheme = getColorScheme();
    setColors([
      scheme.secondary,
      scheme.primary,
      scheme.accent,
      scheme.background
    ]);
  }, []);

  if (!colors) return null;

  const chartData = {
    labels: labels,
    datasets: [{
      data: labels.map(label =>
        filteredData.filter(item =>
          item.svar2 && item.svar2.toLowerCase() === label.toLowerCase()
        ).length
      ),
      backgroundColor: colors
    }]
  };

  return (
    <div className="pie-chart-wrapper">
      <div className="pie-chart-container">
        <SurveyPieChart
          chartData={chartData}
          labels={labels}
          onSliceClick={onSliceClick}
        />
      </div>
    </div>
  );
};

export default SurveyPieChartDefault;
