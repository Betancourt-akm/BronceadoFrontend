import React, { useState } from 'react';
import './Gallery.css';
import Img1 from "../assest/IMG-20250217-WA0191.jpg";
import Img2 from "../assest/IMG-20240912-WA0333.jpg";
import Img3 from "../assest/IMG-20240912-WA0343.jpg";
import Img4 from "../assest/IMG-20250217-WA0177.jpg";
import Img5 from "../assest/IMG-20240912-WA0330.jpg";
import Img6 from "../assest/IMG-20240912-WA0329.jpg";
import Img7 from "../assest/IMG-20240912-WA0339.jpg";

const Gallery = () => {
  const images = [
    { src: Img1, alt: "Imagen 1" },
    { src: Img2, alt: "Imagen 2" },
    { src: Img3, alt: "Imagen 3" },
    { src: Img4, alt: "Imagen 4" },
    { src: Img5, alt: "Imagen 5" },
    { src: Img6, alt: "Imagen 6" },
    { src: Img7, alt: "Imagen 7" },
    { src: "https://res.cloudinary.com/dmck1buzz/image/upload/v1725977857/Spa/pp0fuo0wrhyhuubiov3m.webp", alt: "Imagen 8" },
    { src: "https://res.cloudinary.com/dmck1buzz/image/upload/v1725977857/Spa/npequz1of1m7riecfhiv.webp", alt: "Imagen 9" },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="gallery-section">
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="gallery-item" 
            onClick={() => openModal(image)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={selectedImage.src} alt={selectedImage.alt} />
          <div className="caption">{selectedImage.alt}</div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
