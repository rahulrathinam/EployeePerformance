import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("app");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found! Ensure index.html has a div with id='root'");
}
