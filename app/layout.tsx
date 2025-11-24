import type { Metadata } from 'next';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import '../styles/globals.css';

const ibmSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
});

const ibmMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
    weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Hoàng Nhân - Labs & Experiments',
  description: 'A collection of my personal labs and experiments in web development, showcasing innovative ideas and creative coding techniques.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`${ibmSans.variable} ${ibmMono.variable} antialiased`}
      >

        {children}
      </body>
    </html>
  );
}
