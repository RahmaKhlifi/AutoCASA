import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateDevice, deleteDevice } from '../api/devices';
import { FaLightbulb, FaThermometerHalf, FaLock, FaTv, FaEdit, FaTrash, FaBolt } from 'react-icons/fa';

function DeviceCard({ device, onStatusChange }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState(device.status);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const getCategoryIcon = () => {
    switch (device.category) {
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

  const toggleStatus = async () => {
    try {
      setUpdating(true);
      const newStatus = status === 'On' ? 'Off' : 'On';
      await updateDevice(device._id, { status: newStatus });
      setStatus(newStatus);
      if (onStatusChange) onStatusChange();
    } catch (error) {
      console.error('Error updating device status:', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this device?')) {
      try {
        setDeleting(true);
        await deleteDevice(device._id);
        if (onStatusChange) onStatusChange();
      } catch (error) {
        console.error('Error deleting device:', error);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className="card device-card h-100">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="device-icon me-3">
            {getCategoryIcon()}
          </div>
          <div className="flex-grow-1">
            <h5 className="card-title mb-1">{device.name}</h5>
            <div className="d-flex align-items-center">
              <small className="text-muted me-3">{device.category}</small>
              <div className="d-flex align-items-center text-warning">
                <FaBolt className="me-1" size={12} />
                <small>{device.powerConsumption}W</small>
              </div>
            </div>
          </div>
        </div>

        <div className="device-controls">
          <button
            className={`btn ${status === 'On' ? 'btn-success' : 'btn-outline-secondary'} flex-grow-1`}
            onClick={toggleStatus}
            disabled={updating || deleting}
          >
            {updating ? 'Updating...' : status}
          </button>
          
          <div className="btn-group">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate(`/edit-device/${device._id}`)}
              disabled={deleting}
            >
              <FaEdit />
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={handleDelete}
              disabled={deleting}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceCard;
