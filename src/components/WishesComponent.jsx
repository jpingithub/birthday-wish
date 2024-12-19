import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const WishesComponent = () => {
  const [showModal, setShowModal] = useState(false);  // Controls wishes modal
  const [currentPage, setCurrentPage] = useState(1);
  const [wishes, setWishes] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false); // To handle invalid password
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); // Flag for password validation

  const itemsPerPage = 10;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const correctPassword = 'Nag1n@'; // Define the correct password here or fetch from a secure source

  const fetchWishes = useCallback(async () => {
    try {
      const response = await axios.get(BASE_URL);
      setWishes(response.data);
    } catch (error) {
      console.error('Error fetching wishes:', error);
    }
  }, [BASE_URL]);

  useEffect(() => {
    fetchWishes();

    const interval = setInterval(fetchWishes, 5000);
    return () => clearInterval(interval);
  }, [fetchWishes]);

  const toggleModal = () => setShowModal(!showModal);

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsPasswordCorrect(true);
      setPasswordError(false);
      setShowModal(true); // Open the wishes modal after password is correct
    } else {
      setPasswordError(true); // Show error if password is incorrect
    }
  };

  const handleCancelPassword = () => {
    setPassword(''); // Clear the password input
    setPasswordError(false); // Clear any error
    setShowModal(false); // Close the password modal
  };

  const indexOfLastWish = currentPage * itemsPerPage;
  const indexOfFirstWish = indexOfLastWish - itemsPerPage;
  const currentWishes = wishes.slice(indexOfFirstWish, indexOfLastWish);

  const totalPages = Math.ceil(wishes.length / itemsPerPage);

  const handlePagination = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <button className="wishes-component" onClick={toggleModal}>
        <span role="img" aria-label="wishes">🎉</span>
      </button>

      {/* Password Modal */}
      {!isPasswordCorrect && showModal && (
        <div className="password-modal">
          <div className="password-modal-content">
            <h2>Only druva knows this password !!!</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
            {passwordError && <p style={{ color: 'red' }}>Incorrect password. Please try again.</p>}
            <button onClick={handlePasswordSubmit}>Submit</button>
            <button style={{backgroundColor:'red'}} onClick={handleCancelPassword}>Cancel</button> 
          </div>
        </div>
      )}

      {/* Wishes Modal */}
      {isPasswordCorrect && showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>All Wishes</h2>
            <ul className="wishes-list">
              {currentWishes.map((wish) => (
                <li key={wish.id}>
                  <strong>🎉 {wish.name} : </strong>{wish.wish}
                </li>
              ))}
            </ul>

            <div className="pagination">
              <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              <span>{currentPage} / {totalPages}</span>
              <button onClick={() => handlePagination(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>

            <button className="close-modal" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishesComponent;
