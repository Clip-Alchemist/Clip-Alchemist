import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import Page from "./app/page";

const App = () => {
  return <Page />;
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
