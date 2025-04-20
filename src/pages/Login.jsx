import React, { useContext, useState } from 'react';
import loginIcons from '../assest/signin.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import './Login.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataResponse = await fetch(SummaryApi.signIn.url, {
                method: SummaryApi.signIn.method,
                credentials: 'include', // Aseguramos que las cookies se incluyan
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const dataApi = await dataResponse.json();

            if (dataResponse.ok && dataApi.success) {
                // Login exitoso
                toast.success(dataApi.message);
                // Actualizamos los detalles del usuario y del carrito
                await fetchUserDetails();
                await fetchUserAddToCart();
                // Redirigimos al usuario a la página principal
                navigate('/');
            } else {
                // Manejo de errores
                toast.error(dataApi.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error en la solicitud de login:', error);
            toast.error('Error en la solicitud de login');
        }
    };

    console.log("data login", data);

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    {/* Ajustamos el contenedor de la imagen */}
                    <div className='flex justify-center my-4'>
                        <img src={loginIcons} alt='login icons' className='w-20 h-20' />
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label> Correo electrónico : </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='Ingresa tu correo electrónico'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Contraseña : </label>
                            <div className='bg-slate-100 p-2 flex items-center'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Ingresa tu contraseña'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl ml-2' onClick={() => setShowPassword((prev) => !prev)}>
                                    <span>
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>

                        <button className='login-button hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
                            Iniciar sesión
                        </button>
                    </form>

                    <p className='my-5 text-center'>
                        ¿No tienes una cuenta? <Link to={"/sign-up"} className='text-red-600 hover:text-red-700 hover:underline'>Regístrate</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
