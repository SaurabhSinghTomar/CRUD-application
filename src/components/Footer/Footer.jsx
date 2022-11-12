import { Link, Typography } from "@mui/material";
import React from "react";
import "./Footer.scss";
const Footer = () => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      position={"fixed"}
      width={"100%"}
      bottom={0}
      padding={"15px 0px"}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;
