// libraries 
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// components
import { App } from "./components";

// styles
import "./index.css";
import "./fonts/fonts.css";
import "./ui/common.css";
import "./ui/box.css";



const container = document.querySelector("#root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
