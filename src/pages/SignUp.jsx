// SignUp.js
import { useState } from 'react';
import loginIcons from '../assest/signin.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import './SignUp.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    tel: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imagePic = await imageTobase64(file);
      setData((prev) => ({
        ...prev,
        profilePic: imagePic,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Las contraseñas no coinciden.");
    }
  };

  return (
    <section id="signup">
      <div className="container mx-auto p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          {/* Contenedor de la imagen ajustado */}
          <div className="flex flex-col items-center my-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden">
              <img
                src={data.profilePic || loginIcons}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <label>
                <div className="absolute bottom-0 w-full bg-opacity-80 bg-gray-200 text-center py-1 cursor-pointer text-xs">
                  Subir foto
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            </div>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Nombre :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid">
              <label>Correo electrónico :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">

              <label>Celular :</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="tel"
                  placeholder="Ingresa tu número de celular"
                  name="tel"
                  value={data.tel}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Contraseña :</label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  value={data.password}
                  name="password"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div className="cursor-pointer text-xl ml-2" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <div>
              <label>Confirmar contraseña :</label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirma tu contraseña"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div className="cursor-pointer text-xl ml-2" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button className="signup-button hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Registrarse
            </button>
          </form>

          <p className="my-5 text-center">
            ¿Ya tienes una cuenta? <Link to="/login" className="text-red-600 hover:text-red-700 hover:underline">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
