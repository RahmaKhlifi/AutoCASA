import React from 'react';
import { useNavigate } from 'react-router-dom';

function DeviceCard({ device }) {
  const navigate = useNavigate();
  const statusColor = device.status === 'On' ? 'green' : 'red';

  return (
    <div className="col-md-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{device.name}</h5>
          <p className="card-text">Status: <span style={{ color: statusColor }}>{device.status}</span></p>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate(`/edit-device/${device._id}`)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeviceCard;
