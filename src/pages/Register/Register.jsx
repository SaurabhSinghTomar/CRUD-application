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
import { Rejex } from "../../assets/constents/rejex";
import "./Register.scss";

const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const { emailReg, passWordReg, nameReg } = Rejex;
  const [formFields, setFormFields] = useState({
    email: "",
    passWord: "",
    firstName: "",
    lastName: "",
  });
  const [formErrors, setformErrors] = useState({
    emailError: false,
    passError: false,
    firstNameErr: false,
    lastNameErr: false,
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
      case "firstName":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, firstNameErr: true }));
        } else if (e.target.value && !nameReg.test(e.target.value)) {
          setformErrors((prevState) => ({ ...prevState, firstNameErr: true }));
        } else {
          setformErrors((prevState) => ({ ...prevState, firstNameErr: false }));
        }
        break;
      case "lastName":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, lastNameErr: true }));
        } else if (e.target.value && !nameReg.test(e.target.value)) {
          setformErrors((prevState) => ({ ...prevState, lastNameErr: true }));
        } else {
          setformErrors((prevState) => ({ ...prevState, lastNameErr: false }));
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
    e.preventDefault();
    switch (e.target.name) {
      case "firstName":
        setFormFields((state) => ({ ...state, firstName: e.target.value }));
        break;

      case "lastName":
        setFormFields((state) => ({ ...state, lastName: e.target.value }));
        break;

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

  }, [formErrors,formFields]);

  /**
   * @function to handle the submit action of form
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(formFields).every((value) => value !== "")) {
      sessionStorage.setItem("User", btoa(JSON.stringify(formFields)));
    }
    navigate("/login", { replace: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" className="register-wrap">
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formFields.firstName}
                  error={formErrors.firstNameErr ? true : false}
                  helperText={
                    formErrors.firstNameErr
                      ? formFields.firstName.length <= 0
                        ? "First Name " + errorMessage.empty
                        : errorMessage.invalid + " First Name"
                      : ""
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={formFields.lastName}
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                  autoComplete="family-name"
                  error={formErrors.lastNameErr ? true : false}
                  helperText={
                    formErrors.lastNameErr
                      ? formFields.lastName.length <= 0
                        ? "Last Name " + errorMessage.empty
                        : errorMessage.invalid + " Last Name"
                      : ""
                  }
                />
              </Grid>
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
                      : "Minimum charecter must be 6 and maximum charecter can be 16"
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2">
                  <Anchor to={"/login"}>
                    Already have an account? Sign in
                  </Anchor>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
