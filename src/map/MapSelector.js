import React from "react";
import DenmarkMap from "../DenmarkMap";

const MapSelector = (handleSelectMunicipality) => {

//--primary-color: #de5735; orange
//    --secondary-color: #4586dd; blå

return (
    <div>
        <DenmarkMap
          svgUrl="/Map_DK_Simple.svg"
          baseFill="#4586dd"
          baseStroke="#4586dd"
          baseStrokeWidth={1.25}
          activeFill="#de5735"
          activeStroke="#de5735"
          onSelectMunicipality={handleSelectMunicipality}
        />
    </div>
  );
}

export default MapSelector;
