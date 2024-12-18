import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FaBolt, FaLightbulb, FaExclamationTriangle } from 'react-icons/fa';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const POWER_LIMIT = 15000; // 15000 watts limit

function ProfilePage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/stats', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching stats');
      } finally {
        setLoading(false);
      }
    };

    // Fetch stats every 30 seconds to keep power consumption up to date
    fetchStats();
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!stats) return <div>No stats available</div>;

  // Prepare data for the pie chart
  const chartData = {
    labels: stats.stats.devicesByCategory.map(cat => cat._id),
    datasets: [
      {
        data: stats.stats.devicesByCategory.map(cat => cat.count),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  const isOverPowerLimit = stats.stats.powerConsumption.active > POWER_LIMIT;

  return (
    <div>
      <Header />
      {isOverPowerLimit && (
        <div className="alert alert-danger power-alert m-3" role="alert">
          <div className="d-flex align-items-center">
            <FaExclamationTriangle className="me-2" size={24} />
            <div>
              <h4 className="alert-heading mb-1">High Power Consumption Alert!</h4>
              <p className="mb-0">
                Your current power consumption ({stats.stats.powerConsumption.active}W) exceeds the recommended limit of {POWER_LIMIT}W.
                Consider turning off some devices to reduce power consumption.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Profile Information</h2>
                <p><strong>Username:</strong> {stats.user.username}</p>
                <p><strong>Email:</strong> {stats.user.email}</p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Statistics</h2>
                <div className="row">
                  <div className="col-6 mb-3">
                    <div className="border rounded p-3 text-center">
                      <h3 className="h5">Total Rooms</h3>
                      <p className="h2">{stats.stats.totalRooms}</p>
                    </div>
                  </div>
                  <div className="col-6 mb-3">
                    <div className="border rounded p-3 text-center">
                      <h3 className="h5">Total Devices</h3>
                      <p className="h2">{stats.stats.totalDevices}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="border rounded p-3 text-center">
                      <h3 className="h5">Active Devices</h3>
                      <p className="h2">{stats.stats.activeDevices}</p>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="border rounded p-3 text-center">
                      <h3 className="h5">Device Categories</h3>
                      <p className="h2">{stats.stats.devicesByCategory.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Power Consumption</h2>
                <div className="power-stats">
                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <FaBolt className="text-warning me-2" size={24} />
                      <h3 className="h5 mb-0">Total Power Capacity</h3>
                    </div>
                    <p className="h2 mb-0">{stats.stats.powerConsumption.total} W</p>
                    <small className="text-muted">Maximum power if all devices are on</small>
                  </div>
                  
                  <div>
                    <div className="d-flex align-items-center mb-2">
                      <FaLightbulb className={`me-2 ${isOverPowerLimit ? 'text-danger' : 'text-success'}`} size={24} />
                      <h3 className="h5 mb-0">Current Active Power</h3>
                    </div>
                    <p className={`h2 mb-0 ${isOverPowerLimit ? 'text-danger' : ''}`}>
                      {stats.stats.powerConsumption.active} W
                      {isOverPowerLimit && <small className="ms-2 text-danger">(Exceeds Limit)</small>}
                    </p>
                    <small className={isOverPowerLimit ? 'text-danger' : 'text-muted'}>
                      {isOverPowerLimit 
                        ? 'Warning: High power consumption!' 
                        : 'Power consumed by active devices'}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Devices by Category</h2>
                <div style={{ height: '300px' }}>
                  <Pie 
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage; 