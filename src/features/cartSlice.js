import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItem: localStorage.getItem("cartItems") ?  JSON.parse(localStorage.getItem("cartItems")) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action){
      const itemIndex = state.cartItem.findIndex(item => item.id === action.payload.id);

      if (itemIndex >= 0){
        state.cartItem[itemIndex].cartQuantity += 1;
        toast.info("Product quantity has been increased.", {
          position: "bottom-left"
        });
      } else {
        const tempProduct = {...action.payload, cartQuantity: 1};
        state.cartItem.push(tempProduct);
        toast.success(`${action.payload.name} has been added to your cart.`, {
          position: "bottom-left"
        });
      }
      
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    removeFromCart(state, action){
      const nextCartItems = state.cartItem.filter(
        item => item.id !== action.payload.id
      )

      state.cartItem = nextCartItems;

      localStorage.setItem("cartItems", JSON.stringify(state.cartItem))

      toast.error(`${action.payload.name} has been removed to your cart.`, {
        position: "bottom-left"
      });
    },
    decreaseCart(state, action){
      const itemIndex = state.cartItem.findIndex(
        item => item.id === action.payload.id
      )

      if(state.cartItem[itemIndex].cartQuantity > 1){
        state.cartItem[itemIndex].cartQuantity -= 1;
        toast.info("Product quantity has been decreased.", {
          position: "bottom-left"
        });
      } else if (state.cartItem[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItem.filter(
          item => item.id !== action.payload.id
        )
  
        state.cartItem = nextCartItems;

        toast.error(`${action.payload.name} has been removed to your cart.`, {
          position: "bottom-left"
        });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    clearCart(state, action){
      state.cartItem = []
      toast.error(`Cart has been cleared.`, {
        position: "bottom-left"
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },
    getTotals(state, action){
      let {total, quantity} = state.cartItem.reduce((cartTotal, item) => {
        const { price, cartQuantity } = item;
        const itemTotal = price * cartQuantity;

        cartTotal.total += itemTotal;
        cartTotal.quantity += cartQuantity;

        return cartTotal;
      }, {
        total: 0,
        quantity: 0
      });

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  }
});

export const { addToCart, removeFromCart, decreaseCart, clearCart, getTotals } = cartSlice.actions;

export default cartSlice.reducer;