import React from 'react';
import { useGetAllProductsQuery } from '../features/productsAPI';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { data, error, isLoading } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(data);

  const handleAddtoCart = (product) => {
    dispatch(addToCart(product));
    navigate('/cart');
  }

  return (
    <div className="product-container">
      { isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>Products</h2>
          <div className="products">
            {data?.map( product => <div key={product.id} className="product">
              <h3>{product.name}</h3>
              <img src={product.image} alt={product.name}/>
              <div className="details">
                <span className='desc'>{product.desc}</span>
                <span className='price'>${product.price}</span>
              </div>
              <button onClick={() => handleAddtoCart(product)}>
                Add To Cart
              </button>
            </div>)}
          </div>
        </>
      )}
    </div>
  );
}
 
export default Home;