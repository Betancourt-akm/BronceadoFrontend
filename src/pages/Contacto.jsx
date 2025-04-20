import PropTypes from 'prop-types';
import './Contacto.css';
import { FaMobileAlt, FaEnvelope } from "react-icons/fa";
import { FaWhatsapp } from 'react-icons/fa6';
import FormContact from "../components/FormContact";

const Contacto = ({ phoneNumberone }) => {
  const openWhatsAppone = () => {
    window.open(`https://wa.me/${phoneNumberone}`, '_blank');
  };

  return (
    <>
      <section id="contacto" className="contact-section">
        <div className="contact-content">
          <div className="contact-container">
            <div className="contact-left">
              <h3 className="contact-title">Contáctanos</h3>
              <p className="contact-address">
                Carrera 80aa #20a 9<br />
                Medellín - Colombia
              </p>
              <p className="contact-phone">
                <FaMobileAlt className="contact-icon" />
                <a href="tel:+573013657213" className="contact-link">
                  +57 301 3657213
                </a>
              </p>
              <p className="contact-email">
                <FaEnvelope className="contact-icon" />
                <a href="mailto:spabronzeriodejaneiromed@gmail.com" className="contact-link">
                  spabronzeriodejaneiromed@gmail.com
                </a>
              </p>
              <div className="contact-socials">
                <button className="contact-button" onClick={openWhatsAppone}>
                  <FaWhatsapp className="social-icon" /> <span>Escríbenos por WhatsApp</span>
                </button>
              </div>
              <div className="contact-hours">
                <p className="hours-title">Horarios:</p>
                <ul className="hours-list">
                  <li className="hours-item">Miércoles a Lunes: 9:00 am - 4:00 pm</li>
                  <li className="hours-item">Cerramos todos los Martes</li>
                  <li className="hours-item">Domingo y festivos: 9:00 am - 4:00 pm</li>
                </ul>
              </div>
            </div>
            <div className="contact-right">
              <FormContact />
            </div>
          </div>
        </div>
      </section>

      <section id="map-section" className="map-section">
        <div className="map-container">
          <div className="map-info">
            <h2>Encuentra Spa Bronze en Medellín</h2>
            <p>Nos ubicamos en Carrera 80aa #20a 9, Medellín - Colombia.</p>
            <p>Contáctanos: +57 301 3657213 | spabronzeriodejaneiromed@gmail.com</p>
            <p>
              En Spa Bronze ofrecemos experiencias únicas en bronceado con métodos innovadores y un servicio de
              alta calidad para realzar tu belleza de forma natural y saludable.
            </p>
          </div>
          <iframe
            title="Ubicación Spa Bronze"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.3552119128412!2d-74.10143342429066!3d4.708211241590882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e44299987c5baa9%3A0xad3b08d9dc2a4797!2sCarrera%2080aa%20%2320a%209%2C%20Medell%C3%ADn%2C%20Colombia!5e0!3m2!1ses!2sco!4v1695300000000!5m2!1ses!2sco"
            className="contact-map"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

Contacto.propTypes = {
  phoneNumberone: PropTypes.string.isRequired,
};

export default Contacto;
