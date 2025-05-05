import React from "react";
import PersonDetailsTable from "./personDetailsTable";
import PersonDetailsTable2019 from "./personDetailsTable2019";
import PersonDetailsTable2021 from "./personDetailsTable2021";

const PersonResult = ({ title, person, year }) => {
    if (!person || !person.fornavn) return null;

    const TableComponent = year === "2019"
        ? PersonDetailsTable2019
        : year === "2021"
            ? PersonDetailsTable2021
            : PersonDetailsTable;

    return (
        <div style={{ marginTop: "20px", textAlign: "left", margin: "auto", maxWidth: "500px" }}>
            <h2 style={{ textAlign: "center" }}>{title}</h2>
            <TableComponent person={person} />
        </div>
    );
};

export default PersonResult;
