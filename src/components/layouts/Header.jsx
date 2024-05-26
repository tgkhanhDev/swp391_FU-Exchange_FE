import React from 'react'

export const Header = () => {
  return (
    <header className='top-0 fixed w-full min-w-[950px] z-50'>
      {/*Header trên cùng*/ }
      <div className='flex justify-between items-center py-3 px-5 text-xl text-[var(--color-primary)] bg-[var(--color-bg-hightlight)]'>
        <div className='text-center flex-grow font-semibold'>Chào mừng đến với FU-Exchange, nơi bạn có thể mua, bán và trao đổi bất cứ thứ gì!</div>
        <div className='text-right font-normal cursor-pointer'>Hỗ trợ</div>
      </div>

      {/*Header tiếp theo có thanh search*/}
      <div className='py-3 pl-5 pr-20 flex justify-between bg-white border-b-2 border-b-slate-300 '>
        <img className='h-10 cursor-pointer' src="/images/logos/fu_Ex_logo.png" />
        
        {/*Search bar */}
        <div className='flex justify-center items-center'>
          <button className='border border-r-0 z-10 p-3 hover:bg-[var(--color-primary)] transition duration-150 rounded-l-[35px] bg-gray-300 filter-white'>
            <img className='inset-0  w-full h-full object-contain' src="/images/icons/search_icon.svg" />
          </button>
          <input className='h-4 p-5 border border-l-0 rounded-r-[35px] w-[500px] focus:outline-none' placeholder="Tìm kiếm"></input>
          {/*<img src="/images/icons/loading_icon.svg" className='animate-spin h-8 w-8'/>*/}
        </div>

        {/*Giỏ hàng + Login*/}
        <div className='flex justify-center items-center'>
          <img className='h-8 mr-10 cursor-pointer' src="/images/icons/cart_icon.svg" />
          <button className='font-semibold'>Đăng nhập</button>
        </div>
      </div>
    </header>
  )
}

export default Header