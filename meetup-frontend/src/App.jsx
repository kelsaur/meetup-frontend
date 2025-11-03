import MeetupList from './pages/MeetupList'
import MeetupDetail from './pages/MeetupDetail';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login'; 

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<MeetupList />} />
        <Route path="/meetup" element={<MeetupDetail />} />
        {/*<Route path="/profile" element={<Profile />} /> This will be used once the page is created*/}
        
        
      </Routes>
    </>
  )
}

export default App;
