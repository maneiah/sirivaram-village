// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css"; // REQUIRED CSS

import App from "./App.jsx";
import "./index.css";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <App />
      </BrowserRouter>
      </MantineProvider>
  </React.StrictMode>
);
