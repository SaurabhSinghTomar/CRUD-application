import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";

function App() {
  const isCourses = localStorage.getItem("courses");
  if (!isCourses) {
    localStorage.setItem("courses", JSON.stringify([]));
  }
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Router />
    </BrowserRouter>
  );
}

export default App;
