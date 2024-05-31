import React from 'react'
import { NavLink } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div>
      <div className='flex flex-col justify-center items-center bg-gradient-to-b from-[#EFF2F6] to-[#393E46] fixed top-0 left-0 w-full h-full text-white space-y-5'>
        <div className='font-bold text-[300px] h-[370px]'>
          404
        </div>
        <div className='text-4xl font-bold'>Oops! This Page is Not Found!</div>
        <div className='text-xl font-normal'>The requested page does not exist!</div>
        <NavLink to={"/"}><button className='px-14 py-3 bg-[#E9ECEF] text-[#232D42] text-base font-semibold rounded-md hover:bg-opacity-85'>Back to Home</button></NavLink>
      </div>
    </div>
  )
}

export default NotFound