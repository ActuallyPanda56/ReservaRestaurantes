import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import PageWrapper from '@/components/PageWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Reserva Restaurantes!',
  description: 'Aplicación de reservas de restaurantes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PageWrapper />
        {children}
      </body>
    </html>
  );
}
