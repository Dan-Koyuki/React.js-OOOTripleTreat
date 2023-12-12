import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from "../features/cartSlice";
import PayButton from "./PayButton";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log("cart item:", cart.cartItem);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch])

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handledIncreaseCart = (cartItem) => {
    dispatch(addToCart(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItem.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <div className="start-shopping">
            <Link to={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.cartItem?.map(item => (
              <div className="cart-item" key = {item._id}>
                <div className="cart-product">
                  <img src={item.image.url} alt={item.name} />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
                  </div>
                </div>
                <div className="cart-product-price">${item.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => handleDecreaseCart(item)}>-</button>
                  <div className="count">{item.cartQuantity}</div>
                  <button onClick={() => handledIncreaseCart(item)}>+</button>
                </div>
                <div className="cart-product-total-price">${item.price * item.cartQuantity}</div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button onClick={() => handleClearCart()} className="clear-cart">Clear Cart</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.cartTotalAmount}</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <PayButton cartItem = {cart.cartItem}/>
              <div className="continue-shopping">
                <Link to={"/"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
