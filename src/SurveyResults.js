import React from 'react';

const SurveyResults = ({ data }) => {
    return (
        <div>
            <h2>Survey Results</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        Fornavn: {item.fornavn}, Parti: {item.parti}, Svar1: {item.svar1}, Svar5: {item.kommentar}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SurveyResults;
