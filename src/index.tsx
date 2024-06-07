// libraries 
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// styles
import "./index.css";
import "./fonts/fonts.css";
import "./ui/common.css";
import "./ui/box.css";

// components
import { App } from "./components";



const container = document.querySelector("#root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
