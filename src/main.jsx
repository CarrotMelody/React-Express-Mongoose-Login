import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "jotai";
import App from "./components/App";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "antd/dist/antd.css";
import "./index.css";

function Root() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
