import { useState } from 'react';
import {  BrowserRouter , Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Homepage';
import Features from './pages/Features';
import Predict from './pages/Predict';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

