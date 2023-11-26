import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Navbar from "./Navbar";
import LoaderOverlay from "./LoaderOverlay";
import ComicGrid from "./ComicGrid";
import html2pdf from "html2pdf.js";

async function query(data) {
  const response = await fetch(
    "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
    {
      headers: {
        Accept: "image/png",
        Authorization: "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

function Input() {
  const [inputTexts, setInputTexts] = useState(Array(1).fill(""));
  const [isCreatingPage, setIsCreatingPage] = useState(false);
  const [imageResult, setImageResult] = useState(null);
  const [createdPageContent, setCreatedPageContent] = useState("");
  const [i, seti] = useState(0);
  const [imgs, setImges] = useState(Array(0));
  const [done, setDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (value) => {
    const newInputTexts = [...inputTexts];
    if (i < newInputTexts.length) {
      newInputTexts[i] = value;
    } else newInputTexts.push(value);
    setInputTexts(newInputTexts);
    console.log(newInputTexts);
  };

  const handleCreatePage = () => {
    setIsCreatingPage(true);
  };

  const handleSubmitPage = async () => {
    setIsLoading(true);

    try {
      const newImgs = imgs;
      const result = await query({ inputs: inputTexts.join(" ") });
      newImgs.push(result);
      setImageResult(result);
      setImges(newImgs);
      setIsCreatingPage(true);
    } catch (error) {
      console.error("Error:", error);
    }

    setIsLoading(false);
    setIsCreatingPage(false);
    seti(i + 1);
  };

  const handleDone = () => {
    setDone(true);
  };

  const handleDownload = () => {
    if (imgs.length === 0) {
      alert("No images to download!");
      return;
    }

    const pdfContainer = document.createElement("div");
    const gridContainer = document.createElement("div");
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(2, 1fr)";
    gridContainer.style.gap = "10px";

    imgs.forEach((img, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = URL.createObjectURL(img);
      imgElement.style.width = "100%";
      imgElement.style.borderRadius = done ? "0px" : "3.75rem";
      imgElement.style.border = "3px solid #A4288A";
      imgElement.style.background = "rgba(87, 21, 75, 0.20)";
      gridContainer.appendChild(imgElement);
    });

    pdfContainer.appendChild(gridContainer);

    const pdfOptions = {
      margin: 10,
      filename: "comic.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf(pdfContainer, pdfOptions);
  };

  return (
    <>
      <Navbar downloadCallback={handleDownload} imgSize={imgs.length} />
      {isLoading && <LoaderOverlay />}

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:"center",
          marginTop: "10rem",
          marginBottom: "5rem",
        }}
      >
        {imageResult && (
          <Box
          sx={{
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            width:"100%",
          }}
          >
            {imgs.length > 0 && <ComicGrid imgs={imgs} done={done} />}
            <p>{createdPageContent}</p>
          </Box>
        )}
        {!isCreatingPage ? (
          <>
            {!done ? (
              <Box
                display="flex"
                sx={{
                  display: "flex",
                  flexDirection: {xs:"column", md:"row"},
                  justifyContent: "space-around",
                  height: "6rem",
                  width: "80%",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCreatePage}
                  sx={{
                    borderRadius: "3.75rem",
                    border: "3px solid #A4288A",
                    background: "rgba(87, 21, 75, 0.20)",
                    width: {xs:"100%", md:"30%"},
                    height: "3.75rem",
                    mb: 2,
                    "&:hover": {
                      border: "0px",
                      background:
                        "linear-gradient(270deg, #A4288A 59.9%, #68079B 100%)",
                    },
                  }}
                >
                  <Typography>Create Page</Typography>
                </Button>

                {imgs.length > 0 && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDone}
                    sx={{
                      borderRadius: "3.75rem",
                      background:
                        "linear-gradient(270deg, #A4288A 59.9%, #68079B 100%)",
                        width: {xs:"100%", md:"30%"},
                      height: "3.75rem",
                    }}
                  >
                    <Typography>Done</Typography>
                  </Button>
                )}
              </Box>
            ) : (
              <></>
            )}
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: {xs:"column", md:"row"},
              borderRadius: "3.75rem",
              background: "rgba(85, 21, 73, 0.20)",
              height: "3.5rem",
              width: "80%",
            }}
          >
            <TextField
              variant="outlined"
              fullWidth
              label="Enter the prompt"
              onChange={(e) => handleInputChange(e.target.value)}
              style={{ marginBottom: 16 }}
              sx={{
                border: "0px",
                "& label": {
                  color: "rgba(255, 255, 255, 0.20)",
                },
                "& fieldset": {
                  borderColor: "transparent",
                },
                "& input": {
                  color: "white",
                  border: "transparent",
                  background:"transparent",
                },
                "& hover":{
                  border : "transparent"
                }
                ,
                display: "flex",
                alignItems: "center",
                width:"90%",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitPage}
              style={{ marginBottom: 16 }}
              sx={{
                borderRadius: "3.75rem",
                height: "100%",
                width:{xs:"40%", md:"10%"},
                background:
                  "linear-gradient(270deg, #A4288A 59.9%, #68079B 100%)",
              }}
            >
              
              <ArrowForwardIcon />
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Input;
