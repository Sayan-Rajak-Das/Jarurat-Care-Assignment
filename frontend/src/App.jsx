import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();       // Check user authentication on app load
  }, [checkAuth]);

  // Show a loading screen while checking authentication
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Public Route, Redirect if Logged In */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/dashboard" /> : <Login />}
        />

        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      <Footer />    
    </div>
  );
};

export default App;
