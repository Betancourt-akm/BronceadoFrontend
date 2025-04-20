// src/components/AdminProductCard.js

import React, { useState } from 'react';
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import { toast } from 'react-toastify';
import SummaryApi from '../common/index';
import PropTypes from 'prop-types';
import displayCOPCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({ data, fetchdata }) => {
    const [editProduct, setEditProduct] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false); // Estado de carga para eliminación

    // Función para eliminar un producto
    const handleDeleteProduct = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (!confirmDelete) return;

        setLoadingDelete(true); // Mostrar que se está procesando la eliminación

        try {
            // Verificar que el ID del producto esté presente
            if (!data?._id) {
                toast.error("ID de producto no disponible");
                setLoadingDelete(false);
                return;
            }

            // Enviar la solicitud DELETE al backend con el ID del producto y las credenciales (cookies)
            const response = await fetch(`${SummaryApi.deleteProduct.url}/${data._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Incluir las cookies en la solicitud
            });

            const responseData = await response.json(); // Convertir la respuesta en JSON

            if (response.ok) {
                toast.success("Producto eliminado con éxito");
                fetchdata(); // Actualizar la lista de productos después de eliminar
            } else {
                console.error('Error del servidor:', responseData);
                toast.error(responseData.message || "Error al eliminar el producto");
            }
        } catch (error) {
            toast.error("Error al eliminar el producto");
            console.error("Error eliminando el producto:", error);
        } finally {
            setLoadingDelete(false); // Restaurar el estado de carga
        }
    };

    return (
        <div className='bg-white p-4 rounded shadow-md'>
            <div className='w-40 mx-auto'>
                <div className='w-32 h-32 flex justify-center items-center mb-4'>
                    {data?.productImage?.[0] ? (
                        <img 
                            src={data.productImage[0]} 
                            className='mx-auto object-cover h-full rounded' 
                            alt={data?.productName || 'Producto'} 
                        />
                    ) : (
                        <p>No Image Available</p>
                    )}
                </div>
                <h1 className='text-ellipsis line-clamp-2 font-semibold text-center'>{data?.productName || 'Producto'}</h1>

                {/* Mostrar el Stock */}
                <p className={`mt-2 text-center ${data.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.stock > 0 ? `Stock Disponible: ${data.stock}` : 'Producto Agotado'}
                </p>

                <div className='mt-2 text-center'>
                    <p className='font-semibold text-lg'>
                        {displayCOPCurrency(data.sellingPrice || 0)} COP
                    </p>
                </div>

                <div className='flex justify-center mt-4 gap-4'>
                    {/* Botón de editar */}
                    <div 
                        className='p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' 
                        onClick={() => setEditProduct(true)}
                        title="Editar Producto"
                    >
                        <MdModeEditOutline size={20} />
                    </div>

                    {/* Botón de eliminar */}
                    <div 
                        className={`p-2 bg-red-100 hover:bg-red-600 rounded-full hover:text-white cursor-pointer ${loadingDelete ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        onClick={!loadingDelete ? handleDeleteProduct : null} // Deshabilitar si está cargando
                        title="Eliminar Producto"
                    >
                        <MdDelete size={20} />
                    </div>
                </div>
            </div>

            {editProduct && (
                <AdminEditProduct 
                    productData={data} 
                    onClose={() => setEditProduct(false)} 
                    fetchdata={fetchdata} 
                />
            )}
        </div>
    );
};

// Definición de PropTypes para validar las propiedades recibidas
AdminProductCard.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        productImage: PropTypes.arrayOf(PropTypes.string),
        productName: PropTypes.string,
        sellingPrice: PropTypes.number,
        stock: PropTypes.number, // Asegúrate de que 'stock' esté definido
    }).isRequired,
    fetchdata: PropTypes.func.isRequired,
};

export default AdminProductCard;
