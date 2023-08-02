import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home/HomePage";

let href = window.location.href;
console.log(href.includes("/signup"));
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {href.includes("/signup") || href.includes("/login") ? "" : <Home />}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
