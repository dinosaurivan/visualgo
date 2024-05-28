import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./fonts/fonts.css";
import "./ui/common.css";
import "./ui/box.css";
import App from "./components/app/app";

const container = document.querySelector("#root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
