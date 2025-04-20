import React from 'react';
import { FaInstagram, FaFacebookF, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contacto</h3>
          <p><FaMapMarkerAlt className="icon" /><span>Carrera 80aa #20a 9</span></p>
          <p><span>Medellín - Colombia</span></p>
          <p><FaPhoneAlt className="icon" /><span>+57 301 3657213</span></p>
          <p><FaEnvelope className="icon" /></p>
          <p><span>spabronzeriodejaneiromed@gmail.com</span></p>
        </div>
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul className='enlaces_footer'>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/contacto">Contacto</a></li>
          
          </ul>
        </div>
        <div className="footer-section">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com/spabronce" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Suscríbete</h3>
          <form className="subscription-form">
            <input type="email" placeholder="Tu correo electrónico" />
            <button type="submit">Suscribirse</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
