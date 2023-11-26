import React from "react";
import { Box, Button } from "@mui/material";
import Logo from "../assets/Logo.png";

function Navbar({ downloadCallback, imgSize }) {
  return (
    <Box
      sx={{
        position: {xs:"absolute", md:"absolute"},
        height: "6rem",
        width: "100%",
        background: "#05080F",
        background: "rgba(17, 9, 28, 0.76)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backdropFilter: "blur(7.5px)",
      }}
    >
      <img src={Logo} style={{ width: "120px" }} /> {/* Adjust the width */}
      <Button
        variant="contained"
        color="primary"
        onClick={downloadCallback}
        disabled={imgSize > 0 ? false : true}
        sx={{
          borderRadius: "3.75rem",
          border: "3px solid #A4288A",
          background: "rgba(87, 21, 75, 0.20)",
          width: "10rem",
          height: "3.75rem",

          "&:hover": {
            border: "0px",
            background: "linear-gradient(270deg, #A4288A 59.9%, #68079B 100%)",
          },
          "&:disabled": {
            opacity:"25%",
            color:"white",
          },
        }}
      >
        Download
      </Button>
    </Box>
  );
}

export default Navbar;
