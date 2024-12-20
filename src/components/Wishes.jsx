import React, { useState } from 'react';
import '../styling/WishingForm.css';
import axios from 'axios';

const Wishes = () => {
  const [name, setName] = useState('');
  const [wishText, setWishText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = process.env.BACKEND_URL;

  const handleAddWish = async () => {
    const newWish = {
      name: name,
      wish: wishText,
    };

    if (!name.trim() || !wishText.trim()) {
      alert('Please fill in both fields!');
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(BASE_URL, newWish);
      alert('Thank you so much for your wish/blessing..!!');
      setName('');
      setWishText('');
    } catch (error) {
      console.error('Error adding wish:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
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
        <button onClick={handleAddWish} disabled={isLoading}>
          {isLoading ? (
            <div className="loading-spinner">LOADING...</div>
          ) : (
            <p>SUBMIT</p>
          )}
        </button>
      </div> 
    </div>
  );
};

export default Wishes;
