// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import { getRooms } from '../api/rooms';  // Import getRooms function
import RoomCard from '../components/RoomCard';

function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // Handle error state
  const navigate = useNavigate();  // Use navigate for routing

  useEffect(() => {
    async function fetchRooms() {
      try {
        const roomList = await getRooms();  // Get rooms from API
        setRooms(roomList);  // Set the rooms state
      } catch (error) {
        setError('Error fetching rooms');  // Set error message if fetching fails
      } finally {
        setLoading(false);  // Set loading to false once request completes
      }
    }

    fetchRooms();
  }, []);

  if (loading) return <div>Loading rooms...</div>;  // Display loading message
  if (error) return <div>{error}</div>;  // Display error message

  return (
    <div className="container">
      <h2>Home</h2>
      <div className="d-flex justify-content-between">
        <h3>Your Rooms</h3>
        <button className="btn btn-primary" onClick={() => navigate('/add-room')}>
          Add Room
        </button>
      </div>
      <div className="row">
        {rooms.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
