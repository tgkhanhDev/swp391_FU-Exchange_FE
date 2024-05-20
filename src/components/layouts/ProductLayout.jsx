import React from 'react'
import ProductList from '../templates/productList/ProductList'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export const ProductLayout = () => {
  return (
    <div>
        {/* Header  */}
        <Header/>
        <Outlet />
        <Footer />
        {/* Footer  */}
    </div>
  )
}

export default ProductLayout