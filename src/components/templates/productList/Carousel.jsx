import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export function CarouselDefault() {
  const items = [
    <img src="/images/banners/advertisement/banner-1.png" alt="Image 1" className="h-[550px] w-full object-cover"/>,
    <img src="/images/banners/advertisement/banner-2.png" alt="Image 2" className="h-[550px] w-full object-cover"/>,
    <img src="/images/banners/advertisement/banner-3.png" alt="Image 3" className="h-[550px] w-full object-cover"/>,
    <img src="/images/banners/advertisement/banner-4.png" alt="Image 4" className="h-[550px] w-full object-cover"/>,
    <img src="/images/banners/advertisement/banner-5.png" alt="Image 5" className="h-[550px] w-full object-cover"/>,
    <img src="/images/banners/advertisement/banner-6.png" alt="Image 6" className="h-[550px] w-full object-cover"/>,
  ];

  return (
    <div className="App">
      <AliceCarousel
        autoPlay
        infinite
        autoPlayInterval={3000}
        items={items}
        renderPrevButton={() => <button className="alice-carousel__prev-btn">‹</button>}
        renderNextButton={() => <button className="alice-carousel__next-btn">›</button>}
      />
    </div>
  );
}