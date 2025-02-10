import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Body, AdminAdd, AdminPanel, ProtectedRoute, Login, AdminEdit } from "./components";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Cek apakah user sudah login (dari local storage)
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<AdminPanel />} />} />
        <Route path="/admin/add" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<AdminAdd />} />} />
        <Route path="/admin/edit/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<AdminEdit />} />} />
      </Routes>
    </Router>
  );
};

export default App;
