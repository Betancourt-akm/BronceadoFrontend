import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import './reservar.css';

const Reservar = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const serviciosHome = await fetchCategoryWiseProduct("Servicios-Home");
      const serviciosVertical = await fetchCategoryWiseProduct("Servicios");
      let combined = [];
      if (serviciosHome && serviciosHome.data) {
        combined = combined.concat(serviciosHome.data);
      }
      if (serviciosVertical && serviciosVertical.data) {
        combined = combined.concat(serviciosVertical.data);
      }
      setServices(combined);
      setLoading(false);
    };
    fetchServices();
  }, []);

  const timeOptions = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const handleReservation = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      alert("Por favor, selecciona un servicio, una fecha y una hora");
      return;
    }
    const reservation = {
      serviceId: selectedService._id,
      productName: selectedService.productName,
      price: selectedService.price,
      date: selectedDate,
      time: selectedTime,
    };
    // Se envía la reserva al carrito (por ejemplo, navegando a '/cart' con el objeto en state)
    navigate('/cart', { state: { reservation } });
  };

  return (
    <div className="reservation-container">
      <h2 className="reservation-title">Reserva tu Servicio</h2>
      <div className="reservation-content">
        <div className="services-list">
          <h3 className="section-heading">Selecciona un servicio</h3>
          {loading ? (
            <p>Cargando servicios...</p>
          ) : (
            <div className="services-cards">
              {services.map(service => (
                <div
                  key={service._id}
                  className={`service-card ${selectedService && selectedService._id === service._id ? 'selected' : ''}`}
                  onClick={() => setSelectedService(service)}
                >
                  <h4 className="service-name">{service.productName}</h4>
                  {service.brandName && <p className="service-brand">{service.brandName}</p>}
                  {service.description && (
                    <p className="service-description">
                      {service.description.substring(0, 50)}...
                    </p>
                  )}
                  <p className="service-price">${service.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="reservation-form">
          <h3 className="section-heading">Selecciona Fecha y Hora</h3>
          <div className="form-group">
            <label htmlFor="reservation-date">Fecha:</label>
            <input
              type="date"
              id="reservation-date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation-time">Hora:</label>
            <select
              id="reservation-time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              required
            >
              <option value="">Selecciona una hora</option>
              {timeOptions.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <button className="reservation-button" onClick={handleReservation}>
            Realizar Reserva
          </button>
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

export default Reservar;
