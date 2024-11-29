import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed and imported

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate fields before sending request
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      // Send registration request to your backend API (replace with your actual API URL)
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      // Handle successful registration
      if (response.status === 201) {
        // Optionally show a success message
        alert('Registration successful! Please login.');
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (err) {
      // Handle registration error (e.g., duplicate email, server issues)
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
