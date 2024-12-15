import React, { useState } from 'react';
import { addWish } from '../data/DB.js';
import '../styling/WishingForm.css'

const Wishes = () => {
  const [name, setName] = useState('');
  const [wishText, setWishText] = useState('');

  const handleAddWish = async () => {
    if (!name.trim() || !wishText.trim()) {
      alert('Please fill in both fields!');
      return;
    }
    
    try {
      await addWish({ name, wish: wishText });
      alert('Thank you for your wish/blessing!');
      setName(''); 
      setWishText('');
    } catch (error) {
      alert('There was an error adding your wish. Please try again.');
    }
  };
  

  return (
    <div className='wish-full-component'>
      <h2>Provide your valuable wishes / blessings</h2>
      <div className='wish-inputs-button'>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your wish / blessing"
          value={wishText}
          onChange={(e) => setWishText(e.target.value)}
        />
        <button onClick={handleAddWish}>SUBMIT</button>
      </div>
    </div>
  );
};

export default Wishes;
