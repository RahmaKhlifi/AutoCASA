import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDeviceById, updateDevice } from '../api/devices';
import Header from '../components/Header';
import { FaEdit, FaArrowLeft } from 'react-icons/fa';

function EditDevicePage() {
  const { deviceId } = useParams();
  const [deviceName, setDeviceName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDeviceDetails() {
      try {
        const device = await getDeviceById(deviceId);
        setDeviceName(device.name);
        setRoomId(device.room); // Store the room ID for navigation
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

    setLoading(true);
    try {
      await updateDevice(deviceId, { name: deviceName });
      navigate(`/room/${roomId}`); // Navigate back to the room page using roomId
    } catch (err) {
      setError('Failed to update device');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <div className="text-center mb-4">
                  <FaEdit size={40} className="text-primary mb-2" />
                  <h2 className="card-title">Edit Device</h2>
                  <p className="text-muted">Update your device settings</p>
                </div>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                <form onSubmit={handleUpdateDevice}>
                  <div className="mb-4">
                    <label className="form-label">Device Name</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <FaEdit />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter device name"
                        value={deviceName}
                        onChange={(e) => setDeviceName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Updating Device...
                        </>
                      ) : (
                        'Update Device'
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => navigate(`/room/${roomId}`)}
                    >
                      <FaArrowLeft className="me-2" />
                      Back to Room
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDevicePage;