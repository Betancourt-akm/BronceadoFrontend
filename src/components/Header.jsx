import React, { useContext, useState } from 'react';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Button,
} from '@mui/material';
import { GrSearch } from 'react-icons/gr';
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FaRegCircleUser } from 'react-icons/fa6';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { setUserDetails } from '../store/userSlice';
import Context from '../context/index';
import Logo from './Logo';
import DropdownProducts from './DropdownProducts'; // Importa el componente DropdownProducts
import './Header.css';

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [search, setSearch] = useState({ query: '' });

  // Función para hacer logout
  const handleLogout = async () => {
    try {
      const response = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: 'include',
      });
      const dataResp = await response.json();
      if (dataResp.success) {
        toast.success(dataResp.message);
        dispatch(setUserDetails(null));
        navigate('/');
      } else if (dataResp.error) {
        toast.error(dataResp.message);
      }
    } catch (error) {
      console.error('Error al hacer logout:', error);
      toast.error('Error al cerrar sesión.');
    }
  };

  // Función para manejar la búsqueda
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.query) params.append('q', search.query);
    params.append('description', true);
    navigate(`/search?${params.toString()}`);
  };

  // Alterna la visibilidad del Drawer en mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer para navegación en mobile
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', color: 'black' }}>
      <RouterLink to="/" style={{ textDecoration: 'none' }}>
        <Logo />
      </RouterLink>
      <Divider />
      <ul className="mobile-navigation">
        <li>
          <NavLink to="/">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/nosotros">Nosotros</NavLink>
        </li>
        <li>
          <NavLink to="/servicios">Servicios</NavLink>
        </li>
        <li>
          <NavLink to="/productos">Productos</NavLink>
        </li>
      </ul>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="static" sx={{ bgcolor: 'white', height: '72px' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Botón para abrir el Drawer en mobile */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ color: 'black', mr: 2, display: { sm: 'none' } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </RouterLink>

          {/* Menú de navegación para pantallas grandes */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', color: 'black' }}>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ textTransform: 'none', fontSize: '1rem', color: 'black' }}>
                Inicio
              </Button>
            </NavLink>
            <NavLink to="/servicios" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ textTransform: 'none', fontSize: '1rem', color: 'black' }}>
                Servicios de Spa
              </Button>
            </NavLink>
            <NavLink to="/productos" style={{ textDecoration: 'none' }}>
              <Button color="inherit" sx={{ textTransform: 'none', fontSize: '1rem', color: 'black' }}>
                Productos
              </Button>
            </NavLink>
            {/* Se integra el componente DropdownProducts para mostrar más servicios y se le asigna una clase para mantener los estilos */}
            <DropdownProducts category="Servicios" />
          </Box>

          {/* Acciones del header: usuario, carrito y autenticación */}
          <div className="header-actions" style={{ display: 'flex', alignItems: 'center' }}>
            {user?._id && (
              <div
                className="user-icon"
                onClick={() => setMenuDisplay((prev) => !prev)}
                style={{ cursor: 'pointer', position: 'relative', marginRight: '16px' }}
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user?.name || 'Profile'}
                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  />
                ) : (
                  <FaRegCircleUser size={40} />
                )}
                {menuDisplay && (
                  <div
                    className="menu-dropdown"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '45px',
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '10px',
                      zIndex: 1000,
                    }}
                  >
                    {user.role === 'ADMIN' ? (
                      <>
                        <RouterLink
                          to="/admin-panel/all-products"
                          onClick={() => setMenuDisplay(false)}
                          style={{ display: 'block', padding: '8px 0', textDecoration: 'none', color: 'black' }}
                        >
                          Admin
                        </RouterLink>
                        <RouterLink
                          to="/admin-panel/all-reservas"
                          onClick={() => setMenuDisplay(false)}
                          style={{ display: 'block', padding: '8px 0', textDecoration: 'none', color: 'black' }}
                        >
                          Reservas
                        </RouterLink>
                        <RouterLink
                          to="/admin-panel/all-Ventas"
                          onClick={() => setMenuDisplay(false)}
                          style={{ display: 'block', padding: '8px 0', textDecoration: 'none', color: 'black' }}
                        >
                          Ventas
                        </RouterLink>
                        <RouterLink
                          to="/admin-panel/all-users"
                          onClick={() => setMenuDisplay(false)}
                          style={{ display: 'block', padding: '8px 0', textDecoration: 'none', color: 'black' }}
                        >
                          Usuarios
                        </RouterLink>
                      </>
                    ) : (
                      <>
                        <RouterLink
                          to="/profile"
                          onClick={() => setMenuDisplay(false)}
                          style={{ display: 'block', padding: '8px 0', textDecoration: 'none', color: 'black' }}
                        >
                          Mi Perfil
                        </RouterLink>
                        <RouterLink
                          to="/orders"
                          onClick={() => setMenuDisplay(false)}
                          style={{ display: 'block', padding: '8px 0', textDecoration: 'none', color: 'black' }}
                        >
                          Mis Reservas
                        </RouterLink>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
            {user?._id && (
              <RouterLink
                to="/cart"
                className="cart-link"
                style={{ position: 'relative', marginRight: '16px', color: 'black' }}
              >
                <LiaShoppingBagSolid size={24} />
                {context?.cartProductCount > 0 && (
                  <div
                    className="cart-count"
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      right: '-10px',
                      backgroundColor: 'red',
                      color: 'white',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                    }}
                  >
                    {context.cartProductCount}
                  </div>
                )}
              </RouterLink>
            )}
            <div className="auth-button">
              {user?._id ? (
                <button
                  onClick={handleLogout}
                  style={{
                    border: 'none',
                    cursor: 'pointer',
                    color: "var(--text-color)",
                    fontSize: '1rem',
                    padding: '6px 12px',
                  }}
                >
                  Logout
                </button>
              ) : (
                <RouterLink
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    color: "var(--text-color)",
                    fontSize: '1rem',
                    padding: '6px 12px',
                  }}
                >
                  Login
                </RouterLink>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* Barra de búsqueda */}
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
          padding: '10px',
          justifyContent: 'center',
          borderBottom: '1px solid #ccc',
        }}
      >
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar en Spa Bronze..."
            className="search-input"
            onChange={(e) => setSearch({ ...search, query: e.target.value })}
            value={search.query}
          />
          <div className="search-button" onClick={handleSearch}>
            <GrSearch />
          </div>
        </div>
      </Box>

      {/* Drawer para mobile */}
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '220px', color: 'black' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Header;
