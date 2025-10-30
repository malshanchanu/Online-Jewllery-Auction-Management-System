import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      console.log("Attempting registration with:", { fullName, email, password, phoneNumber, dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null, gender, addressLine1, addressLine2, city, state, postalCode, country, avatarUrl });
      const result = await registerUser({ fullName, email, password, phoneNumber, dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : null, gender, addressLine1, addressLine2, city, state, postalCode, country, avatarUrl });
      console.log("Registration successful:", result);
      navigate(from, { replace: true });
    } catch (e) {
      console.error("Registration error:", e);
      setError(e.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-page">
      <style>{`
        .register-page { 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          background: var(--gradient-dark);
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }
        
        .register-page::before {
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
        
        .register-card { 
          max-width: 600px; 
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
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .register-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--gradient-gold);
          border-radius: 24px 24px 0 0;
        }
        
        .register-title { 
          text-align: center; 
          margin-bottom: 0.5rem;
          font-size: 2.5rem;
          background: var(--gradient-gold);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: fadeIn 1s ease 0.2s both;
        }
        
        .register-sub { 
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
        
        .field:nth-child(odd) { animation-delay: 0.1s; }
        .field:nth-child(even) { animation-delay: 0.2s; }
        
        .field label {
          font-weight: 600;
          color: var(--text);
          font-size: 0.95rem;
        }
        
        .input, .select { 
          padding: 1rem 1.25rem; 
          border-radius: 12px; 
          background: var(--surface); 
          color: var(--text); 
          border: 2px solid rgba(255,255,255,0.1);
          font-size: 1rem;
          transition: all 0.3s ease;
          outline: none;
        }
        
        .input:focus, .select:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-glow);
          transform: translateY(-2px);
        }
        
        .input:hover, .select:hover {
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
        
        .grid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 1rem; 
        }
        
        .grid-1 { 
          display: grid; 
          grid-template-columns: 1fr; 
          gap: 1rem; 
        }
        
        @media (max-width: 768px) {
          .register-page { padding: 1rem; }
          .register-card { padding: 2rem; max-height: 95vh; }
          .register-title { font-size: 2rem; }
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="register-card">
        <h1 className="register-title">Create Account</h1>
        <p className="register-sub">Register to begin your luxury journey</p>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" type="text" className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>
          <div className="grid">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <div className="grid">
            <div className="field">
              <label htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" className="input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="dob">Date of Birth</label>
              <input id="dob" type="date" className="input" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="gender">Gender</label>
            <select id="gender" className="select" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Prefer not to say</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="grid-1">
            <div className="field">
              <label htmlFor="address1">Address Line 1</label>
              <input id="address1" type="text" className="input" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="address2">Address Line 2</label>
              <input id="address2" type="text" className="input" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
            </div>
          </div>
          <div className="grid">
            <div className="field">
              <label htmlFor="city">City</label>
              <input id="city" type="text" className="input" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="state">State/Province</label>
              <input id="state" type="text" className="input" value={state} onChange={(e) => setState(e.target.value)} />
            </div>
          </div>
          <div className="grid">
            <div className="field">
              <label htmlFor="postal">Postal Code</label>
              <input id="postal" type="text" className="input" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="country">Country</label>
              <input id="country" type="text" className="input" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="avatar">Profile Picture URL</label>
            <input id="avatar" type="url" className="input" placeholder="https://..." value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
          </div>
          <button className="button-primary submit" disabled={submitting}>{submitting ? "Creating..." : "Create Account"}</button>
        </form>
        <Link to="/login" className="small-link">Already have an account? Sign in</Link>
      </div>
    </div>
  );
};

export default Register;


