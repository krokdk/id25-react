import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DenmarkMap from "./DenmarkMap";

export default function MapContainer({
  onMunicipalitySelected,
  minimizedWidth = 120,
  position = { top: 16, right: 16 },
  mapProps = {},
}) {
  const [minimized, setMinimized] = useState(false);

  const handleSelectMunicipality = useCallback(
    (id, name) => {
      onMunicipalitySelected?.(id, name);
      setMinimized(true);
    },
    [onMunicipalitySelected]
  );

  const CARD_ID = "denmark-map-card";

  const CardInner = ({ minimized }) => (
    <div
      className={`${minimized ? "cursor-zoom-in" : "cursor-default"} bg-white/80 backdrop-blur rounded-2xl p-3`}
      style={{ pointerEvents: minimized ? "none" : "auto" }}
    >
      <DenmarkMap {...mapProps} onSelectMunicipality={handleSelectMunicipality} />
    </div>
  );

  return (
    <>
      <AnimatePresence initial={false}>
        {!minimized && (
          <motion.div
            key="expanded"
            layoutId={CARD_ID}
            initial={false}
            animate={{ borderRadius: 16, boxShadow: "0 0 0 rgba(0,0,0,0)" }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <CardInner minimized={false} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {minimized && (
          <motion.div
            key="minimized"
            layoutId={CARD_ID}
            initial={false}
            onClick={() => setMinimized(false)}
            style={{
              position: "fixed",
              top: position.top ?? 16,
              right: position.right ?? 16,
              zIndex: 50,
              overflow: "hidden",
            }}
            animate={{
              width: minimizedWidth,
              borderRadius: 16,
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.08), 0 6px 6px rgba(0,0,0,0.06)",
            }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <CardInner minimized />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
