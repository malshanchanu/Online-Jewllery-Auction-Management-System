import React from "react";
import Hero from "../components/Hero";

const HomePage = () => {
  return (
    <div className="homepage">
      <style>
        {`
          .homepage {
            min-height: 100vh;
            background: var(--bg);
            position: relative;
            overflow: hidden;
          }
          
          .homepage::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: 
              radial-gradient(circle at 20% 20%, var(--accent-glow) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, var(--rose-gold) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, var(--silver) 0%, transparent 50%);
            opacity: 0.05;
            animation: float 8s ease-in-out infinite;
            z-index: 0;
          }
          
          .features {
            padding: 6rem 0;
            background: var(--surface);
            position: relative;
            z-index: 1;
          }
          
          .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 2rem;
          }
          
          .features h2 {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 4rem;
            background: var(--gradient-gold);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeIn 1s ease;
          }
          
          .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
            margin-top: 3rem;
          }
          
          .feature-card {
            background: var(--card);
            padding: 3rem 2rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: var(--shadow-lg);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255,255,255,0.1);
            position: relative;
            overflow: hidden;
            animation: riseIn 0.8s ease both;
          }
          
          .feature-card:nth-child(1) { animation-delay: 0.1s; }
          .feature-card:nth-child(2) { animation-delay: 0.2s; }
          .feature-card:nth-child(3) { animation-delay: 0.3s; }
          .feature-card:nth-child(4) { animation-delay: 0.4s; }
          
          .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--gradient-gold);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .feature-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: var(--shadow-xl), var(--shadow-glow);
            border-color: var(--accent);
          }
          
          .feature-card:hover::before {
            opacity: 1;
          }
          
          .feature-icon {
            font-size: 4rem;
            margin-bottom: 1.5rem;
            background: var(--gradient-gold);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: float 3s ease-in-out infinite;
          }
          
          .feature-card h3 {
            margin-bottom: 1rem;
            color: var(--text);
            font-size: 1.5rem;
            font-weight: 600;
          }
          
          .feature-card p {
            color: var(--muted);
            line-height: 1.6;
            font-size: 1rem;
          }
          
          .featured-items {
            padding: 6rem 0;
            background: var(--bg);
            position: relative;
            z-index: 1;
          }
          
          .featured-items h2 {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 4rem;
            background: var(--gradient-gold);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: fadeIn 1s ease;
          }
          
          .items-preview {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2.5rem;
            margin-bottom: 4rem;
          }
          
          .preview-item {
            background: var(--card);
            padding: 2.5rem 2rem;
            border-radius: 20px;
            text-align: center;
            box-shadow: var(--shadow-lg);
            border: 1px solid rgba(255,255,255,0.1);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            overflow: hidden;
            animation: riseIn 0.8s ease both;
          }
          
          .preview-item:nth-child(1) { animation-delay: 0.1s; }
          .preview-item:nth-child(2) { animation-delay: 0.2s; }
          .preview-item:nth-child(3) { animation-delay: 0.3s; }
          
          .preview-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--gradient-gold);
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          .preview-item:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: var(--shadow-xl), var(--shadow-glow);
            border-color: var(--accent);
          }
          
          .preview-item:hover::before {
            opacity: 1;
            box-shadow: 0 15px 45px rgba(0,0,0,0.15);
          }
          
          .preview-image {
            width: 100%;
            height: 250px;
            background: var(--gradient-gold);
            border-radius: 16px;
            margin-bottom: 1.5rem;
            position: relative;
            overflow: hidden;
            box-shadow: var(--shadow-md);
          }
          
          .preview-image::before {
            content: '💎';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            opacity: 0.4;
            animation: float 3s ease-in-out infinite;
          }
          
          .preview-item h4 {
            margin-bottom: 0.75rem;
            color: var(--text);
            font-weight: 600;
            font-size: 1.25rem;
          }
          
          .preview-item p {
            color: var(--muted);
            font-size: 1rem;
            line-height: 1.6;
          }
          
          .view-all-container {
            text-align: center;
            animation: fadeIn 1s ease 0.8s both;
          }
          
          .view-all-button {
            display: inline-block;
            padding: 1.25rem 2.5rem;
            background: var(--gradient-gold);
            color: #000;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: var(--shadow-lg);
            border: none;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          
          .view-all-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.6s ease;
          }
          
          .view-all-button:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow-xl), var(--shadow-glow);
          }
          
          .view-all-button:hover::before {
            left: 100%;
          }
          
          @media (max-width: 768px) {
            .features h2,
            .featured-items h2 {
              font-size: 2rem;
            }
            
            .features-grid,
            .items-preview {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <Hero />

      <section className="features">
        <div className="container">
          <h2>Why Choose Our Jewelry Auctions?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Expert Authentication</h3>
              <p>
                Every piece is verified by our team of gemologists and jewelry
                experts.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Premium Quality</h3>
              <p>
                Only the finest jewelry pieces from renowned makers and
                designers.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure Transactions</h3>
              <p>
                Encrypted payments and insured shipping for complete peace of
                mind.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Global Delivery</h3>
              <p>We ship worldwide with careful packaging and tracking.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-items">
        <div className="container">
          <h2>Featured Pieces</h2>
          <div className="items-preview">
            <div className="preview-item">
              <div className="preview-image"></div>
              <h4>Platinum Diamond Ring</h4>
              <p>Starting bid: $2,500</p>
            </div>
            <div className="preview-item">
              <div className="preview-image"></div>
              <h4>Sapphire Gold Bracelet</h4>
              <p>Starting bid: $1,800</p>
            </div>
            <div className="preview-item">
              <div className="preview-image"></div>
              <h4>Pearl Silver Necklace</h4>
              <p>Starting bid: $950</p>
            </div>
          </div>
          <div className="view-all-container">
            <a href="/jewelry" className="view-all-button">
              View All Items
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
