import React from "react";
import { BrowserRouter } from "react-router-dom"
import { AppRoutes } from "./route"
import "./layout/assets/style/main.scss"

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app-main">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
