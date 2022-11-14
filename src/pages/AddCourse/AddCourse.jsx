import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Rejex } from "../../assets/constents/rejex";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const theme = createTheme();

const AddCourse = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState([]);
  const [isEdit, setIsEdit] = useState(
    location?.state ? location.state.isEdit : false
  );

  const [formFields, setFormFields] = useState({
    cName: "",
    cDuration: "",
    cFees: "",
    cRating: "",
    cSubjects: "",
    cDescription: "",
  });
  const [formErrors, setformErrors] = useState({
    nameError: false,
    durationError: false,
    feesError: false,
    ratingError: false,
    subjectError: false,
    descError: false,
  });
  const errorMessage = {
    empty: "Field cannot be empty",
    invalid: "Please enter valid",
  };
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const courses = JSON.parse(localStorage.getItem("courses"));
      const course = courses.filter((course, index) => {
        return index == location?.state.courseId;
      });
      setFormFields((state) => ({
        ...state,
        cName: course[0].cName,
        cDuration: course[0].cDuration,
        cFees: course[0].cFees,
        cRating: course[0].cRating,
        cSubjects: course[0].cSubjects,
        cDescription: course[0].cDescription,
      }));
    }
  }, [location]);

  /**
   * @funtion to handle  the back of button
   */
  const handleBack = () => {
    navigate("/home");
  };
  /**
   * @funtion to check the errors of form fields
   */
  const checkErrors = (e) => {
    switch (e.target.name) {
      case "cName":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, nameError: true }));
        } else if (e.target.value && !Rejex.nameReg.test(e.target.value)) {
          setformErrors((prevState) => ({ ...prevState, emailError: true }));
        } else {
          setformErrors((prevState) => ({ ...prevState, nameError: false }));
        }
        break;
      case "cDuration":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, durationError: true }));
        } else if (e.target.value && isNaN(e.target.value)) {
          setformErrors((prevState) => ({ ...prevState, durationError: true }));
        } else {
          setformErrors((prevState) => ({
            ...prevState,
            durationError: false,
          }));
        }
        break;
      case "cFees":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, feesError: true }));
        } else if (e.target.value && isNaN(e.target.value)) {
          setformErrors((prevState) => ({ ...prevState, feesError: true }));
        } else {
          setformErrors((prevState) => ({ ...prevState, feesError: false }));
        }
        break;
      case "cRating":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, ratingError: true }));
        } else if (
          e.target.value &&
          (isNaN(e.target.value) || e.target.value > 5)
        ) {
          setformErrors((prevState) => ({ ...prevState, ratingError: true }));
        } else {
          setformErrors((prevState) => ({ ...prevState, ratingError: false }));
        }
        break;
      case "cSubjects":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, subjectError: true }));
        } else {
          setformErrors((prevState) => ({ ...prevState, subjectError: false }));
        }
        break;
      case "cDescription":
        if (!e.target.value) {
          setformErrors((prevState) => ({ ...prevState, descError: true }));
        } else {
          setformErrors((prevState) => ({ ...prevState, descError: false }));
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
      case "cName":
        setFormFields((state) => ({ ...state, cName: e.target.value }));
        break;

      case "cDuration":
        setFormFields((state) => ({ ...state, cDuration: e.target.value }));
        break;

      case "cFees":
        setFormFields((state) => ({ ...state, cFees: e.target.value }));
        break;
      case "cRating":
        setFormFields((state) => ({ ...state, cRating: e.target.value }));
        break;
      case "cDescription":
        setFormFields((state) => ({ ...state, cDescription: e.target.value }));
        break;
      case "cSubjects":
        setFormFields((state) => ({ ...state, cSubjects: e.target.value }));
        break;
      default:
        break;
    }
  };
  /**
   * @function to disable the submit button  of form until every field is valid
   */
  useEffect(() => {
    if (
      Object.values(formErrors).every((value) => value == false) &&
      Object.values(formFields).every((value) => value)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formErrors, formFields]);

  /**
   * @function to handle the submit action of form
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const isCourse = JSON.parse(localStorage.getItem("courses"));
    if (isEdit) {
      // const course = isCourse.filter((course, index) => {
      //   return index == location?.state.courseId;
      // });
      const updated = isCourse.map((course, index) => {
        if (index == location?.state.courseId) {
          return {
            ...course,
            cName: formFields.cName,
            cDuration: formFields.cDuration,
            cFees: formFields.cFees,
            cRating: formFields.cRating,
            cSubjects: formFields.cSubjects,
            cDescription: formFields.cDescription,
          };
        }
        return course;
      });
      const newCourse = JSON.stringify(updated);
      localStorage.setItem("courses", newCourse);
      alert("Course have been updated successfully");
    } else {
      isCourse.push(formFields);
      const newCourse = JSON.stringify(isCourse);
      localStorage.setItem("courses", newCourse);
      alert("Course have been added successfully");
    }

    navigate("/home", { replace: true });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl">
        <Paper
          square
          elevation={3}
          sx={{
            p: 2,
            m: 2,
          }}
        >
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
            {isEdit ? (
              <h2
                style={{
                  marginLeft: "10px",
                }}
              >
                Edit Course
              </h2>
            ) : (
              <h2
                style={{
                  marginLeft: "10px",
                }}
              >
                Add Course
              </h2>
            )}
          </Box>
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
                  name="cName"
                  required
                  fullWidth
                  id="firstName"
                  label="Course Name"
                  value={formFields.cName}
                  error={formErrors.nameError ? true : false}
                  helperText={
                    formErrors.nameError
                      ? formFields.cName.length <= 0
                        ? "Course Name " + errorMessage.empty
                        : errorMessage.invalid + " Course Name"
                      : ""
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="cDuration"
                  required
                  fullWidth
                  id="cDuration"
                  label="Course Duration"
                  value={formFields.cDuration}
                  error={formErrors.durationError ? true : false}
                  helperText={
                    formErrors.durationError
                      ? formFields.cDuration.length <= 0
                        ? "Course Duration " + errorMessage.empty
                        : errorMessage.invalid + " Course Duration"
                      : "Please enter duration in months i.e. 24"
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                  inputProps={{
                    maxLength: 2,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="cFees"
                  required
                  fullWidth
                  id="cFees"
                  label="Course Fees"
                  value={formFields.cFees}
                  error={formErrors.feesError ? true : false}
                  helperText={
                    formErrors.feesError
                      ? formFields.cFees.length <= 0
                        ? "Course Fees " + errorMessage.empty
                        : errorMessage.invalid + " Course Fees"
                      : " "
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                  inputProps={{
                    maxLength: 6,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="cRating"
                  required
                  fullWidth
                  id="cRating"
                  label="Course Rating"
                  value={formFields.cRating}
                  error={formErrors.ratingError ? true : false}
                  helperText={
                    formErrors.ratingError
                      ? formFields.cRating.length <= 0
                        ? "Course Rating " + errorMessage.empty
                        : errorMessage.invalid + " Course Rating"
                      : "Course Rating should be between 0 to 5 "
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                  inputProps={{
                    maxLength: 1,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Course Subjects"
                  multiline
                  required
                  fullWidth
                  name="cSubjects"
                  rows={4}
                  value={formFields.cSubjects}
                  error={formErrors.subjectError ? true : false}
                  helperText={
                    formErrors.subjectError
                      ? formFields.cSubjects.length <= 0
                        ? "Course Subjects " + errorMessage.empty
                        : errorMessage.invalid + " Course Subject"
                      : "Course Subjects should seperated by ',' i.e.HTML,Css  "
                  }
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                  inputProps={{
                    maxLength: 200,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Course Description"
                  multiline
                  required
                  fullWidth
                  name="cDescription"
                  rows={4}
                  value={formFields.cDescription}
                  error={formErrors.descError ? true : false}
                  helperText={formErrors.descError ? errorMessage.empty : ""}
                  onChange={(e) => {
                    handleInputChange(e);
                    checkErrors(e);
                  }}
                  onBlur={(e) => checkErrors(e)}
                  inputProps={{
                    maxLength: 200,
                  }}
                />
              </Grid>
              <Grid item xs={12} ustifyContent="flex-start" sm={3}>
                {isEdit ? (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!isFormValid}
                  >
                    Save Course
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={!isFormValid}
                  >
                    Add Course
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default AddCourse;
