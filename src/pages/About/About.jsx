import React from "react";
import { Box, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const About = () => {
  const primary = purple[500]; // #f44336
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          pt: 1,
          pb: 1,
          mt: 1,
          mb: 1,
          bgcolor: "background.paper",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <ArrowBackIcon onClick={handleBack} />
        <h2
          style={{
            marginLeft: "10px",
          }}
        >
          About
        </h2>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "98vh",
          backgroundColor: primary,
        }}
      >
        <Typography variant="h3" style={{ color: "white" }}>
          This is about
        </Typography>
      </Box>
    </>
  );
};

export default About;
