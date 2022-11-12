import { Container } from "@mui/material";
import React from "react";
import "./Home.scss";
import DataTable from "react-data-table-component";
import { Columns } from "./TableColumn";
const Home = () => {
  const data = [
    {
      id: 1,
      title: "Web Development",
      duration: "3",
      fees: "500",
      subjects: "Javascript, Html, Css, Php ",
      desc:"Full web devlopment course",
      rating:"5",
      option:"view edit delete"
    },
    {
      id: 2,
      title: "React Development",
      duration: "6",
      fees: "540",
      subjects: "Javascript, Html, Css, Php ",
      desc:"Full web devlopment course",
      rating:"3",
      option:"view edit delete"
    },
  ];

  return (
    <>
      <Container maxWidth="lg ">
        <h1>Courses</h1>
        <DataTable columns={Columns} data={data} />
      </Container>
    </>
  );
};

export default Home;
