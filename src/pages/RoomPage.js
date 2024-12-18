import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRoomDetails } from '../api/rooms';
import { getDevicesByRoomId } from '../api/devices';
import DeviceCard from '../components/DeviceCard';
import Header from '../components/Header';

function RoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoomAndDevices = async () => {
    try {
      setLoading(true);
      // Fetch room details
      const roomData = await getRoomDetails(id);
      setRoom(roomData);
      
      // Fetch devices for this room
      const devicesData = await getDevicesByRoomId(id);
      setDevices(devicesData);
    } catch (error) {
      console.error('Error fetching room data:', error);
      setError(error.message || 'Error fetching room details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoomAndDevices();
  }, [id]);

  const handleDeviceUpdate = () => {
    fetchRoomAndDevices(); // Refresh the data when a device is updated
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!room) return <div>Room not found</div>;

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>{room.name}</h2>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/add-device/${id}`)}
          >
            Add Device
          </button>
        </div>
        <div className="row">
          {devices.length === 0 ? (
            <div className="col-12 text-center">
              <p>No devices in this room. Add a device to get started!</p>
            </div>
          ) : (
            devices.map((device) => (
              <div key={device._id} className="col-md-4 mb-4">
                <DeviceCard device={device} onStatusChange={handleDeviceUpdate} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomPage;