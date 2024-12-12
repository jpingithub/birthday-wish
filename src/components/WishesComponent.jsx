import React, { useState } from 'react';
import wishesData from '../data/wishesList.js'; 

const WishesComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const toggleModal = () => setShowModal(!showModal);

  const indexOfLastWish = currentPage * itemsPerPage;
  const indexOfFirstWish = indexOfLastWish - itemsPerPage;
  const currentWishes = wishesData.slice(indexOfFirstWish, indexOfLastWish);

  const totalPages = Math.ceil(wishesData.length / itemsPerPage);

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
                  <strong>{wish.id}. {wish.name} : </strong>{wish.wish}
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
