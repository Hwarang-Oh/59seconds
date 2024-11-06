'use client';
import 'swiper/css';
import LargeBanner from '@/components/home/member/LargeBanner';
import { BannerCarouselProps } from '@/types/home';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

export default function LargeBannerCarousel({ Banners }: Readonly<BannerCarouselProps>) {
  return (
    <div className='relative'>
      <Swiper
        loop={true}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          el: '.custom-pagination',
          clickable: true,
          renderBullet: (index, className) => {
            const banner = Banners[index];
            return `
            <div class="${className} swiper-pagination-custom-bullet w-[52px] h-[52px] rounded-lg overflow-hidden relative inline-block mx-1 transition-transform duration-300 ease-in-out hover:scale-110">
              <img src="${banner.rectImage}" alt="${banner.title}" class="object-cover w-full h-full" />
              <div class="absolute inset-0 bg-black opacity-30 transition-opacity duration-300"></div>
            </div>
          `;
          },
        }}>
        {Banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <LargeBanner
              id={banner.id}
              bannerImage={banner.bannerImage}
              rectImage={banner.rectImage}
              title={banner.title}
              content={banner.content}
              date={banner.date}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='custom-pagination absolute bottom-5 left-[200px] z-10' />
    </div>
  );
}
