import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
      <Router />
    </BrowserRouter>
  );
}

export default App;
