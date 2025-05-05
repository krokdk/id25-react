import React from "react";
import partyMapper from "./partyMapper";

const PartySelector = ({ selectedParty, onSelect }) => {
    return (
        <div className="party-buttons">
            {partyMapper.map((party) => (
                <button
                    key={party.bogstav}
                    onClick={() => onSelect(party.bogstav)}
                    className={`party-button ${selectedParty === party.bogstav ? "selected" : ""}`}
                    style={{ backgroundColor: party.farve }}
                    title={party.navn}
                >
                    {party.bogstav}
                </button>
            ))}

            {/* "?" knap for "øvrige" */}
            <button
                onClick={() => onSelect("?")}
                className={`party-button ${selectedParty === "?" ? "selected" : ""}`}
                style={{ backgroundColor: "#888" }}
                title={"Øvrige"}
            >
                ?
            </button>
        </div>
    );
};

export default PartySelector;
