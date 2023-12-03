import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Home from './components/Home';
import NotFound from './components/NonFound';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ToastContainer/>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/not-found' element={<NotFound />} />
          <Route path='*' element={<Navigate to='/not-found'/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
