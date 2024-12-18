import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLightbulb, FaThermometerHalf, FaLock, FaTv, FaShieldAlt, FaVideo } from 'react-icons/fa';

function RoomCard({ room }) {
  const navigate = useNavigate();

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Lighting':
        return <FaLightbulb className="text-warning" />;
      case 'Climate':
        return <FaThermometerHalf className="text-info" />;
      case 'Security':
        return <FaLock className="text-danger" />;
      case 'Entertainment':
        return <FaTv className="text-primary" />;
      default:
        return null;
    }
  };

  // Group devices by category
  const devicesByCategory = room.devices?.reduce((acc, device) => {
    acc[device.category] = (acc[device.category] || 0) + 1;
    return acc;
  }, {}) || {};

  const isSecurityRoom = room.type === 'security';

  return (
    <div 
      className={`card room-card h-100 ${isSecurityRoom ? 'security-room' : ''}`} 
      onClick={() => navigate(`/room/${room._id}`)}
    >
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          {isSecurityRoom ? (
            <FaShieldAlt className="text-danger me-2" size={24} />
          ) : null}
          <h5 className="card-title mb-0">{room.name}</h5>
        </div>
        
        <div className="device-stats mb-3">
          <div className="row g-2">
            {Object.entries(devicesByCategory).map(([category, count]) => (
              <div key={category} className="col-6">
                <div className="d-flex align-items-center p-2 border rounded">
                  <div className="me-2">
                    {getCategoryIcon(category)}
                  </div>
                  <div>
                    <small className="text-muted">{category}</small>
                    <div className="fw-bold">{count}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <span className={`badge ${isSecurityRoom ? 'bg-danger' : 'bg-primary'}`}>
            {room.devices?.length || 0} Devices
          </span>
          {isSecurityRoom ? (
            <div className="d-flex align-items-center">
              <FaVideo className="text-success me-1" />
              <small className="text-success">Always Active</small>
            </div>
          ) : (
            <small className="text-muted">Click to manage</small>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomCard;
