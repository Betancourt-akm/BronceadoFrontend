import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import Gallery from '../components/Gallery';
import VideoGallery from '../components/VideoGallery';
import './Home.css';

const Home = () => {
  const WhatsappInvite = ({ phoneNumber }) => {
    useEffect(() => {
      const videoElement = document.querySelector('.whatsapp-invite-video');
      if (videoElement) {
        videoElement.play().catch((error) => {
          console.error('Error intentando reproducir el video:', error);
        });
      }
    }, []);

    return (
      <div className="whatsapp-invite-container">
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-invite-link"
        >
          ¡Haz clic aquí para contactarnos en WhatsApp!
        </a>
      </div>
    );
  };

  return (
    <main className="home-main">
      <BannerProduct />

      <section className="products-section">
        <h2>Bronceado Premium</h2>
        <p>
          Descubre <strong>Spa Bronze Brasileiro</strong>: fórmulas avanzadas para un bronceado duradero y saludable.
        </p>
      </section>


      <HorizontalCardProduct category="Servicios" />

      <div className="extra-links">
        <Link to="/servicios">Ver Bronceados</Link>
      </div>

      <div className="about-videos">
        <VideoGallery />
        </div>

      <section className="hero-section">
        <h2>¿Listo para lucir tu mejor bronceado?</h2>
        <p>
          En <strong>Spa Bronze Brasileiro</strong> de Medellín te ofrecemos servicios de{' '}
          <strong>bronceado natural</strong>, <strong>bronceado instantáneo</strong> y mucho más. Nuestro
          objetivo es resaltar tu belleza de manera saludable, empleando técnicas avanzadas y productos de la
          mejor calidad. ¡Reserva ahora tu sesión y descubre por qué somos los favoritos en la ciudad!
        </p>
      </section>

      <WhatsappInvite phoneNumber="573013657213" />

      <section className="about-section">
        <h2>Quiénes Somos</h2>
        <p>
          Somos especialistas en el <strong>cuidado integral de la piel</strong>, el bienestar y la{' '}
          <strong>relajación</strong>. Queremos brindarte una experiencia única, llena de confort, seguridad y
          excelentes resultados. Nuestro equipo profesional combina conocimiento, pasión y las últimas tendencias de
          bronceado brasileño para que disfrutes de un tono perfecto y duradero.
        </p>
        <div className="about-images">
        <Gallery />
        </div>
      </section>

   
     

      <section className="products-section">
        <h2>Productos de Bronceado</h2>
        <p>
          En <strong>Spa Bronze Brasileiro</strong> también encontrarás una selección de productos para potenciar
          y prolongar tu bronceado. Desde lociones hidratantes hasta aceites especializados, nuestro equipo te asesorará
          para que obtengas los mejores resultados.
        </p>
      </section>

      <HorizontalCardProduct category="Productos" />

      <section className="services-section">
        <p>
          Explora tratamientos diseñados para realzar tu belleza y obtener un{' '}
          <strong>bronceado natural</strong>. Utilizamos técnicas avanzadas y productos de calidad que te
          garantizan un acabado uniforme y radiante.
        </p>
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


    </main>
  );
};

Home.propTypes = {
  phoneNumber: PropTypes.string,
};

export default Home;
