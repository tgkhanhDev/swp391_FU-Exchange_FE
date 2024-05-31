import React from 'react'
import { PhoneOutlined, GlobalOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'

export const Footer = () => {

  return (
    <footer className='w-full min-w-[950px]'>
      {/*Footer gần cuối*/}
      <div className='flex justify-center items-center'>
        <div className='border-t-2 border-b-slate-300 h-[280px] w-[1350px] pl-8 pr-5 py-5'>

          {/*column là cột, row là hàng*/}
          <div className='grid grid-cols-2 grid-flow-col'>

            <div className='shrink'>
              <div className='text-3xl mb-5 font-semibold'>Bắt đầu trở thành nhà kinh doanh!</div>
              <div className='text-sm mb-5 font-normal'>Khơi dậy tinh thần khởi nghiệp - Làm chủ năng lực bán hàng!</div>
              <NavLink to={'/registerSeller'}>
                <button className='px-14 py-3 border-2 border-[var(--color-secondary)] text-base font-semibold relative truncate text-[var(--color-secondary)] hover:text-white duration-100 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-[var(--color-primary)] before:-translate-x-full before:duration-300 before:-z-10 before:hover:translate-x-0 '>
                  TÌM HIỂU THÊM
                </button>
              </NavLink>
            </div>

            <div className='grid grid-cols-3 grid-flow-col mt-2'>
              <div>
                <div className='text-lg font-semibold mb-3'>Danh mục</div>
                <div>
                  <div className='font-normal text-base mb-1'>Dụng cụ học tập</div>
                  <div className='font-normal text-base mb-1'>Sách</div>
                  <div className='font-normal text-base mb-1'>Thời trang</div>
                  <div className='font-normal text-base mb-1'>Thiết bị điện tử</div>
                  <div className='font-normal text-base mb-1'>Khác</div>
                </div>
              </div>

              <div>
                <div className='text-lg font-semibold mb-3'>Nhà tài trợ</div>
                <div>
                  <div className='font-normal text-base mb-1'>FPT University</div>
                  <div className='font-normal text-base mb-1'>FPT Software</div>
                  <div className='font-normal text-base mb-1'>Microsoft</div>
                  <div className='font-normal text-base mb-1'>OpenAI</div>
                  <div className='font-normal text-base mb-1'>Bamos Coffee</div>
                </div>
              </div>

              <div>
                <div className='text-lg font-semibold mb-3'>Liên hệ</div>
                <div>
                  <div className='font-normal text-base mb-1'><PhoneOutlined className='mr-2' />(+84) 28 7300 5588</div>
                  <a className='font-normal text-base mb-1' href="https://hcmuni.fpt.edu.vn/"><GlobalOutlined className='mr-2' />https://hcmuni.fpt.edu.vn/</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Footer cuối*/}
      <div className='w-full flex justify-between items-center py-3 px-5 text-xl text-[var(--color-primary)] bg-[var(--color-bg-hightlight)]'>
        <div className='text-center flex-grow font-semibold min-w-[800px]'>COPYRIGHTS @2024</div>
      </div>
    </footer>
  )
}

export default Footer