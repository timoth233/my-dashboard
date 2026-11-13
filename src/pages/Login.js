import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login imeshindikana.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Login</h2>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <label className="form-label">Email</label>

        <input
          type="email"
          className="form-control mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="form-label">Password</label>

        <input
          type="password"
          className="form-control mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Inaingia...' : 'Login'}
        </button>

        <p className="text-center mt-3">
          Huna account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;