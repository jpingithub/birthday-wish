import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const WishesComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishes, setWishes] = useState([]);
  const itemsPerPage = 10;

  const BASE_URL = process.env.REACT_APP_BASE_URL;

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

      {showModal && (
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
