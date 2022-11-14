import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, Container, Grid, Paper } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const theme = createTheme();

const ViewCourse = ({}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isCourse = JSON.parse(localStorage.getItem("courses"));
  const course = isCourse.filter((course, index) => {
    return index == id;
  });

  /**
   * @funtion to handle  the back of button
   */

  const handleBack = () => {
    navigate("/home");
  };

  const handleEdit = (index) => {
    navigate("/editCourse", {
      state: {
        isEdit: true,
        courseId: index,
      },
    });
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
            <h2
              style={{
                marginLeft: "10px",
              }}
            >
              View Course
            </h2>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <h4>Course Name</h4>
            </Grid>
            <Grid item xs={12} sm={9}>
              <p>{course[0].cName}</p>
            </Grid>
            <Grid item xs={12} sm={3}>
              <h4>Course Duration</h4>
            </Grid>
            <Grid item xs={12} sm={9}>
              <p>{course[0].cDuration}</p>
            </Grid>
            <Grid item xs={12} sm={3}>
              <h4>Course Fees</h4>
            </Grid>
            <Grid item xs={12} sm={9}>
              <p>{course[0].cFees}</p>
            </Grid>
            <Grid item xs={12} sm={3}>
              <h4>Course Subject</h4>
            </Grid>
            <Grid item xs={12} sm={9}>
              <p>{course[0].cSubjects}</p>
            </Grid>
            <Grid item xs={12} sm={3}>
              <h4>Course Description</h4>
            </Grid>
            <Grid item xs={12} sm={9}>
              <p>{course[0].cDescription}</p>
            </Grid>
            <Grid item xs={12} sm={3}>
              <h4>Course Rating</h4>
            </Grid>
            <Grid item xs={12} sm={9}>
              <p>{course[0].cRating}</p>
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => handleEdit(id)}
            >
              Edit Course
            </Button>
          </Grid>
        </Grid>
      </Container>
      /
    </ThemeProvider>
  );
};

export default ViewCourse;
