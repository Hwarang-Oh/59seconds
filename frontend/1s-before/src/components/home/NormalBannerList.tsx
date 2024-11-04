import { NormalBannerListProps } from '@/types/home';
import NormalBanner from './NormalBanner';

export default function NormalBannerList({ Banners }: Readonly<NormalBannerListProps>) {
  return (
    <div className='flex row-auto gap-5'>
      {Banners.map((banner) => (
        <NormalBanner
          key={banner.id}
          id={banner.id}
          image={banner.rectImage}
          title={banner.title}
          details={banner.details}
          date={banner.date}
          participants={banner.participants}
          isDeadline={banner.isDeadline}
        />
      ))}
    </div>
  );
}
