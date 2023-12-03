import React from 'react';
import { useGetAllProductsQuery } from '../features/productsAPI';

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  return (
    <h2>Home</h2>
  );
}
 
export default Home;