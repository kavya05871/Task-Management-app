import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signup'; 
import Dashboard from './pages/Dashboard';
import RealtimePage from './pages/RealtimePage';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Required
import './index.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/realtime"
            element={
              <ProtectedRoute>
                <RealtimePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
;
