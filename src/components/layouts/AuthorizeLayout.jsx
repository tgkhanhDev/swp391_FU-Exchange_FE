import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import SidebarCustomer from './SidebarCustomer'

export const AuthorizeLayout = () => {
  return (
    <div className='flex flex-col min-h-[100vh]' >
      <Header />
      <div className='grid grid-cols-[auto_1fr] '>
        <SidebarCustomer />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default AuthorizeLayout 