import React from "react";
import PersonDetailsCard2019 from "./personDetailsCard2019";
import PersonDetailsCard2021 from "./personDetailsCard2021";
import PersonDetailsCard from "./PersonDetailsCard";

const PersonResult = ({ title, person, year, onPartyClick }) => {
    if (!person || !person.fornavn) return null;

    const DetailsCardComponent = year === "2019"
        ? PersonDetailsCard2019
        : year === "2021"
            ? PersonDetailsCard2021
            : PersonDetailsCard;

    return (
        <div style={{ marginTop: "20px", marginBottom: "30px", textAlign: "center" }}>
            <h2>{title}</h2>
            <DetailsCardComponent person={person} onPartyClick={onPartyClick} />
        </div>
    );
};

export default PersonResult;
