import React, { useEffect, useState } from "react";
import { getColorScheme } from "../colorScheme";
import SurveyPieChart from "./SurveyPieChart";


const SurveyPieChartDefault = ({ filteredData, labels, onSliceClick, condition }) => {
  const [colors, setColors] = useState(null);

  useEffect(() => {
    const scheme = getColorScheme();
    setColors([
      scheme.secondary,
      scheme.primary,
      scheme.accent,
      scheme.background,
      scheme.lenasExtra
    ]);
  }, []);

  if (!colors) return null;

  const chartData = {
    labels: labels,
    datasets: [{
      data: labels.map(label =>
        filteredData.filter(item =>
          condition(item, label)
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
