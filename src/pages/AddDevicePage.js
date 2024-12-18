import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addDevice } from '../api/devices';
import Header from '../components/Header';
import { FaLightbulb, FaThermometerHalf, FaLock, FaTv } from 'react-icons/fa';

function AddDevicePage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [deviceData, setDeviceData] = useState({
    name: '',
    category: 'Lighting',
    status: 'Off',
    powerConsumption: 100
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = ['Lighting', 'Climate', 'Security', 'Entertainment'];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate power consumption
      const powerValue = parseInt(deviceData.powerConsumption);
      if (isNaN(powerValue) || powerValue < 100 || powerValue > 3000) {
        setError('Power consumption must be between 100 and 3000 watts');
        return;
      }

      await addDevice(roomId, {
        ...deviceData,
        powerConsumption: powerValue
      });
      navigate(`/room/${roomId}`);
    } catch (error) {
      console.error('Error adding device:', error);
      if (error.response?.data?.errors) {
        // Handle validation errors
        setError(error.response.data.errors.join(', '));
      } else {
        setError(error.response?.data?.message || 'Error adding device. Please try again.');
      }
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
                <h2 className="card-title text-center mb-4">Add New Device</h2>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Device Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={deviceData.name}
                      onChange={(e) => setDeviceData({ ...deviceData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <div className="input-group">
                      <span className="input-group-text">
                        {getCategoryIcon(deviceData.category)}
                      </span>
                      <select
                        className="form-select"
                        value={deviceData.category}
                        onChange={(e) => setDeviceData({ ...deviceData, category: e.target.value })}
                        required
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Power Consumption (Watts)</label>
                    <div className="input-group">
                      <input
                        type="number"
                        className="form-control"
                        value={deviceData.powerConsumption}
                        onChange={(e) => setDeviceData({ 
                          ...deviceData, 
                          powerConsumption: Math.max(100, Math.min(3000, parseInt(e.target.value) || 100))
                        })}
                        min="100"
                        max="3000"
                        required
                      />
                      <span className="input-group-text">W</span>
                    </div>
                    <small className="text-muted">
                      Enter a value between 100 and 3000 watts
                    </small>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Initial Status</label>
                    <select
                      className="form-select"
                      value={deviceData.status}
                      onChange={(e) => setDeviceData({ ...deviceData, status: e.target.value })}
                      required
                    >
                      <option value="Off">Off</option>
                      <option value="On">On</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? 'Adding Device...' : 'Add Device'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDevicePage;
