import React from "react";
import { getPartiNavn, getPartyColor } from "./partyMapper";
import "../styles.css";

const PartyButton = ({ party, onClick }) => {
    if (!party) return null;

    const handleClick = () => {
        if (onClick) onClick(party);
    };

    return (
        <button
            className="party-button-link"
            style={{ backgroundColor: getPartyColor(party) }}
            onClick={handleClick}
        >
            {getPartiNavn(party) || "Øvrige"}
        </button>
    );
};

export default PartyButton;
