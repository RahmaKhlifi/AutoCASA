import axios from 'axios';

const API_URL = 'http://localhost:5000/api/rooms';  // Backend URL

// Fetch all rooms
export const getRooms = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Add a new room
export const addRoom = async (roomData) => {
  try {
    const response = await axios.post(API_URL, roomData);
    return response.data;
  } catch (error) {
    console.error('Error adding room:', error);
    throw error;
  }
};

// Fetch room details by ID
export const getRoomDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room details:', error);
    throw error;
  }
};

// Fetch devices in a room by room ID
export const getDevicesInRoom = async (roomId) => {
  try {
    const response = await axios.get(`${API_URL}/${roomId}/devices`);
    return response.data;
  } catch (error) {
    console.error('Error fetching devices in room:', error);
    throw error;
  }
};