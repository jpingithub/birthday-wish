import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Confetti from 'react-confetti';
import '../styling/WelcomeBlast.css';

const WelcomeBlast = () => {
  const [showComponent, setShowComponent] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const fadeTimer = setTimeout(() => setFadeOut(true), 4500);
    const timer = setTimeout(() => setShowComponent(false), 5000);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(confettiTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  if (!showComponent) return null;

  return (
    <div className={`welcome-container ${fadeOut ? 'fade-out' : ''}`}>
      {showConfetti && <Confetti />}
      <div className="welcome-message" data-aos="zoom-in">
        <h1>🎉 Happy Birthday, Druva! 🎉</h1>
      </div>
      <div className="welcome-subtext" data-aos="fade-up" data-aos-delay="500">
        <p>
          Wishing you a day filled with love, joy, and laughter! May this special day bring new beginnings, cherished memories,
          and a year full of success and happiness. Here's to celebrating YOU today! 🎂✨
        </p>
      </div>
    </div>
  );
};

export default WelcomeBlast;
