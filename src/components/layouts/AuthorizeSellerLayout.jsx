import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import SidebarSeller from './SidebarSeller'

export const AuthorizeSellerLayout = () => {
  return (
    <div className='flex flex-col min-h-[100vh]' >
      <Header />
      <div className='flex-grow grid grid-cols-[auto_1fr] '>
        <SidebarSeller />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AuthorizeSellerLayout 