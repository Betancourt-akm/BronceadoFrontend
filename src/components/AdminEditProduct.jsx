import React, { useState, useEffect } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify';
import productCategory from '../helpers/productCategory';

const AdminEditProduct = ({ onClose, productData, fetchdata }) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName || '',
    brandName: productData?.brandName || '',
    category: productData?.category || '',
    productImage: productData?.productImage || [],
    description: productData?.description || '',
    price: productData?.price || 0,
    sellingPrice: productData?.sellingPrice || 0,
    stock: productData?.stock || 0,
    // Nuevos campos para detalles del servicio
    serviceDuration: productData?.serviceDuration || '',
    serviceIncludes: productData?.serviceIncludes || '',
    serviceRecommendations: productData?.serviceRecommendations || '',
    serviceIntensity: productData?.serviceIntensity || '',
    serviceAdditionalBenefits: productData?.serviceAdditionalBenefits || '',
    serviceRecommendedFrequency: productData?.serviceRecommendedFrequency || '',
    serviceDiscountsPromotions: productData?.serviceDiscountsPromotions || '',
  });

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newProductImage }));
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmDelete) return;
    const response = await fetch(`${SummaryApi.deleteProduct.url}/${productData._id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    } else {
      toast.error(responseData?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchdata();
    } else {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg">Editar producto/ Servicio</h2>
          <div className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer" onClick={onClose}>
            <CgClose />
          </div>
        </div>
        <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
          {/* Campos básicos del producto */}
          <label htmlFor="productName">Nombre del producto / servicio:</label>
          <input
            type="text"
            id="productName"
            placeholder="Ingresa el nombre"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="brandName" className="mt-3">Marca :</label>
          <input
            type="text"
            id="brandName"
            placeholder="Ingresa la marca"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="category" className="mt-3">Categoría :</label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
          >
            <option value="">Seleccionar Categoría</option>
            {productCategory.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.label}</option>
            ))}
          </select>
          <label htmlFor="stock" className="mt-3">Stock :</label>
          <input
            type="number"
            id="stock"
            placeholder="Ingresa la cantidad en stock"
            name="stock"
            value={data.stock}
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
          />
          <label htmlFor="productImage" className="mt-3">Producto Imagen :</label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                <span className="text-4xl"><FaCloudUploadAlt /></span>
                <p className="text-sm">Subir Imagen del Producto</p>
                <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct} />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2 flex-wrap">
                {data.productImage.map((el, index) => (
                  <div className="relative group" key={index}>
                    <img
                      src={el}
                      alt={`Imagen ${index + 1}`}
                      width={80}
                      height={80}
                      className="bg-slate-100 border cursor-pointer object-cover"
                      onClick={() => {
                        setOpenFullScreenImage(true);
                        setFullScreenImage(el);
                      }}
                    />
                    <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer" onClick={() => handleDeleteProductImage(index)}>
                      <MdDelete />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-600 text-xs">*Por favor sube una imagen del producto</p>
            )}
          </div>
          <label htmlFor="price" className="mt-3">Precio :</label>
          <input
            type="number"
            id="price"
            placeholder="Ingresa el precio"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
            min="0"
            step="any"
          />
          <label htmlFor="sellingPrice" className="mt-3">Precio de venta :</label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="Ingresa el precio de venta"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 bg-slate-100 border rounded"
            required
            min="0"
            step="any"
          />
          <label htmlFor="description" className="mt-3">Descripción :</label>
          <textarea
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Ingresa la descripción del producto o servicio"
            rows={3}
            name="description"
            onChange={handleOnChange}
            value={data.description}
          ></textarea>
          <div className="mt-5 border-t pt-3">
            <h3 className="font-bold text-lg mb-2">Detalles del Servicio</h3>
            <label htmlFor="serviceDuration">Duración (minutos):</label>
            <input
              type="number"
              id="serviceDuration"
              placeholder="Ej: 120"
              name="serviceDuration"
              value={data.serviceDuration}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
              min="0"
            />
            <label htmlFor="serviceIncludes" className="mt-3">Incluye:</label>
            <textarea
              id="serviceIncludes"
              placeholder="Ej: Bikini de cinta adhesiva, exfoliación, hidratación"
              name="serviceIncludes"
              value={data.serviceIncludes}
              onChange={handleOnChange}
              className="h-20 bg-slate-100 border resize-none p-1"
              required
            ></textarea>
            <label htmlFor="serviceRecommendations" className="mt-3">Recomendaciones:</label>
            <textarea
              id="serviceRecommendations"
              placeholder="Ej: Hidratarse bien antes de la sesión, evitar ducharse en las primeras 8 horas después del spray tan"
              name="serviceRecommendations"
              value={data.serviceRecommendations}
              onChange={handleOnChange}
              className="h-20 bg-slate-100 border resize-none p-1"
              required
            ></textarea>
            <label htmlFor="serviceIntensity" className="mt-3">Nivel de intensidad:</label>
            <select
              id="serviceIntensity"
              name="serviceIntensity"
              value={data.serviceIntensity}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
            >
              <option value="">Seleccionar intensidad</option>
              <option value="ligero">Ligero</option>
              <option value="medio">Medio</option>
              <option value="intenso">Intenso</option>
            </select>
            <label htmlFor="serviceAdditionalBenefits" className="mt-3">Beneficios adicionales:</label>
            <textarea
              id="serviceAdditionalBenefits"
              placeholder="Ej: Hidratación profunda, reducción de líneas de expresión, aclarado de vellos"
              name="serviceAdditionalBenefits"
              value={data.serviceAdditionalBenefits}
              onChange={handleOnChange}
              className="h-20 bg-slate-100 border resize-none p-1"
              required
            ></textarea>
            <label htmlFor="serviceRecommendedFrequency" className="mt-3">Frecuencia recomendada:</label>
            <input
              type="text"
              id="serviceRecommendedFrequency"
              placeholder="Ej: Cada 2-3 semanas"
              name="serviceRecommendedFrequency"
              value={data.serviceRecommendedFrequency}
              onChange={handleOnChange}
              className="p-2 bg-slate-100 border rounded"
              required
            />
            <label htmlFor="serviceDiscountsPromotions" className="mt-3">Descuentos o promociones:</label>
            <textarea
              id="serviceDiscountsPromotions"
              placeholder="Ej: Paquetes o precios especiales por sesiones múltiples"
              name="serviceDiscountsPromotions"
              value={data.serviceDiscountsPromotions}
              onChange={handleOnChange}
              className="h-20 bg-slate-100 border resize-none p-1"
              required
            ></textarea>
          </div>

          <div className="flex justify-between items-center mt-5">
            <button className="px-3 py-2 bg-red-600 text-white hover:bg-red-700" type="submit">
              Actualizar Producto / Servicio
            </button>
            <button className="px-3 py-2 bg-red-600 text-white hover:bg-red-700" type="button" onClick={handleDeleteProduct}>
              Eliminar Producto / Servicio
            </button>
          </div>
        </form>
      </div>
      {openFullScreenImage && (
        <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
      )}
    </div>
  );
};

export default AdminEditProduct;
