import React from "react";

function ComicGrid({ imgs, done }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {imgs.map((img, index) => (
        <img
          key={index}
          src={URL.createObjectURL(img)}
          style={{
            width: { xs: "10%", md: "100%" },
            borderRadius: {xs:"0px",md:done ? "0px" : "10%"},
            border: {md:"3px solid #A4288A"},
            background: "rgba(87, 21, 75, 0.20)",
            marginBottom: "1rem",
          }}
          alt={`Hugging Face Result ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default ComicGrid;
