import React, { useState, useCallback } from "react";
import MapSelector from "./MapSelector";
import { motion } from "framer-motion";

function MapAnimation({ selectedMunicipality, setSelectedMunicipality }) {
  const [minimized, setMinimized] = useState(false);

  const handleSelectMunicipality = useCallback((id) => {
    if (selectedMunicipality && selectedMunicipality.id === id)
    {
      setMinimized(false);
    }
    else
    {
      setSelectedMunicipality({ id });
      setMinimized(true);
    }
    
  }, [setSelectedMunicipality]);

  // Klik på containeren når den er minimeret -> maksimer
  const handleMapContainerClick = useCallback(() => {
    if (minimized) setMinimized(false);
  }, [minimized]);

  return (
    <div className="pointer-events-none">
      {/* Sørg for at overlayets indre kan modtage klik, men ikke resten */}
      <motion.div
        onClick={handleMapContainerClick}
        className="z-50 pointer-events-auto"
        initial={false}
        animate={
          minimized
            ? {
                position: "fixed",
                top: 16,
                left: 16,
                width: 120,
                boxShadow:
                  "0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.06)",
                borderRadius: 16
              }
            : {
                position: "fixed",
                inset: 0,         // dæk hele skærmen som overlay
                width: "100%",
                height: "100%",
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                borderRadius: 0
              }
        }
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        {/* Halvgennemsigtig baggrund i overlay-tilstand */}
        {!minimized && (
          <div
            className="absolute inset-0"
            style={{ background: "rgba(0,0,0,0.15)" }}
          />
        )}

        <div
          className={`relative ${
            minimized ? "cursor-zoom-in" : "cursor-default"
          } bg-white/80 backdrop-blur rounded-2xl p-3 h-full`}
          // Stop klik på kortet fra at boble op og trigge container-click utilsigtet
          onClick={(e) => e.stopPropagation()}
        >
        <MapSelector onSelectMunicipality={handleSelectMunicipality} />
</div>
      </motion.div>
    </div>
  );
}

export default MapAnimation;
