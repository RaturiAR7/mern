import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GoalProvider } from "./Context/Goals";

ReactDOM.render(
  <React.StrictMode>
    <GoalProvider>
      <App />
    </GoalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
