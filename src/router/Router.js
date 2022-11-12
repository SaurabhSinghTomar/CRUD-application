import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import AddCourse from "../pages/AddCourse/AddCourse";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoutes";

const Router = () => {
  const login = localStorage.getItem("login");

  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route
        path="/"
        element={
          login ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Login />
          )
        }
      ></Route>

      {/* -------public route will be accessible before login or publicaly to anyone*/}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      ></Route>

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      ></Route>

      {/* -------Private route will be accessible after login or only for authenticated person*/}

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/addCourse"
        element={
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default Router;
