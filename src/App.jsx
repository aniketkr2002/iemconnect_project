import { Component, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import SignIn from './log/signin'
import SignUp from './log/signup'
import Home from './components/home/home';
import ProtectedRoutes from './utils/ProtectedRoutes';
import EnterOTP from './log/EnterOTP';
import SetPassword from './log/SetPassword';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyCart from './components/MyCart/MyCart';
import Addproduct from './components/AddProduct/Addproduct';
import About from './components/About/About';
import MyProducts from './components/MyProducts/MyProducts';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
           <Route path="/verify-otp" element={<EnterOTP />} />
           <Route path="/set-password" element={<SetPassword/>} />
          <Route path="/home" element={<ProtectedRoutes Component={Home}/>}/>
          <Route path="/home/mycart" element={<ProtectedRoutes Component={MyCart}/>}/>
          <Route path="/home/addproduct" element={<ProtectedRoutes Component={Addproduct}/>}/>
          <Route path="/home/about" element={<ProtectedRoutes Component={About}/>}/>
          <Route path="/home/myproducts" element={<ProtectedRoutes Component={MyProducts}/>}/>
        </Routes>
      </div>
    </Router>

  );
}

export default App;
