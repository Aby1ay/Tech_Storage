import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        login,
        password,
      });

      if (response.status === 200) {
        window.location.href = '/'; // Redirect to home page after successful login
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="w-50 mx-auto">
        <div className="mb-3">
          <label htmlFor="login" className="form-label">Login</label>
          <input
            type="text"
            id="login"
            className="form-control"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
