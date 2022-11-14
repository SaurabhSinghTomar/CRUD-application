import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../components/Layout/Layout";
function PrivateRoute({ children, isAuthenticated, ...rest }) {
  const login = localStorage.getItem("login");

  return login ? (
    <Layout children={children} />
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
}

export default PrivateRoute;
PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.any,
};
