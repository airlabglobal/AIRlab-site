import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export const metadata: Metadata = {
  title: 'AIRLAB - Artificial Intelligence & Robotics Laboratory | University of Lagos',
  description: 'AIRLAB is the premier Artificial Intelligence and Robotics Laboratory at the University of Lagos, pioneering research in AI, machine learning, robotics, and intelligent systems.',
  keywords: 'AIRLAB, AI, Robotics, Machine Learning, University of Lagos, UNILAG, Research, Nigeria',
  authors: [{ name: 'AIRLAB UNILAG' }],
  openGraph: {
    title: 'AIRLAB - AI & Robotics Laboratory | UNILAG',
    description: 'Pioneering research in Artificial Intelligence and Robotics at the University of Lagos',
    type: 'website',
    locale: 'en_NG',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen" suppressHydrationWarning>
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
