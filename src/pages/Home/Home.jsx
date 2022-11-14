import { Box, Button, Container } from "@mui/material";
import React, { useState } from "react";
import "./Home.scss";
import { Columns } from "./TableColumn";
import { generatePath, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import { Table } from "./Table/Table";

const Home = () => {
  const navigate = useNavigate();
  const handleAddCourse = () => {
    navigate({ pathname: "/addCourse" });
  };
  const courses = JSON.parse(localStorage.getItem("courses"));
  const [filterText, setFilterText] = useState("");

  const handleIconClick = (index, type) => {
    if (type === "view") {
      navigate(generatePath("/course/:id", { id: index }));
    } else if (type === "edit") {
      navigate("/editCourse", {
        state: {
          isEdit: true,
          courseId: index,
        },
      });
    } else if (type === "delete") {
      courses.splice(index, 1);
      const updatedList = JSON.stringify(courses);
      localStorage.setItem("courses", updatedList);
      alert("Course removed please refresh page");
      navigate(0);
    }
  };

  const data = courses.map((course, index) => {
    return {
      id: index,
      title: course.cName,
      duration: course.cDuration,
      fees: course.cFees,
      subjects: course.cSubjects,
      desc: course.cDescription,
      rating: course.cRating,
      showButtons: true,
    };
  });

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            alignItems: "center",
          }}
        >
          <h1>Courses</h1>
          <Button variant="outlined" onClick={handleAddCourse}>
            Add Course
          </Button>
        </Box>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
            inputProps={{ "aria-label": "sSearch" }}
            onChange={(e) => setFilterText(e.target.value)}
            value={filterText}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Table
          columns={Columns}
          data={data}
          responsive={true}
          handleIconClick={handleIconClick}
          filterText={filterText}
        />
      </Container>
    </>
  );
};

export default Home;
