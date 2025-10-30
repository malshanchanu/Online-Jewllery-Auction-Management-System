import React from "react";

const Contact = () => {
  return (
    <div className="contact-page">
      <style>{`
        .contact-page { padding: 120px 0 60px; min-height: 100vh; }
        .contact-card { max-width: 720px; margin: 0 auto; padding: 2rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        .field { display: flex; flex-direction: column; gap: 0.5rem; }
        .input, .textarea { padding: 0.9rem 1rem; border-radius: 10px; background: #0f1218; color: var(--text); border: 1px solid rgba(255,255,255,0.08); }
        .textarea { min-height: 140px; resize: vertical; }
        .contact-details { margin-top: 1.5rem; color: var(--muted); font-size: 0.95rem; }
      `}</style>
      <div className="contact-card">
        <h1>Contact Us</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" className="input" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" className="input" required />
            </div>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" className="textarea" required />
          </div>
          <button className="button-primary">Send Message</button>
        </form>
        <div className="contact-details">
          <div>📍 123 Luxury Avenue , Colombo 2</div>
          <div>📞 +94 712 345 678</div>
        </div>
      </div>
    </div>
  );
};

export default Contact;


