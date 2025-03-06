import { useEffect, useState } from "react";
import SurveyPieChart from "./SurveyPieChart";
import "./App.css"; // Import CSS-fil

const API_URL = "https://id25-backend-docker.onrender.com/api/survey/results";

const App = () => {
    const [surveyData, setSurveyData] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => setSurveyData(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="app-container">
            <h1 className="app-title">Spørgsmål</h1>
            {surveyData.length > 0 ? <SurveyPieChart surveyData={surveyData} /> : <p>Indlæser data...</p>}
        </div>
    );
};

export default App;
