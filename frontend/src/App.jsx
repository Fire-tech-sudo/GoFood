import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import "./App.css"
import { CartProvider } from './components/ ContentReducer';
import Cart from './pages/Cart';
import MyOrder from './pages/MyOrders';



function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path="/createuser" element={<Signup />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/myorders' element={<MyOrder />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
