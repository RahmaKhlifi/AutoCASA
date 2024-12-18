import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock, FaHome } from 'react-icons/fa';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        navigate('/'); // Redirect to login page after successful registration
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card card">
        <div className="card-body">
          <div className="text-center mb-4">
            <FaHome size={40} className="text-primary mb-2" />
            <h2 className="auth-title">Create AutoCASA Account</h2>
            <p className="text-muted">Join the smart home revolution</p>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaUser />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FaLock />
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <small className="text-muted mt-1 d-block">
                Password must be at least 6 characters long
              </small>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>

            <div className="text-center">
              <p className="mb-0">
                Already have an account?{' '}
                <Link to="/" className="text-primary">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
