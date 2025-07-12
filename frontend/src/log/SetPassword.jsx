import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function SetPassword() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleSetPassword = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Name cannot be blank');
      return;
    }

    if (password !== retypePassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to set password');
      }
      alert("Successfully registered! Please login");
      navigate('/signin');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
      <div className="col-12 col-md-18 col-lg-30">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Set Password</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSetPassword}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="retypePassword" className="form-label">Retype Password:</label>
                  <input
                    type="password"
                    id="retypePassword"
                    className="form-control"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Set Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetPassword;