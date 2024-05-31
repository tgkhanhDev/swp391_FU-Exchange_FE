import { Button } from 'antd';
import React from 'react'

export const Cart = () => {
  return (
    <div className="container">
      {/* Title  */}
      <div className="flex flex-col justify-center items-center">
        <div className="font-bold text-5xl">Shopping Cart</div>
        <div className="w-[620px] text-center my-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore hmagna aliqua.
        </div>
        <Button className='px-10 py-5 flex justify-center items-center'>Buy - 199$</Button>
        <div className='grid grid-cols-3'>
           <div className="border-black border w-[100px]"></div> 
        </div>
      </div>

    </div>
  );
}

export default Cart