import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as Anchor, useNavigate } from "react-router-dom";

import "./Login.scss";
import { Rejex } from "../../assets/constents/rejex";

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const { emailReg, passWordReg, nameReg } = Rejex;
  const [formFields, setFormFields] = useState({
    email: "",
    passWord: "",
  });
  const [formErrors, setformErrors] = useState({
    emailError: false,
    passError: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    empty: "Field cannot be empty",
    invalid: "Please enter valid",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  /**
   * @funtion to check the errors of form fields
   */
  const checkErrors = (e) => {
    switch (e.target.name) {
      case "email":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, emailError: true }));
        } else if (e.target.value && !emailReg.test(e.target.value)) {
          setformErrors((prevState) => ({ ...prevState, emailError: true }));
        } else {
          setformErrors((prevState) => ({ ...prevState, emailError: false }));
        }
        break;
      case "passWord":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, passError: true }));
        } else if (e.target.value && !passWordReg.test(e.target.value)) {
          setformErrors((prevState) => ({ ...prevState, passError: true }));
        } else {
          setformErrors((prevState) => ({ ...prevState, passError: false }));
        }
        break;
      default:
        break;
    }
  };

  /**
   * @function to check the onchannge event of form input fields
   */
  const handleInputChange = (e) => {
    // e.preventDefault();
    switch (e.target.name) {
      case "email":
        setFormFields((state) => ({ ...state, email: e.target.value }));
        break;
      case "passWord":
        setFormFields((state) => ({ ...state, passWord: e.target.value }));
        break;

      default:
        break;
    }
  };

  /**
   * @function to disable the submit button  of form until every field is valid
   */
  useEffect(() => {
    if (Object.values(formErrors).every((value) => value === false)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formErrors, formFields]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = formFields;
    const userData = JSON.parse(atob(sessionStorage.getItem("User")));
    // console.log("data", data);
    // console.log("userData", userData);
    if (data.email == userData.email && data.passWord == userData.passWord) {
      localStorage.setItem("login", true);
      navigate("/home");
    } else {
      alert("Email or Password is not matched");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={formFields.email}
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                  autoComplete="email"
                  error={formErrors.emailError ? true : false}
                  helperText={
                    formErrors.emailError
                      ? formFields.email.length <= 0
                        ? "Email " + errorMessage.empty
                        : errorMessage.invalid + " Email"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passWord"
                  label="Password"
                  type="password"
                  id="password"
                  value={formFields.passWord}
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                  error={formErrors.passError ? true : false}
                  helperText={
                    formErrors.passError
                      ? formFields.passWord.length <= 0
                        ? "Password " + errorMessage.empty
                        : errorMessage.invalid + " Password "
                      : ""
                  }
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!isFormValid}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Anchor to={"/register"}>
                  {"Don't have an account? Sign Up"}
                </Anchor>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
