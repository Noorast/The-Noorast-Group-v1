import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { SEO } from '../components/SEO';

const C = {
  bg: "#FFFFFF",
  text: "#333333",
  muted: "#888888",
  light: "#BBBBBB",
  border: "#E5E5E5",
  dark: "#222222",
  label: "#555555",
};

interface User {
  username: string;
  password: string;
  createdAt: string;
}

export function PropertyPassportLogin() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate inputs
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      setLoading(false);
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Get existing users from localStorage
      const usersData = localStorage.getItem('noorast-users');
      const users: Record<string, User> = usersData ? JSON.parse(usersData) : {};

      if (mode === 'signup') {
        // Check if user already exists
        if (users[username.toLowerCase()]) {
          setError('Username already exists');
          setLoading(false);
          return;
        }

        // Create new user
        users[username.toLowerCase()] = {
          username: username.toLowerCase(),
          password: password, // In production, this should be hashed
          createdAt: new Date().toISOString(),
        };

        // Save users
        localStorage.setItem('noorast-users', JSON.stringify(users));

        // Log in the new user
        localStorage.setItem('noorast-current-user', username.toLowerCase());

        // Redirect to passport
        setTimeout(() => {
          navigate('/toolkit/property-passport');
        }, 500);
      } else {
        // Login mode
        const user = users[username.toLowerCase()];

        if (!user) {
          setError('Invalid username or password');
          setLoading(false);
          return;
        }

        if (user.password !== password) {
          setError('Invalid username or password');
          setLoading(false);
          return;
        }

        // Log in the user
        localStorage.setItem('noorast-current-user', username.toLowerCase());

        // Redirect to passport
        setTimeout(() => {
          navigate('/toolkit/property-passport');
        }, 500);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    fontSize: 13,
    lineHeight: 1.7,
    fontWeight: 300,
    border: `1px solid ${C.border}`,
    borderRadius: 0,
    background: C.bg,
    color: C.text,
    fontFamily: "Inter, sans-serif",
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  };

  return (
    <>
      <SEO
        title="Property Passport Login — Noorast"
        description="Access your Property Passport account"
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: C.bg,
          fontFamily: "Inter, sans-serif",
          padding: "24px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 18, letterSpacing: 6, color: C.dark, fontWeight: 300, marginBottom: 8 }}>
              NOORAST
            </div>
            <div
              style={{
                fontSize: 10,
                color: C.light,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 400,
              }}
            >
              Property Passport
            </div>
            <div style={{ width: 40, height: 1, background: C.border, margin: "16px auto" }} />
          </div>

          {/* Form Container */}
          <div style={{ border: `1px solid ${C.border}`, padding: 40, background: C.bg }}>
            <div style={{ marginBottom: 32 }}>
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  color: C.dark,
                  margin: "0 0 8px 0",
                  letterSpacing: 0.5,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {mode === 'login' ? 'Log In' : 'Create Account'}
              </h2>
              <p style={{ fontSize: 12, color: C.muted, margin: 0, fontWeight: 300 }}>
                {mode === 'login'
                  ? 'Enter your credentials to access your property passport'
                  : 'Create a new account to start your property analysis'}
              </p>
            </div>

            {error && (
              <div
                style={{
                  padding: "12px 14px",
                  marginBottom: 24,
                  background: "#FEE",
                  border: "1px solid #FCC",
                  fontSize: 12,
                  color: "#C33",
                  fontWeight: 300,
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: C.label,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = C.dark)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: 28 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: 10,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: C.label,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = C.dark)}
                  onBlur={(e) => (e.target.style.borderColor = C.border)}
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 400,
                  border: "none",
                  background: loading ? C.light : C.dark,
                  color: C.bg,
                  cursor: loading ? "default" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {loading ? 'Processing...' : mode === 'login' ? 'Log In' : 'Create Account'}
              </button>
            </form>

            <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${C.border}` }}>
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'signup' : 'login');
                  setError('');
                  setUsername('');
                  setPassword('');
                }}
                style={{
                  width: "100%",
                  padding: "8px 20px",
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 300,
                  border: `1px solid ${C.border}`,
                  background: "transparent",
                  color: C.text,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {mode === 'login' ? 'Create New Account' : 'Already Have Account? Log In'}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button
              onClick={() => navigate('/toolkit')}
              style={{
                fontSize: 10,
                color: C.light,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                letterSpacing: 1,
                textTransform: "uppercase",
                fontWeight: 300,
              }}
            >
              ← Back to Toolkit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
