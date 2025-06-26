import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import { Toaster } from "@/components/ui/sonner";
import AuthContext from "./AuthContext";

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
