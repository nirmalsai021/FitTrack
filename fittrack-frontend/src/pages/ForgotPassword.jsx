import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      await axios.post(`${config.API_BASE_URL}/auth/forgot-password/`, { email });
      setMessage('Reset code sent to your email!');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2 className="mb-4">Forgot Password</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </form>
        
        <div className="mt-3">
          <Link to="/login">Back to Login</Link> | <Link to="/reset-password">Have a reset code?</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;