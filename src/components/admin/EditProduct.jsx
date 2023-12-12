import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton } from './CommonStyled';
import { productsEdit } from '../../features/productsSlice';

export default function EditProduct({prodId}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);

  const [currentProd, setCurrentProd] = React.useState({});
  const [previewImg, setPreviewImg] = React.useState('');

  const [productImg, setProductImg] = React.useState("");
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [desc, setDesc] = React.useState("");

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
        setPreviewImg(reader.result);
      };
    } else {
      setProductImg("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(productsEdit({
      productImg,
      product:{
        ...currentProd,
        name: name,
        price: price,
        desc: desc
      }
    }))
  }

  const handleClickOpen = () => {
    setOpen(true);

    let selectedProd = items.filter((item) => item._id === prodId);
    selectedProd = selectedProd[0];

    setCurrentProd(selectedProd);
    setPreviewImg(selectedProd.image.url);
    setProductImg('');
    setName(selectedProd.name);
    setPrice(selectedProd.price);
    setDesc(selectedProd.desc);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Edit onClick={handleClickOpen}>
        Edit
      </Edit>
      <Dialog open={open} onClose={handleClose} fullWidth = {true} maxWidth={'md'}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <StyledCreateProduct>
            <StyledForm onSubmit={handleSubmit}>
              <input
                type="file"
                accept="image/"
                onChange={handleProductImageUpload}
              />
              <input
                type="text"
                required
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Short Description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <PrimaryButton type="submit">
                Submit
              </PrimaryButton>
            </StyledForm>
            <ImagePreview>
              {previewImg ? (
                <img src={previewImg} alt="productimage" />
              ) : (
                <p>Image Preview</p>
              )}
            </ImagePreview>
          </StyledCreateProduct>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const Edit = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`

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