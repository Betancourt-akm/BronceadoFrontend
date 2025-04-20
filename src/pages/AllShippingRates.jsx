import React, { useState, useEffect } from "react";
import AdminShippingRatesEditor from "../components/AdminShippingRatesEditor";
import SummaryApi from "../common";

const AllShippingRates = () => {
  const [openShippingEditor, setOpenShippingEditor] = useState(false);
  const [shippingRates, setShippingRates] = useState([]);

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
      setShippingRates(data);
    } catch (error) {
      console.error("Error fetching shipping rates:", error);
    }
  };

  useEffect(() => {
    fetchShippingRates();
  }, []);

  return (
    <div>
      <div className="bg-white py-2 px-4 flex justify-between items-center">
        <h2 className="font-bold text-lg">Tarifas de Envío</h2>
        <button
          className="text-black-600 bg-yellow-200 transition-all py-1 px-3 rounded-full"
          onClick={() => setOpenShippingEditor(true)}
        >
          Editar Tarifas de Envío
        </button>
      </div>

      {/** Mostrar las tarifas existentes */}
      <div className="p-4 flex flex-wrap gap-4">
        {shippingRates && shippingRates.map((rate, index) => (
          <div key={index} className="border p-2 rounded">
            <p>
              <strong>{rate.city}</strong>: {rate.default}
            </p>
            {rate.neighborhoods && Object.keys(rate.neighborhoods).length > 0 && (
              <ul>
                {Object.keys(rate.neighborhoods).map((nb, i) => (
                  <li key={i}>
                    {nb}: {rate.neighborhoods[nb]}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/** Modal para editar/actualizar tarifas de envío */}
      {openShippingEditor && (
        <AdminShippingRatesEditor
          onClose={() => {
            setOpenShippingEditor(false);
            fetchShippingRates();
          }}
          fetchData={fetchShippingRates}
        />
      )}
    </div>
  );
};

export default AllShippingRates;
