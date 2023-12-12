import React, { useState } from "react";
import styled from "styled-components";
import { PrimaryButton } from "./CommonStyled";
import { useDispatch } from 'react-redux'
import { productsCreate } from "../../features/productsSlice";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productImg, setProductImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];

    transformFile(file);
  };

  const transformFile = (file) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setProductImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(productsCreate({
      name,
      price,
      desc,
      image: productImg
    }))

    navigate('/admin-dashboard/products/create-products');
  }

  return (
    <StyledCreateProduct>
      <StyledForm onSubmit={handleSubmit}>
        <h3>Create Product</h3>
        <input
          type="file"
          required
          accept="image/"
          onChange={handleProductImageUpload}
        />
        <input
          type="text"
          required
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          required
          placeholder="desc"
          onChange={(e) => setDesc(e.target.value)}
        />
        <PrimaryButton type="submit">
          Submit
        </PrimaryButton>
      </StyledForm>
      <ImagePreview>
        {productImg ? (
          <img src={productImg} alt="productimage" />
        ) : (
          <p>Image Preview</p>
        )}
      </ImagePreview>
    </StyledCreateProduct>
  );
};

export default CreateProduct;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin-top: 2rem;

  select,
  input {
    padding: 7px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }

  select {
    color: rgb(95, 95, 95);
  }
`;

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImagePreview = styled.div`
  margin: 2rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  max-width: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgb(78, 78, 78);

  img {
    max-width: 100%;
  }
`;
