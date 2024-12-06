import { useState } from "react"
import "./style.css";

const PostImagesCard = ({images}) => {
    const[currentIndex,setCurrentIndex] = useState(0);
    const[isModalOpen,setIsModalOpen] = useState(false);
    const[modalImage,setModalImage] = useState("");

    // Handle navigation to next or previous image
    const handleNavigation = direction => {
    direction === "next" ? (setCurrentIndex(prev => prev + 1 % images?.length)) : (setCurrentIndex(prev => prev - 1 + images?.length))
    }

    // Open modal with the clicked image
    const openModal = (imgUrl) => {
        setModalImage(imgUrl);
        setIsModalOpen(prev => !prev)
    }

    // close modal
    const closeModal =  () => {
        setIsModalOpen(prev => !prev)
    }
  return (
     <>
     {
      images.length === 0 ? null :
      (
      <div className="product-card">
      <div className="img-container">
        <button 
        className="nav-button left" onClick={() => handleNavigation("prev")}>
          &#10094;
        </button>
        <img 
        className="product-image"
        src={images[currentIndex]} 
        onClick={() => openModal(images[currentIndex])}
        alt={`product image ${currentIndex + 1}`} 
        />
        <button 
        className="nav-button right" onClick={() => handleNavigation("next")}>
          &#10095;
        </button>
      </div>

      {/* Modal for full-screen view */}
      {
      isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt={`Zoomed Product`} className="modal-image" />
          </div>
        </div>
      )
      }
    </div>
      )
     }
     </>
  )
}

export default PostImagesCard;