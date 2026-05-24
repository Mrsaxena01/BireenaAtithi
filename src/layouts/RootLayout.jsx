import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { PageTransition } from '@/components/shared/PageTransition';
import { useLayoutEffect } from 'react';

export const RootLayout = () => {
  const location = useLocation();
  
  // Scroll to top on route change, using useLayoutEffect to ensure it happens before paint
  useLayoutEffect(() => {
    // Using requestAnimationFrame to ensure smooth transition
    const timeoutId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    return () => cancelAnimationFrame(timeoutId);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-950">
      <Header />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};
