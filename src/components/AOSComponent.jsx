import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import data from '../data/data.js';
import '../styling/AosComponent.css'

const AOSComponent = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,    
    });
  }, []);

  return (
    <div className="aos-container">
      {data.map((item, index) => {
        const imageAnimation = index % 2 === 0 ? 'fade-right' : 'fade-left';
        const messageAnimation = index % 2 === 0 ? 'fade-left' : 'fade-right';

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
