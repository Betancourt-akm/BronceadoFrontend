import { Link } from 'react-router-dom';
import "./Nosotros.css"
const Nosotros = () => {
  return (
    <div>
    <section id='nosotros' className="container">
      <div className="content">
      <div className="gallery-container">
      
      </div>
        <div className="text-container">
          <div className="text-content">
            <h2 className="title">
            Explora 4Rent, la agencia líder en alquiler de motos en Bogotá.
            </h2>
            <p className="subtitle">
            La opción más destacada para el alquiler de motos en Bogotá: ¡4Rent!
            </p>
            <p className="description">
              Bienvenido a 4Rent, la agencia de alquiler de motos ubicada estratégicamente en Engativá. Ofrecemos una amplia selección de motocicletas automáticas y manuales para que experimentes Bogotá sobre dos ruedas. Si buscas aventuras más allá de la ciudad, también disponemos de motos de alto cilindraje para que explores todo el país. ¡Te invitamos a visitar nuestra oficina en Bogotá! Nuestros asesores están preparados para atenderte en cualquier momento, ya que nuestras líneas están disponibles las 24 horas del día, los 7 días de la semana. ¡No pierdas más tiempo y descubre en 4Rent el alquiler de moto que te permitirá disfrutar plenamente del poder de viajar en dos ruedas por Bogotá, Colombia!
            </p>
          </div>
        </div>
      </div>
      <div className="image-container">
          
        </div>
        <p className="link">
              <Link to="/motocicletas" className="button">
                Ver motos disponibles
              </Link>
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
    </div>
  );
};

export default Nosotros;
