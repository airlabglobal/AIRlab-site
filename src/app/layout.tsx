import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import GlobalErrorBoundary from '@/components/error/GlobalErrorBoundary';
import { errorMonitor } from '@/lib/errorMonitoring';

export const metadata: Metadata = {
  title: 'AIRLAB - Artificial Intelligence & Robotics Laboratory | University of Lagos',
  description: 'AIRLAB is the premier Artificial Intelligence and Robotics Laboratory at the University of Lagos, pioneering research in AI, machine learning, robotics, and intelligent systems.',
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
      <body className="font-body antialiased flex flex-col min-h-screen">
        <GlobalErrorBoundary
          onError={(error, errorInfo) => {
            errorMonitor.logError(error, errorInfo, { context: 'global' });
          }}
        >
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
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
