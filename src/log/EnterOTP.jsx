import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function EnterOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/auth/validate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error('Invalid OTP');
      }
      navigate('/set-password', { state: { email } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
       <div className="row justify-content-center w-200">
       <div className="col-12 col-md-18 col-lg-30">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Verify OTP</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleVerifyOtp}>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">OTP:</label>
                  <input
                    type="text"
                    id="otp"
                    className="form-control"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnterOTP;