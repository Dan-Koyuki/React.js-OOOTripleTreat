import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import productsReducer, { productsFetch } from './features/productsSlice';
import cartReducer, { getTotals } from './features/cartSlice';
import authReducer, { loadUser } from './features/authSlice';
import ordersReducer from './features/ordersSlice';
import usersSlice from './features/usersSlice';

const store = configureStore({
  reducer:{
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
    users: usersSlice
  }
})

store.dispatch(productsFetch());
store.dispatch(getTotals());
store.dispatch(loadUser());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
