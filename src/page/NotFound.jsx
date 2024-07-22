import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export const NotFound = () => {
  return (
    <div>
      <div className='flex flex-col justify-center items-center bg-gradient-to-b from-[#EFF2F6] to-[#393E46] fixed top-0 left-0 w-full h-full text-white space-y-5'>
        <motion.div 
          className='font-bold text-[300px] h-[370px]'
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.div>
        <motion.div 
          className='text-4xl font-bold'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! Trang này không tồn tại!
        </motion.div>
        <motion.div 
          className='text-xl font-normal'
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Trang bạn yêu cầu không tồn tại!
        </motion.div>
        <NavLink to={"/"}>
          <motion.button 
            className='px-14 py-3 bg-[#E9ECEF] text-[#232D42] text-base font-semibold duration-200 rounded-md hover:bg-opacity-85'
            whileHover={{ scale: 1.05 }}
          >
            Về Trang Chủ
          </motion.button>
        </NavLink>
      </div>
    </div>
  )
}

export default NotFound
