import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Register from "./components/register"
import Skelbimai from "./components/skelbimai"
import Skelbimas from "./components/skelbimas"
import Sukurti from "./components/sukurti"
import './App.css';

function App() {

  return (
    <>
   <BrowserRouter>
    <Routes>
      <Route index element={<Home/>}/>
      <Route path="skelbimai" element={<Skelbimai/>}/>
      <Route path="createAd" element={<Sukurti/>}/>
    </Routes>
   </BrowserRouter>
    </>
  )
} 

export default App