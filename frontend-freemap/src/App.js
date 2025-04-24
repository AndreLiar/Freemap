import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; // Import the Profile page
import LandingPage from "./pages/LandingPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute
import CallUser from "./components/CallUser";
import IncomingCall from "./components/IncommingCall";
import JitsiRoom from "./components/CallingViewer";
import ResultsPage from "./pages/ResultsPage";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"
import HomePage from "./pages/HomePage";
import Login from "./pages/login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/results" element={<ResultsPage />} />
          {/* <Route
            path="/call"
            element={
                <CallUser  />
            }
          /> */}
          <Route path="/incoming-call" element={<IncomingCall />} />
          <Route path="/room/:roomId" element={<JitsiRoom />} />
           <Route path="/home" element={<HomePage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
        >
          <IncomingCall />
        </ToastContainer>
    </AuthProvider>
  );
}

export default App;
