import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./PaymentSuccess.css";
import SummaryApi from "../common"; // Asegúrate de que SummaryApi.createTransaction.url esté configurado

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Obtener la información del carrito y del usuario desde Redux
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);

  // Estados locales para guardar los detalles de los items y la info de envío
  const [localItems, setLocalItems] = useState([]);
  const [localShippingInfo, setLocalShippingInfo] = useState(null);

  // Obtener parámetros de la URL
  const queryParams = new URLSearchParams(location.search);
  const transactionStatus = queryParams.get("status");
  const referenceCode = queryParams.get("reference");
  const amountInCents = queryParams.get("amount_in_cents");

  // Función para guardar la transacción en el backend
  const saveTransactionInDB = async (transactionData) => {
    try {
      await axios.post(SummaryApi.createTransaction.url, transactionData);
      console.log("Transacción guardada en DB:", transactionData);
    } catch (error) {
      console.error("Error al guardar la transacción en la base de datos:", error);
    }
  };

  useEffect(() => {
    if (transactionStatus === "APPROVED" && referenceCode) {
      // Unificar la información de cada item (usa productDetails si existe; de lo contrario, reservationDetails)
      const items = cart.cartItems
        ? cart.cartItems.map(
            (item) => item.productDetails || item.reservationDetails || {}
          )
        : [];
      setLocalItems(items);
      setLocalShippingInfo(cart.shippingInfo || null);

      // Construir el objeto de transacción, incorporando el _id del usuario
      const transactionData = {
        reference: referenceCode,
        amountInCents,
        status: transactionStatus,
        // Se envía el array unificado de detalles
        reservationDetails: items,
        shippingInfo: cart.shippingInfo || null,
        user: user ? user._id : null,
      };

      console.log("Transaction data a guardar:", transactionData);

      // Enviar la transacción al backend (sin limpiar el carrito automáticamente)
      saveTransactionInDB(transactionData).catch((err) => {
        console.error("No se pudo guardar la transacción:", err);
      });
    }
  }, [transactionStatus, referenceCode, amountInCents, cart, user, dispatch]);

  // Al hacer clic en "Volver al Inicio", se limpia el carrito y se navega a la página principal
  const handleVolverInicio = () => {
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="payment-success-container">
      {transactionStatus === "APPROVED" ? (
        <>
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu pago ha sido procesado exitosamente.</p>
          {referenceCode && (
            <p>
              <strong>Referencia:</strong> {referenceCode}
            </p>
          )}
          {amountInCents && (
            <p>
              <strong>Monto pagado:</strong> {parseInt(amountInCents, 10) / 100} USD
            </p>
          )}

          {/* Mostrar detalles usando los datos locales unificados */}
          {localItems.length > 0 ? (
            <div className="reservation-summary">
              <h3>Detalles de la Reserva / Venta</h3>
              {localItems.map((detalle, index) => {
                const price = detalle.totalPrice || detalle.sellingPrice || 0;
                return (
                  <div key={index} className="reservation-item">
                    <p>
                      <strong>Servicio/Producto:</strong>{" "}
                      {detalle.productName || "Producto"}
                    </p>
                    <p>
                      <strong>Categoría:</strong>{" "}
                      {detalle.category || "N/D"}
                    </p>
                    {detalle.description && (
                      <p>
                        <strong>Descripción:</strong> {detalle.description}
                      </p>
                    )}
                    {detalle.reservationDate && (
                      <p>
                        <strong>Fecha de Reserva:</strong>{" "}
                        {detalle.reservationDate}
                      </p>
                    )}
                    {detalle.reservationTime && (
                      <p>
                        <strong>Hora de Reserva:</strong>{" "}
                        {detalle.reservationTime}
                      </p>
                    )}
                    {detalle.serviceDuration && (
                      <p>
                        <strong>Duración:</strong>{" "}
                        {detalle.serviceDuration} minutos
                      </p>
                    )}
                    {detalle.serviceIntensity && (
                      <p>
                        <strong>Intensidad:</strong>{" "}
                        {detalle.serviceIntensity}
                      </p>
                    )}
                    <p>
                      <strong>Total:</strong>{" "}
                      {price
                        ? price.toLocaleString("es-CO", {
                            style: "currency",
                            currency: "COP",
                          })
                        : "N/D"}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No se encontraron detalles de la transacción.</p>
          )}

          {/* Mostrar shipping info (si existe) */}
          {localShippingInfo && (
            <div className="shipping-info">
              <h3>Detalles de Envío / Recogida</h3>
              <p>
                <strong>Nombre:</strong> {localShippingInfo.name}
              </p>
              <p>
                <strong>Email:</strong> {localShippingInfo.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {localShippingInfo.phone}
              </p>
              <p>
                <strong>Dirección:</strong> {localShippingInfo.address}
              </p>
              {localShippingInfo.deliveryTime && (
                <p>
                  <strong>Hora de Entrega:</strong> {localShippingInfo.deliveryTime}
                </p>
              )}
            </div>
          )}

          <button onClick={handleVolverInicio}>Volver al Inicio</button>
        </>
      ) : transactionStatus === "DECLINED" ? (
        <>
          <h1>Pago Rechazado</h1>
          <p>Tu pago fue rechazado. Por favor, intenta nuevamente.</p>
          <button onClick={() => navigate("/cart")}>Volver al Carrito</button>
        </>
      ) : (
        <>
          <h1>Pago Pendiente</h1>
          <p>
            Tu pago está en proceso o no se detectó el parámetro{" "}
            <em>status=APPROVED</em>. Te notificaremos cuando se confirme.
          </p>
          <button onClick={() => navigate("/")}>Volver al Inicio</button>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
