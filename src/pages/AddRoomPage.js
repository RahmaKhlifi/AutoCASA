import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addRoom } from '../api/rooms';

function AddRoomPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRoom({ name, description });  // Call addRoom function
      navigate('/');  // Redirect to home page after adding the room
    } catch (error) {
      setError('Error adding room');
    }
  };

  return (
    <div>
      <h2>Add Room</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
}

export default AddRoomPage;