import type { Metadata } from 'next';
import '@/styles/global-styles.css';
import QueryProvider from '@/hooks/QueryProvider';

export const metadata: Metadata = {
  title: '59 Seconds - 실시간 선착순 이벤트',
  description: '1 Second Before',
  keywords: ['59seconds', '선착순 이벤트', '상품 추첨', '당첨', '이벤트 관리'],
  alternates: {
    canonical: 'https://59seconds.site',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="author" content="404 Dream Solutions" />
      </head>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
