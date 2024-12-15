import React, { useEffect, useState } from 'react';
import { allWishes } from '../data/DB.js'; 

const WishesComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishes, setWishes] = useState([]);
  const itemsPerPage = 10;

  const fetchWishes = async () => {
    const allFetchedWishes = await allWishes(); 
    setWishes(allFetchedWishes);
  };

  useEffect(() => {
    fetchWishes();

    const interval = setInterval(fetchWishes, 5000); 
    return () => clearInterval(interval); 
  }, []);

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
