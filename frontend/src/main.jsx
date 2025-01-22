import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
     <ToastContainer/>
      <App />
    </Router>
  </React.StrictMode>
);

