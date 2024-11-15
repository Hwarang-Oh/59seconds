import CardDummy from '@/assets/FancyCards.json';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import FancyCard from '@/components/home/FancyCard';
import HomeContent from '@/components/home/HomeContent'; // IMP : Client Component
import { getPopularEvents, getDeadlineEvents } from '@/apis/eventAPI';

export default async function Home() {
  const { content: popularEvents } = await getPopularEvents({
    size: 5,
    page: 0,
  });
  const deadlineEvents = await getDeadlineEvents();

  return (
    <div>
      <Header />
      <HomeContent popularEvents={popularEvents} deadlineEvents={deadlineEvents} />
      <div className='flex max-w-screen-xl mx-auto gap-6 pb-20'>
        {CardDummy.FancyCards.map((card) => (
          <FancyCard key={card.id} id={card.id} title={card.title} content={card.content} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
