import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setIsButtonDisabled(true);

    try {
      const response = await fetch('http://localhost:8080/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const responseData = await response.text();

      if (!response.ok) {
        throw new Error(responseData || 'Failed to send OTP');
      }

      navigate('/verify-otp', { state: { email } });
    } catch (err) {
      setError(err.message);
    }

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
      <div className="col-12 col-md-18 col-lg-30">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSendOtp}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={isButtonDisabled}
                >
                  {isButtonDisabled ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/signin">Sign In</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;