import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      <style>
        {`
          .animated-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            background: linear-gradient(135deg, 
              var(--bg) 0%, 
              rgba(var(--surface-rgb, 20, 23, 32), 0.8) 25%,
              rgba(var(--accent-rgb, 197, 165, 114), 0.1) 50%,
              rgba(var(--surface-rgb, 20, 23, 32), 0.8) 75%,
              var(--bg) 100%
            );
          }

          .animated-background::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              radial-gradient(circle at 20% 80%, rgba(var(--accent-rgb, 197, 165, 114), 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(var(--accent-rgb, 197, 165, 114), 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(var(--accent-rgb, 197, 165, 114), 0.08) 0%, transparent 50%);
            animation: backgroundShift 20s ease-in-out infinite;
          }

          .animated-background::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              linear-gradient(45deg, transparent 30%, rgba(var(--accent-rgb, 197, 165, 114), 0.03) 50%, transparent 70%),
              linear-gradient(-45deg, transparent 30%, rgba(var(--accent-rgb, 197, 165, 114), 0.02) 50%, transparent 70%);
            animation: shimmer 15s linear infinite;
          }

          .floating-particles {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(var(--accent-rgb, 197, 165, 114), 0.6);
            border-radius: 50%;
            animation: float 25s linear infinite;
          }

          .particle:nth-child(1) { left: 10%; animation-delay: 0s; animation-duration: 20s; }
          .particle:nth-child(2) { left: 20%; animation-delay: 2s; animation-duration: 25s; }
          .particle:nth-child(3) { left: 30%; animation-delay: 4s; animation-duration: 22s; }
          .particle:nth-child(4) { left: 40%; animation-delay: 6s; animation-duration: 28s; }
          .particle:nth-child(5) { left: 50%; animation-delay: 8s; animation-duration: 24s; }
          .particle:nth-child(6) { left: 60%; animation-delay: 10s; animation-duration: 26s; }
          .particle:nth-child(7) { left: 70%; animation-delay: 12s; animation-duration: 23s; }
          .particle:nth-child(8) { left: 80%; animation-delay: 14s; animation-duration: 27s; }
          .particle:nth-child(9) { left: 90%; animation-delay: 16s; animation-duration: 21s; }

          .luxury-pattern {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(var(--accent-rgb, 197, 165, 114), 0.1) 0%, transparent 25%),
              radial-gradient(circle at 75% 75%, rgba(var(--accent-rgb, 197, 165, 114), 0.08) 0%, transparent 25%),
              radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb, 197, 165, 114), 0.05) 0%, transparent 50%);
            animation: patternRotate 30s linear infinite;
          }

          .diamond-sparkles {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .sparkle {
            position: absolute;
            width: 1px;
            height: 1px;
            background: rgba(var(--accent-rgb, 197, 165, 114), 0.8);
            border-radius: 50%;
            animation: sparkle 3s ease-in-out infinite;
          }

          .sparkle:nth-child(1) { top: 20%; left: 15%; animation-delay: 0s; }
          .sparkle:nth-child(2) { top: 30%; left: 85%; animation-delay: 0.5s; }
          .sparkle:nth-child(3) { top: 60%; left: 25%; animation-delay: 1s; }
          .sparkle:nth-child(4) { top: 80%; left: 75%; animation-delay: 1.5s; }
          .sparkle:nth-child(5) { top: 40%; left: 50%; animation-delay: 2s; }
          .sparkle:nth-child(6) { top: 70%; left: 10%; animation-delay: 2.5s; }

          @keyframes backgroundShift {
            0%, 100% { 
              transform: translateX(0) translateY(0) scale(1);
              opacity: 1;
            }
            25% { 
              transform: translateX(20px) translateY(-10px) scale(1.05);
              opacity: 0.8;
            }
            50% { 
              transform: translateX(-10px) translateY(20px) scale(0.95);
              opacity: 0.9;
            }
            75% { 
              transform: translateX(15px) translateY(5px) scale(1.02);
              opacity: 0.85;
            }
          }

          @keyframes shimmer {
            0% { 
              transform: translateX(-100%) translateY(-100%) rotate(45deg);
            }
            100% { 
              transform: translateX(100%) translateY(100%) rotate(45deg);
            }
          }

          @keyframes float {
            0% { 
              transform: translateY(100vh) translateX(0) rotate(0deg);
              opacity: 0;
            }
            10% { 
              opacity: 1;
            }
            90% { 
              opacity: 1;
            }
            100% { 
              transform: translateY(-100px) translateX(50px) rotate(360deg);
              opacity: 0;
            }
          }

          @keyframes patternRotate {
            0% { 
              transform: rotate(0deg) scale(1);
            }
            50% { 
              transform: rotate(180deg) scale(1.1);
            }
            100% { 
              transform: rotate(360deg) scale(1);
            }
          }

          @keyframes sparkle {
            0%, 100% { 
              opacity: 0;
              transform: scale(0);
            }
            50% { 
              opacity: 1;
              transform: scale(1);
            }
          }

          /* Light theme adjustments */
          [data-theme="light"] .animated-background {
            background: linear-gradient(135deg, 
              var(--bg) 0%, 
              rgba(var(--surface-rgb, 255, 255, 255), 0.9) 25%,
              rgba(var(--accent-rgb, 181, 139, 56), 0.05) 50%,
              rgba(var(--surface-rgb, 255, 255, 255), 0.9) 75%,
              var(--bg) 100%
            );
          }

          [data-theme="light"] .animated-background::before {
            background: 
              radial-gradient(circle at 20% 80%, rgba(var(--accent-rgb, 181, 139, 56), 0.08) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(var(--accent-rgb, 181, 139, 56), 0.05) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(var(--accent-rgb, 181, 139, 56), 0.03) 0%, transparent 50%);
          }

          [data-theme="light"] .luxury-pattern {
            background-image: 
              radial-gradient(circle at 25% 25%, rgba(var(--accent-rgb, 181, 139, 56), 0.05) 0%, transparent 25%),
              radial-gradient(circle at 75% 75%, rgba(var(--accent-rgb, 181, 139, 56), 0.03) 0%, transparent 25%),
              radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb, 181, 139, 56), 0.02) 0%, transparent 50%);
          }

          /* Performance optimizations */
          .animated-background,
          .animated-background::before,
          .animated-background::after,
          .luxury-pattern {
            will-change: transform, opacity;
          }

          .particle,
          .sparkle {
            will-change: transform, opacity;
          }

          /* Reduce motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            .animated-background::before,
            .animated-background::after,
            .luxury-pattern,
            .particle,
            .sparkle {
              animation: none;
            }
          }
        `}
      </style>

      <div className="luxury-pattern"></div>
      
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="diamond-sparkles">
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground;

