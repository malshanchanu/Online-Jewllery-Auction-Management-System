import React from "react";

const About = () => {
  return (
    <div className="page-shell">
      <div className="page-container">
        <div className="about-content">
          <style>{`
            .about-content {
              max-width: 1000px;
              margin: 0 auto;
              padding: 2rem;
            }
            
            .about-header {
              text-align: center;
              margin-bottom: 3rem;
              animation: fadeIn 0.8s ease-out;
            }
            
            .about-title {
              font-size: 3rem;
              background: var(--gradient-gold);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin-bottom: 1rem;
              font-weight: 700;
            }
            
            .about-subtitle {
              font-size: 1.3rem;
              color: var(--muted);
              margin-bottom: 2rem;
            }
            
            .about-section {
              margin-bottom: 3rem;
              padding: 2rem;
              background: var(--card);
              border: 1px solid rgba(var(--accent-rgb), 0.15);
              border-radius: 16px;
              box-shadow: var(--shadow-lg);
              backdrop-filter: blur(15px);
              animation: riseIn 0.8s ease-out;
            }
            
            .about-section h2 {
              color: var(--accent);
              font-size: 1.8rem;
              margin-bottom: 1.5rem;
              font-weight: 600;
            }
            
            .about-section h3 {
              color: var(--text);
              font-size: 1.4rem;
              margin-bottom: 1rem;
              font-weight: 500;
            }
            
            .about-section p {
              color: var(--text);
              line-height: 1.7;
              margin-bottom: 1.5rem;
              font-size: 1.1rem;
            }
            
            .about-section ul {
              color: var(--text);
              line-height: 1.7;
              margin-bottom: 1.5rem;
              padding-left: 2rem;
            }
            
            .about-section li {
              margin-bottom: 0.5rem;
              font-size: 1.1rem;
            }
            
            .highlight-box {
              background: linear-gradient(135deg, var(--accent-glow), rgba(var(--accent-rgb), 0.1));
              border: 1px solid var(--accent);
              border-radius: 12px;
              padding: 2rem;
              margin: 2rem 0;
              text-align: center;
            }
            
            .highlight-box h3 {
              color: var(--accent);
              font-size: 1.5rem;
              margin-bottom: 1rem;
            }
            
            .highlight-box p {
              color: var(--text);
              font-size: 1.1rem;
              margin: 0;
            }
            
            .stats-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
              gap: 2rem;
              margin: 2rem 0;
            }
            
            .stat-item {
              text-align: center;
              padding: 1.5rem;
              background: var(--surface);
              border-radius: 12px;
              border: 1px solid rgba(var(--accent-rgb), 0.1);
            }
            
            .stat-number {
              font-size: 2.5rem;
              font-weight: 700;
              color: var(--accent);
              margin-bottom: 0.5rem;
            }
            
            .stat-label {
              color: var(--muted);
              font-size: 1rem;
              font-weight: 500;
            }
            
            .contact-info {
              background: var(--surface);
              border-radius: 12px;
              padding: 2rem;
              margin-top: 2rem;
              border: 1px solid rgba(var(--accent-rgb), 0.1);
            }
            
            .contact-info h3 {
              color: var(--accent);
              margin-bottom: 1rem;
            }
            
            .contact-item {
              display: flex;
              align-items: center;
              margin-bottom: 1rem;
              color: var(--text);
            }
            
            .contact-item span {
              margin-left: 1rem;
              font-size: 1.1rem;
            }
            
            @media (max-width: 768px) {
              .about-title { font-size: 2.5rem; }
              .about-content { padding: 1rem; }
              .about-section { padding: 1.5rem; }
              .stats-grid { grid-template-columns: 1fr; }
            }
          `}</style>
          
          <div className="about-header">
            <h1 className="about-title">About Luxury Jewelry</h1>
            <p className="about-subtitle">Crafting Timeless Elegance in the Heart of Sri Lanka</p>
          </div>
          
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2015 in the vibrant city of Colombo, Luxury Jewelry has been at the forefront of Sri Lanka's 
              luxury jewelry market, combining traditional craftsmanship with contemporary design. Our journey began 
              with a simple vision: to bring world-class jewelry to the discerning customers of Sri Lanka while 
              celebrating the island's rich heritage and cultural diversity.
            </p>
            <p>
              Over the years, we have established ourselves as the premier destination for luxury jewelry in Sri Lanka, 
              serving customers from Colombo to Kandy, from Galle to Jaffna. Our commitment to excellence and 
              authenticity has made us the trusted choice for special occasions, from traditional Sri Lankan weddings 
              to modern celebrations.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Heritage & Values</h2>
            <h3>Traditional Craftsmanship</h3>
            <p>
              We honor Sri Lanka's centuries-old jewelry traditions while embracing modern techniques. Our pieces 
              reflect the island's cultural richness, from intricate Kandyan designs to contemporary interpretations 
              of traditional motifs.
            </p>
            
            <h3>Authenticity Guarantee</h3>
            <p>
              Every piece in our collection comes with a certificate of authenticity and detailed documentation. 
              We work directly with certified gemologists and international jewelry houses to ensure the highest 
              standards of quality and authenticity.
            </p>
            
            <h3>Cultural Sensitivity</h3>
            <p>
              Understanding the diverse cultural landscape of Sri Lanka, we offer jewelry suitable for all 
              communities and occasions, from Buddhist ceremonies to Hindu festivals, Christian celebrations 
              to Muslim traditions.
            </p>
          </div>
          
          <div className="highlight-box">
            <h3>Why Choose Luxury Jewelry?</h3>
            <p>
              We are Sri Lanka's only luxury jewelry platform that combines international standards with 
              local expertise, offering secure transactions, comprehensive insurance, and personalized service 
              in Sinhala, Tamil, and English.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Services</h2>
            <ul>
              <li><strong>Certified Authentication:</strong> Every piece verified by international gemological laboratories</li>
              <li><strong>Secure Transactions:</strong> Bank-grade encryption and insured shipping across Sri Lanka</li>
              <li><strong>Local Expertise:</strong> Our team understands Sri Lankan preferences and cultural requirements</li>
              <li><strong>Flexible Payment:</strong> Accept LKR payments, international cards, and installment plans</li>
              <li><strong>Custom Design:</strong> Bespoke jewelry creation for special occasions</li>
              <li><strong>Insurance Coverage:</strong> Comprehensive protection for your investment</li>
              <li><strong>After-Sales Service:</strong> Maintenance, cleaning, and repair services</li>
              <li><strong>Cultural Consultation:</strong> Guidance on appropriate jewelry for different occasions</li>
            </ul>
          </div>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Pieces Sold</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">8</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25</div>
              <div className="stat-label">Cities Served</div>
            </div>
          </div>
          
          <div className="about-section">
            <h2>Our Commitment to Sri Lanka</h2>
            <p>
              As a Sri Lankan company, we are committed to supporting local communities and contributing to 
              the country's economy. We source materials from local suppliers when possible and employ 
              skilled Sri Lankan craftspeople for our custom pieces.
            </p>
            <p>
              We understand the importance of family and tradition in Sri Lankan culture, which is why we 
              offer special services for family heirlooms, wedding jewelry, and ceremonial pieces that 
              honor your heritage while meeting modern standards of quality and security.
            </p>
          </div>
          
          <div className="contact-info">
            <h3>Visit Our Showroom</h3>
            <div className="contact-item">
              <span>📍</span>
              <span>123 Luxury Avenue, Colombo 2, Sri Lanka</span>
            </div>
            <div className="contact-item">
              <span>📞</span>
              <span>+94 712 345 678</span>
            </div>
            <div className="contact-item">
              <span>📧</span>
              <span>info@luxuryjewelry.com</span>
            </div>
            <div className="contact-item">
              <span>🕒</span>
              <span>Monday - Saturday: 9:00 AM - 7:00 PM<br/>Sunday: 10:00 AM - 5:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


