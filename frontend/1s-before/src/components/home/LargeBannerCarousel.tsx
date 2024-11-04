'use client';
import { useState, useRef } from 'react';
import { BannerCarouselProps } from '@/types/home';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import LargeBanner from '@/components/home/LargeBanner';

export default function LargeBannerCarousel({ Banners }: Readonly<BannerCarouselProps>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
    <Swiper
      ref={swiperRef}
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}>
      {Banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <LargeBanner
            id={banner.id}
            image={banner.image}
            rectImage={banner.rectImage}
            title={banner.title}
            content={banner.content}
            date={banner.date}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
