import React, { useState, useEffect } from 'react';
import '../styling/Carousal.css';
import data from '../data/carousalImages.js';

const Carousal = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousal-container">
      <div className="carousal">
        <div className="carousal-item">
          <img id={currentIndex} src={data[currentIndex].image} alt={`Slide ${data[currentIndex].id}`} className="carousal-image" />
        </div>
      </div>

      <button className="carousal-button prev" onClick={prevSlide}>❮</button>
      <button className="carousal-button next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Carousal;
