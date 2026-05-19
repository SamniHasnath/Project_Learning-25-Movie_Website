import { useState, useEffect } from 'react';
import { FiX, FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// Renders as a fullscreen overlay. Controlled entirely by AuthContext.
const AuthModal = () => {
  const { authModalOpen, authModalMode, setAuthModalMode, closeAuthModal, login } = useAuth();

  const [form,     setForm]     = useState({ username: '', email: '', password: '' });
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const isLogin = authModalMode === 'login';

  // Reset form whenever the modal opens or mode switches
  useEffect(() => {
    setForm({ username: '', email: '', password: '' });
    setError('');
    setShowPwd(false);
  }, [authModalOpen, authModalMode]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeAuthModal(); };
    if (authModalOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [authModalOpen, closeAuthModal]);

  if (!authModalOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const payload  = isLogin
        ? { email: form.email, password: form.password }
        : { username: form.username, email: form.email, password: form.password };

      const res = await api.post(endpoint, payload);
      login(res.data.token);
      toast.success(isLogin ? 'Welcome back!' : 'Account created!');
    } catch (err) {
      setError(err.response?.data?.message || (isLogin ? 'Login failed.' : 'Signup failed.'));
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => setAuthModalMode(isLogin ? 'signup' : 'login');

  return (
    /* Clicking the dark backdrop closes the modal */
    <div className="modal-overlay" onClick={closeAuthModal}>

      {/* stopPropagation prevents clicks inside the card from closing it */}
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        {/* Close button */}
        <button className="modal-close" onClick={closeAuthModal} aria-label="Close">
          <FiX />
        </button>

        {/* Title */}
        <h2 className="modal-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="modal-subtitle">
          {isLogin ? 'Sign in to access your watchlist' : 'Sign up to start saving movies'}
        </p>

        {/* Error */}
        {error && <div className="modal-error">{error}</div>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">

          {/* Name — signup only */}
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <div className="input-wrapper">
                <FiUser className="input-icon" />
                <input
                  name="username"
                  placeholder="John Doe"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <FiMail className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showPwd ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="input-eye"
                onClick={() => setShowPwd(!showPwd)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                {showPwd ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button type="submit" className="modal-submit" disabled={loading}>
            {loading ? (isLogin ? 'Signing in…' : 'Creating account…') : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {/* Switch mode */}
        <p className="modal-switch">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={switchMode}>{isLogin ? 'Sign Up' : 'Sign In'}</button>
        </p>

        {/* Demo credentials hint */}
        <div className="demo-credentials">
          <strong>Demo Credentials:</strong>
          Email: demo@cinevault.com &nbsp; Password: demo123
          <br />
          Admin: admin@cinevault.com / admin123
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
