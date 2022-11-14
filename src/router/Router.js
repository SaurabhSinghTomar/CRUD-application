import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import About from "../pages/About/About";
import AddCourse from "../pages/AddCourse/AddCourse";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import MyProfile from "../pages/MyProfile/MyProfile";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import ViewCourse from "../pages/ViewCourse/ViewCourse";
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
      <Route
        path="/editCourse"
        element={
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/about"
        element={
          <PrivateRoute>
            <About />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/myProfile"
        element={
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        }
      ></Route>
      <Route
        path="/course/:id"
        element={
          <PrivateRoute>
            <ViewCourse />
          </PrivateRoute>
        }
      ></Route>
    </Routes>
  );
};

export default Router;
