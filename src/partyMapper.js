const partyMapper = [
    { bogstav: "A", navn: "Socialdemokratiet" },
    { bogstav: "B", navn: "Radikale Venstre" },
    { bogstav: "C", navn: "Konservative Folkeparti" },
    { bogstav: "F", navn: "Socialistisk Folkeparti" },
    { bogstav: "I", navn: "Liberal Alliance" },
    { bogstav: "M", navn: "Moderaterne" },
    { bogstav: "O", navn: "Dansk Folkeparti" },
    { bogstav: "V", navn: "Venstre" },
    { bogstav: "Æ", navn: "Danmarksdemokraterne" },
    { bogstav: "Ø", navn: "Enhedslisten" },
    { bogstav: "Å", navn: "Alternativet" }
];

// **Hjælpefunktion til opslag af partinavn givet et bogstav**
export const getPartiNavn = (bogstav) => {
    const parti = partyMapper.find(p => p.bogstav === bogstav);
    return parti ? parti.navn : bogstav; // Hvis ikke fundet, returner bogstav
};

// **Hjælpefunktion til opslag af bogstav givet et navn**
export const getPartiBogstav = (navn) => {
    const parti = partyMapper.find(p => p.navn === navn);
    return parti ? parti.bogstav : navn; // Hvis ikke fundet, returner navn
};

export default partyMapper;
