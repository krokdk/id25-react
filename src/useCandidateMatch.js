import { useState, useEffect } from "react";

export default function useCandidateMatch(storkreds, answers) {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!storkreds || !answers) return;

        const fetchMatches = async () => {
            setLoading(true);

            try {
                const response = await fetch(
                    "http://localhost:8080/api/survey/match", 
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            storkreds: storkreds,
                            answers: answers
                        })
                    }
                );

                const result = await response.json();

                // sorter efter score (højeste først)
                const sorted = result.sort((a, b) => b.score - a.score);

                setMatches(sorted);

            } catch (error) {
                console.error("Fejl ved hentning af kandidat matches:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMatches();

    }, [storkreds, answers]);

    return { matches, loading };
}
