import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export const ProductLayout = () => {
  return (
    <div className='flex flex-col min-h-[100vh]' >
      {/* Header  */}
      <Header />
      <Outlet />
      <Footer />
      {/* Footer  */}
    </div>
  )
}

export default ProductLayout