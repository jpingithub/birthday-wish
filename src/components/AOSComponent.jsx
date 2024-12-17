import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import data from '../data/data.js';
import '../styling/AosComponent.css';

const AOSComponent = () => {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.matchMedia('(max-width: 768px)').matches) {
        setScreenSize('mobile');
      } else {
        setScreenSize('desktop');
      }
    };

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, [screenSize]);

  return (
    <div className="aos-container">
      {data.map((item, index) => {
        const imageAnimation =
          screenSize === 'mobile'
            ? 'fade-up'
            : index % 2 === 0
            ? 'fade-right'
            : 'fade-left';

        const messageAnimation =
          screenSize === 'mobile'
            ? 'fade-up'
            : index % 2 === 0
            ? 'fade-left'
            : 'fade-right';

        return (
          <div key={item.id} className="aos-item">
            <div
              className="aos-background"
              style={{
                backgroundImage: `url(${item.image})`,
              }}
              data-aos={imageAnimation}
            />
            <div
              className={`aos-message ${index % 2 === 0 ? 'left' : 'right'}`}
              data-aos={messageAnimation}
            >
              <p>{item.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AOSComponent;
