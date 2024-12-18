import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add request interceptor to include token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Get devices by room ID
export const getDevicesByRoomId = async (roomId) => {
  try {
    const response = await api.get(`/devices/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw error;
  }
};

// Add a new device
export const addDevice = async (roomId, deviceData) => {
  try {
    const response = await api.post(`/devices/room/${roomId}`, deviceData);
    return response.data;
  } catch (error) {
    console.error('Error adding device:', error);
    throw error;
  }
};

// Get device by ID
export const getDeviceById = async (deviceId) => {
  try {
    const response = await api.get(`/devices/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching device:', error);
    throw error;
  }
};

// Update device
export const updateDevice = async (deviceId, updateData) => {
  try {
    const response = await api.put(`/devices/${deviceId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating device:', error);
    throw error;
  }
};

// Delete device
export const deleteDevice = async (deviceId) => {
  try {
    const response = await api.delete(`/devices/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting device:', error);
    throw error;
  }
};