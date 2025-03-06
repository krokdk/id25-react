import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const SurveyPieChart = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedParty, setSelectedParty] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://id25-backend-docker.onrender.com/api/survey/results");
                const result = await response.json();
                console.log("Data hentet:", result);
                setData(result);
                setFilteredData(result);
            } catch (error) {
                console.error("Fejl ved hentning af data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const parties = ["A", "B", "Ø"];

    const handleFilter = (party) => {
        if (party === null) {
            setFilteredData(data);
        } else {
            setFilteredData(data.filter((item) => item.parti === party));
        }
        setSelectedParty(party);
    };

    if (loading) {
        return <p>Indlæser data...</p>;
    }

    if (filteredData.length === 0) {
        return <p>Ingen data tilgængelig.</p>;
    }

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
        <div style={{ textAlign: "center", maxWidth: "500px", margin: "auto" }}>
            <Pie data={chartData} />

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => handleFilter(null)} style={buttonStyle}>
                    Vis alle
                </button>
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

export default SurveyPieChart;
