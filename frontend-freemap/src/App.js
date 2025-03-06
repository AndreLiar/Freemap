import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; // Import the Profile page
import LandingPage from "./pages/LandingPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute
import CallUser from "./components/CallUser";
import IncomingCall from "./components/IncommingCall";
import JitsiRoom from "./components/CallingViewer";
import ResultsPage from "./pages/ResultsPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route
            path="/call"
            element={
              <ProtectedRoute>
                <CallUser userId="9UIodp1c6bLtfDz-AAAF" />
              </ProtectedRoute>
            }
          />
          <Route path="/incoming-call" element={<IncomingCall />} />
          <Route path="/room/:roomId" element={<JitsiRoom />} />

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
    </AuthProvider>
  );
}

export default App;

