import React from "react";
import { Box } from "@mui/material";
import Input from "./components/Input";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflowX:"hidden",
        overflowY:"scroll",
        background: "#05080F",
        minWidth:"100vw",
        minHeight:"100vh",
      }}
    >
      <Input />
    </Box>
  );
}

export default App;
