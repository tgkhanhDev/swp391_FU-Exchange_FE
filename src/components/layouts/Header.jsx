import React from 'react'

export const Header = () => {
  return (
    <header>
      <div className='w-full flex justify-between items-center py-3 px-5 text-xl text-[var(--color-primary)] bg-[var(--color-bg-hightlight)]'>
        <div className='text-center flex-grow font-semibold min-w-[800px]'>Welcome to Fu-Exchange, where you can buy, sell and exchange anything!</div>
        <div className='text-right font-normal'>Suport</div>
      </div>
      <div className='py-3 pl-5 pr-20 flex justify-between bg-white'>
        <img className='h-8 mr-20' src="/public/images/logos/fu_Ex_logo.png" />
        <div className='ml-20 flex justify-center items-center'>
          <button className='border border-r-0 z-10 p-3 hover:bg-[var(--color-primary)] transition duration-150 rounded-l-[35px] bg-gray-300'>
            <img src="/public/images/icons/search_icon.svg" />
          </button>
          <input className='h-4 p-5 border border-l-0 rounded-r-[35px] w-[500px] focus:outline-none' placeholder="Search"></input>
        </div>
        <div className='flex justify-center items-center'>
          <img className='h-8 mr-10' src="/public/images/icons/cart_icon.svg" />
          <p className='font-semibold'>Login</p>
        </div>
      </div>
    </header>
  )
}

export default Header