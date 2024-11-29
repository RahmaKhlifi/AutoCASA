import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to navigate between pages

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Add your login logic here (e.g., call the backend API)
    console.log('Logging in with', username, password);
    navigate('/home'); // Redirect to HomePage after successful login
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="mt-3">
        <span>Don't have an account? </span>
        <button
          className="btn btn-link"
          onClick={() => navigate('/register')} // Navigate to the register page
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
