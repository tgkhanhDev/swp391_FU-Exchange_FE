import React from 'react'

export const Footer = () => {
  return (
    <footer className='w-full min-w-[950px]'>
      {/*Footer gần cuối*/}
      <div className='flex justify-center items-center'>
        <div className='border-t-2 border-b-slate-300 h-[280px] w-[1300px] px-20 py-5'>

          {/*column là cột, row là hàng*/}
          <div className='grid grid-cols-2 grid-flow-col gap-3'>

            <div className='shrink'>
              <div className='text-3xl mb-5 font-semibold'>Bắt đầu trở thành nhà kinh doanh!</div>
              <div className='text-sm mb-5 font-normal'>Khơi dậy tinh thần khởi nghiệp - Làm chủ năng lực bán hàng!</div>
              <button className='px-14 py-3 border-2 border-[var(--color-secondary)] text-base font-semibold relative truncate text-[var(--color-secondary)] hover:text-white duration-100 before:absolute before:w-full before:h-full before:left-0 before:top-0 before:bg-[var(--color-primary)] before:-translate-x-full before:duration-300 before:-z-10 before:hover:translate-x-0 '>
                TÌM HIỂU THÊM
              </button>
            </div>

            <div className='grid grid-cols-3 grid-flow-col gap-10 mt-2'>
              <div>
                <div className='text-base font-semibold mb-5'>Lorem Ipsum</div>
                <div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                </div>
              </div>

              <div>
                <div className='text-base font-semibold mb-5'>Lorem Ipsum</div>
                <div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                </div>
              </div>

              <div>
                <div className='text-base font-semibold mb-5'>Lorem Ipsum</div>
                <div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
                  <div className='font-normal text-base mb-1'>Lorem</div>
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