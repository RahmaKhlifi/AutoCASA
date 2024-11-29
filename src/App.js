import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AddRoomPage from './pages/AddRoomPage';
import RoomPage from './pages/RoomPage';
import AddDevicePage from './pages/AddDevicePage';
import EditDevicePage from './pages/EditDevicePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/add-room" element={<AddRoomPage />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/add-device" element={<AddDevicePage />} />
        <Route path="/edit-device/:id" element={<EditDevicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
