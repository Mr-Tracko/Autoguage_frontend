import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
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
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App

