import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(
        form.name,
        form.email,
        form.password
      );

      navigate('/', { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration imeshindikana.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2 className="text-center mb-4">Create Account</h2>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <input
          name="name"
          className="form-control mb-3"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          className="form-control mb-3"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Password (minimum 8 characters)"
          value={form.password}
          onChange={handleChange}
          minLength={8}
          required
        />

        <button
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? 'Inatengeneza account...' : 'Register'}
        </button>

        <p className="text-center mt-3">
          Una account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;