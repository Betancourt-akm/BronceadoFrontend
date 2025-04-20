
import React, { useState } from "react";
import axios from "axios";
import SummaryApi from "../common/"; 
import "./FormContact.css"; 
const FormContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { url, method } = SummaryApi.formSubmit; 
      const response = await axios({
        url,
        method,
        data: formData,
      });

      console.log("Respuesta del servidor:", response.data);
      alert("¡Formulario enviado con éxito!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      alert("Hubo un error al enviar el formulario.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Formulario de Contacto</h2>

      <label htmlFor="name">Nombre:</label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Correo:</label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label htmlFor="subject">Asunto:</label>
      <input
        type="text"
        name="subject"
        id="subject"
        value={formData.subject}
        onChange={handleChange}
      />

      <label htmlFor="message">Mensaje:</label>
      <textarea
        name="message"
        id="message"
        rows="5"
        value={formData.message}
        onChange={handleChange}
        required
      />

      <button type="submit">Enviar</button>
    </form>
  );
};

export default FormContact;
