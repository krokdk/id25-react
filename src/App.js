import React, { useState, useEffect } from "react";
import SurveyPieChart from "./SurveyPieChart";

const API_URL = "https://id25-backend-docker.onrender.com/api/survey/results";

const App = () => {
    const [surveyData, setSurveyData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedParty, setSelectedParty] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL);
                const result = await response.json();
                setSurveyData(result);
                setFilteredData(result); // Vis alle data initialt
            } catch (error) {
                console.error("Fejl ved hentning af data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const parties = ["A", "B", "C", "F", "I", "M", "O", "V", "Æ", "Ø", "Å"];

    const handleFilter = (party) => {
        if (party === null) {
            setFilteredData(surveyData); // Vis alle data
        } else {
            setFilteredData(surveyData.filter((item) => item.parti === party));
        }
        setSelectedParty(party);
    };

    if (loading) {
        return <p>Indlæser data...</p>;
    }

    // Beregn tællinger for svar
    const jaCount = filteredData.filter((item) => item.svar1 === "ja").length;
    const nejCount = filteredData.filter((item) => item.svar1 === "nej").length;
    const commentCount = filteredData.filter((item) => item.svar1 === "Ingen kommentar").length;

    const chartData = {
        labels: ["Ja", "Nej", "Ingen kommentar"],
        datasets: [
            {
                data: [jaCount, nejCount, commentCount],
                backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
            },
        ],
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Spørgsmål</h1>
            <SurveyPieChart chartData={chartData} />

            {filteredData.length === 0 && selectedParty !== null && (
                <p>Ingen data tilgængelig for parti {selectedParty}.</p>
            )}

            <div style={{ marginTop: "20px" }}>
                {parties.map((party) => (
                    <button
                        key={party}
                        onClick={() => handleFilter(party)}
                        style={{
                            ...buttonStyle,
                            backgroundColor: selectedParty === party ? "#888" : "#007bff",
                        }}
                    >
                        {party}
                    </button>
                ))}
                <button onClick={() => handleFilter(null)} style={buttonStyle}>
                    Vis alle
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    margin: "5px",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
};

export default App;
