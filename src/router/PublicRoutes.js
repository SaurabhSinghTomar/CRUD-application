import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

function PublicRoute({ children, isAuthenticated, ...rest }) {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    (async () => {
      const login = await localStorage.getItem("login");
      if (login) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    })();
  }, []);
  return isLogin ? (
    <Navigate
      to={{
        pathname: "/home",
      }}
      replace
    />
  ) : (
    children
  );
}

export default PublicRoute;

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  children: PropTypes.any,
};
