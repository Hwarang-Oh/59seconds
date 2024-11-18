import { Hourglass, TicketCheck, Eye, TrendingUpDown } from 'lucide-react';

export default function renderIcon(id: number) {
  switch (id) {
    case 0:
      return <Hourglass size={30} color='#474972' />;
    case 1:
      return <TicketCheck size={30} color='#474972' />;
    case 2:
      return <Eye size={30} color='#474972' />;
    case 3:
      return <TrendingUpDown size={30} color='#474972' />;
    default:
      return <Hourglass size={30} color='#474972' />; // 기본 아이콘
  }
}
