import React from 'react'
import { CarouselDefault } from "./Carousel.jsx"

export const ProductList = () => {
  return (
    <main className='mt-[120px]'>
      {/*Banner quảng cáo*/}
      <div className='h-[550px]'>
        <CarouselDefault/>
      </div>

      {/*Caterogies */}
      <div className='my-20 mb-10'>
        {/*Introduction*/}
        <div className='flex justify-center items-center mb-7'>
          <div className='w-[610px] text-center'>
            <div className='text-6xl font-semibold mb-7'>Thể loại</div>
            <div className='text-xl mb-7 text-[var(--color-tertiary)]'>Khám phá các danh mục sản phẩm để có những trải nghiệm mua sắm tuyệt vời!</div>
            <button className='px-14 py-3 border-2 border-[var(--color-secondary)] text-base text-[var(--color-secondary)] font-semibold hover:text-white hover:bg-[var(--color-primary)] duration-300 hover:shadow-[0_8px_15px_rgba(253,112,20,0.8)] active:shadow-[0_2px_9px_rgba(253,112,20,0.8)]'>
              XEM TẤT CẢ
            </button>
          </div>
        </div>
        {/*Card*/}
        <div className='flex justify-center items-center'>
          <div className='w-[1400px] grid grid-cols-5 grid-flow-col gap-5 h-[400px]'>
            <div className='text-center cursor-pointer duration-300 hover:scale-[1.02]'>
              <div className='h-[350px]'>
                <img src="/images/banners/website/learning_tools.png" className='w-full h-full object-cover'></img>
              </div>
              <div className='font-bold text-lg py-4'>Dụng cụ học tập</div>
            </div>
            <div className='text-center cursor-pointer duration-500 hover:scale-[1.02]'>
              <div className='h-[350px]'>
                <img src="/images/banners/website/books.png" className='w-full h-full object-cover'></img>
              </div>
              <div className='font-bold text-lg py-4'>Sách</div>
            </div>
            <div className='text-center cursor-pointer duration-500 hover:scale-[1.02]'>
              <div className='h-[350px]'>
                <img src="/images/banners/website/clothes.png" className='w-full h-full object-cover'></img>
              </div>
              <div className='font-bold text-lg py-4'>Thời trang</div>
            </div>
            <div className='text-center cursor-pointer duration-500 hover:scale-[1.02]'>
              <div className='h-[350px]'>
                <img src="/images/banners/website/electrical.png" className='w-full h-full object-cover'></img>
              </div>
              <div className='font-bold text-lg py-4'>Thiết bị điện tử</div>
            </div>
            <div className='text-center cursor-pointer duration-500 hover:scale-[1.02]'>
              <div className='h-[350px]'>
                <img src="/images/banners/website/cooking.png" className='w-full h-full object-cover'></img>
              </div>
              <div className='font-bold text-lg py-4'>Khác</div>
            </div>
          </div>
        </div>
      </div>

      {/*Bám sát với nhu cầu*/}
      <div className='my-20 mb-10'>
        {/*Introduction*/}
        <div className='flex justify-center items-center mb-7'>
          <div className='w-[610px] text-center'>
            <div className='text-6xl font-semibold mb-7'>Bám sát với nhu cầu</div>
            <div className='text-xl mb-7 text-[var(--color-tertiary)]'>FU-Exchange không chỉ đơn thuần là một trang web mua-bán, nó còn là nơi để mọi người trao đổi và thậm chí là tặng vật phẩm!</div>
            <button className='px-14 py-3 border-2 border-[var(--color-secondary)] text-base text-[var(--color-secondary)] font-semibold hover:text-white hover:bg-[var(--color-primary)] duration-300 hover:shadow-[0_0_20px_rgba(253,112,20,0.8)] active:shadow-[0_0_14px_rgba(253,112,20,0.8)]'>
              XEM TẤT CẢ
            </button>
          </div>
        </div>
        {/*Card */}
        <div className='flex justify-center items-center'>
          <div className='w-[1400px] grid grid-cols-3 grid-flow-col gap-16 h-[600px]'>
            <div className='relative h-[500px] mt-[100px] cursor-pointer duration-300 hover:-translate-y-2'>
              <img className='w-full h-full object-cover absolute top-0 left-0 duration-300' src='/images/banners/website/purchase.png'></img>
              <div className='duration-300 opacity-0 hover:opacity-100 absolute w-full h-full'>
                <div className='w-full h-20 bg-[#E7EEF1] bg-opacity-85 absolute bottom-0 left-0 font-bold text-2xl flex justify-center items-center'>Mua bán</div>
              </div>
            </div>
            <div className='relative h-[500px] mb-[100px] cursor-pointer duration-300 hover:translate-y-2'>
              <img className='w-full h-full object-cover absolute top-0 left-0 duration-300' src='/images/banners/website/exchange.png'></img>
              <div className='duration-300 opacity-0 hover:opacity-100 absolute w-full h-full'>
                <div className='w-full h-20 bg-[#E7EEF1] bg-opacity-85 absolute bottom-0 left-0 font-bold text-2xl flex justify-center items-center'>Trao đổi</div>
              </div>
            </div>
            <div className='relative h-[500px] mt-[100px] cursor-pointer duration-300 hover:-translate-y-2'>
              <img className='w-full h-full object-cover absolute top-0 left-0 duration-300' src='/images/banners/website/gift.png'></img>
              <div className='duration-300 opacity-0 hover:opacity-100 absolute w-full h-full'>
                <div className='w-full h-20 bg-[#E7EEF1] bg-opacity-85 absolute bottom-0 left-0 font-bold text-2xl flex justify-center items-center'>Cho và Tặng</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Các sản phẩm */}
      <div className='my-20 mb-10'>
        {/*Introduction*/}
        <div className='flex justify-center items-center mb-7'>
          <div className='w-[610px] text-center'>
            <div className='text-6xl font-semibold mb-7'>Sản phẩm</div>
            <div className='text-xl mb-7 text-[var(--color-tertiary)]'>FU-Exchange cung cấp đầy đủ sản phẩm từ A-Z với giá cả phải chăng!</div>
            <button className='px-14 py-3 border-2 border-[var(--color-secondary)] text-base text-[var(--color-secondary)] font-semibold hover:text-white hover:bg-[var(--color-primary)] duration-300 hover:shadow-[0_-8px_15px_rgba(253,112,20,0.8)] active:shadow-[0_-2px_9px_rgba(253,112,20,0.8)]'>
              KHÁM PHÁ THÊM
            </button>
          </div>
        </div>

        {/*Card*/}
        <div className='flex justify-center items-center'>
          <div className='w-[1100px] grid grid-cols-3 grid-flow-col gap-5 h-[400px]'>
            <div className='text-center cursor-pointer duration-300 hover:scale-[1.02]'>
              <div className='h-[350px]'>
                <img src="/images/banners/website/learning_tools.png" className='w-full h-full object-cover'></img>
              </div>
              <div className='font-bold text-lg py-4'>Dụng cụ học tập</div>
            </div>
            <div className='text-center cursor-pointer duration-500 hover:scale-[1.02]'>
              <div className='h-[350px]'>
                <img src="/images/banners/website/books.png" className='w-full h-full object-cover'></img>
              </div>
              <div className='font-bold text-lg py-4'>Sách</div>
            </div>
            <div className='text-center cursor-pointer duration-500 hover:scale-[1.02]'>
              <div className='h-[350px]'>
                <img src="/images/banners/website/clothes.png" className='w-full h-full object-cover'></img>
              </div>
              <div className='font-bold text-lg py-4'>Thời trang</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductList