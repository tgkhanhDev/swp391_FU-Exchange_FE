import React, { useEffect } from 'react'
import { CarouselDefault } from "./Carousel.jsx"
import { useView } from '../../../hooks/useView'
import { getCampusThunk, getCategoryThunk } from "../../../store/viewManager/thunk"
import { useAppDispatch } from '../../../store/index.ts'
import { NavLink} from 'react-router-dom'

export const ProductList = () => {
  const { category, campus } = useView()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCategoryThunk());
    dispatch(getCampusThunk());
  }, [dispatch]);

  const bannersData = [
    { bannerId: 1, imageSrc: '/images/banners/website/purchase.png', title: 'Mua bán' },
    { bannerId: 2, imageSrc: '/images/banners/website/exchange.png', title: 'Trao đổi' },
    { bannerId: 3, imageSrc: '/images/banners/website/gift.png', title: 'Cho và Tặng' },
  ];

  return (
    <main>
      {/*Banner quảng cáo*/}
      <div className='h-[550px]'>
        <CarouselDefault />
      </div>
      {/*Caterogies */}
      <div className='my-20 mb-10'>
        {/*Introduction*/}
        <div className='flex justify-center items-center mb-7'>
          <div className='w-[610px] text-center'>
            <div className='text-6xl font-semibold mb-7'>Thể loại</div>
            <div className='text-xl mb-7 text-[var(--color-tertiary)]'>Khám phá các danh mục sản phẩm để có những trải nghiệm mua sắm tuyệt vời!</div>
            <NavLink to={'/detail'}>
              <button className='px-14 py-3 border-2 border-[var(--color-secondary)] text-base text-[var(--color-secondary)] font-semibold hover:text-white hover:bg-[var(--color-primary)] duration-300 hover:shadow-[0_8px_15px_rgba(253,112,20,0.8)] active:shadow-[0_2px_9px_rgba(253,112,20,0.8)]'>
                XEM TẤT CẢ
              </button>
            </NavLink>
          </div>
        </div>

        {/*Card*/}
        <div className='flex justify-center items-center'>
          <div className='w-[1400px] grid grid-cols-5 grid-flow-col gap-5 h-[400px]'>
            {category.map(item => (
              <div className='text-center cursor-pointer duration-300 hover:scale-[1.02]' key={item.categoryId} >
                <div className='h-[350px]'>
                  <img src={item.imageUrl} className='w-full h-full object-cover'></img>
                </div>
                <div className='font-bold text-lg py-4'>{item.categoryName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Hoạt động*/}
      <div className='my-20 mb-10'>
        {/*Introduction*/}
        <div className='flex justify-center items-center mb-7'>
          <div className='w-[610px] text-center'>
            <div className='text-6xl font-semibold mb-7'>Hoạt động</div>
            <div className='text-xl mb-7 text-[var(--color-tertiary)]'>FU-Exchange không chỉ đơn thuần là một trang web mua-bán, nó còn là nơi để mọi người trao đổi và thậm chí là tặng vật phẩm!</div>
            <NavLink to={'/detail'}>
              <button className='px-14 py-3 border-2 border-[var(--color-secondary)] text-base text-[var(--color-secondary)] font-semibold hover:text-white hover:bg-[var(--color-primary)] duration-300 hover:shadow-[0_0_20px_rgba(253,112,20,0.8)] active:shadow-[0_0_14px_rgba(253,112,20,0.8)]'>
                XEM TẤT CẢ
              </button>
            </NavLink>
          </div>
        </div>
        {/*Card */}
        <div className='flex justify-center'>
          <div className='w-[1400px] grid grid-cols-3 gap-16 h-[600px] '>
            {bannersData.map(item => (
              <div className={`relative h-[500px] ${item.bannerId % 2 === 0 ? '' : 'mt-[80px]'} cursor-pointer`} key={item.bannerId}>
                <img className='w-full h-full object-cover absolute top-0 left-0' src={item.imageSrc}></img>
                <div className='duration-300 opacity-0 hover:opacity-100 w-full h-full'>
                  <div className='w-full h-20 bg-[#E7EEF1] bg-opacity-85 absolute bottom-0 left-0 font-bold text-2xl flex justify-center items-center'>{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Các sản phẩm */}
      <div className='my-20 mb-10'>
        {/*Introduction*/}
        <div className='flex justify-center items-center mb-7'>
          <div className='w-[610px] text-center'>
            <div className='text-6xl font-semibold mb-7'>Campus</div>
            <div className='text-xl mb-7 text-[var(--color-tertiary)]'>FU-Exchange tạo môi trường mua bán trao đổi cho cộng đồng sinh viên FPT University tại cả 5 Campus!</div>
          </div>
        </div>

        {/*Card*/}
        <div className='flex justify-center items-center'>
          <div className='w-[1400px] grid grid-cols-5 grid-flow-col gap-5 h-[400px]'>
          {campus.map(item => (
              <div className='text-center cursor-pointer duration-300 hover:scale-[1.02]' key={item.campusId} >
                <div className='h-[350px]'>
                  <img src={item.imageUrl} className='w-full h-full object-cover'></img>
                </div>
                <div className='font-bold text-lg py-4'>{item.campusName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductList