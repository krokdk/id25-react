import React, { useState, useCallback } from "react";
import mapSelector from "./MapSelector";
import { motion } from "framer-motion";

const MapAnimation = (selectedMunicipality, setSelectedMunicipality) => {


  const [minimized, setMinimized] = useState(false);

  // Kaldes når der klikkes på en kommune i kortet
  const handleSelectMunicipality = useCallback((id, name) => {
    setSelectedMunicipality({ id, name });

    setMinimized(true);
  }, []);

  // Klik på kort-containeren mens den er minimeret -> maksimer
  const handleMapContainerClick = useCallback(() => {
    if (minimized) setMinimized(false);
  }, [minimized]);

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="relative p-6">
        <motion.div
          onClick={handleMapContainerClick}
          className="z-50"
          initial={false}
          animate={
            minimized
              ? {
                  position: "fixed",
                  top: 16,
                  left: 16,
                  width: 100,
                  boxShadow:
                    "0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.06)",
                  borderRadius: 16,
                }
              : {
                  position: "static",
                  width: "100%",
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                  borderRadius: 0,
                }
          }
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <div
            className={`${
              minimized ? "cursor-zoom-in" : "cursor-default"
            } bg-white/80 backdrop-blur rounded-2xl p-3`}
          >
            {mapSelector(handleSelectMunicipality)    }
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default MapAnimation;
