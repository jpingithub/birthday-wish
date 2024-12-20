import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const WishesComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishes, setWishes] = useState([]);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 10;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const correctPassword = 'Nag1n@';

  const fetchWishes = useCallback(async () => {
  setIsLoading(true);
  try {
    const response = await axios.get(BASE_URL, {
      headers: { 'Content-Type': 'application/json' },
    });
    setWishes(response.data);
  } catch (error) {
    console.error('Error fetching wishes:', error.message);
  } finally {
    setIsLoading(false);
  }
}, [BASE_URL]);

  useEffect(() => {
    if (isPasswordCorrect) {
      fetchWishes();
    }
  }, [isPasswordCorrect, fetchWishes]);

  const toggleModal = () => setShowModal(!showModal);

  const handlePasswordSubmit = () => {
    if (password === correctPassword) {
      setIsPasswordCorrect(true);
      setPasswordError(false);
      setShowModal(true);
    } else {
      setPasswordError(true);
    }
  };

  const handleCancelPassword = () => {
    setPassword('');
    setPasswordError(false);
    setShowModal(false);
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

      {isPasswordCorrect && showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>All Wishes</h2>

            {isLoading ? (
              <p>Loading wishes...</p>
            ) : (
              <ul className="wishes-list">
                {currentWishes.map((wish) => (
                  <li key={wish.id}>
                    <strong>🎉 {wish.name} : </strong>{wish.wish}
                  </li>
                ))}
              </ul>
            )}

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