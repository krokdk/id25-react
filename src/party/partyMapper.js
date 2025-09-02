const partyMapper = [
    { bogstav: "A", navn: "Socialdemokratiet", farve: "#E2001A" },
    { bogstav: "B", navn: "Radikale Venstre", farve: "#0066CC" },
    { bogstav: "C", navn: "Konservative Folkeparti", farve: "#008000" },
    { bogstav: "D", navn: "De Nye Borgerlige", farve: "#FEDF55" },
    { bogstav: "F", navn: "Socialistisk Folkeparti", farve: "#C8102E" },
    { bogstav: "I", navn: "Liberal Alliance", farve: "#FF8000" },
    { bogstav: "M", navn: "Moderaterne", farve: "#772583" },
    { bogstav: "O", navn: "Dansk Folkeparti", farve: "#003399" },
    { bogstav: "V", navn: "Venstre", farve: "#1E90FF" },
    { bogstav: "Æ", navn: "Danmarksdemokraterne", farve: "#9A76F8" },
    { bogstav: "Ø", navn: "Enhedslisten", farve: "#A10022" },
    { bogstav: "Å", navn: "Alternativet", farve: "#00AA00" },
    { bogstav: "UKENDT", navn: "Øvrige", farve: "#888" }
];


// **Hjælpefunktion til opslag af partinavn givet et bogstav**
export const getPartiNavn = (bogstav) => {
    const parti = partyMapper.find(p => p.bogstav === bogstav);
    return parti ? parti.navn : "Øvrige"; // Hvis ikke fundet, returner bogstav
};

// **Hjælpefunktion til opslag af bogstav givet et navn**
export const getPartiBogstav = (navn) => {
    const parti = partyMapper.find(p => p.navn === navn);
    return parti ? parti.bogstav : "UKENDT";
};

export const getPartyColor = (bogstav) => {
    const party = partyMapper.find((p) => p.bogstav === bogstav);
    return party ? party.farve : "#888";
};

export default partyMapper;
