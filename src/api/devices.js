import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Adjust the URL if necessary

// Get device by ID
export const getDeviceById = async (deviceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/devices/${deviceId}`);
    return response.data;
  } catch (err) {
    throw new Error('Error fetching device details');
  }
};

// Update device by ID
export const updateDevice = async (deviceId, deviceData) => {
  try {
    const response = await axios.put(`${BASE_URL}/devices/${deviceId}`, deviceData);
    return response.data;
  } catch (err) {
    throw new Error('Error updating device');
  }
};

// Add device (example)
export const addDevice = async (roomId, deviceData) => {
  const response = await axios.post(`${BASE_URL}/devices`, { roomId, ...deviceData });
  return response.data;
};