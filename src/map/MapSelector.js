import React from "react";
import DenmarkMap from "../DenmarkMap";

function MapSelector({ onSelectMunicipality }) {
  return (
    <div>
      <DenmarkMap
        svgUrl="/Map_DK_Simple.svg"
        baseFill="#4586dd"
        baseStroke="#4586dd"
        baseStrokeWidth={0.25}
        activeFill="#de5735"
        activeStroke="#de5735"
        onSelectMunicipality={onSelectMunicipality}
      />
    </div>
  );
}

export default MapSelector;
