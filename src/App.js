import { useEffect, useState } from "react";
import SurveyPieChart from "./SurveyPieChart";

const API_URL = "https://id25-backend-docker.onrender.com/api/survey/results";

const App = () => {
    const [surveyData, setSurveyData] = useState([]);

    useEffect(() => {
        fetch(API_URL) // Opdater til din backend-URL
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
