import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function LoaderOverlay() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(5, 8, 15, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <CircularProgress color="secondary" />
    </div>
  );
}

export default LoaderOverlay;
