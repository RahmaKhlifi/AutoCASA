import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Add a request interceptor to add the token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch all rooms
export const getRooms = async () => {
  try {
    const response = await api.get('/rooms');
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Add a new room
export const addRoom = async (roomData) => {
  try {
    const response = await api.post('/rooms', roomData);
    return response.data;
  } catch (error) {
    console.error('Error adding room:', error);
    throw error;
  }
};

// Fetch room details by ID
export const getRoomDetails = async (id) => {
  try {
    const response = await api.get(`/rooms/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room details:', error);
    throw error;
  }
};

// Fetch devices in a room by room ID
export const getDevicesInRoom = async (roomId) => {
  try {
    const response = await api.get(`/rooms/${roomId}/devices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching devices in room:', error);
    throw error;
  }
};