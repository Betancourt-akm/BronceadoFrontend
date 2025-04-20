const backendDomain = 'https://bronceadospabronze.onrender.com';
// Cambia esta URL según necesites https://fourrent-dq5t.onrender.com
if (!backendDomain) {
    throw new Error("REACT_APP_BACKEND_URL no está definido en las variables de entorno.");
}
const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "POST",
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "POST",
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "GET",
        credentials: "include", 
      
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "GET",
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: "GET",
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "POST",
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "POST",
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "GET",
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "POST",
    },
    deleteProduct: {
        url: `${backendDomain}/api/product`, 
        method: "DELETE",
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "GET",
    },
    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: "POST",
    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: "POST",
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "POST",
    },
    addToCartProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "GET",
        credentials: "include", 
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-cart-product`,
        method: "GET",
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "POST",
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "POST",
    },
    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "GET",
    },
    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "POST",
    },

    createOrder: {
        url: `${backendDomain}/api/payment/create-order`,
        method: "POST",
      },
      captureOrder: {
        url: `${backendDomain}/api/payment/capture-order`,
        method: "POST",
      },
      cancelPayment: {
        url: `${backendDomain}/api/payment/cancel-payment`,
        method: "GET",
      },

//   confirmPayment: {
//     url: `${backendDomain}/api/confirm-payment`,
//     method: "GET",
//   },
//   getTransactionDetails: (referenceCode) => ({
//     url: `${backendDomain}/api/transaction/${referenceCode}`,
//     method: "GET",
//   }),

  formSubmit: {
    url: `${backendDomain}/api/forma`,
    method: "POST",
  },

  shippingRates: {
    url: `${backendDomain}/api/shippingRates`,
    method: "GET",
  },
  updateShippingRates: {
    url: `${backendDomain}/api/shippingRates`,
    method: "PUT",
  },

    createTransaction: {
        url: `${backendDomain}/api/transactions`,
        method: "POST",
      },
      getTransactionDetails: {
        url: `${backendDomain}/api/transactions`,
        method: "GET",
      },
      
      allReservas: {
        url: `${backendDomain}/api/transactions`, 
        method: "GET",
      },
      deleteReserva: {
        url: `${backendDomain}/api/transactions`, 
        method: "DELETE",
      },
      allVentas: {
        url: `${backendDomain}/api/transactions`, 
        method: "GET",
      },
      deleteVenta: {
        url: `${backendDomain}/api/transactions`, 
        method: "DELETE",
      },
};

export default SummaryApi;
