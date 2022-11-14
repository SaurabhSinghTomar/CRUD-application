import React from "react";
import "./MyProfile.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const userData = JSON.parse(atob(sessionStorage.getItem("User")));
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/home");
  };
  return (
    <div class="container">
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
          My Profile
        </h2>
      </Box>
      <div class="profile_container">
        <div class="back"></div>
        <div class="profile"></div>
      </div>
      <div class="profile_infos">
        <h1 class="name">{`${userData.firstName}  ${userData.lastName}`}</h1>
        <h1 class="occupation">{` ${userData.email}`}</h1>
      </div>
    </div>
  );
};

export default MyProfile;
