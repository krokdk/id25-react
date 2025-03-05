import { useEffect, useState } from "react";
import SurveyPieChart from "./SurveyPieChart";

const App = () => {
    const [surveyData, setSurveyData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/survey/results") // Opdater til din backend-URL
            .then((response) => response.json())
            .then((data) => setSurveyData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Fordeling af Svar1</h1>
            {surveyData.length > 0 ? <SurveyPieChart surveyData={surveyData} /> : <p>Indlæser data...</p>}
        </div>
    );
};

export default App;
