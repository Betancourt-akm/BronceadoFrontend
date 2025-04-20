

import React from "react";
import { useNavigate } from "react-router-dom";
import "./CancelPayment.css"; 

const CancelPayment = () => {
  const navigate = useNavigate();


   
  const handleGoHome = () => {
    navigate("/"); 
  };

  return (
    <div className="cancelPayment-container">
      <h2>Pago Cancelado</h2>
      <p>
        Tu pago fue cancelado antes de completarse. Si deseas reintentar el proceso
        de compra o modificar tu pedido, puedes regresar al carrito o al inicio.
      </p>
      <button onClick={handleGoHome} className="cancelPayment-btn">
        Volver al Inicio
      </button>
    </div>
  );
};

export default CancelPayment;
