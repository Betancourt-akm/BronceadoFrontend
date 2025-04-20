import React, { useState } from 'react';
import './Citas.css';

function Citas() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',   // Nuevo campo para el teléfono
    service: '',
    date: '',
    time: '',    // Nuevo campo para la hora
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar los datos del formulario
    alert('Cita solicitada con éxito');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      time: '',
    });
  };

  return (
    <>
      <div className='citas-container'>
        <form className='citas-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <label htmlFor='name'>Nombre</label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='email'>Correo Electrónico</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='phone'>Teléfono</label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='service'>Servicio</label>
            <select
              id='service'
              name='service'
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value=''>Selecciona un servicio</option>
              <option value='Bronceado Natural con Sol'>Bronceado Natural con Sol</option>
              <option value='Flash Bronze Instantáneo'>Flash Bronze Instantáneo</option>
              <option value='Baño de Luna'>Baño de Luna</option>
            </select>
          </div>

          <div className='form-group'>
            <label htmlFor='date'>Fecha</label>
            <input
              type='date'
              id='date'
              name='date'
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='time'>Hora</label>
            <input
              type='time'
              id='time'
              name='time'
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <button type='submit'>Solicitar Cita</button>
        </form>
      </div>
    </>
  );
}

export default Citas;
