import { Routes, Route } from 'react-router-dom'
import MeetupList from './pages/MeetupList'

import './App.css'


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/*<Route path="/register" element={<Register />} /> This will be used once the page is created*/}
        {/*<Route path="/login" element={<Login />} /> This will be used once the page is created*/}
        {/*<Route path="/dashboard" element={<MeetupList />} /> This will be used after merge with landing page branch*/}
        {/*<Route path="/meetup" element={<MeetupDetail />} /> This will be used once the page is created*/}
        {/*<Route path="/profile" element={<Profile />} /> This will be used once the page is created*/}
        <Route path="/dashboard" element={<MeetupList />} />
        
      </Routes>
    </>
  )
}

export default App
