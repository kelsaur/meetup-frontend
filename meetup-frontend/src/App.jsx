import MeetupList from './pages/MeetupList';
import MeetupDetail from './pages/MeetupDetail';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <MeetupList />
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
        <Route 
          path="/meetup/:id" 
          element={
            <ProtectedRoute>
              <MeetupDetail />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  );
}

export default App;
