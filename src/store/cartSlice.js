// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Lista de productos en el carrito
  shippingInfo: null, // Información de envío global
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Verificar si el producto ya está en el carrito
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      if (existingItem) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        // Si no está, agregar el producto al carrito con la cantidad inicial
        state.cartItems.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
    },
    removeFromCart: (state, action) => {
      // Elimina un producto por su ID
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    updateCartQuantity: (state, action) => {
      // Actualiza la cantidad de un producto en el carrito
      const { productId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    clearCart: (state) => {
      // Limpia el carrito y la información de envío
      state.cartItems = [];
      state.shippingInfo = null;
    },
    setShippingInfo: (state, action) => {
      // Establece la información de envío global
      state.shippingInfo = action.payload;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  setShippingInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
