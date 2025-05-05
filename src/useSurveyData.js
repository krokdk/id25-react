import { useState, useEffect } from "react";

export default function useSurveyData(selectedYear) {
    const [surveyData, setSurveyData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://id25-backend-docker.onrender.com/api/survey/results?year=${selectedYear}`
                );
                const result = await response.json();
                const sorted = result.sort((a, b) => a.fornavn.localeCompare(b.fornavn));
                setSurveyData(sorted);
            } catch (error) {
                console.error("Fejl ved hentning af data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedYear]);

    return { surveyData, loading };
}
