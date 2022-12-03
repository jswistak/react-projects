import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import HomePage from './components/HomePage';
import AboutPage from './components/AboutPage';
import Error404Page from './components/Error404Page';
import Cars from './components/Cars';
import Layout from './components/Layout';
import NewCar from './components/NewCar';
import { RecoilRoot } from 'recoil';
import CarId from './components/CarId';


function App() {
  
  return (
    <div>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={<HomePage/>} />
              <Route path="/about" element={<AboutPage/>} />
              <Route path="/cars">
                <Route index element={<Cars/>} />
                <Route path="new" element={<NewCar />} />
                <Route path=":id" element={<CarId />} />
              </Route>
              <Route path='*' element={<Error404Page/>} />
            </Route>
        </Routes>
      </RecoilRoot>
    </div>
  );
}

export default App;
