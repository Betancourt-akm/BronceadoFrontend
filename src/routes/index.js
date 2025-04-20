import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ForgotPassword from '../pages/ForgotPassword';
import SignUp from '../pages/SignUp';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import AllReservas from '../pages/AllReservas';
import AllVentas from '../pages/AllVentas';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import NotFound from '../pages/NotFound';

import Reservar from '../pages/Reservar';
import Nosotros from '../pages/Nosotros';
import Contacto from '../pages/Contacto';
import PaymentSuccess from '../pages/PaymentSuccess';
import PaymentResponse from '../pages/PaymentResponse';
import PaymentFailure from '../pages/PaymentFailure';
import Productos from '../pages/Productos';
import CancelPayment from '../pages/CancelPayment';
import Perfil from '../pages/Perfil';

import Servicios from '../pages/Servicios';
import Blog from '../pages/Blog';
import AllShippingRates from "../pages/AllShippingRates";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },

         
            {
                path: "Reservar",
                element: <Reservar />
            },
            {
                path: "NotFound",
                element: <NotFound />
            },
            {
                path: "*",
                element: <NotFound />
              },
            {
                path: "nosotros",
                element: <Nosotros />
            },
           
            
            {path: "productos",
                element: <Productos/>
            },
            {
path: "Servicios",
element: <Servicios/>
            },
            {
                path: "blog",
                element: <Blog/>
            },
            {
                path: "sign-up",
                element: <SignUp />
            },
            {
                path: "perfil",
                element: <Perfil />
            },
            {
                path: "product-category",
                element: <CategoryProduct />
            },
            {
                path: "product/:id",
                element: <ProductDetails />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "payment-success",
                element: <PaymentSuccess />
            },
            {
                path: "payment-response",
                element: <PaymentResponse />
            },
            {
                path: "cancel-order",
                element: <CancelPayment />
            },
            {
                path: "payment-failure",
                element: <PaymentFailure />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
     
           
            {
                path: "contacto",
                element: (
                  <>
                    <Contacto />
                  </>
                )
              },
            
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers />
                    },
                    {
                        path: "all-products",
                        element: <AllProducts />
                    },
                    {
                        path: "all-reservas",
                        element: <AllReservas />
                    },
                    {
                        path: "all-Ventas",
                        element: <AllVentas />
                    },
                    {
                        path: "all-shipping-rates",
                        element: <AllShippingRates />
                    }
                ]
            },
        ]
    }
]);

export default router;
