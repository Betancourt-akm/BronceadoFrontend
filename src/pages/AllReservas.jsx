import { useEffect, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import displayCOPCurrency from "../helpers/displayCurrency";
import "./AllReservas.css";

const AllReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditReserva, setOpenEditReserva] = useState(false);
  const [selectedReserva, setSelectedReserva] = useState(null);
  const navigate = useNavigate();

  const fetchAllReservas = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.allReservas.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const dataResponse = await response.json();
      const allReservas = dataResponse?.data || [];
      // Filtrar solo las reservas de servicios (excluyendo productos)
      const serviceReservas = allReservas.filter((reserva) => {
        if (
          Array.isArray(reserva.reservationDetails) &&
          reserva.reservationDetails.length > 0
        ) {
          const category = reserva.reservationDetails[0].category;
          return category && category.toLowerCase().includes("servicio");
        }
        return false;
      });
      setReservas(serviceReservas);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      toast.error("Error al obtener reservas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllReservas();
  }, []);

  const handleEditReserva = (reserva) => {
    setSelectedReserva(reserva);
    setOpenEditReserva(true);
  };

  const handleDeleteReserva = async (reservaId) => {
    try {
      const response = await fetch(
        `${SummaryApi.deleteReserva.url}/${reservaId}`,
        { method: SummaryApi.deleteReserva.method }
      );
      const dataResponse = await response.json();
      if (dataResponse.success) {
        toast.success("Reserva eliminada correctamente.");
        fetchAllReservas();
      } else {
        toast.error("Error al eliminar la reserva.");
      }
    } catch (error) {
      console.error("Error al eliminar reserva:", error);
      toast.error("Error al eliminar reserva.");
    }
  };

  return (
    <div className="reservas-container">
      <div className="reservas-header">
        <h2>Reservas Realizadas (Servicios)</h2>
        <button
          className="add-button"
          onClick={() => {
            /* Lógica para agregar reserva manualmente */
          }}
        >
          Agregar Reserva
        </button>
      </div>
      {loading ? (
        <p>Cargando reservas...</p>
      ) : reservas.length === 0 ? (
        <p>No se encontraron reservas.</p>
      ) : (
        <table className="reservas-table">
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Servicio</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>tel</th>
              <th>Fecha y Hora</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => {
              // Extraemos los detalles del primer objeto en reservationDetails
              const detalle =
                Array.isArray(reserva.reservationDetails) &&
                reserva.reservationDetails.length > 0
                  ? reserva.reservationDetails[0]
                  : {};
              return (
                <tr key={reserva._id}>
                  <td>{index + 1}</td>
                  <td>{detalle.productName || "N/D"}</td>
                  <td>{reserva.user?.name || "N/D"}</td>
                  <td>{reserva.user?.email || "N/D"}</td>
                  <td>{reserva.user?.tel || "N/D"}</td>
                  <td>
                    {detalle.reservationDate || "N/D"}{" "}
                    {detalle.reservationTime || ""}
                  </td>
                  <td>
                    {detalle.totalPrice
                      ? displayCOPCurrency(detalle.totalPrice)
                      : "N/D"}
                  </td>
                  <td>
                    <button
                      onClick={() => handleEditReserva(reserva)}
                      className="action-button"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteReserva(reserva._id)}
                      className="action-button delete"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {openEditReserva && (
        <div className="modal-placeholder">
          <div className="modal-content">
            <h3>Editar Reserva</h3>
            <pre>{JSON.stringify(selectedReserva, null, 2)}</pre>
            <button
              onClick={() => {
                setOpenEditReserva(false);
                fetchAllReservas();
              }}
            >
              Cerrar Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

AllReservas.propTypes = {
  // Define PropTypes si lo consideras necesario.
};

export default AllReservas;
