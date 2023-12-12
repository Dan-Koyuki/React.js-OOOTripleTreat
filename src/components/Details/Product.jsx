import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import { setHeaders, url } from '../../features/api';
import { useDispatch } from "react-redux";
import { addToCart } from '../../features/cartSlice';

const Product = () => {

  const params = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${url}/products/find/${params.id}`, setHeaders());

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <StyledProduct>
      <ProductContainer>
        <ImageConteiner>
          <img src={product.image?.url} alt="product" />
        </ImageConteiner>
        <ProductDetails>
          <h3>{product.name}</h3>
          <p><span>Description:</span> {product.desc}</p>
          <Price>${product.price?.toLocaleString()}</Price>
          <button className="product-add-to-cart" onClick={() => handleAddToCart(product)}> Add to Cart </button>
        </ProductDetails>
      </ProductContainer>
    </StyledProduct>
  );
}
 
export default Product;

const StyledProduct = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const ProductContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const ImageConteiner = styled.div`
  flex: 1;
  img{
    width: 100%;
  }
`;

const ProductDetails = styled.div`
  flex: 2;
  margin-left: 2rem;
  h3{
    font-size: 35px;
  }
  p span{
    font-weight: bold;
  }
`;

const Price = styled.div`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 25px;
`