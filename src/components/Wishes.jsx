import React, { useState } from 'react';
import '../styling/WishingForm.css';
import axios from 'axios';

const Wishes = () => {
  const [name, setName] = useState('');
  const [wishText, setWishText] = useState('');
  const [nameError, setNameError] = useState('');
  const [wishTextError, setWishTextError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const BASE_URL = 'https://birthday-wishes-u5b6.onrender.com/v1/birthday/wishes';

  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      setNameError('Name is required.');
      isValid = false;
    } else if (name.length < 2) {
      setNameError('Name must be at least 2 characters long.');
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
      setNameError('Name should only contain alphabets and spaces.');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate wish text
    if (!wishText.trim()) {
      setWishTextError('Wish text is required.');
      isValid = false;
    } else if (wishText.length < 10) {
      setWishTextError('Wish text must be at least 10 characters long.');
      isValid = false;
    } else if (wishText.length > 200) {
      setWishTextError('Wish text must not exceed 200 characters.');
      isValid = false;
    } else {
      setWishTextError('');
    }

    return isValid;
  };

  const handleAddWish = async () => {
    if (!validateForm()) return;

    const newWish = {
      name: name.trim(),
      wish: wishText.trim(),
    };

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
          {nameError && <p className="error-message">{nameError}</p>}
          <input
            type="text"
            placeholder="Enter your wish / blessing"
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
          />
          {wishTextError && <p className="error-message">{wishTextError}</p>}
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
