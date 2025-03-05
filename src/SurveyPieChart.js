import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const SurveyPieChart = ({ surveyData }) => {
    // Tæl antal "ja" og "nej" i svar1
    const svar1Counts = surveyData.reduce(
        (acc, item) => {
            acc[item.svar1] = (acc[item.svar1] || 0) + 1;
            return acc;
        },
        { ja: 0, nej: 0 }
    );

    const chartData = {
        labels: ["Ja", "Nej"],
        datasets: [
            {
                data: [svar1Counts.ja, svar1Counts.nej],
                backgroundColor: ["#36A2EB", "#FF6384"],
            },
        ],
    };

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh" // Halvdelen af skærmens højde
        }}>
            <div style={{ width: "40%", height: "40%" }}> {/* Justér størrelsen her */}
                <Pie data={chartData} />
            </div>
        </div>
    );
};

export default SurveyPieChart;
