import type { Metadata } from 'next';
import '@/styles/global-styles.css';
import QueryProvider from '@/hooks/QueryProvider';

export const metadata: Metadata = {
  title: '59 Seconds',
  description: '1 Second Before',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
