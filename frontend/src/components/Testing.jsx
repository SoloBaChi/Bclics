import React, { useState } from 'react';
import './ProductImageCard.css';

const productImages = [
  "https://via.placeholder.com/800x600?text=Product+1",
  "https://via.placeholder.com/800x600?text=Product+2",
  "https://via.placeholder.com/800x600?text=Product+3",
  "https://via.placeholder.com/800x600?text=Product+4"
];

const ProductImageCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  // Move to next or previous image
  const handleNavigation = (direction) => {
    if (direction === 'next') {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productImages.length);
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length);
    }
  };

  // Open modal with the clicked image
  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-card">
      <div className="image-container">
        <button className="nav-button left" onClick={() => handleNavigation('prev')}>&#10094;</button>
        <img 
          src={productImages[currentIndex]} 
          alt={`Product ${currentIndex + 1}`} 
          onClick={() => openModal(productImages[currentIndex])}
          className="product-image"
        />
        <button className="nav-button right" onClick={() => handleNavigation('next')}>&#10095;</button>
      </div>

      {/* Modal for full-screen view */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Zoomed Product" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageCard;
