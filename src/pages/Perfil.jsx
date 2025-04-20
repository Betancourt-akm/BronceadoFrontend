import React, { useContext } from "react";
import Context from "../context";
import "./Perfil.css";

const Perfil = () => {
  const { userDetails } = useContext(Context);

  if (!userDetails) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="loader mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">
            Cargando datos del usuario...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Perfil del Usuario</h1>

        <div className="flex flex-col sm:flex-row items-center sm:items-start">
          {/* Imagen de perfil */}
          {/* <div className="w-32 h-32 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
            <img
              src={userDetails.profilePic || "https://via.placeholder.com/150"}
              alt="Imagen de perfil"
              className="w-full h-full object-cover"
            />
          </div>

   
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Nombre</h2>
              <p className="text-gray-600">{user.name || "No especificado"}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Correo Electrónico</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">tel</h2>
              <p className="text-gray-600">{user.tel}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-700">Rol</h2>
              <p className="text-gray-600">{user.role || "Usuario"}</p>
            </div>
          </div>
        </div>
      </div>  */}
    </div>
  );
};

export default Perfil;
