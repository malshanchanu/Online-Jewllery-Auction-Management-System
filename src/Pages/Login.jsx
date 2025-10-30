import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (e) {
      setError(e.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <style>{`
        .login-page { 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          background: var(--gradient-dark);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .login-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, var(--accent-glow) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, var(--rose-gold) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, var(--silver) 0%, transparent 50%);
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }
        
        .login-card { 
          max-width: 500px; 
          width: 100%;
          padding: 3rem; 
          background: var(--card);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; 
          box-shadow: var(--shadow-xl);
          backdrop-filter: blur(20px);
          position: relative;
          z-index: 1;
          animation: riseIn 0.8s ease;
        }
        
        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--gradient-gold);
          border-radius: 24px 24px 0 0;
        }
        
        .login-title { 
          text-align: center; 
          margin-bottom: 0.5rem;
          font-size: 2.5rem;
          background: var(--gradient-gold);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeIn 1s ease 0.2s both;
        }
        
        .login-sub { 
          text-align: center; 
          color: var(--muted); 
          margin-bottom: 2.5rem;
          font-size: 1.1rem;
          animation: fadeIn 1s ease 0.4s both;
        }
        
        .field { 
          display: flex; 
          flex-direction: column; 
          gap: 0.75rem; 
          margin-bottom: 1.5rem;
          animation: slideInLeft 0.8s ease both;
        }
        
        .field:nth-child(2) { animation-delay: 0.1s; }
        .field:nth-child(3) { animation-delay: 0.2s; }
        
        .field label {
          font-weight: 600;
          color: var(--text);
          font-size: 0.95rem;
        }
        
        .input { 
          padding: 1rem 1.25rem; 
          border-radius: 12px; 
          background: var(--surface); 
          color: var(--text); 
          border: 2px solid rgba(255,255,255,0.1);
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }
        
        .input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
          transform: translateY(-2px);
        }
        
        .input:hover {
          border-color: rgba(255,255,255,0.2);
        }
        
        .error { 
          color: var(--error); 
          margin-bottom: 1rem;
          padding: 0.75rem 1rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid var(--error);
          border-radius: 8px;
          animation: slideInLeft 0.5s ease;
        }
        
        .submit { 
          width: 100%; 
          margin-top: 1rem;
          animation: scaleIn 0.8s ease 0.6s both;
        }
        
        .small-link {
          display: block;
          text-align: center;
          margin-top: 1.5rem;
          color: var(--accent);
          text-decoration: none;
          transition: all 0.3s ease;
          animation: fadeIn 1s ease 0.8s both;
        }
        
        .small-link:hover {
          color: var(--accent-light);
          text-shadow: 0 0 8px var(--accent-glow);
        }
        
        .admin-setup-link {
          display: block;
          text-align: center;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--accent);
          border-radius: 12px;
          color: var(--accent);
          text-decoration: none;
          transition: all 0.3s ease;
          animation: fadeIn 1s ease 1s both;
        }
        
        .admin-setup-link:hover {
          background: var(--accent);
          color: #000;
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow);
        }
        
        @media (max-width: 768px) {
          .login-page { padding: 1rem; }
          .login-card { padding: 2rem; }
          .login-title { font-size: 2rem; }
        }
      `}</style>

      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-sub">Sign in to continue your luxury journey</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="button-primary submit" disabled={submitting}>{submitting ? "Signing in..." : "Sign In"}</button>
        </form>
        <Link to="/register" className="small-link">Don't have an account? Create one</Link>
        
      </div>
    </div>
  );
};

export default Login;


