// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRooms } from '../api/rooms';
import RoomCard from '../components/RoomCard';
import Header from '../components/Header';

function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const data = await getRooms();
        console.log('Fetched rooms:', data);
        setRooms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError(error.message || 'Error fetching rooms');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Rooms</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/add-room')}
          >
            Add Room
          </button>
        </div>
        <div className="row">
          {rooms.length === 0 ? (
            <div className="col-12 text-center">
              <p>No rooms found. Add a room to get started!</p>
            </div>
          ) : (
            rooms.map((room) => (
              <div key={room._id} className="col-md-4 mb-4">
                <RoomCard room={room} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
