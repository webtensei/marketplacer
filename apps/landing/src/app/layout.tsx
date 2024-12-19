import './global.css';
import { NextUIProvider } from '@nextui-org/react';
import { clsx } from 'clsx';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Welcome to landing',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
        )}
      >
      <NextUIProvider>
        <div className='relative flex min-h-screen flex-col'>
            <Navigation/>
          <main className='container mx-auto  mb-8 max-w-screen-lg flex-grow px-6'>
            {children}
          </main>
          <Footer />
        </div>
      </NextUIProvider>
      </body>
    </html>
  );
}