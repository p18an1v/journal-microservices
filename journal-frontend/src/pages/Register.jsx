import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const passwordRequirements = [
    { regex: /.{8,}/, text: 'At least 8 characters' },
    { regex: /[A-Z]/, text: 'One uppercase letter' },
    { regex: /[a-z]/, text: 'One lowercase letter' },
    { regex: /[0-9]/, text: 'One number' },
    { regex: /[@#$%^&+=]/, text: 'One special character (@#$%^&+=)' }
  ];

  const checkRequirement = (requirement) => {
    return requirement.regex.test(formData.password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validatePassword = () => {
    return passwordRequirements.every(req => checkRequirement(req));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate password requirements
    if (!validatePassword()) {
      setError('Please ensure your password meets all requirements');
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await authAPI.register(formData.email, formData.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        
        <div className="container">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 col-lg-5 col-xl-4">
              <div className="auth-card text-center">
                <div className="success-icon">🎉</div>
                <h2>Account Created!</h2>
                <p>Redirecting you to login...</p>
                <div className="spinner-border text-primary mt-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100 py-5">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="auth-card">
              <div className="auth-header">
                <Link to="/" className="auth-logo">
                  <span className="brand-icon">📓</span>
                </Link>
                <h2>Create Account</h2>
                <p>Start your journaling journey today</p>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <span className="me-2">⚠️</span>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label">Email Address</label>
                  <div className="input-group">
                    <span className="input-group-text">📧</span>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <span className="input-group-text">🔒</span>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="password-requirements mb-4">
                  {passwordRequirements.map((req, index) => (
                    <div 
                      key={index} 
                      className={`requirement ${checkRequirement(req) ? 'met' : ''}`}
                    >
                      <span className="requirement-icon">
                        {checkRequirement(req) ? '✓' : '○'}
                      </span>
                      {req.text}
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <div className="input-group">
                    <span className="input-group-text">🔒</span>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <small className="text-danger">Passwords do not match</small>
                  )}
                </div>

                <div className="form-check mb-4">
                  <input type="checkbox" className="form-check-input" id="terms" required />
                  <label className="form-check-label" htmlFor="terms">
                    I agree to the <a href="#" className="auth-link">Terms of Service</a> and{' '}
                    <a href="#" className="auth-link">Privacy Policy</a>
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg w-100 btn-glow"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Creating Account...
                    </>
                  ) : (
                    <>Create Account</>
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>OR</span>
              </div>

              <button className="btn btn-outline-light w-100 btn-google">
                <img 
                  src="https://www.google.com/favicon.ico" 
                  alt="Google" 
                  width="20" 
                  className="me-2"
                />
                Sign up with Google
              </button>

              <p className="auth-footer">
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
