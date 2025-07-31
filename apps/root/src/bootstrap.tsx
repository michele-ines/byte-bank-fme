// apps/root/src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@global-styles"; // ou o caminho relativo "../../styles/globals.css"

const root = document.getElementById("root")!;
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  root
);
