import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SummaryApi from '../common';
import VerticalCard from '../components/VerticalCard';

const SearchProduct = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Se obtiene el término de búsqueda desde la URL (por ejemplo, ?q=tuBusqueda)
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const fetchProduct = async () => {
    setLoading(true);
    try {
      // Construye la URL con los parámetros de búsqueda.
      // Aquí, si existe un término en "q", se agrega también "description=true"
      // para que el backend busque en ambos campos: nombre y descripción.
      let searchUrl = `${SummaryApi.searchProduct.url}?`;
      if (searchQuery) {
        searchUrl += `q=${encodeURIComponent(searchQuery)}&description=true&`;
      }

      // Se elimina el último '&' en caso de que exista
      searchUrl = searchUrl.endsWith('&') ? searchUrl.slice(0, -1) : searchUrl;

      const response = await fetch(searchUrl);
      const dataResponse = await response.json();
      setData(dataResponse.data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [location.search]);

  return (
    <div className='container mx-auto p-4'>
      {loading && <p className='text-lg text-center'>Cargando ...</p>}
      <p className='text-lg font-semibold my-3'>
        Resultados de la búsqueda: {data.length}
      </p>
      {data.length === 0 && !loading && (
        <p className='bg-white text-lg text-center p-4'>No encontrado....</p>
      )}
      {data.length !== 0 && !loading && <VerticalCard loading={loading} data={data} />}
    </div>
  );
};

export default SearchProduct;
