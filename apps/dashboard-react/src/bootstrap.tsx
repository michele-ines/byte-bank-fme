import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";

import "@global-styles";
import { StoreProvider } from "@store"; // <- usa StoreProvider do apps/store


const container = document.getElementById('root');
if (container) {
  ReactDOM.render(
    <BrowserRouter>
      <StoreProvider>
        <Dashboard />
      </StoreProvider>
    </BrowserRouter>,
    container
  );
}

export {};