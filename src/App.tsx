import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import UserPanel from './components/UserPanel';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute role="admin">
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <ProtectedRoute role="user">
                <UserPanel />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;