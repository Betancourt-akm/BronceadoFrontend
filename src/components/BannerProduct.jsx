import React, { useEffect, useState, useCallback } from 'react';
// import image1 from '../assest/banner/1-.jpg';
// import image2 from '../assest/banner/2-.jpg';
import image3 from '../assest/banner/3-.jpg';
import image4 from '../assest/banner/4-.jpg';

import image1Mobile from '../assest/banner/1-.jpg';
import image2Mobile from '../assest/banner/2-.jpg';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import './BannerProduct.css';

const images = [
  { desktop: image3, mobile: image1Mobile },
  { desktop: image4, mobile: image2Mobile },
  { desktop: image3, mobile: image1Mobile },
  { desktop: image4, mobile: image2Mobile },
];

const BannerProduct = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para avanzar al siguiente slide
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, []);

  // Función para retroceder al slide anterior
  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, []);

  // Intervalo para cambiar de slide cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="banner-container">
      <div className="slider">
        <button onClick={prevSlide} className="nav-button">
          <FaAngleLeft />
        </button>

        <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((img, index) => (
            <div className="slide" key={index}>
              {/* Imagen para escritorio; visible en pantallas grandes */}
              <img src={img.desktop} alt={`Slide ${index}`} className="desktop" />
              {/* Imagen para móvil; visible en pantallas pequeñas */}
              <img src={img.mobile} alt={`Slide mobile ${index}`} className="mobile" />
            </div>
          ))}
        </div>

        <button onClick={nextSlide} className="nav-button">
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default BannerProduct;
