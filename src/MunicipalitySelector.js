import React from "react";
import "./styles.css";

const MunicipalitySelector = ({ value, year, onChange }) => {

    const storKredse = [
        { value: "Alle", label: "Alle" },
        { value: "København", label: "Københavns Storkreds" },
        { value: "Københavns Omegn", label: "Københavns Omegns Storkreds" },
        { value: "Nordsjælland", label: "Nordsjællands Storkreds" },
        { value: "Bornholm", label: "Bornholms Storkreds" },
        { value: "Sjælland", label: "Sjællands Storkreds" },
        { value: "Fyn", label: "Fyns Storkreds" },
        { value: "Sydjylland", label: "Sydjyllands Storkreds" },
        { value: "Østjylland", label: "Østjyllands Storkreds" },
        { value: "Vestjylland", label: "Vestjyllands Storkreds" },
        { value: "Nordjylland", label: "Nordjyllands Storkreds" }
    ];

    const opstillingsKredse = [
        { value: "Østerbrokredsen", label: "Østerbrokredsen" },
        { value: "Sundbyvesterkredsen", label: "Sundbyvesterkredsen" },
        { value: "Indre Bykredsen", label: "Indre Bykredsen" },
        { value: "Sundbyøsterkredsen", label: "Sundbyøsterkredsen" },
        { value: "Nørrebrokredsen", label: "Nørrebrokredsen" },
        { value: "Bispebjergkredsen", label: "Bispebjergkredsen" },
        { value: "Brønshøjkredsen", label: "Brønshøjkredsen" },
        { value: "Valbykredsen", label: "Valbykredsen" },
        { value: "Vesterbrokredsen", label: "Vesterbrokredsen" },
        { value: "Falkonerkredsen", label: "Falkonerkredsen" },
        { value: "Slotskredsen", label: "Slotskredsen" },
        { value: "Tårnbykredsen", label: "Tårnbykredsen" },

        { value: "Gentoftekredsen", label: "Gentoftekredsen" },
        { value: "Lyngbykredsen", label: "Lyngbykredsen" },
        { value: "Gladsaxekredsen", label: "Gladsaxekredsen" },
        { value: "Rødovrekredsen", label: "Rødovrekredsen" },
        { value: "Hvidovrekredsen", label: "Hvidovrekredsen" },
        { value: "Brøndbykredsen", label: "Brøndbykredsen" },
        { value: "Taastrupkredsen", label: "Taastrupkredsen" },
        { value: "Ballerupkredsen", label: "Ballerupkredsen" },

        { value: "Helsingørkredsen", label: "Helsingørkredsen" },
        { value: "Fredensborgkredsen", label: "Fredensborgkredsen" },
        { value: "Hillerødkredsen", label: "Hillerødkredsen" },
        { value: "Frederikssundkredsen", label: "Frederikssundkredsen" },
        { value: "Egedalkredsen", label: "Egedalkredsen" },
        { value: "Rudersdalkredsen", label: "Rudersdalkredsen" },

        { value: "Rønnekredsen", label: "Rønnekredsen" },
        { value: "Aakirkebykredsen", label: "Aakirkebykredsen" },

        { value: "Lollandkredsen", label: "Lollandkredsen" },
        { value: "Guldborgsundkredsen", label: "Guldborgsundkredsen" },
        { value: "Vordingborgkredsen", label: "Vordingborgkredsen" },
        { value: "Næstvedkredsen", label: "Næstvedkredsen" },
        { value: "Faxekredsen", label: "Faxekredsen" },
        { value: "Køgekredsen", label: "Køgekredsen" },
        { value: "Grevekredsen", label: "Grevekredsen" },
        { value: "Roskildekredsen", label: "Roskildekredsen" },
        { value: "Holbækkredsen", label: "Holbækkredsen" },
        { value: "Kalundborgkredsen", label: "Kalundborgkredsen" },
        { value: "Ringstedkredsen", label: "Ringstedkredsen" },
        { value: "Slagelsekredsen", label: "Slagelsekredsen" },

        { value: "Odense Østkredsen", label: "Odense Østkredsen" },
        { value: "Odense Vestkredsen", label: "Odense Vestkredsen" },
        { value: "Odense Sydkredsen", label: "Odense Sydkredsen" },
        { value: "Assenskredsen", label: "Assenskredsen" },
        { value: "Middelfartkredsen", label: "Middelfartkredsen" },
        { value: "Nyborgkredsen", label: "Nyborgkredsen" },
        { value: "Svendborgkredsen", label: "Svendborgkredsen" },
        { value: "Faaborgkredsen", label: "Faaborgkredsen" },

        { value: "Sønderborgkredsen", label: "Sønderborgkredsen" },
        { value: "Aabenraakredsen", label: "Aabenraakredsen" },
        { value: "Tønderkredsen", label: "Tønderkredsen" },
        { value: "Esbjerg Bykredsen", label: "Esbjerg Bykredsen" },
        { value: "Esbjerg Omegnskredsen", label: "Esbjerg Omegnskredsen" },
        { value: "Vardekredsen", label: "Vardekredsen" },
        { value: "Vejenkredsen", label: "Vejenkredsen" },
        { value: "Vejle Nordkredsen", label: "Vejle Nordkredsen" },
        { value: "Vejle Sydkredsen", label: "Vejle Sydkredsen" },
        { value: "Fredericiakredsen", label: "Fredericiakredsen" },
        { value: "Kolding Nordkredsen", label: "Kolding Nordkredsen" },
        { value: "Kolding Sydkredsen", label: "Kolding Sydkredsen" },
        { value: "Haderslevkredsen", label: "Haderslevkredsen" },

        { value: "Aarhus Sydkredsen", label: "Aarhus Sydkredsen" },
        { value: "Aarhus Vestkredsen", label: "Aarhus Vestkredsen" },
        { value: "Aarhus Nordkredsen", label: "Aarhus Nordkredsen" },
        { value: "Aarhus Østkredsen", label: "Aarhus Østkredsen" },
        { value: "Djurskredsen", label: "Djurskredsen" },
        { value: "Randers Nordkredsen", label: "Randers Nordkredsen" },
        { value: "Randers Sydkredsen", label: "Randers Sydkredsen" },
        { value: "Favrskovkredsen", label: "Favrskovkredsen" },
        { value: "Skanderborgkredsen", label: "Skanderborgkredsen" },
        { value: "Horsenskredsen", label: "Horsenskredsen" },
        { value: "Hedenstedkredsen", label: "Hedenstedkredsen" },

        { value: "Struerkredsen", label: "Struerkredsen" },
        { value: "Skivekredsen", label: "Skivekredsen" },
        { value: "Viborg Vestkredsen", label: "Viborg Vestkredsen" },
        { value: "Viborg Østkredsen", label: "Viborg Østkredsen" },
        { value: "Silkeborg Nordkredsen", label: "Silkeborg Nordkredsen" },
        { value: "Silkeborg Sydkredsen", label: "Silkeborg Sydkredsen" },
        { value: "Ikastkredsen", label: "Ikastkredsen" },
        { value: "Herning Sydkredsen", label: "Herning Sydkredsen" },
        { value: "Herning Nordkredsen", label: "Herning Nordkredsen" },
        { value: "Holstebrokredsen", label: "Holstebrokredsen" },
        { value: "Ringkøbingkredsen", label: "Ringkøbingkredsen" },

        { value: "Frederikshavnkredsen", label: "Frederikshavnkredsen" },
        { value: "Hjørringkredsen", label: "Hjørringkredsen" },
        { value: "Brønderslevkredsen", label: "Brønderslevkredsen" },
        { value: "Thistedkredsen", label: "Thistedkredsen" },
        { value: "Himmerlandkredsen", label: "Himmerlandkredsen" },
        { value: "Mariagerfjordkredsen", label: "Mariagerfjordkredsen" },
        { value: "Aalborg Østkredsen", label: "Aalborg Østkredsen" },
        { value: "Aalborg Vestkredsen", label: "Aalborg Vestkredsen" },
        { value: "Aalborg Nordkredsen", label: "Aalborg Nordkredsen" }
    ];


    const kommuner = [
        { value: "Alle", label: "Alle" },
        { value: "Albertslund Kommune", label: "Albertslund" },
        { value: "Allerød Kommune", label: "Allerød" },
        { value: "Assens Kommune", label: "Assens" },
        { value: "Ballerup Kommune", label: "Ballerup" },
        { value: "Billund Kommune", label: "Billund" },
        { value: "Bornholm Kommune", label: "Bornholm" },
        { value: "Brøndby Kommune", label: "Brøndby" },
        { value: "Brønderslev Kommune", label: "Brønderslev" },
        { value: "Dragør Kommune", label: "Dragør" },
        { value: "Egedal Kommune", label: "Egedal" },
        { value: "Esbjerg Kommune", label: "Esbjerg" },
        { value: "Fanø Kommune", label: "Fanø" },
        { value: "Favrskov Kommune", label: "Favrskov" },
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
        { value: "Holbæk Kommune", label: "Holbæk" },
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
    }
    
    else if (year === "2026") {
        return (
            <div className="dropdownComponent">
                <label htmlFor="municipalitySelect">Storkreds:</label>
                <select
                    id="municipalitySelect"
                    value={value}
                    onChange={onChange}
                    className="dropdown"
                >
                    {storKredse.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
    ;

    

}

export default MunicipalitySelector;
