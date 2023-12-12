import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NonFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import CheckoutSuccess from './components/CheckoutSuccess';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Summary from './components/admin/Summary';
import CreateProduct from './components/admin/CreateProduct';
import AdminRoute from './components/auth/AdminRoute';
import ProductsList from './components/admin/list/ProductsList';
import Users from './components/admin/Users';
import Orders from './components/admin/Orders';
import Product from './components/Details/Product';
import Order from './components/Details/Order';
import UserProfile from './components/Details/UserProfile';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />}/>
          <Route path='/cart' element={<Cart /> } />
          <Route path='/about' element={<About />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/order/:id' element={<Order />} />
          <Route path='/user/:id' element={<UserProfile />} />
          <Route path='/admin-dashboard' element={<AdminRoute><Dashboard /></AdminRoute>} >
            <Route path='products' element={<Products />} >
              <Route index element={<ProductsList/>} />
              <Route path='create-products' element={<CreateProduct />} />
            </Route>
            <Route path='summary' element={<Summary />} />
            <Route path='users' element={<Users/>} />
            <Route path='orders' element={<Orders/>} />
          </Route>
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
