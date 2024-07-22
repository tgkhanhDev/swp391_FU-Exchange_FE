import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

export const CancelPayment = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-[#E7EEF1] to-[#EFF2F6] fixed top-0 left-0 w-full h-full text-gray-900 p-6">
      <motion.div 
        className="flex flex-col items-center bg-white p-10 rounded-xl shadow-xl space-y-6 max-w-lg w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-[#fd7014] text-9xl font-extrabold mb-4"
          animate={{ rotate: [0, 10, -10, 0], transition: { yoyo: Infinity, duration: 1 } }}
        >
          X
        </motion.div>
        <div className="text-3xl font-bold text-[#393e46]">Thanh Toán Bị Hủy</div>
        <div className="text-lg font-medium text-center text-[#393e46]">
          Bạn đã hủy quá trình thanh toán thành công. Nếu đây là một nhầm lẫn, bạn có thể bắt đầu lại hoặc liên hệ với đội hỗ trợ của chúng tôi để được trợ giúp.
        </div>
        <NavLink to="/">
          <motion.button 
            className="px-6 py-3 bg-gradient-to-r from-[#fd7014] to-[#ff7940] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff7940] transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Về Trang Chủ
          </motion.button>
        </NavLink>
      </motion.div>
    </div>
  )
}

export default CancelPayment
