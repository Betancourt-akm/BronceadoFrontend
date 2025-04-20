import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { removeFromCart, updateCartQuantity, setShippingInfo } from "../store/cartSlice";
import PayPalPayment from "../components/PayPalPayment";
import PayPalPaymentCard from "../components/PayPalPaymentCard";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import "./Cart.css";

// Función para formatear el valor en COP
function formatCOP(value) {
  return value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
  });
}

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const shippingInfoGlobal = useSelector((state) => state.cart.shippingInfo);

  // Estado para las tarifas de envío obtenidas desde el backend
  const [shippingRates, setShippingRates] = useState({});

  useEffect(() => {
    fetchShippingRates();
  }, []);

  const fetchShippingRates = async () => {
    try {
      const response = await fetch(SummaryApi.shippingRates.url, {
        method: SummaryApi.shippingRates.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // Se espera que 'data' sea un arreglo de objetos { city, default, neighborhoods }
      // Convertimos el arreglo en un objeto donde la key es la ciudad
      const ratesObj = data.reduce((acc, rate) => {
        acc[rate.city] = { default: rate.default, neighborhoods: rate.neighborhoods || {} };
        return acc;
      }, {});
      setShippingRates(ratesObj);
    } catch (error) {
      console.error("Error al cargar las tarifas de envío:", error);
    }
  };

  // Estado para el formulario de shipping info (global para productos)
  const [showShippingForm, setShowShippingForm] = useState(true);
  const [shippingForm, setShippingForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    deliveryTime: "",
    shippingMethod: "delivery", // "delivery" o "pickup"
    city: "",
    neighborhood: ""
  });

  // Determinar si el carrito es de servicios o de productos
  const firstItem = cartItems[0];
  const detailsFirst = firstItem
    ? firstItem.reservationDetails || firstItem.productDetails || {}
    : {};
  const isService =
    detailsFirst.category &&
    detailsFirst.category.toLowerCase().includes("servicio");

  // Calcular totales de los productos
  let totalCOP = 0;
  cartItems.forEach((item) => {
    const details = item.reservationDetails || item.productDetails || {};
    // Si no existe totalPrice, usamos sellingPrice
    const price = details.totalPrice || details.sellingPrice || 0;
    const qty = item.quantity || 1;
    totalCOP += price * qty;
  });
  const EXCHANGE_RATE = 4000;
  const totalUSD = (totalCOP / EXCHANGE_RATE).toFixed(2);

  // Para servicios se cobra el 20%; para productos se cobra el 100%
  const depositCOP = isService ? totalCOP * 0.2 : totalCOP;
  const depositUSD = (depositCOP / EXCHANGE_RATE).toFixed(2);

  const handleRemove = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleChangeQty = (productId, newQty) => {
    if (newQty < 1) newQty = 1;
    dispatch(updateCartQuantity({ productId, quantity: newQty }));
  };

  // Manejador para enviar el formulario de shipping info
  const handleShippingSubmit = (e) => {
    e.preventDefault();
    dispatch(setShippingInfo(shippingForm));
    setShowShippingForm(false);
  };

  // Función para calcular el costo de envío basado en la información ingresada
  const calculateShippingFee = () => {
    if (!shippingInfoGlobal) return 0;
    if (shippingInfoGlobal.shippingMethod === "pickup") return 0;
    const { city, neighborhood } = shippingInfoGlobal;
    if (!city || !shippingRates[city]) return 0;
    const rates = shippingRates[city];
    if (neighborhood && rates.neighborhoods && rates.neighborhoods[neighborhood]) {
      return rates.neighborhoods[neighborhood];
    }
    return rates.default;
  };

  const shippingFee = (!isService && shippingInfoGlobal) ? calculateShippingFee() : 0;
  const finalTotalCOP = totalCOP + shippingFee;
  const finalTotalUSD = (finalTotalCOP / EXCHANGE_RATE).toFixed(2);

  // Estilo para inputs (más amplios y elegantes)
  const inputStyle = {
    width: "100%",
    padding: "0.6rem",
    marginBottom: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem"
  };

  return (
    <div className="uniqueCart-container">
      {cartItems.length === 0 ? (
        <div className="uniqueCart-emptyContainer">
          <p className="uniqueCart-emptyMessage">No hay productos en tu carrito.</p>
        </div>
      ) : (
        <div className="uniqueCart-content">
          <div className="uniqueCart-productList">
            {cartItems.map((item, idx) => {
              // Unificar la información: si es servicio se usa reservationDetails, si no, productDetails.
              const details = item.reservationDetails || item.productDetails || {};
              const price = details.totalPrice || details.sellingPrice || 0;
              const qty = item.quantity || 1;
              const subtotal = price * qty;
              return (
                <div key={idx} className="uniqueCart-productCard">
                  <div className="uniqueCart-productImage">
                    <img
                      src={details.productImage || "ruta/por/defecto.jpg"}
                      alt={details.productName || "Producto"}
                      className="uniqueCart-productImg"
                    />
                    <div
                      className="uniqueCart-deleteButton"
                      onClick={() => handleRemove(item.productId)}
                    >
                      <MdDelete />
                    </div>
                  </div>
                  <div className="uniqueCart-details">
                    <h2 className="uniqueCart-name">
                      {details.productName || "Producto"}
                    </h2>
                    <p className="uniqueCart-category">
                      {details.category || "Categoría desconocida"}
                    </p>
                    {details.description && (
                      <p className="uniqueCart-description">
                        {details.description}
                      </p>
                    )}
                    {details.reservationDate && (
                      <p className="uniqueCart-reservationDate">
                        Fecha de Reserva: {details.reservationDate}
                      </p>
                    )}
                    {details.reservationTime && (
                      <p className="uniqueCart-reservationTime">
                        Hora de Reserva: {details.reservationTime}
                      </p>
                    )}
                    {details.serviceDuration && (
                      <p className="uniqueCart-serviceDetail">
                        Duración: {details.serviceDuration} minutos
                      </p>
                    )}
                    {details.serviceIntensity && (
                      <p className="uniqueCart-serviceDetail">
                        Intensidad: {details.serviceIntensity}
                      </p>
                    )}
                    {/* Para servicios, se muestra shippingInfo dentro del item */}
                    {isService && details.shippingInfo && (
                      <div className="uniqueCart-shipping">
                        <p>
                          <strong>Nombre:</strong> {details.shippingInfo.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {details.shippingInfo.email}
                        </p>
                        <p>
                          <strong>Teléfono:</strong> {details.shippingInfo.phone}
                        </p>
                        <p>
                          <strong>Dirección:</strong> {details.shippingInfo.address}
                        </p>
                        {details.shippingInfo.deliveryTime && (
                          <p>
                            <strong>Hora de entrega:</strong> {details.shippingInfo.deliveryTime}
                          </p>
                        )}
                      </div>
                    )}
                    <div className="uniqueCart-quantity">
                      <label>
                        <strong>Cantidad:</strong>{" "}
                        <input
                          type="number"
                          min="1"
                          value={qty}
                          onChange={(e) =>
                            handleChangeQty(item.productId, +e.target.value)
                          }
                          className="uniqueCart-quantityInput"
                        />
                      </label>
                    </div>
                    <div className="uniqueCart-price">
                      <p className="uniqueCart-totalPrice">
                        Subtotal: {formatCOP(subtotal)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Se muestra la sección de envío para productos (no servicios) */}
          {!isService && (
            <div className="uniqueCart-shipping-global">
              <h3
                className="uniqueCart-shippingTitle"
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginBottom: "10px",
                  color: "#333"
                }}
              >
                Detalles de Envío
              </h3>
              {shippingInfoGlobal ? (
                <div className="shipping-info-display">
                  <p>
                    <strong>Nombre:</strong> {shippingInfoGlobal.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {shippingInfoGlobal.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {shippingInfoGlobal.phone}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {shippingInfoGlobal.address}
                  </p>
                  {shippingInfoGlobal.deliveryTime && (
                    <p>
                      <strong>Hora de entrega:</strong> {shippingInfoGlobal.deliveryTime}
                    </p>
                  )}
                  {shippingInfoGlobal.shippingMethod === "delivery" && (
                    <>
                      <p>
                        <strong>Ciudad:</strong> {shippingInfoGlobal.city}
                      </p>
                      <p>
                        <strong>Barrio:</strong> {shippingInfoGlobal.neighborhood || "N/A"}
                      </p>
                      <p
                        className="uniqueCart-shippingFee"
                        style={{
                          marginTop: "10px",
                          fontSize: "1.1rem",
                          color: shippingInfoGlobal.city === "Medellín" ? "#28a745" : "#e60000"
                        }}
                      >
                        <strong>Costo de envío para {shippingInfoGlobal.city}:</strong>{" "}
                        {formatCOP(calculateShippingFee())}
                      </p>
                    </>
                  )}
                  <p>
                    <strong>Método:</strong>{" "}
                    {shippingInfoGlobal.shippingMethod === "delivery"
                      ? "Envío a domicilio"
                      : "Recoger en tienda"}
                  </p>
                </div>
              ) : (
                <form className="shipping-form" onSubmit={handleShippingSubmit}>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={shippingForm.name}
                    onChange={(e) =>
                      setShippingForm({ ...shippingForm, name: e.target.value })
                    }
                    required
                    style={inputStyle}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={shippingForm.email}
                    onChange={(e) =>
                      setShippingForm({ ...shippingForm, email: e.target.value })
                    }
                    required
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Teléfono"
                    value={shippingForm.phone}
                    onChange={(e) =>
                      setShippingForm({ ...shippingForm, phone: e.target.value })
                    }
                    required
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Dirección"
                    value={shippingForm.address}
                    onChange={(e) =>
                      setShippingForm({ ...shippingForm, address: e.target.value })
                    }
                    required
                    style={inputStyle}
                  />
                  <input
                    type="text"
                    placeholder="Hora de entrega (opcional)"
                    value={shippingForm.deliveryTime}
                    onChange={(e) =>
                      setShippingForm({ ...shippingForm, deliveryTime: e.target.value })
                    }
                    style={inputStyle}
                  />
                  <div style={{ marginBottom: "0.5rem" }}>
                    <label style={{ marginRight: "10px" }}>
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="delivery"
                        checked={shippingForm.shippingMethod === "delivery"}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, shippingMethod: e.target.value })
                        }
                        style={{ marginRight: "5px" }}
                      />
                      Envío a domicilio
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="pickup"
                        checked={shippingForm.shippingMethod === "pickup"}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, shippingMethod: e.target.value })
                        }
                        style={{ marginRight: "5px" }}
                      />
                      Recoger en tienda
                    </label>
                  </div>
                  {shippingForm.shippingMethod === "delivery" && (
                    <>
                      <select
                        value={shippingForm.city}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, city: e.target.value, neighborhood: "" })
                        }
                        required
                        style={inputStyle}
                      >
                        <option value="">Selecciona una ciudad</option>
                        {Object.keys(shippingRates).map((city, index) => (
                          <option key={index} value={city}>
                            {city} - {formatCOP(shippingRates[city].default)}
                          </option>
                        ))}
                      </select>
                      <select
                        value={shippingForm.neighborhood}
                        onChange={(e) =>
                          setShippingForm({ ...shippingForm, neighborhood: e.target.value })
                        }
                        style={inputStyle}
                      >
                        <option value="">Selecciona un barrio (opcional)</option>
                        {shippingForm.city &&
                          shippingRates[shippingForm.city] &&
                          shippingRates[shippingForm.city].neighborhoods &&
                          Object.keys(shippingRates[shippingForm.city].neighborhoods).map((barrio, index) => (
                            <option key={index} value={barrio}>
                              {barrio}
                            </option>
                          ))}
                      </select>
                    </>
                  )}
                  <button
                    type="submit"
                    style={{
                      ...inputStyle,
                      cursor: "pointer",
                      backgroundColor: "#28a745",
                      color: "#fff",
                      border: "none"
                    }}
                  >
                    Guardar
                  </button>
                </form>
              )}
            </div>
          )}

          <div className="uniqueCart-summary">
            <h3 className="uniqueCart-totalAmount">
              Total en COP: {formatCOP(finalTotalCOP)}
            </h3>
            <h3 className="uniqueCart-totalAmount">
              Equivalente en USD: ${finalTotalUSD}
            </h3>
            {!isService && shippingInfoGlobal && shippingInfoGlobal.shippingMethod === "delivery" && (
              <p>
                <strong>Costo de envío:</strong> {formatCOP(shippingFee)}
              </p>
            )}
            <div className="uniqueCart-depositContainer">
              <p className="uniqueCart-depositText">
                {isService
                  ? "** Solo pagarás el 20% (reserva) **"
                  : "** Se pagará el 100% **"}
              </p>
              <h4 className="uniqueCart-depositAmount">
                {isService
                  ? `Reserva (20%): ${formatCOP(depositCOP)} / $${depositUSD} USD`
                  : `Total: ${formatCOP(finalTotalCOP)} / $${finalTotalUSD} USD`}
              </h4>
            </div>
            <div className="uniqueCart-buttonsContainer">
              {isService ? (
                <>
                  <div className="uniqueCart-buttonItem">
                    <PayPalPayment
                      product={{
                        description: "Reserva 20% - PayPal",
                        cost: depositUSD,
                      }}
                    />
                  </div>
                  <div className="uniqueCart-buttonItem">
                    <PayPalPaymentCard
                      product={{
                        description: "Reserva 20% - Tarjeta",
                        cost: depositUSD,
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="uniqueCart-buttonItem">
                    <PayPalPayment
                      product={{
                        description: "Pago 100% - PayPal",
                        cost: finalTotalUSD,
                      }}
                    />
                  </div>
                  <div className="uniqueCart-buttonItem">
                    <PayPalPaymentCard
                      product={{
                        description: "Pago 100% - Tarjeta",
                        cost: finalTotalUSD,
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
