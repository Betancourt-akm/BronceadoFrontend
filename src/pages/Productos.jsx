import React from 'react';
import LeftCardProduct from '../components/LeftCardProduct.jsx';
import './Productos.css';

const Productos = () => {
  return (
    <div>
    <div id="productos" className="productos-section">
      <div className="productos-container">
        <div className="productos-header">
          <div className="productos-badge">Nuestros Productos</div>
          <h2 className="productos-heading">Productos de Spa Bronze</h2>
          <p className="productos-description">
            Descubre nuestra variedad de productos, desde accesorios y ropa hasta artículos exclusivos, diseñados para complementar tu experiencia en Spa Bronze.
          </p>
        </div>
        <div className="vertical-card-container">
          <LeftCardProduct category="Productos" />
        </div>
      </div>
    </div>
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
   </div>
  );
};

export default Productos;
