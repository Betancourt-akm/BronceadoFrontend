import React, { createContext, useState, useEffect, useCallback } from 'react';
import SummaryApi from '../common';
import { useNavigate } from 'react-router-dom';

const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Respuesta de fetchUserDetails:', data);

      if (response.ok /* && data?.data */) {
        // Ajusta según el shape que devuelva tu backend
        setUserDetails(data.data || data);
      } else {
        console.error('Error al obtener los detalles del usuario:', data.message || data);
        setUserDetails(null);
      }
    } catch (error) {
      console.error('Error al obtener los detalles del usuario:', error);
      setUserDetails(null);
    }
  }, []);

  /**
   * Función para obtener los ítems del carrito (ruta protegida).
   */
  const fetchUserAddToCart = useCallback(async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // Authorization si fuera necesario
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log('fetchUserAddToCart:', data);

      if (response.ok && data?.data) {
        setCartItems(data.data);
      } else {
        console.error('Error al obtener los ítems del carrito:', data);
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error al obtener los ítems del carrito:', error);
      setCartItems([]);
    }
  }, []);

  /**
   * Función para agregar un producto al carrito.
   * Esta función realiza la llamada al backend y actualiza el estado local para reflejar el cambio.
   */
  const addToCart = async (product) => {
    try {
      const response = await fetch(SummaryApi.addToCartProduct.url, {
        method: SummaryApi.addToCartProduct.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id }),
      });

      const data = await response.json();
      console.log('Producto agregado:', data);

      if (response.ok && data?.data) {
        // Actualiza el estado agregando el nuevo producto
        setCartItems((prevCart) => [...prevCart, data.data]);
      } else {
        console.error('Error al agregar el producto:', data.message || data);
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error);
    }
  };

  /**
   * Al montar el componente, obtenemos el usuario y el carrito (si existe).
   */
  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [fetchUserDetails, fetchUserAddToCart]);

  return (
    <Context.Provider
      value={{
        userDetails,
        setUserDetails,
        cartItems,
        setCartItems,
        fetchUserDetails,
        fetchUserAddToCart,
        addToCart, // Función para agregar productos al carrito
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Context;
