import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeviceById, updateDevice } from '../api/devices'; // Correct import for devices

function EditDevicePage() {
  const { deviceId } = useParams();
  const [deviceName, setDeviceName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDeviceDetails() {
      try {
        const device = await getDeviceById(deviceId); // Fetch device details
        setDeviceName(device.name); // Set device name to the state
      } catch (err) {
        setError('Failed to fetch device details');
      }
    }

    fetchDeviceDetails();
  }, [deviceId]);

  const handleUpdateDevice = async (e) => {
    e.preventDefault();
    if (!deviceName) {
      setError('Device name is required');
      return;
    }

    try {
      await updateDevice(deviceId, { name: deviceName }); // Update the device
      navigate(`/room/${deviceId}`); // Navigate back to the room page
    } catch (err) {
      setError('Failed to update device');
    }
  };

  return (
    <div className="container">
      <h2>Edit Device</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleUpdateDevice}>
        <div className="mb-3">
          <label className="form-label">Device Name</label>
          <input
            type="text"
            className="form-control"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Device</button>
      </form>
    </div>
  );
}

export default EditDevicePage;