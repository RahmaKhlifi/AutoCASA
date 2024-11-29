import React from 'react';
import { useNavigate } from 'react-router-dom';

function RoomCard({ room }) {
  const navigate = useNavigate();

  return (
    <div className="col-md-4">
      <div className="card" onClick={() => navigate(`/room/${room._id}`)}>
        <div className="card-body">
          <h5 className="card-title">{room.name}</h5>
          <p className="card-text">Devices: {room.devices.length}</p>
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
