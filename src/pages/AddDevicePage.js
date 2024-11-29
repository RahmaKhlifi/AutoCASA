import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addDevice } from '../api/devices'; // API call for adding device

function AddDevicePage() {
  const { roomId } = useParams();
  const [deviceName, setDeviceName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddDevice = async (e) => {
    e.preventDefault();
    if (!deviceName) {
      setError('Device name is required');
      return;
    }
    try {
      await addDevice(roomId, deviceName); // API call to add the device
      navigate(`/room/${roomId}`); // Navigate back to the room page after adding device
    } catch (err) {
      setError('Failed to add device');
    }
  };

  return (
    <div className="container">
      <h2>Add Device</h2>
      <form onSubmit={handleAddDevice}>
        <div className="mb-3">
          <label className="form-label">Device Name</label>
          <input
            type="text"
            className="form-control"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit" className="btn btn-primary">Add Device</button>
      </form>
    </div>
  );
}

export default AddDevicePage;
