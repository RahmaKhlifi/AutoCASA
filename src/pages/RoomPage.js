import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRoomDetails, getDevicesInRoom } from '../api/rooms';

function RoomPage() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [devices, setDevices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRoomDetails() {
      try {
        const roomData = await getRoomDetails(id);  // Get room details
        setRoom(roomData);
        const deviceData = await getDevicesInRoom(id);  // Get devices in room
        setDevices(deviceData);
      } catch (error) {
        setError('Error fetching room details');
      }
    }

    fetchRoomDetails();
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!room) return <div>Loading room...</div>;

  return (
    <div>
      <h2>{room.name}</h2>
      <p>{room.description}</p>
      <h3>Devices in this room:</h3>
      <ul>
        {devices.map((device) => (
          <li key={device._id}>{device.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default RoomPage;