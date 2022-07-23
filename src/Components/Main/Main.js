import React from 'react'
import Homepage from '../../Pages/Homepage'
import Login from '../../Pages/Login/Login'
import Register from '../../Pages/Register/Register'
import CartModal from '../../Components/CartModal/CartModal'
import FigurePeekModal from '../../Components/FigurePeekModal/FigurePeekModal'
import ScrollToTop from '../../Components/ScrollToTop'
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router"

function Main() {
  const location = useLocation()


  return (
    <ScrollToTop>
      <CartModal />
      <FigurePeekModal />
      <Routes location={location}>

        <Route path="/" element={
          <Homepage />
        } />

        <Route path="/login" element={
          <Login />
        } />

        <Route path="/register" element={
          <Register />
        } />

      </Routes>
    </ScrollToTop>
  )
}

export default Main