'use client';
import 'swiper/css';
import LargeBanner from '@/components/home/member/LargeBanner';
import { BannerCarouselProps } from '@/types/home';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

export default function LargeBannerCarousel({ Banners }: Readonly<BannerCarouselProps>) {
  const pagination = {
    el: '.custom-pagination',
    clickable: true,
    renderBullet: (index: number, className: string) => {
      const banner = Banners[index];
      return `<div key="bullet-${index}" class="${className} swiper-pagination-custom-bullet w-[52px] h-[52px] rounded-lg overflow-hidden relative inline-block mx-1 transition-transform duration-300 ease-in-out hover:scale-110">
          <img src="${banner.rectangleImage}" alt="${banner.title}" class="object-cover w-full h-full" />
          <div class="absolute inset-0 bg-black opacity-30 transition-opacity duration-300"></div>
        </div>`;
    },
  };

  return (
    <div className='relative'>
      <Swiper
        loop={true}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={pagination}>
        {Banners?.map((banner, index) => (
          <SwiperSlide key={`${banner.eventId}-${index}`}>
            <LargeBanner
              eventId={banner.eventId}
              title={banner.title}
              description={banner.description}
              endTime={banner.endTime}
              bannerImage={banner.bannerImage}
              rectangleImage={banner.rectangleImage}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='custom-pagination absolute bottom-5 left-[200px] z-10' />
    </div>
  );
}
