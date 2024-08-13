import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './pages/Home'
import Create from './pages/create';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
