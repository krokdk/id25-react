import React from "react";
import "./styles.css";

const MunicipalitySelector = ({ value, year, onChange }) => {
    const kommuner = [
        { value: "Alle", label: "Alle" },
        { value: "Albertslund Kommune", label: "Albertslund" },
        { value: "Allerød Kommune", label: "Allerød" },
        { value: "Assens Kommune", label: "Assens" },
        { value: "Ballerup Kommune", label: "Ballerup" },
        { value: "Billund Kommune", label: "Billund" },
        { value: "Dragør Kommune", label: "Dragør" },
        { value: "Egedal Kommune", label: "Egedal" },
        { value: "Esbjerg Kommune", label: "Esbjerg" },
        { value: "Fanø Kommune", label: "Fanø" },
        { value: "Faxe Kommune", label: "Faxe" },
        { value: "Fredensborg Kommune", label: "Fredensborg" },
        { value: "Fredericia Kommune", label: "Fredericia" },
        { value: "Frederiksberg Kommune", label: "Frederiksberg" },
        { value: "Frederikshavn Kommune", label: "Frederikshavn" },
        { value: "Frederikssund Kommune", label: "Frederikssund" },
        { value: "Furesø Kommune", label: "Furesø" },
        { value: "Faaborg-Midtfyn Kommune", label: "Faaborg-Midtfyn" },
        { value: "Gentofte Kommune", label: "Gentofte" },
        { value: "Gladsaxe Kommune", label: "Gladsaxe" },
        { value: "Glostrup Kommune", label: "Glostrup" },
        { value: "Greve Kommune", label: "Greve" },
        { value: "Gribskov Kommune", label: "Gribskov" },
        { value: "Guldborgsund Kommune", label: "Guldborgsund" },
        { value: "Haderslev Kommune", label: "Haderslev" },
        { value: "Halsnæs Kommune", label: "Halsnæs" },
        { value: "Hedensted Kommune", label: "Hedensted" },
        { value: "Helsingør Kommune", label: "Helsingør" },
        { value: "Herlev Kommune", label: "Herlev" },
        { value: "Herning Kommune", label: "Herning" },
        { value: "Hillerød Kommune", label: "Hillerød" },
        { value: "Hjørring Kommune", label: "Hjørring" },
        { value: "Holstebro Kommune", label: "Holstebro" },
        { value: "Horsens Kommune", label: "Horsens" },
        { value: "Hvidovre Kommune", label: "Hvidovre" },
        { value: "Høje-Taastrup Kommune", label: "Høje-Taastrup" },
        { value: "Hørsholm Kommune", label: "Hørsholm" },
        { value: "Ikast-Brande Kommune", label: "Ikast-Brande" },
        { value: "Ishøj Kommune", label: "Ishøj" },
        { value: "Jammerbugt Kommune", label: "Jammerbugt" },
        { value: "Kalundborg Kommune", label: "Kalundborg" },
        { value: "Kerteminde Kommune", label: "Kerteminde" },
        { value: "Kolding Kommune", label: "Kolding" },
        { value: "Københavns Kommune", label: "København" },
        { value: "Køge Kommune", label: "Køge" },
        { value: "Langeland Kommune", label: "Langeland" },
        { value: "Lejre Kommune", label: "Lejre" },
        { value: "Lemvig Kommune", label: "Lemvig" },
        { value: "Lolland Kommune", label: "Lolland" },
        { value: "Lyngby-Taarbæk Kommune", label: "Lyngby-Taarbæk" },
        { value: "Læsø Kommune", label: "Læsø" },
        { value: "Mariagerfjord Kommune", label: "Mariagerfjord" },
        { value: "Middelfart Kommune", label: "Middelfart" },
        { value: "Morsø Kommune", label: "Morsø" },
        { value: "Norddjurs Kommune", label: "Norddjurs" },
        { value: "Nordfyns Kommune", label: "Nordfyns" },
        { value: "Nyborg Kommune", label: "Nyborg" },
        { value: "Næstved Kommune", label: "Næstved" },
        { value: "Odder Kommune", label: "Odder" },
        { value: "Odense Kommune", label: "Odense" },
        { value: "Odsherred Kommune", label: "Odsherred" },
        { value: "Randers Kommune", label: "Randers" },
        { value: "Rebild Kommune", label: "Rebild" },
        { value: "Ringkøbing-Skjern Kommune", label: "Ringkøbing-Skjern" },
        { value: "Ringsted Kommune", label: "Ringsted" },
        { value: "Roskilde Kommune", label: "Roskilde" },
        { value: "Rudersdal Kommune", label: "Rudersdal" },
        { value: "Rødovre Kommune", label: "Rødovre" },
        { value: "Samsø Kommune", label: "Samsø" },
        { value: "Silkeborg Kommune", label: "Silkeborg" },
        { value: "Skanderborg Kommune", label: "Skanderborg" },
        { value: "Skive Kommune", label: "Skive" },
        { value: "Slagelse Kommune", label: "Slagelse" },
        { value: "Solrød Kommune", label: "Solrød" },
        { value: "Sorø Kommune", label: "Sorø" },
        { value: "Stevns Kommune", label: "Stevns" },
        { value: "Struer Kommune", label: "Struer" },
        { value: "Svendborg Kommune", label: "Svendborg" },
        { value: "Syddjurs Kommune", label: "Syddjurs" },
        { value: "Sønderborg Kommune", label: "Sønderborg" },
        { value: "Thisted Kommune", label: "Thisted" },
        { value: "Tønder Kommune", label: "Tønder" },
        { value: "Tårnby Kommune", label: "Tårnby" },
        { value: "Vallensbæk Kommune", label: "Vallensbæk" },
        { value: "Varde Kommune", label: "Varde" },
        { value: "Vejen Kommune", label: "Vejen" },
        { value: "Vejle Kommune", label: "Vejle" },
        { value: "Vesthimmerlands Kommune", label: "Vesthimmerlands" },
        { value: "Viborg Kommune", label: "Viborg" },
        { value: "Vordingborg Kommune", label: "Vordingborg" },
        { value: "Ærø Kommune", label: "Ærø" },
        { value: "Aabenraa Kommune", label: "Aabenraa" },
        { value: "Aalborg Kommune", label: "Aalborg" },
        { value: "Aarhus Kommune", label: "Aarhus" }
    ];


    /* Region Østdanmark 
    Region Syddanmark
    Region Midtjylland
    Region Nordjylland  */

    const regioner = [
        { value: "Alle", label: "Alle" },
        { value: "Region Østdanmark", label: "Region Østdanmark" },
        { value: "Region Syddanmark", label: "Region Syddanmark" },
        { value: "Region Midtjylland", label: "Region Midtjylland", },
        { value: "Region Nordjylland", label: "Region Nordjylland" },
        { value: "Region Hovedstaden", label: "Region Hovedstaden" }
    ];

    if (year === "9999") {
        return (
            <div className="dropdownComponent">
                <label htmlFor="municipalitySelect">Kommune:</label>
                <select
                    id="municipalitySelect"
                    value={value}
                    onChange={onChange}
                    className="dropdown"
                >
                    {kommuner.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );

    } else if (year === "8888") {
        return (
            <div className="dropdownComponent">
                <label htmlFor="municipalitySelect">Region:</label>
                <select
                    id="municipalitySelect"
                    value={value}
                    onChange={onChange}
                    className="dropdown"
                >
                    {regioner.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

}

export default MunicipalitySelector;
